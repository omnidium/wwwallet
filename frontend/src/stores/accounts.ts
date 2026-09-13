import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChainSlug } from '@/services/api'

export interface WalletAccount {
  address: string
  label: string
  chain: ChainSlug
  /** ethers v6 encrypted keystore JSON — lives only inside the vault, never sent to the backend. */
  encryptedKeystore: string
}

/**
 * Wallet accounts, sourced from the encrypted vault once unlocked (stores/vault.ts).
 * Create/import/sign operations are Phase 5 work built on `ethers` — this store
 * only holds the in-memory list shape for now.
 */
export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<WalletAccount[]>([])

  return { accounts }
})
