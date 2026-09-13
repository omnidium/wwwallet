import { createI18n } from 'vue-i18n'

// Message catalogs are populated at runtime from the backend's
// /api/v1/reference/templates/:language + msg-codes/:language endpoints
// (cached offline via Dexie) — see the settings/locale store, Phase 5.
export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {},
  },
})
