<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseUnits } from 'ethers'
import { api, type ChainSlug } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'

const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const payees = usePayeesStore()
const messages = useMessagesStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

const to = ref('')
const amount = ref('')
const keystorePassword = ref('')
const busy = ref(false)

const relevantPayees = payees.payees.filter((p) => p.chain === chain)

function pickPayee(payeeAddress: string) {
  to.value = payeeAddress
}

async function submit() {
  if (!account) {
    messages.push('Account not found.', 'error')
    return
  }
  if (!isValidAddress(to.value.trim())) {
    messages.push('Enter a valid recipient address.', 'warning')
    return
  }
  if (!amount.value || Number(amount.value) <= 0) {
    messages.push('Enter an amount greater than zero.', 'warning')
    return
  }

  busy.value = true
  try {
    const valueWei = parseUnits(amount.value, 18).toString()
    const prep = await api.transactionPrep(chain, address, to.value.trim(), valueWei)

    const wallet = await unlockWalletForSigning(account, keystorePassword.value)
    const signedTx = await wallet.signTransaction({
      to: to.value.trim(),
      value: valueWei,
      nonce: prep.nonce,
      gasLimit: prep.gas_limit,
      gasPrice: prep.gas_price,
      chainId: prep.chain_id,
    })

    const { transaction_hash } = await api.broadcastTransaction(chain, signedTx)
    messages.push(`Sent. Transaction hash: ${transaction_hash}`, 'success')
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
    <h1 class="text-h5">Send</h1>
    <p class="text-medium-emphasis mb-4">From {{ account?.label ?? address }} ({{ chain }})</p>

    <v-card class="pa-4" max-width="480">
      <v-text-field v-model="to" label="Recipient address" />

      <v-chip-group v-if="relevantPayees.length" class="mb-2">
        <v-chip v-for="payee in relevantPayees" :key="payee.id" size="small" @click="pickPayee(payee.address)">
          {{ payee.label }}
        </v-chip>
      </v-chip-group>

      <v-text-field v-model="amount" label="Amount" type="number" min="0" step="any" />
      <v-text-field v-model="keystorePassword" type="password" label="Keystore password" />

      <v-btn color="primary" block class="mt-2" :loading="busy" @click="submit">Send</v-btn>
    </v-card>
  </v-container>
</template>
