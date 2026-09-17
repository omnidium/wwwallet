<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TransferTarget } from '@/composables/useDragToTransfer'

const props = defineProps<{
  open: boolean
  targets: TransferTarget[]
  hoveredAddress: string | null
}>()

const { t } = useI18n({ useScope: 'global' })

const accountTargets = computed(() => props.targets.filter((target) => target.kind === 'account'))
const payeeTargets = computed(() => props.targets.filter((target) => target.kind === 'payee'))
</script>

<template>
  <div v-if="open" class="transfer-target-picker">
    <p class="text-h6 text-center mb-4">{{ t('transferPicker.title') }}</p>
    <div class="tile-groups">
      <div v-if="accountTargets.length" class="tiles">
        <p class="text-caption text-medium-emphasis w-100 text-center">{{ t('transferPicker.myAccounts') }}</p>
        <v-card
          v-for="target in accountTargets"
          :key="target.address"
          :data-drop-address="target.address"
          class="tile pa-3 text-center"
          :class="{ 'tile-hovered': hoveredAddress === target.address }"
          variant="tonal"
        >
          <v-icon icon="mdi-wallet" size="large" class="mb-1" />
          <p class="text-body-2 text-truncate">{{ target.label }}</p>
        </v-card>
      </div>
      <v-divider v-if="accountTargets.length && payeeTargets.length" vertical class="mx-4" />
      <div v-if="payeeTargets.length" class="tiles">
        <p class="text-caption text-medium-emphasis w-100 text-center">{{ t('transferPicker.payees') }}</p>
        <v-card
          v-for="target in payeeTargets"
          :key="target.address"
          :data-drop-address="target.address"
          class="tile pa-3 text-center"
          :class="{ 'tile-hovered': hoveredAddress === target.address }"
          variant="tonal"
        >
          <v-icon icon="mdi-account" size="large" class="mb-1" />
          <p class="text-body-2 text-truncate">{{ target.label }}</p>
        </v-card>
      </div>
    </div>
  </div>
</template>
