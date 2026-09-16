<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { formatUnits, parseUnits } from 'ethers'
import { api, type ChainSlug, type SwapQuote } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { encodeApprove } from '@/services/erc20'
import { convertUsd, formatFiat } from '@/services/money'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'

const NATIVE_SENTINEL = 'ETH'
// The pseudo-address DEX aggregators (including 0x's Swap API) use to mean
// "the chain's native currency" — there's no real ERC-20 contract for it.
const NATIVE_PSEUDO_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

function toApiTokenAddress(input: string): string {
  const trimmed = input.trim()
  return trimmed.toUpperCase() === NATIVE_SENTINEL ? NATIVE_PSEUDO_ADDRESS : trimmed
}

// The pseudo-address has no real contract, so there's no metadata to look up —
// every supported chain's native currency uses 18 decimals.
async function resolveDecimals(chain: ChainSlug, tokenAddress: string): Promise<number> {
  if (tokenAddress === NATIVE_PSEUDO_ADDRESS) return 18
  const metadata = await api.tokenMetadata(chain, tokenAddress)
  return metadata.decimals ?? 18
}

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const messages = useMessagesStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

const sellToken = ref(NATIVE_SENTINEL)
const buyToken = ref('')
const sellAmount = ref('')
const quote = ref<SwapQuote | null>(null)
const buyAmountFormatted = ref('')
const busy = ref(false)
const quoteFormValid = ref(false)
const reviewOpen = ref(false)
const reviewRows = ref<ReviewRow[]>([])

