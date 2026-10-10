import { defineStore } from 'pinia'
import { ref } from 'vue'

import { i18n } from '@/i18n'
import {
  addPasskeyWrap,
  addPasswordWrap,
  availableUnlockMethods,
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
  unlockWithPassword as unlockWithPasswordRecord,
  type VaultData,
} from '@/crypto/vault'
import {
  hasLocalPasskey,
  registerLocalPasskeyWithPrf,
  unlockPasskeyPrfSecret,
  type PasskeyLocation,
} from '@/services/webauthnLocal'
import { backupToGoogleDrive, restoreFromGoogleDrive } from '@/services/googleDrive'
import { downloadEncryptedVaultBlob } from '@/services/fileBackup'
import { db } from '@/services/db'
import { DEFAULT_FAVOURITES_CARD, useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { isSupportedLocale } from '@/i18n'
import { useChainDataStore } from '@/stores/chainData'
import { useFavouritesStore } from '@/stores/favourites'
import { useNftsStore } from '@/stores/nfts'
import { useMessagesStore } from '@/stores/messages'
import { clearCache, exportCacheForBackup, lockCache, stageCacheRestore, unlockCache, type BackupCacheSection } from '@/services/secureCache'
import { requestStrongPasskeyNudge, resetPasskeyNudge } from '@/composables/usePasskeyNudge'
import { DEFAULT_TRANSACTION_BATCH_SIZE } from '@/config/appSettings'

function emptyVaultData(): VaultData {
  return {
    wallets: [],
    payees: [],
    // The locale already showing (detected or picked pre-auth), so creating a
    // vault doesn't flip the UI back to English via loadIntoStores.
    settings: { locale: useSettingsLocaleStore().locale, currency: 'USD', transactionBatchSize: DEFAULT_TRANSACTION_BATCH_SIZE },
  }
}

export const useVaultStore = defineStore('vault', () => {
  const isUnlocked = ref(false)
  const hasVault = ref(false)
  const hasPasskey = ref(false)
  const hasPassword = ref(false)
  const lastBackupAt = ref<number | null>(null)
  const createdAt = ref<number | null>(null)

  // Held only in memory for the unlocked session — never persisted.
  let sessionKey: CryptoKey | null = null
  // The vault's contents as last loaded, so saving keeps whatever this
  // version of the app doesn't know about — a field a newer version added
  // mustn't vanish because a stale copy of the app saved over it.
  let loadedData: VaultData | null = null

  async function refreshFlags() {
    hasVault.value = await hasVaultRecord()
    hasPasskey.value = await hasLocalPasskey()
    hasPassword.value = (await availableUnlockMethods()).includes('password')
    lastBackupAt.value = await getLastBackupAt()
    createdAt.value = await getCreatedAt()
  }
  refreshFlags()

  function loadIntoStores(data: VaultData) {
    loadedData = data
    useAccountsStore().accounts = data.wallets
    useAccountsStore().favouritesCard = data.settings.favouritesCard ?? { ...DEFAULT_FAVOURITES_CARD }
    usePayeesStore().payees = data.payees
    const settings = useSettingsLocaleStore()
    if (isSupportedLocale(data.settings.locale)) settings.applyLocale(data.settings.locale)
    settings.currency = data.settings.currency
    useChainDataStore().transactionBatchSize = data.settings.transactionBatchSize ?? DEFAULT_TRANSACTION_BATCH_SIZE
    useFavouritesStore().rememberVisibleChains(data.wallets)
    useNftsStore().loadVisibility(data.nftVisibility)
  }

  function collectFromStores(): VaultData {
    return {
      ...loadedData,
      wallets: useAccountsStore().accounts,
      payees: usePayeesStore().payees,
      nftVisibility: useNftsStore().visibility(),
      settings: {
        ...loadedData?.settings,
        locale: useSettingsLocaleStore().locale,
        currency: useSettingsLocaleStore().currency,
        transactionBatchSize: useChainDataStore().transactionBatchSize,
        favouritesCard: useAccountsStore().favouritesCard,
      },
    }
  }

  // A restored backup's cache goes back in place on the first unlock after
  // the restore (see secureCache's stageCacheRestore) — anything already
  // read from the old one is then stale.
  async function openCache(key: CryptoKey): Promise<void> {
    if (await unlockCache(key)) {
      useChainDataStore().resetHydration()
      useNftsStore().clearPersonalData()
      useFavouritesStore().forget()
    }
  }

  async function createVault(recoveryMnemonic: string): Promise<void> {
    const data = emptyVaultData()
    sessionKey = await createVaultRecord(recoveryMnemonic, data)
    await openCache(sessionKey)
    loadIntoStores(data)
    isUnlocked.value = true
    hasVault.value = true
    createdAt.value = Date.now()
  }

  async function unlockWithMnemonic(recoveryMnemonic: string): Promise<void> {
    const { key, data } = await unlockWithMnemonicRecord(recoveryMnemonic)
    sessionKey = key
    await openCache(key)
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPassword(password: string): Promise<void> {
    const { key, data } = await unlockWithPasswordRecord(password)
    sessionKey = key
    await openCache(key)
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPasskey(): Promise<void> {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error(i18n.global.t('errors.passkeyNotSetUp'))
    const prfSecret = await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    const { key, data } = await unlockWithPasskeyRecord(prfSecret)
    sessionKey = key
    await openCache(key)
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
    useAccountsStore().favouritesCard = { ...DEFAULT_FAVOURITES_CARD }
    usePayeesStore().payees = []
    lockCache()
    useChainDataStore().clearPersonalData()
    useNftsStore().clearPersonalData()
    useMessagesStore().messages = []
    loadedData = null
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
    resetPasskeyNudge()
    sessionKey = null
    isUnlocked.value = false
    hasVault.value = false
    hasPasskey.value = false
    hasPassword.value = false
    lastBackupAt.value = null
    createdAt.value = null
    clearStores()
  }

  async function persist(): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    await saveVaultRecord(sessionKey, collectFromStores())
    useFavouritesStore().rememberVisibleChains(useAccountsStore().accounts)
  }

  async function registerPasskey(displayName: string, where?: PasskeyLocation): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    const { credentialId, prfSalt, prfSecret } = await registerLocalPasskeyWithPrf(displayName, where)
    await addPasskeyWrap(sessionKey, credentialId, prfSalt, prfSecret)
    hasPasskey.value = true
  }

  /** Quick unlock where a passkey isn't possible — see crypto/vault.ts's addPasswordWrap. */
  async function setUnlockPassword(password: string): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    await addPasswordWrap(sessionKey, password)
    hasPassword.value = true
  }

  async function removeUnlockPassword(): Promise<void> {
    await removeWrap('password')
    hasPassword.value = false
  }

  /** Warn the caller before calling this if it would leave the vault with no fast-unlock method. */
  async function removePasskey(): Promise<void> {
    await removeWrap('passkeyPrf')
    await db.localWebAuthnCredential.delete('default')
    hasPasskey.value = false
  }

  // Everything but the passkey (per device): the vault, plus the whole cache
  // when unlocked, so a restore shows everything straight away instead of
  // refetching it all.
  async function backupBlob(): Promise<Blob> {
    const cache = sessionKey ? await exportCacheForBackup(sessionKey) : null
    return exportEncryptedVaultBlob(cache)
  }

  async function backupToDrive(): Promise<void> {
    const blob = await backupBlob()
    await backupToGoogleDrive(blob)
    await recordBackup()
    lastBackupAt.value = Date.now()
  }

  // Only the recovery-phrase wrap travels with a backup (see crypto/vault.ts) —
  // any passkey set up on THIS device no longer matches the restored vault, so
  // clear that local state too rather than leave it dangling, and ask for a
  // new one once unlocked.
  // The device's cache is replaced by the backup's (applied at the next
  // unlock), or simply cleared for a backup without one: what's there now
  // belonged to whichever wallet was here before.
  async function replaceLocalState(cache: BackupCacheSection | null): Promise<void> {
    await db.localWebAuthnCredential.delete('default')
    if (cache) await stageCacheRestore(cache)
    else await clearCache()
    useFavouritesStore().forget()
    requestStrongPasskeyNudge()
  }

  async function restoreFromDrive(): Promise<void> {
    const blob = await restoreFromGoogleDrive()
    const { cache } = await importEncryptedVaultBlob(blob)
    await replaceLocalState(cache)
    await refreshFlags()
    lock()
  }

  async function backupToFile(): Promise<void> {
    const blob = await backupBlob()
    downloadEncryptedVaultBlob(blob)
    await recordBackup()
    lastBackupAt.value = Date.now()
  }

  async function restoreFromFile(file: File): Promise<void> {
    const { cache } = await importEncryptedVaultBlob(file)
    await replaceLocalState(cache)
    await refreshFlags()
    lock()
  }

  return {
    isUnlocked,
    hasVault,
    hasPasskey,
    hasPassword,
    lastBackupAt,
    createdAt,
    createVault,
    unlockWithMnemonic,
    unlockWithPasskey,
    lock,
    deleteFromDevice,
    persist,
    registerPasskey,
    setUnlockPassword,
    removeUnlockPassword,
    unlockWithPassword,
    removePasskey,
    backupToDrive,
    restoreFromDrive,
    backupToFile,
    restoreFromFile,
  }
})
