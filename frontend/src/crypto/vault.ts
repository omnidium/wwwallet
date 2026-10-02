import { i18n } from '@/i18n'
import { db, type VaultRecord, type KeyWrap } from '@/services/db'
import { deriveWrapKeyFromBytes } from './kdf'
import { decrypt, encrypt, exportAesKeyBytes, generateIv, importAesKey } from './aesGcm'
import { normalizeMnemonic } from '@/services/mnemonic'
import { TranslatedError, translatedError } from '@/services/errors'
import type { WalletAccount } from '@/stores/accounts'
import type { Payee } from '@/stores/payees'

export interface VaultData {
  wallets: WalletAccount[]
  payees: Payee[]
  // Optional: a vault backed up before this setting existed won't have it —
  // callers fall back to a default rather than treating it as required.
  settings: {
    locale: string
    currency: string
    transactionBatchSize?: number
    favouritesCard?: FavouritesCardLayout
  }
}

/** Where the accounts screen's Favourites card sits among the account cards. */
export interface FavouritesCardLayout {
  /** Index among the visible cards; null puts it after the last account (the default). */
  position: number | null
  visible: boolean
}

const VAULT_ID = 'default' as const

// Domain-separation labels for HKDF — not secret, just prevents the same raw
// key material accidentally unwrapping the wrong thing.
const MNEMONIC_HKDF_INFO = 'wwwallet.vault.wrap.mnemonic.v1'
const PASSKEY_HKDF_INFO = 'wwwallet.vault.wrap.passkeyPrf.v1'

export async function hasVault(): Promise<boolean> {
  return (await db.vault.get(VAULT_ID)) !== undefined
}

/** Irreversible: the only way back in afterward is restoring from a backup made before this ran. */
export async function deleteVault(): Promise<void> {
  await db.vault.delete(VAULT_ID)
}

export async function recordBackup(): Promise<void> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) return
  await db.vault.put({ ...record, lastBackupAt: Date.now() })
}

export async function getLastBackupAt(): Promise<number | null> {
  const record = await db.vault.get(VAULT_ID)
  return record?.lastBackupAt ?? null
}

export async function getCreatedAt(): Promise<number | null> {
  const record = await db.vault.get(VAULT_ID)
  return record?.createdAt ?? null
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

export class VaultUnlockError extends TranslatedError {
  constructor() {
    super(i18n.global.t('errors.vaultUnlockFailed'))
    this.name = 'VaultUnlockError'
  }
}

export class UnlockMethodNotEnrolledError extends TranslatedError {
  constructor(method: string) {
    super(i18n.global.t('errors.unlockMethodNotEnrolled', { method }))
    this.name = 'UnlockMethodNotEnrolledError'
  }
}

/** Which recovery methods exist for the current vault, e.g. to drive the unlock screen's UI. */
export async function availableUnlockMethods(): Promise<KeyWrap['method'][]> {
  const record = await db.vault.get(VAULT_ID)
  return record?.wraps.map((w) => w.method) ?? []
}

/**
 * The passkey wrap's public metadata (credential ID + PRF salt) — safe to
 * read without unlocking anything, since only `wrappedKey` inside it is
 * actually encrypted. Needed to evaluate PRF against the right credential
 * *before* the vault can be decrypted.
 */
export async function passkeyWrapMeta(): Promise<{ credentialId: Uint8Array<ArrayBuffer>; prfSalt: Uint8Array<ArrayBuffer> } | null> {
  const record = await db.vault.get(VAULT_ID)
  const wrap = record?.wraps.find((w) => w.method === 'passkeyPrf')
  if (!wrap || wrap.method !== 'passkeyPrf') return null
  return { credentialId: new Uint8Array(wrap.credentialId), prfSalt: new Uint8Array(wrap.prfSalt) }
}

async function wrapMasterKey(
  masterKeyBytes: Uint8Array<ArrayBuffer>,
  kek: CryptoKey,
  iv: Uint8Array<ArrayBuffer>,
): Promise<ArrayBuffer> {
  return encrypt(kek, iv, masterKeyBytes)
}

async function unwrapMasterKey(
  wrappedKey: ArrayBuffer,
  kek: CryptoKey,
  iv: Uint8Array<ArrayBuffer>,
): Promise<Uint8Array<ArrayBuffer>> {
  try {
    return new Uint8Array(await decrypt(kek, iv, wrappedKey))
  } catch {
    // AES-GCM authentication failure surfaces as a generic OperationError —
    // this is indistinguishable from "wrong credential" by design.
    throw new VaultUnlockError()
  }
}

async function decryptVaultData(record: VaultRecord, masterKey: CryptoKey): Promise<VaultData> {
  const plaintext = await decrypt(masterKey, new Uint8Array(record.iv), record.ciphertext)
  return JSON.parse(new TextDecoder().decode(plaintext)) as VaultData
}

function mnemonicKek(mnemonic: string): Promise<CryptoKey> {
  const bytes = new TextEncoder().encode(normalizeMnemonic(mnemonic))
  return deriveWrapKeyFromBytes(bytes as Uint8Array<ArrayBuffer>, MNEMONIC_HKDF_INFO)
}

export async function createVault(mnemonic: string, initialData: VaultData): Promise<CryptoKey> {
  const masterKeyBytes = crypto.getRandomValues(new Uint8Array(32))
  const masterKey = await importAesKey(masterKeyBytes, true)

  const dataIv = generateIv()
  const plaintext = new TextEncoder().encode(JSON.stringify(initialData))
  const ciphertext = await encrypt(masterKey, dataIv, plaintext)

  const wrapIv = generateIv()
  const kek = await mnemonicKek(mnemonic)
  const wrappedKey = await wrapMasterKey(masterKeyBytes, kek, wrapIv)

  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext,
    iv: toArrayBuffer(dataIv),
    wraps: [{ method: 'mnemonic', iv: toArrayBuffer(wrapIv), wrappedKey }],
    updatedAt: Date.now(),
    createdAt: Date.now(),
  }
  await db.vault.put(record)
  return masterKey
}

