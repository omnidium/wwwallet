<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatUnits, parseUnits } from 'ethers'
import { api, type ChainSlug, type SwapQuote } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import { encodeApprove } from '@/services/erc20'

const NATIVE_SENTINEL = 'ETH'
// The pseudo-address DEX aggregators (including 0x's Swap API) use to mean
// "the chain's native currency" — there's no real ERC-20 contract for it.
const NATIVE_PSEUDO_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const MAX_UINT256 = (2n ** 256n - 1n).toString()

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
const buyAmountFormatted = ref('')
const busy = ref(false)
const quoteFormValid = ref(false)

const sellTokenRules = [
  (v: string) => v.trim().toUpperCase() === NATIVE_SENTINEL || isValidAddress(v.trim()) || 'Enter a valid token address, or ETH for native.',
]
const buyTokenRules = [(v: string) => isValidAddress(v.trim()) || 'Enter a valid buy token address.']
const sellAmountRules = [(v: string) => (!!v && Number(v) > 0) || 'Enter an amount greater than zero.']

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
      <v-form v-model="quoteFormValid">
        <v-text-field v-model="sellToken" label="Sell token (address, or ETH for native)" :rules="sellTokenRules" />
        <v-text-field v-model="buyToken" label="Buy token address" :rules="buyTokenRules" />
        <v-text-field v-model="sellAmount" label="Sell amount" type="number" min="0" step="any" :rules="sellAmountRules" />

        <v-btn variant="outlined" block class="mb-4" :disabled="!quoteFormValid" :loading="busy" @click="getQuote">Get quote</v-btn>
      </v-form>

      <template v-if="quote">
        <v-alert type="info" variant="tonal" class="mb-4">
          Estimated to receive: {{ buyAmountFormatted }} at price {{ quote.price }}
        </v-alert>
        <v-text-field v-model="keystorePassword" type="password" label="Keystore password" :rules="[(v: string) => !!v || 'Keystore password is required.']" />
        <v-btn color="primary" block :loading="busy" @click="submit">Swap</v-btn>
      </template>
    </v-card>
  </v-container>
</template>
