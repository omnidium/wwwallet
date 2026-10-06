<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatUnits } from 'ethers'
import type { ChainSlug, Transaction } from '@/services/api'
import { txnUrl, addressUrl } from '@/services/blockExplorer'
import { addressDisplayLabel } from '@/services/addressLabel'
import { truncateAddress } from '@/services/format'
import { convertUsd, formatAmount, formatFiat } from '@/services/money'
import { txRateAsset, useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { NATIVE_ASSETS } from '@/config/nativeAssets'

const props = defineProps<{
  modelValue: boolean
  chain: ChainSlug
  transaction: Transaction | null
  /** The account it's being viewed from — decides send/receive coloring, as in TransactionRow. */
  myAddress: string | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t, locale } = useI18n({ useScope: 'global' })
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()

const isSwap = computed(() => props.transaction?.counter_asset != null)
// Same rule as TransactionRow. Null when there's no viewing account to
// compare against, which leaves the amount uncolored and unsigned.
const isOutgoing = computed(() => {
  if (!props.transaction || !props.myAddress) return null
  return props.transaction.from.toLowerCase() === props.myAddress.toLowerCase()
})

const txnKey = computed(() => (props.transaction ? chainData.keyFor(props.chain, props.transaction.hash) : null))
const fee = computed(() => (txnKey.value ? chainData.transactionFeeByKey[txnKey.value] : undefined))
const swapFees = computed(() => (txnKey.value ? (chainData.swapFeesByKey[txnKey.value] ?? []) : []))
const feeLoading = ref(false)

// Only once it's actually opened, and never again once known (see
// chainData.ensureTransactionFee / ensureTransactionRates). A still-pending
// transaction has no receipt yet, so the fee lookup just fails quietly and
// the row says so; it has no mined time to price at either.
const ratesLoading = ref(false)
watch(
  () => [props.modelValue, props.transaction?.hash] as const,
  ([open, hash]) => {
    const txn = props.transaction
    if (!open || !hash || !txn) return
    feeLoading.value = true
    void chainData.ensureBridgeEnds(props.chain, txn)
    chainData
      .ensureTransactionFee(props.chain, hash)
      .catch(() => {})
      .finally(() => (feeLoading.value = false))
    if (!txn.timestamp) return
    ratesLoading.value = true
    chainData
      .ensureTransactionRates(props.chain, txn)
      .catch(() => {})
      .finally(() => (ratesLoading.value = false))
  },
  { immediate: true },
)

const rates = computed(() => (txnKey.value ? chainData.transactionRatesByKey[txnKey.value] : undefined))

// A bridged transfer's From (arriving) or To (leaving) is the bridge's own
// contract or relayer — shown as is, since that's who this chain's
// transaction was really with, plus the account at the far end beside it.
const bridgeEnds = computed(() => (txnKey.value ? chainData.bridgeEndsByKey[txnKey.value] : undefined))
const bridgedFrom = computed(() => (bridgeEnds.value?.leg === 'receiving' ? bridgeEnds.value : null))
const bridgedTo = computed(() => (bridgeEnds.value?.leg === 'sending' ? bridgeEnds.value : null))

/**
 * A fiat value in brackets, priced as of when the transaction was mined:
 *  1. that day's price in the selected currency;
 *  2. failing a rate for that day, its USD price then — marked "USD";
 *  3. failing any price then, today's price in the selected currency — marked "*".
 * A pending transaction has no mined time yet, so today's price is its price.
 * Null while the historical lookup is still out (rather than flashing a
 * fallback), or when no price is known at all.
 */
function fiatOf(human: number, contractAddress: string | null, opts: { fee?: boolean } = {}): string | null {
  const txn = props.transaction
  if (!txn || !Number.isFinite(human)) return null
  const currency = settingsLocale.currency
  let amount: number
  let shownIn = currency
  let mark = ''
  const thenUsd = rates.value?.usd[txRateAsset(contractAddress)]
  if (txn.timestamp && thenUsd !== undefined) {
    const thenRate = currency === 'USD' ? 1 : rates.value?.fx?.[currency]
    if (thenRate !== undefined) {
      amount = human * thenUsd * thenRate
    } else {
      amount = human * thenUsd
      shownIn = 'USD'
      mark = ' USD'
    }
  } else {
    if (txn.timestamp && ratesLoading.value) return null
    const nowUsd =
      contractAddress === null
        ? chainData.nativePriceUsdByChain[props.chain]
        : chainData.tokenMetadataByKey[chainData.keyFor(props.chain, contractAddress)]?.usd_price
    if (nowUsd == null) return null
    amount = convertUsd(human * nowUsd, currency, chainData.fxRates)
    if (txn.timestamp) mark = '*'
  }
  // An L2 fee is routinely a fraction of a cent — "< $0.01", not "$0.00".
  const text =
    opts.fee && amount > 0 && amount < 0.01
      ? `< ${formatFiat(0.01, shownIn, locale.value)}`
      : formatFiat(amount, shownIn, locale.value)
  return `(≈ ${text}${mark})`
}

const amountFiat = computed(() =>
  props.transaction ? fiatOf(Number(props.transaction.value), props.transaction.contract_address) : null,
)
const counterFiat = computed(() =>
  props.transaction?.counter_value
    ? fiatOf(Number(props.transaction.counter_value), props.transaction.counter_contract_address)
    : null,
)

// Significant digits rather than formatAmount's fixed six decimals: an L2
// fee is routinely a few millionths of an ETH, which that would round to 0.
// Kept as two parts so the row can only wrap between them, never inside the bracket.
const feeText = computed(() => {
  if (!fee.value) return null
  const human = Number(formatUnits(fee.value.fee_wei, 18))
  const amount = new Intl.NumberFormat(locale.value, { maximumSignificantDigits: 3 }).format(human)
  return { native: `${amount} ${NATIVE_ASSETS[props.chain].symbol}`, fiat: fiatOf(human, null, { fee: true }) }
})

// A recorded swap fee carries only its symbol — it's always in one of the
// swap's two legs, which says which contract to price it by.
const swapFeeRows = computed(() => {
  const txn = props.transaction
  return swapFees.value.map((f) => {
    const contract =
      f.symbol === txn?.counter_asset ? (txn.counter_contract_address ?? null)
        : f.symbol === txn?.asset ? txn.contract_address : undefined
    return { ...f, fiat: contract === undefined ? null : fiatOf(f.amount, contract, { fee: true }) }
  })
})

/** Shown once under the table when any value fell back to today's price. */
const usesTodaysPrice = computed(() =>
  [amountFiat.value, counterFiat.value, feeText.value?.fiat, ...swapFeeRows.value.map((r) => r.fiat)].some((v) =>
    v?.endsWith('*)'),
  ),
)

const paidBySomeoneElse = computed(
  () => !!fee.value && !!props.myAddress && fee.value.payer.toLowerCase() !== props.myAddress.toLowerCase(),
)
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="transaction" class="pa-2 txn-detail-card">
      <v-card-title>{{ t('transactionDetail.title') }}</v-card-title>
      <v-card-text>
        <table class="txn-details">
          <tbody>
            <tr>
              <td>{{ t('transactionDetail.hash') }}</td>
              <td>
                <a :href="txnUrl(props.chain, transaction.hash)" target="_blank" rel="noopener noreferrer">{{
                  truncateAddress(transaction.hash)
                }}</a>
              </td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.status') }}</td>
              <td>
                <span
                  :style="{ color: transaction.status === 'success' ? 'green' : transaction.status === 'failed' ? 'red' : undefined }">
                  {{ t(`transactionDetail.status_${transaction.status}`) }}
                </span>
              </td>
            </tr>
            <tr v-if="transaction.timestamp">
              <td>{{ t('transactionDetail.timestamp') }}</td>
              <td>{{ new Date(transaction.timestamp).toLocaleString() }}</td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr v-if="bridgedFrom">
              <td>{{ t('transactionDetail.originalSender') }}</td>
              <td>
                <a v-if="bridgedFrom.chain" :href="addressUrl(bridgedFrom.chain, bridgedFrom.address)" target="_blank"
                  rel="noopener noreferrer">{{ addressDisplayLabel(bridgedFrom.chain, bridgedFrom.address) }}</a>
                <span v-else>{{ truncateAddress(bridgedFrom.address) }}</span>
                <span class="d-block text-caption text-medium-emphasis">{{ bridgedFrom.chain
                  ? t('transactionDetail.onNetwork', { network: NATIVE_ASSETS[bridgedFrom.chain].networkName })
                  : t('transactionDetail.onOtherNetwork') }}</span>
              </td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.from') }}</td>
              <td>
                <a :href="addressUrl(props.chain, transaction.from)" target="_blank" rel="noopener noreferrer">{{
                  addressDisplayLabel(props.chain, transaction.from)
                }}</a>
              </td>
            </tr>
            <tr v-if="transaction.to">
              <td>{{ t('transactionDetail.to') }}</td>
              <td>
                <a :href="addressUrl(props.chain, transaction.to)" target="_blank" rel="noopener noreferrer">{{
                  addressDisplayLabel(props.chain, transaction.to)
                }}</a>
              </td>
            </tr>
            <tr v-if="bridgedTo">
              <td>{{ t('transactionDetail.finalRecipient') }}</td>
              <td>
                <a v-if="bridgedTo.chain" :href="addressUrl(bridgedTo.chain, bridgedTo.address)" target="_blank"
                  rel="noopener noreferrer">{{ addressDisplayLabel(bridgedTo.chain, bridgedTo.address) }}</a>
                <span v-else>{{ truncateAddress(bridgedTo.address) }}</span>
                <span class="d-block text-caption text-medium-emphasis">{{ bridgedTo.chain
                  ? t('transactionDetail.onNetwork', { network: NATIVE_ASSETS[bridgedTo.chain].networkName })
                  : t('transactionDetail.onOtherNetwork') }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr v-if="isSwap">
              <td>{{ t('transactionDetail.sold') }}</td>
              <td class="text-send">
                <span class="text-no-wrap">−{{ formatAmount(Number(transaction.value)) }} {{ transaction.asset }}</span>
                <template v-if="amountFiat">{{ ' ' }}<span class="text-no-wrap txn-detail-fiat">{{ amountFiat }}</span></template>
              </td>
            </tr>
            <tr v-if="isSwap">
              <td>{{ t('transactionDetail.bought') }}</td>
              <td class="text-receive">
                <span class="text-no-wrap">+{{ formatAmount(Number(transaction.counter_value)) }} {{ transaction.counter_asset }}</span>
                <template v-if="counterFiat">{{ ' ' }}<span class="text-no-wrap txn-detail-fiat">{{ counterFiat }}</span></template>
              </td>
            </tr>
            <tr v-else>
              <td>{{ t('transactionDetail.amount') }}</td>
              <td :class="isOutgoing === null ? undefined : isOutgoing ? 'text-send' : 'text-receive'">
                <span class="text-no-wrap">{{ isOutgoing === null ? '' : isOutgoing ? '−' : '+' }}{{ formatAmount(Number(transaction.value)) }}
                  {{ transaction.asset }}</span>
                <template v-if="amountFiat">{{ ' ' }}<span class="text-no-wrap txn-detail-fiat">{{ amountFiat }}</span></template>
              </td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.networkFee') }}</td>
              <td>
                <template v-if="feeText">
                  <span class="text-no-wrap">{{ feeText.native }}</span>
                  <template v-if="feeText.fiat">{{ ' ' }}<span class="text-no-wrap txn-detail-fiat">{{ feeText.fiat }}</span></template>
                  <span v-if="paidBySomeoneElse" class="d-block text-caption text-medium-emphasis">
                    {{ t('transactionDetail.paidBySender') }}
                  </span>
                </template>
                <v-progress-circular v-else-if="feeLoading" indeterminate size="16" width="2" color="primary" />
                <span v-else class="text-medium-emphasis">{{ t('transactionDetail.feeUnavailable') }}</span>
              </td>
            </tr>
            <tr v-for="swapFee in swapFeeRows" :key="swapFee.kind">
              <td>{{ t(swapFee.kind === 'zero_ex' ? 'review.swapFee' : 'review.integratorFee') }}</td>
              <td>
                <span class="text-no-wrap">{{ formatAmount(swapFee.amount) }} {{ swapFee.symbol }}</span>
                <template v-if="swapFee.fiat">{{ ' ' }}<span class="text-no-wrap txn-detail-fiat">{{ swapFee.fiat }}</span></template>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="usesTodaysPrice" class="text-caption text-medium-emphasis mt-3 mb-0">
          {{ t('transactionDetail.todaysPriceNote') }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
