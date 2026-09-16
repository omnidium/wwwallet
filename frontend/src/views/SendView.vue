<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { formatUnits, parseUnits } from 'ethers'
import { api, type ChainSlug, type TransactionPrep } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { convertUsd, formatFiat } from '@/services/money'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import QrScannerDialog from '@/components/QrScannerDialog.vue'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'

const { t, locale } = useI18n()
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

const to = ref('')
const amount = ref('')
const busy = ref(false)
const scannerOpen = ref(false)
const formValid = ref(false)
const reviewOpen = ref(false)
const reviewRows = ref<ReviewRow[]>([])
const preparedTx = ref<{ prep: TransactionPrep; valueWei: string; to: string } | null>(null)

const nativeSymbol = computed(
  () =>
    chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances.find(
      (b) => b.contract_address === null,
    )?.symbol ?? '',
)

const relevantPayees = payees.payees.filter((p) => p.chain === chain)

const nativeBalance = computed(() => {
  const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
  const native = activity?.balances.find((b) => b.contract_address === null)
  return native ? Number(native.balance) : null
})

const amountRules = [
  (v: string) => (!!v && Number(v) > 0) || t('validation.amountGreaterThanZero'),
  (v: string) =>
    nativeBalance.value === null ||
    Number(v) <= nativeBalance.value ||
    t('validation.insufficientBalance'),
]
const addressRules = [(v: string) => isValidAddress(v.trim()) || t('validation.invalidRecipientAddress')]

onMounted(async () => {
  // Prefilled by the drag-to-transfer gesture on the Accounts screen.
  if (typeof route.query.to === 'string') to.value = route.query.to
  try {
    await chainData.loadAddressActivity(chain, address)
  } catch {
    // Balance just won't be available for the inline insufficient-funds check.
  }
  try {
    await Promise.all([chainData.loadNativePrice(chain), chainData.loadFxRates()])
  } catch {
    // Fiat rows in the review step just fall back to native-only amounts.
  }
})

function formatAmountRow(weiValue: bigint): { value: string; sub?: string } {
  const human = Number(formatUnits(weiValue, 18))
  const nativeStr = `${human.toFixed(6)} ${nativeSymbol.value}`
  const priceUsd = chainData.nativePriceUsdByChain[chain]
  if (priceUsd === undefined) return { value: nativeStr }
  const fiat = formatFiat(
    convertUsd(human * priceUsd, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
  return { value: fiat, sub: nativeStr }
}

function pickPayee(payeeAddress: string) {
  to.value = payeeAddress
}

/** Handles both a bare address and an EIP-681 "ethereum:0x...@chainId" URI. */
function onQrDecoded(data: string) {
  const match = data.match(/0x[a-fA-F0-9]{40}/)
  if (!match) {
    messages.push(t('msg.qr.noAddress'), 'warning')
    return
  }
  to.value = match[0]
}

async function openReview() {
  if (!account || !formValid.value) return

  busy.value = true
  try {
    const valueWei = parseUnits(amount.value, 18).toString()
    const toAddress = to.value.trim()
    const prep = await api.transactionPrep(chain, address, toAddress, valueWei)
    preparedTx.value = { prep, valueWei, to: toAddress }

    const feeWei = BigInt(prep.gas_price) * BigInt(prep.gas_limit)
    const totalWei = BigInt(valueWei) + feeWei
    reviewRows.value = [
      { label: t('review.from'), value: account.label },
      { label: t('review.to'), value: toAddress },
      { label: t('review.chain'), value: chain },
      { label: t('review.amount'), ...formatAmountRow(BigInt(valueWei)) },
      { label: t('review.fee'), ...formatAmountRow(feeWei) },
      { label: t('review.total'), bold: true, ...formatAmountRow(totalWei) },
    ]
    reviewOpen.value = true
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function confirmSend() {
  if (!account || !preparedTx.value) return
  const { prep, valueWei, to: toAddress } = preparedTx.value

  busy.value = true
  const msgId = messages.push(t('msg.send.submitting'), 'info', -1)
  try {
    const wallet = await unlockWalletForSigning(account)
    const signedTx = await wallet.signTransaction({
      to: toAddress,
      value: valueWei,
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })

    const { transaction_hash } = await api.broadcastTransaction(chain, signedTx)
    reviewOpen.value = false
    busy.value = false
    router.push(`/accounts/${chain}/${address}`)

    // Polling continues after navigating away — the messages store is
    // global, so the toast keeps updating regardless of the active view.
    messages.update(msgId, t('msg.send.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(chain, transaction_hash)
    if (status === 'success') {
      messages.update(msgId, t('msg.send.success', { hash: transaction_hash }), 'success')
    } else if (status === 'failed') {
      messages.update(msgId, t('msg.send.failed', { hash: transaction_hash }), 'error')
    } else {
      messages.update(msgId, t('msg.send.stillPending', { hash: transaction_hash }), 'warning')
    }
  } catch (err) {
    messages.update(msgId, (err as Error).message, 'error')
    busy.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-h5">{{ t('send.title') }}</h1>
    <p class="text-medium-emphasis mb-4">{{ t('send.fromLabel', { label: account?.label ?? address, chain }) }}</p>

    <v-card class="pa-4" max-width="480">
      <v-form v-model="formValid">
        <v-text-field v-model="to" :label="t('send.recipientLabel')" :rules="addressRules">
          <template #append-inner>
            <v-icon
              icon="mdi-qrcode-scan"
              role="button"
              :aria-label="t('send.scanQrAria')"
              style="cursor: pointer"
              @click="scannerOpen = true"
            />
          </template>
        </v-text-field>

        <v-chip-group v-if="relevantPayees.length" class="mb-2">
          <v-chip v-for="payee in relevantPayees" :key="payee.id" size="small" @click="pickPayee(payee.address)">
            {{ payee.label }}
          </v-chip>
        </v-chip-group>

        <v-text-field v-model="amount" :label="t('send.amountLabel')" type="number" min="0" step="any" :rules="amountRules" />

        <v-btn color="primary" block class="mt-2" :disabled="!formValid" :loading="busy" @click="openReview">{{ t('common.review') }}</v-btn>
      </v-form>
    </v-card>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />
    <TransactionReviewDialog
      v-model="reviewOpen"
      :title="t('review.title')"
      :rows="reviewRows"
      :confirm-label="t('send.submit')"
      :busy="busy"
      @confirm="confirmSend"
    />
  </div>
</template>
