import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Unlock state for the client-side encrypted vault (wallets, payees, settings,
 * TOTP secret — see services/db.ts). The real Argon2id/AES-GCM key derivation,
 * local WebAuthn verification, and Google Drive backup/restore are Phase 3 work
 * and deliberately not implemented here yet — this store only holds the shape
 * the rest of the app is wired against so UI work isn't blocked on it.
 */
export const useVaultStore = defineStore('vault', () => {
  const isUnlocked = ref(false)
  const hasVault = ref(false)

  async function unlock(_passphrase: string): Promise<void> {
    throw new Error('vault unlock not yet implemented (Phase 3)')
  }

  function lock() {
    isUnlocked.value = false
  }

  return { isUnlocked, hasVault, unlock, lock }
})
