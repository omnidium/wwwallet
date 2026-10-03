// Public URLs the wallet app and the marketing website both link to, kept
// in one place so the two can't drift. Each project may still override the
// cross-links between them per environment (VITE_WEBSITE_URL in frontend/,
// VITE_APP_URL in website/) so their dev servers can point at each other.

/** The marketing website, on the apex domain. */
export const WEBSITE_URL = 'https://wwwallet.me'

/** The wallet app itself. */
export const APP_URL = 'https://app.wwwallet.me'

/** The public source repository. */
export const GITHUB_REPO_URL = 'https://github.com/omnidium/wwwallet'
