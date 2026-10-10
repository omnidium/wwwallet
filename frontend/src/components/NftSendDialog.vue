<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { api, type ChainSlug, type Nft, type TransactionPrep } from '@/services/api'
import { TranslatedError, displayErrorMessage } from '@/services/errors'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { encodeNftTransfer, isSendableNftType } from '@/services/nft'
import { feeWeiOf } from '@/services/fees'
import { addressDisplayLabel } from '@/services/addressLabel'
import { waitForTransactionConfirmation } from '@/services/transactionStatus'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { useTransferContext } from '@/composables/useTransferContext'
import { useNftsStore } from '@/stores/nfts'
import PartySelect from '@/components/transfer/PartySelect.vue'
import TransactionReviewDialog, { type ReviewRow } from '@/components/TransactionReviewDialog.vue'

/**
 * Sends one NFT (or, for ERC-1155, some copies of it) to another address on
 * the same chain — no bridging: an NFT bridge isn't a transfer, it's a
 * different token on the other side.
 */
const props = defineProps<{
  modelValue: boolean
  chain: ChainSlug
  /** The account holding it. */
  address: string
  nft: Nft
  title: string
  collectionName: string | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; sent: [] }>()

const ctx = useTransferContext()
const { t, chainData, messages } = ctx
const nfts = useNftsStore()

const toAddress = ref<string | null>(null)
const quantityText = ref('1')
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    toAddress.value = null
    quantityText.value = '1'
  },
)

const isMulti = computed(() => props.nft.token_type === 'ERC1155')
const networkName = computed(() => NATIVE_ASSETS[props.chain].networkName)

const recipientOptions = computed(() =>
  [...ctx.ownAccountOptions.value, ...ctx.payeeOptions.value].filter(
    (o) => o.address.toLowerCase() !== props.address.toLowerCase(),
  ),
)

const recipientError = computed(() => {
  if (!toAddress.value) return null
  if (!isValidAddress(toAddress.value)) return t('validation.invalidRecipientAddress')
  if (toAddress.value.toLowerCase() === props.address.toLowerCase()) return t('nfts.sameAccount')
  return null
})

// As in Send: a payee saved for another network may not be watching this one.
const payeeChainWarning = computed(() => {
  if (!toAddress.value) return null
  const savedOn = ctx.payeeChain(toAddress.value)
  if (!savedOn || savedOn === props.chain || ctx.accountOn(props.chain, toAddress.value)) return null
  return t('transfer.payeeOtherChain', { saved: NATIVE_ASSETS[savedOn].networkName, network: networkName.value })
})

const quantityError = computed(() => {
  if (!isMulti.value) return null
  const text = quantityText.value.trim()
  const valid = /^\d+$/.test(text) && BigInt(text) >= 1n && BigInt(text) <= BigInt(props.nft.balance)
  return valid ? null : t('nfts.invalidQuantity', { count: props.nft.balance })
})

const busy = ref(false)
const canReview = computed(
  () => !!toAddress.value && !recipientError.value && !quantityError.value && !busy.value,
)

const reviewOpen = ref(false)
const reviewRows = ref<ReviewRow[]>([])
const prepared = ref<{ prep: TransactionPrep; data: string } | null>(null)