function formatNativeFee(feeWei: bigint): { value: string; sub?: string } {
  const human = Number(formatUnits(feeWei, 18))
  const nativeStr = `${human.toFixed(6)} ${chain === 'polygon' ? 'MATIC' : 'ETH'}`
  const priceUsd = chainData.nativePriceUsdByChain[chain]
  if (priceUsd === undefined) return { value: nativeStr }
  const fiat = formatFiat(
    convertUsd(human * priceUsd, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
  return { value: fiat, sub: nativeStr }
}

onMounted(async () => {
  try {
    await Promise.all([chainData.loadNativePrice(chain), chainData.loadFxRates()])
  } catch {
    // The fee row in the review step just falls back to a native-only amount.
  }
})

const sellTokenRules = [
  (v: string) => v.trim().toUpperCase() === NATIVE_SENTINEL || isValidAddress(v.trim()) || t('validation.validTokenOrEth'),
]
const buyTokenRules = [(v: string) => isValidAddress(v.trim()) || t('validation.validBuyToken')]
const sellAmountRules = [(v: string) => (!!v && Number(v) > 0) || t('validation.amountGreaterThanZero')]

async function getQuote() {
  if (!quoteFormValid.value) return
  busy.value = true
  try {
    const sellTokenAddress = toApiTokenAddress(sellToken.value)
    const buyTokenAddress = buyToken.value.trim()
    const [sellDecimals, buyDecimals] = await Promise.all([
      resolveDecimals(chain, sellTokenAddress),
      resolveDecimals(chain, buyTokenAddress),
    ])

    const sellAmountWei = parseUnits(sellAmount.value, sellDecimals).toString()
    quote.value = await api.swapQuote(chain, sellTokenAddress, buyTokenAddress, sellAmountWei, address)
    buyAmountFormatted.value = formatUnits(quote.value.buy_amount, buyDecimals)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function onSwapClick() {
  if (!account || !quote.value) return

  busy.value = true
  try {
    if (sellToken.value !== NATIVE_SENTINEL) {
      const { amount: currentAllowance } = await api.allowance(
        chain,
        sellToken.value,
        address,
        quote.value.allowance_target,
      )
      if (BigInt(currentAllowance) < BigInt(quote.value.sell_amount)) {
        const wallet = await unlockWalletForSigning(account)
        const approvePrep = await api.transactionPrep(chain, address, sellToken.value, '0')
        const approveTx = await wallet.signTransaction({
          to: sellToken.value,
          value: '0',
          // Exactly what this swap needs, not an unlimited/infinite approval —
          // if the swap contract is ever compromised later, it can only ever
          // move up to this leftover amount, not the account's full balance.
          data: encodeApprove(quote.value.allowance_target, quote.value.sell_amount),
          nonce: approvePrep.nonce,
          gasLimit: approvePrep.gas_limit,
          gasPrice: approvePrep.gas_price,
          chainId: approvePrep.chain_id,
        })
        await api.broadcastTransaction(chain, approveTx)
        messages.push(t('msg.swap.approvalSubmitted'), 'info')
        return
      }
    }

    openReview()
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

function openReview() {
  if (!quote.value) return
  const feeWei = BigInt(quote.value.gas_price) * BigInt(quote.value.estimated_gas)
  reviewRows.value = [
    { label: t('review.sell'), value: `${sellAmount.value} ${sellToken.value.trim()}` },
    { label: t('review.buy'), value: `${buyAmountFormatted.value} ${buyToken.value.trim()}` },
    { label: t('review.chain'), value: chain },
    { label: t('review.price'), value: quote.value.price },
    { label: t('review.fee'), ...formatNativeFee(feeWei) },
  ]
  reviewOpen.value = true
}

async function confirmSwap() {
  if (!account || !quote.value) return

  busy.value = true
  const msgId = messages.push(t('msg.swap.submitting'), 'info', -1)
  try {
    const wallet = await unlockWalletForSigning(account)
    const prep = await api.transactionPrep(chain, address, quote.value.to, quote.value.value)
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
    reviewOpen.value = false
    busy.value = false
    router.push(`/accounts/${chain}/${address}`)

    messages.update(msgId, t('msg.swap.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(chain, transaction_hash)
    if (status === 'success') {
      messages.update(msgId, t('msg.swap.success', { hash: transaction_hash }), 'success')
    } else if (status === 'failed') {
      messages.update(msgId, t('msg.swap.failed', { hash: transaction_hash }), 'error')
    } else {
      messages.update(msgId, t('msg.swap.stillPending', { hash: transaction_hash }), 'warning')
    }
  } catch (err) {
    messages.update(msgId, (err as Error).message, 'error')
    busy.value = false
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ t('swap.title') }}</h1>
    <p class="text-medium-emphasis mb-4">{{ t('send.fromLabel', { label: account?.label ?? address, chain }) }}</p>

    <v-card class="pa-4" max-width="480">
      <v-form v-model="quoteFormValid">
        <v-text-field v-model="sellToken" :label="t('swap.sellTokenLabel')" :rules="sellTokenRules" />
        <v-text-field v-model="buyToken" :label="t('swap.buyTokenLabel')" :rules="buyTokenRules" />
        <v-text-field v-model="sellAmount" :label="t('swap.sellAmountLabel')" type="number" min="0" step="any" :rules="sellAmountRules" />

        <v-btn variant="outlined" block class="mb-4" :disabled="!quoteFormValid" :loading="busy" @click="getQuote">{{ t('swap.getQuote') }}</v-btn>
      </v-form>

      <template v-if="quote">
        <v-alert type="info" variant="tonal" class="mb-4">
          {{ t('swap.estimateText', { amount: buyAmountFormatted, price: quote.price }) }}
          <p class="text-caption mt-2 mb-0" style="word-break: break-all">
            {{ t('swap.signingNotice', { address: quote.to }) }}
          </p>
        </v-alert>
        <v-btn color="primary" block :loading="busy" @click="onSwapClick">{{ t('swap.submit') }}</v-btn>
      </template>
    </v-card>

    <TransactionReviewDialog
      v-model="reviewOpen"
      :title="t('review.title')"
      :rows="reviewRows"
      :confirm-label="t('swap.submit')"
      :busy="busy"
      @confirm="confirmSwap"
    />
  </v-container>
</template>
