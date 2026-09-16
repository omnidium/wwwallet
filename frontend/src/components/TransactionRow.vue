<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '@/services/api'

const props = defineProps<{ transaction: Transaction; myAddress: string }>()
defineEmits<{ click: [] }>()

const isOutgoing = computed(() => props.transaction.from.toLowerCase() === props.myAddress.toLowerCase())
const counterparty = computed(() => (isOutgoing.value ? props.transaction.to : props.transaction.from))

function truncateMiddle(value: string): string {
  return value.length > 14 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value
}
</script>

<template>
  <div class="txn-row d-flex align-center" role="button" tabindex="0" @click="$emit('click')" @keydown.enter="$emit('click')">
    <v-icon
      :icon="isOutgoing ? 'mdi-tray-arrow-up' : 'mdi-tray-arrow-down'"
      :color="isOutgoing ? 'send' : 'receive'"
      class="mr-3"
    />
    <span v-if="counterparty" class="txn-row-counterparty text-medium-emphasis text-truncate">
      {{ truncateMiddle(counterparty) }}
    </span>
    <v-spacer />
    <span v-if="transaction.status !== 'success'" class="text-caption text-warning mr-2">
      {{ transaction.status }}
    </span>
    <span class="txn-row-amount font-weight-medium" :class="isOutgoing ? 'text-send' : 'text-receive'">
      {{ isOutgoing ? '−' : '+' }}{{ transaction.value }} {{ transaction.asset }}
    </span>
  </div>
</template>
