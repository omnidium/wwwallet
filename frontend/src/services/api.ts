import { i18n } from '@/i18n'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787'

// The backend's rate limiter is sized for a slow trickle, not a burst — a
// wallet with many held tokens can still legitimately produce one request
// per token (see the concurrency-limited caller in AccountCard.vue). A 429
// here is expected to be transient, not a real failure, so retry a couple
// times with a short backoff instead of leaving that one item stuck blank
// until the user manually reloads. No Retry-After header is sent, so this
// backoff length is just a reasonable guess, not a computed wait time.
const RATE_LIMIT_RETRY_DELAYS_MS = [1000, 3000]

async function fetchWithRetry(input: string | URL, init?: RequestInit): Promise<Response> {
  let res = await fetch(input, init)
  for (const delayMs of RATE_LIMIT_RETRY_DELAYS_MS) {
    if (res.status !== 429) break
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    res = await fetch(input, init)
  }
  return res
}

async function getJson<T>(path: string, query?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  if (query) for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value)
  const res = await fetchWithRetry(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? i18n.global.t('errors.requestFailed', { path, status: res.status }))
  }
  return res.json() as Promise<T>
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? i18n.global.t('errors.requestFailed', { path, status: res.status }))
  }
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

export interface AddressActivity {
  balances: Balance[]
  transactions: Transaction[]
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
}

export type ChainSlug = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'optimism'

export const api = {
  addressActivity: (chain: ChainSlug, address: string) =>
    getJson<AddressActivity>(`/api/v1/chains/${chain}/address/${encodeURIComponent(address)}`),
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
}
