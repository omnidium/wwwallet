import { defineStore } from 'pinia'
import { ref } from 'vue'

import { i18n } from '@/i18n'
import {
  addPasskeyWrap,
  createVault as createVaultRecord,
  deleteVault as deleteVaultRecord,
  exportEncryptedVaultBlob,
  getCreatedAt,
  getLastBackupAt,
  hasVault as hasVaultRecord,
  importEncryptedVaultBlob,
  passkeyWrapMeta,
  recordBackup,
  removeWrap,
  saveVault as saveVaultRecord,
  unlockWithPasskey as unlockWithPasskeyRecord,
  unlockWithMnemonic as unlockWithMnemonicRecord,
  type VaultData,
} from '@/crypto/vault'
import {
  hasLocalPasskey,
  registerLocalPasskeyWithPrf,
  unlockPasskeyPrfSecret,
} from '@/services/webauthnLocal'
import { backupToGoogleDrive, restoreFromGoogleDrive } from '@/services/googleDrive'
import { downloadEncryptedVaultBlob } from '@/services/fileBackup'
import { db } from '@/services/db'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useChainDataStore } from '@/stores/chainData'
import { useFavouritesStore } from '@/stores/favourites'
import { useMessagesStore } from '@/stores/messages'
import { clearCache, lockCache, unlockCache } from '@/services/secureCache'
import { DEFAULT_TRANSACTION_BATCH_SIZE } from '@/config/appSettings'

function emptyVaultData(): VaultData {
  return {
    wallets: [],
    payees: [],
    settings: { locale: 'en', currency: 'USD', transactionBatchSize: DEFAULT_TRANSACTION_BATCH_SIZE },
  }
}

