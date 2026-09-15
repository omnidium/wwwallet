<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme, setStoredTheme, type ThemeName } from '@/services/theme'
import { PrfNotSupportedError } from '@/services/webauthnLocal'

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
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

function lockNow() {
  vault.lock()
  emit('close')
  // Named route, not '/': if the drawer is opened from the accounts list
  // (the common case — that's the landing page), pushing '/' while already
  // on '/' is a same-location no-op in vue-router, so the router guard never
  // re-runs and the screen doesn't actually redirect to the unlock view
  // until some later click triggers a real navigation.
  router.push({ name: 'vault-unlock' })
}
</script>

<template>
  <div class="pa-4">
    <v-row justify="space-between" align="center" no-gutters>
      <h1 class="text-h5">{{ t('settings.title') }}</h1>
      <div>
        <v-btn
          :icon="isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
          variant="text"
          :aria-label="t('settings.toggleThemeAria')"
          @click="toggleTheme"
        />
        <v-btn icon="mdi-close" variant="text" :aria-label="t('settings.closeAria')" @click="emit('close')" />
      </div>
    </v-row>

    <v-btn class="mt-4" color="error" variant="outlined" block prepend-icon="mdi-lock" @click="lockNow">
      {{ t('settings.lockNow') }}
    </v-btn>

    <v-select
      class="mt-4"
      :label="t('settings.languageLabel')"
      :items="settings.languages"
      item-title="name"
      item-value="id"
      v-model="settings.locale"
      @update:model-value="settings.setLocale"
    />
    <v-select
      class="mt-4"
      :label="t('settings.currencyLabel')"
      :items="settings.currencies"
      v-model="settings.currency"
    />

    <v-list class="mt-4" rounded="lg">
      <v-list-item to="/backup-restore" :title="t('backup.title')" prepend-icon="mdi-cloud-upload" append-icon="mdi-chevron-right" @click="emit('close')" />
      <v-list-item to="/payees" :title="t('payees.title')" prepend-icon="mdi-account" append-icon="mdi-chevron-right" @click="emit('close')" />
    </v-list>

    <h2 class="text-h6 mt-6">{{ t('settings.securityTitle') }}</h2>
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
