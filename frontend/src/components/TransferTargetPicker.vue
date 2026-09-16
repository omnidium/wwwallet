<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { WalletAccount } from '@/stores/accounts'

defineProps<{
  open: boolean
  targets: WalletAccount[]
  hoveredAddress: string | null
}>()

const { t } = useI18n()
</script>

<template>
  <div v-if="open" class="transfer-target-picker">
    <p class="text-h6 text-center mb-4">{{ t('transferPicker.title') }}</p>
    <div class="tiles">
      <v-card
        v-for="target in targets"
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
  </div>
</template>
