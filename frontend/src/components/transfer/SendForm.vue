<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { formatUnits, parseUnits } from 'ethers'
import { api, type BridgeQuote, type ChainSlug, type Transaction, type TransactionPrep } from '@/services/api'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { encodeTransfer } from '@/services/erc20'
import { convertToUsd, convertUsd, currencySymbol, formatAmount, unitsToSignificant } from '@/services/money'
import { truncateAddress } from '@/services/format'
import { addressDisplayLabel } from '@/services/addressLabel'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import { displayErrorMessage } from '@/services/errors'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { useHeldTokens } from '@/composables/useHeldTokens'
import { useAutoQuote } from '@/composables/useAutoQuote'
import { NATIVE_PSEUDO_ADDRESS, useTransferContext } from '@/composables/useTransferContext'
import QrScannerDialog from '@/components/QrScannerDialog.vue'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import TokenPickerField, { type PickedToken } from '@/components/TokenPickerField.vue'
import ChainSelect from '@/components/transfer/ChainSelect.vue'
import PartySelect from '@/components/transfer/PartySelect.vue'
import RouteSummary, { type SummaryRow } from '@/components/transfer/RouteSummary.vue'

const props = defineProps<{
  fromAddress: string
  fromChain: ChainSlug
  /** Prefilled recipient, e.g. from the drag-to-transfer gesture. */
  initialTo?: string | null
}>()
const emit = defineEmits<{
  'update:fromAddress': [string]
  'update:fromChain': [ChainSlug]
  close: []
}>()

const ctx = useTransferContext()
const { t, locale, chainData, messages, settingsLocale, payees } = ctx

const fromAccount = computed(() => ctx.accountOn(props.fromChain, props.fromAddress))
const held = useHeldTokens(toRef(props, 'fromChain'), toRef(props, 'fromAddress'))

/* ------------------------------ Recipient ------------------------------- */

const toAddress = ref<string | null>(props.initialTo ?? null)
const toChain = ref<ChainSlug>(props.fromChain)
// Only a scanned or typed address that isn't already saved is offered as a
// new payee after sending.
const toIsNew = ref(false)
const scannerOpen = ref(false)

// The destination follows the source until it's deliberately set apart —
// switching From to another chain shouldn't silently turn a plain send
// into a bridge.
function setFromChain(next: ChainSlug) {
  if (toChain.value === props.fromChain) toChain.value = next
  emit('update:fromChain', next)
}

const recipientOptions = computed(() => [...ctx.ownAccountOptions.value, ...ctx.payeeOptions.value])

function onRecipient(address: string | null) {
  toAddress.value = address
  if (!address) return
  const known = recipientOptions.value.some((o) => o.address.toLowerCase() === address.toLowerCase())
  toIsNew.value = !known
  // An own account goes to a chain it's set up on — this one if it can, so
  // a plain send stays plain. A payee was saved on a particular chain —
  // that's where they're known to receive.
  const ownChains = ctx.chainsOf(address)
  if (ownChains.length) {
    if (!ownChains.includes(toChain.value)) toChain.value = ownChains.includes(props.fromChain) ? props.fromChain : ownChains[0]!
    return
  }
  const savedOn = ctx.payeeChain(address)
  if (savedOn) toChain.value = savedOn
}

/** Handles both a bare address and an EIP-681 "ethereum:0x...@chainId" URI. */
function onQrDecoded(data: string) {
  const match = data.match(/0x[a-fA-F0-9]{40}/)
  if (!match) {
    messages.push(t('msg.qr.noAddress'), 'warning')
    return
  }
  onRecipient(match[0])
}

const isBridge = computed(() => toChain.value !== props.fromChain)
const recipientIsSelf = computed(() => toAddress.value?.toLowerCase() === props.fromAddress.toLowerCase())

const recipientError = computed(() => {
  if (!toAddress.value) return null
  if (!isValidAddress(toAddress.value)) return t('validation.invalidRecipientAddress')
  if (recipientIsSelf.value && !isBridge.value) return t('transfer.sameAccountSameChain')
  return null
})

// Sending to a payee somewhere other than where they were saved: fine for
// an ordinary wallet, a loss for an exchange deposit address that only
// watches one chain — worth saying, not worth blocking.
const payeeChainWarning = computed(() => {
  if (!toAddress.value) return null
  const savedOn = ctx.payeeChain(toAddress.value)
  if (!savedOn || savedOn === toChain.value || ctx.accountOn(toChain.value, toAddress.value)) return null
  return t('transfer.payeeOtherChain', {
    saved: NATIVE_ASSETS[savedOn].networkName,
    network: NATIVE_ASSETS[toChain.value].networkName,
  })
})

