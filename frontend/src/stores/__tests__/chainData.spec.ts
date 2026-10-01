import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { createPinia, setActivePinia } from 'pinia'
import Dexie from 'dexie'
import { api, type AddressActivity, type TokenMetadata, type Transaction } from '@/services/api'
import { importAesKey } from '@/crypto/aesGcm'
import { clearCache, flushCacheWrites, lockCache, privateEntries, unlockCache } from '@/services/secureCache'
import { useChainDataStore } from '../chainData'

vi.mock('@/services/api', () => ({
  api: {
    addressActivity: vi.fn<typeof api.addressActivity>(),
    transactionPage: vi.fn<typeof api.transactionPage>(),
    tokenMetadata: vi.fn<typeof api.tokenMetadata>(),
    tokenList: vi.fn<typeof api.tokenList>(),
    fxRates: vi.fn<typeof api.fxRates>(),
    nativePrice: vi.fn<typeof api.nativePrice>(),
  },
}))
const mockedApi = vi.mocked(api)

const CHAIN = 'ethereum'
const HOLDER = `0x${'a'.repeat(40)}`
const TOKEN = `0x${'b'.repeat(40)}`
const ACTIVITY_KEY = `${CHAIN}:${HOLDER}`
const TOKEN_KEY = `${CHAIN}:${TOKEN}`

function txn(hash: string): Transaction {
  return {
    hash,
    from: HOLDER,
    to: null,
    value: '1',
    asset: 'ETH',
    contract_address: null,
    block_number: null,
    timestamp: null,
    status: 'success',
    counter_asset: null,
    counter_value: null,
    counter_contract_address: null,
  }
}

function activity(hashes: string[], nextCursor: unknown = null): AddressActivity {
  return { balances: [], transactions: hashes.map(txn), next_cursor: nextCursor }
}

function usdc(overrides: Partial<TokenMetadata> = {}): TokenMetadata {
  return { address: TOKEN, name: 'USD Coin', symbol: 'USDC', decimals: 6, logo_url: 'https://logo', usd_price: 1, ...overrides }
}

/** Simulates an app reload: a brand-new store, populated only from IndexedDB. */
async function reloadedStore() {
  await flushCacheWrites()
  setActivePinia(createPinia())
  const store = useChainDataStore()
  await store.hydrate()
  return store
}

/** Cache writes are fire-and-forget, so wait for the one a test depends on to land. */
async function cachedActivityHashes(): Promise<string[]> {
  const entry = (await privateEntries()).find((e) => e.key === `chain-activity:${ACTIVITY_KEY}`)
  return (entry?.data as AddressActivity | undefined)?.transactions.map((t) => t.hash) ?? []
}

async function cachedCount(prefix: string): Promise<number> {
  return (await privateEntries()).filter((e) => e.key.startsWith(prefix)).length
}

/** The cache database exactly as it sits on disk. */
async function rawCacheContents(): Promise<string> {
  await flushCacheWrites()
  const raw = new Dexie('wwwallet-cache')
  await raw.open()
  const entries = await raw.table('entries').toArray()
  raw.close()
  return JSON.stringify(entries, (_, value) =>
    value instanceof ArrayBuffer ? new TextDecoder().decode(value) : value,
  )
}

function vaultKey(): Promise<CryptoKey> {
  return importAesKey(crypto.getRandomValues(new Uint8Array(32)), true)
}