export async function unlockWithMnemonic(mnemonic: string): Promise<{ key: CryptoKey; data: VaultData }> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw translatedError('errors.noVaultOnDevice')
  const wrap = record.wraps.find((w) => w.method === 'mnemonic')
  if (!wrap || wrap.method !== 'mnemonic') throw new UnlockMethodNotEnrolledError('Recovery phrase')

  const kek = await mnemonicKek(mnemonic)
  const masterKeyBytes = await unwrapMasterKey(wrap.wrappedKey, kek, new Uint8Array(wrap.iv))
  const masterKey = await importAesKey(masterKeyBytes, true)

  try {
    const data = await decryptVaultData(record, masterKey)
    return { key: masterKey, data }
  } catch {
    throw new VaultUnlockError()
  }
}

/** `prfSecret` is the raw PRF output already obtained via services/webauthnLocal.ts. */
export async function unlockWithPasskey(prfSecret: ArrayBuffer): Promise<{ key: CryptoKey; data: VaultData }> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw translatedError('errors.noVaultOnDevice')
  const wrap = record.wraps.find((w) => w.method === 'passkeyPrf')
  if (!wrap || wrap.method !== 'passkeyPrf') throw new UnlockMethodNotEnrolledError('Passkey')

  const kek = await deriveWrapKeyFromBytes(prfSecret, PASSKEY_HKDF_INFO)
  const masterKeyBytes = await unwrapMasterKey(wrap.wrappedKey, kek, new Uint8Array(wrap.iv))
  const masterKey = await importAesKey(masterKeyBytes, true)

  try {
    const data = await decryptVaultData(record, masterKey)
    return { key: masterKey, data }
  } catch {
    throw new VaultUnlockError()
  }
}

/**
 * The get-then-put here (and in removeWrap/saveVault below) must not have any
 * non-database `await` between the read and the write: each Dexie call
 * outside an explicit `db.transaction()` runs in its own IndexedDB
 * transaction, so a get() and a later put() are otherwise two separate
 * transactions with a gap between them wide enough for a *different* call to
 * read the same pre-update record and write its own change back in between —
 * whichever of the two put()s lands second wins outright, silently discarding
 * the other's change. That's exactly how a passkey wrap added here could
 * vanish again later: this used to read `record`, spend time on WebCrypto
 * calls, and only then put() using that now-stale `record` — long enough for
 * an unrelated persist() (any account/payee edit, a settings change) to land
 * its own write in between and get overwritten right back out. Wrapping the
 * get+put in one `db.transaction('rw', ...)` makes IndexedDB serialize it
 * against any other transaction on this table instead, so the later one
 * always builds on the earlier one's result rather than clobbering it.
 */
