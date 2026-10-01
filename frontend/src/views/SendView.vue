<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { formatUnits, parseUnits } from 'ethers'
import {
  api,
  type ChainSlug,
  type Transaction,
  type TransactionPrep,
  type SwapQuote,
} from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { encodeApprove, encodeTransfer } from '@/services/erc20'
import {
  toHumanAmount,
  convertUsd,
  convertToUsd,
  formatFiat,
  currencySymbol,
  formatAmount,
} from '@/services/money'
import { truncateAddress } from '@/services/format'
import { addressDisplayLabel } from '@/services/addressLabel'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import { displayErrorMessage } from '@/services/errors'
import QrScannerDialog from '@/components/QrScannerDialog.vue'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import TokenPickerField, { type HeldToken, type PickedToken } from '@/components/TokenPickerField.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const payees = usePayeesStore()
const messages = useMessagesStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

const activeTab = ref<'send' | 'swap'>('send')

onMounted(async () => {
  // Prefilled by the drag-to-transfer gesture on the Accounts screen. Dropping
  // onto one of the user's own accounts or a payee keeps the To field as a
  // pulldown (so it still shows a name, matching the From field) — only an
  // arbitrary/QR-scanned address falls back to the plain text field, since
  // that isn't in the pulldown's option list.
  if (typeof route.query.to === 'string') {
    const droppedAddress = route.query.to
    if (route.query.toKind === 'account' || route.query.toKind === 'payee') {
      toSelectedAddress.value = droppedAddress
    } else {
      to.value = droppedAddress
      toMode.value = 'scanned'
    }
  }
  // Every account's balance is shown in the From/To pulldowns, not just the
  // one this panel was opened from, so all of them need loading up front —
  // same pattern as AccountsView's own initial load.
  const chains = new Set(accounts.accounts.map((a) => a.chain))
  try {
    await Promise.all([
      chainData.loadFxRates(),
      ...[...chains].map((c) => chainData.loadNativePrice(c)),
      ...accounts.accounts.map((a) => chainData.loadAddressActivity(a.chain, a.address)),
    ])
  } catch {
    // Balances/fiat rows just won't be available for inline checks.
  }
})

// There's no standalone per-account route to return to — account cards live
// directly on the accounts list — so closing this panel (via Cancel or after
// a send/swap) always means going back there. Pushing to a fabricated
// `/accounts/:chain/:address` (with no matching route) used to leave
// PaneOverlay's "path !== '/'" check satisfied with nothing for RouterView to
// render, showing an empty floating pane with just its own close button.
function closePanel() {
  router.push('/')
}

/* ------------------------------- Send tab ------------------------------- */

interface TokenOption {
  key: string
  symbol: string
  contractAddress: string | null
  decimals: number
  rawBalance: string
  logoUrl: string | null
  usdPrice: number | null
}

// Highest USD value held first; a token with no resolved price sinks to the
// bottom — same convention as AccountCard.vue's tokenRows sort.
function usdValueOf(opt: TokenOption): number {
  if (opt.usdPrice == null) return -1
  return toHumanAmount(opt.rawBalance, opt.decimals) * opt.usdPrice
}

const sendFromAddress = ref(address)
const sendFromAccount = computed(
  () => accounts.accounts.find((a) => a.address === sendFromAddress.value) ?? account,
)
// The account itself carries its chain — switching From to an account on a
// different chain switches everything else (tokens, recipients, prep calls)
// with it, instead of freezing on the chain the panel was opened from.
const sendChain = computed(() => sendFromAccount.value?.chain ?? chain)

const to = ref('')
const toWasFromQr = ref(false)
// 'select' shows a From-style pulldown of same-chain accounts; a successful
// QR scan switches to 'scanned', showing the full decoded address as plain
// text instead (per the requested behavior) until cleared back.
const toMode = ref<'select' | 'scanned'>('select')
const toSelectedAddress = ref<string | null>(null)
const scannerOpen = ref(false)
const amount = ref('')
const amountMode = ref<'token' | 'fiat'>('token')
// Set by the Max link, cleared on any manual edit or token change. A native
// send with this set recomputes its value from a fresh fee estimate right
// before building the transaction, instead of reusing the number Max
// displayed — that number was itself computed from an earlier, separate
// prep call, and gas price drifting between the two (however slightly) is
// exactly what "insufficient funds for gas * price + value" off by a tiny
// amount means: the balance was already fully committed to value + the old
// fee estimate, leaving nothing for the new, real one.
const sendMaxIntent = ref(false)
const selectedTokenKey = ref('native')
const sendBusy = ref(false)
const sendFormValid = ref(false)
const sendReviewOpen = ref(false)
const sendReviewRows = ref<ReviewRow[]>([])
const addPayeeOpen = ref(false)
const addPayeeLabel = ref('')

const activity = computed(
  () => chainData.activityByAddress[chainData.keyFor(sendChain.value, sendFromAddress.value)],
)

