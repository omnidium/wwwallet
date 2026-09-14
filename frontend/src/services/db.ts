import Dexie, { type EntityTable } from 'dexie'
import type { KdfParams } from '@/crypto/kdf'

/** One way to recover the vault's random master key. A vault can have several. */
type KeyWrap =
  | { method: 'passphrase'; salt: ArrayBuffer; kdfParams: KdfParams; iv: ArrayBuffer; wrappedKey: ArrayBuffer }
  | { method: 'passkeyPrf'; credentialId: ArrayBuffer; prfSalt: ArrayBuffer; iv: ArrayBuffer; wrappedKey: ArrayBuffer }
  | { method: 'totp'; iv: ArrayBuffer; wrappedKey: ArrayBuffer }

interface CacheEntry {
  key: string
  data: unknown
  fetchedAt: number
}

/**
 * Encrypted vault blob. `ciphertext`/`iv` are opaque to everything except the
 * random master key, which is itself only recoverable via one of `wraps`
 * (passphrase, passkey, or TOTP — see crypto/vault.ts). Nothing in this table
 * is ever sent to the backend.
 */
interface VaultRecord {
  id: 'default'
  ciphertext: ArrayBuffer
  iv: ArrayBuffer
  wraps: KeyWrap[]
  updatedAt: number
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

/**
 * The enrolled TOTP secret, stored outside the encrypted vault (unlike
 * everything else in it) because it must be readable *before* unlock to
 * derive the `totp` wrap's key — see crypto/vault.ts. Same trust tier as the
 * passkey's public key above: local-only, never exported with backups.
 */
interface TotpFactor {
  id: 'default'
  secretBase32: string
}

const db = new Dexie('wwwallet') as Dexie & {
  cache: EntityTable<CacheEntry, 'key'>
  vault: EntityTable<VaultRecord, 'id'>
  localWebAuthnCredential: EntityTable<LocalWebAuthnCredential, 'id'>
  totpFactor: EntityTable<TotpFactor, 'id'>
}

db.version(1).stores({
  cache: 'key, fetchedAt',
  vault: 'id',
  localWebAuthnCredential: 'id',
  totpFactor: 'id',
})

export type { CacheEntry, VaultRecord, LocalWebAuthnCredential, TotpFactor, KeyWrap }
export { db }
