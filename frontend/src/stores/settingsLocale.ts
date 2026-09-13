import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES } from '@/locales'
import { i18n } from '@/i18n'

export const useSettingsLocaleStore = defineStore('settingsLocale', () => {
  const locale = ref('en')
  const currency = ref('USD')
  const languages = SUPPORTED_LANGUAGES
  const currencies = SUPPORTED_CURRENCIES

  function setLocale(next: string) {
    locale.value = next
    i18n.global.locale.value = next as 'en'
  }

  return { locale, currency, languages, currencies, setLocale }
})
