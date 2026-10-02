import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import {
  api,
  type AddressActivity,
  type Balance,
  type ChainSlug,
  type FxRates,
  type NativePrice,
  type PriceHistory,
  type SwapFee,
  type TransactionFee,
  type Transaction,
  type TokenListItem,
  type TokenMetadata,
} from '@/services/api'
import {
  getPublic,
  isCacheUnlocked,
  privateEntries,
  publicEntries,
  putPrivate,
  putPublic,
} from '@/services/secureCache'
import { createConcurrencyLimiter } from '@/services/concurrencyLimit'
import { tokenUsdValue } from '@/services/money'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import {
  DEFAULT_TRANSACTION_BATCH_SIZE,
  DUST_THRESHOLD_USD,
  TOKEN_METADATA_CONCURRENCY,
  TOKEN_METADATA_RECHECK_MS,
} from '@/config/appSettings'

// services/secureCache.ts is the one and only cache for provider data — the
// backend stores nothing. Every entry is rewritten after each successful
// fetch and never expires: it's only removed by wiping this device's copy of
// the wallet (vault.deleteFromDevice), clearing site data, or uninstalling.
const ACTIVITY_PREFIX = 'chain-activity:'
const TOKEN_METADATA_PREFIX = 'token-metadata:'
const FX_RATES_PREFIX = 'fx-rates:'
const NATIVE_PRICE_PREFIX = 'native-price:'
// Keyed by assetKey — the favourites rows and the token pane's "more details".
const PRICE_HISTORY_PREFIX = 'price-history:'
// Keyed by keyFor(chain, hash) — the transaction details pane. A mined
// transaction's fee never changes, so a cached one is never re-fetched.
const TRANSACTION_FEE_PREFIX = 'tx-fee:'
// The 0x quote's fees for a swap sent from this device, keyed like the
// above. Nowhere else to get them from afterwards: they're taken inside the
// swap contract, not as transfers the indexer reports.
const SWAP_FEES_PREFIX = 'swap-fees:'
// Prices as of when a transaction was mined, keyed like the above — for the
// details pane's fiat values. Fetched only when a transaction is opened, and
// never again once found: a past price doesn't change.
const TX_RATES_PREFIX = 'tx-rates:'

/** What a transaction's assets were worth when it was mined. */
export interface TransactionRates {
  /** USD price per asset, keyed by txRateAsset; an asset with no price found is absent. */
  usd: Record<string, number>
  /** USD → currency rates on the day it was mined; null when none were found. */
  fx: Record<string, number> | null
}

/** A transaction asset's key in TransactionRates.usd. */
export function txRateAsset(contractAddress: string | null): string {
  return contractAddress?.toLowerCase() ?? 'native'
}

/** A swap's aggregator fee as quoted, already resolved to its token's units. */
export interface RecordedSwapFee {
  kind: SwapFee['kind']
  amount: number
  symbol: string
}
// Not part of hydrate() — a chain's list runs to megabytes, so it's only read
// from disk once something actually needs it (see loadTokenList).
const TOKEN_LIST_PREFIX = 'token-list:'
// When each token's metadata was last requested (succeeded or not) — what
// paces re-checks of tokens that aren't refreshed every time, see
// refreshHeldTokenMetadata. Kept apart from the metadata itself, since a
// token whose lookup has never resolved anything has a check time but no
// metadata to store it with.
const TOKEN_CHECKED_PREFIX = 'token-checked:'

// Market data that says nothing about the user — the only entries cached
// unencrypted and readable while locked. Everything else is tied to the
// user's own accounts (addresses, balances, history, which tokens they hold
// or look at) and is encrypted — see services/secureCache.ts.
const PUBLIC_PREFIXES = [FX_RATES_PREFIX, NATIVE_PRICE_PREFIX, TOKEN_LIST_PREFIX]

function isPublic(key: string): boolean {
  return PUBLIC_PREFIXES.some((prefix) => key.startsWith(prefix))
}

function persist(key: string, data: unknown) {
  const write = isPublic(key) ? putPublic(key, data) : putPrivate(key, data)
  write.catch((err) => {
    console.warn(`Failed to cache ${key}`, err)
  })
}

/**
 * Refreshes matching transactions in place (e.g. a status flip from pending
 * to mined) and prepends any that aren't in `existing` yet, since `fresh` is
 * always the newest run of history — an unrecognized hash must be newer than
 * everything already known, not older.
 */
