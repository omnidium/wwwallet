<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseUnits } from 'ethers'
import { api, type ChainSlug } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { isValidAddress, unlockWalletForSigning } from '@/services/wallet'
import QrScannerDialog from '@/components/QrScannerDialog.vue'

const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const payees = usePayeesStore()
const messages = useMessagesStore()
const chainData = useChainDataStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

const to = ref('')
const amount = ref('')
const keystorePassword = ref('')
const busy = ref(false)
const scannerOpen = ref(false)
const formValid = ref(false)

const relevantPayees = payees.payees.filter((p) => p.chain === chain)

const nativeBalance = computed(() => {
  const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
  const native = activity?.balances.find((b) => b.contract_address === null)
  return native ? Number(native.balance) : null
})

const amountRules = [
  (v: string) => (!!v && Number(v) > 0) || 'Enter an amount greater than zero.',
  (v: string) =>
    nativeBalance.value === null ||
    Number(v) <= nativeBalance.value ||
    'Amount to send is more than the FROM account balance (including transaction fee).',
]
const addressRules = [(v: string) => isValidAddress(v.trim()) || 'Enter a valid recipient address.']

onMounted(async () => {
  try {
    await chainData.loadAddressActivity(chain, address)
  } catch {
    // Balance just won't be available for the inline insufficient-funds check.
  }
})

function pickPayee(payeeAddress: string) {
  to.value = payeeAddress
}

/** Handles both a bare address and an EIP-681 "ethereum:0x...@chainId" URI. */
function onQrDecoded(data: string) {
  const match = data.match(/0x[a-fA-F0-9]{40}/)
  if (!match) {
    messages.push('QR code did not contain a recognizable address.', 'warning')
    return
  }
  to.value = match[0]
}

async function submit() {
  if (!account || !formValid.value) return

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
      <v-form v-model="formValid">
        <v-text-field v-model="to" label="Recipient address" :rules="addressRules">
          <template #append-inner>
            <v-icon
              icon="mdi-qrcode-scan"
              role="button"
              aria-label="Scan QR code"
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

        <v-text-field v-model="amount" label="Amount" type="number" min="0" step="any" :rules="amountRules" />
        <v-text-field v-model="keystorePassword" type="password" label="Keystore password" :rules="[(v: string) => !!v || 'Keystore password is required.']" />

        <v-btn color="primary" block class="mt-2" :disabled="!formValid" :loading="busy" @click="submit">Send</v-btn>
      </v-form>
    </v-card>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />
  </v-container>
</template>
