import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  api,
  type AddressActivity,
  type ChainSlug,
  type FxRates,
  type Transaction,
  type TokenMetadata,
} from '@/services/api'
import { cachedFetch } from '@/services/cachedFetch'
import { db } from '@/services/db'
import { DEFAULT_TRANSACTION_BATCH_SIZE } from '@/config/appSettings'

/**
 * Refreshes matching transactions in place (e.g. a status flip from pending
 * to mined) and prepends any that aren't in `existing` yet, since `fresh` is
 * always the newest page — an unrecognized hash must be newer than
 * everything already known, not older. Used when a full reload (mount,
 * 10-minute auto-refresh, reconnect, post-send reconcile) re-fetches page one
 * while the user may have already scrolled further back via `loadMore`.
 */
function mergeFreshPage(existing: Transaction[], fresh: Transaction[]): Transaction[] {
  const freshByHash = new Map(fresh.map((t) => [t.hash, t]))
  const refreshed = existing.map((t) => freshByHash.get(t.hash) ?? t)
  const existingHashes = new Set(existing.map((t) => t.hash))
  const brandNew = fresh.filter((t) => !existingHashes.has(t.hash))
  return [...brandNew, ...refreshed]
}

/** Appends an older page fetched via `loadMoreTransactions`, deduping defensively against a page-seam overlap. */
function appendOlderPage(existing: Transaction[], older: Transaction[]): Transaction[] {
  const existingHashes = new Set(existing.map((t) => t.hash))
  return [...existing, ...older.filter((t) => !existingHashes.has(t.hash))]
}

/**
 * Persists the store's own merged view of an address's activity — deep
 * scroll history and all — to the same on-disk cache key `cachedFetch` uses
 * inside `loadAddressActivity`. Without this, `cachedFetch` only ever wrote
 * the raw, page-one-only network response it fetched, so every background
 * refresh quietly overwrote the on-disk cache back down to page one; the
 * user's own further-scrolled history survived in memory for the rest of
 * that session, but a full app reload (or reopening the installed PWA after
 * it was evicted) would read that degraded page-one-only cache and it would
 * look like the history had been wiped. Best-effort, same as every other
 * cache write in this codebase — a write failure here just means the next
 * cold start re-fetches page one instead of restoring deep history, not a
 * broken app.
 */
function persistActivity(key: string, activity: AddressActivity) {
  db.cache.put({ key: `chain-activity:${key}`, data: activity, fetchedAt: Date.now() }).catch(() => {})
}

