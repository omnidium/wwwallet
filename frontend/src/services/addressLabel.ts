import type { ChainSlug } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { truncateAddress } from '@/services/format'

/** "<Name> (<truncated address>)" for a known account/payee, else just the truncated address. */
export function addressDisplayLabel(chain: ChainSlug, address: string): string {
  const accounts = useAccountsStore()
  const payees = usePayeesStore()
  const name =
    accounts.accounts.find((a) => a.chain === chain && a.address.toLowerCase() === address.toLowerCase())?.label ??
    payees.payees.find((p) => p.chain === chain && p.address.toLowerCase() === address.toLowerCase())?.label ??
    null
  return name ? `${name} (${truncateAddress(address)})` : truncateAddress(address)
}
