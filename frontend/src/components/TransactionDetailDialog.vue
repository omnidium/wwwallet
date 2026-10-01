<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatUnits } from 'ethers'
import type { ChainSlug, Transaction } from '@/services/api'
import { txnUrl, addressUrl } from '@/services/blockExplorer'
import { addressDisplayLabel } from '@/services/addressLabel'
import { truncateAddress } from '@/services/format'
import { convertUsd, formatAmount, formatFiat } from '@/services/money'
import { useChainDataStore } from '@/stores/chainData'
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
// chainData.ensureTransactionFee). A still-pending transaction has no
// receipt yet, so that lookup just fails quietly and the row says so.
watch(
  () => [props.modelValue, props.transaction?.hash] as const,
  ([open, hash]) => {
    if (!open || !hash) return
    feeLoading.value = true
    chainData
      .ensureTransactionFee(props.chain, hash)
      .catch(() => {})
      .finally(() => (feeLoading.value = false))
  },
  { immediate: true },
)

// Significant digits rather than formatAmount's fixed six decimals: an L2
// fee is routinely a few millionths of an ETH, which that would round to 0.
// Fiat at today's native price — an approximation, hence the "≈".
const feeText = computed(() => {
  if (!fee.value) return null
  const human = Number(formatUnits(fee.value.fee_wei, 18))
  const amount = new Intl.NumberFormat(locale.value, { maximumSignificantDigits: 3 }).format(human)
  const native = `${amount} ${NATIVE_ASSETS[props.chain].symbol}`
  const priceUsd = chainData.nativePriceUsdByChain[props.chain]
  if (priceUsd === undefined) return native
  const fiatAmount = convertUsd(human * priceUsd, settingsLocale.currency, chainData.fxRates)
  const fiat =
    fiatAmount > 0 && fiatAmount < 0.01
      ? `< ${formatFiat(0.01, settingsLocale.currency, locale.value)}`
      : formatFiat(fiatAmount, settingsLocale.currency, locale.value)
  return `${native} (≈ ${fiat})`
})
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
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr v-if="isSwap">
              <td>{{ t('transactionDetail.sold') }}</td>
              <td class="text-send">−{{ formatAmount(Number(transaction.value)) }} {{ transaction.asset }}</td>
            </tr>
            <tr v-if="isSwap">
              <td>{{ t('transactionDetail.bought') }}</td>
              <td class="text-receive">
                +{{ formatAmount(Number(transaction.counter_value)) }} {{ transaction.counter_asset }}
              </td>
            </tr>
            <tr v-else>
              <td>{{ t('transactionDetail.amount') }}</td>
              <td :class="isOutgoing === null ? undefined : isOutgoing ? 'text-send' : 'text-receive'">
                {{ isOutgoing === null ? '' : isOutgoing ? '−' : '+' }}{{ formatAmount(Number(transaction.value)) }}
                {{ transaction.asset }}
              </td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.networkFee') }}</td>
              <td>
                <template v-if="feeText">
                  {{ feeText }}
                  <span v-if="paidBySomeoneElse" class="d-block text-caption text-medium-emphasis">
                    {{ t('transactionDetail.paidBySender') }}
                  </span>
                </template>
                <v-progress-circular v-else-if="feeLoading" indeterminate size="16" width="2" color="primary" />
                <span v-else class="text-medium-emphasis">{{ t('transactionDetail.feeUnavailable') }}</span>
              </td>
            </tr>
            <tr v-for="swapFee in swapFees" :key="swapFee.kind">
              <td>{{ t(swapFee.kind === 'zero_ex' ? 'review.swapFee' : 'review.integratorFee') }}</td>
              <td>{{ formatAmount(swapFee.amount) }} {{ swapFee.symbol }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
