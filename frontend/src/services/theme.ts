import { getSharedCookie, setSharedCookie } from './sharedPrefs'

const COOKIE_KEY = 'wwwallet.theme'
const LEGACY_STORAGE_KEY = 'wwwallet.theme'

export type ThemeName = 'light' | 'dark'

// Not sensitive — deliberately outside the encrypted vault so the chosen
// theme can be applied before the vault is ever unlocked, and shared with
// the public website (wwwallet.me) via a cross-subdomain cookie rather than
// localStorage, which doesn't cross origins.
export function getStoredTheme(): ThemeName {
  const fromCookie = getSharedCookie(COOKIE_KEY)
  if (fromCookie === 'dark' || fromCookie === 'light') return fromCookie
  // Migrate a pre-cookie install: this device may already have a theme saved
  // under the old localStorage-only key, from before theme moved to a
  // cross-origin cookie.
  return localStorage.getItem(LEGACY_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

export function setStoredTheme(name: ThemeName): void {
  setSharedCookie(COOKIE_KEY, name)
}

// Vuetify's own theme.change() only affects its own --v-theme-* variables.
// The shared design tokens (shared/design-tokens.css, imported by
// assets/main.css) switch on a `data-theme` attribute instead — the same
// mechanism website/ uses — so this needs to be set alongside every
// theme.change() call for the two to switch together.
export function applyDomTheme(name: ThemeName): void {
  document.documentElement.setAttribute('data-theme', name)
  // The installed app's status bar (Android, iOS) is painted in this color —
  // matched to the page's own background so the bar reads as part of the
  // page rather than as a colored title strip across the top of it. Read
  // back from the tokens rather than duplicated here, so the two can't drift.
  const background = getComputedStyle(document.documentElement).getPropertyValue('--bg-rgb').trim()
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta && background) meta.content = `rgb(${background})`
}
