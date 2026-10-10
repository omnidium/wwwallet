import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { api, type ChainSlug, type Nft, type NftCollection, type NftTransfer } from '@/services/api'
import { getPrivate, isCacheUnlocked, putPrivate } from '@/services/secureCache'
import { NFT_REFRESH_MS } from '@/config/appSettings'
import { useVaultStore } from '@/stores/vault'

// Cached like chainData's personal data (encrypted, see
// services/secureCache.ts), but read entry by entry when first needed rather
// than all at unlock: most sessions never open an NFT gallery.
const COLLECTIONS_PREFIX = 'nft-collections:'
const NFTS_PREFIX = 'nfts:'
// One NFT's transfers to and from an account, keyed `${keyFor}:${contract}:${tokenId}`.
const TRANSFERS_PREFIX = 'nft-transfers:'

/**
 * The user's own calls on what to show, overriding the spam guess: keys are
 * `chain:contract` for a whole collection and `chain:contract:tokenId` for
 * one NFT, and apply on every account. Kept in the vault — see
 * stores/vault.ts.
 */
export interface NftVisibility {
  hidden: string[]
  /** Collections taken for spam that the user wants shown anyway. */
  shown: string[]
}

/** As much of a paged list as has been fetched. */
export interface Paged<T> {
  items: T[]
  /** Fetches the next page; null once there's nothing more. */
  nextPageKey: string | null
  /** When the first page was fetched. */
  fetchedAt: number
}

export function collectionKey(chain: ChainSlug, contract: string): string {
  return `${chain}:${contract.toLowerCase()}`
}

export function nftKey(chain: ChainSlug, contract: string, tokenId: string): string {
  return `${collectionKey(chain, contract)}:${tokenId}`
}

/**
 * Spam airdrops land on every active address, often with a lure for a name
 * ("Claim your reward at…"). Trusts the provider's verdict where it gives
 * one; where it doesn't classify the chain at all, a collection with neither
 * a name nor a picture is taken for spam.
 */
export function looksLikeSpam(collection: NftCollection): boolean {
  if (collection.is_spam !== null) return collection.is_spam
  return !collection.name && !collection.image.thumbnail
}