const tokenOptions = computed<TokenOption[]>(() =>
  (activity.value?.balances ?? []).map((b) => {
    if (b.contract_address === null) {
      return {
        key: 'native',
        symbol: b.symbol,
        contractAddress: null,
        decimals: b.decimals,
        rawBalance: b.balance,
        logoUrl: null,
        usdPrice: chainData.nativePriceUsdByChain[sendChain.value] ?? null,
      }
    }
    const metadata =
      chainData.tokenMetadataByKey[chainData.keyFor(sendChain.value, b.contract_address)]
    return {
      key: b.contract_address,
      symbol: metadata?.symbol ?? b.symbol,
      contractAddress: b.contract_address,
      decimals: metadata?.decimals ?? b.decimals,
      rawBalance: b.balance,
      logoUrl: metadata?.logo_url ?? null,
      usdPrice: metadata?.usd_price ?? null,
    }
  }).sort((a, b) => usdValueOf(b) - usdValueOf(a)),
)
const selectedToken = computed(
  () =>
    tokenOptions.value.find((tok) => tok.key === selectedTokenKey.value) ??
    tokenOptions.value[0] ??
    null,
)

// Lazy-load metadata (symbol/decimals/logo/price) for every held ERC-20 token —
// same pattern as AccountCard.vue.
watch(
  () => activity.value?.balances ?? [],
  (balances) => {
    for (const b of balances) {
      if (!b.contract_address) continue
      const key = chainData.keyFor(sendChain.value, b.contract_address)
      if (!chainData.tokenMetadataByKey[key])
        void chainData.loadTokenMetadata(sendChain.value, b.contract_address)
    }
  },
  { immediate: true },
)

/** "<Label> <fiat balance> (<native balance> <SYMBOL>)" — same shape for From and To. */
function accountOptionLabel(acc: { label: string; chain: ChainSlug; address: string }): string {
  const activityForAcc = chainData.activityByAddress[chainData.keyFor(acc.chain, acc.address)]
  const native = activityForAcc?.balances.find((b) => b.contract_address === null)
  if (!native) return acc.label
  const humanAmount = toHumanAmount(native.balance, native.decimals)
  const priceUsd = chainData.nativePriceUsdByChain[acc.chain]
  const fiatStr =
    priceUsd != null
      ? formatFiat(
        convertUsd(humanAmount * priceUsd, settingsLocale.currency, chainData.fxRates),
        settingsLocale.currency,
        locale.value,
      )
      : '—'
  return `${acc.label} ${fiatStr} (${formatAmount(humanAmount)} ${native.symbol})`
}

const fromAccountOptions = computed(() =>
  accounts.accounts.map((a) => ({ address: a.address, title: accountOptionLabel(a) })),
)
// Same shape as fromAccountOptions, plus payees — accountOptionLabel already
// degrades to a plain label when there's no loaded balance for an address,
// which is always the case for a payee (their balances aren't tracked), so
// they show up as just their name rather than the raw address.
const toAccountOptions = computed(() => [
  ...accounts.accounts
    .filter((a) => a.chain === sendChain.value && a.address !== sendFromAddress.value)
    .map((a) => ({ address: a.address, title: accountOptionLabel(a) })),
  ...payees.payees
    .filter((p) => p.chain === sendChain.value)
    .map((p) => ({ address: p.address, title: accountOptionLabel(p) })),
])

watch(toSelectedAddress, (selectedAddress) => {
  if (!selectedAddress) return
  to.value = selectedAddress
  toWasFromQr.value = false
})

function clearScannedTo() {
  to.value = ''
  toWasFromQr.value = false
  toSelectedAddress.value = null
  toMode.value = 'select'
}

/** Bound to the amount field instead of a plain v-model so a manual edit can clear sendMaxIntent. */
function onAmountInput(value: string) {
  amount.value = value
  sendMaxIntent.value = false
}

watch(selectedTokenKey, () => {
  sendMaxIntent.value = false
})

const tokenUnitsAmount = computed<number | null>(() => {
  if (!amount.value) return null
  const num = Number(amount.value)
  if (Number.isNaN(num)) return null
  if (amountMode.value === 'token') return num
  const price = selectedToken.value?.usdPrice ?? null
  if (!price) return null
  return convertToUsd(num, settingsLocale.currency, chainData.fxRates) / price
})
const selectedTokenBalance = computed(() => {
  const tok = selectedToken.value
  return tok ? Number(formatUnits(tok.rawBalance, tok.decimals)) : null
})

const amountRules = [
  () =>
    (tokenUnitsAmount.value !== null && tokenUnitsAmount.value > 0) ||
    t('validation.amountGreaterThanZero'),
  () =>
    selectedTokenBalance.value === null ||
    tokenUnitsAmount.value === null ||
    tokenUnitsAmount.value <= selectedTokenBalance.value ||
    t('validation.insufficientBalance'),
]
const addressRules = [
  (v: string) => isValidAddress(v.trim()) || t('validation.invalidRecipientAddress'),
]

// ETH's conventional single-glyph symbol, the way '$'/'€' represent a fiat
// currency — no other token has an equivalent glyph, so those show their
// plain code (e.g. "USDC") instead, same as the fiat side falling back to
// the currency's own symbol.
const ETH_SYMBOL_GLYPH = 'Ξ'

const unitSymbolDisplay = computed(() => {
  if (amountMode.value === 'fiat') return currencySymbol(settingsLocale.currency, locale.value)
  const symbol = selectedToken.value?.symbol ?? ''
  return symbol.toUpperCase() === 'ETH' ? ETH_SYMBOL_GLYPH : symbol
})

