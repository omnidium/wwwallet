import type { TokenListItem } from './api'

/**
 * Ranks symbol-exact matches first, then symbol-prefix, then a substring hit
 * on either symbol or name — the order a user typing "usd" would expect
 * (USDC/USDT before "Fake USD Token") — keeping the list's own order within
 * each rank, capped to `limit` results.
 */
export function searchTokenList(list: TokenListItem[], query: string, limit = 20): TokenListItem[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const ranked: { rank: number; index: number; item: TokenListItem }[] = []
  list.forEach((item, index) => {
    const symbol = item.symbol.toLowerCase()
    const name = item.name.toLowerCase()
    const rank =
      symbol === needle ? 0
      : symbol.startsWith(needle) ? 1
      : symbol.includes(needle) || name.includes(needle) ? 2
      : -1
    if (rank >= 0) ranked.push({ rank, index, item })
  })
  ranked.sort((a, b) => a.rank - b.rank || a.index - b.index)
  return ranked.slice(0, limit).map((r) => r.item)
}

/**
 * The tokens behind `symbols`, in that order — each only when exactly one
 * token in the list has that symbol. A shared symbol is skipped rather than
 * guessed at: suggesting the wrong one of two "USDC"s in a swap picker is how
 * a lookalike token gets bought.
 */
export function popularTokens(list: TokenListItem[], symbols: string[]): TokenListItem[] {
  const bySymbol = new Map<string, TokenListItem[]>()
  for (const item of list) {
    const key = item.symbol.toUpperCase()
    bySymbol.set(key, [...(bySymbol.get(key) ?? []), item])
  }
  return symbols.flatMap((symbol) => {
    const matches = bySymbol.get(symbol.toUpperCase()) ?? []
    return matches.length === 1 ? matches : []
  })
}
