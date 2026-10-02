<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isValidAddress } from '@/services/wallet'
import { truncateAddress } from '@/services/format'
import type { ChainSlug } from '@/services/api'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import AppSelect, { type SelectItem } from '@/components/AppSelect.vue'

export interface PartyOption {
  address: string
  label: string
  /** e.g. the account's total balance. */
  subtitle?: string
  kind: 'account' | 'payee'
  /** Where it's set up (an account, main chain first) or was saved (a payee). Never empty. */
  chains: ChainSlug[]
}

// An account or recipient on AppSelect: a name chip, and a menu listing each
// one by its main chain's logo. With `allowManual`, the menu also takes a
// typed or pasted address.
const props = defineProps<{
  modelValue: string | null
  options: PartyOption[]
  /** "From"/"To" — the menu heading and accessible name. */
  label: string
  placeholder: string
  allowManual?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [string | null] }>()

const { t } = useI18n({ useScope: 'global' })

const manual = ref('')
const manualValid = computed(() => isValidAddress(manual.value.trim()))

const items = computed<SelectItem[]>(() =>
  props.options.map((o) => ({
    value: o.address,
    title: o.label,
    subtitle: truncateAddress(o.address),
    group: o.kind === 'account' ? t('transfer.myAccounts') : t('transfer.payees'),
    avatarText: o.label.trim().charAt(0).toUpperCase() || '?',
    tone: o.kind === 'payee' ? 'secondary' : undefined,
    logoUrl: `/chains/${o.chains[0]}.svg`,
    logoBadge: o.chains.length > 1 ? `+${o.chains.length - 1}` : undefined,
    logoTooltip: o.chains.map((c) => NATIVE_ASSETS[c].networkName).join(', '),
    trailing: o.subtitle,
  })),
)

// An address typed in or scanned: not one of the options, shown as itself.
const fallback = computed(() =>
  props.modelValue ? { title: truncateAddress(props.modelValue), subtitle: t('transfer.externalAddress'), icon: 'mdi-at' } : null,
)

function submitManual(close: () => void) {
  if (!manualValid.value) return
  emit('update:modelValue', manual.value.trim())
  manual.value = ''
  close()
}
</script>

<template>
  <AppSelect :model-value="modelValue" :items="items" :label="label" :placeholder="placeholder"
    placeholder-icon="mdi-account-plus-outline" :fallback="fallback" :searchable="false" detail-mono
    @update:model-value="emit('update:modelValue', $event)">
    <template v-if="allowManual" #header="{ close }">
      <div class="pa-3 pb-1">
        <v-text-field v-model="manual" :placeholder="t('transfer.enterAddress')" density="compact" hide-details
          prepend-inner-icon="mdi-at" autocomplete="off" spellcheck="false" @keydown.enter.prevent="submitManual(close)">
          <template #append-inner>
            <v-btn v-if="manualValid" icon="mdi-arrow-right" size="x-small" variant="tonal" color="primary"
              :aria-label="t('transfer.useAddress')" @click="submitManual(close)" />
          </template>
        </v-text-field>
        <p v-if="manual.trim() && !manualValid" class="text-caption text-error mt-1 mb-0">
          {{ t('validation.invalidRecipientAddress') }}
        </p>
      </div>
    </template>
  </AppSelect>
</template>
