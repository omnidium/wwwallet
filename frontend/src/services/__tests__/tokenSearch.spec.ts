import { describe, expect, it } from 'vitest'
import type { TokenListItem } from '../api'
import { popularTokens, searchTokenList } from '../tokenSearch'

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

describe('popularTokens', () => {
  it('returns the listed symbols in the asked order, case-insensitively', () => {
    const list = [item('DAI', 'Dai'), item('usdc', 'USD Coin'), item('XYZ', 'Other')]
    expect(popularTokens(list, ['USDC', 'DAI']).map((t) => t.name)).toEqual(['USD Coin', 'Dai'])
  })

  it('skips a symbol the list lacks or that more than one token shares', () => {
    const list = [item('USDC', 'USD Coin'), item('UNI', 'Uniswap'), { ...item('UNI', 'Fake Uniswap'), address: '0xfake' }]
    expect(popularTokens(list, ['UNI', 'WBTC', 'USDC']).map((t) => t.name)).toEqual(['USD Coin'])
  })
})
