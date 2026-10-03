/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where the Launch/Open button links to. Defaults to https://app.wwwallet.me in production. */
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** The short git commit hash this build was built from — see vite.config.ts. */
declare const __APP_VERSION__: string
