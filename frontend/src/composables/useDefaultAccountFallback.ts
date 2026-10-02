import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { toHumanAmount } from '@/services/money'

/**
 * Keeps exactly one default account per chain, matching the old app's own
 * behavior: it only ever re-elects a default reactively, when the current one
 * goes missing or gets hidden — never by continuously chasing whichever
 * sibling currently has the highest balance. A user's chosen default stays
 * put even if another account's balance later overtakes it.
 */
export function useDefaultAccountFallback() {
  const accounts = useAccountsStore()
  const chainData = useChainDataStore()

  function nativeBalanceOf(account: WalletAccount): number {
    const activity = chainData.activityByAddress[chainData.keyFor(account.chain, account.address)]
    const native = activity?.balances.find((b) => b.contract_address === null)
    return native ? toHumanAmount(native.balance, native.decimals) : 0
  }

  async function reconcile(): Promise<void> {
    const chains = new Set(accounts.accounts.map((a) => a.chain))
    for (const chain of chains) {
      // Discovered copies of another chain's account never become a default.
      const siblings = accounts.accounts.filter((a) => a.chain === chain && !a.discovered)
      const visible = siblings.filter((a) => a.visible)
      const current = siblings.find((a) => a.isDefault)
      if (visible.length === 0 || (current && current.visible)) continue
      const winner = visible.reduce((best, a) =>
        nativeBalanceOf(a) > nativeBalanceOf(best) ? a : best,
      )
      await accounts.promoteToDefault(chain, winner.address)
    }
  }

  return { reconcile }
}
