const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `request to ${path} failed with ${res.status}`)
  }
  return res.json() as Promise<T>
}

export interface Currency {
  language: string
  id: number
  key_word: string
  name: string | null
}

export interface Language {
  id: string
  key_word: string | null
  name: string | null
}

export interface MsgCode {
  language: string
  id: number
  key_word: string
  name: string | null
}

export interface Template {
  language: string
  id: string
  key_word: string
  name: string | null
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

export type ChainSlug = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'optimism'

export const api = {
  currencies: (language: string) => getJson<Currency[]>(`/api/v1/reference/currencies/${language}`),
  languages: () => getJson<Language[]>('/api/v1/reference/languages'),
  msgCodes: (language: string) => getJson<MsgCode[]>(`/api/v1/reference/msg-codes/${language}`),
  templates: (language: string) => getJson<Template[]>(`/api/v1/reference/templates/${language}`),
  addressActivity: (chain: ChainSlug, address: string) =>
    getJson<AddressActivity>(`/api/v1/chains/${chain}/address/${address}`),
  tokenMetadata: (chain: ChainSlug, address: string) =>
    getJson<TokenMetadata>(`/api/v1/chains/${chain}/token/${address}`),
  fxRates: (base = 'USD') => getJson<FxRates>(`/api/v1/fx-rates?base=${base}`),
}
