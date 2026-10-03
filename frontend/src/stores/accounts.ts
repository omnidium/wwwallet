import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChainSlug } from '@/services/api'
import { useVaultStore } from '@/stores/vault'
import { requestStrongPasskeyNudge } from '@/composables/usePasskeyNudge'
import type { FavouritesCardLayout } from '@/crypto/vault'

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
  /**
   * Found automatically rather than added: the same key's address on another
   * chain, picked up because it holds something or has history there (see
   * composables/useChainDiscovery.ts). Shown in its original's carousel,
   * shares its label, and is never a chain's default.
   */
  discovered?: boolean
}

/** What createWallet/importFrom* produce, before the store assigns default/visibility. */
export type NewWalletAccount = Omit<WalletAccount, 'isDefault' | 'visible'>

export const DEFAULT_FAVOURITES_CARD: FavouritesCardLayout = { position: null, visible: true }

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<WalletAccount[]>([])
  // The Favourites card is laid out, hidden and shown like an account card,
  // so its place in that list lives (encrypted) alongside the accounts'.
  const favouritesCard = ref<FavouritesCardLayout>({ ...DEFAULT_FAVOURITES_CARD })

  async function addAccount(account: NewWalletAccount): Promise<void> {
    const isFirstForChain = !accounts.value.some((a) => a.chain === account.chain)
    accounts.value.push({ ...account, isDefault: isFirstForChain, visible: true })
    const vault = useVaultStore()
    await vault.persist()
    // A new account is more to lose to a mistyped or exposed recovery phrase.
    if (!vault.hasPasskey) requestStrongPasskeyNudge()
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

  /** Every chain's copy of an address shares one label, so this renames them all. */
  async function rename(_chain: ChainSlug, address: string, label: string): Promise<void> {
    for (const a of accounts.value) {
      if (a.address.toLowerCase() === address.toLowerCase()) a.label = label
    }
    await useVaultStore().persist()
  }

  /** Adds `source`'s address on another chain — same key, same label, never that chain's default. */
  async function addDiscovered(source: WalletAccount, chain: ChainSlug): Promise<void> {
    if (findAccount(chain, source.address)) return
    accounts.value.push({ ...source, chain, isDefault: false, visible: true, discovered: true })
    await useVaultStore().persist()
  }

  async function removeDiscovered(chain: ChainSlug, address: string): Promise<void> {
    const account = findAccount(chain, address)
    if (!account?.discovered) return
    accounts.value = accounts.value.filter((a) => a !== account)
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

  async function setFavouritesCardVisible(visible: boolean): Promise<void> {
    favouritesCard.value = { ...favouritesCard.value, visible }
    await useVaultStore().persist()
  }

  /**
   * Persists a new order for the visible accounts, given as the order of
   * their addresses — the accounts screen lays out one card (or carousel)
   * per address, so each address's chains move together, keeping their own
   * relative order. Hidden accounts keep their existing array slot, so
   * re-showing one doesn't relocate it to wherever the visible list happened
   * to end. No separate order field: the array's own order is the order.
   *
   * `favouritesPosition`: the Favourites card's new index among the visible
   * cards, when it's among them.
   */
  async function reorderVisible(addressOrder: string[], favouritesPosition?: number): Promise<void> {
    if (favouritesPosition !== undefined) {
      // Last place stays "after the last account", so newly added accounts
      // still land above it rather than below.
      const position = favouritesPosition >= addressOrder.length ? null : favouritesPosition
      favouritesCard.value = { ...favouritesCard.value, position }
    }
    const rank = new Map(addressOrder.map((address, i) => [address.toLowerCase(), i]))
    const visibleInOrder = accounts.value
      .map((account, i) => ({ account, i }))
      .filter(({ account }) => account.visible)
      .sort((a, b) =>
        (rank.get(a.account.address.toLowerCase()) ?? Infinity) - (rank.get(b.account.address.toLowerCase()) ?? Infinity) ||
        a.i - b.i,
      )
      .map(({ account }) => account)
    let i = 0
    accounts.value = accounts.value.map((a) => (a.visible ? (visibleInOrder[i++] ?? a) : a))
    await useVaultStore().persist()
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    findAccount,
    rename,
    addDiscovered,
    removeDiscovered,
    setVisibility,
    promoteToDefault,
    reorderVisible,
    favouritesCard,
    setFavouritesCardVisible,
  }
})
