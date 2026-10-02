import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { api, type ChainSlug } from '@/services/api'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useChainDataStore } from '@/stores/chainData'
import { useMessagesStore } from '@/stores/messages'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { nativeBalanceUsd } from '@/composables/useChainDiscovery'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { convertUsd, formatAmount, formatFiat, toHumanAmount } from '@/services/money'
import { unlockWalletForSigning } from '@/services/wallet'
import { encodeApprove } from '@/services/erc20'
import { waitForBridgeArrival, waitForTransactionConfirmation } from '@/services/transactionStatus'
import type { PartyOption } from '@/components/transfer/PartySelect.vue'
import type { ChainOption } from '@/components/transfer/ChainSelect.vue'

export const ALL_CHAINS = Object.keys(NATIVE_ASSETS) as ChainSlug[]

// The pseudo-address DEX/bridge aggregators (0x, LI.FI) use to mean "the
// chain's native currency" — there's no real ERC-20 contract for it.
export const NATIVE_PSEUDO_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

/**
 * What both transfer tabs share: the user's accounts as pickable parties
 * (one per address — a discovered account's other chains are the same
 * account, so they're a chain choice, not another row), their chains, fiat
 * formatting, and the ERC-20 approval step before a swap or bridge.
 */
export function useTransferContext() {
  const { t, locale } = useI18n({ useScope: 'global' })
  const accounts = useAccountsStore()
  const payees = usePayeesStore()
  const chainData = useChainDataStore()
  const messages = useMessagesStore()
  const settingsLocale = useSettingsLocaleStore()

  function fiat(usd: number): string {
    return formatFiat(convertUsd(usd, settingsLocale.currency, chainData.fxRates), settingsLocale.currency, locale.value)
  }

  /** Fiat for a fee — tiny L2 fees read "< $0.01" rather than "$0.00". */
  function fiatFee(usd: number): string {
    const display = convertUsd(usd, settingsLocale.currency, chainData.fxRates)
    if (display > 0 && display < 0.01) return `< ${formatFiat(0.01, settingsLocale.currency, locale.value)}`
    return formatFiat(display, settingsLocale.currency, locale.value)
  }

  function chainsOf(address: string): ChainSlug[] {
    return accounts.accounts.filter((a) => a.address.toLowerCase() === address.toLowerCase()).map((a) => a.chain)
  }

  function accountOn(chain: ChainSlug, address: string): WalletAccount | undefined {
    return accounts.findAccount(chain, address)
  }

  /** The account's balance row summed over its chains — native coin only, as on the card. */
  function totalUsd(address: string): number | null {
    let total: number | null = null
    for (const chain of chainsOf(address)) {
      const usd = nativeBalanceUsd(chainData, chain, address)
      if (usd !== null) total = (total ?? 0) + usd
    }
    return total
  }

  const ownAccountOptions = computed<PartyOption[]>(() => {
    const seen = new Set<string>()
    const options: PartyOption[] = []
    for (const a of accounts.accounts) {
      const key = a.address.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      const usd = totalUsd(a.address)
      options.push({
        address: a.address,
        label: a.label,
        kind: 'account',
        subtitle: usd !== null ? fiat(usd) : undefined,
        // Main chain first: the one holding the most, as the card's balance row counts it.
        chains: chainsOf(a.address).sort(
          (x, y) => (nativeBalanceUsd(chainData, y, a.address) ?? -1) - (nativeBalanceUsd(chainData, x, a.address) ?? -1),
        ),
      })
    }
    return options
  })

  /** Payees once per address; a payee saved twice (two chains) keeps its first label and lists both chains. */
  const payeeOptions = computed<PartyOption[]>(() => {
    const own = new Set(ownAccountOptions.value.map((o) => o.address.toLowerCase()))
    const byAddress = new Map<string, PartyOption>()
    for (const p of payees.payees) {
      const key = p.address.toLowerCase()
      if (own.has(key)) continue
      const existing = byAddress.get(key)
      if (existing) {
        if (!existing.chains.includes(p.chain)) existing.chains.push(p.chain)
      } else {
        byAddress.set(key, { address: p.address, label: p.label, kind: 'payee', chains: [p.chain] })
      }
    }
    return [...byAddress.values()]
  })

  function nativeBalanceText(chain: ChainSlug, address: string): string | undefined {
    const native = chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances.find(
      (b) => b.contract_address === null,
    )
    if (!native) return undefined
    const amount = toHumanAmount(native.balance, native.decimals)
    const usd = nativeBalanceUsd(chainData, chain, address)
    return `${formatAmount(amount)} ${native.symbol}${usd !== null ? ` · ${fiat(usd)}` : ''}`
  }

  /** The chains an address is set up on, each with its balance there. */
  function ownChainOptions(address: string): ChainOption[] {
    return chainsOf(address).map((chain) => ({ chain, subtitle: nativeBalanceText(chain, address) }))
  }

  /** Every supported chain; the address's own ones carry their balance. */
  function anyChainOptions(address: string | null): ChainOption[] {
    return ALL_CHAINS.map((chain) => ({
      chain,
      subtitle: address && accountOn(chain, address) ? nativeBalanceText(chain, address) : undefined,
    }))
  }

  function payeeChain(address: string): ChainSlug | null {
    return payees.payees.find((p) => p.address.toLowerCase() === address.toLowerCase())?.chain ?? null
  }

  function nativeFeeText(chain: ChainSlug, feeWei: bigint): { native: string; fiat: string | null } {
    const human = Number(feeWei) / 1e18
    const native = `${new Intl.NumberFormat(locale.value, { maximumSignificantDigits: 3 }).format(human)} ${NATIVE_ASSETS[chain].symbol}`
    const price = chainData.nativePriceUsdByChain[chain]
    return { native, fiat: price !== undefined ? fiatFee(human * price) : null }
  }

  function durationText(secs: number): string {
    if (secs < 60) return t('transfer.etaSeconds', { n: Math.max(1, Math.round(secs)) })
    if (secs < 3600) return t('transfer.etaMinutes', { n: Math.round(secs / 60) })
    return t('transfer.etaHours', { n: Math.round((secs / 3600) * 10) / 10 })
  }

  /**
   * Approves `spender` for exactly `amount` of `token` if it isn't already,
   * waiting for the approval to mine. Exact rather than unlimited: if the
   * spender contract is ever compromised later, it can only move up to this
   * leftover amount, not the account's whole balance. False when the
   * approval failed or is still pending (the toast says which).
   */
  async function ensureAllowance(
    account: WalletAccount,
    token: string,
    spender: string,
    amount: string,
  ): Promise<boolean> {
    const { chain, address } = account
    const { amount: current } = await api.allowance(chain, token, address, spender)
    if (BigInt(current) >= BigInt(amount)) return true

    const wallet = await unlockWalletForSigning(account)
    const approveData = encodeApprove(spender, amount)
    // Gas estimated for the actual approve call, not a bare value-less call
    // to the token contract — that estimated the wrong (often reverting) operation.
    const prep = await api.transactionPrep(chain, address, token, '0', approveData)
    const signed = await wallet.signTransaction({
      to: token,
      value: '0',
      data: approveData,
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })
    const { transaction_hash: hash } = await api.broadcastTransaction(chain, signed)
    const msgId = messages.push(t('msg.approval.submitted'), 'info', -1)
    const status = await waitForTransactionConfirmation(chain, hash)
    if (status === 'failed') {
      messages.update(msgId, t('msg.approval.failed', { hash }), 'error')
      return false
    }
    if (status === 'pending') {
      messages.update(msgId, t('msg.approval.stillPending', { hash }), 'warning')
      return false
    }
    messages.update(msgId, t('msg.approval.confirmed'), 'success')
    // The approval spent native balance on its own gas — the insufficient-
    // gas check before review reads the cached balance, which would
    // otherwise still show the pre-approval amount.
    await chainData.loadAddressActivity(chain, address, { refreshTokenMetadata: false })
    return true
  }

  /**
   * Signs and broadcasts a prepared call (swap router, bridge…). Gas is
   * estimated here for the actual call (to + data + value) — a bare value
   * transfer to the router either reverts outright or comes back with a
   * limit far too low for the real call, which then fails on-chain.
   */
  async function signAndBroadcast(
    account: WalletAccount,
    call: { to: string; data?: string; value: string },
  ): Promise<string> {
    const wallet = await unlockWalletForSigning(account)
    const prep = await api.transactionPrep(account.chain, account.address, call.to, call.value, call.data)
    const signed = await wallet.signTransaction({
      to: call.to,
      value: call.value,
      ...(call.data ? { data: call.data } : {}),
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })
    const { transaction_hash } = await api.broadcastTransaction(account.chain, signed)
    return transaction_hash
  }

  /**
   * Follows a bridged transfer through to arrival on `toChain`, advancing
   * the toast `msgId` at each stage: source transaction mined, in flight
   * (with the quoted ETA), arrived. Arriving at one of the user's own
   * addresses on a chain it isn't set up on yet adds that chain to it, the
   * same as chain discovery would on its next pass.
   */
  async function trackBridge(
    msgId: number,
    transfer: { hash: string; source: WalletAccount; toChain: ChainSlug; toAddress: string; etaSecs: number },
  ): Promise<void> {
    const { hash, source, toChain, toAddress, etaSecs } = transfer
    const network = NATIVE_ASSETS[toChain].networkName
    messages.update(msgId, t('msg.bridge.waiting'), 'info', -1)
    const sourceStatus = await waitForTransactionConfirmation(source.chain, hash)
    chainData.loadAddressActivity(source.chain, source.address).catch(() => {})
    if (sourceStatus === 'failed') {
      messages.update(msgId, t('msg.bridge.failed', { hash }), 'error')
      return
    }
    messages.update(msgId, t('msg.bridge.inFlight', { network, eta: durationText(etaSecs) }), 'info', -1)
    const arrival = await waitForBridgeArrival(hash, source.chain, toChain)
    if (arrival.status === 'done') {
      const refunded = arrival.substatus === 'REFUNDED'
      messages.update(
        msgId,
        refunded ? t('msg.bridge.refunded', { hash }) : t('msg.bridge.arrived', { network }),
        refunded ? 'warning' : 'success',
      )
    } else if (arrival.status === 'failed') {
      messages.update(msgId, t('msg.bridge.failed', { hash }), 'error')
      return
    } else {
      messages.update(msgId, t('msg.bridge.stillPending', { hash }), 'warning')
      return
    }
    const ownSource = accounts.accounts.find(
      (a) => a.address.toLowerCase() === toAddress.toLowerCase() && !a.discovered,
    ) ?? accounts.accounts.find((a) => a.address.toLowerCase() === toAddress.toLowerCase())
    if (!ownSource) return
    if (!accountOn(toChain, toAddress)) await accounts.addDiscovered(ownSource, toChain)
    chainData.loadAddressActivity(toChain, toAddress).catch(() => {})
  }

  return {
    t,
    locale,
    accounts,
    payees,
    chainData,
    messages,
    settingsLocale,
    fiat,
    fiatFee,
    chainsOf,
    accountOn,
    ownAccountOptions,
    payeeOptions,
    ownChainOptions,
    anyChainOptions,
    payeeChain,
    nativeFeeText,
    durationText,
    ensureAllowance,
    signAndBroadcast,
    trackBridge,
  }
}
