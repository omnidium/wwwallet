import { beforeEach, describe, expect, it, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { createPinia, setActivePinia } from 'pinia'
import { api, type Nft, type NftCollection } from '@/services/api'
import { importAesKey } from '@/crypto/aesGcm'
import { clearCache, flushCacheWrites, lockCache, unlockCache } from '@/services/secureCache'
import { NFT_REFRESH_MS } from '@/config/appSettings'
import { looksLikeSpam, useNftsStore } from '../nfts'

const persist = vi.fn<() => Promise<void>>()
vi.mock('@/stores/vault', () => ({ useVaultStore: () => ({ persist }) }))

vi.mock('@/services/api', () => ({
  api: {
    nftCollections: vi.fn<typeof api.nftCollections>(),
    nfts: vi.fn<typeof api.nfts>(),
  },
}))
const mockedApi = vi.mocked(api)

const CHAIN = 'base'
const HOLDER = `0x${'a'.repeat(40)}`
const CONTRACT = `0x${'c'.repeat(40)}`

function collection(overrides: Partial<NftCollection> = {}): NftCollection {
  return {
    contract_address: CONTRACT,
    name: 'Collection',
    symbol: 'COL',
    token_type: 'ERC721',
    owned_count: 1,
    is_spam: false,
    verified: false,
    floor_price: null,
    image: { thumbnail: 'https://nft2-cdn.alchemy.com/base-mainnet/x', full: null },
    ...overrides,
  }
}

function nft(tokenId: string): Nft {
  return {
    contract_address: CONTRACT,
    token_id: tokenId,
    token_type: 'ERC721',
    name: `#${tokenId}`,
    description: null,
    balance: '1',
    image: { thumbnail: null, full: null },
    attributes: [],
  }
}

async function unlock() {
  await unlockCache(await importAesKey(crypto.getRandomValues(new Uint8Array(32)), true))
}

describe('nfts store', () => {
  beforeEach(async () => {
    await clearCache()
    await unlock()
    vi.resetAllMocks()
    persist.mockResolvedValue()
    setActivePinia(createPinia())
  })

  describe('what counts as spam', () => {
    it("trusts the provider's verdict where it gives one", () => {
      expect(looksLikeSpam(collection({ is_spam: true }))).toBe(true)
      expect(looksLikeSpam(collection({ is_spam: false, name: null, image: { thumbnail: null, full: null } }))).toBe(false)
    })

    it('takes a nameless, pictureless collection for spam where the chain is unclassified', () => {
      expect(looksLikeSpam(collection({ is_spam: null, name: null, image: { thumbnail: null, full: null } }))).toBe(true)
      expect(looksLikeSpam(collection({ is_spam: null }))).toBe(false)
    })
  })

  describe('hiding', () => {
    it("lets the user override the spam guess either way, and saves it in the vault", async () => {
      const store = useNftsStore()
      const spam = collection({ is_spam: true })
      expect(store.isCollectionHidden(CHAIN, spam)).toBe(true)

      await store.setCollectionHidden(CHAIN, spam, false)
      expect(store.isCollectionHidden(CHAIN, spam)).toBe(false)
      expect(store.visibility()).toEqual({ hidden: [], shown: [`${CHAIN}:${CONTRACT}`] })

      await store.setCollectionHidden(CHAIN, spam, true)
      expect(store.isCollectionHidden(CHAIN, spam)).toBe(true)
      expect(store.visibility()).toEqual({ hidden: [`${CHAIN}:${CONTRACT}`], shown: [] })
      expect(persist).toHaveBeenCalledTimes(2)
    })

    it('hides a collection on every account, and only on its own chain', async () => {
      const store = useNftsStore()
      await store.setCollectionHidden(CHAIN, collection({ contract_address: CONTRACT.toUpperCase() }), true)
      expect(store.isCollectionHidden(CHAIN, collection())).toBe(true)
      expect(store.isCollectionHidden('ethereum', collection())).toBe(false)
    })

    it('hides a single NFT without hiding the rest of its collection', async () => {
      const store = useNftsStore()
      await store.setNftHidden(CHAIN, nft('7'), true)
      expect(store.isNftHidden(CHAIN, nft('7'))).toBe(true)
      expect(store.isNftHidden(CHAIN, nft('8'))).toBe(false)
      expect(store.isCollectionHidden(CHAIN, collection())).toBe(false)
    })

    it('restores what the vault saved', () => {
      const store = useNftsStore()
      store.loadVisibility({ hidden: [`${CHAIN}:${CONTRACT}`], shown: [] })
      expect(store.isCollectionHidden(CHAIN, collection())).toBe(true)
      store.loadVisibility(undefined)
      expect(store.isCollectionHidden(CHAIN, collection())).toBe(false)
    })
  })

  describe('paging', () => {
    it('appends the next page, skipping anything already listed', async () => {
      mockedApi.nfts
        .mockResolvedValueOnce({ nfts: [nft('1'), nft('2')], next_page_key: 'p2' })
        .mockResolvedValueOnce({ nfts: [nft('2'), nft('3')], next_page_key: null })
      const store = useNftsStore()
      await store.loadNfts(CHAIN, HOLDER, CONTRACT)
      await store.loadNfts(CHAIN, HOLDER, CONTRACT, { more: true })
      expect(mockedApi.nfts).toHaveBeenLastCalledWith(CHAIN, HOLDER, CONTRACT, 'p2')
      const page = store.nftsOf(CHAIN, HOLDER, CONTRACT)!
      expect(page.items.map((n) => n.token_id)).toEqual(['1', '2', '3'])
      expect(page.nextPageKey).toBeNull()
    })

    it("doesn't ask for more once the last page is in", async () => {
      mockedApi.nftCollections.mockResolvedValue({ collections: [collection()], next_page_key: null })
      const store = useNftsStore()
      await store.loadCollections(CHAIN, HOLDER)
      await store.loadCollections(CHAIN, HOLDER, { more: true })
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(1)
    })

    it('shares one request between callers asking at once', async () => {
      mockedApi.nftCollections.mockResolvedValue({ collections: [], next_page_key: null })
      const store = useNftsStore()
      await Promise.all([store.loadCollections(CHAIN, HOLDER), store.loadCollections(CHAIN, HOLDER)])
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(1)
    })
  })

  describe('the account card count', () => {
    it("is unknown until the account's NFTs have been looked at", () => {
      expect(useNftsStore().visibleCount(CHAIN, HOLDER)).toBeNull()
    })

    it('counts NFTs in collections that are shown, and says when there are more pages', async () => {
      mockedApi.nftCollections.mockResolvedValue({
        collections: [
          collection({ owned_count: 3 }),
          collection({ contract_address: `0x${'d'.repeat(40)}`, owned_count: 2, is_spam: true }),
        ],
        next_page_key: 'p2',
      })
      const store = useNftsStore()
      await store.loadCollections(CHAIN, HOLDER)
      expect(store.visibleCount(CHAIN, HOLDER)).toEqual({ count: 3, more: true })
    })
  })

  describe('cache', () => {
    it('comes back after a reload without fetching again', async () => {
      mockedApi.nftCollections.mockResolvedValue({ collections: [collection()], next_page_key: null })
      await useNftsStore().loadCollections(CHAIN, HOLDER)
      await flushCacheWrites()

      setActivePinia(createPinia())
      const reloaded = useNftsStore()
      await reloaded.readCachedCollections(CHAIN, HOLDER)
      expect(reloaded.collectionsOf(CHAIN, HOLDER)?.items).toHaveLength(1)
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(1)
    })

    it("re-checks an account known to hold NFTs once it's stale, and never one that holds none", async () => {
      const now = Date.now()
      vi.spyOn(Date, 'now').mockReturnValue(now)
      mockedApi.nftCollections.mockResolvedValueOnce({ collections: [collection()], next_page_key: null })
      const store = useNftsStore()
      await store.loadCollections(CHAIN, HOLDER)
      await store.refreshIfStale(CHAIN, HOLDER)
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(1)

      vi.mocked(Date.now).mockReturnValue(now + NFT_REFRESH_MS + 1)
      mockedApi.nftCollections.mockResolvedValueOnce({ collections: [], next_page_key: null })
      await store.refreshIfStale(CHAIN, HOLDER)
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(2)

      vi.mocked(Date.now).mockReturnValue(now + 3 * NFT_REFRESH_MS)
      await store.refreshIfStale(CHAIN, HOLDER)
      expect(mockedApi.nftCollections).toHaveBeenCalledTimes(2)
      vi.mocked(Date.now).mockRestore()
    })

    it("keeps nothing a fetch brings back after the lock", async () => {
      let finish!: (page: { collections: NftCollection[]; next_page_key: null }) => void
      mockedApi.nftCollections.mockReturnValue(new Promise((resolve) => (finish = resolve)))
      const store = useNftsStore()
      const loading = store.loadCollections(CHAIN, HOLDER)
      await vi.waitFor(() => expect(mockedApi.nftCollections).toHaveBeenCalled())
      lockCache()
      store.clearPersonalData()
      finish({ collections: [collection()], next_page_key: null })
      await loading
      expect(store.collectionsOf(CHAIN, HOLDER)).toBeUndefined()
    })
  })
})
