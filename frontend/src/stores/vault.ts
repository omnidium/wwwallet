import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  addPasskeyWrap,
  addTotpWrap,
  availableUnlockMethods,
  createVault as createVaultRecord,
  exportEncryptedVaultBlob,
  hasVault as hasVaultRecord,
  importEncryptedVaultBlob,
  passkeyWrapMeta,
  removeWrap,
  saveVault as saveVaultRecord,
  unlockWithPasskey as unlockWithPasskeyRecord,
  unlockWithPassphrase as unlockWithPassphraseRecord,
  unlockWithTotp as unlockWithTotpRecord,
  type VaultData,
} from '@/crypto/vault'
import {
  hasLocalPasskey,
  registerLocalPasskeyWithPrf,
  unlockPasskeyPrfSecret,
} from '@/services/webauthnLocal'
import { generateTotpSecret, totpProvisioningUri, verifyTotpCode } from '@/services/totp'
import { backupToGoogleDrive, restoreFromGoogleDrive } from '@/services/googleDrive'
import { downloadEncryptedVaultBlob } from '@/services/fileBackup'
import { db } from '@/services/db'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'

const TOTP_FACTOR_ID = 'default' as const

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
  // Set during TOTP enrollment, before the user confirms a code.
  let pendingTotpSecret: string | undefined

  async function refreshFlags() {
    hasVault.value = await hasVaultRecord()
    hasPasskey.value = await hasLocalPasskey()
    totpEnabled.value = (await availableUnlockMethods()).includes('totp')
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

  async function createVault(passphrase: string): Promise<void> {
    const data = emptyVaultData()
    sessionKey = await createVaultRecord(passphrase, data)
    loadIntoStores(data)
    isUnlocked.value = true
    hasVault.value = true
  }

  async function unlockWithPassphrase(passphrase: string): Promise<void> {
    const { key, data } = await unlockWithPassphraseRecord(passphrase)
    sessionKey = key
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithPasskey(): Promise<void> {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error('Passkey is not set up for this vault.')
    const prfSecret = await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    const { key, data } = await unlockWithPasskeyRecord(prfSecret)
    sessionKey = key
    loadIntoStores(data)
    isUnlocked.value = true
  }

  async function unlockWithTotp(code: string): Promise<void> {
    const factor = await db.totpFactor.get(TOTP_FACTOR_ID)
    if (!factor) throw new Error('Authenticator app is not set up for this vault.')
    if (!verifyTotpCode(factor.secretBase32, code)) throw new Error('Incorrect code.')
    const { key, data } = await unlockWithTotpRecord(factor.secretBase32)
    sessionKey = key
    loadIntoStores(data)
    isUnlocked.value = true
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
    if (!sessionKey) throw new Error('vault is locked')
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

  function enrollTotp(): { secret: string; provisioningUri: string } {
    const secret = generateTotpSecret()
    pendingTotpSecret = secret
    return { secret, provisioningUri: totpProvisioningUri(secret, 'wwwallet') }
  }

  async function confirmTotpEnrollment(code: string): Promise<boolean> {
    if (!pendingTotpSecret || !sessionKey) return false
    const ok = verifyTotpCode(pendingTotpSecret, code)
    if (ok) {
      await db.totpFactor.put({ id: TOTP_FACTOR_ID, secretBase32: pendingTotpSecret })
      await addTotpWrap(sessionKey, pendingTotpSecret)
      totpEnabled.value = true
      pendingTotpSecret = undefined
    }
    return ok
  }

  /** Warn the caller before calling this if it would leave the vault with no fast-unlock method. */
  async function disableTotp(): Promise<void> {
    await removeWrap('totp')
    await db.totpFactor.delete(TOTP_FACTOR_ID)
    totpEnabled.value = false
  }

  async function backupToDrive(): Promise<void> {
    const blob = await exportEncryptedVaultBlob()
    await backupToGoogleDrive(blob)
  }

  // Only the passphrase travels with a backup (see crypto/vault.ts) — any
  // passkey/TOTP set up on THIS device no longer matches the restored vault,
  // so clear that local state too rather than leave it dangling.
  async function clearLocalFastUnlockState(): Promise<void> {
    await db.localWebAuthnCredential.delete('default')
    await db.totpFactor.delete(TOTP_FACTOR_ID)
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
    totpEnabled,
    createVault,
    unlockWithPassphrase,
    unlockWithPasskey,
    unlockWithTotp,
    lock,
    persist,
    registerPasskey,
    removePasskey,
    enrollTotp,
    confirmTotpEnrollment,
    disableTotp,
    backupToDrive,
    restoreFromDrive,
    backupToFile,
    restoreFromFile,
  }
})
