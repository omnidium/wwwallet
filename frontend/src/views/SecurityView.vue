<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { PrfNotSupportedError } from '@/services/webauthnLocal'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const vault = useVaultStore()
const messages = useMessagesStore()

const removePasskeyWarningOpen = ref(false)
const deleteWalletWarningOpen = ref(false)
const deleteWalletAcked = ref(false)

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

function requestDeleteWallet() {
  deleteWalletAcked.value = false
  deleteWalletWarningOpen.value = true
}

async function performDeleteWallet() {
  await vault.deleteFromDevice()
  deleteWalletWarningOpen.value = false
  router.push({ name: 'vault-setup' })
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

    <h2 class="text-subtitle-1 text-error mt-6">{{ t('settings.dangerZoneTitle') }}</h2>
    <v-card class="pa-4 mt-2" variant="outlined">
      <div class="d-flex align-center">
        <v-icon icon="mdi-delete-outline" color="error" class="mr-3" />
        <div class="flex-grow-1">
          <p class="text-body-2">{{ t('settings.deleteWalletLabel') }}</p>
          <p class="text-caption text-medium-emphasis">
            {{ t('settings.deleteWalletDescription') }}
          </p>
        </div>
        <v-btn variant="text" color="error" @click="requestDeleteWallet">{{ t('settings.deleteWalletButton') }}</v-btn>
      </div>
    </v-card>

    <v-dialog v-model="deleteWalletWarningOpen" max-width="420">
      <v-card>
        <v-card-title>{{ t('settings.deleteWalletTitle') }}</v-card-title>
        <v-card-text>
          <p>{{ t('settings.deleteWalletBody') }}</p>
          <p v-if="vault.lastBackupAt === null" class="text-error font-weight-bold mt-2">
            {{ t('settings.deleteWalletNeverBackedUp') }}
          </p>
          <v-checkbox
            v-model="deleteWalletAcked"
            :label="t('settings.deleteWalletAckLabel')"
            color="error"
            density="compact"
            hide-details
            class="mt-2"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="deleteWalletWarningOpen = false">{{ t('common.cancel') }}</v-btn>
          <v-spacer />
          <v-btn color="error" :disabled="!deleteWalletAcked" @click="performDeleteWallet">
            {{ t('settings.deleteWalletConfirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
