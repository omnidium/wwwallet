// Cookie-based, not localStorage: theme/locale need to be readable from both
// wwwallet.me (the public website) and app.wwwallet.me (this app) — different
// origins as far as localStorage is concerned, but a cookie scoped to the
// shared parent domain crosses that boundary. Cookies also ignore port
// (unlike localStorage/CORS), so this works unmodified across the different
// localhost ports used in local dev, with no extra handling needed.
const COOKIE_DOMAIN =
  typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    ? undefined
    : '.wwwallet.me'

export function getSharedCookie(name: string): string | null {
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`))
  return match?.[1] !== undefined ? decodeURIComponent(match[1]) : null
}

export function setSharedCookie(name: string, value: string): void {
  const oneYearSeconds = 60 * 60 * 24 * 365
  let cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${oneYearSeconds}; Path=/; SameSite=Lax`
  if (COOKIE_DOMAIN) cookie += `; Domain=${COOKIE_DOMAIN}`
  if (location.protocol === 'https:') cookie += '; Secure'
  document.cookie = cookie
}