/* -------------------------------- Amount -------------------------------- */

const selectedTokenKey = ref('native')
const selectedToken = computed(
  () => held.options.value.find((tok) => tok.key === selectedTokenKey.value) ?? held.options.value[0] ?? null,
)
const pickedToken = computed<PickedToken | null>(() =>
  selectedToken.value
    ? {
      address: selectedToken.value.contractAddress,
      symbol: selectedToken.value.symbol,
      name: selectedToken.value.symbol,
      decimals: selectedToken.value.decimals,
      logoUrl: selectedToken.value.logoUrl,
    }
    : null,
)

function onTokenPicked(picked: PickedToken) {
  selectedTokenKey.value = picked.address ?? 'native'
  sendMaxIntent.value = false
  exactWei.value = null
}

const amount = ref('')
const amountMode = ref<'token' | 'fiat'>('token')
// Set by Max, cleared on any manual edit or token change. A native send with
// this set recomputes its value from a fresh fee estimate right before
// building the transaction, instead of reusing the number Max displayed —
// that came from an earlier, separate prep call, and gas price drifting
// between the two (however slightly) is exactly what "insufficient funds
// for gas * price + value" off by a tiny amount means.
const sendMaxIntent = ref(false)
// Set by the percentage chips and Max: the exact amount picked, while the
// field shows it cut to a readable number of digits. Cleared by typing.
const exactWei = ref<string | null>(null)
const busy = ref(false)

// A picked amount was a share of the old source's balance.
watch(
  () => [props.fromChain, props.fromAddress],
  () => {
    exactWei.value = null
    sendMaxIntent.value = false
  },
)

function onAmountInput(value: string) {
  amount.value = value.replace(',', '.')
  sendMaxIntent.value = false
  exactWei.value = null
}

const tokenUnitsAmount = computed<number | null>(() => {
  if (!amount.value) return null
  const num = Number(amount.value)
  if (Number.isNaN(num)) return null
  if (amountMode.value === 'token') return num
  const price = selectedToken.value?.usdPrice ?? null
  if (!price) return null
  return convertToUsd(num, settingsLocale.currency, chainData.fxRates) / price
})
const tokenBalance = computed(() => {
  const tok = selectedToken.value
  return tok ? Number(formatUnits(tok.rawBalance, tok.decimals)) : null
})

/** Raw units of what's typed, or null while it isn't a usable amount. */
const amountWei = computed<string | null>(() => {
  const tok = selectedToken.value
  const human = tokenUnitsAmount.value
  if (!tok || human === null || human <= 0) return null
  if (exactWei.value !== null) return exactWei.value
  try {
    // Typed in token units: parse the text itself, not a float round-trip of it.
    const text = amountMode.value === 'token' ? trimDecimals(amount.value, tok.decimals) : human.toFixed(tok.decimals)
    return parseUnits(text, tok.decimals).toString()
  } catch {
    return null
  }
})

function trimDecimals(text: string, decimals: number): string {
  const [whole, frac = ''] = text.trim().split('.')
  return frac ? `${whole || '0'}.${frac.slice(0, decimals)}` : whole || '0'
}

const amountError = computed(() => {
  if (!amount.value) return null
  if (tokenUnitsAmount.value === null || tokenUnitsAmount.value <= 0) return t('validation.amountGreaterThanZero')
  if (tokenBalance.value !== null && tokenUnitsAmount.value > tokenBalance.value) return t('validation.insufficientBalance')
  return null
})

// ETH's conventional single-glyph symbol, the way '$'/'€' represent a fiat
// currency — no other token has one, so those show their plain code.
const ETH_SYMBOL_GLYPH = 'Ξ'
const unitSymbol = computed(() => {
  if (amountMode.value === 'fiat') return currencySymbol(settingsLocale.currency, locale.value)
  const symbol = selectedToken.value?.symbol ?? ''
  return symbol.toUpperCase() === 'ETH' ? ETH_SYMBOL_GLYPH : symbol
})

/** The other unit's reading of what's typed — fiat under a token amount, and vice versa. */
const equivalentText = computed(() => {
  const tok = selectedToken.value
  const human = tokenUnitsAmount.value ?? 0
  if (amountMode.value === 'fiat') return `${formatAmount(human)} ${tok?.symbol ?? ''}`
  if (tok?.usdPrice == null) return t('transfer.noPrice')
  return ctx.fiat(human * tok.usdPrice)
})