export async function addPasskeyWrap(
  masterKey: CryptoKey,
  credentialId: Uint8Array,
  prfSalt: Uint8Array,
  prfSecret: ArrayBuffer,
): Promise<void> {
  // WebCrypto work first — none of it depends on the current record, and an
  // awaited non-IDB call inside the transaction below would let the browser
  // auto-commit it early, breaking the atomicity this exists for.
  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  const kek = await deriveWrapKeyFromBytes(prfSecret, PASSKEY_HKDF_INFO)
  const iv = generateIv()
  const wrappedKey = await wrapMasterKey(masterKeyBytes, kek, iv)

  await db.transaction('rw', db.vault, async () => {
    const record = await db.vault.get(VAULT_ID)
    if (!record) throw translatedError('errors.noVaultOnDevice')
    const wraps: KeyWrap[] = record.wraps.filter((w) => w.method !== 'passkeyPrf')
    wraps.push({
      method: 'passkeyPrf',
      credentialId: toArrayBuffer(credentialId),
      prfSalt: toArrayBuffer(prfSalt),
      iv: toArrayBuffer(iv),
      wrappedKey,
    })
    await db.vault.put({ ...record, wraps, updatedAt: Date.now() })
  })
}

/** The recovery-mnemonic wrap can never be removed — it's the only universal recovery method. */
export async function removeWrap(method: 'passkeyPrf'): Promise<void> {
  await db.transaction('rw', db.vault, async () => {
    const record = await db.vault.get(VAULT_ID)
    if (!record) throw translatedError('errors.noVaultOnDevice')
    await db.vault.put({ ...record, wraps: record.wraps.filter((w) => w.method !== method), updatedAt: Date.now() })
  })
}

export async function saveVault(key: CryptoKey, data: VaultData): Promise<void> {
  const iv = generateIv()
  const plaintext = new TextEncoder().encode(JSON.stringify(data))
  const ciphertext = await encrypt(key, iv, plaintext)

  await db.transaction('rw', db.vault, async () => {
    const existing = await db.vault.get(VAULT_ID)
    if (!existing) throw translatedError('errors.cannotSaveNoVault')
    await db.vault.put({
      ...existing,
      ciphertext,
      iv: toArrayBuffer(iv),
      updatedAt: Date.now(),
    })
  })
}

function isByteArrayLike(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((n) => Number.isInteger(n) && n >= 0 && n <= 255)
}

/**
 * Only the mnemonic wrap travels with a backup — a passkey is per-device and
 * re-enrolled fresh after a restore, the same way you'd re-pair a platform
 * authenticator on any new device regardless of this app.
 */
export async function exportEncryptedVaultBlob(): Promise<Blob> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw translatedError('errors.noVaultOnDevice')
  const mnemonicWrap = record.wraps.find((w) => w.method === 'mnemonic')
  if (!mnemonicWrap) throw translatedError('errors.noRecoveryWrapToExport')

  const payload = {
    version: 2,
    iv: Array.from(new Uint8Array(record.iv)),
    ciphertext: Array.from(new Uint8Array(record.ciphertext)),
    mnemonicWrap: {
      iv: Array.from(new Uint8Array(mnemonicWrap.iv)),
      wrappedKey: Array.from(new Uint8Array(mnemonicWrap.wrappedKey)),
    },
  }
  return new Blob([JSON.stringify(payload)], { type: 'application/json' })
}

export async function importEncryptedVaultBlob(blob: Blob): Promise<void> {
  let payload
  try {
    payload = JSON.parse(await blob.text())
  } catch {
    throw translatedError('errors.invalidBackupFile')
  }

  if (
    payload?.version !== 2 ||
    !isByteArrayLike(payload.iv) ||
    !isByteArrayLike(payload.ciphertext) ||
    !isByteArrayLike(payload.mnemonicWrap?.iv) ||
    !isByteArrayLike(payload.mnemonicWrap?.wrappedKey)
  ) {
    throw translatedError('errors.invalidBackupFile')
  }

  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext: new Uint8Array(payload.ciphertext).buffer,
    iv: new Uint8Array(payload.iv).buffer,
    wraps: [
      {
        method: 'mnemonic',
        iv: new Uint8Array(payload.mnemonicWrap.iv).buffer,
        wrappedKey: new Uint8Array(payload.mnemonicWrap.wrappedKey).buffer,
      },
    ],
    updatedAt: Date.now(),
    // Not carried over from the backup, same reasoning as lastBackupAt below:
    // from this device's perspective the vault is newly set up here today.
    createdAt: Date.now(),
  }
  await db.vault.put(record)
}
