import { beforeEach, describe, expect, it, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { createPinia, setActivePinia } from 'pinia'
import { clearCache, flushCacheWrites, getPublic } from '@/services/secureCache'
import type { WalletAccount } from '../accounts'
import { api } from '@/services/api'
import { useFavouritesStore } from '../favourites'
import { fxPairsForQuery } from '@/config/fxCurrencies'

const TOKEN = `0x${'b'.repeat(40)}`
const USDC = { symbol: 'USDC', logoUrl: 'https://logo' }
const SOLANA = { id: 'solana', symbol: 'SOL', name: 'Solana', logo_url: 'https://sol', market_cap_rank: 7 }

function account(chain: WalletAccount['chain'], visible = true): WalletAccount {
  return {
    address: `0x${'a'.repeat(40)}`,
    label: chain,
    chain,
    privateKey: '0x00',
    isDefault: true,
    visible,
    hasMnemonic: false,
  }
}

describe('favourites store', () => {
  beforeEach(async () => {
    vi.restoreAllMocks()
    await clearCache()
    setActivePinia(createPinia())
  })

  it('stars native currencies by default and tokens only once chosen', async () => {
    const favourites = useFavouritesStore()
    expect(favourites.isFavourite('polygon', null)).toBe(true)
    expect(favourites.isFavourite('polygon', TOKEN)).toBe(false)

    await favourites.setFavourite('polygon', null, false)
    await favourites.setFavourite('polygon', TOKEN, true)
    expect(favourites.isFavourite('polygon', null)).toBe(false)
    expect(favourites.isFavourite('polygon', TOKEN)).toBe(true)
  })

  it('lists one row per native currency of visible chains, then starred tokens', async () => {
    const favourites = useFavouritesStore()
    favourites.rememberVisibleChains([
      account('base'),
      account('ethereum'),
      account('polygon'),
      account('optimism', false),
    ])
    await favourites.setFavourite('ethereum', TOKEN, true)

    expect(favourites.lockScreenAssets).toEqual([
      { chain: 'base', contractAddress: null },
      { chain: 'polygon', contractAddress: null },
      { chain: 'ethereum', contractAddress: TOKEN },
    ])
  })

  it('reads choices and visible chains back from disk before unlock', async () => {
    const before = useFavouritesStore()
    before.rememberVisibleChains([account('polygon')])
    await before.setFavourite('polygon', TOKEN, true, USDC)
    await flushCacheWrites()

    setActivePinia(createPinia())
    const after = useFavouritesStore()
    await after.load()
    expect(after.lockScreenAssets).toEqual([
      { chain: 'polygon', contractAddress: null },
      { chain: 'polygon', contractAddress: TOKEN },
    ])
  })

  it('keeps a starred token named on the lock screen, and nothing once unstarred', async () => {
    const favourites = useFavouritesStore()
    await favourites.setFavourite('ethereum', TOKEN, true, USDC)
    favourites.prices[`ethereum:${TOKEN}`] = { usd: 1, change_24h_pct: 0, points: [1, 1] }
    expect(favourites.tokenDisplay[`ethereum:${TOKEN}`]).toEqual(USDC)

    await favourites.setFavourite('ethereum', TOKEN, false)
    await flushCacheWrites()
    expect(await getPublic('favourite-tokens')).toEqual({})
    expect(await getPublic('favourite-prices')).toEqual({})
  })

  it('adds coins and currency pairs after the wallet assets, and keeps them across a reload', async () => {
    vi.spyOn(api, 'coinPriceHistory').mockResolvedValue({ usd: 150, change_24h_pct: 2, points: [147, 150] })
    vi.spyOn(api, 'fxHistory').mockResolvedValue({
      base: 'EUR', quote: 'USD', rate: 1.13, change_1d_pct: -0.5, points: [1.1, 1.12, 1.14, 1.13],
    })
    const before = useFavouritesStore()
    before.rememberVisibleChains([account('ethereum')])
    await before.addCoin(SOLANA)
    await before.addFx('EUR', 'USD')
    await vi.waitFor(() => expect(before.prices['fx:EUR/USD']?.usd).toBe(1.13))
    expect(before.items.map((i) => i.key)).toEqual(['ethereum:native', 'coin:solana', 'fx:EUR/USD'])
    // A pair's rate and day-over-day change ride in the PriceHistory shape,
    // its line just the last two daily rates — there's no intraday series.
    expect(before.prices['fx:EUR/USD']).toEqual({ usd: 1.13, change_24h_pct: -0.5, points: [1.14, 1.13] })
    await flushCacheWrites()

    setActivePinia(createPinia())
    const after = useFavouritesStore()
    await after.load()
    expect(after.items.map((i) => i.key)).toEqual(['ethereum:native', 'coin:solana', 'fx:EUR/USD'])
    expect(after.has('coin:solana')).toBe(true)
  })

  it('lists items in the saved order, with anything newer after it', async () => {
    vi.spyOn(api, 'coinPriceHistory').mockRejectedValue(new Error('offline'))
    vi.spyOn(api, 'fxHistory').mockRejectedValue(new Error('offline'))
    const favourites = useFavouritesStore()
    favourites.rememberVisibleChains([account('ethereum')])
    await favourites.addCoin(SOLANA)
    favourites.reorder(['coin:solana', 'ethereum:native'])
    await favourites.addFx('EUR', 'GBP')
    expect(favourites.items.map((i) => i.key)).toEqual(['coin:solana', 'ethereum:native', 'fx:EUR/GBP'])
  })

  it('removes a native row for every chain sharing its currency, and an extra outright', async () => {
    vi.spyOn(api, 'coinPriceHistory').mockRejectedValue(new Error('offline'))
    const favourites = useFavouritesStore()
    favourites.rememberVisibleChains([account('base'), account('optimism'), account('polygon')])
    await favourites.addCoin(SOLANA)
    expect(favourites.items.map((i) => i.key)).toEqual(['base:native', 'polygon:native', 'coin:solana'])

    await favourites.remove(favourites.items[0]!)
    expect(favourites.isFavourite('base', null)).toBe(false)
    expect(favourites.isFavourite('optimism', null)).toBe(false)
    await favourites.remove(favourites.items.find((i) => i.key === 'coin:solana')!)
    expect(favourites.items.map((i) => i.key)).toEqual(['polygon:native'])
    await flushCacheWrites()
    expect(await getPublic('favourite-extras')).toEqual({})
  })

  it('shares a price refresh already running, and starts a fresh one once it is done', async () => {
    const history = vi.spyOn(api, 'nativePriceHistory')
      .mockResolvedValue({ usd: 3000, change_24h_pct: 1, points: [2970, 3000] })
    const favourites = useFavouritesStore()
    favourites.rememberVisibleChains([account('ethereum')])

    const first = favourites.refreshPrices()
    expect(favourites.refreshing).toBe(true)
    await Promise.all([first, favourites.refreshPrices()])
    expect(favourites.refreshing).toBe(false)
    expect(history).toHaveBeenCalledTimes(1)
    expect(favourites.prices['ethereum:native']?.usd).toBe(3000)

    await favourites.refreshPrices()
    expect(history).toHaveBeenCalledTimes(2)
  })

  it('replaces a refresh that has hung, as one frozen in a background tab can', async () => {
    const history = vi.spyOn(api, 'nativePriceHistory')
      .mockReturnValueOnce(new Promise(() => {}))
      .mockResolvedValue({ usd: 3000, change_24h_pct: 1, points: [2970, 3000] })
    const favourites = useFavouritesStore()
    favourites.rememberVisibleChains([account('ethereum')])

    const now = Date.now()
    const clock = vi.spyOn(Date, 'now').mockReturnValue(now)
    void favourites.refreshPrices()
    await vi.waitFor(() => expect(history).toHaveBeenCalledTimes(1))
    clock.mockReturnValue(now + 60_000)
    await favourites.refreshPrices()
    expect(history).toHaveBeenCalledTimes(2)
    expect(favourites.refreshing).toBe(false)
    expect(favourites.prices['ethereum:native']?.usd).toBe(3000)
  })
})

describe('fxPairsForQuery', () => {
  it('reads a full pair however it is written', () => {
    expect(fxPairsForQuery('EUR/USD', 'GBP')).toEqual([{ base: 'EUR', quote: 'USD' }])
    expect(fxPairsForQuery('eur usd', 'GBP')).toEqual([{ base: 'EUR', quote: 'USD' }])
    expect(fxPairsForQuery('GBPJPY', 'USD')).toEqual([{ base: 'GBP', quote: 'JPY' }])
  })

  it('pairs a lone code with the display currency, or USD/EUR when that will not do', () => {
    expect(fxPairsForQuery('eur', 'GBP')).toEqual([{ base: 'EUR', quote: 'GBP' }])
    expect(fxPairsForQuery('GBP', 'GBP')).toEqual([{ base: 'GBP', quote: 'USD' }])
    expect(fxPairsForQuery('USD', 'USD')).toEqual([{ base: 'USD', quote: 'EUR' }])
    expect(fxPairsForQuery('EUR', 'CNH')).toEqual([{ base: 'EUR', quote: 'USD' }])
  })

  it('ignores anything that is not a quotable currency', () => {
    expect(fxPairsForQuery('sol', 'USD')).toEqual([])
    expect(fxPairsForQuery('EUREUR', 'USD')).toEqual([])
    expect(fxPairsForQuery('bitcoin', 'USD')).toEqual([])
  })

})
