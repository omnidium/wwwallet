import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, type ChainSlug, type PriceHistory } from '@/services/api'
import type { WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { deletePublic, getPublic, putPublic } from '@/services/secureCache'
import { NATIVE_ASSETS } from '@/config/nativeAssets'

// The one deliberate exception to "nothing personal is readable while
// locked" (see services/secureCache.ts): the lock screen shows the
// favourites before anything is decrypted, so everything it needs is kept
// here, unencrypted — which assets are starred, which chains have a visible
// account, each starred token's symbol and logo, and their latest 24h
// prices. No addresses, balances or history: starring an asset says nothing
// about whether it's held. Gone with the rest of the cache on
// deleteFromDevice or a restore (see stores/vault.ts).
const FAVOURITES_KEY = 'favourites'
// The chains with at least one visible account, as of the last unlock or
// account change — account visibility itself is only in the vault.
const VISIBLE_CHAINS_KEY = 'visible-chains'
const TOKEN_DISPLAY_KEY = 'favourite-tokens'
const PRICES_KEY = 'favourite-prices'

export interface FavouriteAsset {
  chain: ChainSlug
  /** Null for the chain's native currency. */
  contractAddress: string | null
}

/** What a starred token's lock-screen row shows besides its prices. */
export interface FavouriteTokenDisplay {
  symbol: string
  logoUrl: string | null
}

export const useFavouritesStore = defineStore('favourites', () => {
  const chainData = useChainDataStore()
  // Only explicit choices, keyed by chainData.assetKey; anything missing
  // falls back to the default (see isFavourite).
  const choices = ref<Record<string, boolean>>({})
  const visibleChains = ref<ChainSlug[]>([])
  const tokenDisplay = ref<Record<string, FavouriteTokenDisplay>>({})
  const prices = ref<Record<string, PriceHistory>>({})

  function save(key: string, data: unknown) {
    putPublic(key, data).catch((err) => console.warn(`Failed to save ${key}`, err))
  }

  let loading: Promise<void> | null = null
  function load(): Promise<void> {
    loading ??= (async () => {
      const [savedChoices, savedChains, savedDisplay, savedPrices] = await Promise.all([
        getPublic<Record<string, boolean>>(FAVOURITES_KEY),
        getPublic<ChainSlug[]>(VISIBLE_CHAINS_KEY),
        getPublic<Record<string, FavouriteTokenDisplay>>(TOKEN_DISPLAY_KEY),
        getPublic<Record<string, PriceHistory>>(PRICES_KEY),
      ])
      // Anything set in this session before the load finished wins.
      if (savedChoices) choices.value = { ...savedChoices, ...choices.value }
      if (savedChains && visibleChains.value.length === 0) visibleChains.value = savedChains
      if (savedDisplay) tokenDisplay.value = { ...savedDisplay, ...tokenDisplay.value }
      if (savedPrices) prices.value = { ...savedPrices, ...prices.value }
    })().catch((err) => {
      console.warn('Failed to read favourites', err)
    })
    return loading
  }

  /** Native currencies are favourites unless unstarred; tokens only once starred. */
  function isFavourite(chain: ChainSlug, contractAddress: string | null): boolean {
    return choices.value[chainData.assetKey(chain, contractAddress)] ?? contractAddress === null
  }

  /** `display` is required to star a token — the lock screen has no other way to name it. */
  async function setFavourite(
    chain: ChainSlug,
    contractAddress: string | null,
    favourite: boolean,
    display?: FavouriteTokenDisplay,
  ) {
    await load()
    const key = chainData.assetKey(chain, contractAddress)
    choices.value[key] = favourite
    save(FAVOURITES_KEY, choices.value)
    if (contractAddress !== null && favourite && display) {
      tokenDisplay.value[key] = display
      save(TOKEN_DISPLAY_KEY, tokenDisplay.value)
    }
    if (!favourite) forgetAsset(key)
  }

  /** Keeps a starred token's symbol/logo current as its metadata improves. */
  function updateTokenDisplay(chain: ChainSlug, contractAddress: string, display: FavouriteTokenDisplay) {
    const key = chainData.assetKey(chain, contractAddress)
    if (!choices.value[key]) return
    const known = tokenDisplay.value[key]
    if (known?.symbol === display.symbol && known.logoUrl === display.logoUrl) return
    tokenDisplay.value[key] = display
    save(TOKEN_DISPLAY_KEY, tokenDisplay.value)
  }

  // An unstarred asset leaves nothing behind in the unencrypted record.
  function forgetAsset(key: string) {
    if (key in tokenDisplay.value) {
      delete tokenDisplay.value[key]
      save(TOKEN_DISPLAY_KEY, tokenDisplay.value)
    }
    if (key in prices.value) {
      delete prices.value[key]
      save(PRICES_KEY, prices.value)
    }
  }

  /** Called whenever the decrypted account list is loaded or changes — see stores/vault.ts. */
  function rememberVisibleChains(accounts: WalletAccount[]) {
    const chains = [...new Set(accounts.filter((a) => a.visible).map((a) => a.chain))]
    if (chains.join() === visibleChains.value.join()) return
    visibleChains.value = chains
    save(VISIBLE_CHAINS_KEY, chains)
  }

  /**
   * What the lock screen lists: the native currency of each chain with a
   * visible account, then every starred token. The L2s all settle in ETH,
   * so their native currencies collapse into one row (the first chain's).
   */
  const lockScreenAssets = computed<FavouriteAsset[]>(() => {
    const natives = new Map<string, FavouriteAsset>()
    for (const chain of visibleChains.value) {
      if (!isFavourite(chain, null)) continue
      const symbol = NATIVE_ASSETS[chain].symbol
      if (!natives.has(symbol)) natives.set(symbol, { chain, contractAddress: null })
    }
    const tokens = Object.entries(choices.value)
      .filter(([key, favourite]) => favourite && !key.endsWith(':native'))
      .map(([key]) => {
        const [chain, contractAddress] = key.split(':') as [ChainSlug, string]
        return { chain, contractAddress }
      })
    return [...natives.values(), ...tokens]
  })

  /**
   * Fresh 24h prices for every lock-screen row, each on its own — one that
   * fails just keeps its last known numbers. Straight from the API rather
   * than through chainData, whose price cache is encrypted.
   */
  async function refreshPrices(): Promise<void> {
    await load()
    await Promise.allSettled(
      lockScreenAssets.value.map(async ({ chain, contractAddress }) => {
        const history = await (contractAddress === null
          ? api.nativePriceHistory(chain)
          : api.tokenPriceHistory(chain, contractAddress))
        prices.value[chainData.assetKey(chain, contractAddress)] = history
      }),
    )
    save(PRICES_KEY, prices.value)
  }

  /** Drops everything in memory — for when the cache itself has just been wiped. */
  function forget() {
    choices.value = {}
    visibleChains.value = []
    tokenDisplay.value = {}
    prices.value = {}
    loading = null
  }

  return {
    load,
    isFavourite,
    setFavourite,
    updateTokenDisplay,
    rememberVisibleChains,
    lockScreenAssets,
    tokenDisplay,
    prices,
    refreshPrices,
    forget,
  }
})