export const useVaultStore = defineStore('vault', () => {
  const isUnlocked = ref(false)
  const hasVault = ref(false)
  const hasPasskey = ref(false)
  const lastBackupAt = ref<number | null>(null)
  const createdAt = ref<number | null>(null)

  // Held only in memory for the unlocked session — never persisted.
  let sessionKey: CryptoKey | null = null

  async function refreshFlags() {
    hasVault.value = await hasVaultRecord()
    hasPasskey.value = await hasLocalPasskey()
    lastBackupAt.value = await getLastBackupAt()
    createdAt.value = await getCreatedAt()
  }
  refreshFlags()

  function loadIntoStores(data: VaultData) {
    useAccountsStore().accounts = data.wallets
    usePayeesStore().payees = data.payees
    const settings = useSettingsLocaleStore()
    settings.locale = data.settings.locale
    settings.currency = data.settings.currency
    useChainDataStore().transactionBatchSize = data.settings.transactionBatchSize ?? DEFAULT_TRANSACTION_BATCH_SIZE
    useFavouritesStore().rememberVisibleChains(data.wallets)
  }

  function collectFromStores(): VaultData {
    return {
      wallets: useAccountsStore().accounts,
      payees: usePayeesStore().payees,
      settings: {
        locale: useSettingsLocaleStore().locale,
        currency: useSettingsLocaleStore().currency,
        transactionBatchSize: useChainDataStore().transactionBatchSize,
      },
    }
  }

  async function createVault(recoveryMnemonic: string): Promise<void> {
    const data = emptyVaultData()
    sessionKey = await createVaultRecord(recoveryMnemonic, data)
    await unlockCache(sessionKey)
    loadIntoStores(data)
    isUnlocked.value = true
    hasVault.value = true
    createdAt.value = Date.now()
  }

  async function unlockWithMnemonic(recoveryMnemonic: string): Promise<void> {
    const { key, data } = await unlockWithMnemonicRecord(recoveryMnemonic)
    sessionKey = key
    await unlockCache(key)
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPasskey(): Promise<void> {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error(i18n.global.t('errors.passkeyNotSetUp'))
    const prfSecret = await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    const { key, data } = await unlockWithPasskeyRecord(prfSecret)
    sessionKey = key
    await unlockCache(key)
    loadIntoStores(data)
    isUnlocked.value = true
  }

  // Wipes decrypted wallet data (private keys included) out of the other
  // Pinia stores. Locking only ever cleared `sessionKey` and `isUnlocked`
  // before this — the accounts/payees data loaded by `loadIntoStores` stayed
  // sitting in memory (reachable via Vue devtools, or any injected script)
  // even after the vault was "locked" and the UI had moved to the unlock screen.
  //
  // Same for everything else derived from the accounts: their balances and
  // transaction history (and the cache keys that could decrypt them from
  // disk), and any on-screen messages, some of which quote transaction hashes.
  function clearStores(): void {
    useAccountsStore().accounts = []
    usePayeesStore().payees = []
    lockCache()
    useChainDataStore().clearPersonalData()
    useMessagesStore().messages = []
  }

  function lock(): void {
    sessionKey = null
    isUnlocked.value = false
    clearStores()
  }

  /**
   * Irreversible. Erases the encrypted vault, the local passkey binding, and
   * the provider-response cache from this device — the caller is responsible
   * for gating this behind an explicit "I have a backup" acknowledgment,
   * since nothing here can undo it.
   */
  async function deleteFromDevice(): Promise<void> {
    await deleteVaultRecord()
    await db.localWebAuthnCredential.delete('default')
    await clearCache()
    useFavouritesStore().forget()
    sessionKey = null
    isUnlocked.value = false
    hasVault.value = false
    hasPasskey.value = false
    lastBackupAt.value = null
    createdAt.value = null
    clearStores()
  }

  async function persist(): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    await saveVaultRecord(sessionKey, collectFromStores())
    useFavouritesStore().rememberVisibleChains(useAccountsStore().accounts)
  }

  async function registerPasskey(displayName: string): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    const { credentialId, prfSalt, prfSecret } = await registerLocalPasskeyWithPrf(displayName)
    await addPasskeyWrap(sessionKey, credentialId, prfSalt, prfSecret)
    hasPasskey.value = true
  }

  /** Warn the caller before calling this if it would leave the vault with no fast-unlock method. */
  async function removePasskey(): Promise<void> {
    await removeWrap('passkeyPrf')
    await db.localWebAuthnCredential.delete('default')
    hasPasskey.value = false
  }

  async function backupToDrive(): Promise<void> {
    const blob = await exportEncryptedVaultBlob()
    await backupToGoogleDrive(blob)
    await recordBackup()
    lastBackupAt.value = Date.now()
  }

  // Only the recovery-phrase wrap travels with a backup (see crypto/vault.ts) —
  // any passkey set up on THIS device no longer matches the restored vault, so
  // clear that local state too rather than leave it dangling.
  // The cache goes too: anything private in it is encrypted under the
  // previous vault's key, and the rest (favourites included) belonged to
  // whichever wallet was here before.
  async function clearLocalFastUnlockState(): Promise<void> {
    await db.localWebAuthnCredential.delete('default')
    await clearCache()
    useFavouritesStore().forget()
  }

  async function restoreFromDrive(): Promise<void> {
    const blob = await restoreFromGoogleDrive()
    await importEncryptedVaultBlob(blob)
    await clearLocalFastUnlockState()
    await refreshFlags()
    lock()
  }

  async function backupToFile(): Promise<void> {
    const blob = await exportEncryptedVaultBlob()
    downloadEncryptedVaultBlob(blob)
    await recordBackup()
    lastBackupAt.value = Date.now()
  }

  async function restoreFromFile(file: File): Promise<void> {
    await importEncryptedVaultBlob(file)
    await clearLocalFastUnlockState()
    await refreshFlags()
    lock()
  }

  return {
    isUnlocked,
    hasVault,
    hasPasskey,
    lastBackupAt,
    createdAt,
    createVault,
    unlockWithMnemonic,
    unlockWithPasskey,
    lock,
    deleteFromDevice,
    persist,
    registerPasskey,
    removePasskey,
    backupToDrive,
    restoreFromDrive,
    backupToFile,
    restoreFromFile,
  }
})
