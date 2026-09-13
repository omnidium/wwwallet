import { describe, expect, it, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import { createVault, unlockVault, saveVault, VaultUnlockError, type VaultData } from '../vault'
import { db } from '@/services/db'

const FAST_KDF_PARAMS = { memoryKiB: 8, iterations: 1, parallelism: 1 }

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

    const { data: decrypted } = await unlockVault('correct horse battery staple')
    expect(decrypted).toEqual(data)
  })

  it('rejects the wrong passphrase', async () => {
    await createVault('correct horse battery staple', { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }, FAST_KDF_PARAMS)

    await expect(unlockVault('wrong passphrase')).rejects.toBeInstanceOf(VaultUnlockError)
  })

  it('persists updates made after unlock', async () => {
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault('correct horse battery staple', initial, FAST_KDF_PARAMS)

    const updated: VaultData = {
      ...initial,
      payees: [{ id: '1', label: 'Alice', address: '0xdef', chain: 'ethereum' }],
    }
    await saveVault(key, updated)

    const { data } = await unlockVault('correct horse battery staple')
    expect(data.payees).toHaveLength(1)
  })
})