function mergeFreshPage(existing: Transaction[], fresh: Transaction[]): Transaction[] {
  const freshByHash = new Map(fresh.map((t) => [t.hash, t]))
  const refreshed = existing.map((t) => freshByHash.get(t.hash) ?? t)
  const existingHashes = new Set(existing.map((t) => t.hash))
  const brandNew = fresh.filter((t) => !existingHashes.has(t.hash))
  return [...brandNew, ...refreshed]
}

/** Appends an older page fetched via a cursor, deduping defensively against a page-seam overlap. */
function appendOlderPage(existing: Transaction[], older: Transaction[]): Transaction[] {
  const existingHashes = new Set(existing.map((t) => t.hash))
  return [...existing, ...older.filter((t) => !existingHashes.has(t.hash))]
}

function present<T>(value: T | null | undefined): value is T {
  return value != null && value !== ''
}

function firstPresent<T>(...values: (T | null | undefined)[]): T | null {
  return values.find(present) ?? null
}

/**
 * Field by field, a freshly fetched value always wins; a field the fresh
 * response came back without keeps its last known value instead of being
 * blanked — a fallback source with no logo, or a briefly failing price feed,
 * must never erase what an earlier refresh already resolved. The token list
 * is the last resort, for anything neither has.
 */
function mergeTokenMetadata(
  address: string,
  known: TokenMetadata | undefined,
  fresh: TokenMetadata | null,
  listed?: TokenListItem,
): TokenMetadata {
  return {
    address: fresh?.address ?? known?.address ?? address,
    name: firstPresent(fresh?.name, known?.name, listed?.name),
    symbol: firstPresent(fresh?.symbol, known?.symbol, listed?.symbol),
    decimals: firstPresent(fresh?.decimals, known?.decimals, listed?.decimals),
    logo_url: firstPresent(fresh?.logo_url, known?.logo_url, listed?.logo_url),
    usd_price: firstPresent(fresh?.usd_price, known?.usd_price),
  }
}

function lacksDescriptiveFields(metadata: TokenMetadata): boolean {
  return !present(metadata.name) || !present(metadata.symbol) || metadata.decimals == null || !present(metadata.logo_url)
}

