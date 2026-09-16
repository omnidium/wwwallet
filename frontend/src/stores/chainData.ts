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
      activityByAddress.value[key] = await cachedFetch(`chain-activity:${key}`, () =>
        api.addressActivity(chain, address),
      )
    } finally {
      loadingKeys.value.delete(key)
    }
  }

  async function loadFxRates(base = 'USD') {
    fxRates.value = await cachedFetch(`fx-rates:${base}`, () => api.fxRates(base))
  }

  async function loadNativePrice(chain: ChainSlug) {
    nativePriceUsdByChain.value[chain] = (
      await cachedFetch(`native-price:${chain}`, () => api.nativePrice(chain))
    ).usd
  }

  async function loadTokenMetadata(chain: ChainSlug, contractAddress: string) {
    const key = keyFor(chain, contractAddress)
    tokenMetadataByKey.value[key] = await cachedFetch(`token-metadata:${key}`, () =>
      api.tokenMetadata(chain, contractAddress),
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
    keyFor,
  }
})