const amountFieldLabel = computed(() =>
  t('send.amountInLabel', {
    unit:
      amountMode.value === 'token' ? (selectedToken.value?.symbol ?? '') : settingsLocale.currency,
  }),
)

function toggleAmountMode() {
  const price = selectedToken.value?.usdPrice ?? null
  const current = Number(amount.value)
  if (price && amount.value && !Number.isNaN(current) && current > 0) {
    if (amountMode.value === 'token') {
      amount.value = convertUsd(
        current * price,
        settingsLocale.currency,
        chainData.fxRates,
      ).toFixed(2)
    } else {
      amount.value = (
        convertToUsd(current, settingsLocale.currency, chainData.fxRates) / price
      ).toFixed(6)
    }
  }
  amountMode.value = amountMode.value === 'token' ? 'fiat' : 'token'
}

async function setMaxAmount() {
  const token = selectedToken.value
  if (!token) return

  let maxTokenAmount: string
  if (token.contractAddress !== null) {
    maxTokenAmount = formatUnits(token.rawBalance, token.decimals)
  } else {
    sendBusy.value = true
    try {
      const toForEstimate = isValidAddress(to.value.trim())
        ? to.value.trim()
        : sendFromAddress.value
      const prep = await api.transactionPrep(
        sendChain.value,
        sendFromAddress.value,
        toForEstimate,
        '0',
      )
      const feeWei = BigInt(prep.gas_price) * BigInt(prep.gas_limit)
      const balanceWei = BigInt(token.rawBalance)
      maxTokenAmount = formatUnits(balanceWei > feeWei ? balanceWei - feeWei : 0n, token.decimals)
    } catch (err) {
      messages.push(displayErrorMessage(err), 'error')
      return
    } finally {
      sendBusy.value = false
    }
  }

  // Respect whichever unit is currently displayed — only convert to fiat when
  // a usable price is actually available, otherwise fall back to the token
  // amount rather than silently doing nothing.
  if (amountMode.value === 'fiat' && token.usdPrice != null) {
    amount.value = convertUsd(
      Number(maxTokenAmount) * token.usdPrice,
      settingsLocale.currency,
      chainData.fxRates,
    ).toFixed(2)
  } else {
    amount.value = maxTokenAmount
  }
  // The displayed number above is only a preview — openSendReview recomputes
  // the actual native-send value from a fresh fee estimate rather than
  // trusting this one (see sendMaxIntent's declaration for why).
  sendMaxIntent.value = true
}

/** Handles both a bare address and an EIP-681 "ethereum:0x...@chainId" URI. */
function onQrDecoded(data: string) {
  const match = data.match(/0x[a-fA-F0-9]{40}/)
  if (!match) {
    messages.push(t('msg.qr.noAddress'), 'warning')
    return
  }
  const scannedAddress = match[0]
  // A scan of an address that's already a saved payee shows their name via
  // the pulldown, same as picking them directly — only a genuinely new
  // address falls back to the raw-text field (and offers to save it after).
  const knownPayee = payees.payees.find(
    (p) => p.chain === sendChain.value && p.address.toLowerCase() === scannedAddress.toLowerCase(),
  )
  if (knownPayee) {
    toSelectedAddress.value = knownPayee.address
    toMode.value = 'select'
    return
  }
  to.value = scannedAddress
  toWasFromQr.value = true
  toMode.value = 'scanned'
}

