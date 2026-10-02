import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api, type ChainSlug, type CoinSearchResult, type PriceHistory } from '@/services/api'
import type { WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { getPublic, putPublic } from '@/services/secureCache'
import { NATIVE_ASSETS } from '@/config/nativeAssets'

// The one deliberate exception to "nothing personal is readable while
// locked" (see services/secureCache.ts): the lock screen shows the
// favourites before anything is decrypted, so everything it needs is kept
// here, unencrypted — which assets are starred, which chains have a visible
// account, each starred token's / coin's symbol and logo, any starred
// currency pairs, their order, and their latest prices. No addresses,
// balances or history: starring an asset says nothing about whether it's
// held. Gone with the rest of the cache on deleteFromDevice or a restore
// (see stores/vault.ts).
const FAVOURITES_KEY = 'favourites'
// The chains with at least one visible account, as of the last unlock or
// account change — account visibility itself is only in the vault.
const VISIBLE_CHAINS_KEY = 'visible-chains'
const TOKEN_DISPLAY_KEY = 'favourite-tokens'
const PRICES_KEY = 'favourite-prices'
const EXTRAS_KEY = 'favourite-extras'
const ORDER_KEY = 'favourite-order'

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

/**
 * Favourites with no wallet chain behind them: any coin the price source
 * lists (Bitcoin, Solana…), or a currency pair. Added from the Favourites
 * card's search rather than starred from a token page.
 */
export type ExtraFavourite =
  | { kind: 'coin'; id: string; symbol: string; name: string; logoUrl: string | null }
  | { kind: 'fx'; base: string; quote: string }

/** One row of the favourites list, whichever kind it is. */
export type FavouriteItem =
  | ({ kind: 'asset'; key: string } & FavouriteAsset)
  | ({ key: string } & ExtraFavourite)

export function coinKey(id: string): string {
  return `coin:${id}`
}

export function fxKey(base: string, quote: string): string {
  return `fx:${base}/${quote}`
}

export const useFavouritesStore = defineStore('favourites', () => {
  const chainData = useChainDataStore()
  // Only explicit choices, keyed by chainData.assetKey; anything missing
  // falls back to the default (see isFavourite).
  const choices = ref<Record<string, boolean>>({})
  const visibleChains = ref<ChainSlug[]>([])
  const tokenDisplay = ref<Record<string, FavouriteTokenDisplay>>({})
  /**
   * Latest prices by item key. Currency pairs are stored in the same shape —
   * `usd` holding the rate and `change_24h_pct` the day-over-day change —
   * so every row renders from one record; FavouritesList formats them apart.
   */
  const prices = ref<Record<string, PriceHistory>>({})
  const extras = ref<Record<string, ExtraFavourite>>({})
  /** Item keys in the user's chosen order; anything not in it follows, in its natural order. */
  const order = ref<string[]>([])

  function save(key: string, data: unknown) {
    putPublic(key, data).catch((err) => console.warn(`Failed to save ${key}`, err))
  }

  let loading: Promise<void> | null = null
  function load(): Promise<void> {
    loading ??= (async () => {
      const [savedChoices, savedChains, savedDisplay, savedPrices, savedExtras, savedOrder] = await Promise.all([
        getPublic<Record<string, boolean>>(FAVOURITES_KEY),
        getPublic<ChainSlug[]>(VISIBLE_CHAINS_KEY),
        getPublic<Record<string, FavouriteTokenDisplay>>(TOKEN_DISPLAY_KEY),
        getPublic<Record<string, PriceHistory>>(PRICES_KEY),
        getPublic<Record<string, ExtraFavourite>>(EXTRAS_KEY),
        getPublic<string[]>(ORDER_KEY),
      ])
      // Anything set in this session before the load finished wins.
      if (savedChoices) choices.value = { ...savedChoices, ...choices.value }
      if (savedChains && visibleChains.value.length === 0) visibleChains.value = savedChains
      if (savedDisplay) tokenDisplay.value = { ...savedDisplay, ...tokenDisplay.value }
      if (savedPrices) prices.value = { ...savedPrices, ...prices.value }
      if (savedExtras) extras.value = { ...savedExtras, ...extras.value }
      if (savedOrder && order.value.length === 0) order.value = savedOrder
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
    if (order.value.includes(key)) {
      order.value = order.value.filter((k) => k !== key)
      save(ORDER_KEY, order.value)
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
   * The wallet-chain favourites: the native currency of each chain with a
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
   * Everything favourited — wallet-chain assets, then coins and currency
   * pairs — in the user's order (see `order`). What both the lock screen and
   * the Favourites card list.
   */
  const items = computed<FavouriteItem[]>(() => {
    const natural: FavouriteItem[] = [
      ...lockScreenAssets.value.map((asset) => ({
        kind: 'asset' as const,
        key: chainData.assetKey(asset.chain, asset.contractAddress),
        ...asset,
      })),
      ...Object.entries(extras.value).map(([key, extra]) => ({ key, ...extra })),
    ]
    const rank = new Map(order.value.map((key, i) => [key, i]))
    return natural
      .map((item, i) => ({ item, i, r: rank.get(item.key) ?? order.value.length + i }))
      .sort((a, b) => a.r - b.r)
      .map(({ item }) => item)
  })

  function has(key: string): boolean {
    return items.value.some((item) => item.key === key)
  }

  async function addCoin(coin: CoinSearchResult) {
    await load()
    const key = coinKey(coin.id)
    extras.value[key] = { kind: 'coin', id: coin.id, symbol: coin.symbol, name: coin.name, logoUrl: coin.logo_url }
    save(EXTRAS_KEY, extras.value)
    fetchFirstPrice(key)
  }

  async function addFx(base: string, quote: string) {
    await load()
    const key = fxKey(base, quote)
    extras.value[key] = { kind: 'fx', base, quote }
    save(EXTRAS_KEY, extras.value)
    fetchFirstPrice(key)
  }

  // A just-added row's price, straight away rather than at the next refresh.
  // Failure just leaves the row on "—" until then.
  function fetchFirstPrice(key: string) {
    const item = items.value.find((i) => i.key === key)
    if (!item) return
    refreshPrice(item)
      .then(() => save(PRICES_KEY, prices.value))
      .catch((err) => console.warn(`Failed to price ${key}`, err))
  }

  async function remove(item: FavouriteItem) {
    await load()
    if (item.kind !== 'asset') {
      delete extras.value[item.key]
      save(EXTRAS_KEY, extras.value)
      forgetAsset(item.key)
      return
    }
    if (item.contractAddress !== null) {
      await setFavourite(item.chain, item.contractAddress, false)
      return
    }
    // A native row stands for every visible chain sharing its currency
    // (the ETH L2s) — unstar them all, or the next one's row just takes its place.
    const symbol = NATIVE_ASSETS[item.chain].symbol
    for (const chain of visibleChains.value) {
      if (NATIVE_ASSETS[chain].symbol === symbol) await setFavourite(chain, null, false)
    }
  }

  function reorder(keys: string[]) {
    order.value = keys
    save(ORDER_KEY, keys)
  }

  async function refreshPrice(item: FavouriteItem): Promise<void> {
    let history: PriceHistory
    if (item.kind === 'asset') {
      history = await (item.contractAddress === null
        ? api.nativePriceHistory(item.chain)
        : api.tokenPriceHistory(item.chain, item.contractAddress))
    } else if (item.kind === 'coin') {
      history = await api.coinPriceHistory(item.id, item.symbol)
    } else {
      const fx = await api.fxHistory(item.base, item.quote)
      history = { usd: fx.rate, change_24h_pct: fx.change_1d_pct, points: fx.points }
    }
    prices.value[item.key] = history
  }

  /**
   * Fresh prices for every row, each on its own — one that fails just keeps
   * its last known numbers. Straight from the API rather than through
   * chainData, whose price cache is encrypted.
   */
  async function refreshPrices(): Promise<void> {
    await load()
    await Promise.allSettled(items.value.map(refreshPrice))
    save(PRICES_KEY, prices.value)
  }

  /** Drops everything in memory — for when the cache itself has just been wiped. */
  function forget() {
    choices.value = {}
    visibleChains.value = []
    tokenDisplay.value = {}
    prices.value = {}
    extras.value = {}
    order.value = []
    loading = null
  }

  return {
    load,
    isFavourite,
    setFavourite,
    updateTokenDisplay,
    rememberVisibleChains,
    lockScreenAssets,
    items,
    has,
    addCoin,
    addFx,
    remove,
    reorder,
    tokenDisplay,
    prices,
    refreshPrices,
    forget,
  }
})
