<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useChainDataStore } from '@/stores/chainData'
import type { ChainSlug } from '@/services/api'

const route = useRoute()
const chainData = useChainDataStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
</script>

<template>
  <v-container>
    <h1 class="text-h5">Transactions</h1>
    <v-list v-if="activity">
      <v-list-item
        v-for="txn in activity.transactions"
        :key="txn.hash"
        :title="`${txn.value} ${txn.asset}`"
        :subtitle="txn.hash"
      />
    </v-list>
    <v-alert v-else type="info" variant="tonal" class="mt-4">
      Visit an account first to load its transaction history.
    </v-alert>
  </v-container>
</template>
