<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { PrfNotSupportedError } from '@/services/webauthnLocal'

const { t } = useI18n({ useScope: 'global' })
const vault = useVaultStore()
const messages = useMessagesStore()

const removePasskeyWarningOpen = ref(false)

async function addPasskey() {
  try {
    await vault.registerPasskey('wwwallet')
    messages.push(t('msg.passkey.ready'), 'success')
  } catch (err) {
    messages.push(
      err instanceof PrfNotSupportedError ? err.message : (err as Error).message,
      'error',
    )
  }
}

function requestRemovePasskey() {
  removePasskeyWarningOpen.value = true
}

async function performRemovePasskey() {
  await vault.removePasskey()
  removePasskeyWarningOpen.value = false
}
</script>

<template>
  <div>
    <h1 class="text-h5">{{ t('settings.securityTitle') }}</h1>
    <p class="text-caption text-medium-emphasis mb-2">
      {{ t('settings.securityIntro') }}
    </p>

    <v-card class="pa-4 mt-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-fingerprint" class="mr-3" />
        <div class="flex-grow-1">
          <p class="text-body-2">{{ t('settings.passkeyLabel') }}</p>
          <p class="text-caption text-medium-emphasis">
            {{ vault.hasPasskey ? t('settings.passkeyEnabled') : t('settings.passkeyNotSetUp') }}
          </p>
        </div>
        <v-btn v-if="vault.hasPasskey" variant="text" color="error" @click="requestRemovePasskey">{{ t('settings.remove') }}</v-btn>
        <v-btn v-else variant="outlined" @click="addPasskey">{{ t('settings.enable') }}</v-btn>
      </div>
    </v-card>

    <v-dialog v-model="removePasskeyWarningOpen" max-width="420">
      <v-card>
        <v-card-title>{{ t('settings.removePasskeyTitle') }}</v-card-title>
        <v-card-text>
          {{ t('settings.removePasskeyBody') }}
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="removePasskeyWarningOpen = false">{{ t('common.cancel') }}</v-btn>
          <v-spacer />
          <v-btn color="error" @click="performRemovePasskey">{{ t('settings.removeAnyway') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
