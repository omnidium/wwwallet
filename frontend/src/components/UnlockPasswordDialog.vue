<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { displayErrorMessage } from '@/services/errors'
import { UNLOCK_PASSWORD_MIN_LENGTH } from '@/config/appSettings'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

// Sets (or changes) this device's unlock password — quick unlock where a
// passkey can't work. See crypto/vault.ts's addPasswordWrap.
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ saved: [] }>()

const { t } = useI18n({ useScope: 'global' })
const vault = useVaultStore()
const messages = useMessagesStore()

const password = ref('')
const confirm = ref('')
const reveal = ref(false)
const busy = ref(false)

watch(open, (isOpen) => {
  if (!isOpen) return
  password.value = ''
  confirm.value = ''
  reveal.value = false
})

const passwordRules = [
  (v: string) => v.length >= UNLOCK_PASSWORD_MIN_LENGTH || t('quickUnlock.tooShort', { min: UNLOCK_PASSWORD_MIN_LENGTH }),
]
const confirmRules = [(v: string) => v === password.value || t('quickUnlock.mismatch')]
const valid = computed(() => password.value.length >= UNLOCK_PASSWORD_MIN_LENGTH && confirm.value === password.value)

async function save() {
  if (!valid.value) return
  busy.value = true
  try {
    await vault.setUnlockPassword(password.value)
    messages.push(t('quickUnlock.passwordSet'), 'success')
    open.value = false
    emit('saved')
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
    password.value = ''
    confirm.value = ''
  }
}
</script>

<template>
  <v-dialog v-model="open" max-width="420">
    <v-card class="pa-2">
      <v-card-title class="d-flex align-center ga-2">
        <v-icon icon="mdi-form-textbox-password" />
        {{ t('quickUnlock.passwordTitle') }}
      </v-card-title>
      <v-card-text>
        <p class="text-body-2 text-medium-emphasis mb-4">
          <BrandText :text="t('quickUnlock.passwordIntro', { min: UNLOCK_PASSWORD_MIN_LENGTH })" />
        </p>
        <v-form @submit.prevent="save">
          <v-text-field v-model="password" :label="t('quickUnlock.passwordField')" :type="reveal ? 'text' : 'password'"
            autocomplete="new-password" :rules="passwordRules"
            :append-inner-icon="reveal ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="reveal = !reveal" />
          <v-text-field v-model="confirm" :label="t('quickUnlock.confirmField')" :type="reveal ? 'text' : 'password'"
            autocomplete="new-password" :rules="confirmRules" class="mt-2" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="open = false">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn color="primary" variant="flat" :disabled="!valid" :loading="busy" @click="save">
          {{ t('common.save') }}
          <template #loader>
            <CircuitSpinner />
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
