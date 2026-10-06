import { translatedError } from './errors'
import { API_BASE_URL as BASE_URL } from './apiBase'
import { discardSessionToken, SESSION_HEADER, sessionToken } from './session'

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
  // The backend's own per-provider budget (backend/providers/src/upstream_budget.rs).
  if (res.status === 503) {
    const code = await res
      .clone()
      .json()
      .then((body: unknown) => (body as { code?: string } | null)?.code)
      .catch(() => undefined)
    if (code === 'busy') return translatedError('errors.serviceBusy')
  }
  if (res.status === 422) {
    const code = await res
      .json()
      .then((body: unknown) => (body as { code?: string } | null)?.code)
      .catch(() => undefined)
    if (code === 'no_liquidity') return translatedError('errors.noLiquidity')
    if (code === 'would_revert') return translatedError('errors.transactionWouldFail')
    if (code === 'token_not_on_chain') {
      const err = translatedError('errors.tokenNotOnChain')
      err.code = code
      return err
    }
  }
  return translatedError('errors.requestFailed', { path, status: res.status })
}

async function sessionHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
  const token = await sessionToken()
  return token ? { ...headers, [SESSION_HEADER]: token } : headers
}

/**
 * fetchWithRetry, carrying the session token (services/session.ts). If the
 * backend refuses the token — expired, or the backend's secret changed — a
 * fresh one is minted and the request retried once.
 */
async function fetchWithSession(input: string | URL, init: RequestInit = {}): Promise<Response> {
  const baseHeaders = (init.headers ?? {}) as Record<string, string>
  const res = await fetchWithRetry(input, { ...init, headers: await sessionHeaders(baseHeaders) })
  if (res.status !== 401) return res
  const code = await res
    .clone()
    .json()
    .then((body: unknown) => (body as { code?: string } | null)?.code)
    .catch(() => undefined)
  if (code !== 'session_invalid' && code !== 'session_required') return res
  discardSessionToken()
  return fetchWithRetry(input, { ...init, headers: await sessionHeaders(baseHeaders) })
}

