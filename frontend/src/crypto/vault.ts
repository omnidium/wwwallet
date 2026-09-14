import { db, type VaultRecord, type KeyWrap } from '@/services/db'
import {
  DEFAULT_KDF_PARAMS,
  deriveKeyBytes,
  deriveWrapKeyFromBytes,
  generateSalt,
  type KdfParams,
} from './kdf'
import { decrypt, encrypt, exportAesKeyBytes, generateIv, importAesKey } from './aesGcm'
import { totpSecretBytes } from '@/services/totp'
import type { WalletAccount } from '@/stores/accounts'
import type { Payee } from '@/stores/payees'

export interface VaultData {
  wallets: WalletAccount[]
  payees: Payee[]
  settings: { locale: string; currency: string }
}

const VAULT_ID = 'default' as const

// Domain-separation labels for HKDF — see crypto/kdf.ts. Not secret, just
// prevents the same raw key material accidentally unwrapping the wrong thing.
const PASSKEY_HKDF_INFO = 'wwwallet.vault.wrap.passkeyPrf.v1'
const TOTP_HKDF_INFO = 'wwwallet.vault.wrap.totp.v1'

export async function hasVault(): Promise<boolean> {
  return (await db.vault.get(VAULT_ID)) !== undefined
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

export class VaultUnlockError extends Error {
  constructor() {
    super('Incorrect passphrase, code, or corrupted vault.')
    this.name = 'VaultUnlockError'
  }
}

export class UnlockMethodNotEnrolledError extends Error {
  constructor(method: string) {
    super(`${method} is not set up for this vault.`)
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

export async function createVault(
  passphrase: string,
  initialData: VaultData,
  kdfParams: KdfParams = DEFAULT_KDF_PARAMS,
): Promise<CryptoKey> {
  const masterKeyBytes = crypto.getRandomValues(new Uint8Array(32))
  const masterKey = await importAesKey(masterKeyBytes, true)

  const dataIv = generateIv()
  const plaintext = new TextEncoder().encode(JSON.stringify(initialData))
  const ciphertext = await encrypt(masterKey, dataIv, plaintext)

  const salt = generateSalt()
  const wrapIv = generateIv()
  const kekBytes = await deriveKeyBytes(passphrase, salt, kdfParams)
  const kek = await importAesKey(kekBytes)
  const wrappedKey = await wrapMasterKey(masterKeyBytes, kek, wrapIv)

  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext,
    iv: toArrayBuffer(dataIv),
    wraps: [
      { method: 'passphrase', salt: toArrayBuffer(salt), kdfParams, iv: toArrayBuffer(wrapIv), wrappedKey },
    ],
    updatedAt: Date.now(),
  }
  await db.vault.put(record)
  return masterKey
}

export async function unlockWithPassphrase(passphrase: string): Promise<{ key: CryptoKey; data: VaultData }> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')
  const wrap = record.wraps.find((w) => w.method === 'passphrase')
  if (!wrap || wrap.method !== 'passphrase') throw new UnlockMethodNotEnrolledError('Passphrase')

  const kekBytes = await deriveKeyBytes(passphrase, new Uint8Array(wrap.salt), wrap.kdfParams)
  const kek = await importAesKey(kekBytes)
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
  if (!record) throw new Error('no vault exists on this device')
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

/** `secretBase32` is the enrolled TOTP secret — caller has already verified the live code. */
export async function unlockWithTotp(secretBase32: string): Promise<{ key: CryptoKey; data: VaultData }> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')
  const wrap = record.wraps.find((w) => w.method === 'totp')
  if (!wrap || wrap.method !== 'totp') throw new UnlockMethodNotEnrolledError('Authenticator app')

  const kek = await deriveWrapKeyFromBytes(totpSecretBytes(secretBase32), TOTP_HKDF_INFO)
  const masterKeyBytes = await unwrapMasterKey(wrap.wrappedKey, kek, new Uint8Array(wrap.iv))
  const masterKey = await importAesKey(masterKeyBytes, true)

  try {
    const data = await decryptVaultData(record, masterKey)
    return { key: masterKey, data }
  } catch {
    throw new VaultUnlockError()
  }
}

export async function addPasskeyWrap(
  masterKey: CryptoKey,
  credentialId: Uint8Array,
  prfSalt: Uint8Array,
  prfSecret: ArrayBuffer,
): Promise<void> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')

  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  const kek = await deriveWrapKeyFromBytes(prfSecret, PASSKEY_HKDF_INFO)
  const iv = generateIv()
  const wrappedKey = await wrapMasterKey(masterKeyBytes, kek, iv)

  const wraps: KeyWrap[] = record.wraps.filter((w) => w.method !== 'passkeyPrf')
  wraps.push({
    method: 'passkeyPrf',
    credentialId: toArrayBuffer(credentialId),
    prfSalt: toArrayBuffer(prfSalt),
    iv: toArrayBuffer(iv),
    wrappedKey,
  })
  await db.vault.put({ ...record, wraps, updatedAt: Date.now() })
}

