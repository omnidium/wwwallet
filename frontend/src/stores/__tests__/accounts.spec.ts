import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAccountsStore, type WalletAccount } from '../accounts'
import { useDefaultAccountFallback } from '@/composables/useDefaultAccountFallback'

vi.mock('@/stores/vault', () => ({ useVaultStore: () => ({ persist: vi.fn<() => Promise<void>>() }) }))

const A = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
const B = '0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'

function account(address: string, chain: WalletAccount['chain'], extra: Partial<WalletAccount> = {}): WalletAccount {
  return { address, label: address.slice(0, 4), chain, privateKey: '0x00', isDefault: false, visible: true, hasMnemonic: false, ...extra }
}

describe('accounts store — multi-chain groups', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('adds a discovered chain as a non-default copy with the same label and key', async () => {
    const accounts = useAccountsStore()
    const source = account(A, 'ethereum', { label: 'Main', isDefault: true, privateKey: '0xkey' })
    accounts.accounts = [source]
    await accounts.addDiscovered(source, 'base')
    await accounts.addDiscovered(source, 'base')
    expect(accounts.accounts).toHaveLength(2)
    expect(accounts.accounts[1]).toMatchObject({ chain: 'base', label: 'Main', privateKey: '0xkey', isDefault: false, visible: true, discovered: true })
  })

  it('renames every chain of an address together', async () => {
    const accounts = useAccountsStore()
    accounts.accounts = [account(A, 'ethereum'), account(A.toLowerCase(), 'base', { discovered: true }), account(B, 'ethereum')]
    await accounts.rename('base', A, 'Savings')
    expect(accounts.accounts.map((a) => a.label)).toEqual(['Savings', 'Savings', '0xBB'])
  })

  it('reorders whole address groups, keeping hidden accounts in place', async () => {
    const accounts = useAccountsStore()
    accounts.accounts = [
      account(A, 'ethereum'),
      account(B, 'polygon', { visible: false }),
      account(B, 'ethereum'),
      account(A, 'base', { discovered: true }),
    ]
    await accounts.reorderVisible([B, A], 1)
    expect(accounts.accounts.map((a) => `${a.address.slice(2, 3)}:${a.chain}`)).toEqual([
      'B:ethereum',
      'B:polygon',
      'A:ethereum',
      'A:base',
    ])
    expect(accounts.favouritesCard.position).toBe(1)
    await accounts.reorderVisible([B, A], 2)
    expect(accounts.favouritesCard.position).toBeNull()
  })

  it('never elects a discovered account as a chain default', async () => {
    const accounts = useAccountsStore()
    accounts.accounts = [account(A, 'base', { discovered: true }), account(B, 'base', { isDefault: true, visible: false })]
    await useDefaultAccountFallback().reconcile()
    expect(accounts.accounts.find((a) => a.address === A)!.isDefault).toBe(false)
  })
})