async function getJson<T>(path: string, query?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  if (query) for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value)
  const res = await fetchWithSession(url)
  if (!res.ok) throw await requestFailedError(res, path)
  return res.json() as Promise<T>
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetchWithSession(`${BASE_URL}${path}`, {
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

/** A hit from the chain-agnostic coin search (Bitcoin, Solana…) — see the backend's CoinSearchResult. */
export interface CoinSearchResult {
  /** The price source's coin id, e.g. "solana". */
  id: string
  symbol: string
  name: string
  logo_url: string | null
  market_cap_rank: number | null
}

/** A currency pair's recent daily rates — see the backend's FxHistory. */
export interface FxHistory {
  base: string
  quote: string
  rate: number
  change_1d_pct: number
  /** One per business day over about a month, oldest first. */
  points: number[]
}

/** An asset's USD price over the past 24h — see the backend's PriceHistory. */
export interface PriceHistory {
  usd: number
  change_24h_pct: number
  /** Oldest first, evenly spaced; the last one is always `usd`. */
  points: number[]
}

/** A mined transaction's network fee — see the backend's TransactionFee. */
export interface TransactionFee {
  /** Decimal wei string, in the chain's native currency. */
  fee_wei: string
  /** Who paid it: the transaction's sender. */
  payer: string
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

/** A cross-chain transfer's route and ready-to-sign transaction — see the backend's BridgeQuote. */
export interface BridgeQuote {
  to: string
  data: string
  /** Decimal wei strings. */
  value: string
  gas_price: string
  gas_limit: string
  from_amount: string
  to_amount: string
  to_amount_min: string
  /** ERC-20 spender to approve first; null when sending the native coin. */
  approval_address: string | null
  from_token: BridgeToken
  to_token: BridgeToken
  fees: BridgeFee[]
  gas_cost_usd: number | null
  execution_duration_secs: number
  tool: string
  tool_logo_url: string | null
}

export interface BridgeToken {
  address: string
  symbol: string
  decimals: number
  logo_url: string | null
  usd_price: number | null
}

export interface BridgeFee {
  name: string
  symbol: string
  amount: string
  decimals: number
  amount_usd: number | null
  /** Already taken out of to_amount (true), or charged on top in the tx value (false). */
  included: boolean
}

export interface BridgeStatus {
  status: 'pending' | 'done' | 'failed'
  substatus: string | null
  receiving_tx_hash: string | null
  // The rest is absent from a backend older than these fields.
  sending_tx_hash?: string | null
  /**
   * The accounts at either end — the sender on the source chain and the
   * recipient on the destination — rather than the bridge contracts and
   * relayers each leg's own transaction shows. Null until LI.FI has indexed it.
   */
  from_address?: string | null
  to_address?: string | null
  /** Null for a chain this wallet doesn't support (another EVM chain, Solana…). */
  from_chain?: ChainSlug | null
  to_chain?: ChainSlug | null
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
  nativePriceHistory: (chain: ChainSlug) =>
    getJson<PriceHistory>(`/api/v1/chains/${chain}/native-price-history`),
  tokenPriceHistory: (chain: ChainSlug, address: string) =>
    getJson<PriceHistory>(`/api/v1/chains/${chain}/token/${encodeURIComponent(address)}/price-history`),
  fxRates: (base = 'USD') => getJson<FxRates>('/api/v1/fx-rates', { base }),
  /** Rates as published on a past "YYYY-MM-DD" (or the business day before). */
  fxRatesOn: (date: string, base = 'USD') => getJson<FxRates>('/api/v1/fx-rates', { base, date }),
  /** An asset's USD price when a transaction was mined; `token` null for the native coin. */
  historicalPrice: (chain: ChainSlug, token: string | null, unixSecs: number) =>
    getJson<{ usd: number }>(`/api/v1/chains/${chain}/historical-price`, {
      timestamp: String(Math.floor(unixSecs)),
      ...(token ? { token } : {}),
    }),
  searchCoins: (query: string) => getJson<CoinSearchResult[]>('/api/v1/coins/search', { q: query }),
  coinPriceHistory: (id: string, symbol: string) =>
    getJson<PriceHistory>(`/api/v1/coins/${encodeURIComponent(id)}/price-history`, { symbol }),
  fxHistory: (base: string, quote: string) => getJson<FxHistory>('/api/v1/fx-history', { base, quote }),
  broadcastTransaction: (chain: ChainSlug, rawTransaction: string) =>
    postJson<{ transaction_hash: string }>(`/api/v1/chains/${chain}/broadcast`, {
      raw_transaction: rawTransaction,
    }),
  transactionStatus: (chain: ChainSlug, hash: string) =>
    getJson<{ status: TransactionStatus }>(`/api/v1/chains/${chain}/tx-status/${encodeURIComponent(hash)}`),
  transactionFee: (chain: ChainSlug, hash: string) =>
    getJson<TransactionFee>(`/api/v1/chains/${chain}/tx-fee/${encodeURIComponent(hash)}`),
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
  bridgeQuote: (params: {
    fromChain: ChainSlug
    toChain: ChainSlug
    fromToken: string
    toToken: string
    fromAmountWei: string
    fromAddress: string
    toAddress: string
  }) =>
    getJson<BridgeQuote>('/api/v1/bridge/quote', {
      from_chain: params.fromChain,
      to_chain: params.toChain,
      from_token: params.fromToken,
      to_token: params.toToken,
      from_amount: params.fromAmountWei,
      from_address: params.fromAddress,
      to_address: params.toAddress,
    }),
  bridgeStatus: (hash: string, fromChain: ChainSlug, toChain: ChainSlug) =>
    getJson<BridgeStatus>('/api/v1/bridge/status', { tx_hash: hash, from_chain: fromChain, to_chain: toChain }),
  /** By either leg's hash, without knowing which it is — or whether it's a bridge at all. */
  bridgeLookup: (hash: string) => getJson<BridgeStatus>('/api/v1/bridge/status', { tx_hash: hash }),
  /** The chain's whole token list — searched client-side, see services/tokenSearch.ts. */
  tokenList: (chain: ChainSlug) => getJson<TokenListItem[]>(`/api/v1/chains/${chain}/tokens`),
}
