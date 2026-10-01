// DeepL's 30 "premium" target languages (English, the 31st, is the source
// and has no locale file of its own). Keys are this repo's locale-file
// codes; values are the code DeepL's API expects — identical for most, but
// three of this repo's codes predate DeepL entirely and use older
// conventions (Google Translate's legacy "iw" for Hebrew, and a bare "no"
// for Norwegian where DeepL is specifically Bokmål, "nb"). Shared by both
// frontend/src/locales/ and website/src/i18n/locales/, which both offer the
// same 30 languages — kept in sync with each project's own languages.ts and
// index.ts by hand; if you add or remove a language here, update those too.
export const LOCALE_TO_DEEPL = {
  ar: 'AR', bg: 'BG', cs: 'CS', da: 'DA', de: 'DE', el: 'EL', es: 'ES', et: 'ET',
  fi: 'FI', fr: 'FR', hu: 'HU', id: 'ID', it: 'IT', iw: 'HE', ja: 'JA', ko: 'KO',
  lt: 'LT', lv: 'LV', nl: 'NL', no: 'NB', pl: 'PL', ro: 'RO', ru: 'RU', sk: 'SK',
  sl: 'SL', sv: 'SV', tr: 'TR', uk: 'UK', vi: 'VI', 'zh-CN': 'ZH',
}
export const LOCALE_CODES = Object.keys(LOCALE_TO_DEEPL)
