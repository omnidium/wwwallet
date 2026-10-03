import Dexie, { type EntityTable } from 'dexie'

/** One way to recover the vault's random master key. A vault can have several. */
type KeyWrap =
  | { method: 'mnemonic'; iv: ArrayBuffer; wrappedKey: ArrayBuffer }
  | { method: 'passkeyPrf'; credentialId: ArrayBuffer; prfSalt: ArrayBuffer; iv: ArrayBuffer; wrappedKey: ArrayBuffer }
  // A user-chosen unlock password, for devices that can't do a passkey —
  // see crypto/vault.ts's addPasswordWrap. The KDF parameters travel with
  // it so they can be raised later without stranding older wraps.
  | { method: 'password'; salt: ArrayBuffer; iterations: number; iv: ArrayBuffer; wrappedKey: ArrayBuffer }


/**
 * Encrypted vault blob. `ciphertext`/`iv` are opaque to everything except the
 * random master key, which is itself only recoverable via one of `wraps`
 * (recovery mnemonic or passkey — see crypto/vault.ts). Nothing in this
 * table is ever sent to the backend.
 */
interface VaultRecord {
  id: 'default'
  ciphertext: ArrayBuffer
  iv: ArrayBuffer
  wraps: KeyWrap[]
  updatedAt: number
  /** When this vault was first set up on this device — drives the backup reminder's initial delay. */
  createdAt: number
  /** Undefined means "never backed up" — drives the Accounts screen's backup reminder. */
  lastBackupAt?: number
}

/**
 * The local-only WebAuthn passkey used to unlock the vault via the PRF
 * extension (see services/webauthnLocal.ts) — never sent to a server. Only
 * the credential ID is needed; PRF key material replaces signature
 * verification as the unlock mechanism.
 */
interface LocalWebAuthnCredential {
  id: 'default'
  credentialId: ArrayBuffer
}

const db = new Dexie('wwwallet') as Dexie & {
  vault: EntityTable<VaultRecord, 'id'>
  localWebAuthnCredential: EntityTable<LocalWebAuthnCredential, 'id'>
}

db.version(1).stores({
  cache: 'key, fetchedAt',
  vault: 'id',
  localWebAuthnCredential: 'id',
  totpFactor: 'id',
})

// TOTP-based unlock is gone: its wrap key had to be derived from the raw
// enrolled secret (not the live 6-digit code) to work before the vault was
// decrypted, which meant that secret had to sit in plaintext locally —
// anyone with local storage access could unwrap the vault without ever
// touching an authenticator app. Dropping the table, not just the code path,
// so that secret can't linger on-disk for anyone still on version 1.
db.version(2).stores({
  totpFactor: null,
})

// The provider cache used to live here, unencrypted — every account's
// address, balances and transaction history readable with the vault locked.
// It's now in services/secureCache.ts (its own database, personal data
// encrypted). Dropped outright rather than migrated: it's only a cache, so
// the cost is one refetch, and deleting the whole object store is the most
// thorough removal IndexedDB offers.
db.version(3).stores({
  cache: null,
})

// Fires when something outside this connection — another tab with a newer
// app version, or DevTools' "Clear site data" — needs this database deleted
// or upgraded, which IndexedDB can't do while a connection is still open.
// Without this, the open connection is left pointing at a database that no
// longer matches on-disk reality: the current route stays rendered exactly
// as it was (e.g. still showing "Unlock" after storage was cleared), and
// only the *next* navigation's fresh `db.vault.get(...)` call notices
// anything changed. Closing and reloading immediately keeps the app from
// ever rendering against a state it knows is already stale.
db.on('versionchange', () => {
  db.close()
  window.location.reload()
})

/**
 * Asks the browser to exempt this origin's storage from automatic eviction
 * under storage pressure — without it, IndexedDB is only "best-effort" and
 * can be silently cleared, taking the encrypted vault with it. Installed PWAs are generally
 * granted this automatically; elsewhere the browser decides (Firefox asks
 * the user). Afterward, only the user (clearing site data, uninstalling)
 * or deleteFromDevice ever removes anything.
 *
 * Also drops the service worker's old `chain-data` response cache, from
 * before provider data was cached in IndexedDB only — Workbox never deletes
 * a runtime cache it's no longer configured with.
 */
export async function secureClientStorage(): Promise<void> {
  try {
    if (!(await navigator.storage?.persisted?.())) await navigator.storage?.persist?.()
  } catch {
    // Unsupported or refused — storage stays best-effort, nothing else changes.
  }
  if ('caches' in window) await caches.delete('chain-data').catch(() => {})
}

export type { VaultRecord, LocalWebAuthnCredential, KeyWrap }
export { db }
