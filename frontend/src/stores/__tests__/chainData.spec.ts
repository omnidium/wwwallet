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
    historicalPrice: vi.fn<typeof api.historicalPrice>(),
    fxRatesOn: vi.fn<typeof api.fxRatesOn>(),
    bridgeLookup: vi.fn<typeof api.bridgeLookup>(),
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

describe('chainData store — native prices', () => {
  beforeEach(async () => {
    await clearCache()
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('makes one request per native coin, shared by every chain using it, and retries after a failure', async () => {
    const store = useChainDataStore()
    mockedApi.nativePrice.mockResolvedValue({ usd: 2000 })
    await Promise.all([store.loadNativePrice('ethereum'), store.loadNativePrice('base'), store.loadNativePrice('arbitrum')])
    await store.loadNativePrice('optimism')
    expect(mockedApi.nativePrice).toHaveBeenCalledTimes(1)
    expect(store.nativePriceUsdByChain).toMatchObject({ ethereum: 2000, base: 2000, arbitrum: 2000, optimism: 2000 })

    mockedApi.nativePrice.mockRejectedValueOnce(new Error('429')).mockResolvedValueOnce({ usd: 0.1 })
    await expect(store.loadNativePrice('polygon')).rejects.toThrow('429')
    await store.loadNativePrice('polygon')
    expect(store.nativePriceUsdByChain.polygon).toBe(0.1)
  })

  describe('historical transaction rates', () => {
    const MINED = { ...txn('0xswap'), timestamp: '2025-03-15T10:20:00Z', contract_address: TOKEN, asset: 'USDC', counter_asset: 'ETH', counter_value: '0.5' }

    it('prices each asset and the day\'s FX once, and keeps them across a reload', async () => {
      const store = useChainDataStore()
      mockedApi.historicalPrice.mockImplementation(async (_c, token) => ({ usd: token ? 1 : 2000 }))
      mockedApi.fxRatesOn.mockResolvedValue({ base: 'USD', rates: { EUR: 0.9 }, as_of_unix: 0 })
      await store.ensureTransactionRates(CHAIN, MINED)
      // The token leg, and native once (it's both the other leg and the fee's coin).
      expect(mockedApi.historicalPrice).toHaveBeenCalledTimes(2)
      expect(mockedApi.fxRatesOn).toHaveBeenCalledWith('2025-03-15')
      await store.ensureTransactionRates(CHAIN, MINED)
      expect(mockedApi.historicalPrice).toHaveBeenCalledTimes(2)

      const reloaded = await reloadedStore()
      expect(reloaded.transactionRatesByKey[`${CHAIN}:0xswap`]).toEqual({ usd: { [TOKEN]: 1, native: 2000 }, fx: { EUR: 0.9 } })
    })

    it('keeps what was found when one lookup fails, and doesn\'t retry the miss this session', async () => {
      const store = useChainDataStore()
      mockedApi.historicalPrice.mockImplementation(async (_c, token) => {
        if (token) throw new Error('no market')
        return { usd: 2000 }
      })
      mockedApi.fxRatesOn.mockRejectedValue(new Error('down'))
      await store.ensureTransactionRates(CHAIN, MINED)
      expect(store.transactionRatesByKey[`${CHAIN}:0xswap`]).toEqual({ usd: { native: 2000 }, fx: null })
      await store.ensureTransactionRates(CHAIN, MINED)
      expect(mockedApi.historicalPrice).toHaveBeenCalledTimes(2)
      expect(mockedApi.fxRatesOn).toHaveBeenCalledTimes(1)
    })

    it('looks nothing up for a pending transaction', async () => {
      const store = useChainDataStore()
      await store.ensureTransactionRates(CHAIN, txn('0xpending'))
      expect(mockedApi.historicalPrice).not.toHaveBeenCalled()
    })
  })

  describe('bridged transfers', () => {
    const SENDER = `0x${'c'.repeat(40)}`
    const RECIPIENT = `0x${'d'.repeat(40)}`
    const transfer = (overrides = {}) => ({
      status: 'done' as const,
      substatus: 'COMPLETED',
      sending_tx_hash: '0xsend',
      receiving_tx_hash: '0xRECEIVE',
      from_address: SENDER,
      to_address: RECIPIENT,
      from_chain: 'ethereum' as const,
      to_chain: null,
      ...overrides,
    })

    it('finds the far end of either leg, and keeps a settled one across a reload', async () => {
      const store = useChainDataStore()
      mockedApi.bridgeLookup.mockResolvedValue(transfer())
      await store.ensureBridgeEnds(CHAIN, txn('0xsend'))
      await store.ensureBridgeEnds('base', txn('0xreceive'))
      expect(store.bridgeEndsByKey[`${CHAIN}:0xsend`]).toEqual({ leg: 'sending', address: RECIPIENT, chain: null })
      expect(store.bridgeEndsByKey['base:0xreceive']).toEqual({ leg: 'receiving', address: SENDER, chain: 'ethereum' })

      await store.ensureBridgeEnds(CHAIN, txn('0xsend'))
      expect(mockedApi.bridgeLookup).toHaveBeenCalledTimes(2)
      expect((await reloadedStore()).bridgeEndsByKey[`${CHAIN}:0xsend`]?.address).toBe(RECIPIENT)
    })

    it('asks once a session about a transaction that isn\'t a bridge, or a same-chain swap LI.FI routed', async () => {
      const store = useChainDataStore()
      mockedApi.bridgeLookup.mockResolvedValueOnce({ status: 'pending', substatus: null, receiving_tx_hash: null })
      await store.ensureBridgeEnds(CHAIN, txn('0xplain'))
      await store.ensureBridgeEnds(CHAIN, txn('0xplain'))
      mockedApi.bridgeLookup.mockResolvedValueOnce(transfer({ sending_tx_hash: '0xswap', receiving_tx_hash: '0xswap' }))
      await store.ensureBridgeEnds(CHAIN, txn('0xswap'))
      expect(mockedApi.bridgeLookup).toHaveBeenCalledTimes(2)
      expect(store.bridgeEndsByKey).toEqual({})
    })

    it('doesn\'t ask about a pending transaction or a same-hash swap', async () => {
      const store = useChainDataStore()
      await store.ensureBridgeEnds(CHAIN, { ...txn('0xpending'), status: 'pending' })
      await store.ensureBridgeEnds(CHAIN, { ...txn('0xswap'), counter_asset: 'ETH', counter_value: '1' })
      expect(mockedApi.bridgeLookup).not.toHaveBeenCalled()
    })
  })

  it('remembers the last five tokens swapped per chain, newest first, encrypted and dropped on lock', async () => {
    const store = useChainDataStore()
    const token = (n: number) => ({ address: `0x${String(n).repeat(40)}`, symbol: `T${n}`, name: `Token ${n}`, decimals: 18, logoUrl: null })
    for (const n of [1, 2, 3, 4, 5, 6]) store.recordSwappedToken(CHAIN, token(n))
    store.recordSwappedToken(CHAIN, token(3))
    expect(store.recentSwapTokensByChain[CHAIN]?.map((t) => t.symbol)).toEqual(['T3', 'T6', 'T5', 'T4', 'T2'])

    expect((await reloadedStore()).recentSwapTokensByChain[CHAIN]?.map((t) => t.symbol)).toEqual(['T3', 'T6', 'T5', 'T4', 'T2'])
    expect(await rawCacheContents()).not.toContain('Token 3')

    lockCache()
    const locked = await reloadedStore()
    expect(locked.recentSwapTokensByChain).toEqual({})
  })
})
