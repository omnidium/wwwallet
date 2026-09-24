<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { passkeyWrapMeta, unlockWithMnemonic as verifyMnemonic } from '@/crypto/vault'
import { unlockPasskeyPrfSecret, hasLocalPasskey } from '@/services/webauthnLocal'
import { isValidRecoveryMnemonic, normalizeMnemonic } from '@/services/mnemonic'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; authenticated: [] }>()

const { t } = useI18n({ useScope: 'global' })
const hasPasskey = ref(false)
const reauthing = ref(false)
const reauthFailed = ref(false)
const recoveryPhrase = ref('')
const recoveryPhraseRules = [
  (v: string) => !v || isValidRecoveryMnemonic(v) || t('validation.recoveryPhraseFormat'),
]

watch(
  () => props.modelValue,
  async (open) => {
    if (!open) return
    reauthFailed.value = false
    recoveryPhrase.value = ''
    hasPasskey.value = await hasLocalPasskey()
    if (hasPasskey.value) await tryPasskeyReauth()
  },
)

function close() {
  emit('update:modelValue', false)
}

function succeed() {
  emit('update:modelValue', false)
  emit('authenticated')
}

async function tryPasskeyReauth() {
  reauthing.value = true
  reauthFailed.value = false
  try {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error('no passkey')
    await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    succeed()
  } catch {
    reauthFailed.value = true
  } finally {
    reauthing.value = false
  }
}

async function tryPhraseReauth() {
  reauthing.value = true
  reauthFailed.value = false
  try {
    await verifyMnemonic(normalizeMnemonic(recoveryPhrase.value))
    succeed()
  } catch {
    reauthFailed.value = true
  } finally {
    reauthing.value = false
  }
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="pa-4">
      <v-card-title>{{ t('secretReveal.confirmIdentity') }}</v-card-title>
      <v-card-text v-if="hasPasskey">
        <p class="mb-2">{{ t('secretReveal.confirmWithPasskey') }}</p>
        <v-alert v-if="reauthFailed" type="error" variant="tonal" class="mb-2">{{ t('secretReveal.reauthFailed') }}</v-alert>
        <v-btn color="primary" block :loading="reauthing" prepend-icon="mdi-fingerprint" @click="tryPasskeyReauth">
          {{ t('secretReveal.tryAgain') }}
        </v-btn>
      </v-card-text>
      <v-card-text v-else>
        <p class="mb-2">{{ t('secretReveal.confirmWithPhrase') }}</p>
        <v-textarea v-model="recoveryPhrase" :label="t('vaultUnlock.recoveryPhraseLabel')" rows="2" auto-grow :rules="recoveryPhraseRules" />
        <v-alert v-if="reauthFailed" type="error" variant="tonal" class="mb-2">{{ t('secretReveal.reauthFailed') }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="close">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn v-if="!hasPasskey" color="primary" :loading="reauthing" @click="tryPhraseReauth">{{ t('secretReveal.ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
