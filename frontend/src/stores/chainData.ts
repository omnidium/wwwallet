import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api, type AddressActivity, type ChainSlug, type FxRates } from '@/services/api'
import { cachedFetch } from '@/services/cachedFetch'

export const useChainDataStore = defineStore('chainData', () => {
  const activityByAddress = ref<Record<string, AddressActivity>>({})
  const fxRates = ref<FxRates | null>(null)
  const loading = ref(false)

  function keyFor(chain: ChainSlug, address: string) {
    return `${chain}:${address.toLowerCase()}`
  }

  async function loadAddressActivity(chain: ChainSlug, address: string) {
    const key = keyFor(chain, address)
    loading.value = true
    try {
      activityByAddress.value[key] = await cachedFetch(`chain-activity:${key}`, () =>
        api.addressActivity(chain, address),
      )
    } finally {
      loading.value = false
    }
  }

  async function loadFxRates(base = 'USD') {
    fxRates.value = await cachedFetch(`fx-rates:${base}`, () => api.fxRates(base))
  }

  return { activityByAddress, fxRates, loading, loadAddressActivity, loadFxRates, keyFor }
})
