<script setup lang="ts">
import { computed, mergeProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChainSlug } from '@/services/api'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { chainItems } from '@/services/chainItems'
import AppSelect from '@/components/AppSelect.vue'
import AppTooltip from '@/components/AppTooltip.vue'

export interface ChainOption {
  chain: ChainSlug
  /** Shown under the network name, e.g. the account's balance there. */
  subtitle?: string
  disabled?: boolean
}

// A chain as just its logo — a whole row per chain field would crowd the
// panel — with its name in the tooltip and the menu. AppSelect's menu, with
// an icon-only trigger.
const props = defineProps<{
  modelValue: ChainSlug
  options: ChainOption[]
  /** What this chain is for, e.g. "From network" — the tooltip and menu heading. */
  label: string
}>()
const emit = defineEmits<{ 'update:modelValue': [ChainSlug] }>()

const { t } = useI18n({ useScope: 'global' })

const networkName = computed(() => NATIVE_ASSETS[props.modelValue].networkName)
const changeable = computed(() => props.options.filter((o) => !o.disabled).length > 1)
const items = computed(() => {
  const byChain = new Map(props.options.map((o) => [o.chain, o]))
  return chainItems(props.options.map((o) => o.chain), (c) => byChain.get(c)?.subtitle).map((item) => ({
    ...item,
    disabled: byChain.get(item.value as ChainSlug)?.disabled,
  }))
})
</script>

<template>
  <AppSelect :model-value="modelValue" :items="items" :label="label" :disabled="!changeable" :searchable="false"
    menu-location="bottom end" @update:model-value="emit('update:modelValue', $event as ChainSlug)">
    <template #activator="{ props: menuProps }">
      <AppTooltip :text="`${label}: ${networkName}`">
        <template #default="{ activatorProps }">
          <button v-bind="mergeProps(menuProps, activatorProps)" type="button" class="chain-select"
            :class="{ 'chain-select--fixed': !changeable }"
            :aria-label="t('transfer.chainAria', { label, network: networkName })">
            <img :src="`/chains/${modelValue}.svg`" alt="" class="chain-select-logo" />
            <v-icon v-if="changeable" icon="mdi-chevron-down" size="16" class="chain-select-caret" />
          </button>
        </template>
      </AppTooltip>
    </template>
  </AppSelect>
</template>
