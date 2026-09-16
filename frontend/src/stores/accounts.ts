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
  isDefault: boolean
  visible: boolean
  /** False for private-key/keystore imports, which have no originating phrase to show. */
  hasMnemonic: boolean
  /**
   * Only ever set alongside `hasMnemonic: true` — the same encrypted-vault
   * trust tier as `privateKey` above, not a new one. Lets Settings offer
   * "View Mnemonic" for accounts that were created or imported from one.
   */
  mnemonic?: string
}

/** What createWallet/importFrom* produce, before the store assigns default/visibility. */
export type NewWalletAccount = Omit<WalletAccount, 'isDefault' | 'visible'>

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<WalletAccount[]>([])

  async function addAccount(account: NewWalletAccount): Promise<void> {
    const isFirstForChain = !accounts.value.some((a) => a.chain === account.chain)
    accounts.value.push({ ...account, isDefault: isFirstForChain, visible: true })
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

  async function rename(chain: ChainSlug, address: string, label: string): Promise<void> {
    const account = findAccount(chain, address)
    if (account) account.label = label
    await useVaultStore().persist()
  }

  async function setVisibility(chain: ChainSlug, address: string, visible: boolean): Promise<void> {
    const account = findAccount(chain, address)
    if (account) account.visible = visible
    await useVaultStore().persist()
  }

  /** Clears `isDefault` on every other same-chain sibling first, so exactly one default ever exists per chain. */
  async function promoteToDefault(chain: ChainSlug, address: string): Promise<void> {
    for (const a of accounts.value) {
      if (a.chain === chain) a.isDefault = a.address.toLowerCase() === address.toLowerCase()
    }
    await useVaultStore().persist()
  }

  /**
   * Persists a new relative order for the visible subset only — hidden
   * accounts keep their existing array slot, so re-showing one doesn't
   * relocate it to wherever the visible list happened to end. No separate
   * order field: the array's own order is the order.
   */
  async function reorderVisible(newVisibleOrder: WalletAccount[]): Promise<void> {
    let i = 0
    accounts.value = accounts.value.map((a) => {
      if (!a.visible) return a
      const next = newVisibleOrder[i++]
      return next ?? a
    })
    await useVaultStore().persist()
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    findAccount,
    rename,
    setVisibility,
    promoteToDefault,
    reorderVisible,
  }
})
