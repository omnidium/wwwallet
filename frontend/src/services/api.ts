const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `request to ${path} failed with ${res.status}`)
  }
  return res.json() as Promise<T>
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `request to ${path} failed with ${res.status}`)
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
  block_number: number | null
  timestamp: string | null
  status: 'success' | 'failed' | 'pending'
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
}

export interface FxRates {
  base: string
  rates: Record<string, number>
  as_of_unix: number
}

export interface TransactionPrep {
  nonce: number
  gas_price: string
  gas_limit: string
  chain_id: number
}

export type ChainSlug = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'optimism'

export const api = {
  addressActivity: (chain: ChainSlug, address: string) =>
    getJson<AddressActivity>(`/api/v1/chains/${chain}/address/${address}`),
  tokenMetadata: (chain: ChainSlug, address: string) =>
    getJson<TokenMetadata>(`/api/v1/chains/${chain}/token/${address}`),
  fxRates: (base = 'USD') => getJson<FxRates>(`/api/v1/fx-rates?base=${base}`),
  broadcastTransaction: (chain: ChainSlug, rawTransaction: string) =>
    postJson<{ transaction_hash: string }>(`/api/v1/chains/${chain}/broadcast`, {
      raw_transaction: rawTransaction,
    }),
  transactionPrep: (chain: ChainSlug, from: string, to: string, valueWei: string) =>
    getJson<TransactionPrep>(
      `/api/v1/chains/${chain}/tx-prep/${from}?to=${to}&value=${valueWei}`,
    ),
}