export const useNftsStore = defineStore('nfts', () => {
  // Keyed by chainData's keyFor (chain:address).
  const collectionsByAccount = ref<Record<string, Paged<NftCollection>>>({})
  // Keyed by `${keyFor}:${contract}`.
  const nftsByCollection = ref<Record<string, Paged<Nft>>>({})
  const transfersByNft = ref<Record<string, NftTransfer[]>>({})
  const hidden = ref(new Set<string>())
  const shown = ref(new Set<string>())
  const loadingKeys = ref(new Set<string>())
  // Not refs: bookkeeping, never read reactively.
  const lookedUp = new Set<string>()
  const inFlight = new Map<string, Promise<void>>()
  // Transfer lists fetched this session: shown from the cache after that.
  const transfersFetched = new Set<string>()

  function accountKey(chain: ChainSlug, address: string): string {
    return `${chain}:${address.toLowerCase()}`
  }

  function holdingKey(chain: ChainSlug, address: string, contract: string): string {
    return `${accountKey(chain, address)}:${contract.toLowerCase()}`
  }

  /** Puts a cached entry in memory, once per unlock — unless something fresher is already there. */
  async function readCached<T>(record: Ref<Record<string, T>>, prefix: string, key: string): Promise<void> {
    if (!isCacheUnlocked() || lookedUp.has(prefix + key)) return
    lookedUp.add(prefix + key)
    const cached = await getPrivate<T>(prefix + key).catch(() => undefined)
    if (cached !== undefined && isCacheUnlocked()) record.value[key] ??= cached
  }

  /** In memory and in the encrypted cache — or neither once locked, like chainData's. */
  function remember<T>(record: Ref<Record<string, T>>, prefix: string, key: string, value: T) {
    if (!isCacheUnlocked()) return
    record.value[key] = value
    putPrivate(prefix + key, value).catch((err) => console.warn(`Failed to cache ${prefix}${key}`, err))
  }

  /** One load per key at a time; a second caller shares the first's. */
  function once(key: string, load: () => Promise<void>): Promise<void> {
    const running = inFlight.get(key)
    if (running) return running
    loadingKeys.value.add(key)
    const promise = load().finally(() => {
      inFlight.delete(key)
      loadingKeys.value.delete(key)
    })
    inFlight.set(key, promise)
    return promise
  }

  /**
   * Fetches a paged list's first page, replacing what's held (later pages go
   * with it: they'd be stale), or with `more`, appends its next page.
   */
  async function loadPaged<T>(
    record: Ref<Record<string, Paged<T>>>,
    prefix: string,
    key: string,
    fetchPage: (pageKey: string | null) => Promise<{ items: T[]; nextPageKey: string | null }>,
    identity: (item: T) => string,
    more: boolean,
  ): Promise<void> {
    await readCached(record, prefix, key)
    const current = record.value[key]
    if (more && !current?.nextPageKey) return
    const page = await fetchPage(more ? current!.nextPageKey : null)
    if (more && current) {
      const seen = new Set(current.items.map(identity))
      const items = [...current.items, ...page.items.filter((item) => !seen.has(identity(item)))]
      remember(record, prefix, key, { ...current, items, nextPageKey: page.nextPageKey })
    } else {
      remember(record, prefix, key, { items: page.items, nextPageKey: page.nextPageKey, fetchedAt: Date.now() })
    }
  }

  function loadCollections(chain: ChainSlug, address: string, { more = false } = {}): Promise<void> {
    const key = accountKey(chain, address)
    return once(`collections:${key}:${more}`, () =>
      loadPaged(
        collectionsByAccount,
        COLLECTIONS_PREFIX,
        key,
        async (pageKey) => {
          const page = await api.nftCollections(chain, address, pageKey)
          return { items: page.collections, nextPageKey: page.next_page_key }
        },
        (c) => c.contract_address,
        more,
      ),
    )
  }

  function loadNfts(chain: ChainSlug, address: string, contract: string, { more = false } = {}): Promise<void> {
    const key = holdingKey(chain, address, contract)
    return once(`nfts:${key}:${more}`, () =>
      loadPaged(
        nftsByCollection,
        NFTS_PREFIX,
        key,
        async (pageKey) => {
          const page = await api.nfts(chain, address, contract, pageKey)
          return { items: page.nfts, nextPageKey: page.next_page_key }
        },
        (n) => n.token_id,
        more,
      ),
    )
  }

  /**
   * One NFT's history on an account: the cached list straight away, then
   * fetched once a session — a token rarely moves, and each lookup is two
   * calls the backend pays for.
   */
  async function ensureTransfers(chain: ChainSlug, address: string, contract: string, tokenId: string): Promise<void> {
    const key = `${holdingKey(chain, address, contract)}:${tokenId}`
    await readCached(transfersByNft, TRANSFERS_PREFIX, key)
    if (transfersFetched.has(key)) return
    await once(`transfers:${key}`, async () => {
      const transfers = await api.nftTransfers(chain, address, contract, `0x${BigInt(tokenId).toString(16)}`)
      transfersFetched.add(key)
      remember(transfersByNft, TRANSFERS_PREFIX, key, transfers)
    })
  }

  function transfersOf(chain: ChainSlug, address: string, contract: string, tokenId: string): NftTransfer[] | undefined {
    return transfersByNft.value[`${holdingKey(chain, address, contract)}:${tokenId}`]
  }

  function isLoadingTransfers(chain: ChainSlug, address: string, contract: string, tokenId: string): boolean {
    return loadingKeys.value.has(`transfers:${holdingKey(chain, address, contract)}:${tokenId}`)
  }

  /** Brings what's cached for an account's collections into memory, without fetching. */
  function readCachedCollections(chain: ChainSlug, address: string): Promise<void> {
    return readCached(collectionsByAccount, COLLECTIONS_PREFIX, accountKey(chain, address))
  }

  function collectionsOf(chain: ChainSlug, address: string): Paged<NftCollection> | undefined {
    return collectionsByAccount.value[accountKey(chain, address)]
  }

  function nftsOf(chain: ChainSlug, address: string, contract: string): Paged<Nft> | undefined {
    return nftsByCollection.value[holdingKey(chain, address, contract)]
  }

  function isLoadingCollections(chain: ChainSlug, address: string, { more = false } = {}): boolean {
    return loadingKeys.value.has(`collections:${accountKey(chain, address)}:${more}`)
  }

  function isLoadingNfts(chain: ChainSlug, address: string, contract: string, { more = false } = {}): boolean {
    return loadingKeys.value.has(`nfts:${holdingKey(chain, address, contract)}:${more}`)
  }

  /**
   * How many NFTs the account shows (hidden collections left out), or null
   * before its NFTs have ever been looked at. `more` when not every page has
   * been fetched, so the count is a lower bound.
   */
  function visibleCount(chain: ChainSlug, address: string): { count: number; more: boolean } | null {
    const collections = collectionsOf(chain, address)
    if (!collections) return null
    const count = collections.items
      .filter((c) => !isCollectionHidden(chain, c))
      .reduce((sum, c) => sum + c.owned_count, 0)
    return { count, more: collections.nextPageKey !== null }
  }

  /**
   * Re-fetches an account's collections if it's known to hold NFTs and
   * hasn't been checked in NFT_REFRESH_MS — never one it isn't known to,
   * which waits until its NFTs are opened.
   */
  async function refreshIfStale(chain: ChainSlug, address: string): Promise<void> {
    await readCachedCollections(chain, address)
    const collections = collectionsOf(chain, address)
    if (!collections || collections.items.length === 0) return
    if (Date.now() - collections.fetchedAt < NFT_REFRESH_MS) return
    await loadCollections(chain, address)
  }

  function isCollectionHidden(chain: ChainSlug, collection: NftCollection): boolean {
    const key = collectionKey(chain, collection.contract_address)
    if (hidden.value.has(key)) return true
    if (shown.value.has(key)) return false
    return looksLikeSpam(collection)
  }

  function isNftHidden(chain: ChainSlug, nft: Nft): boolean {
    return hidden.value.has(nftKey(chain, nft.contract_address, nft.token_id))
  }

  /** Hiding a collection hides it everywhere; showing one taken for spam overrides the guess. */
  function setCollectionHidden(chain: ChainSlug, collection: NftCollection, hide: boolean): Promise<void> {
    const key = collectionKey(chain, collection.contract_address)
    if (hide) {
      hidden.value.add(key)
      shown.value.delete(key)
    } else {
      hidden.value.delete(key)
      if (looksLikeSpam(collection)) shown.value.add(key)
    }
    return useVaultStore().persist()
  }

  function setNftHidden(chain: ChainSlug, nft: Nft, hide: boolean): Promise<void> {
    const key = nftKey(chain, nft.contract_address, nft.token_id)
    if (hide) hidden.value.add(key)
    else hidden.value.delete(key)
    return useVaultStore().persist()
  }

  /** From the vault, at unlock. */
  function loadVisibility(visibility: NftVisibility | undefined) {
    hidden.value = new Set(visibility?.hidden ?? [])
    shown.value = new Set(visibility?.shown ?? [])
  }

  /** For the vault, when it's saved. */
  function visibility(): NftVisibility {
    return { hidden: [...hidden.value], shown: [...shown.value] }
  }

  /** Called on lock, and when a restored backup's cache replaces this one — see stores/vault.ts. */
  function clearPersonalData() {
    collectionsByAccount.value = {}
    nftsByCollection.value = {}
    transfersByNft.value = {}
    transfersFetched.clear()
    hidden.value = new Set()
    shown.value = new Set()
    loadingKeys.value = new Set()
    lookedUp.clear()
    inFlight.clear()
  }

  return {
    collectionsByAccount,
    nftsByCollection,
    loadCollections,
    loadNfts,
    ensureTransfers,
    transfersOf,
    isLoadingTransfers,
    readCachedCollections,
    collectionsOf,
    nftsOf,
    isLoadingCollections,
    isLoadingNfts,
    visibleCount,
    refreshIfStale,
    isCollectionHidden,
    isNftHidden,
    setCollectionHidden,
    setNftHidden,
    loadVisibility,
    visibility,
    clearPersonalData,
  }
})
