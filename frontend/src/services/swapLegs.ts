import type { Transaction } from '@/services/api'

/** A token as a transaction names it: its contract, or null for the native coin. */
export type TokenContract = string | null

function sameToken(a: TokenContract, b: TokenContract): boolean {
  return (a?.toLowerCase() ?? null) === (b?.toLowerCase() ?? null)
}

/**
 * Which side of a transaction `token` is on: the leg sent (a swap's sold
 * token, or a plain transfer's only one), a swap's bought leg, or null when
 * it doesn't move that token at all.
 */
export function swapLegOf(txn: Transaction, token: TokenContract): 'sold' | 'bought' | null {
  if (sameToken(txn.contract_address, token)) return 'sold'
  if (txn.counter_asset !== null && sameToken(txn.counter_contract_address, token)) return 'bought'
  return null
}

/** How much of `token` the transaction moved, as a decimal string — '0' if none. */
export function amountOfToken(txn: Transaction, token: TokenContract): string {
  const leg = swapLegOf(txn, token)
  if (leg === 'sold') return txn.value
  if (leg === 'bought') return txn.counter_value ?? '0'
  return '0'
}

export interface SwapRate {
  /** Always 1 of this. */
  baseAsset: string
  quoteAsset: string
  /** How much quoteAsset one baseAsset fetched. */
  rate: number
}

/**
 * A swap's rate, as "1 base = rate quote": one of the token being viewed
 * from (`perspective`), if it's one of the two legs, else one of the token
 * sold. Null for anything but a swap whose amounts are both known and above
 * zero.
 */
export function swapRate(txn: Transaction, perspective?: TokenContract): SwapRate | null {
  if (txn.counter_asset === null) return null
  const sold = Number(txn.value)
  const bought = Number(txn.counter_value)
  if (!(sold > 0) || !(bought > 0) || !Number.isFinite(sold) || !Number.isFinite(bought)) return null
  const fromBought = perspective !== undefined && swapLegOf(txn, perspective) === 'bought'
  return fromBought
    ? { baseAsset: txn.counter_asset, quoteAsset: txn.asset, rate: sold / bought }
    : { baseAsset: txn.asset, quoteAsset: txn.counter_asset, rate: bought / sold }
}