export const useChainDataStore = defineStore('chainData', () => {
  const activityByAddress = ref<Record<string, AddressActivity>>({})
  const fxRates = ref<FxRates | null>(null)
  const nativePriceUsdByChain = ref<Partial<Record<ChainSlug, number>>>({})
  const tokenMetadataByKey = ref<Record<string, TokenMetadata>>({})
  const priceHistoryByAsset = ref<Record<string, PriceHistory>>({})
  const transactionFeeByKey = ref<Record<string, TransactionFee>>({})
  const swapFeesByKey = ref<Record<string, RecordedSwapFee[]>>({})
  const transactionRatesByKey = ref<Record<string, TransactionRates>>({})
  // Lookups that found nothing this session — not retried until the next
  // one, so reopening the same transaction doesn't re-ask every time.
  const transactionRateMisses = new Set<string>()
  // A count rather than a flag: the same account can be refreshing from two
  // places at once (the periodic refresh plus a manual one, or SendView's own
  // load), and the first to finish mustn't clear the spinner for the other.
  const loadingCounts = ref<Record<string, number>>({})
  const loadingMoreKeys = ref<Set<string>>(new Set())
  // Not refs: internal bookkeeping, never read reactively.
  const inFlightLoadMore: Record<string, Promise<void>> = {}
  const inFlightTokenMetadata = new Map<string, Promise<void>>()
  const tokenMetadataCheckedAt = new Map<string, number>()
  const tokenMetadataLimiter = createConcurrencyLimiter(TOKEN_METADATA_CONCURRENCY)
  const tokenListByChain = new Map<ChainSlug, TokenListItem[]>()
  const tokenListRefreshes = new Map<ChainSlug, Promise<TokenListItem[]>>()
  // Persisted (see stores/vault.ts) — how many transactions a single
  // "load more" batch (see useTransactionBatchLoader) tries to surface
  // before stopping, user-configurable from Settings.
  const transactionBatchSize = ref(DEFAULT_TRANSACTION_BATCH_SIZE)

  function keyFor(chain: ChainSlug, address: string) {
    return `${chain}:${address.toLowerCase()}`
  }

  /** keyFor for a token contract, or `<chain>:native` for the chain's native currency. */
  function assetKey(chain: ChainSlug, contractAddress: string | null) {
    return contractAddress === null ? `${chain}:native` : keyFor(chain, contractAddress)
  }

  function applyCachedEntry(key: string, data: unknown) {
    if (key.startsWith(ACTIVITY_PREFIX)) {
      activityByAddress.value[key.slice(ACTIVITY_PREFIX.length)] ??= data as AddressActivity
    } else if (key.startsWith(TOKEN_METADATA_PREFIX)) {
      tokenMetadataByKey.value[key.slice(TOKEN_METADATA_PREFIX.length)] ??= data as TokenMetadata
    } else if (key === `${FX_RATES_PREFIX}USD`) {
      fxRates.value ??= data as FxRates
    } else if (key.startsWith(TOKEN_CHECKED_PREFIX)) {
      const tokenKey = key.slice(TOKEN_CHECKED_PREFIX.length)
      if (!tokenMetadataCheckedAt.has(tokenKey)) tokenMetadataCheckedAt.set(tokenKey, data as number)
    } else if (key.startsWith(NATIVE_PRICE_PREFIX)) {
      const chain = key.slice(NATIVE_PRICE_PREFIX.length) as ChainSlug
      nativePriceUsdByChain.value[chain] ??= (data as NativePrice).usd
    } else if (key.startsWith(PRICE_HISTORY_PREFIX)) {
      priceHistoryByAsset.value[key.slice(PRICE_HISTORY_PREFIX.length)] ??= data as PriceHistory
    } else if (key.startsWith(TRANSACTION_FEE_PREFIX)) {
      transactionFeeByKey.value[key.slice(TRANSACTION_FEE_PREFIX.length)] ??= data as TransactionFee
    } else if (key.startsWith(SWAP_FEES_PREFIX)) {
      swapFeesByKey.value[key.slice(SWAP_FEES_PREFIX.length)] ??= data as RecordedSwapFee[]
    } else if (key.startsWith(TX_RATES_PREFIX)) {
      transactionRatesByKey.value[key.slice(TX_RATES_PREFIX.length)] ??= data as TransactionRates
    }
  }

  let publicHydration: Promise<void> | null = null
  let privateHydration: Promise<void> | null = null
  /**
   * Loads everything cached on disk into the store, so the UI renders
   * last-known data straight away — every loader awaits this before
   * fetching, and its fresh result then overwrites what this put in. Public
   * data once per app session; personal data only once unlocked, and again
   * after every unlock, since locking clears it (see clearPersonalData).
   */
  function hydrate(): Promise<void> {
    // Not fatal either way — everything just loads from the network instead.
    const warn = (err: unknown) => console.warn('Failed to read cached chain data', err)
    publicHydration ??= publicEntries(PUBLIC_PREFIXES)
      .then((entries) => entries.forEach(({ key, data }) => applyCachedEntry(key, data)))
      .catch(warn)
    if (isCacheUnlocked()) {
      privateHydration ??= privateEntries()
        .then((entries) => entries.forEach(({ key, data }) => applyCachedEntry(key, data)))
        .catch(warn)
    }
    return Promise.all([publicHydration, privateHydration]).then(() => {})
  }

  /**
   * Sets a personal-data entry in memory and in the encrypted cache — or
   * neither, once locked: a fetch that was still in flight at lock time
   * must not put anything back after clearPersonalData wiped it.
   */
  function remember<T>(record: Ref<Record<string, T>>, prefix: string, key: string, value: T) {
    if (!isCacheUnlocked()) return
    record.value[key] = value
    persist(prefix + key, value)
  }

  /** Called on lock — see stores/vault.ts. Public market data stays. */
  function clearPersonalData() {
    activityByAddress.value = {}
    tokenMetadataByKey.value = {}
    priceHistoryByAsset.value = {}
    transactionFeeByKey.value = {}
    swapFeesByKey.value = {}
    transactionRatesByKey.value = {}
    transactionRateMisses.clear()
    loadingCounts.value = {}
    loadingMoreKeys.value = new Set()
    tokenMetadataCheckedAt.clear()
    inFlightTokenMetadata.clear()
    for (const key of Object.keys(inFlightLoadMore)) delete inFlightLoadMore[key]
    privateHydration = null
  }

  function setTransactionBatchSize(size: number) {
    transactionBatchSize.value = size
  }

  function isLoading(chain: ChainSlug, address: string): boolean {
    return (loadingCounts.value[keyFor(chain, address)] ?? 0) > 0
  }

  function isLoadingMore(chain: ChainSlug, address: string): boolean {
    return loadingMoreKeys.value.has(keyFor(chain, address))
  }

  function hasMoreTransactions(chain: ChainSlug, address: string): boolean {
    return activityByAddress.value[keyFor(chain, address)]?.next_cursor != null
  }

  /**
   * Folds a freshly fetched page one into already-known history. Page one
   * only covers the newest transfers, so if none of them are known yet, more
   * than a page's worth happened since the last refresh (e.g. the app sat
   * closed for a while) — keeps paging back from the fresh cursor until the
   * fetched run meets known history, so the merged list never ends up with a
   * silent hole in the middle. The known history's own cursor is kept: it
   * already points past the oldest transaction loaded so far, however far
   * back the user has scrolled (see backend's pinned_to_block for why it
   * stays valid), whereas the fresh cursor only points past page one.
   */
  async function mergeIntoKnownHistory(
    chain: ChainSlug,
    address: string,
    key: string,
    fresh: AddressActivity,
  ): Promise<Pick<AddressActivity, 'transactions' | 'next_cursor'>> {
    const known = activityByAddress.value[key]
    if (!known || known.transactions.length === 0) {
      return { transactions: fresh.transactions, next_cursor: fresh.next_cursor }
    }
    const knownHashes = new Set(known.transactions.map((t) => t.hash))
    const reachesKnown = (txns: Transaction[]) => txns.some((t) => knownHashes.has(t.hash))

    let run = fresh.transactions
    let cursor = fresh.next_cursor
    while (!reachesKnown(run) && cursor != null) {
      const page = await api.transactionPage(chain, address, cursor)
      run = appendOlderPage(run, page.transactions)
      cursor = page.next_cursor
    }
    // Re-read: a loadMoreTransactions may have appended older pages while
    // the catch-up above was awaiting.
    const current = activityByAddress.value[key] ?? known
    if (reachesKnown(run)) {
      return { transactions: mergeFreshPage(current.transactions, run), next_cursor: current.next_cursor }
    }
    // An empty response from an address with known history is an upstream
    // hiccup, not an erased past — keep everything as it was.
    if (run.length === 0) return { transactions: current.transactions, next_cursor: current.next_cursor }
    // Paged all the way back without meeting anything known: the run is the
    // address's entire history. Known entries are still kept rather than
    // dropped (e.g. a just-sent transaction not indexed yet).
    return { transactions: mergeFreshPage(current.transactions, run), next_cursor: null }
  }

  /**
   * Re-fetches this account's balances and newest transactions, overwriting
   * the balances outright and merging the transactions into known history,
   * then (unless told otherwise) re-fetches held tokens' metadata too — every
   * one worth more than $0.01, see refreshHeldTokenMetadata. Resolves once balances and
   * transactions are in; the token-metadata refresh carries on in the
   * background, still reflected in `isLoading`. Throws on failure, leaving
   * whatever was already known in place.
   */
  async function loadAddressActivity(
    chain: ChainSlug,
    address: string,
    { refreshTokenMetadata = true }: { refreshTokenMetadata?: boolean } = {},
  ) {
    const key = keyFor(chain, address)
    loadingCounts.value[key] = (loadingCounts.value[key] ?? 0) + 1
    let tokenRefresh: Promise<unknown> = Promise.resolve()
    try {
      await hydrate()
      const fresh = await api.addressActivity(chain, address)
      const history = await mergeIntoKnownHistory(chain, address, key, fresh)
      const merged: AddressActivity = { balances: fresh.balances, ...history }
      remember(activityByAddress, ACTIVITY_PREFIX, key, merged)
      if (refreshTokenMetadata) tokenRefresh = refreshHeldTokenMetadata(chain, fresh.balances)
    } finally {
      void tokenRefresh.finally(() => {
        const remaining = (loadingCounts.value[key] ?? 1) - 1
        if (remaining > 0) loadingCounts.value[key] = remaining
        else delete loadingCounts.value[key]
      })
    }
  }

  /**
   * Fetches the next older page of transactions past whatever's already
   * loaded for this address, using the opaque cursor the last load returned.
   * No-ops if that address was never loaded or has no more history.
   *
   * Safe to call concurrently for the same address: rather than the first
   * caller silently winning and every other simultaneous caller no-op'ing
   * (which used to make a batch-loading loop think a page had already been
   * fetched when really nothing had happened yet), every caller while a
   * fetch is in flight awaits that same fetch instead of racing it or
   * dropping their own request on the floor.
   */
  async function loadMoreTransactions(chain: ChainSlug, address: string) {
    const key = keyFor(chain, address)
    const inFlight = inFlightLoadMore[key]
    if (inFlight) return inFlight

    const existing = activityByAddress.value[key]
    if (!existing || existing.next_cursor == null) return

    const fetchPromise = (async () => {
      loadingMoreKeys.value.add(key)
      try {
        const page = await api.transactionPage(chain, address, existing.next_cursor)
        // Re-read after the await — the account (or its cached activity) may
        // have been reloaded or removed while this request was in flight.
        const current = activityByAddress.value[key]
        if (!current) return
        const merged: AddressActivity = {
          ...current,
          transactions: appendOlderPage(current.transactions, page.transactions),
          next_cursor: page.next_cursor,
        }
        remember(activityByAddress, ACTIVITY_PREFIX, key, merged)
      } finally {
        loadingMoreKeys.value.delete(key)
        delete inFlightLoadMore[key]
      }
    })()
    inFlightLoadMore[key] = fetchPromise
    return fetchPromise
  }

  async function loadFxRates(base = 'USD') {
    await hydrate()
    const fresh = await api.fxRates(base)
    fxRates.value = fresh
    persist(FX_RATES_PREFIX + base, fresh)
  }

  // Ethereum and the ETH L2s all price the same coin — one request per
  // native symbol, shared by every chain using it while in flight and for a
  // minute after, rather than one per chain. The price providers behind the
  // backend have tight free-tier quotas (Alchemy: 300 price lookups an hour).
  // A failed request isn't shared, so the next caller retries.
  const NATIVE_PRICE_REUSE_MS = 60_000
  const nativePriceRequests = new Map<string, { at: number; request: Promise<NativePrice> }>()

  async function loadNativePrice(chain: ChainSlug) {
    await hydrate()
    const symbol = NATIVE_ASSETS[chain].symbol
    let entry = nativePriceRequests.get(symbol)
    if (!entry || Date.now() - entry.at > NATIVE_PRICE_REUSE_MS) {
      const created = { at: Date.now(), request: api.nativePrice(chain) }
      created.request.catch(() => {
        if (nativePriceRequests.get(symbol) === created) nativePriceRequests.delete(symbol)
      })
      nativePriceRequests.set(symbol, created)
      entry = created
    }
    const fresh = await entry.request
    for (const sibling of Object.keys(NATIVE_ASSETS) as ChainSlug[]) {
      if (NATIVE_ASSETS[sibling].symbol !== symbol) continue
      nativePriceUsdByChain.value[sibling] = fresh.usd
      persist(NATIVE_PRICE_PREFIX + sibling, fresh)
    }
  }

  /**
   * Inserts a locally-known transaction ahead of whatever's cached, so a
   * just-broadcast transaction shows up as "pending" immediately — indexers
   * (Alchemy's asset-transfers included) only report transactions once
   * they're mined, so there's otherwise no way for it to appear before then.
   * No-ops if this address's activity was never loaded (nothing to prepend to).
   */
  function prependTransaction(chain: ChainSlug, address: string, txn: AddressActivity['transactions'][number]) {
    const key = keyFor(chain, address)
    const existing = activityByAddress.value[key]
    if (!existing) return
    const merged: AddressActivity = {
      ...existing,
      transactions: [txn, ...existing.transactions.filter((t) => t.hash !== txn.hash)],
    }
    remember(activityByAddress, ACTIVITY_PREFIX, key, merged)
  }

  /**
   * Re-fetches one token's metadata and merges it over what's already known
   * (see mergeTokenMetadata), deduped against an identical request already
   * in flight (the same token held by several accounts, say) and capped to
   * TOKEN_METADATA_CONCURRENCY requests at once across the whole app. Throws
   * only when nothing at all is known for the token afterward.
   */
  function loadTokenMetadata(chain: ChainSlug, contractAddress: string): Promise<void> {
    const key = keyFor(chain, contractAddress)
    const inFlight = inFlightTokenMetadata.get(key)
    if (inFlight) return inFlight

    const checkedAt = Date.now()
    if (isCacheUnlocked()) {
      tokenMetadataCheckedAt.set(key, checkedAt)
      persist(TOKEN_CHECKED_PREFIX + key, checkedAt)
    }
    const request = (async () => {
      await hydrate()
      let fresh: TokenMetadata | null = null
      let failure: unknown = null
      try {
        fresh = await tokenMetadataLimiter(() => api.tokenMetadata(chain, contractAddress))
      } catch (err) {
        failure = err
      }
      let merged = mergeTokenMetadata(contractAddress, tokenMetadataByKey.value[key], fresh)
      if (lacksDescriptiveFields(merged)) {
        const list = await loadTokenList(chain)
        const needle = contractAddress.toLowerCase()
        const listed = list?.find((item) => item.address.toLowerCase() === needle)
        merged = mergeTokenMetadata(contractAddress, merged, null, listed)
      }
      const resolvedAnything = [merged.name, merged.symbol, merged.decimals, merged.logo_url, merged.usd_price].some(present)
      if (resolvedAnything) {
        remember(tokenMetadataByKey, TOKEN_METADATA_PREFIX, key, merged)
      }
      if (failure && !resolvedAnything) throw failure
    })().finally(() => inFlightTokenMetadata.delete(key))
    inFlightTokenMetadata.set(key, request)
    return request
  }

  function checkedRecently(key: string): boolean {
    const checkedAt = tokenMetadataCheckedAt.get(key)
    return checkedAt !== undefined && Date.now() - checkedAt < TOKEN_METADATA_RECHECK_MS
  }

  /**
   * Which of this account's held tokens an account refresh re-fetches,
   * judged by the fresh balance at the last-known price:
   *  - worth more than DUST_THRESHOLD_USD: on every refresh, logo or not;
   *  - "unknown" (looked up before, but no source had a logo for it — what
   *    AccountCard's "Hide unknown tokens" hides): never again;
   *  - everything else — dust, unpriced, or a lookup that never resolved
   *    anything at all — once TOKEN_METADATA_RECHECK_MS has passed since it
   *    was last checked, however many refreshes and app restarts happen in
   *    between: often enough that a price that failed to resolve, or a dust
   *    token that's since gained value, is still picked up, without costing
   *    a request per token on every refresh.
   */
  function refreshHeldTokenMetadata(chain: ChainSlug, balances: Balance[]): Promise<unknown> {
    const due = balances.filter((b): b is Balance & { contract_address: string } => {
      if (b.contract_address === null) return false
      const key = keyFor(chain, b.contract_address)
      const known = tokenMetadataByKey.value[key]
      const usd = tokenUsdValue(b, known)
      if (usd !== null && usd > DUST_THRESHOLD_USD) return true
      if (known && !present(known.logo_url)) return false
      return !checkedRecently(key)
    })
    return Promise.allSettled(due.map((b) => loadTokenMetadata(chain, b.contract_address)))
  }

  /**
   * For a token that may not be held at all (e.g. one leg of a swap in the
   * history), or a held one the account refresh hasn't reached yet: fetched
   * only when nothing at all is known about it, at most once per
   * TOKEN_METADATA_RECHECK_MS, and never refreshed from here. Best-effort;
   * never rejects.
   */
  async function ensureTokenMetadata(chain: ChainSlug, contractAddress: string): Promise<void> {
    await hydrate()
    const key = keyFor(chain, contractAddress)
    if (tokenMetadataByKey.value[key] || checkedRecently(key)) return
    await loadTokenMetadata(chain, contractAddress).catch(() => {})
  }

  /**
   * The chain's full token list (the swap picker's search, and the last
   * resort for token metadata the backend couldn't resolve). Served from disk
   * when there's a copy there, and refreshed from the network at most once
   * per app session; only the very first fetch ever has to be waited on.
   * Resolves to null if there's no copy anywhere and the fetch failed.
   */
  async function loadTokenList(chain: ChainSlug): Promise<TokenListItem[] | null> {
    if (!tokenListByChain.has(chain)) {
      const cached = await getPublic<TokenListItem[]>(TOKEN_LIST_PREFIX + chain).catch(() => undefined)
      if (cached && !tokenListByChain.has(chain)) tokenListByChain.set(chain, cached)
    }
    let refresh = tokenListRefreshes.get(chain)
    if (!refresh) {
      refresh = api.tokenList(chain).then((list) => {
        tokenListByChain.set(chain, list)
        persist(TOKEN_LIST_PREFIX + chain, list)
        return list
      })
      tokenListRefreshes.set(chain, refresh)
      // Forgotten on failure, so the next caller tries again rather than
      // this session going without a fresh list at all.
      refresh.catch(() => tokenListRefreshes.delete(chain))
    }
    return tokenListByChain.get(chain) ?? refresh.catch(() => null)
  }

  /** Past-24h price for a token contract, or the chain's native currency when `contractAddress` is null. */
  async function loadPriceHistory(chain: ChainSlug, contractAddress: string | null) {
    await hydrate()
    const fresh = await (contractAddress === null
      ? api.nativePriceHistory(chain)
      : api.tokenPriceHistory(chain, contractAddress))
    const key = assetKey(chain, contractAddress)
    remember(priceHistoryByAsset, PRICE_HISTORY_PREFIX, key, fresh)
  }

  /** No-op once known. Throws while the transaction is still pending (no receipt yet). */
  async function ensureTransactionFee(chain: ChainSlug, hash: string) {
    await hydrate()
    const key = keyFor(chain, hash)
    if (transactionFeeByKey.value[key]) return
    const fee = await api.transactionFee(chain, hash)
    remember(transactionFeeByKey, TRANSACTION_FEE_PREFIX, key, fee)
  }

  /**
   * Looks up what a mined transaction's assets — the amount, a swap's other
   * leg, and the native coin its fee was paid in — were worth in USD when it
   * was mined, and that day's FX rates. Only what's still missing is asked
   * for; each lookup failing on its own just leaves that value out.
   */
  async function ensureTransactionRates(chain: ChainSlug, txn: Transaction) {
    if (!txn.timestamp) return
    await hydrate()
    const key = keyFor(chain, txn.hash)
    const unixSecs = new Date(txn.timestamp).getTime() / 1000
    const known = transactionRatesByKey.value[key] ?? { usd: {}, fx: null }
    // The native coin always — the fee is paid in it.
    const contracts: (string | null)[] = [null, txn.contract_address]
    if (txn.counter_asset !== null) contracts.push(txn.counter_contract_address)
    const assets = [...new Map(contracts.map((c) => [txRateAsset(c), c])).values()]
    const missingAssets = assets.filter((c) => {
      const asset = txRateAsset(c)
      return known.usd[asset] === undefined && !transactionRateMisses.has(`${key}:${asset}`)
    })
    const fxMissing = known.fx === null && !transactionRateMisses.has(`${key}:fx`)
    if (!missingAssets.length && !fxMissing) return

    const usd = { ...known.usd }
    let fx = known.fx
    await Promise.all([
      ...missingAssets.map(async (c) => {
        const asset = txRateAsset(c)
        try {
          usd[asset] = (await api.historicalPrice(chain, c, unixSecs)).usd
        } catch {
          transactionRateMisses.add(`${key}:${asset}`)
        }
      }),
      fxMissing &&
        (async () => {
          try {
            fx = (await api.fxRatesOn(txn.timestamp!.slice(0, 10))).rates
          } catch {
            transactionRateMisses.add(`${key}:fx`)
          }
        })(),
    ])
    remember(transactionRatesByKey, TX_RATES_PREFIX, key, { usd, fx })
  }

  function recordSwapFees(chain: ChainSlug, hash: string, fees: RecordedSwapFee[]) {
    if (fees.length === 0) return
    const key = keyFor(chain, hash)
    remember(swapFeesByKey, SWAP_FEES_PREFIX, key, fees)
  }

  return {
    activityByAddress,
    fxRates,
    nativePriceUsdByChain,
    tokenMetadataByKey,
    priceHistoryByAsset,
    transactionFeeByKey,
    swapFeesByKey,
    transactionBatchSize,
    setTransactionBatchSize,
    isLoading,
    isLoadingMore,
    hasMoreTransactions,
    hydrate,
    loadAddressActivity,
    loadMoreTransactions,
    loadFxRates,
    loadNativePrice,
    loadTokenMetadata,
    ensureTokenMetadata,
    loadTokenList,
    loadPriceHistory,
    ensureTransactionFee,
    recordSwapFees,
    transactionRatesByKey,
    ensureTransactionRates,
    clearPersonalData,
    prependTransaction,
    keyFor,
    assetKey,
  }
})
