import { describe, expect, it } from 'vitest'
import type { TokenListItem } from '../api'
import { searchTokenList } from '../tokenSearch'

function item(symbol: string, name: string): TokenListItem {
  return { address: `0x${symbol}`, name, symbol, decimals: 18, logo_url: null }
}

describe('searchTokenList', () => {
  it('ranks an exact symbol match above a prefix match above a substring match', () => {
    const list = [item('FUSDC', 'Fake USDC Token'), item('USDCX', 'USDC Extended'), item('USDC', 'USD Coin')]
    expect(searchTokenList(list, 'usdc').map((t) => t.symbol)).toEqual(['USDC', 'USDCX', 'FUSDC'])
  })

  it('is case-insensitive, matches names too, and respects the limit', () => {
    const list = [item('USDC', 'USD Coin'), item('USDT', 'Tether'), item('XYZ', 'Some usd thing')]
    expect(searchTokenList(list, 'USD', 1)).toHaveLength(1)
    expect(searchTokenList(list, 'usd')).toHaveLength(3)
  })

  it('returns nothing for a blank query', () => {
    expect(searchTokenList([item('USDC', 'USD Coin')], '   ')).toEqual([])
  })
})
