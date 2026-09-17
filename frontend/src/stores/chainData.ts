import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  api,
  type AddressActivity,
  type ChainSlug,
  type FxRates,
  type TokenMetadata,
} from '@/services/api'
import { cachedFetch } from '@/services/cachedFetch'

export const useChainDataStore = defineStore('chainData', () => {
  const activityByAddress = ref<Record<string, AddressActivity>>({})
  const fxRates = ref<FxRates | null>(null)
  const nativePriceUsdByChain = ref<Partial<Record<ChainSlug, number>>>({})
  const tokenMetadataByKey = ref<Record<string, TokenMetadata>>({})
  // Per-address, not a single shared flag — refreshing several accounts in
  // parallel via Promise.all would otherwise race, each call's `finally`
  // clearing the one flag independently regardless of the others.
  const loadingKeys = ref<Set<string>>(new Set())

  function keyFor(chain: ChainSlug, address: string) {
    return `${chain}:${address.toLowerCase()}`
  }

  function isLoading(chain: ChainSlug, address: string): boolean {
    return loadingKeys.value.has(keyFor(chain, address))
  }

  async function loadAddressActivity(chain: ChainSlug, address: string) {
    const key = keyFor(chain, address)
    loadingKeys.value.add(key)
    try {
      activityByAddress.value[key] = await cachedFetch(
        `chain-activity:${key}`,
        () => api.addressActivity(chain, address),
        // cachedFetch resolves with whatever's cached on disk immediately for a
        // fast first paint, then revalidates in the background — without this,
        // that revalidated result only ever reached IndexedDB, never the
        // reactive store, so a stale cached value (e.g. from before a backend
        // fix shipped) would stick around forever instead of self-healing.
        (fresh) => { activityByAddress.value[key] = fresh },
      )
    } finally {
      loadingKeys.value.delete(key)
    }
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
    activityByAddress.value[key] = {
      ...existing,
      transactions: [txn, ...existing.transactions.filter((t) => t.hash !== txn.hash)],
    }
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
    isLoading,
    loadAddressActivity,
    loadFxRates,
    loadNativePrice,
    loadTokenMetadata,
    prependTransaction,
    keyFor,
  }
})
