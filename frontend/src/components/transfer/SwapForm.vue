<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { formatUnits, parseUnits } from 'ethers'
import { api, type BridgeQuote, type ChainSlug, type SwapQuote, type Transaction } from '@/services/api'
import { formatAmount, unitsToSignificant } from '@/services/money'
import { truncateAddress } from '@/services/format'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import { displayErrorMessage } from '@/services/errors'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { useHeldTokens } from '@/composables/useHeldTokens'
import { useAutoQuote } from '@/composables/useAutoQuote'
import { NATIVE_PSEUDO_ADDRESS, useTransferContext } from '@/composables/useTransferContext'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import TokenPickerField, { type HeldToken, type PickedToken } from '@/components/TokenPickerField.vue'
import ChainSelect from '@/components/transfer/ChainSelect.vue'
import PartySelect from '@/components/transfer/PartySelect.vue'
import RouteSummary, { type SummaryRow } from '@/components/transfer/RouteSummary.vue'

const props = defineProps<{ fromAddress: string; fromChain: ChainSlug }>()
const emit = defineEmits<{
  'update:fromAddress': [string]
  'update:fromChain': [ChainSlug]
  close: []
}>()

const ctx = useTransferContext()
const { t, chainData, messages } = ctx

const fromAccount = computed(() => ctx.accountOn(props.fromChain, props.fromAddress))
const toChain = ref<ChainSlug>(props.fromChain)
const isCross = computed(() => toChain.value !== props.fromChain)

const sellHeld = useHeldTokens(toRef(props, 'fromChain'), toRef(props, 'fromAddress'))
const buyHeld = useHeldTokens(toChain, toRef(props, 'fromAddress'))

function nativeToken(chain: ChainSlug): PickedToken {
  const asset = NATIVE_ASSETS[chain]
  return { address: null, symbol: asset.symbol, name: asset.name, decimals: 18, logoUrl: asset.logoUrl }
}

// The buy side may be a chain this address isn't set up on (yet) — nothing
// held there, but its native coin must still be pickable: token-list search
// never returns it.
const buyHeldTokens = computed<HeldToken[]>(() => {
  const list = buyHeld.heldTokens.value
  if (list.some((tk) => tk.address === null)) return list
  return [{ ...nativeToken(toChain.value), balance: 0, usdValue: 0 }, ...list]
})

const sellToken = ref<PickedToken | null>(nativeToken(props.fromChain))
const buyToken = ref<PickedToken | null>(null)
const sellAmount = ref('')
const busy = ref(false)

// A token belongs to one chain — changing chain drops it, except the native
// coin, which has an equivalent everywhere. The destination follows the
// source until it's deliberately set apart.
function setFromChain(next: ChainSlug) {
  const prev = props.fromChain
  if (next === prev) return
  if (toChain.value === prev) setToChain(next)
  sellToken.value = nativeToken(next)
  sellAmount.value = ''
  emit('update:fromChain', next)
}

function setToChain(next: ChainSlug) {
  if (next === toChain.value) return
  buyToken.value = buyToken.value?.address === null ? nativeToken(next) : null
  toChain.value = next
}

const sellBalance = computed(() => (sellToken.value ? sellHeld.balanceOf(sellToken.value.address) : null))
const sellUsdPrice = computed(() => {
  const tok = sellToken.value
  if (!tok) return null
  return (
    sellHeld.options.value.find((o) => (o.contractAddress?.toLowerCase() ?? null) === (tok.address?.toLowerCase() ?? null))
      ?.usdPrice ?? null
  )
})

// Set by the percentage chips and Max: the exact amount picked, while the
// field shows it cut to a readable number of digits. Cleared by typing, or
// by anything that changes whose balance it was a share of.
const sellExactWei = ref<string | null>(null)
watch([sellToken, () => props.fromChain, () => props.fromAddress], () => (sellExactWei.value = null))

function onSellAmountInput(value: string) {
  sellAmount.value = value.replace(',', '.')
  sellExactWei.value = null
}

function setPickedAmount(wei: bigint, decimals: number) {
  sellAmount.value = unitsToSignificant(wei, decimals)
  sellExactWei.value = wei.toString()
}

function applyPercent(fraction: number) {
  const tok = sellToken.value
  const opt = sellHeld.options.value.find((o) => (o.contractAddress?.toLowerCase() ?? null) === (tok?.address?.toLowerCase() ?? null))
  if (!opt) return
  setPickedAmount((BigInt(opt.rawBalance) * BigInt(Math.round(fraction * 100))) / 100n, opt.decimals)
}

