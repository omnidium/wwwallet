import { translatedError } from './errors'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787'

// Retried rather than surfaced immediately: 429 is our own rate limiter
// (a wallet with many held tokens legitimately fires one request per token on
// every refresh, see the concurrency-limited token-metadata loader in
// stores/chainData.ts), and 502/503/504 are the backend's own upstream calls
// (e.g. Ethplorer's free-tier API, which has its own separate, tighter rate
// limit we don't control) failing transiently. Confirmed live: a token
// metadata request that 502'd succeeded on a plain retry moments later. No
// Retry-After header is sent, so this backoff length is a reasonable guess,
// not a computed wait time.
const TRANSIENT_STATUSES = new Set([429, 502, 503, 504])
const TRANSIENT_RETRY_DELAYS_MS = [1000, 3000]

// fetch() itself rejects (a native, untranslated TypeError) on a network
// failure — offline, DNS, CORS — not just on a non-2xx response, so that's
// caught here too rather than only guarding the status check below.
async function fetchWithRetry(input: string | URL, init?: RequestInit): Promise<Response> {
  try {
    let res = await fetch(input, init)
    for (const delayMs of TRANSIENT_RETRY_DELAYS_MS) {
      if (!TRANSIENT_STATUSES.has(res.status)) break
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      res = await fetch(input, init)
    }
    return res
  } catch {
    throw translatedError('errors.networkFailed')
  }
}

// The backend's own error text (`body.error`) is never shown — it's a
// hardcoded English string from a stateless Rust API with no i18n of its
// own, so showing it as-is would leak untranslated text regardless of the
// app's language. A 422 instead carries a fixed, machine-readable `body.code`
// naming which specific "well-formed but can't be fulfilled" case this is
// (a swap quote with no liquidity; a transaction that would revert if
// submitted), which is what's actually switched on below. 429 gets its own
// message too since it's common enough to be worth distinguishing; anything
// else falls back to a generic translated message that still names the
// failing path and status for support/debugging.
async function requestFailedError(res: Response, path: string): Promise<Error> {
  if (res.status === 429) return translatedError('errors.rateLimited')
  if (res.status === 422) {
    const code = await res
      .json()
      .then((body: unknown) => (body as { code?: string } | null)?.code)
      .catch(() => undefined)
    if (code === 'no_liquidity') return translatedError('errors.noLiquidity')
    if (code === 'would_revert') return translatedError('errors.transactionWouldFail')
  }
  return translatedError('errors.requestFailed', { path, status: res.status })
}

async function getJson<T>(path: string, query?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  if (query) for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value)
  const res = await fetchWithRetry(url)
  if (!res.ok) throw await requestFailedError(res, path)
  return res.json() as Promise<T>
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw await requestFailedError(res, path)
  return res.json() as Promise<T>
}

export interface Balance {
  symbol: string
  contract_address: string | null
  balance: string
  decimals: number
}

export interface Transaction {
  hash: string
  from: string
  to: string | null
  value: string
  asset: string
  contract_address: string | null
  block_number: number | null
  timestamp: string | null
  status: TransactionStatus
  /** Set when this is a same-hash swap: the received leg, alongside the sent leg above. */
  counter_asset: string | null
  counter_value: string | null
  counter_contract_address: string | null
}

/** Opaque — pass back verbatim to `transactionPage` to fetch older transactions. Never inspect its shape. */
export type ActivityCursor = unknown

export interface AddressActivity {
  balances: Balance[]
  transactions: Transaction[]
  next_cursor: ActivityCursor | null
}

export interface TransactionPage {
  transactions: Transaction[]
  next_cursor: ActivityCursor | null
}

export interface TokenMetadata {
  address: string
  name: string | null
  symbol: string | null
  decimals: number | null
  logo_url: string | null
  usd_price: number | null
}

export interface FxRates {
  base: string
  rates: Record<string, number>
  as_of_unix: number
}

export interface NativePrice {
  usd: number
}

export interface TransactionPrep {
  nonce: number
  gas_price: string
  gas_limit: string
  chain_id: number
}

export type TransactionStatus = 'success' | 'failed' | 'pending'

export interface SwapQuote {
  to: string
  data: string
  value: string
  gas_price: string
  estimated_gas: string
  buy_amount: string
  sell_amount: string
  allowance_target: string
  price: string
  /** Aggregator/integrator fees on top of network gas (see backend SwapFee). */
  fees?: SwapFee[]
}

export interface SwapFee {
  kind: 'zero_ex' | 'integrator'
  token: string
  amount: string
}

export interface TokenListItem {
  address: string
  name: string
  symbol: string
  decimals: number
  logo_url: string | null
}

export type ChainSlug = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'optimism'

export const api = {
  addressActivity: (chain: ChainSlug, address: string) =>
    getJson<AddressActivity>(`/api/v1/chains/${chain}/address/${encodeURIComponent(address)}`),
  transactionPage: (chain: ChainSlug, address: string, cursor: ActivityCursor) =>
    postJson<TransactionPage>(
      `/api/v1/chains/${chain}/address/${encodeURIComponent(address)}/transactions/more`,
      { cursor },
    ),
  tokenMetadata: (chain: ChainSlug, address: string) =>
    getJson<TokenMetadata>(`/api/v1/chains/${chain}/token/${encodeURIComponent(address)}`),
  nativePrice: (chain: ChainSlug) => getJson<NativePrice>(`/api/v1/chains/${chain}/native-price`),
  fxRates: (base = 'USD') => getJson<FxRates>('/api/v1/fx-rates', { base }),
  broadcastTransaction: (chain: ChainSlug, rawTransaction: string) =>
    postJson<{ transaction_hash: string }>(`/api/v1/chains/${chain}/broadcast`, {
      raw_transaction: rawTransaction,
    }),
  transactionStatus: (chain: ChainSlug, hash: string) =>
    getJson<{ status: TransactionStatus }>(`/api/v1/chains/${chain}/tx-status/${encodeURIComponent(hash)}`),
  transactionPrep: (chain: ChainSlug, from: string, to: string, valueWei: string, data?: string) =>
    getJson<TransactionPrep>(`/api/v1/chains/${chain}/tx-prep/${encodeURIComponent(from)}`, {
      to,
      value: valueWei,
      ...(data ? { data } : {}),
    }),
  allowance: (chain: ChainSlug, token: string, owner: string, spender: string) =>
    getJson<{ amount: string }>(`/api/v1/chains/${chain}/allowance`, { token, owner, spender }),
  swapQuote: (chain: ChainSlug, sellToken: string, buyToken: string, sellAmountWei: string, takerAddress: string) =>
    getJson<SwapQuote>(`/api/v1/chains/${chain}/swap-quote`, {
      sell_token: sellToken,
      buy_token: buyToken,
      sell_amount: sellAmountWei,
      taker_address: takerAddress,
    }),
  /** The chain's whole token list — searched client-side, see services/tokenSearch.ts. */
  tokenList: (chain: ChainSlug) => getJson<TokenListItem[]>(`/api/v1/chains/${chain}/tokens`),
}
