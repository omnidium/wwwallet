<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChainDataStore } from '@/stores/chainData'
import { useMessagesStore } from '@/stores/messages'
import { useAccountsStore } from '@/stores/accounts'
import type { ChainSlug } from '@/services/api'

const route = useRoute()
const chainData = useChainDataStore()
const messages = useMessagesStore()
const accounts = useAccountsStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

onMounted(async () => {
  try {
    await chainData.loadAddressActivity(chain, address)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
})
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ account?.label ?? address }}</h1>
    <p class="text-medium-emphasis" style="word-break: break-all">{{ address }} ({{ chain }})</p>

    <v-progress-linear v-if="chainData.loading" indeterminate class="my-4" />

    <template v-else>
      <v-list>
        <v-list-item
          v-for="balance in chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances ?? []"
          :key="balance.contract_address ?? balance.symbol"
          :title="`${balance.balance} ${balance.symbol}`"
        />
      </v-list>
      <v-btn class="mt-4 mr-2" color="primary" :to="`/accounts/${chain}/${address}/send`">Send</v-btn>
      <v-btn class="mt-4 mr-2" variant="outlined" :to="`/accounts/${chain}/${address}/receive`">Receive</v-btn>
      <v-btn class="mt-4" variant="outlined" :to="`/accounts/${chain}/${address}/transactions`">Transactions</v-btn>
    </template>
  </v-container>
</template>
