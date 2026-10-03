import { APP_URL as DEFAULT_APP_URL } from '@shared/config/links'

// Where the Launch/Open button sends visitors. Overridable in dev so this
// project's dev server can link to the wallet app's own dev server.
export const APP_URL = import.meta.env.VITE_APP_URL || DEFAULT_APP_URL
