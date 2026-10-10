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
const BACKUP_INFO = 'wwwallet.cache.backup.v1'
// Where a restored backup's cache waits for the first unlock, the only point
// its key is available — see stageCacheRestore/unlockCache.
const PENDING_RESTORE_KEY = '!restore-pending'

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

/**
 * Called with the vault's master key as soon as it's unlocked (or created).
 * Resolves true when this unlock also put back the cache of a backup that
 * was just restored (see stageCacheRestore) — whatever's been read from the
 * cache in memory so far is then out of date.
 */
export async function unlockCache(masterKey: CryptoKey): Promise<boolean> {
  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  let backupKey: CryptoKey
  try {
    keys = {
      encryption: await deriveWrapKeyFromBytes(masterKeyBytes, ENCRYPTION_INFO),
      naming: await deriveNamingKey(masterKeyBytes),
    }
    backupKey = await deriveWrapKeyFromBytes(masterKeyBytes, BACKUP_INFO)
  } finally {
    masterKeyBytes.fill(0)
  }
  return applyPendingRestore(backupKey)
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
 * One private entry by its real name — undefined when there's none, it
 * can't be read, or the cache is locked. For data only needed now and then,
 * which has no reason to be decrypted along with everything else at unlock.
 */
export async function getPrivate<T>(key: string): Promise<T | undefined> {
  if (!keys) return undefined
  const { encryption, naming } = keys
  await flushCacheWrites()
  const entry = await cacheDb.entries.get(await sealedName(naming, key))
  if (!entry) return undefined
  const sealed = entry.data as SealedEntry
  try {
    const plaintext = await decrypt(encryption, new Uint8Array(sealed.iv), sealed.ciphertext)
    const payload = JSON.parse(new TextDecoder().decode(plaintext)) as SealedPayload
    return payload.key === key ? (payload.data as T) : undefined
  } catch {
    return undefined
  }
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

/* -------------------------------- Backups -------------------------------- */

/**
 * The whole cache as it travels inside a backup file: every entry, public
 * and private, compressed and then encrypted under its own key derived from
 * the vault's master key. A restore brings that same master key back, so
 * the private entries (already encrypted under keys derived from it) are
 * readable again as they are — and nothing has to be refetched.
 */
export interface BackupCacheSection {
  iv: string
  ciphertext: string
  compression: 'gzip' | 'none'
}

/** The cache, for a backup — see BackupCacheSection. */
export async function exportCacheForBackup(masterKey: CryptoKey): Promise<BackupCacheSection> {
  await flushCacheWrites()
  const entries = (await cacheDb.entries.toArray()).filter((e) => e.key !== PENDING_RESTORE_KEY)
  const json = new TextEncoder().encode(JSON.stringify(entries, encodeBuffers))
  const { bytes, compression } = await compress(json)
  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  let backupKey: CryptoKey
  try {
    backupKey = await deriveWrapKeyFromBytes(masterKeyBytes, BACKUP_INFO)
  } finally {
    masterKeyBytes.fill(0)
  }
  const iv = generateIv()
  const ciphertext = await encrypt(backupKey, iv, bytes)
  return { iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(ciphertext)), compression }
}

/**
 * Parks a restored backup's cache until the next unlock, replacing whatever
 * the cache held — it can't be decrypted before then.
 */
export function stageCacheRestore(section: BackupCacheSection): Promise<void> {
  return enqueue(async () => {
    await cacheDb.entries.clear()
    await cacheDb.entries.put({ key: PENDING_RESTORE_KEY, data: section, fetchedAt: Date.now() })
  })
}

async function applyPendingRestore(backupKey: CryptoKey): Promise<boolean> {
  await flushCacheWrites()
  const pending = (await cacheDb.entries.get(PENDING_RESTORE_KEY))?.data as BackupCacheSection | undefined
  if (!pending) return false
  let restored = false
  await enqueue(async () => {
    try {
      const plaintext = await decrypt(backupKey, fromBase64(pending.iv), fromBase64(pending.ciphertext).buffer)
      const json = await decompress(new Uint8Array(plaintext), pending.compression)
      const entries = JSON.parse(new TextDecoder().decode(json), decodeBuffers) as CacheEntry[]
      await cacheDb.entries.bulkPut(entries)
      restored = true
    } catch (err) {
      // A cache that won't decrypt (a damaged file) is just a cache: the
      // vault itself restored fine, and everything refetches as usual.
      console.warn('Could not restore the backed-up cache', err)
    }
    await cacheDb.entries.delete(PENDING_RESTORE_KEY)
  })
  return restored
}

// Private entries hold raw ArrayBuffers (IV and ciphertext), which JSON
// can't carry as they are.
// Checked by tag, not instanceof: a buffer read back from IndexedDB can come
// from another realm, where instanceof ArrayBuffer is false.
function encodeBuffers(_key: string, value: unknown): unknown {
  return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
    ? { $bytes: toBase64(new Uint8Array(value as ArrayBuffer)) }
    : value
}

function decodeBuffers(_key: string, value: unknown): unknown {
  if (value && typeof value === 'object' && typeof (value as { $bytes?: unknown }).$bytes === 'string') {
    return fromBase64((value as { $bytes: string }).$bytes).buffer
  }
  return value
}

// Token lists make up most of the cache, and compress to a fraction of their size.
async function compress(bytes: Uint8Array<ArrayBuffer>): Promise<{ bytes: Uint8Array<ArrayBuffer>; compression: 'gzip' | 'none' }> {
  if (typeof CompressionStream !== 'function') return { bytes, compression: 'none' }
  const stream = new Response(bytes).body!.pipeThrough(new CompressionStream('gzip'))
  return { bytes: new Uint8Array(await new Response(stream).arrayBuffer()), compression: 'gzip' }
}

async function decompress(bytes: Uint8Array<ArrayBuffer>, compression: 'gzip' | 'none'): Promise<Uint8Array<ArrayBuffer>> {
  if (compression === 'none') return bytes
  const stream = new Response(bytes).body!.pipeThrough(new DecompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

// In chunks: spreading a multi-megabyte array into one String.fromCharCode
// call overflows the call stack.
function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

function fromBase64(text: string): Uint8Array<ArrayBuffer> {
  const binary = atob(text)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}
