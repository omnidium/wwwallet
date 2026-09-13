import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api, type Currency, type Language } from '@/services/api'
import { cachedFetch } from '@/services/cachedFetch'

export const useSettingsLocaleStore = defineStore('settingsLocale', () => {
  const locale = ref('en')
  const currency = ref('USD')
  const languages = ref<Language[]>([])
  const currencies = ref<Currency[]>([])
  const loading = ref(false)

  async function loadLanguages() {
    languages.value = await cachedFetch('reference:languages', () => api.languages())
  }

  async function loadCurrencies() {
    loading.value = true
    try {
      currencies.value = await cachedFetch(`reference:currencies:${locale.value}`, () =>
        api.currencies(locale.value),
      )
    } finally {
      loading.value = false
    }
  }

  function setLocale(next: string) {
    locale.value = next
    return loadCurrencies()
  }

  return { locale, currency, languages, currencies, loading, loadLanguages, loadCurrencies, setLocale }
})
