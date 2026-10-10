import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { api, type AddressActivity, type Transaction } from '@/services/api'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { useChainDiscovery } from '../useChainDiscovery'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { TranslatedError } from '@/services/errors'

vi.mock('@/stores/vault', () => ({ useVaultStore: () => ({ persist: vi.fn<() => Promise<void>>() }) }))

const ADDRESS = '0x' + 'a'.repeat(40)
const ETH = 2000

function account(chain: WalletAccount['chain'], extra: Partial<WalletAccount> = {}): WalletAccount {
  return { address: ADDRESS, label: 'Main', chain, privateKey: '0x00', isDefault: true, visible: true, hasMnemonic: false, ...extra }
}

const STRANGER = '0x' + 'd'.repeat(40)

function txn(contractAddress: string | null, { from = ADDRESS, value = '1' } = {}): Transaction {
  return {
    hash: '0x1', from, to: null, value, asset: 'X', contract_address: contractAddress,
    block_number: 1, timestamp: null, status: 'success', counter_asset: null, counter_value: null, counter_contract_address: null,
  }
}

/** `nativeWei` in wei; `tokens` worth a fortune at a made-up price, to prove they're ignored. */
function activity(nativeWei: string, transactions: Transaction[] = []): AddressActivity {
  return {
    balances: [
      { symbol: 'ETH', contract_address: null, balance: nativeWei, decimals: 18 },
      { symbol: 'SPAM', contract_address: '0x' + 'b'.repeat(40), balance: '1000000000000000000000', decimals: 18 },
    ],
    transactions,
    next_cursor: null,
  }
}

describe('useChainDiscovery', () => {
  let chainData: ReturnType<typeof useChainDataStore>
  let accounts: ReturnType<typeof useAccountsStore>
  // What each chain "returns" when probed.
  let onChain: Partial<Record<WalletAccount['chain'], AddressActivity>>

  beforeEach(() => {
    setActivePinia(createPinia())
    chainData = useChainDataStore()
    accounts = useAccountsStore()
    onChain = {}
    for (const chain of Object.keys(NATIVE_ASSETS) as WalletAccount['chain'][]) chainData.nativePriceUsdByChain[chain] = ETH
    vi.spyOn(chainData, 'loadAddressActivity').mockImplementation(async (chain, address) => {
      const found = onChain[chain]
      if (found) chainData.activityByAddress[chainData.keyFor(chain, address)] = found
    })
    vi.spyOn(chainData, 'loadAddressPresence').mockImplementation(async (chain) => {
      const found = onChain[chain]
      return {
        native_balance: found?.balances.find((b) => b.contract_address === null)?.balance ?? '0',
        // Any history at all gets a chain past the cheap check, so the
        // full load's rule is what these tests exercise.
        transaction_count: found?.transactions.length ?? 0,
      }
    })
  })

  it('adds chains by native balance over $0.01 or native history — never on tokens alone', async () => {
    accounts.accounts = [account('ethereum')]
    onChain = {
      arbitrum: activity('10000000000000'), // 0.00001 ETH = $0.02
      base: activity('1000000000000'), // $0.002, tokens only
      optimism: activity('0', [txn(null)]), // empty now, but has sent ETH before
      polygon: activity('0', [txn('0x' + 'c'.repeat(40))]), // spam token transfer only
    }
    await useChainDiscovery().discover()
    expect(accounts.accounts.map((a) => `${a.chain}${a.discovered ? '*' : ''}`).sort()).toEqual([
      'arbitrum*',
      'ethereum',
      'optimism*',
    ])
  })

  it('counts incoming ETH only when it was worth more than dust — not address-poisoning zero transfers', async () => {
    accounts.accounts = [account('ethereum')]
    onChain = {
      base: activity('0', [txn(null, { from: STRANGER, value: '0' }), txn(null, { from: STRANGER, value: '0.000001' })]),
      arbitrum: activity('0', [txn(null, { from: STRANGER, value: '0.01' })]), // $20 received
    }
    await useChainDiscovery().discover()
    expect(accounts.accounts.map((a) => a.chain).sort()).toEqual(['arbitrum', 'ethereum'])
  })

  it('loads a chain in full only when it holds native coin above dust or has sent something', async () => {
    // An address no earlier test has probed: empty chains are remembered.
    accounts.accounts = [account('ethereum', { address: '0x' + '1'.repeat(40) })]
    onChain = {
      arbitrum: activity('10000000000000'), // $0.02
      base: activity('1000000000000'), // $0.002: dust
      optimism: activity('0', [txn(null)]),
    }
    await useChainDiscovery().discover()
    const loaded = vi.mocked(chainData.loadAddressActivity).mock.calls.map(([chain]) => chain)
    expect(loaded.sort()).toEqual(['arbitrum', 'optimism'])
    expect(vi.mocked(chainData.loadAddressPresence)).toHaveBeenCalledTimes(Object.keys(NATIVE_ASSETS).length - 1)
  })

  it('drops an already-discovered chain that does not qualify, but keeps one with no data yet', async () => {
    accounts.accounts = [account('ethereum'), account('base', { discovered: true, isDefault: false }), account('polygon', { discovered: true, isDefault: false })]
    chainData.activityByAddress[chainData.keyFor('base', ADDRESS)] = activity('1000000000000')
    await useChainDiscovery().discover()
    expect(accounts.accounts.map((a) => a.chain)).toEqual(['ethereum', 'polygon'])
  })

  // Last: which chains are unavailable is remembered for the rest of the session.
  it('stops probing a chain the backend says is unavailable, for every account', async () => {
    // Addresses no earlier test has probed: empty chains are remembered too.
    accounts.accounts = [account('ethereum', { address: '0x' + 'e'.repeat(40) }), account('base', { address: '0x' + 'f'.repeat(40) })]
    const probed: string[] = []
    // The store's own lookup this time, so it's what records the chain as unavailable.
    vi.mocked(chainData.loadAddressPresence).mockRestore()
    vi.spyOn(api, 'addressPresence').mockImplementation(async (chain) => {
      probed.push(chain)
      if (chain === 'linea') {
        const err = new TranslatedError('unavailable')
        err.code = 'chain_unavailable'
        throw err
      }
      return { native_balance: '0', transaction_count: 0 }
    })
    const discovery = useChainDiscovery()
    await discovery.discover()
    expect(probed.filter((c) => c === 'linea')).toHaveLength(2)
    expect(chainData.isChainUnavailable('linea')).toBe(true)
    probed.length = 0
    await discovery.discover()
    expect(probed).not.toContain('linea')
  })
})