describe('chainData client-side cache', () => {
  beforeEach(async () => {
    await clearCache()
    await unlockCache(await vaultKey())
    vi.resetAllMocks()
    mockedApi.tokenList.mockResolvedValue([])
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('keeps scrolled-back history across a reload after a later refresh', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x3', '0x2'], 'cursor-1'))
    mockedApi.transactionPage.mockResolvedValue({ transactions: [txn('0x1')], next_cursor: null })
    await store.loadAddressActivity(CHAIN, HOLDER)
    await store.loadMoreTransactions(CHAIN, HOLDER)
    // Merging into history already held by the reactive store is exactly the
    // write that used to fail (a DataCloneError on Vue's proxies) silently.
    mockedApi.addressActivity.mockResolvedValue(activity(['0x4', '0x3'], 'cursor-2'))
    await store.loadAddressActivity(CHAIN, HOLDER)
    await vi.waitFor(async () => expect(await cachedActivityHashes()).toHaveLength(4))

    const reloaded = await reloadedStore()

    const restored = reloaded.activityByAddress[ACTIVITY_KEY]!
    expect(restored.transactions.map((t) => t.hash)).toEqual(['0x4', '0x3', '0x2', '0x1'])
    expect(restored.next_cursor).toBeNull()
  })

  it('pages back to known history when more than a page arrived since the last refresh', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x2', '0x1']))
    await store.loadAddressActivity(CHAIN, HOLDER)

    mockedApi.addressActivity.mockResolvedValue(activity(['0x6', '0x5'], 'cursor-a'))
    mockedApi.transactionPage.mockResolvedValue({ transactions: [txn('0x4'), txn('0x3'), txn('0x2')], next_cursor: 'cursor-b' })
    await store.loadAddressActivity(CHAIN, HOLDER)

    expect(mockedApi.transactionPage).toHaveBeenCalledExactlyOnceWith(CHAIN, HOLDER, 'cursor-a')
    const merged = store.activityByAddress[ACTIVITY_KEY]!
    expect(merged.transactions.map((t) => t.hash)).toEqual(['0x6', '0x5', '0x4', '0x3', '0x2', '0x1'])
    // The fully-loaded history's own (exhausted) cursor wins over the fresh one.
    expect(merged.next_cursor).toBeNull()
  })

  it('keeps known history when a refresh comes back with no transactions at all', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x2', '0x1'], 'cursor-1'))
    await store.loadAddressActivity(CHAIN, HOLDER)

    mockedApi.addressActivity.mockResolvedValue(activity([]))
    await store.loadAddressActivity(CHAIN, HOLDER)

    const kept = store.activityByAddress[ACTIVITY_KEY]!
    expect(kept.transactions.map((t) => t.hash)).toEqual(['0x2', '0x1'])
    expect(kept.next_cursor).toBe('cursor-1')
  })

  it('re-fetches tokens worth over $0.01 every refresh, unknown ones never, the rest once a day', async () => {
    // Only Date is faked: IndexedDB and vi.waitFor still need real timers.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-10-01T00:00:00Z'))
    const VALUABLE = `0x${'1'.repeat(40)}`
    const DUST = `0x${'2'.repeat(40)}`
    const UNPRICED = `0x${'3'.repeat(40)}`
    const UNKNOWN = `0x${'4'.repeat(40)}`
    const UNKNOWN_VALUABLE = `0x${'5'.repeat(40)}`
    mockedApi.addressActivity.mockResolvedValue({
      balances: [
        { symbol: 'ETH', contract_address: null, balance: '1', decimals: 18 },
        { symbol: 'ERC20', contract_address: VALUABLE, balance: '5000000', decimals: 18 }, // 5 at $1
        { symbol: 'ERC20', contract_address: DUST, balance: '5000', decimals: 18 }, // 0.005 at $1
        { symbol: 'ERC20', contract_address: UNPRICED, balance: '1000000', decimals: 18 },
        { symbol: 'ERC20', contract_address: UNKNOWN, balance: '1000000', decimals: 18 },
        { symbol: 'ERC20', contract_address: UNKNOWN_VALUABLE, balance: '5000000', decimals: 18 }, // 5 at $1
      ],
      transactions: [],
      next_cursor: null,
    })
    mockedApi.tokenMetadata.mockImplementation(async (_chain, address) =>
      usdc({
        address,
        usd_price: address === UNPRICED || address === UNKNOWN ? null : 1,
        logo_url: address === UNKNOWN || address === UNKNOWN_VALUABLE ? null : 'https://logo',
      }),
    )
    let seen = 0
    const fetchedSinceLastLook = () => {
      const calls = mockedApi.tokenMetadata.mock.calls.slice(seen).map((c) => c[1]).sort()
      seen = mockedApi.tokenMetadata.mock.calls.length
      return calls
    }
    async function refresh(store: ReturnType<typeof useChainDataStore>) {
      await store.loadAddressActivity(CHAIN, HOLDER)
      await vi.waitFor(() => expect(store.isLoading(CHAIN, HOLDER)).toBe(false))
    }

    const store = useChainDataStore()
    await refresh(store)
    expect(fetchedSinceLastLook()).toEqual([VALUABLE, DUST, UNPRICED, UNKNOWN, UNKNOWN_VALUABLE])

    vi.setSystemTime(new Date('2026-10-01T23:59:00Z'))
    await refresh(store)
    expect(fetchedSinceLastLook()).toEqual([VALUABLE, UNKNOWN_VALUABLE])

    // An app restart doesn't reset the clock — the check times are cached too.
    await vi.waitFor(async () => expect(await cachedCount('token-checked:')).toBe(5))
    const reloaded = await reloadedStore()
    await refresh(reloaded)
    expect(fetchedSinceLastLook()).toEqual([VALUABLE, UNKNOWN_VALUABLE])

    vi.setSystemTime(new Date('2026-10-09T00:00:00Z'))
    await refresh(reloaded)
    expect(fetchedSinceLastLook()).toEqual([VALUABLE, DUST, UNPRICED, UNKNOWN_VALUABLE])
  })

  it('fetches a token that only appears in history just when nothing is known about it', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-10-01T00:00:00Z'))
    const store = useChainDataStore()
    mockedApi.tokenMetadata.mockRejectedValueOnce(new Error('502'))

    // A failed lookup still counts as a check: not retried within a day.
    await store.ensureTokenMetadata(CHAIN, TOKEN)
    await store.ensureTokenMetadata(CHAIN, TOKEN)
    expect(mockedApi.tokenMetadata).toHaveBeenCalledOnce()

    vi.setSystemTime(new Date('2026-10-02T00:00:00Z'))
    mockedApi.tokenMetadata.mockResolvedValue(usdc())
    await store.ensureTokenMetadata(CHAIN, TOKEN)
    expect(mockedApi.tokenMetadata).toHaveBeenCalledTimes(2)

    // Once something is known, it's never re-fetched from here, even days later.
    vi.setSystemTime(new Date('2026-10-09T00:00:00Z'))
    const reloaded = await reloadedStore()
    await reloaded.ensureTokenMetadata(CHAIN, TOKEN)
    expect(mockedApi.tokenMetadata).toHaveBeenCalledTimes(2)
  })

  it('never blanks a known token field when a later refresh comes back without it', async () => {
    const store = useChainDataStore()
    mockedApi.tokenMetadata.mockResolvedValueOnce(usdc())
    await store.loadTokenMetadata(CHAIN, TOKEN)

    mockedApi.tokenMetadata.mockResolvedValueOnce(usdc({ logo_url: null, usd_price: 1.01 }))
    await store.loadTokenMetadata(CHAIN, TOKEN)
    expect(store.tokenMetadataByKey[TOKEN_KEY]).toMatchObject({ logo_url: 'https://logo', usd_price: 1.01 })

    mockedApi.tokenMetadata.mockResolvedValueOnce(usdc({ name: '', usd_price: null }))
    await store.loadTokenMetadata(CHAIN, TOKEN)
    expect(store.tokenMetadataByKey[TOKEN_KEY]).toMatchObject({ name: 'USD Coin', usd_price: 1.01 })

    // A failed refresh keeps everything and doesn't throw while anything is known.
    mockedApi.tokenMetadata.mockRejectedValueOnce(new Error('502'))
    await expect(store.loadTokenMetadata(CHAIN, TOKEN)).resolves.toBeUndefined()

    const reloaded = await reloadedStore()
    expect(reloaded.tokenMetadataByKey[TOKEN_KEY]).toMatchObject({ name: 'USD Coin', logo_url: 'https://logo', usd_price: 1.01 })
  })

  it('fills fields no backend source had from the cached token list', async () => {
    const store = useChainDataStore()
    mockedApi.tokenMetadata.mockResolvedValue(usdc({ logo_url: null }))
    mockedApi.tokenList.mockResolvedValue([
      { address: TOKEN.toUpperCase().replace('0X', '0x'), name: 'Listed', symbol: 'LST', decimals: 6, logo_url: 'https://list-logo' },
    ])

    await store.loadTokenMetadata(CHAIN, TOKEN)

    // Only the missing logo comes from the list; the backend's own fields win.
    expect(store.tokenMetadataByKey[TOKEN_KEY]).toMatchObject({ name: 'USD Coin', logo_url: 'https://list-logo' })
  })

  it('throws for a token only when nothing at all is known about it', async () => {
    const store = useChainDataStore()
    mockedApi.tokenMetadata.mockRejectedValue(new Error('502'))

    await expect(store.loadTokenMetadata(CHAIN, TOKEN)).rejects.toThrow('502')
    expect(store.tokenMetadataByKey[TOKEN_KEY]).toBeUndefined()
  })

  it('stores nothing about an account in readable form', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0xfeedface']))
    mockedApi.tokenMetadata.mockResolvedValue(usdc())

    await store.loadAddressActivity(CHAIN, HOLDER)
    await store.loadTokenMetadata(CHAIN, TOKEN)
    await vi.waitFor(async () => expect(await cachedCount('token-metadata:')).toBe(1))

    const onDisk = await rawCacheContents()
    for (const secret of [HOLDER.slice(2), TOKEN.slice(2), 'feedface', 'USD Coin', 'chain-activity']) {
      expect(onDisk).not.toContain(secret)
    }
  })

  it('loads no personal data while locked, and keeps none once locked', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x1']))
    await store.loadAddressActivity(CHAIN, HOLDER)
    await vi.waitFor(async () => expect(await cachedActivityHashes()).toEqual(['0x1']))

    lockCache()
    store.clearPersonalData()
    expect(store.activityByAddress).toEqual({})
    expect((await reloadedStore()).activityByAddress).toEqual({})

    // A refresh that lands after locking must not put anything back.
    const late = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x2']))
    await late.loadAddressActivity(CHAIN, HOLDER)
    expect(late.activityByAddress).toEqual({})
  })

  it('drops entries a different vault key wrote, e.g. before a restore', async () => {
    const store = useChainDataStore()
    mockedApi.addressActivity.mockResolvedValue(activity(['0x1']))
    await store.loadAddressActivity(CHAIN, HOLDER)
    await vi.waitFor(async () => expect(await cachedActivityHashes()).toEqual(['0x1']))

    await unlockCache(await vaultKey())
    expect((await reloadedStore()).activityByAddress).toEqual({})
    expect(await rawCacheContents()).toBe('[]')
  })
})
