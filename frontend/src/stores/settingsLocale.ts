import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES } from '@/locales'
import { i18n } from '@/i18n'
import { setSharedCookie } from '@/services/sharedPrefs'

const LOCALE_COOKIE_KEY = 'wwwallet.locale'

export const useSettingsLocaleStore = defineStore('settingsLocale', () => {
  const locale = ref('en')
  const currency = ref('USD')
  const languages = SUPPORTED_LANGUAGES
  const currencies = SUPPORTED_CURRENCIES

  function setLocale(next: string) {
    locale.value = next
    i18n.global.locale.value = next as 'en'
    // Vault-persisted settings (see stores/vault.ts) are per-wallet and
    // authenticated; this cookie is the cross-origin, pre-auth default the
    // public website reads too — an explicit choice here should update both.
    setSharedCookie(LOCALE_COOKIE_KEY, next)
  }

  return { locale, currency, languages, currencies, setLocale }
})
