<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useChainDataStore } from '@/stores/chainData'
import type { ChainSlug } from '@/services/api'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const chainData = useChainDataStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const activity = chainData.activityByAddress[chainData.keyFor(chain, address)]
</script>

<template>
  <div>
    <h1 class="text-h5">{{ t('transactions.title') }}</h1>
    <template v-if="activity">
      <v-list v-if="activity.transactions.length">
        <v-list-item
          v-for="txn in activity.transactions"
          :key="txn.hash"
          :title="`${txn.value} ${txn.asset}`"
          :subtitle="txn.hash"
          :prepend-icon="txn.from.toLowerCase() === address.toLowerCase() ? 'mdi-tray-arrow-up' : 'mdi-tray-arrow-down'"
          :base-color="txn.from.toLowerCase() === address.toLowerCase() ? 'send' : 'receive'"
        />
      </v-list>
      <p v-else class="text-medium-emphasis mt-4">{{ t('transactions.empty') }}</p>
    </template>
    <v-alert v-else type="info" variant="tonal" class="mt-4">
      {{ t('transactions.visitAccountFirst') }}
    </v-alert>
  </div>
</template>
