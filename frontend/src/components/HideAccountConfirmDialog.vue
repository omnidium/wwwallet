<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { WalletAccount } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'

const props = defineProps<{ modelValue: boolean; account: WalletAccount | null }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n()
const accounts = useAccountsStore()

async function confirmHide() {
  if (!props.account) return
  await accounts.setVisibility(props.account.chain, props.account.address, false)
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="420" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="pa-4">
      <v-card-text class="text-body-1">{{ t('hideAccount.confirm') }}</v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn color="primary" @click="confirmHide">{{ t('hideAccount.hide') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
