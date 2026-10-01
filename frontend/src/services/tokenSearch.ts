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
