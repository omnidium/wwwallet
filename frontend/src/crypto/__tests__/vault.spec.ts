import { describe, expect, it, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import {
  createVault,
  unlockWithPassphrase,
  unlockWithTotp,
  saveVault,
  addTotpWrap,
  removeWrap,
  exportEncryptedVaultBlob,
  importEncryptedVaultBlob,
  availableUnlockMethods,
  VaultUnlockError,
  UnlockMethodNotEnrolledError,
  type VaultData,
} from '../vault'
import { db } from '@/services/db'

const FAST_KDF_PARAMS = { memoryKiB: 8, iterations: 1, parallelism: 1 }
const TOTP_SECRET = 'JBSWY3DPEHPK3PXP'

describe('vault encryption round-trip', () => {
  beforeEach(async () => {
    await db.vault.clear()
  })

  it('creates a vault and unlocks it with the correct passphrase', async () => {
    const data: VaultData = {
      wallets: [{ address: '0xabc', label: 'Main', chain: 'ethereum', encryptedKeystore: '{}' }],
      payees: [],
      settings: { locale: 'en', currency: 'USD' },
    }
    await createVault('correct horse battery staple', data, FAST_KDF_PARAMS)

    const { data: decrypted } = await unlockWithPassphrase('correct horse battery staple')
    expect(decrypted).toEqual(data)
  })

  it('rejects the wrong passphrase', async () => {
    await createVault('correct horse battery staple', { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }, FAST_KDF_PARAMS)

    await expect(unlockWithPassphrase('wrong passphrase')).rejects.toBeInstanceOf(VaultUnlockError)
  })

  it('persists updates made after unlock', async () => {
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault('correct horse battery staple', initial, FAST_KDF_PARAMS)

    const updated: VaultData = {
      ...initial,
      payees: [{ id: '1', label: 'Alice', address: '0xdef', chain: 'ethereum' }],
    }
    await saveVault(key, updated)

    const { data } = await unlockWithPassphrase('correct horse battery staple')
    expect(data.payees).toHaveLength(1)
  })

  it('unlocks with TOTP once enrolled, independently of the passphrase', async () => {
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault('correct horse battery staple', initial, FAST_KDF_PARAMS)
    await addTotpWrap(key, TOTP_SECRET)

    expect(await availableUnlockMethods()).toEqual(expect.arrayContaining(['passphrase', 'totp']))

    const { data } = await unlockWithTotp(TOTP_SECRET)
    expect(data).toEqual(initial)
  })

  it('rejects TOTP unlock once the wrap has been removed', async () => {
    const key = await createVault('correct horse battery staple', { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }, FAST_KDF_PARAMS)
    await addTotpWrap(key, TOTP_SECRET)
    await removeWrap('totp')

    await expect(unlockWithTotp(TOTP_SECRET)).rejects.toBeInstanceOf(UnlockMethodNotEnrolledError)
  })

  it('only carries the passphrase wrap through export/import, not TOTP', async () => {
    const key = await createVault('correct horse battery staple', { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }, FAST_KDF_PARAMS)
    await addTotpWrap(key, TOTP_SECRET)

    const blob = await exportEncryptedVaultBlob()
    await db.vault.clear()
    await importEncryptedVaultBlob(blob)

    expect(await availableUnlockMethods()).toEqual(['passphrase'])
    const { data } = await unlockWithPassphrase('correct horse battery staple')
    expect(data.wallets).toEqual([])
  })
})
