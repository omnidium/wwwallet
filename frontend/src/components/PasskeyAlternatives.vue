<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useQuickUnlock } from '@/composables/useQuickUnlock'
import type { PasskeyLocation } from '@/services/webauthnLocal'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

// "Use a phone / a security key instead" — for when this device's own
// authenticator can't (or might not) do a passkey. The phone option shows
// only where the browser can use one (see useQuickUnlock's phonePossible).
withDefaults(defineProps<{ variant?: 'text' | 'outlined'; small?: boolean; block?: boolean }>(), {
  variant: 'text',
  small: false,
  block: true,
})
const emit = defineEmits<{ done: [] }>()

const { t } = useI18n({ useScope: 'global' })
const quick = useQuickUnlock()

async function setUp(where: PasskeyLocation) {
  if (await quick.setUpPasskey(where)) emit('done')
}
</script>

<template>
  <v-btn v-if="quick.phonePossible.value" :variant="variant" :size="small ? 'small' : undefined" :block="block"
    prepend-icon="mdi-cellphone-key" :loading="quick.busy.value" @click="setUp('phone')">
    {{ t('quickUnlock.usePhone') }}
    <template #loader>
      <CircuitSpinner />
    </template>
  </v-btn>
  <v-btn :variant="variant" :size="small ? 'small' : undefined" :block="block" prepend-icon="mdi-usb-flash-drive"
    :disabled="quick.busy.value" @click="setUp('securityKey')">
    {{ t('quickUnlock.useSecurityKey') }}
  </v-btn>
</template>
