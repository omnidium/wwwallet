import { i18n } from '@/i18n'

/**
 * Base class for errors whose `.message` is already a translated, user-facing
 * string — built via `i18n.global.t(...)` at the point the error is thrown.
 * Every error this app throws itself should extend this (or be constructed
 * via `translatedError`) rather than a bare `Error`, so `displayErrorMessage`
 * below can tell it apart from a native browser exception (DOMException,
 * TypeError) or a third-party library's own error (ethers.js, etc.), neither
 * of which is ever translated — their `.message` is hardcoded English no
 * matter the app's selected language.
 */
export class TranslatedError extends Error {
  /** The backend's machine-readable reason, when it gave one — for a caller that words it more specifically. */
  code?: string
}

/** Shorthand for `throw new TranslatedError(i18n.global.t(key, params))`. */
export function translatedError(key: string, params?: Record<string, unknown>): TranslatedError {
  return new TranslatedError(i18n.global.t(key, params ?? {}))
}

/**
 * The one function every toast/message surface should call to turn a caught
 * `unknown` into display text — never `(err as Error).message` directly.
 * Trusts the message only for errors we know were built from a translation;
 * anything else (a cancelled/timed-out WebAuthn prompt, a network failure, an
 * invalid mnemonic from ethers.js, ...) falls back to a generic translated
 * message instead of leaking untranslated, often cryptic native text.
 */
export function displayErrorMessage(err: unknown): string {
  if (err instanceof TranslatedError) return err.message
  return i18n.global.t('errors.unknown')
}
