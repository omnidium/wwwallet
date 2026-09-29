/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where the Launch/Open button links to. Defaults to https://app.wwwallet.me in production. */
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