export const useChainDataStore = defineStore('chainData', () => {
  const activityByAddress = ref<Record<string, AddressActivity>>({})
  const fxRates = ref<FxRates | null>(null)
  const nativePriceUsdByChain = ref<Partial<Record<ChainSlug, number>>>({})
  const tokenMetadataByKey = ref<Record<string, TokenMetadata>>({})
  // Per-address, not a single shared flag — refreshing several accounts in
  // parallel via Promise.all would otherwise race, each call's `finally`
  // clearing the one flag independently regardless of the others.
  const loadingKeys = ref<Set<string>>(new Set())
  const loadingMoreKeys = ref<Set<string>>(new Set())
  // Not a ref: purely an internal dedup map, never read reactively (UI binds
  // to loadingMoreKeys/isLoadingMore instead). Keyed the same as everything
  // else here — see loadMoreTransactions for why this exists.
  const inFlightLoadMore: Record<string, Promise<void>> = {}
  // Persisted (see stores/vault.ts) — how many transactions a single
  // "load more" batch (see useTransactionBatchLoader) tries to surface
  // before stopping, user-configurable from Settings.
  const transactionBatchSize = ref(DEFAULT_TRANSACTION_BATCH_SIZE)

  function keyFor(chain: ChainSlug, address: string) {
    return `${chain}:${address.toLowerCase()}`
  }

  function setTransactionBatchSize(size: number) {
    transactionBatchSize.value = size
  }

  function isLoading(chain: ChainSlug, address: string): boolean {
    return loadingKeys.value.has(keyFor(chain, address))
  }

  function isLoadingMore(chain: ChainSlug, address: string): boolean {
    return loadingMoreKeys.value.has(keyFor(chain, address))
  }

  function hasMoreTransactions(chain: ChainSlug, address: string): boolean {
    return activityByAddress.value[keyFor(chain, address)]?.next_cursor != null
  }

  async function loadAddressActivity(chain: ChainSlug, address: string) {
    const key = keyFor(chain, address)
    loadingKeys.value.add(key)
    try {
      // Merges rather than overwrites `transactions`/`next_cursor`: a full
      // reload always re-fetches only page one, but the user may have
      // already scrolled further back via loadMoreTransactions. Overwriting
      // wholesale would silently discard that already-loaded history (and
      // its now-orphaned cursor) every 10 minutes, on reconnect, or after
      // any send/swap. `next_cursor` in particular is only ever taken from
      // the very first load for this key — once a deeper cursor exists it
      // stays valid regardless of how many times page one gets refreshed
      // (see backend's pinned_to_block), so a fresh page one's own cursor
      // (which knows nothing about that deeper scroll position) must never
      // replace it.
      const apply = (fresh: AddressActivity) => {
        const existing = activityByAddress.value[key]
        const merged: AddressActivity = {
          balances: fresh.balances,
          transactions: existing ? mergeFreshPage(existing.transactions, fresh.transactions) : fresh.transactions,
          next_cursor: existing ? existing.next_cursor : fresh.next_cursor,
        }
        activityByAddress.value[key] = merged
        persistActivity(key, merged)
      }
      // cachedFetch resolves with whatever's cached on disk immediately for a
      // fast first paint, then revalidates in the background — without also
      // applying here, that revalidated result only ever reached IndexedDB,
      // never the reactive store, so a stale cached value (e.g. from before a
      // backend fix shipped) would stick around forever instead of self-healing.
      const fresh = await cachedFetch(`chain-activity:${key}`, () => api.addressActivity(chain, address), apply)
      apply(fresh)
    } finally {
      loadingKeys.value.delete(key)
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
        activityByAddress.value[key] = merged
        persistActivity(key, merged)
      } finally {
        loadingMoreKeys.value.delete(key)
        delete inFlightLoadMore[key]
      }
    })()
    inFlightLoadMore[key] = fetchPromise
    return fetchPromise
  }

  async function loadFxRates(base = 'USD') {
    fxRates.value = await cachedFetch(
      `fx-rates:${base}`,
      () => api.fxRates(base),
      (fresh) => { fxRates.value = fresh },
    )
  }

  async function loadNativePrice(chain: ChainSlug) {
    nativePriceUsdByChain.value[chain] = (
      await cachedFetch(
        `native-price:${chain}`,
        () => api.nativePrice(chain),
        (fresh) => { nativePriceUsdByChain.value[chain] = fresh.usd },
      )
    ).usd
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
    activityByAddress.value[key] = merged
    persistActivity(key, merged)
  }

  async function loadTokenMetadata(chain: ChainSlug, contractAddress: string) {
    const key = keyFor(chain, contractAddress)
    tokenMetadataByKey.value[key] = await cachedFetch(
      `token-metadata:${key}`,
      () => api.tokenMetadata(chain, contractAddress),
      (fresh) => { tokenMetadataByKey.value[key] = fresh },
    )
  }

  return {
    activityByAddress,
    fxRates,
    nativePriceUsdByChain,
    tokenMetadataByKey,
    transactionBatchSize,
    setTransactionBatchSize,
    isLoading,
    isLoadingMore,
    hasMoreTransactions,
    loadAddressActivity,
    loadMoreTransactions,
    loadFxRates,
    loadNativePrice,
    loadTokenMetadata,
    prependTransaction,
    keyFor,
  }
})
