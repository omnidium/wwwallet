import { defineStore } from 'pinia'
import { ref } from 'vue'

import { i18n } from '@/i18n'
import {
  addPasskeyWrap,
  createVault as createVaultRecord,
  exportEncryptedVaultBlob,
  hasVault as hasVaultRecord,
  importEncryptedVaultBlob,
  passkeyWrapMeta,
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

function emptyVaultData(): VaultData {
  return { wallets: [], payees: [], settings: { locale: 'en', currency: 'USD' } }
}

export const useVaultStore = defineStore('vault', () => {
  const isUnlocked = ref(false)
  const hasVault = ref(false)
  const hasPasskey = ref(false)

  // Held only in memory for the unlocked session — never persisted.
  let sessionKey: CryptoKey | null = null

  async function refreshFlags() {
    hasVault.value = await hasVaultRecord()
    hasPasskey.value = await hasLocalPasskey()
  }
  refreshFlags()

  function loadIntoStores(data: VaultData) {
    useAccountsStore().accounts = data.wallets
    usePayeesStore().payees = data.payees
    const settings = useSettingsLocaleStore()
    settings.locale = data.settings.locale
    settings.currency = data.settings.currency
  }

  function collectFromStores(): VaultData {
    return {
      wallets: useAccountsStore().accounts,
      payees: usePayeesStore().payees,
      settings: {
        locale: useSettingsLocaleStore().locale,
        currency: useSettingsLocaleStore().currency,
      },
    }
  }

  async function createVault(recoveryMnemonic: string): Promise<void> {
    const data = emptyVaultData()
    sessionKey = await createVaultRecord(recoveryMnemonic, data)
    loadIntoStores(data)
    isUnlocked.value = true
    hasVault.value = true
  }

  async function unlockWithMnemonic(recoveryMnemonic: string): Promise<void> {
    const { key, data } = await unlockWithMnemonicRecord(recoveryMnemonic)
    sessionKey = key
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPasskey(): Promise<void> {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error(i18n.global.t('errors.passkeyNotSetUp'))
    const prfSecret = await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    const { key, data } = await unlockWithPasskeyRecord(prfSecret)
    sessionKey = key
    loadIntoStores(data)
    isUnlocked.value = true
  }

  // Wipes decrypted wallet data (private keys included) out of the other
  // Pinia stores. Locking only ever cleared `sessionKey` and `isUnlocked`
  // before this — the accounts/payees data loaded by `loadIntoStores` stayed
  // sitting in memory (reachable via Vue devtools, or any injected script)
  // even after the vault was "locked" and the UI had moved to the unlock screen.
  function clearStores(): void {
    useAccountsStore().accounts = []
    usePayeesStore().payees = []
  }

  function lock(): void {
    sessionKey = null
    isUnlocked.value = false
    clearStores()
  }

  async function persist(): Promise<void> {
    if (!sessionKey) throw new Error(i18n.global.t('errors.vaultLocked'))
    await saveVaultRecord(sessionKey, collectFromStores())
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
  }

  // Only the recovery-phrase wrap travels with a backup (see crypto/vault.ts) —
  // any passkey set up on THIS device no longer matches the restored vault, so
  // clear that local state too rather than leave it dangling.
  async function clearLocalFastUnlockState(): Promise<void> {
    await db.localWebAuthnCredential.delete('default')
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
    createVault,
    unlockWithMnemonic,
    unlockWithPasskey,
    lock,
    persist,
    registerPasskey,
    removePasskey,
    backupToDrive,
    restoreFromDrive,
    backupToFile,
    restoreFromFile,
  }
})
