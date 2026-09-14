import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChainSlug } from '@/services/api'
import { useVaultStore } from '@/stores/vault'

export interface WalletAccount {
  address: string
  label: string
  chain: ChainSlug
  /** Raw hex private key — lives only inside the encrypted vault blob, never sent to the backend. */
  privateKey: string
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<WalletAccount[]>([])

  async function addAccount(account: WalletAccount): Promise<void> {
    accounts.value.push(account)
    await useVaultStore().persist()
  }

  async function removeAccount(address: string): Promise<void> {
    accounts.value = accounts.value.filter((a) => a.address.toLowerCase() !== address.toLowerCase())
    await useVaultStore().persist()
  }

  function findAccount(chain: ChainSlug, address: string): WalletAccount | undefined {
    return accounts.value.find(
      (a) => a.chain === chain && a.address.toLowerCase() === address.toLowerCase(),
    )
  }

  return { accounts, addAccount, removeAccount, findAccount }
})
