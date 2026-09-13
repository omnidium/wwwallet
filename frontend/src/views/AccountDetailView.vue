<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChainDataStore } from '@/stores/chainData'
import type { ChainSlug } from '@/services/api'

const route = useRoute()
const chainData = useChainDataStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string

onMounted(() => chainData.loadAddressActivity(chain, address))
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ address }}</h1>
    <p class="text-medium-emphasis">{{ chain }}</p>

    <v-progress-linear v-if="chainData.loading" indeterminate class="my-4" />

    <template v-else>
      <v-list>
        <v-list-item
          v-for="balance in chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances ?? []"
          :key="balance.contract_address ?? balance.symbol"
          :title="`${balance.balance} ${balance.symbol}`"
        />
      </v-list>
      <v-btn class="mt-4 mr-2" color="primary" :to="`/send`">Send</v-btn>
      <v-btn class="mt-4" variant="outlined" :to="`/receive`">Receive</v-btn>
    </template>
  </v-container>
</template>
