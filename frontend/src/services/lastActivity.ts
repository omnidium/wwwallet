/**
 * A plain wall-clock timestamp of the last known user activity, persisted
 * across reloads. This is NOT session/auth state — it never lets anyone
 * bypass unlocking, and holds nothing sensitive (no key material, no
 * derived secrets). Its only purpose is to answer "was this reload shortly
 * after real activity, or after a genuine absence?" so VaultUnlockView can
 * decide whether to fire the passkey prompt immediately instead of waiting
 * for a manual tap.
 */
const STORAGE_KEY = 'wwwallet:lastActivityAt'

export function getLastActivityAt(): number | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
}

export function markActivityNow(): void {
  localStorage.setItem(STORAGE_KEY, String(Date.now()))
}

/** Called on an explicit "Lock now" so a reload right afterward doesn't immediately re-auto-unlock. */
export function clearLastActivity(): void {
  localStorage.removeItem(STORAGE_KEY)
}