export async function addTotpWrap(masterKey: CryptoKey, secretBase32: string): Promise<void> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')

  const masterKeyBytes = await exportAesKeyBytes(masterKey)
  const kek = await deriveWrapKeyFromBytes(totpSecretBytes(secretBase32), TOTP_HKDF_INFO)
  const iv = generateIv()
  const wrappedKey = await wrapMasterKey(masterKeyBytes, kek, iv)

  const wraps: KeyWrap[] = record.wraps.filter((w) => w.method !== 'totp')
  wraps.push({ method: 'totp', iv: toArrayBuffer(iv), wrappedKey })
  await db.vault.put({ ...record, wraps, updatedAt: Date.now() })
}

/** The passphrase wrap can never be removed — it's the only universal recovery method. */
export async function removeWrap(method: 'passkeyPrf' | 'totp'): Promise<void> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')
  await db.vault.put({ ...record, wraps: record.wraps.filter((w) => w.method !== method), updatedAt: Date.now() })
}

export async function saveVault(key: CryptoKey, data: VaultData): Promise<void> {
  const existing = await db.vault.get(VAULT_ID)
  if (!existing) throw new Error('cannot save: no vault exists yet')

  const iv = generateIv()
  const plaintext = new TextEncoder().encode(JSON.stringify(data))
  const ciphertext = await encrypt(key, iv, plaintext)

  await db.vault.put({
    ...existing,
    ciphertext,
    iv: toArrayBuffer(iv),
    updatedAt: Date.now(),
  })
}

/**
 * Only the passphrase wrap travels with a backup — passkeys and TOTP
 * enrollment are per-device and re-enrolled fresh after a restore, the same
 * way you'd re-pair a platform authenticator or rescan a QR code on any new
 * device regardless of this app.
 */
export async function exportEncryptedVaultBlob(): Promise<Blob> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')
  const passphraseWrap = record.wraps.find((w) => w.method === 'passphrase')
  if (!passphraseWrap) throw new Error('vault has no passphrase wrap to export')

  const payload = {
    iv: Array.from(new Uint8Array(record.iv)),
    ciphertext: Array.from(new Uint8Array(record.ciphertext)),
    passphraseWrap: {
      salt: Array.from(new Uint8Array(passphraseWrap.salt)),
      kdfParams: passphraseWrap.kdfParams,
      iv: Array.from(new Uint8Array(passphraseWrap.iv)),
      wrappedKey: Array.from(new Uint8Array(passphraseWrap.wrappedKey)),
    },
  }
  return new Blob([JSON.stringify(payload)], { type: 'application/json' })
}

export async function importEncryptedVaultBlob(blob: Blob): Promise<void> {
  const payload = JSON.parse(await blob.text())
  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext: new Uint8Array(payload.ciphertext).buffer,
    iv: new Uint8Array(payload.iv).buffer,
    wraps: [
      {
        method: 'passphrase',
        salt: new Uint8Array(payload.passphraseWrap.salt).buffer,
        kdfParams: payload.passphraseWrap.kdfParams,
        iv: new Uint8Array(payload.passphraseWrap.iv).buffer,
        wrappedKey: new Uint8Array(payload.passphraseWrap.wrappedKey).buffer,
      },
    ],
    updatedAt: Date.now(),
  }
  await db.vault.put(record)
}