function toggleAmountMode() {
  const price = selectedToken.value?.usdPrice ?? null
  if (!price) return
  const current = Number(amount.value)
  if (amount.value && !Number.isNaN(current) && current > 0) {
    amount.value =
      amountMode.value === 'token'
        ? convertUsd(current * price, settingsLocale.currency, chainData.fxRates).toFixed(2)
        : (convertToUsd(current, settingsLocale.currency, chainData.fxRates) / price).toFixed(6)
  }
  amountMode.value = amountMode.value === 'token' ? 'fiat' : 'token'
}

/** Picks an exact raw amount, shown readably in whichever unit is being typed in. */
function setPickedAmount(wei: bigint) {
  const tok = selectedToken.value!
  const tokenAmount = unitsToSignificant(wei, tok.decimals)
  const price = tok.usdPrice
  amount.value =
    amountMode.value === 'fiat' && price != null
      ? convertUsd(Number(tokenAmount) * price, settingsLocale.currency, chainData.fxRates).toFixed(2)
      : tokenAmount
  exactWei.value = wei.toString()
}

function applyPercent(fraction: number) {
  const tok = selectedToken.value
  if (!tok) return
  setPickedAmount((BigInt(tok.rawBalance) * BigInt(Math.round(fraction * 100))) / 100n)
  sendMaxIntent.value = false
}

/** Network fee (wei) to hold back from a max native send. */
async function feeReserveWei(): Promise<bigint> {
  const tok = selectedToken.value!
  const to = toAddress.value && isValidAddress(toAddress.value) ? toAddress.value : props.fromAddress
  if (!isBridge.value) {
    const prep = await api.transactionPrep(props.fromChain, props.fromAddress, to, '0')
    return BigInt(prep.gas_price) * BigInt(prep.gas_limit)
  }
  // A bridge call costs far more gas than a plain transfer and isn't known
  // until quoted — so quote the near-full balance once and keep its gas
  // (plus headroom for drift, and any fee charged on top) back.
  const probe = (BigInt(tok.rawBalance) * 9n) / 10n
  const quote = await api.bridgeQuote({
    fromChain: props.fromChain,
    toChain: toChain.value,
    fromToken: NATIVE_PSEUDO_ADDRESS,
    toToken: destinationToken.value!,
    fromAmountWei: probe.toString(),
    fromAddress: props.fromAddress,
    toAddress: to,
  })
  const gas = (BigInt(quote.gas_price) * BigInt(quote.gas_limit) * 12n) / 10n
  return gas + (BigInt(quote.value) - BigInt(quote.from_amount))
}