async function openReview() {
  const to = toAddress.value
  if (!canReview.value || !to || !isSendableNftType(props.nft.token_type)) return
  busy.value = true
  try {
    const data = encodeNftTransfer({
      tokenType: props.nft.token_type,
      from: props.address,
      to,
      tokenId: props.nft.token_id,
      amount: quantityText.value.trim(),
    })
    // The estimate is also the check: it fails if the recipient can't take
    // NFTs or this account no longer holds it.
    const prep = await api.transactionPrep(props.chain, props.address, props.nft.contract_address, '0', data)
    const fee = feeWeiOf(prep)
    const native = chainData.activityByAddress[chainData.keyFor(props.chain, props.address)]?.balances.find(
      (b) => b.contract_address === null,
    )
    if (native && fee > BigInt(native.balance)) {
      messages.push(t('validation.insufficientGas', { symbol: NATIVE_ASSETS[props.chain].symbol }), 'error')
      return
    }
    prepared.value = { prep, data }
    const feeText = ctx.nativeFeeText(props.chain, fee)
    reviewRows.value = [
      { label: t('nfts.nft'), value: props.title, sub: props.collectionName ?? undefined },
      ...(isMulti.value ? [{ label: t('nfts.quantity'), value: quantityText.value.trim() }] : []),
      { label: t('review.from'), value: addressDisplayLabel(props.chain, props.address), sub: networkName.value },
      { label: t('review.to'), value: addressDisplayLabel(props.chain, to), sub: networkName.value },
      { label: t('review.fee'), value: feeText.native, sub: feeText.fiat ? `≈ ${feeText.fiat}` : undefined },
    ]
    reviewOpen.value = true
  } catch (err) {
    const wouldFail = err instanceof TranslatedError && err.code === 'would_revert'
    messages.push(wouldFail ? t('nfts.cannotSend') : displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

async function confirm() {
  const account = ctx.accountOn(props.chain, props.address)
  const plan = prepared.value
  const to = toAddress.value
  if (!account || !plan || !to) return
  const { chain, address, nft } = props

  busy.value = true
  const msgId = messages.push(t('msg.send.submitting'), 'info', -1)
  try {
    const wallet = await unlockWalletForSigning(account)
    // Signed with the fee estimate the review showed, not a fresh one.
    const signed = await wallet.signTransaction({
      to: nft.contract_address,
      value: '0',
      data: plan.data,
      nonce: plan.prep.nonce,
      gasLimit: plan.prep.gas_limit,
      gasPrice: plan.prep.gas_price,
      chainId: plan.prep.chain_id,
    })
    const { transaction_hash: hash } = await api.broadcastTransaction(chain, signed)
    // Not added to the account's history: that only lists coin and token
    // transfers, so it'd stay "pending" forever. Marked on the NFT instead.
    void nfts.markSent(chain, address, nft)
    reviewOpen.value = false
    busy.value = false
    emit('update:modelValue', false)
    emit('sent')

    messages.update(msgId, t('msg.send.waiting'), 'info', -1)
    const status = await waitForTransactionConfirmation(chain, hash)
    if (status === 'success') messages.update(msgId, t('msg.send.success', { hash }), 'success')
    else if (status === 'failed') messages.update(msgId, t('msg.send.failed', { hash }), 'error')
    else messages.update(msgId, t('msg.send.stillPending', { hash }), 'warning')
    if (status === 'failed') nfts.unmarkSent(chain, address, nft)
    // Whatever the outcome — a failed send still spent gas.
    chainData.loadAddressActivity(chain, address).catch(() => { })
    nfts.loadCollections(chain, address).catch(() => { })
    nfts.loadNfts(chain, address, nft.contract_address).catch(() => { })
    if (ctx.accountOn(chain, to)) nfts.loadCollections(chain, to).catch(() => { })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
    busy.value = false
  }
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="420" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="pa-2 txn-detail-card">
      <v-card-title>{{ t('nfts.sendTitle') }}</v-card-title>
      <v-card-text>
        <div class="d-flex align-center mb-4">
          <img v-if="nft.image.thumbnail" :src="nft.image.thumbnail" alt="" referrerpolicy="no-referrer"
            class="nft-send-thumb mr-3" />
          <div class="nft-header-titles">
            <span class="text-truncate">{{ title }}</span>
            <span class="text-caption text-medium-emphasis text-truncate">{{ collectionName ?? networkName }}</span>
          </div>
        </div>

        <PartySelect allow-manual :model-value="toAddress" :options="recipientOptions" :label="t('review.to')"
          :placeholder="t('transfer.chooseRecipient')" @update:model-value="toAddress = $event" />
        <p v-if="recipientError" class="text-caption text-error mt-1">{{ recipientError }}</p>
        <p v-else-if="payeeChainWarning" class="text-caption text-warning mt-1">{{ payeeChainWarning }}</p>

        <v-text-field v-if="isMulti" v-model="quantityText" :label="t('nfts.quantity')" inputmode="numeric"
          :hint="t('nfts.held', { count: nft.balance })" persistent-hint :error-messages="quantityError ?? undefined"
          density="compact" class="mt-4" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</v-btn>
        <v-btn color="primary" variant="flat" :disabled="!canReview" :loading="busy" @click="openReview">
          {{ t('common.review') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <TransactionReviewDialog v-model="reviewOpen" :title="t('review.title')" :rows="reviewRows"
    :confirm-label="t('send.submit')" :busy="busy" @confirm="confirm" />
</template>
