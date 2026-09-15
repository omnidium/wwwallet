<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme, setStoredTheme, type ThemeName } from '@/services/theme'
import { PrfNotSupportedError } from '@/services/webauthnLocal'

const emit = defineEmits<{ close: [] }>()

const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const messages = useMessagesStore()
const theme = useTheme()
const router = useRouter()
const isDark = ref(getStoredTheme() === 'dark')

const removePasskeyWarningOpen = ref(false)

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

function requestRemovePasskey() {
  removePasskeyWarningOpen.value = true
}

async function performRemovePasskey() {
  await vault.removePasskey()
  removePasskeyWarningOpen.value = false
}

function lockNow() {
  vault.lock()
  emit('close')
  router.push('/')
}
</script>

<template>
  <div class="pa-4">
    <v-row justify="space-between" align="center" no-gutters>
      <h1 class="text-h5">Settings</h1>
      <div>
        <v-btn
          :icon="isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
          variant="text"
          aria-label="Toggle theme"
          @click="toggleTheme"
        />
        <v-btn icon="mdi-close" variant="text" aria-label="Close settings" @click="emit('close')" />
      </div>
    </v-row>

    <v-btn class="mt-4" color="error" variant="outlined" block prepend-icon="mdi-lock" @click="lockNow">
      Lock now
    </v-btn>

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
      <v-list-item to="/backup-restore" title="Backup &amp; restore" prepend-icon="mdi-cloud-upload" append-icon="mdi-chevron-right" @click="emit('close')" />
      <v-list-item to="/payees" title="Payees" prepend-icon="mdi-account" append-icon="mdi-chevron-right" @click="emit('close')" />
    </v-list>

    <h2 class="text-h6 mt-6">Security</h2>
    <p class="text-caption text-medium-emphasis mb-2">
      Your recovery phrase is never stored anywhere it could be shown back to you —
      keep it somewhere safe. Face ID / Touch ID is the fast path for everyday unlock;
      wwwallet also locks itself automatically after a few minutes of inactivity.
    </p>

    <v-card class="pa-4 mt-2">
      <div class="d-flex align-center">
        <v-icon icon="mdi-fingerprint" class="mr-3" />
        <div class="flex-grow-1">
          <p class="text-body-2">Face ID / Touch ID</p>
          <p class="text-caption text-medium-emphasis">{{ vault.hasPasskey ? 'Enabled' : 'Not set up' }}</p>
        </div>
        <v-btn v-if="vault.hasPasskey" variant="text" color="error" @click="requestRemovePasskey">Remove</v-btn>
        <v-btn v-else variant="outlined" @click="addPasskey">Enable</v-btn>
      </div>
    </v-card>

    <v-dialog v-model="removePasskeyWarningOpen" max-width="420">
      <v-card>
        <v-card-title>Remove Face ID / Touch ID unlock?</v-card-title>
        <v-card-text>
          You'll need your full recovery phrase every time you unlock wwwallet until you
          set up a passkey again.
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="removePasskeyWarningOpen = false">Cancel</v-btn>
          <v-spacer />
          <v-btn color="error" @click="performRemovePasskey">Remove anyway</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
