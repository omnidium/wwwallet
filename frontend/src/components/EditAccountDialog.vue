<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WalletAccount } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { truncateAddress } from '@/services/format'

const props = defineProps<{ modelValue: boolean; account: WalletAccount | null }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })
const accounts = useAccountsStore()
const label = ref('')
const setAsDefault = ref(false)

watch(
  () => props.account,
  (account) => {
    label.value = account?.label ?? ''
    setAsDefault.value = account?.isDefault ?? false
  },
  { immediate: true },
)

async function save() {
  if (!props.account) return
  await accounts.rename(props.account.chain, props.account.address, label.value.trim())
  if (setAsDefault.value && !props.account.isDefault) {
    await accounts.promoteToDefault(props.account.chain, props.account.address)
  }
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="420" @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="account" class="pa-4">
      <v-card-title>{{ t('editAccount.title') }}</v-card-title>
      <v-card-text>
        <p class="text-caption text-medium-emphasis mb-2">{{ truncateAddress(account.address) }}</p>
        <v-text-field v-model="label" :label="t('editAccount.labelField')" autofocus />
        <!-- A discovered copy on another chain is never that chain's default. -->
        <v-checkbox v-if="!account.discovered" v-model="setAsDefault" :label="t('editAccount.setDefault')"
          density="compact" hide-details />
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="save">{{ t('editAccount.update') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
