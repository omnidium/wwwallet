import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES } from '@/locales'
import { i18n, LOCALE_COOKIE_KEY } from '@/i18n'
import { setSharedCookie } from '@/services/sharedPrefs'

export const useSettingsLocaleStore = defineStore('settingsLocale', () => {
  // Starts from i18n's detected locale (cookie, then browser language) so the
  // two never disagree before a vault is unlocked.
  const locale = ref<string>(i18n.global.locale.value)
  const currency = ref('USD')
  const languages = SUPPORTED_LANGUAGES
  const currencies = SUPPORTED_CURRENCIES

  // Switches the UI language without touching the shared cookie — for
  // locales that aren't an explicit user choice, like a vault's saved one
  // being loaded on unlock.
  function applyLocale(next: string) {
    locale.value = next
    i18n.global.locale.value = next as 'en'
  }

  function setLocale(next: string) {
    applyLocale(next)
    // Vault-persisted settings (see stores/vault.ts) are per-wallet and
    // authenticated; this cookie is the cross-origin, pre-auth default the
    // public website reads too — an explicit choice here should update both.
    setSharedCookie(LOCALE_COOKIE_KEY, next)
  }

  return { locale, currency, languages, currencies, applyLocale, setLocale }
})