async function setMax() {
  const tok = sellToken.value
  if (!tok) return
  if (tok.address !== null) return applyPercent(1)
  const native = sellHeld.native.value
  if (!native) return
  busy.value = true
  try {
    // A swap or bridge call's gas isn't known until quoted — a plain
    // transfer's, with generous headroom, is reserved out of the sellable amount.
    const prep = await api.transactionPrep(props.fromChain, props.fromAddress, props.fromAddress, '0')
    const reserve = BigInt(prep.gas_price) * BigInt(prep.gas_limit) * (isCross.value ? 30n : 10n)
    const balance = BigInt(native.rawBalance)
    setPickedAmount(balance > reserve ? balance - reserve : 0n, native.decimals)
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

const sameToken = computed(
  () =>
    !isCross.value &&
    !!sellToken.value &&
    !!buyToken.value &&
    (sellToken.value.address?.toLowerCase() ?? null) === (buyToken.value.address?.toLowerCase() ?? null),
)

const sellWei = computed<string | null>(() => {
  const tok = sellToken.value
  const n = Number(sellAmount.value)
  if (!tok || !sellAmount.value || Number.isNaN(n) || n <= 0) return null
  if (sellExactWei.value !== null) return sellExactWei.value
  try {
    const [whole, frac = ''] = sellAmount.value.trim().split('.')
    return parseUnits(frac ? `${whole || '0'}.${frac.slice(0, tok.decimals)}` : whole || '0', tok.decimals).toString()
  } catch {
    return null
  }
})

const amountError = computed(() => {
  if (!sellAmount.value) return null
  if (sellWei.value === null) return t('validation.amountGreaterThanZero')
  if (sellBalance.value !== null && Number(sellAmount.value) > sellBalance.value) return t('validation.insufficientBalance')
  return null
})

const formReady = computed(
  () => !!fromAccount.value && !!sellToken.value && !!buyToken.value && !sameToken.value && !amountError.value && sellWei.value !== null,
)

const swapQuote = useAutoQuote(
  () =>
    formReady.value && !isCross.value
      ? {
        chain: props.fromChain,
        sell: sellToken.value!.address ?? NATIVE_PSEUDO_ADDRESS,
        buy: buyToken.value!.address ?? NATIVE_PSEUDO_ADDRESS,
        wei: sellWei.value!,
        taker: props.fromAddress,
      }
      : null,
  (p) => api.swapQuote(p.chain, p.sell, p.buy, p.wei, p.taker),
)

const bridgeQuote = useAutoQuote(
  () =>
    formReady.value && isCross.value
      ? {
        fromChain: props.fromChain,
        toChain: toChain.value,
        fromToken: sellToken.value!.address ?? NATIVE_PSEUDO_ADDRESS,
        toToken: buyToken.value!.address ?? NATIVE_PSEUDO_ADDRESS,
        fromAmountWei: sellWei.value!,
        fromAddress: props.fromAddress,
        toAddress: props.fromAddress,
      }
      : null,
  (p) => api.bridgeQuote(p),
)

/** Either aggregator's quote, read the same way. */
interface QuoteView {
  buyHuman: number
  minHuman: number | null
  buyUsdPrice: number | null
  gasWei: bigint
  fees: { label: string; text: string; usd: number | null }[]
  etaSecs: number | null
  via: string
  viaLogoUrl: string | null
  price: number
}

function viewOf(quote: SwapQuote | BridgeQuote | null): QuoteView | null {
  const sell = sellToken.value
  const buy = buyToken.value
  if (!quote || !sell || !buy) return null
  if ('estimated_gas' in quote) {
    const buyHuman = Number(formatUnits(quote.buy_amount, buy.decimals))
    return {
      buyHuman,
      minHuman: null,
      buyUsdPrice: null,
      gasWei: BigInt(quote.gas_price) * BigInt(quote.estimated_gas),
      // Each fee is charged in the sell or buy token; one that's neither
      // (shouldn't happen with 0x) is read in the buy token's units.
      fees: (quote.fees ?? []).map((f) => {
        const match = [sell, buy].find((tk) => (tk.address ?? NATIVE_PSEUDO_ADDRESS).toLowerCase() === f.token.toLowerCase()) ?? buy
        return {
          label: t(f.kind === 'zero_ex' ? 'review.swapFee' : 'review.integratorFee'),
          text: `${formatAmount(Number(formatUnits(f.amount, match.decimals)))} ${match.symbol}`,
          usd: null,
        }
      }),
      etaSecs: null,
      via: '0x',
      viaLogoUrl: null,
      price: Number(quote.price),
    }
  }
  const buyHuman = Number(formatUnits(quote.to_amount, quote.to_token.decimals))
  const sellHuman = Number(formatUnits(quote.from_amount, quote.from_token.decimals))
  return {
    buyHuman,
    minHuman: Number(formatUnits(quote.to_amount_min, quote.to_token.decimals)),
    buyUsdPrice: quote.to_token.usd_price,
    gasWei: BigInt(quote.gas_price) * BigInt(quote.gas_limit),
    fees: quote.fees.map((f) => ({
      label: f.name,
      text: `${formatAmount(Number(formatUnits(f.amount, f.decimals)))} ${f.symbol}`,
      usd: f.amount_usd,
    })),
    etaSecs: quote.execution_duration_secs,
    via: quote.tool,
    viaLogoUrl: quote.tool_logo_url,
    price: sellHuman > 0 ? buyHuman / sellHuman : 0,
  }
}

const activeQuote = computed(() => (isCross.value ? bridgeQuote : swapQuote))
const view = computed(() => viewOf(activeQuote.value.quote.value))
const quoteLoading = computed(() => activeQuote.value.loading.value)
const quoteError = computed(() => {
  if (isCross.value && bridgeQuote.errorCode.value === 'token_not_on_chain') {
    return t('transfer.tokenNotOnChainSwap', { network: NATIVE_ASSETS[toChain.value].networkName })
  }
  return activeQuote.value.error.value
})

const buyUsdPrice = computed(() => {
  if (view.value?.buyUsdPrice != null) return view.value.buyUsdPrice
  const tok = buyToken.value
  if (!tok) return null
  if (tok.address === null) return chainData.nativePriceUsdByChain[toChain.value] ?? null
  return chainData.tokenMetadataByKey[chainData.keyFor(toChain.value, tok.address)]?.usd_price ?? null
})

// A bought token often isn't held yet, so nothing has priced it — fetched
// on pick for the fiat reading under the estimate.
watch(buyToken, (tok) => {
  if (tok?.address) void chainData.ensureTokenMetadata(toChain.value, tok.address)
  else if (tok && chainData.nativePriceUsdByChain[toChain.value] === undefined) void chainData.loadNativePrice(toChain.value)
})

const summaryRows = computed<SummaryRow[]>(() => {
  const v = view.value
  const sell = sellToken.value
  const buy = buyToken.value
  if (!v || !sell || !buy) return []
  const gas = ctx.nativeFeeText(props.fromChain, v.gasWei)
  const rows: SummaryRow[] = [
    {
      key: 'rate',
      icon: 'mdi-swap-horizontal',
      label: t('transfer.rate'),
      value: `1 ${sell.symbol} ≈ ${formatAmount(v.price)} ${buy.symbol}`,
    },
  ]
  if (v.minHuman !== null) {
    rows.push({ key: 'min', icon: 'mdi-shield-check-outline', label: t('transfer.minReceived'), value: `${formatAmount(v.minHuman)} ${buy.symbol}`, tooltip: t('transfer.minReceivedHint') })
  }
  if (v.fees.length) {
    const usd = v.fees.every((f) => f.usd !== null) ? v.fees.reduce((s, f) => s + (f.usd ?? 0), 0) : null
    rows.push({
      key: 'fees',
      icon: isCross.value ? 'mdi-bridge' : 'mdi-percent-outline',
      label: isCross.value ? t('transfer.bridgeFees') : t('transfer.swapFees'),
      value: usd !== null ? ctx.fiatFee(usd) : v.fees.map((f) => f.text).join(' + '),
      tooltip: v.fees.map((f) => `${f.label}: ${f.text}${f.usd !== null ? ` (≈ ${ctx.fiatFee(f.usd)})` : ''}`).join(' · '),
    })
  }
  rows.push({ key: 'fee', icon: 'mdi-gas-station-outline', label: t('transfer.networkFee'), value: gas.native, sub: gas.fiat ? `(≈ ${gas.fiat})` : undefined })
  rows.push({
    key: 'eta',
    icon: 'mdi-clock-outline',
    label: t('transfer.arrives'),
    value: v.etaSecs !== null ? ctx.durationText(v.etaSecs) : t('transfer.etaNextBlock'),
  })
  return rows
})

const placeholder = computed(() => (buyToken.value ? t('transfer.placeholderAmount') : t('transfer.placeholderBuyToken')))
const canReview = computed(() => formReady.value && !!view.value && !quoteLoading.value && !busy.value)

/** The receive account is always this one — on a cross-chain swap, its address on the other chain. */
const receiveLabel = computed(() => ctx.ownAccountOptions.value.find((o) => o.address.toLowerCase() === props.fromAddress.toLowerCase())?.label ?? truncateAddress(props.fromAddress))

function flip() {
  if (!canFlip.value) return
  const [nextSell, nextBuy] = [buyToken.value, sellToken.value]
  const [nextFrom, nextTo] = [toChain.value, props.fromChain]
  toChain.value = nextTo
  sellToken.value = nextSell
  buyToken.value = nextBuy
  sellAmount.value = ''
  if (nextFrom !== nextTo) emit('update:fromChain', nextFrom)
}
const canFlip = computed(() => !!buyToken.value && !!ctx.accountOn(toChain.value, props.fromAddress))

function onFromAddress(address: string | null) {
  if (!address) return
  emit('update:fromAddress', address)
  const chains = ctx.chainsOf(address)
  if (!chains.includes(props.fromChain) && chains[0]) setFromChain(chains[0])
}

/* --------------------------- Review & submit ---------------------------- */

const reviewOpen = ref(false)
const reviewRows = ref<ReviewRow[]>([])

function nativeRow(wei: bigint) {
  const fee = ctx.nativeFeeText(props.fromChain, wei)
  return { value: fee.native, sub: fee.fiat ? `≈ ${fee.fiat}` : undefined }
}

async function openReview() {
  if (!canReview.value) return
  busy.value = true
  try {
    const quote = await activeQuote.value.fresh()
    const v = viewOf(quote)
    if (!quote || !v) return
    // The fee is paid in the native coin whatever's swapped; selling native
    // also attaches the amount itself as value — both need covering.
    const required = BigInt(quote.value) + v.gasWei
    const native = sellHeld.native.value
    if (native && required > BigInt(native.rawBalance)) {
      messages.push(t('validation.insufficientGas', { symbol: NATIVE_ASSETS[props.fromChain].symbol }), 'error')
      return
    }
    const sell = sellToken.value!
    const buy = buyToken.value!
    reviewRows.value = [
      { label: t('review.sell'), value: `${sellAmount.value} ${sell.symbol}`, sub: NATIVE_ASSETS[props.fromChain].networkName },
      { label: t('review.buy'), bold: true, value: `≈ ${formatAmount(v.buyHuman)} ${buy.symbol}`, sub: NATIVE_ASSETS[toChain.value].networkName },
      ...(v.minHuman !== null ? [{ label: t('transfer.minReceived'), value: `${formatAmount(v.minHuman)} ${buy.symbol}` }] : []),
      { label: t('review.price'), value: `1 ${sell.symbol} ≈ ${formatAmount(v.price)} ${buy.symbol}` },
      ...v.fees.map((f) => ({ label: f.label, value: f.text, sub: f.usd !== null ? `≈ ${ctx.fiatFee(f.usd)}` : undefined })),
      { label: t('review.fee'), ...nativeRow(v.gasWei) },
      ...(v.etaSecs !== null ? [{ label: t('transfer.arrives'), value: ctx.durationText(v.etaSecs) }] : []),
      { label: t('transfer.via'), value: v.via },
    ]
    reviewOpen.value = true
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

async function confirm() {
  const account = fromAccount.value
  const sell = sellToken.value
  const buy = buyToken.value
  if (!account || !sell || !buy) return
  const txChain = props.fromChain
  const buyChain = toChain.value
  const destChain = toChain.value
  const cross = isCross.value

  busy.value = true
  const msgId = messages.push(t('msg.swap.submitting'), 'info', -1)
  try {
    let quote = activeQuote.value.quote.value
    if (!quote) throw new Error('no quote')
    const spender = 'allowance_target' in quote ? quote.allowance_target : quote.approval_address
    const amount = 'sell_amount' in quote ? quote.sell_amount : quote.from_amount
    if (sell.address !== null && spender) {
      const approved = await ctx.ensureAllowance(account, sell.address, spender, amount)
      if (!approved) {
        busy.value = false
        messages.dismiss(msgId)
        return
      }
      // An approval can take a minute to mine; the price may have moved.
      quote = (await activeQuote.value.refresh()) ?? quote
    }
    const hash = await ctx.signAndBroadcast(account, quote)
    // Sell side first, so the token bought ends up most recent.
    chainData.recordSwappedToken(txChain, sell)
    chainData.recordSwappedToken(buyChain, buy)
    const v = viewOf(quote)!
    if (!cross) {
      // Kept for the transaction details pane — the quote is the only record of them.
      chainData.recordSwapFees(
        txChain,
        hash,
        ((quote as SwapQuote).fees ?? []).map((f) => {
          const match = [sell, buy].find((tk) => (tk.address ?? NATIVE_PSEUDO_ADDRESS).toLowerCase() === f.token.toLowerCase()) ?? buy
          return { kind: f.kind, amount: Number(formatUnits(f.amount, match.decimals)), symbol: match.symbol }
        }),
      )
    }
    const pending: Transaction = {
      hash,
      from: account.address,
      to: quote.to,
      value: sellAmount.value,
      asset: sell.symbol,
      contract_address: sell.address,
      block_number: null,
      timestamp: null,
      status: 'pending',
      counter_asset: cross ? null : buy.symbol,
      counter_value: cross ? null : String(v.buyHuman),
      counter_contract_address: cross ? null : buy.address,
    }
    chainData.prependTransaction(txChain, account.address, pending)
    reviewOpen.value = false
    busy.value = false
    emit('close')

    if (cross) {
      await ctx.trackBridge(msgId, { hash, source: account, toChain: destChain, toAddress: account.address, etaSecs: v.etaSecs ?? 0 })
      return
    }
    messages.update(msgId, t('msg.swap.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(txChain, hash)
    if (status === 'success') messages.update(msgId, t('msg.swap.success', { hash }), 'success')
    else if (status === 'failed') messages.update(msgId, t('msg.swap.failed', { hash }), 'error')
    else messages.update(msgId, t('msg.swap.stillPending', { hash }), 'warning')
    // Also picks up the bought token's metadata, which may be new to this account.
    chainData.loadAddressActivity(txChain, account.address).catch(() => { })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
    busy.value = false
  }
}

const signingNotice = computed(() => {
  const quote = activeQuote.value.quote.value
  if (!quote) return null
  return isCross.value
    ? t('transfer.bridgeSigningNotice', { address: truncateAddress(quote.to) })
    : t('swap.signingNotice', { address: truncateAddress(quote.to) })
})
</script>

<template>
  <div class="xfer-layout">
    <div class="xfer-legs">
      <section class="xfer-leg" :aria-label="t('swap.sellTokenLabel')">
        <header class="xfer-leg-head">
          <span class="xfer-leg-label">{{ t('swap.sellTokenLabel') }}</span>
          <div class="xfer-party-group">
            <PartySelect :model-value="fromAddress" :options="ctx.ownAccountOptions.value" :label="t('send.fromLabel')"
              :placeholder="t('transfer.chooseAccount')" @update:model-value="onFromAddress" />
            <ChainSelect :model-value="fromChain" :options="ctx.ownChainOptions(fromAddress)"
              :label="t('transfer.fromNetwork')" @update:model-value="setFromChain" />
            <span v-if="sellBalance !== null" class="xfer-balance ml-4">
              <v-icon icon="mdi-wallet-outline" size="14" />
              {{ formatAmount(sellBalance) }} {{ sellToken?.symbol }}
            </span>
          </div>
        </header>
        <div class="xfer-amount-row">
          <input class="xfer-amount-input" :class="{ 'xfer-amount-input--error': amountError }" :value="sellAmount"
            inputmode="decimal" autocomplete="off" placeholder="0" :aria-label="t('swap.sellAmountLabel')"
            @input="onSellAmountInput(($event.target as HTMLInputElement).value)" />
          <TokenPickerField compact held-only :chain="fromChain" :model-value="sellToken"
            :held-tokens="sellHeld.heldTokens.value" :label="t('swap.selectToken')"
            @update:model-value="(picked) => (sellToken = picked)" />
        </div>
        <div class="xfer-leg-foot">
          <span class="xfer-equiv xfer-equiv--static">
            ≈ {{ sellUsdPrice != null && sellAmount ? ctx.fiat(Number(sellAmount) * sellUsdPrice) : '—' }}
          </span>
          <div class="xfer-quick">
            <button type="button" class="xfer-chip" :disabled="!sellToken" @click="applyPercent(0.25)">25%</button>
            <button type="button" class="xfer-chip" :disabled="!sellToken" @click="applyPercent(0.5)">50%</button>
            <button type="button" class="xfer-chip" :disabled="!sellToken" @click="applyPercent(0.75)">75%</button>
            <button type="button" class="xfer-chip xfer-chip--max" :disabled="!sellToken || busy" @click="setMax">
              {{ t('send.maxLabel') }}
            </button>
          </div>
        </div>
        <p v-if="amountError" class="xfer-field-error">{{ amountError }}</p>
      </section>

      <div class="xfer-divider">
        <AppTooltip :text="t('transfer.flip')">
          <template #default="{ activatorProps }">
            <button v-bind="activatorProps" type="button" class="xfer-divider-icon xfer-divider-icon--button"
              :class="{ 'xfer-divider-icon--bridge': isCross }" :disabled="!canFlip" :aria-label="t('transfer.flip')"
              @click="flip">
              <v-icon icon="mdi-swap-vertical" size="18" />
            </button>
          </template>
        </AppTooltip>
      </div>

      <section class="xfer-leg xfer-leg--to" :aria-label="t('swap.buyTokenLabel')">
        <header class="xfer-leg-head">
          <span class="xfer-leg-label">{{ t('swap.buyTokenLabel') }}</span>
          <div class="xfer-party-group">
            <AppTooltip :text="t('transfer.receiveIntoSame')" info>
              <template #default="{ activatorProps }">
                <span v-bind="activatorProps" class="app-select app-select--static" tabindex="0">
                  <span class="app-select-avatar">{{ receiveLabel.charAt(0).toUpperCase() }}</span>
                  <span class="app-select-text">
                    <span class="app-select-name">{{ receiveLabel }}</span>
                    <span class="app-select-detail app-select-detail--mono">{{ truncateAddress(fromAddress) }}</span>
                  </span>
                </span>
              </template>
            </AppTooltip>
            <ChainSelect :model-value="toChain" :options="ctx.anyChainOptions(fromAddress)"
              :label="t('transfer.toNetwork')" @update:model-value="setToChain" />
          </div>
        </header>
        <div class="xfer-amount-row">
          <div class="xfer-amount-input xfer-amount-input--readonly" :aria-label="t('transfer.youGet')"
            aria-live="polite">
            <v-progress-circular v-if="quoteLoading" indeterminate size="22" width="2" color="primary" />
            <template v-else-if="view">≈ {{ formatAmount(view.buyHuman) }}</template>
            <span v-else class="xfer-receive-amount--empty">0</span>
          </div>
          <TokenPickerField compact :chain="toChain" :model-value="buyToken" :held-tokens="buyHeldTokens"
            :label="t('swap.selectToken')" @update:model-value="(picked) => (buyToken = picked)" />
        </div>
        <div class="xfer-leg-foot">
          <span class="xfer-equiv xfer-equiv--static">
            ≈ {{ view && buyUsdPrice != null ? ctx.fiat(view.buyHuman * buyUsdPrice) : '—' }}
          </span>
        </div>
        <p v-if="sameToken" class="xfer-field-error">{{ t('validation.sameTokenSwap') }}</p>
        <p v-else-if="isCross && bridgeQuote.errorCode.value === 'token_not_on_chain'" class="xfer-field-error">
          <v-icon icon="mdi-alert-circle-outline" size="16" /> {{ quoteError }}
        </p>
      </section>
    </div>

    <RouteSummary :from-chain="fromChain" :to-chain="toChain" :via="view?.via ?? null" :via-logo-url="view?.viaLogoUrl"
      :rows="summaryRows" :loading="quoteLoading" :error="quoteError" :placeholder="placeholder">
      <p v-if="signingNotice" class="route-summary-notice">{{ signingNotice }}</p>
      <template #actions>
        <v-btn variant="text" size="large" @click="emit('close')">{{ t('common.cancel') }}</v-btn>
        <v-btn color="primary" size="large" class="flex-grow-1" :disabled="!canReview" :loading="busy"
          @click="openReview">
          {{ t('common.review') }}
        </v-btn>
      </template>
    </RouteSummary>

    <TransactionReviewDialog v-model="reviewOpen" :title="t('review.title')" :rows="reviewRows"
      :confirm-label="isCross ? t('transfer.submitBridge') : t('swap.submit')" :busy="busy" @confirm="confirm" />
  </div>
</template>
