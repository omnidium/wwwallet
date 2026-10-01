import Dexie, { type EntityTable } from 'dexie'
import { deriveWrapKeyFromBytes } from '@/crypto/kdf'
import { decrypt, encrypt, exportAesKeyBytes, generateIv } from '@/crypto/aesGcm'

/**
 * The client-side cache of provider data. Its own database rather than a
 * table next to the vault: everything in it is disposable, so it can be
 * dropped wholesale (deleteFromDevice, a restored vault whose key can't read
 * it) without going anywhere near the vault itself.
 *
 * Two kinds of entry:
 * - public: market data that says nothing about the user (prices, fx rates,
 *   token lists), stored as-is under its own name, readable while locked.
 * - private: anything tied to the user's accounts — balances, transaction
 *   history, which tokens they hold — encrypted with a key derived from the
 *   vault's master key, under a name that's an HMAC of the real one (the
 *   real names carry addresses and transaction hashes). Only readable or
 *   writable while unlocked; the derived keys exist only in memory and are
 *   dropped on lock.
 *
 * The favourites store's lock-screen entries are the deliberate exception —
 * public entries holding user choices, see stores/favourites.ts.
 */

interface CacheEntry {
  key: string
  data: unknown
  fetchedAt: number
}

/** A private entry as stored: `ciphertext` decrypts to a SealedPayload. */
interface SealedEntry {
  iv: ArrayBuffer
  ciphertext: ArrayBuffer
}

interface SealedPayload {
  key: string
  data: unknown
}

const cacheDb = new Dexie('wwwallet-cache') as Dexie & {
  entries: EntityTable<CacheEntry, 'key'>
}
cacheDb.version(1).stores({ entries: 'key' })
// Same reasoning as db.ts's handler: never keep rendering against a database
// something else has just deleted or upgraded underneath this connection.
cacheDb.on('versionchange', () => {
  cacheDb.close()
  window.location.reload()
})

// Private entry names all start with this — nothing public ever does, since
// public names are plain prefixes like 'native-price:'.
const PRIVATE_PREFIX = '#'
const ENCRYPTION_INFO = 'wwwallet.cache.encrypt.v1'
const NAMING_INFO = 'wwwallet.cache.name.v1'

let keys: { encryption: CryptoKey; naming: CryptoKey } | null = null

// Every write goes through here, one after another. Encrypting takes long
// enough that two quick writes to the same entry could otherwise land out of
// order, leaving the older value on disk.
let writes: Promise<unknown> = Promise.resolve()
function enqueue(write: () => Promise<unknown>): Promise<void> {
  const queued = writes.then(write)
  writes = queued.catch(() => {})
  return queued.then(() => {})
}

/** Resolves once every write made so far has landed. */
export function flushCacheWrites(): Promise<void> {
  return writes.then(() => {})
}

async function deriveNamingKey(masterKeyBytes: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const ikm = await crypto.subtle.importKey('raw', masterKeyBytes, 'HKDF', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: new TextEncoder().encode(NAMING_INFO) },
    ikm,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    false,
    ['sign'],
  )
}

/** Called with the vault's master key as soon as it's unlocked (or created). */
export async function unlockCache(masterKey: CryptoKey): Promise<void> {
  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  try {
    keys = {
      encryption: await deriveWrapKeyFromBytes(masterKeyBytes, ENCRYPTION_INFO),
      naming: await deriveNamingKey(masterKeyBytes),
    }
  } finally {
    masterKeyBytes.fill(0)
  }
}

export function lockCache(): void {
  keys = null
}

export function isCacheUnlocked(): boolean {
  return keys !== null
}

async function sealedName(naming: CryptoKey, key: string): Promise<string> {
  const mac = await crypto.subtle.sign('HMAC', naming, new TextEncoder().encode(key))
  return PRIVATE_PREFIX + btoa(String.fromCharCode(...new Uint8Array(mac)))
}

/**
 * JSON-cloned on the way in for the same reason chainData always did:
 * values read back out of a reactive store are Vue proxies, which
 * IndexedDB's structured clone rejects outright.
 */
export function putPublic(key: string, data: unknown): Promise<void> {
  const entry = { key, data: JSON.parse(JSON.stringify(data)), fetchedAt: Date.now() }
  return enqueue(() => cacheDb.entries.put(entry))
}

export async function getPublic<T>(key: string): Promise<T | undefined> {
  return (await cacheDb.entries.get(key))?.data as T | undefined
}

export async function deletePublic(key: string): Promise<void> {
  await cacheDb.entries.delete(key)
}

export async function publicEntries(prefixes: string[]): Promise<{ key: string; data: unknown }[]> {
  return cacheDb.entries.where('key').startsWithAnyOf(prefixes).toArray()
}

/**
 * Silently skipped while locked — there's nowhere safe to put it. The keys
 * are captured now, so a write made while unlocked still lands if a lock
 * comes before its turn in the queue.
 */
export function putPrivate(key: string, data: unknown): Promise<void> {
  if (!keys) return Promise.resolve()
  const { encryption, naming } = keys
  const payload: SealedPayload = { key, data: JSON.parse(JSON.stringify(data)) }
  return enqueue(async () => {
    const iv = generateIv()
    const ciphertext = await encrypt(encryption, iv, new TextEncoder().encode(JSON.stringify(payload)))
    const sealed: SealedEntry = { iv: iv.buffer, ciphertext }
    await cacheDb.entries.put({ key: await sealedName(naming, key), data: sealed, fetchedAt: Date.now() })
  })
}

/**
 * Every private entry this key can read. One it can't — written under a
 * different vault's key, e.g. before a restore from backup — is deleted
 * rather than kept around unreadable forever.
 */
export async function privateEntries(): Promise<SealedPayload[]> {
  if (!keys) return []
  const { encryption } = keys
  await flushCacheWrites()
  const stored = await cacheDb.entries.where('key').startsWith(PRIVATE_PREFIX).toArray()
  const readable: SealedPayload[] = []
  const unreadable: string[] = []
  for (const entry of stored) {
    const sealed = entry.data as SealedEntry
    try {
      const plaintext = await decrypt(encryption, new Uint8Array(sealed.iv), sealed.ciphertext)
      readable.push(JSON.parse(new TextDecoder().decode(plaintext)) as SealedPayload)
    } catch {
      unreadable.push(entry.key)
    }
  }
  if (unreadable.length > 0) await cacheDb.entries.bulkDelete(unreadable)
  return readable
}

/** Everything, public and private — for deleteFromDevice. */
export function clearCache(): Promise<void> {
  return enqueue(() => cacheDb.entries.clear())
}
