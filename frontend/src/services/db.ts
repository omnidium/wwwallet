import Dexie, { type EntityTable } from 'dexie'

interface CacheEntry {
  key: string
  data: unknown
  fetchedAt: number
}

/**
 * Encrypted vault blob. `ciphertext`/`iv`/`salt` are opaque to everything except
 * the passphrase-derived key computed client-side (see stores/vault.ts, Phase 3).
 * Nothing in this table is ever sent to the backend.
 */
interface VaultRecord {
  id: 'default'
  ciphertext: ArrayBuffer
  iv: ArrayBuffer
  salt: ArrayBuffer
  kdf: 'argon2id'
  kdfParams: { memoryKiB: number; iterations: number; parallelism: number }
  updatedAt: number
}

/** Public key for the local-only WebAuthn unlock gate — never sent to a server. */
interface LocalWebAuthnCredential {
  id: 'default'
  credentialId: ArrayBuffer
  publicKey: JsonWebKey
  algorithm: number
}

const db = new Dexie('wwwallet') as Dexie & {
  cache: EntityTable<CacheEntry, 'key'>
  vault: EntityTable<VaultRecord, 'id'>
  localWebAuthnCredential: EntityTable<LocalWebAuthnCredential, 'id'>
}

db.version(1).stores({
  cache: 'key, fetchedAt',
  vault: 'id',
  localWebAuthnCredential: 'id',
})

export type { CacheEntry, VaultRecord, LocalWebAuthnCredential }
export { db }
