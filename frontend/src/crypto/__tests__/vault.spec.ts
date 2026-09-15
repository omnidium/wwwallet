import { describe, expect, it, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import {
  createVault,
  unlockWithMnemonic,
  unlockWithPasskey,
  saveVault,
  addPasskeyWrap,
  removeWrap,
  exportEncryptedVaultBlob,
  importEncryptedVaultBlob,
  availableUnlockMethods,
  VaultUnlockError,
  UnlockMethodNotEnrolledError,
  type VaultData,
} from '../vault'
import { db } from '@/services/db'

const RECOVERY_PHRASE =
  'correct horse battery staple correct horse battery staple correct horse battery staple'
const FAKE_CREDENTIAL_ID = new Uint8Array([1, 2, 3, 4])
const FAKE_PRF_SALT = new Uint8Array([5, 6, 7, 8])
const FAKE_PRF_SECRET = new Uint8Array(32).fill(9).buffer

describe('vault encryption round-trip', () => {
  beforeEach(async () => {
    await db.vault.clear()
  })

  it('creates a vault and unlocks it with the correct recovery phrase', async () => {
    const data: VaultData = {
      wallets: [{ address: '0xabc', label: 'Main', chain: 'ethereum', privateKey: '0x' + '1'.repeat(64) }],
      payees: [],
      settings: { locale: 'en', currency: 'USD' },
    }
    await createVault(RECOVERY_PHRASE, data)

    const { data: decrypted } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(decrypted).toEqual(data)
  })

  it('rejects the wrong recovery phrase', async () => {
    await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })

    await expect(unlockWithMnemonic('wrong recovery phrase entirely')).rejects.toBeInstanceOf(VaultUnlockError)
  })

  it('persists updates made after unlock', async () => {
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault(RECOVERY_PHRASE, initial)

    const updated: VaultData = {
      ...initial,
      payees: [{ id: '1', label: 'Alice', address: '0xdef', chain: 'ethereum' }],
    }
    await saveVault(key, updated)

    const { data } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(data.payees).toHaveLength(1)
  })

  it('unlocks with a passkey once enrolled, independently of the recovery phrase', async () => {
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault(RECOVERY_PHRASE, initial)
    await addPasskeyWrap(key, FAKE_CREDENTIAL_ID, FAKE_PRF_SALT, FAKE_PRF_SECRET)

    expect(await availableUnlockMethods()).toEqual(expect.arrayContaining(['mnemonic', 'passkeyPrf']))

    const { data } = await unlockWithPasskey(FAKE_PRF_SECRET)
    expect(data).toEqual(initial)
  })

  it('rejects passkey unlock once the wrap has been removed', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await addPasskeyWrap(key, FAKE_CREDENTIAL_ID, FAKE_PRF_SALT, FAKE_PRF_SECRET)
    await removeWrap('passkeyPrf')

    await expect(unlockWithPasskey(FAKE_PRF_SECRET)).rejects.toBeInstanceOf(UnlockMethodNotEnrolledError)
  })

  it('only carries the recovery-phrase wrap through export/import, not the passkey', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await addPasskeyWrap(key, FAKE_CREDENTIAL_ID, FAKE_PRF_SALT, FAKE_PRF_SECRET)

    const blob = await exportEncryptedVaultBlob()
    await db.vault.clear()
    await importEncryptedVaultBlob(blob)

    expect(await availableUnlockMethods()).toEqual(['mnemonic'])
    const { data } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(data.wallets).toEqual([])
  })

  it('rejects a corrupted or non-backup file on import', async () => {
    const bogus = new Blob([JSON.stringify({ not: 'a backup' })], { type: 'application/json' })
    await expect(importEncryptedVaultBlob(bogus)).rejects.toThrow('not a valid wwwallet backup')
  })
})
