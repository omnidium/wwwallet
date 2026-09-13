import { db, type VaultRecord } from '@/services/db'
import { DEFAULT_KDF_PARAMS, deriveKeyBytes, generateSalt, type KdfParams } from './kdf'
import { decrypt, encrypt, generateIv, importAesKey } from './aesGcm'
import type { WalletAccount } from '@/stores/accounts'
import type { Payee } from '@/stores/payees'

export interface VaultData {
  wallets: WalletAccount[]
  payees: Payee[]
  settings: { locale: string; currency: string }
  totpSecret?: string
}

const VAULT_ID = 'default' as const

export async function hasVault(): Promise<boolean> {
  return (await db.vault.get(VAULT_ID)) !== undefined
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}

export async function createVault(
  passphrase: string,
  initialData: VaultData,
  kdfParams: KdfParams = DEFAULT_KDF_PARAMS,
): Promise<CryptoKey> {
  const salt = generateSalt()
  const keyBytes = await deriveKeyBytes(passphrase, salt, kdfParams)
  const key = await importAesKey(keyBytes)

  const iv = generateIv()
  const plaintext = new TextEncoder().encode(JSON.stringify(initialData))
  const ciphertext = await encrypt(key, iv, plaintext)

  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext,
    iv: toArrayBuffer(iv),
    salt: toArrayBuffer(salt),
    kdf: 'argon2id',
    kdfParams,
    updatedAt: Date.now(),
  }
  await db.vault.put(record)
  return key
}

export class VaultUnlockError extends Error {
  constructor() {
    super('incorrect passphrase or corrupted vault')
    this.name = 'VaultUnlockError'
  }
}

export async function unlockVault(passphrase: string): Promise<{ key: CryptoKey; data: VaultData }> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')

  const keyBytes = await deriveKeyBytes(passphrase, new Uint8Array(record.salt), record.kdfParams)
  const key = await importAesKey(keyBytes)

  try {
    const plaintext = await decrypt(key, new Uint8Array(record.iv), record.ciphertext)
    const data = JSON.parse(new TextDecoder().decode(plaintext)) as VaultData
    return { key, data }
  } catch {
    // AES-GCM authentication failure surfaces as a generic OperationError —
    // this is indistinguishable from "wrong passphrase" by design.
    throw new VaultUnlockError()
  }
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

export async function exportEncryptedVaultBlob(): Promise<Blob> {
  const record = await db.vault.get(VAULT_ID)
  if (!record) throw new Error('no vault exists on this device')
  const payload = {
    kdf: record.kdf,
    kdfParams: record.kdfParams,
    salt: Array.from(new Uint8Array(record.salt)),
    iv: Array.from(new Uint8Array(record.iv)),
    ciphertext: Array.from(new Uint8Array(record.ciphertext)),
  }
  return new Blob([JSON.stringify(payload)], { type: 'application/json' })
}

export async function importEncryptedVaultBlob(blob: Blob): Promise<void> {
  const payload = JSON.parse(await blob.text())
  const record: VaultRecord = {
    id: VAULT_ID,
    ciphertext: new Uint8Array(payload.ciphertext).buffer,
    iv: new Uint8Array(payload.iv).buffer,
    salt: new Uint8Array(payload.salt).buffer,
    kdf: payload.kdf,
    kdfParams: payload.kdfParams,
    updatedAt: Date.now(),
  }
  await db.vault.put(record)
}
