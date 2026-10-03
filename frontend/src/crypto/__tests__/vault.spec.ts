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
  addPasswordWrap,
  unlockWithPassword,
  VaultUnlockError,
  UnlockMethodNotEnrolledError,
  type VaultData,
} from '../vault'
import { db } from '@/services/db'
import {
  clearCache,
  exportCacheForBackup,
  getPublic,
  lockCache,
  privateEntries,
  putPrivate,
  putPublic,
  stageCacheRestore,
  unlockCache,
} from '@/services/secureCache'

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
      wallets: [
        {
          address: '0xabc',
          label: 'Main',
          chain: 'ethereum',
          privateKey: '0x' + '1'.repeat(64),
          isDefault: true,
          visible: true,
          hasMnemonic: false,
        },
      ],
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

  it('keeps both changes when two vault updates race (no lost update)', async () => {
    // Regression test: addPasskeyWrap/saveVault used to read the record,
    // await some WebCrypto work, then put() using that now-stale read —
    // two concurrent callers could each read the same "before" state and
    // the one that put() last would silently wipe out whichever change the
    // other one made. Both now wrap their get+put in one db.transaction so
    // IndexedDB serializes them instead.
    const initial: VaultData = { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
    const key = await createVault(RECOVERY_PHRASE, initial)
    const updated: VaultData = {
      ...initial,
      payees: [{ id: '1', label: 'Alice', address: '0xdef', chain: 'ethereum' }],
    }

    await Promise.all([
      saveVault(key, updated),
      addPasskeyWrap(key, FAKE_CREDENTIAL_ID, FAKE_PRF_SALT, FAKE_PRF_SECRET),
    ])

    expect(await availableUnlockMethods()).toEqual(expect.arrayContaining(['mnemonic', 'passkeyPrf']))
    const { data } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(data.payees).toHaveLength(1)
  })

  it('rejects a corrupted or non-backup file on import', async () => {
    const bogus = new Blob([JSON.stringify({ not: 'a backup' })], { type: 'application/json' })
    await expect(importEncryptedVaultBlob(bogus)).rejects.toThrow('not a valid wwwallet backup')
  })

  it('carries the whole cache through a backup, readable again at the first unlock after restore', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await unlockCache(key)
    await putPrivate('chain-activity:ethereum:0xabc', { balances: [], transactions: ['0x1'] })
    await putPublic('favourites', { 'ethereum:native': true })

    const blob = await exportEncryptedVaultBlob(await exportCacheForBackup(key))
    expect(await blob.text()).not.toContain('chain-activity')

    // A different device: nothing there yet.
    lockCache()
    await clearCache()
    await db.vault.clear()

    const { cache } = await importEncryptedVaultBlob(blob)
    expect(cache).not.toBeNull()
    await stageCacheRestore(cache!)
    expect(await getPublic('favourites')).toBeUndefined()

    const { key: restoredKey } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(await unlockCache(restoredKey)).toBe(true)
    expect(await privateEntries()).toEqual([
      { key: 'chain-activity:ethereum:0xabc', data: { balances: [], transactions: ['0x1'] } },
    ])
    expect(await getPublic('favourites')).toEqual({ 'ethereum:native': true })
    // Applied once: the next unlock has nothing left to put back.
    expect(await unlockCache(restoredKey)).toBe(false)
    lockCache()
  })

  it('still imports a version-2 backup, which has no cache', async () => {
    await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    const payload = JSON.parse(await (await exportEncryptedVaultBlob()).text())
    payload.version = 2
    await db.vault.clear()

    const { cache } = await importEncryptedVaultBlob(new Blob([JSON.stringify(payload)]))
    expect(cache).toBeNull()
    const { data } = await unlockWithMnemonic(RECOVERY_PHRASE)
    expect(data.wallets).toEqual([])
  })

  it('restores the vault even when its backed-up cache is damaged', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await unlockCache(key)
    await putPublic('favourites', { 'ethereum:native': true })
    const section = await exportCacheForBackup(key)
    lockCache()

    await stageCacheRestore({ ...section, ciphertext: btoa('not the real ciphertext') })
    expect(await unlockCache(key)).toBe(false)
    expect(await getPublic('favourites')).toBeUndefined()
    lockCache()
  })

  it('unlocks with an unlock password once set, and rejects a wrong one', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await addPasswordWrap(key, 'a long unlock password')

    expect(await availableUnlockMethods()).toEqual(['mnemonic', 'password'])
    const { data } = await unlockWithPassword('a long unlock password')
    expect(data.settings.currency).toBe('USD')
    await expect(unlockWithPassword('a long unlock passw0rd')).rejects.toBeInstanceOf(VaultUnlockError)
    await expect(unlockWithPassword('a long unlock passw0rd')).rejects.toThrow('Incorrect unlock password')

    await removeWrap('password')
    await expect(unlockWithPassword('a long unlock password')).rejects.toBeInstanceOf(UnlockMethodNotEnrolledError)
    // The recovery phrase is untouched throughout.
    expect((await unlockWithMnemonic(RECOVERY_PHRASE)).data.wallets).toEqual([])
  })

  it('leaves the unlock password out of a backup — it belongs to the device', async () => {
    const key = await createVault(RECOVERY_PHRASE, { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } })
    await addPasswordWrap(key, 'a long unlock password')

    const blob = await exportEncryptedVaultBlob()
    await db.vault.clear()
    await importEncryptedVaultBlob(blob)
    expect(await availableUnlockMethods()).toEqual(['mnemonic'])
  })
})
