<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import QRCode from 'qrcode'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme, setStoredTheme, type ThemeName } from '@/services/theme'
import { PrfNotSupportedError } from '@/services/webauthnLocal'

const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const messages = useMessagesStore()
const theme = useTheme()
const isDark = ref(getStoredTheme() === 'dark')

const totpUri = ref('')
const totpQrDataUrl = ref('')
const totpCode = ref('')
const removeWarning = ref<'passkeyPrf' | 'totp' | null>(null)

function toggleTheme() {
  isDark.value = !isDark.value
  const next: ThemeName = isDark.value ? 'dark' : 'light'
  theme.global.name.value = next
  setStoredTheme(next)
  if (navigator.vibrate) navigator.vibrate(5)
}

async function addPasskey() {
  try {
    await vault.registerPasskey('wwwallet')
    messages.push('Face ID / Touch ID unlock is ready.', 'success')
  } catch (err) {
    messages.push(
      err instanceof PrfNotSupportedError ? err.message : (err as Error).message,
      'error',
    )
  }
}

async function startTotpEnrollment() {
  const { provisioningUri } = vault.enrollTotp()
  totpUri.value = provisioningUri
  totpQrDataUrl.value = await QRCode.toDataURL(provisioningUri, { width: 220, margin: 1 })
}

async function confirmTotp() {
  const ok = await vault.confirmTotpEnrollment(totpCode.value)
  messages.push(ok ? 'Authenticator app unlock is ready.' : 'Incorrect code — try again.', ok ? 'success' : 'error')
  if (ok) totpUri.value = ''
}

function requestRemove(method: 'passkeyPrf' | 'totp') {
  const wouldLeaveNoQuickUnlock =
    method === 'passkeyPrf' ? !vault.totpEnabled : !vault.hasPasskey
  if (wouldLeaveNoQuickUnlock) {
    removeWarning.value = method
  } else {
    void performRemove(method)
  }
}

async function performRemove(method: 'passkeyPrf' | 'totp') {
  if (method === 'passkeyPrf') await vault.removePasskey()
  else await vault.disableTotp()
  removeWarning.value = null
}
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center" no-gutters>
      <h1 class="text-h5">Settings</h1>
      <v-btn
        :icon="isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
        variant="text"
        aria-label="Toggle theme"
        @click="toggleTheme"
      />
    </v-row>

    <v-select
      class="mt-4"
      label="Language"
      :items="settings.languages"
      item-title="name"
      item-value="id"
      v-model="settings.locale"
      @update:model-value="settings.setLocale"
    />
    <v-select
      class="mt-4"
      label="Currency"
      :items="settings.currencies"
      v-model="settings.currency"
    />

    <v-list class="mt-4" rounded="lg">
      <v-list-item to="/backup-restore" title="Backup &amp; restore" prepend-icon="mdi-cloud-upload" append-icon="mdi-chevron-right" />
      <v-list-item to="/payees" title="Payees" prepend-icon="mdi-account" append-icon="mdi-chevron-right" />
    </v-list>

    <h2 class="text-h6 mt-6">Security</h2>
    <p class="text-caption text-medium-emphasis mb-2">
      Your recovery passphrase is never stored anywhere it could be shown back to you —
      keep it somewhere safe. Use the options below for everyday unlock.
    </p>

    <v-card class="pa-4 mt-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-fingerprint" class="mr-3" />
        <div class="flex-grow-1">
          <p class="text-body-2">Face ID / Touch ID</p>
          <p class="text-caption text-medium-emphasis">{{ vault.hasPasskey ? 'Enabled' : 'Not set up' }}</p>
        </div>
        <v-btn v-if="vault.hasPasskey" variant="text" color="error" @click="requestRemove('passkeyPrf')">Remove</v-btn>
        <v-btn v-else variant="outlined" @click="addPasskey">Enable</v-btn>
      </div>
    </v-card>

    <v-card class="pa-4 mt-4">
      <div class="d-flex align-center">
        <v-icon icon="mdi-cellphone-key" class="mr-3" />
        <div class="flex-grow-1">
          <p class="text-body-2">Authenticator app</p>
          <p class="text-caption text-medium-emphasis">{{ vault.totpEnabled ? 'Enabled' : 'Not set up' }}</p>
        </div>
        <v-btn v-if="vault.totpEnabled" variant="text" color="error" @click="requestRemove('totp')">Remove</v-btn>
        <v-btn v-else-if="!totpUri" variant="outlined" @click="startTotpEnrollment">Enable</v-btn>
      </div>

      <template v-if="totpUri">
        <p class="text-caption mt-4 mb-2">Scan this with your authenticator app:</p>
        <div class="d-flex justify-center mb-2">
          <v-img v-if="totpQrDataUrl" :src="totpQrDataUrl" width="220" height="220" />
        </div>
        <v-text-field v-model="totpCode" label="Enter the 6-digit code" maxlength="6" inputmode="numeric" />
        <v-btn variant="outlined" block @click="confirmTotp">Confirm code</v-btn>
      </template>
    </v-card>

    <v-dialog :model-value="removeWarning !== null" max-width="420" @update:model-value="removeWarning = null">
      <v-card>
        <v-card-title>Remove your only quick unlock method?</v-card-title>
        <v-card-text>
          You'll need your full recovery passphrase every time you unlock wwwallet until
          you set up another method.
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="removeWarning = null">Cancel</v-btn>
          <v-spacer />
          <v-btn color="error" @click="removeWarning && performRemove(removeWarning)">Remove anyway</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
