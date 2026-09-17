<script setup lang="ts">
import { computed, watch } from 'vue'
import type { ChainSlug, Transaction } from '@/services/api'
import { useChainDataStore } from '@/stores/chainData'
import { addressDisplayLabel } from '@/services/addressLabel'

const props = defineProps<{ transaction: Transaction; myAddress: string; chain: ChainSlug }>()
defineEmits<{ click: [] }>()

const chainData = useChainDataStore()

const isOutgoing = computed(() => props.transaction.from.toLowerCase() === props.myAddress.toLowerCase())
const counterparty = computed(() => (isOutgoing.value ? props.transaction.to : props.transaction.from))
const counterpartyLabel = computed(() =>
  counterparty.value ? addressDisplayLabel(props.chain, counterparty.value) : null,
)
const isSwap = computed(() => props.transaction.counter_asset != null)

function logoUrlFor(contractAddress: string | null): string | null {
  if (contractAddress === null) return null
  const key = chainData.keyFor(props.chain, contractAddress)
  return chainData.tokenMetadataByKey[key]?.logo_url ?? null
}
const soldLogoUrl = computed(() => logoUrlFor(props.transaction.contract_address))
const boughtLogoUrl = computed(() => logoUrlFor(props.transaction.counter_contract_address))

// Lazy-load metadata for both swap legs the first time this row appears —
// a token bought in a swap may never have been held before, so it isn't
// necessarily already cached the way an account's own balances are.
watch(
  () => [props.transaction.contract_address, props.transaction.counter_contract_address] as const,
  ([sold, bought]) => {
    for (const contractAddress of [sold, bought]) {
      if (!contractAddress) continue
      const key = chainData.keyFor(props.chain, contractAddress)
      if (!chainData.tokenMetadataByKey[key]) void chainData.loadTokenMetadata(props.chain, contractAddress)
    }
  },
  { immediate: true },
)

</script>

<template>
  <div v-if="isSwap" class="txn-row d-flex align-center" role="button" tabindex="0" @click="$emit('click')" @keydown.enter="$emit('click')">
    <div class="d-flex align-center">
      <v-avatar v-if="soldLogoUrl" :image="soldLogoUrl" size="20" class="mr-1" />
      <v-icon v-else icon="mdi-cash" size="20" class="mr-1" />
      <span class="txn-row-amount text-send">−{{ transaction.value }} {{ transaction.asset }}</span>
    </div>
    <v-icon icon="mdi-arrow-right-thin" size="small" class="mx-2 text-medium-emphasis" />
    <div class="d-flex align-center">
      <v-avatar v-if="boughtLogoUrl" :image="boughtLogoUrl" size="20" class="mr-1" />
      <v-icon v-else icon="mdi-cash" size="20" class="mr-1" />
      <span class="txn-row-amount text-receive">+{{ transaction.counter_value }} {{ transaction.counter_asset }}</span>
    </div>
    <v-spacer />
    <span v-if="transaction.status !== 'success'" class="text-caption text-warning">
      {{ transaction.status }}
    </span>
  </div>

  <div v-else class="txn-row d-flex align-center" role="button" tabindex="0" @click="$emit('click')" @keydown.enter="$emit('click')">
    <v-icon
      :icon="isOutgoing ? 'mdi-tray-arrow-up' : 'mdi-tray-arrow-down'"
      :color="isOutgoing ? 'send' : 'receive'"
      class="mr-3"
    />
    <span v-if="counterpartyLabel" class="txn-row-counterparty text-medium-emphasis text-truncate">
      {{ counterpartyLabel }}
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