function formatAmountRow(
  humanAmount: number,
  symbol: string,
  usdPrice: number | null,
): { value: string; sub?: string } {
  const nativeStr = `${formatAmount(humanAmount)} ${symbol}`
  if (usdPrice === null) return { value: nativeStr }
  const fiat = formatFiat(
    convertUsd(humanAmount * usdPrice, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
  return { value: fiat, sub: nativeStr }
}

const preparedSend = ref<{
  prep: TransactionPrep
  to: string
  value: string
  data?: string
} | null>(null)

async function openSendReview() {
  const token = selectedToken.value
  const fromAccount = sendFromAccount.value
  if (!fromAccount || !sendFormValid.value || !token || tokenUnitsAmount.value === null) return

  sendBusy.value = true
  try {
    const toAddress = to.value.trim()

    let prep: TransactionPrep
    let txTo: string
    let txValue: string
    let txData: string | undefined
    // What actually gets sent for the review/total rows — usually just
    // tokenUnitsAmount, but a max native send overrides it below once the
    // real fee is known.
    let finalHumanAmount = tokenUnitsAmount.value
    if (token.contractAddress === null) {
      txTo = toAddress
      if (sendMaxIntent.value) {
        // Estimate with value=0 rather than a near-full balance: gas cost for
        // a plain transfer doesn't depend on the value anyway, and estimating
        // with the real (stale) max amount is exactly how this went wrong —
        // the fee is derived from THIS call, so it can never drift from what
        // actually gets signed below.
        prep = await api.transactionPrep(sendChain.value, fromAccount.address, txTo, '0')
        const feeWei = BigInt(prep.gas_price) * BigInt(prep.gas_limit)
        const balanceWei = BigInt(token.rawBalance)
        const valueWei = balanceWei > feeWei ? balanceWei - feeWei : 0n
        txValue = valueWei.toString()
        finalHumanAmount = Number(formatUnits(valueWei, token.decimals))
      } else {
        txValue = parseUnits(
          tokenUnitsAmount.value.toFixed(token.decimals),
          token.decimals,
        ).toString()
        prep = await api.transactionPrep(sendChain.value, fromAccount.address, txTo, txValue)
      }
    } else {
      txTo = token.contractAddress
      txValue = '0'
      const valueWei = parseUnits(
        tokenUnitsAmount.value.toFixed(token.decimals),
        token.decimals,
      ).toString()
      txData = encodeTransfer(toAddress, valueWei)
      prep = await api.transactionPrep(sendChain.value, fromAccount.address, txTo, txValue, txData)
    }
    preparedSend.value = { prep, to: txTo, value: txValue, data: txData }

    const feeWei = BigInt(prep.gas_price) * BigInt(prep.gas_limit)
    const native = tokenOptions.value.find((tok) => tok.contractAddress === null)

    // Gas is always paid in the chain's native asset, separate from whatever
    // token is actually being sent — amountRules only validates the token
    // amount itself, so an ERC-20 send with plenty of token balance but no
    // ETH for gas would otherwise sail through to an opaque broadcast
    // failure instead of being caught here, before review.
    const requiredNativeWei = token.contractAddress === null ? BigInt(txValue) + feeWei : feeWei
    if (native && requiredNativeWei > BigInt(native.rawBalance)) {
      messages.push(t('validation.insufficientGas'), 'error')
      return
    }

    const rows: ReviewRow[] = [
      { label: t('review.from'), value: addressDisplayLabel(sendChain.value, fromAccount.address) },
      { label: t('review.to'), value: addressDisplayLabel(sendChain.value, toAddress) },
      { label: t('review.chain'), value: sendChain.value },
      {
        label: t('review.amount'),
        ...formatAmountRow(finalHumanAmount, token.symbol, token.usdPrice),
      },
      {
        label: t('review.fee'),
        ...formatAmountRow(
          Number(formatUnits(feeWei, 18)),
          native?.symbol ?? '',
          native?.usdPrice ?? null,
        ),
      },
    ]
    // Combining amount + fee into one "total" only makes sense when they're
    // the same asset (a native send) — an ERC-20 send debits the fee from a
    // separate native balance entirely.
    if (token.contractAddress === null) {
      const totalWei = BigInt(txValue) + feeWei
      rows.push({
        label: t('review.total'),
        bold: true,
        ...formatAmountRow(
          Number(formatUnits(totalWei, 18)),
          native?.symbol ?? '',
          native?.usdPrice ?? null,
        ),
      })
    }
    sendReviewRows.value = rows
    sendReviewOpen.value = true
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    sendBusy.value = false
  }
}

async function confirmSend() {
  const fromAccount = sendFromAccount.value
  if (!fromAccount || !preparedSend.value) return
  const { prep, to: txTo, value: txValue, data: txData } = preparedSend.value
  const toAddress = to.value.trim()
  const txChain = sendChain.value

  sendBusy.value = true
  const msgId = messages.push(t('msg.send.submitting'), 'info', -1)
  try {
    const wallet = await unlockWalletForSigning(fromAccount)
    const signedTx = await wallet.signTransaction({
      to: txTo,
      value: txValue,
      ...(txData ? { data: txData } : {}),
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })

    const { transaction_hash } = await api.broadcastTransaction(txChain, signedTx)
    sendReviewOpen.value = false
    sendBusy.value = false

    // Indexers only report a transaction once it's mined, so without this it
    // simply wouldn't appear anywhere until confirmed — insert it locally,
    // on both ends if the recipient is one of the user's own accounts, so it
    // shows up immediately as pending.
    const toOwnAccount = accounts.accounts.some(
      (a) => a.chain === txChain && a.address.toLowerCase() === toAddress.toLowerCase(),
    )
    const token = selectedToken.value
    if (token && tokenUnitsAmount.value !== null) {
      const pendingTxn: Transaction = {
        hash: transaction_hash,
        from: fromAccount.address,
        to: toAddress,
        value: tokenUnitsAmount.value.toString(),
        asset: token.symbol,
        contract_address: token.contractAddress,
        block_number: null,
        timestamp: null,
        status: 'pending',
        counter_asset: null,
        counter_value: null,
        counter_contract_address: null,
      }
      chainData.prependTransaction(txChain, fromAccount.address, pendingTxn)
      if (toOwnAccount) chainData.prependTransaction(txChain, toAddress, pendingTxn)
    }

    const alreadyPayee = payees.payees.some(
      (p) => p.chain === txChain && p.address.toLowerCase() === toAddress.toLowerCase(),
    )
    if (toWasFromQr.value && !alreadyPayee) {
      addPayeeLabel.value = ''
      addPayeeOpen.value = true
    } else {
      closePanel()
    }

    // Polling continues regardless of navigation — the messages store is
    // global, so the toast keeps updating regardless of the active view.
    messages.update(msgId, t('msg.send.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(txChain, transaction_hash)
    if (status === 'success') {
      messages.update(msgId, t('msg.send.success', { hash: transaction_hash }), 'success')
    } else if (status === 'failed') {
      messages.update(msgId, t('msg.send.failed', { hash: transaction_hash }), 'error')
    } else {
      messages.update(msgId, t('msg.send.stillPending', { hash: transaction_hash }), 'warning')
    }
    // Refreshes both the transaction list (replacing the pending placeholder
    // with the real, mined entry) and balances, regardless of outcome — a
    // failed send still spent gas.
    void chainData.loadAddressActivity(txChain, fromAccount.address)
    if (toOwnAccount) void chainData.loadAddressActivity(txChain, toAddress)
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
    sendBusy.value = false
  }
}

async function saveScannedPayee() {
  const trimmed = to.value.trim()
  await payees.addPayee({
    id: crypto.randomUUID(),
    label: addPayeeLabel.value.trim() || truncateAddress(trimmed),
    address: trimmed,
    chain: sendChain.value,
  })
  addPayeeOpen.value = false
  closePanel()
}

function skipAddPayee() {
  addPayeeOpen.value = false
  closePanel()
}

/* ------------------------------- Swap tab -------------------------------- */

// The pseudo-address DEX aggregators (including 0x's Swap API) use to mean
// "the chain's native currency" — there's no real ERC-20 contract for it.
const NATIVE_PSEUDO_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// The Swap tab always operates on the single account this panel was opened
// from — unlike the Send tab, there's no From selector — so its held-token
// list is scoped to the fixed `chain`/`address`, independent of whatever the
// Send tab's own From dropdown currently points to.
const swapActivity = computed(() => chainData.activityByAddress[chainData.keyFor(chain, address)])
const swapTokenOptions = computed<TokenOption[]>(() =>
  (swapActivity.value?.balances ?? []).map((b) => {
    if (b.contract_address === null) {
      return {
        key: 'native',
        symbol: b.symbol,
        contractAddress: null,
        decimals: b.decimals,
        rawBalance: b.balance,
        logoUrl: null,
        usdPrice: chainData.nativePriceUsdByChain[chain] ?? null,
      }
    }
    const metadata = chainData.tokenMetadataByKey[chainData.keyFor(chain, b.contract_address)]
    return {
      key: b.contract_address,
      symbol: metadata?.symbol ?? b.symbol,
      contractAddress: b.contract_address,
      decimals: metadata?.decimals ?? b.decimals,
      rawBalance: b.balance,
      logoUrl: metadata?.logo_url ?? null,
      usdPrice: metadata?.usd_price ?? null,
    }
  }).sort((a, b) => usdValueOf(b) - usdValueOf(a)),
)
const swapHeldTokens = computed<HeldToken[]>(() =>
  swapTokenOptions.value.map((t) => {
    const balance = Number(formatUnits(t.rawBalance, t.decimals))
    return {
      address: t.contractAddress,
      symbol: t.symbol,
      name: t.symbol,
      decimals: t.decimals,
      logoUrl: t.logoUrl,
      balance,
      usdValue: t.usdPrice != null ? balance * t.usdPrice : null,
    }
  }),
)

// Same lazy-metadata pattern as the Send tab's own watch above, but scoped to
// this fixed account rather than whichever one the Send tab's From selector
// currently points to.
watch(
  () => swapActivity.value?.balances ?? [],
  (balances) => {
    for (const b of balances) {
      if (!b.contract_address) continue
      const key = chainData.keyFor(chain, b.contract_address)
      if (!chainData.tokenMetadataByKey[key]) void chainData.loadTokenMetadata(chain, b.contract_address)
    }
  },
  { immediate: true },
)

const sellTokenPicked = ref<PickedToken | null>(null)
const buyTokenPicked = ref<PickedToken | null>(null)
const sellAmount = ref('')
const quote = ref<SwapQuote | null>(null)
const buyAmountFormatted = ref('')
const swapBusy = ref(false)
const swapReviewOpen = ref(false)
const swapReviewRows = ref<ReviewRow[]>([])

const sellTokenBalance = computed<number | null>(() => {
  const picked = sellTokenPicked.value
  if (!picked) return null
  const held = swapTokenOptions.value.find(
    (t) => (t.contractAddress?.toLowerCase() ?? null) === (picked.address?.toLowerCase() ?? null),
  )
  return held ? Number(formatUnits(held.rawBalance, held.decimals)) : 0
})

function applySellPercent(fraction: number) {
  const balance = sellTokenBalance.value
  if (balance === null) return
  sellAmount.value = (balance * fraction).toString()
}

async function setSellMax() {
  const picked = sellTokenPicked.value
  if (!picked) return
  if (picked.address !== null) {
    applySellPercent(1)
    return
  }
  const native = swapTokenOptions.value.find((t) => t.contractAddress === null)
  if (!native) return
  swapBusy.value = true
  try {
    // Same fee-reservation approach as the Send tab's own Max: estimate a
    // plain transfer's gas since the real swap gas cost isn't known until a
    // quote comes back, then leave that reserved out of the sellable amount.
    const prep = await api.transactionPrep(chain, address, address, '0')
    const feeWei = BigInt(prep.gas_price) * BigInt(prep.gas_limit)
    const balanceWei = BigInt(native.rawBalance)
    const valueWei = balanceWei > feeWei ? balanceWei - feeWei : 0n
    sellAmount.value = formatUnits(valueWei, native.decimals)
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    swapBusy.value = false
  }
}

const sameTokenSelected = computed(() => {
  if (!sellTokenPicked.value || !buyTokenPicked.value) return false
  return (
    (sellTokenPicked.value.address?.toLowerCase() ?? null) ===
    (buyTokenPicked.value.address?.toLowerCase() ?? null)
  )
})

const quoteFormValid = computed(
  () =>
    !!sellTokenPicked.value &&
    !!buyTokenPicked.value &&
    !sameTokenSelected.value &&
    Number(sellAmount.value) > 0,
)

function formatNativeFee(feeWei: bigint): { value: string; sub?: string } {
  const human = Number(formatUnits(feeWei, 18))
  const nativeStr = `${formatAmount(human)} ${chain === 'polygon' ? 'MATIC' : 'ETH'}`
  const priceUsd = chainData.nativePriceUsdByChain[chain]
  if (priceUsd === undefined) return { value: nativeStr }
  const fiat = formatFiat(
    convertUsd(human * priceUsd, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
  return { value: fiat, sub: nativeStr }
}

const quoteFeeText = computed(() => {
  if (!quote.value) return ''
  const fee = formatNativeFee(BigInt(quote.value.gas_price) * BigInt(quote.value.estimated_gas))
  return fee.sub ? `${fee.value} (${fee.sub})` : fee.value
})

// Aggregator/integrator fees, formatted in the token each is charged in. A
// fee token that is neither the sell nor buy token (shouldn't happen with
// 0x) falls back to the buy token's decimals/symbol rather than being hidden.
const quoteProtocolFees = computed(() => {
  const sell = sellTokenPicked.value
  const buy = buyTokenPicked.value
  if (!quote.value || !sell || !buy) return []
  return (quote.value.fees ?? []).map((f) => {
    const match = [sell, buy].find((tk) => (tk.address ?? NATIVE_PSEUDO_ADDRESS).toLowerCase() === f.token.toLowerCase()) ?? buy
    const amount = formatAmount(Number(formatUnits(f.amount, match.decimals)))
    return { kind: f.kind, text: `${amount} ${match.symbol}` }
  })
})

const sellAmountRules = [
  (v: string) => (!!v && Number(v) > 0) || t('validation.amountGreaterThanZero'),
]

async function getQuote() {
  const sell = sellTokenPicked.value
  const buy = buyTokenPicked.value
  if (!quoteFormValid.value || !sell || !buy) return
  swapBusy.value = true
  try {
    const sellTokenAddress = sell.address ?? NATIVE_PSEUDO_ADDRESS
    const buyTokenAddress = buy.address ?? NATIVE_PSEUDO_ADDRESS
    const sellAmountWei = parseUnits(sellAmount.value, sell.decimals).toString()
    quote.value = await api.swapQuote(chain, sellTokenAddress, buyTokenAddress, sellAmountWei, address)
    buyAmountFormatted.value = formatAmount(Number(formatUnits(quote.value.buy_amount, buy.decimals)))
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    swapBusy.value = false
  }
}

async function onSwapClick() {
  const sell = sellTokenPicked.value
  if (!account || !quote.value || !sell) return

  swapBusy.value = true
  try {
    if (sell.address !== null) {
      const { amount: currentAllowance } = await api.allowance(
        chain,
        sell.address,
        address,
        quote.value.allowance_target,
      )
      if (BigInt(currentAllowance) < BigInt(quote.value.sell_amount)) {
        const wallet = await unlockWalletForSigning(account)
        // Exactly what this swap needs, not an unlimited/infinite approval —
        // if the swap contract is ever compromised later, it can only ever
        // move up to this leftover amount, not the account's full balance.
        const approveData = encodeApprove(quote.value.allowance_target, quote.value.sell_amount)
        // The gas estimate has to be for the actual approve call, not a
        // bare value-less call to the token contract — passing no data here
        // previously estimated the wrong (and often reverting) operation.
        const approvePrep = await api.transactionPrep(chain, address, sell.address, '0', approveData)
        const approveTx = await wallet.signTransaction({
          to: sell.address,
          value: '0',
          data: approveData,
          nonce: approvePrep.nonce,
          gasLimit: approvePrep.gas_limit,
          gasPrice: approvePrep.gas_price,
          chainId: approvePrep.chain_id,
        })
        const { transaction_hash: approveHash } = await api.broadcastTransaction(chain, approveTx)
        const msgId = messages.push(t('msg.swap.approvalSubmitted'), 'info', -1)
        const approvalStatus = await waitForTransactionConfirmation(chain, approveHash)
        if (approvalStatus === 'failed') {
          messages.update(msgId, t('msg.swap.approvalFailed', { hash: approveHash }), 'error')
          return
        }
        if (approvalStatus === 'pending') {
          messages.update(msgId, t('msg.swap.approvalStillPending', { hash: approveHash }), 'warning')
          return
        }
        messages.update(msgId, t('msg.swap.approvalConfirmed'), 'success')
        // The approval transaction just spent some of this account's native
        // balance on its own gas — openSwapReview's insufficient-gas check
        // reads chainData's cached balance, which without this refresh would
        // still reflect the pre-approval amount, letting a swap through the
        // check that the real broadcast then rejects for insufficient funds.
        // The quote itself could also be a minute or more old by the time an
        // approval actually mines — re-fetch it so the review dialog and the
        // transaction actually signed reflect current market conditions
        // rather than a stale price.
        await Promise.all([chainData.loadAddressActivity(chain, address), getQuote()])
      }
    }

    openSwapReview()
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    swapBusy.value = false
  }
}

function openSwapReview() {
  if (!quote.value || !sellTokenPicked.value || !buyTokenPicked.value) return
  const feeWei = BigInt(quote.value.gas_price) * BigInt(quote.value.estimated_gas)

  // quote.value.value is only nonzero when selling native ETH (an ERC-20
  // sale attaches no value) — either way, the fee itself is always paid in
  // ETH regardless of what's being swapped, so both need covering.
  const requiredNativeWei = BigInt(quote.value.value) + feeWei
  const nativeBalance = chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances.find(
    (b) => b.contract_address === null,
  )
  if (nativeBalance && requiredNativeWei > BigInt(nativeBalance.balance)) {
    messages.push(t('validation.insufficientGas'), 'error')
    return
  }

  swapReviewRows.value = [
    { label: t('review.sell'), value: `${sellAmount.value} ${sellTokenPicked.value.symbol}` },
    { label: t('review.buy'), value: `${buyAmountFormatted.value} ${buyTokenPicked.value.symbol}` },
    { label: t('review.chain'), value: chain },
    { label: t('review.price'), value: quote.value.price },
    ...quoteProtocolFees.value.map((f) => ({ label: t(`review.${f.kind === 'zero_ex' ? 'swapFee' : 'integratorFee'}`), value: f.text })),
    { label: t('review.fee'), ...formatNativeFee(feeWei) },
  ]
  swapReviewOpen.value = true
}

async function confirmSwap() {
  if (!account || !quote.value) return

  swapBusy.value = true
  const msgId = messages.push(t('msg.swap.submitting'), 'info', -1)
  try {
    const wallet = await unlockWalletForSigning(account)
    // Must estimate gas for the actual swap call (to + data + value), not
    // just a bare value transfer to the router contract — the latter either
    // reverts outright (surfacing as a confusing 502) or, worse, succeeds
    // with a gas limit far too low for the real swap, which then fails
    // on-chain after broadcast.
    const prep = await api.transactionPrep(chain, address, quote.value.to, quote.value.value, quote.value.data)
    const signedTx = await wallet.signTransaction({
      to: quote.value.to,
      data: quote.value.data,
      value: quote.value.value,
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })
    const { transaction_hash } = await api.broadcastTransaction(chain, signedTx)
    swapReviewOpen.value = false
    swapBusy.value = false
    closePanel()

    messages.update(msgId, t('msg.swap.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(chain, transaction_hash)
    if (status === 'success') {
      messages.update(msgId, t('msg.swap.success', { hash: transaction_hash }), 'success')
    } else if (status === 'failed') {
      messages.update(msgId, t('msg.swap.failed', { hash: transaction_hash }), 'error')
    } else {
      messages.update(msgId, t('msg.swap.stillPending', { hash: transaction_hash }), 'warning')
    }
    void chainData.loadAddressActivity(chain, address)
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
    swapBusy.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-h5">{{ t('send.title') }}</h1>

    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="send">{{ t('send.tabSend') }}</v-tab>
      <v-tab value="swap">{{ t('send.tabSwap') }}</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item value="send">
        <v-card class="pa-4" max-width="480">
          <v-select v-model="sendFromAddress" :items="fromAccountOptions" item-title="title" item-value="address"
            :label="t('send.fromLabel')" />
          <v-form v-model="sendFormValid">
            <div class="d-flex align-center" style="gap: 0.5em">
              <v-select v-if="toMode === 'select'" v-model="toSelectedAddress" :items="toAccountOptions"
                item-title="title" item-value="address" :label="t('send.recipientLabel')" class="flex-grow-1" />
              <v-text-field v-else v-model="to" :label="t('send.recipientLabel')" :rules="addressRules"
                class="flex-grow-1" clearable @click:clear="clearScannedTo" />
              <AppTooltip :text="t('send.scanQrAria')">
                <template #default="{ activatorProps }">
                  <v-btn v-bind="activatorProps" icon="mdi-qrcode-scan" variant="tonal" density="comfortable"
                    :aria-label="t('send.scanQrAria')" @click="scannerOpen = true" />
                </template>
              </AppTooltip>
            </div>

            <v-select v-model="selectedTokenKey" :items="tokenOptions" item-title="symbol" item-value="key"
              :label="t('send.tokenLabel')" density="compact">
              <template #item="{ props: itemProps, item }">
                <v-list-item v-bind="itemProps">
                  <template #prepend>
                    <v-avatar v-if="item.logoUrl" :image="item.logoUrl" size="20" />
                    <v-icon v-else icon="mdi-cash" size="20" />
                  </template>
                </v-list-item>
              </template>
            </v-select>

            <v-text-field :model-value="amount" @update:model-value="onAmountInput" :label="amountFieldLabel"
              type="number" min="0" step="any" :rules="amountRules">
              <template #prepend-inner>
                <AppTooltip :text="t('send.toggleAmountUnitAria', { currency: settingsLocale.currency })">
                  <template #default="{ activatorProps }">
                    <a v-bind="activatorProps" href="#" class="text-body-2" @click.prevent="toggleAmountMode">
                      {{ unitSymbolDisplay }}
                    </a>
                  </template>
                </AppTooltip>
              </template>
              <template #append-inner>
                <a href="#" class="text-body-2" @click.prevent="setMaxAmount">{{
                  t('send.maxLabel')
                }}</a>
              </template>
            </v-text-field>

            <div class="d-flex mt-2" style="gap: 0.5em">
              <v-btn class="flex-grow-1" variant="text" @click="closePanel">{{
                t('common.cancel')
              }}</v-btn>
              <v-btn class="flex-grow-1" color="primary" :disabled="!sendFormValid" :loading="sendBusy"
                @click="openSendReview">{{
                  t('common.review') }}</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-window-item>

      <v-window-item value="swap">
        <v-card class="pa-4" max-width="480">
          <v-text-field :model-value="`${account?.label ?? ''} — ${truncateAddress(address)}`"
            :label="t('send.fromLabel')" readonly />

          <div class="d-flex align-center justify-space-between mt-4 mb-2">
            <span class="text-body-2 text-medium-emphasis">{{ t('swap.sellTokenLabel') }}</span>
            <TokenPickerField :chain="chain" :model-value="sellTokenPicked" :held-tokens="swapHeldTokens"
              :label="t('swap.selectToken')" @update:model-value="(picked) => (sellTokenPicked = picked)" />
          </div>
          <v-text-field v-model="sellAmount" :label="t('swap.sellAmountLabel')" type="number" min="0" step="any"
            :rules="sellAmountRules" />
          <div class="d-flex mb-4" style="gap: 0.5em">
            <v-btn size="small" variant="tonal" :disabled="!sellTokenPicked" @click="applySellPercent(0.25)">25%</v-btn>
            <v-btn size="small" variant="tonal" :disabled="!sellTokenPicked" @click="applySellPercent(0.5)">50%</v-btn>
            <v-btn size="small" variant="tonal" :disabled="!sellTokenPicked" @click="applySellPercent(0.75)">75%</v-btn>
            <v-btn size="small" variant="tonal" :disabled="!sellTokenPicked" :loading="swapBusy" @click="setSellMax">{{
              t('send.maxLabel') }}</v-btn>
          </div>

          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-body-2 text-medium-emphasis">{{ t('swap.buyTokenLabel') }}</span>
            <TokenPickerField :chain="chain" :model-value="buyTokenPicked" :held-tokens="swapHeldTokens"
              :label="t('swap.selectToken')" @update:model-value="(picked) => (buyTokenPicked = picked)" />
          </div>

          <p v-if="sameTokenSelected" class="text-caption text-error mb-4">
            {{ t('validation.sameTokenSwap') }}
          </p>

          <v-btn variant="outlined" block class="mb-4" :disabled="!quoteFormValid" :loading="swapBusy"
            @click="getQuote">{{
              t('swap.getQuote') }}</v-btn>

          <template v-if="quote">
            <v-alert type="info" variant="tonal" class="mb-4">
              {{ t('swap.estimateText', { amount: buyAmountFormatted, price: formatAmount(Number(quote.price)) }) }}
              <p v-for="f in quoteProtocolFees" :key="f.kind" class="text-body-2 mt-2 mb-0">
                {{ t(f.kind === 'zero_ex' ? 'swap.swapFee' : 'swap.integratorFee', { fee: f.text }) }}
              </p>
              <p class="text-body-2 mt-2 mb-0">{{ t('swap.estimatedFee', { fee: quoteFeeText }) }}</p>
              <p class="text-caption mt-2 mb-0">
                {{ t('swap.signingNotice', { address: truncateAddress(quote.to) }) }}
              </p>
            </v-alert>
            <v-btn color="primary" block :loading="swapBusy" @click="onSwapClick">{{
              t('swap.submit')
            }}</v-btn>
          </template>
        </v-card>
      </v-window-item>
    </v-window>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />

    <TransactionReviewDialog v-model="sendReviewOpen" :title="t('review.title')" :rows="sendReviewRows"
      :confirm-label="t('send.submit')" :busy="sendBusy" @confirm="confirmSend" />
    <TransactionReviewDialog v-model="swapReviewOpen" :title="t('review.title')" :rows="swapReviewRows"
      :confirm-label="t('swap.submit')" :busy="swapBusy" @confirm="confirmSwap" />

    <v-dialog v-model="addPayeeOpen" max-width="420" persistent>
      <v-card class="pa-4">
        <v-card-title>{{ t('send.addPayeeTitle') }}</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-3">{{ t('send.addPayeePrompt') }}</p>
          <v-text-field v-model="addPayeeLabel" :label="t('send.addPayeeLabelField')" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="skipAddPayee">{{ t('send.addPayeeSkip') }}</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="saveScannedPayee">{{ t('send.addPayeeSave') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
