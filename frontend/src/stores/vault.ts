import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  createVault as createVaultRecord,
  exportEncryptedVaultBlob,
  hasVault as hasVaultRecord,
  importEncryptedVaultBlob,
  saveVault as saveVaultRecord,
  unlockVault as unlockVaultRecord,
  type VaultData,
} from '@/crypto/vault'
import { hasLocalPasskey, registerLocalPasskey, verifyLocalPasskey } from '@/services/webauthnLocal'
import { generateTotpSecret, totpProvisioningUri, verifyTotpCode } from '@/services/totp'
import { backupToGoogleDrive, restoreFromGoogleDrive } from '@/services/googleDrive'
import { downloadEncryptedVaultBlob } from '@/services/fileBackup'
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
  const totpEnabled = ref(false)

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
    totpEnabled.value = !!data.totpSecret
  }

  function collectFromStores(): VaultData {
    return {
      wallets: useAccountsStore().accounts,
      payees: usePayeesStore().payees,
      settings: {
        locale: useSettingsLocaleStore().locale,
        currency: useSettingsLocaleStore().currency,
      },
      totpSecret: currentTotpSecret,
    }
  }

  let currentTotpSecret: string | undefined

  async function createVault(passphrase: string): Promise<void> {
    const data = emptyVaultData()
    sessionKey = await createVaultRecord(passphrase, data)
    loadIntoStores(data)
    isUnlocked.value = true
    hasVault.value = true
  }

  async function unlock(passphrase: string): Promise<void> {
    const { key, data } = await unlockVaultRecord(passphrase)
    sessionKey = key
    currentTotpSecret = data.totpSecret
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPasskey(passphraseFallback: () => Promise<string>): Promise<void> {
    const verified = await verifyLocalPasskey()
    if (!verified) throw new Error('passkey verification failed')
    // The passkey only gates access; the vault itself is still encrypted with
    // the passphrase-derived key, so we still need it to actually decrypt.
    await unlock(await passphraseFallback())
  }

  function lock(): void {
    sessionKey = null
    isUnlocked.value = false
  }

  async function persist(): Promise<void> {
    if (!sessionKey) throw new Error('vault is locked')
    await saveVaultRecord(sessionKey, collectFromStores())
  }

  async function registerPasskey(displayName: string): Promise<void> {
    await registerLocalPasskey(displayName)
    hasPasskey.value = true
  }

  async function enrollTotp(): Promise<{ secret: string; provisioningUri: string }> {
    const secret = generateTotpSecret()
    currentTotpSecret = secret
    const provisioningUri = totpProvisioningUri(secret, 'wwwallet')
    return { secret, provisioningUri }
  }

  async function confirmTotpEnrollment(code: string): Promise<boolean> {
    if (!currentTotpSecret) return false
    const ok = verifyTotpCode(currentTotpSecret, code)
    if (ok) {
      totpEnabled.value = true
      await persist()
    }
    return ok
  }

  function checkTotpCode(code: string): boolean {
    return !!currentTotpSecret && verifyTotpCode(currentTotpSecret, code)
  }

  async function backupToDrive(): Promise<void> {
    const blob = await exportEncryptedVaultBlob()
    await backupToGoogleDrive(blob)
  }

  async function restoreFromDrive(): Promise<void> {
    const blob = await restoreFromGoogleDrive()
    await importEncryptedVaultBlob(blob)
    await refreshFlags()
  }

  async function backupToFile(): Promise<void> {
    const blob = await exportEncryptedVaultBlob()
    downloadEncryptedVaultBlob(blob)
  }

  async function restoreFromFile(file: File): Promise<void> {
    await importEncryptedVaultBlob(file)
    await refreshFlags()
  }

  return {
    isUnlocked,
    hasVault,
    hasPasskey,
    totpEnabled,
    createVault,
    unlock,
    unlockWithPasskey,
    lock,
    persist,
    registerPasskey,
    enrollTotp,
    confirmTotpEnrollment,
    checkTotpCode,
    backupToDrive,
    restoreFromDrive,
    backupToFile,
    restoreFromFile,
  }
})
