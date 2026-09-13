<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseUnits } from 'ethers'
import { api, type ChainSlug, type SwapQuote } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { unlockWalletForSigning } from '@/services/wallet'
import { encodeApprove } from '@/services/erc20'

const NATIVE_SENTINEL = 'ETH'
const MAX_UINT256 = (2n ** 256n - 1n).toString()

const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const messages = useMessagesStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

const sellToken = ref(NATIVE_SENTINEL)
const buyToken = ref('')
const sellAmount = ref('')
const keystorePassword = ref('')
const quote = ref<SwapQuote | null>(null)
const busy = ref(false)

async function getQuote() {
  if (!buyToken.value.trim() || !sellAmount.value || Number(sellAmount.value) <= 0) {
    messages.push('Enter a buy token address and an amount.', 'warning')
    return
  }
  busy.value = true
  try {
    const sellAmountWei = parseUnits(sellAmount.value, 18).toString()
    quote.value = await api.swapQuote(chain, sellToken.value.trim(), buyToken.value.trim(), sellAmountWei, address)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function submit() {
  if (!account || !quote.value) return

  busy.value = true
  try {
    const wallet = await unlockWalletForSigning(account, keystorePassword.value)

    if (sellToken.value !== NATIVE_SENTINEL) {
      const { amount: currentAllowance } = await api.allowance(
        chain,
        sellToken.value,
        address,
        quote.value.allowance_target,
      )
      if (BigInt(currentAllowance) < BigInt(quote.value.sell_amount)) {
        const approvePrep = await api.transactionPrep(chain, address, sellToken.value, '0')
        const approveTx = await wallet.signTransaction({
          to: sellToken.value,
          value: '0',
          data: encodeApprove(quote.value.allowance_target, MAX_UINT256),
          nonce: approvePrep.nonce,
          gasLimit: approvePrep.gas_limit,
          gasPrice: approvePrep.gas_price,
          chainId: approvePrep.chain_id,
        })
        await api.broadcastTransaction(chain, approveTx)
        messages.push('Approval submitted. Wait for it to confirm, then swap again.', 'info')
        return
      }
    }

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
    messages.push(`Swap submitted. Transaction hash: ${transaction_hash}`, 'success')
    router.push(`/accounts/${chain}/${address}`)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5">Swap</h1>
    <p class="text-medium-emphasis mb-4">From {{ account?.label ?? address }} ({{ chain }})</p>

    <v-card class="pa-4" max-width="480">
      <v-text-field v-model="sellToken" label="Sell token (address, or ETH for native)" />
      <v-text-field v-model="buyToken" label="Buy token address" />
      <v-text-field v-model="sellAmount" label="Sell amount" type="number" min="0" step="any" />

      <v-btn variant="outlined" block class="mb-4" :loading="busy" @click="getQuote">Get quote</v-btn>

      <template v-if="quote">
        <v-alert type="info" variant="tonal" class="mb-4">
          Estimated to receive: {{ quote.buy_amount }} (raw units) at price {{ quote.price }}
        </v-alert>
        <v-text-field v-model="keystorePassword" type="password" label="Keystore password" />
        <v-btn color="primary" block :loading="busy" @click="submit">Swap</v-btn>
      </template>
    </v-card>
  </v-container>
</template>
