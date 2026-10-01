import { beforeEach, describe, expect, it } from 'vitest'
import 'fake-indexeddb/auto'
import { createPinia, setActivePinia } from 'pinia'
import { clearCache, flushCacheWrites, getPublic } from '@/services/secureCache'
import type { WalletAccount } from '../accounts'
import { useFavouritesStore } from '../favourites'

const TOKEN = `0x${'b'.repeat(40)}`
const USDC = { symbol: 'USDC', logoUrl: 'https://logo' }

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
})