async function setMaxAmount() {
  const tok = selectedToken.value
  if (!tok) return
  if (tok.contractAddress !== null) {
    setPickedAmount(BigInt(tok.rawBalance))
    sendMaxIntent.value = true
    return
  }
  busy.value = true
  try {
    const reserve = await feeReserveWei()
    const balance = BigInt(tok.rawBalance)
    setPickedAmount(balance > reserve ? balance - reserve : 0n)
    // A preview only — see sendMaxIntent's declaration.
    sendMaxIntent.value = !isBridge.value
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

/* ------------------------- Fee estimate / quote ------------------------- */

const formReady = computed(
  () => !!fromAccount.value && !!selectedToken.value && !!toAddress.value && !recipientError.value &&
    !amountError.value && amountWei.value !== null,
)

// The same token on the destination chain, named by symbol for the bridge
// aggregator to resolve: native ETH stays native wherever ETH is native,
// and becomes WETH on Polygon (whose native coin is POL).
const destinationToken = computed<string | null>(() => {
  const tok = selectedToken.value
  if (!tok) return null
  if (tok.contractAddress !== null) return tok.symbol
  if (NATIVE_ASSETS[toChain.value].symbol === tok.symbol) return NATIVE_PSEUDO_ADDRESS
  return tok.symbol === 'ETH' ? 'WETH' : tok.symbol
})

function transferCall(to: string, tok: { contractAddress: string | null }, wei: string) {
  return tok.contractAddress === null
    ? { to, value: wei, data: undefined }
    : { to: tok.contractAddress, value: '0', data: encodeTransfer(to, wei) }
}

const feeEstimate = useAutoQuote(
  () =>
    formReady.value && !isBridge.value
      ? { chain: props.fromChain, from: props.fromAddress, to: toAddress.value!, token: selectedToken.value!.contractAddress, wei: amountWei.value! }
      : null,
  (p) => {
    // Gas for a plain native transfer doesn't depend on its value — estimated
    // at 0 so a max send's (fee-inclusive) value can't make the estimate fail.
    const call = transferCall(p.to, { contractAddress: p.token }, p.token === null ? '0' : p.wei)
    return api.transactionPrep(p.chain, p.from, call.to, call.value, call.data)
  },
)

const bridgeQuote = useAutoQuote(
  () =>
    formReady.value && isBridge.value && destinationToken.value
      ? {
        fromChain: props.fromChain,
        toChain: toChain.value,
        fromToken: selectedToken.value!.contractAddress ?? NATIVE_PSEUDO_ADDRESS,
        toToken: destinationToken.value,
        fromAmountWei: amountWei.value!,
        fromAddress: props.fromAddress,
        toAddress: toAddress.value!,
      }
      : null,
  (p) => api.bridgeQuote(p),
)

function feeWeiOf(prep: { gas_price: string; gas_limit: string }): bigint {
  return BigInt(prep.gas_price) * BigInt(prep.gas_limit)
}

/** Fiat, with the token amount after it — "(…)" never wraps apart from it. */
function tokenAmountRow(human: number, symbol: string, usdPrice: number | null) {
  const native = `${formatAmount(human)} ${symbol}`
  return usdPrice == null ? { value: native } : { value: native, sub: `(≈ ${ctx.fiat(human * usdPrice)})` }
}

function bridgeFeeTotals(quote: BridgeQuote) {
  const usd = quote.fees.reduce((sum, f) => sum + (f.amount_usd ?? 0), 0)
  const lines = quote.fees.map((f) => {
    const amt = `${formatAmount(Number(formatUnits(f.amount, f.decimals)))} ${f.symbol}`
    return `${f.name}: ${amt}${f.amount_usd != null ? ` (≈ ${ctx.fiatFee(f.amount_usd)})` : ''}`
  })
  return { usd, tooltip: lines.join(' · ') }
}

const summaryRows = computed<SummaryRow[]>(() => {
  const tok = selectedToken.value
  const human = tokenUnitsAmount.value
  if (!tok || human === null || !formReady.value) return []
  const rows: SummaryRow[] = [
    { key: 'send', icon: 'mdi-arrow-top-right', label: t('transfer.youSend'), ...tokenAmountRow(human, tok.symbol, tok.usdPrice) },
  ]
  if (!isBridge.value) {
    const prep = feeEstimate.quote.value
    if (!prep) return rows
    const fee = ctx.nativeFeeText(props.fromChain, feeWeiOf(prep))
    rows.push({ key: 'fee', icon: 'mdi-gas-station-outline', label: t('transfer.networkFee'), value: fee.native, sub: fee.fiat ? `(≈ ${fee.fiat})` : undefined })
    rows.push({ key: 'eta', icon: 'mdi-clock-outline', label: t('transfer.arrives'), value: t('transfer.etaNextBlock') })
    return rows
  }
  const quote = bridgeQuote.quote.value
  if (!quote) return rows
  const toHuman = Number(formatUnits(quote.to_amount, quote.to_token.decimals))
  const minHuman = Number(formatUnits(quote.to_amount_min, quote.to_token.decimals))
  const fees = bridgeFeeTotals(quote)
  const gas = ctx.nativeFeeText(props.fromChain, feeWeiOf(quote))
  rows.push(
    { key: 'gets', icon: 'mdi-arrow-bottom-left', label: t('transfer.recipientGets'), emphasis: true, ...tokenAmountRow(toHuman, quote.to_token.symbol, quote.to_token.usd_price) },
    { key: 'min', icon: 'mdi-shield-check-outline', label: t('transfer.minReceived'), value: `${formatAmount(minHuman)} ${quote.to_token.symbol}`, tooltip: t('transfer.minReceivedHint') },
    { key: 'bridgeFee', icon: 'mdi-bridge', label: t('transfer.bridgeFees'), value: ctx.fiatFee(fees.usd), tooltip: fees.tooltip || undefined },
    { key: 'fee', icon: 'mdi-gas-station-outline', label: t('transfer.networkFee'), value: gas.native, sub: gas.fiat ? `(≈ ${gas.fiat})` : undefined },
    { key: 'eta', icon: 'mdi-clock-outline', label: t('transfer.arrives'), value: ctx.durationText(quote.execution_duration_secs) },
  )
  return rows
})

/** What lands on the other side, for the To card. */
const receiveText = computed(() => {
  const tok = selectedToken.value
  const human = tokenUnitsAmount.value
  if (!tok || human === null || human <= 0) return null
  if (!isBridge.value) return { amount: formatAmount(human), symbol: tok.symbol, logoUrl: tok.logoUrl, approx: false }
  const quote = bridgeQuote.quote.value
  if (!quote) return null
  return {
    amount: formatAmount(Number(formatUnits(quote.to_amount, quote.to_token.decimals))),
    symbol: quote.to_token.symbol,
    logoUrl: quote.to_token.logo_url,
    approx: true,
  }
})

const quoteLoading = computed(() => (isBridge.value ? bridgeQuote.loading.value : feeEstimate.loading.value))
const quoteError = computed(() => {
  if (!isBridge.value) return feeEstimate.error.value
  if (bridgeQuote.errorCode.value === 'token_not_on_chain') {
    return t('transfer.tokenNotOnChain', { symbol: selectedToken.value?.symbol ?? '', network: NATIVE_ASSETS[toChain.value].networkName })
  }
  return bridgeQuote.error.value
})
const canReview = computed(() => formReady.value && !quoteLoading.value && !quoteError.value && !busy.value)

const placeholder = computed(() => {
  if (!toAddress.value) return t('transfer.placeholderRecipient')
  return t('transfer.placeholderAmount')
})

/* -------------------------------- Review -------------------------------- */

const reviewOpen = ref(false)
const reviewRows = ref<ReviewRow[]>([])
const prepared = ref<
  | { kind: 'direct'; prep: TransactionPrep; to: string; value: string; data?: string; humanAmount: number }
  | { kind: 'bridge'; quote: BridgeQuote }
  | null
>(null)

function nativeRow(wei: bigint) {
  const fee = ctx.nativeFeeText(props.fromChain, wei)
  return { value: fee.native, sub: fee.fiat ? `≈ ${fee.fiat}` : undefined }
}

function hasGasFor(requiredNativeWei: bigint): boolean {
  const native = held.native.value
  if (native && requiredNativeWei > BigInt(native.rawBalance)) {
    messages.push(t('validation.insufficientGas', { symbol: NATIVE_ASSETS[props.fromChain].symbol }), 'error')
    return false
  }
  return true
}

async function openReview() {
  const tok = selectedToken.value
  const account = fromAccount.value
  const to = toAddress.value
  if (!canReview.value || !tok || !account || !to || amountWei.value === null) return
  busy.value = true
  try {
    const baseRows: ReviewRow[] = [
      { label: t('review.from'), value: addressDisplayLabel(props.fromChain, props.fromAddress), sub: NATIVE_ASSETS[props.fromChain].networkName },
      { label: t('review.to'), value: addressDisplayLabel(toChain.value, to), sub: NATIVE_ASSETS[toChain.value].networkName },
    ]
    if (!isBridge.value) {
      let wei = amountWei.value
      let prep: TransactionPrep
      if (tok.contractAddress === null && sendMaxIntent.value) {
        // Fee from THIS call, so it can never drift from what's signed.
        prep = await api.transactionPrep(props.fromChain, props.fromAddress, to, '0')
        const balance = BigInt(tok.rawBalance)
        const fee = feeWeiOf(prep)
        wei = (balance > fee ? balance - fee : 0n).toString()
      } else {
        const call = transferCall(to, tok, wei)
        prep = await api.transactionPrep(props.fromChain, props.fromAddress, call.to, call.value, call.data)
      }
      const call = transferCall(to, tok, wei)
      const fee = feeWeiOf(prep)
      // Gas is paid in the native coin whatever's being sent — an ERC-20 send
      // with plenty of token but no ETH would otherwise only fail at broadcast.
      if (!hasGasFor(tok.contractAddress === null ? BigInt(wei) + fee : fee)) return
      const humanAmount = Number(formatUnits(wei, tok.decimals))
      prepared.value = { kind: 'direct', prep, ...call, humanAmount }
      const rows: ReviewRow[] = [
        ...baseRows,
        { label: t('review.amount'), ...reviewAmount(humanAmount, tok.symbol, tok.usdPrice) },
        { label: t('review.fee'), ...nativeRow(fee) },
      ]
      // Amount + fee is one "total" only when they're the same asset.
      if (tok.contractAddress === null) rows.push({ label: t('review.total'), bold: true, ...nativeRow(BigInt(wei) + fee) })
      reviewRows.value = rows
    } else {
      const quote = await bridgeQuote.fresh()
      if (!quote) return
      const gasWei = feeWeiOf(quote)
      if (!hasGasFor(BigInt(quote.value) + gasWei)) return
      prepared.value = { kind: 'bridge', quote }
      const fees = bridgeFeeTotals(quote)
      const toHuman = Number(formatUnits(quote.to_amount, quote.to_token.decimals))
      const minHuman = Number(formatUnits(quote.to_amount_min, quote.to_token.decimals))
      reviewRows.value = [
        ...baseRows,
        { label: t('review.amount'), ...reviewAmount(tokenUnitsAmount.value ?? 0, tok.symbol, tok.usdPrice) },
        { label: t('transfer.recipientGets'), bold: true, ...reviewAmount(toHuman, quote.to_token.symbol, quote.to_token.usd_price) },
        { label: t('transfer.minReceived'), value: `${formatAmount(minHuman)} ${quote.to_token.symbol}` },
        { label: t('transfer.bridgeFees'), value: ctx.fiatFee(fees.usd), sub: quote.tool },
        { label: t('review.fee'), ...nativeRow(gasWei) },
        { label: t('transfer.arrives'), value: ctx.durationText(quote.execution_duration_secs) },
      ]
    }
    reviewOpen.value = true
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

function reviewAmount(human: number, symbol: string, usdPrice: number | null) {
  const native = `${formatAmount(human)} ${symbol}`
  return usdPrice == null ? { value: native } : { value: ctx.fiat(human * usdPrice), sub: native }
}

/* -------------------------------- Submit -------------------------------- */

const addPayeeOpen = ref(false)
const addPayeeLabel = ref('')

function pendingTxn(hash: string, to: string, humanAmount: number): Transaction {
  const tok = selectedToken.value!
  return {
    hash,
    from: props.fromAddress,
    to,
    value: humanAmount.toString(),
    asset: tok.symbol,
    contract_address: tok.contractAddress,
    block_number: null,
    timestamp: null,
    status: 'pending',
    counter_asset: null,
    counter_value: null,
    counter_contract_address: null,
  }
}

function finish() {
  const to = toAddress.value!
  const alreadyPayee = payees.payees.some((p) => p.address.toLowerCase() === to.toLowerCase())
  const own = ctx.ownAccountOptions.value.some((o) => o.address.toLowerCase() === to.toLowerCase())
  if (toIsNew.value && !alreadyPayee && !own) {
    addPayeeLabel.value = ''
    addPayeeOpen.value = true
  } else {
    emit('close')
  }
}

async function confirm() {
  const account = fromAccount.value
  const plan = prepared.value
  const to = toAddress.value
  if (!account || !plan || !to) return
  const txChain = props.fromChain
  const destChain = toChain.value

  busy.value = true
  const msgId = messages.push(t('msg.send.submitting'), 'info', -1)
  try {
    if (plan.kind === 'direct') {
      const wallet = await unlockWalletForSigning(account)
      const signed = await wallet.signTransaction({
        to: plan.to,
        value: plan.value,
        ...(plan.data ? { data: plan.data } : {}),
        nonce: plan.prep.nonce,
        gasLimit: plan.prep.gas_limit,
        gasPrice: plan.prep.gas_price,
        chainId: plan.prep.chain_id,
      })
      const { transaction_hash: hash } = await api.broadcastTransaction(txChain, signed)
      reviewOpen.value = false
      busy.value = false

      // Indexers only report a transaction once it's mined — inserted
      // locally (on both ends for an own account) so it shows as pending now.
      const toOwn = !!ctx.accountOn(txChain, to)
      const txn = pendingTxn(hash, to, plan.humanAmount)
      chainData.prependTransaction(txChain, props.fromAddress, txn)
      if (toOwn) chainData.prependTransaction(txChain, to, txn)
      finish()

      messages.update(msgId, t('msg.send.waiting'), 'info', -1)
      const status = await waitForTransactionConfirmation(txChain, hash)
      if (status === 'success') messages.update(msgId, t('msg.send.success', { hash }), 'success')
      else if (status === 'failed') messages.update(msgId, t('msg.send.failed', { hash }), 'error')
      else messages.update(msgId, t('msg.send.stillPending', { hash }), 'warning')
      // Refreshed whatever the outcome — a failed send still spent gas.
      chainData.loadAddressActivity(txChain, props.fromAddress).catch(() => {})
      if (toOwn) chainData.loadAddressActivity(txChain, to).catch(() => {})
      return
    }

    let quote = plan.quote
    if (quote.approval_address) {
      const approved = await ctx.ensureAllowance(account, selectedToken.value!.contractAddress!, quote.approval_address, quote.from_amount)
      if (!approved) {
        busy.value = false
        messages.dismiss(msgId)
        return
      }
      // An approval can take a minute to mine; the route's price may have moved.
      quote = (await bridgeQuote.refresh()) ?? quote
    }
    const hash = await ctx.signAndBroadcast(account, quote)
    reviewOpen.value = false
    busy.value = false
    chainData.prependTransaction(txChain, props.fromAddress, pendingTxn(hash, to, Number(formatUnits(quote.from_amount, quote.from_token.decimals))))
    finish()
    await ctx.trackBridge(msgId, { hash, source: account, toChain: destChain, toAddress: to, etaSecs: quote.execution_duration_secs })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
    busy.value = false
  }
}

async function saveNewPayee() {
  const to = toAddress.value!.trim()
  await payees.addPayee({
    id: crypto.randomUUID(),
    label: addPayeeLabel.value.trim() || truncateAddress(to),
    address: to,
    chain: toChain.value,
  })
  addPayeeOpen.value = false
  emit('close')
}

function skipAddPayee() {
  addPayeeOpen.value = false
  emit('close')
}

function onFromAddress(address: string | null) {
  if (!address) return
  emit('update:fromAddress', address)
  const chains = ctx.chainsOf(address)
  if (!chains.includes(props.fromChain) && chains[0]) setFromChain(chains[0])
}

const signingNotice = computed(() => {
  const quote = bridgeQuote.quote.value
  return isBridge.value && quote ? t('transfer.bridgeSigningNotice', { address: truncateAddress(quote.to) }) : null
})
</script>

<template>
  <div class="xfer-layout">
    <div class="xfer-legs">
      <section class="xfer-leg" :aria-label="t('send.fromLabel')">
        <header class="xfer-leg-head">
          <span class="xfer-leg-label">{{ t('send.fromLabel') }}</span>
          <div class="xfer-party-group">
            <PartySelect :model-value="fromAddress" :options="ctx.ownAccountOptions.value" :label="t('send.fromLabel')"
              :placeholder="t('transfer.chooseAccount')" @update:model-value="onFromAddress" />
            <ChainSelect :model-value="fromChain" :options="ctx.ownChainOptions(fromAddress)"
              :label="t('transfer.fromNetwork')" @update:model-value="setFromChain" />
          </div>
        </header>

        <div class="xfer-amount-row">
          <AppTooltip :text="t('send.toggleAmountUnitAria', { currency: settingsLocale.currency })">
            <template #default="{ activatorProps }">
              <button v-bind="activatorProps" type="button" class="xfer-unit" :disabled="selectedToken?.usdPrice == null"
                :aria-label="t('send.toggleAmountUnitAria', { currency: settingsLocale.currency })" @click="toggleAmountMode">
                {{ unitSymbol }}
              </button>
            </template>
          </AppTooltip>
          <input class="xfer-amount-input" :class="{ 'xfer-amount-input--error': amountError }" :value="amount"
            inputmode="decimal" autocomplete="off" placeholder="0"
            :aria-label="t('send.amountInLabel', { unit: amountMode === 'token' ? (selectedToken?.symbol ?? '') : settingsLocale.currency })"
            @input="onAmountInput(($event.target as HTMLInputElement).value)" />
          <TokenPickerField compact held-only :chain="fromChain" :model-value="pickedToken" :held-tokens="held.heldTokens.value"
            :label="t('send.tokenLabel')" @update:model-value="onTokenPicked" />
        </div>

        <div class="xfer-leg-foot">
          <button type="button" class="xfer-equiv" :disabled="selectedToken?.usdPrice == null" @click="toggleAmountMode">
            <v-icon icon="mdi-swap-vertical" size="14" />
            <span>≈ {{ equivalentText }}</span>
          </button>
          <div class="xfer-quick">
            <span v-if="tokenBalance !== null" class="xfer-balance">
              <v-icon icon="mdi-wallet-outline" size="14" />
              {{ formatAmount(tokenBalance) }}
            </span>
            <button type="button" class="xfer-chip" :disabled="!selectedToken" @click="applyPercent(0.25)">25%</button>
            <button type="button" class="xfer-chip" :disabled="!selectedToken" @click="applyPercent(0.5)">50%</button>
            <button type="button" class="xfer-chip xfer-chip--max" :disabled="!selectedToken || busy" @click="setMaxAmount">
              {{ t('send.maxLabel') }}
            </button>
          </div>
        </div>
        <p v-if="amountError" class="xfer-field-error">{{ amountError }}</p>
      </section>

      <div class="xfer-divider" aria-hidden="true">
        <span class="xfer-divider-icon" :class="{ 'xfer-divider-icon--bridge': isBridge }">
          <v-icon :icon="isBridge ? 'mdi-bridge' : 'mdi-arrow-down'" size="18" />
        </span>
      </div>

      <section class="xfer-leg xfer-leg--to" :aria-label="t('review.to')">
        <header class="xfer-leg-head">
          <span class="xfer-leg-label">{{ t('review.to') }}</span>
          <div class="xfer-party-group">
            <PartySelect allow-manual :model-value="toAddress" :options="recipientOptions" :label="t('review.to')"
              :placeholder="t('transfer.chooseRecipient')" @update:model-value="onRecipient" />
            <ChainSelect v-model="toChain" :options="ctx.anyChainOptions(toAddress)" :label="t('transfer.toNetwork')" />
          </div>
          <AppTooltip :text="t('send.scanQrAria')">
            <template #default="{ activatorProps }">
              <v-btn v-bind="activatorProps" icon="mdi-qrcode-scan" variant="text" size="small" density="comfortable"
                class="ml-auto" :aria-label="t('send.scanQrAria')" @click="scannerOpen = true" />
            </template>
          </AppTooltip>
        </header>

        <div class="xfer-receive">
          <span class="xfer-receive-label">{{ t('transfer.recipientGets') }}</span>
          <div class="xfer-receive-value">
            <template v-if="receiveText">
              <span class="xfer-receive-amount">{{ receiveText.approx ? '≈ ' : '' }}{{ receiveText.amount }}</span>
              <span class="xfer-receive-token">
                <v-avatar v-if="receiveText.logoUrl" :image="receiveText.logoUrl" size="20" />
                {{ receiveText.symbol }}
              </span>
            </template>
            <v-progress-circular v-else-if="bridgeQuote.loading.value" indeterminate size="20" width="2" color="primary" />
            <span v-else class="xfer-receive-amount xfer-receive-amount--empty">—</span>
          </div>
        </div>
        <p v-if="recipientError" class="xfer-field-error">{{ recipientError }}</p>
        <p v-else-if="isBridge && bridgeQuote.errorCode.value === 'token_not_on_chain'" class="xfer-field-error">
          <v-icon icon="mdi-alert-circle-outline" size="16" /> {{ quoteError }}
        </p>
        <p v-else-if="payeeChainWarning" class="xfer-field-warning">
          <v-icon icon="mdi-alert-outline" size="16" /> {{ payeeChainWarning }}
        </p>
        <p v-else-if="isBridge && recipientIsSelf" class="xfer-field-hint">
          <v-icon icon="mdi-information-outline" size="16" /> {{ t('transfer.movingOwnFunds', { network: NATIVE_ASSETS[toChain].networkName }) }}
        </p>
      </section>
    </div>

    <RouteSummary :from-chain="fromChain" :to-chain="toChain" :via="isBridge ? (bridgeQuote.quote.value?.tool ?? null) : null"
      :via-logo-url="isBridge ? bridgeQuote.quote.value?.tool_logo_url : null" :rows="summaryRows" :loading="quoteLoading"
      :error="quoteError" :placeholder="placeholder">
      <p v-if="signingNotice" class="route-summary-notice">{{ signingNotice }}</p>
      <template #actions>
        <v-btn variant="text" size="large" @click="emit('close')">{{ t('common.cancel') }}</v-btn>
        <v-btn color="primary" size="large" class="flex-grow-1" :disabled="!canReview" :loading="busy" @click="openReview">
          {{ isBridge ? t('transfer.reviewBridge') : t('common.review') }}
        </v-btn>
      </template>
    </RouteSummary>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />
    <TransactionReviewDialog v-model="reviewOpen" :title="t('review.title')" :rows="reviewRows"
      :confirm-label="isBridge ? t('transfer.submitBridge') : t('send.submit')" :busy="busy" @confirm="confirm" />

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
          <v-btn color="primary" @click="saveNewPayee">{{ t('send.addPayeeSave') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
