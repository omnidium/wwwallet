<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { getStoredTheme, setStoredTheme, type ThemeName } from '@/services/theme'
import { clearLastActivity } from '@/services/lastActivity'
import AppTooltip from '@/components/AppTooltip.vue'
import ReauthDialog from '@/components/ReauthDialog.vue'

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n({ useScope: 'global' })
const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const theme = useTheme()
const router = useRouter()
const isDark = ref(getStoredTheme() === 'dark')
const appVersion = __APP_VERSION__

// Everything here except language and theme (toggled just above) can expose
// or change something sensitive, so it all sits behind one re-auth check —
// same passkey/recovery-phrase challenge already used to view a secret.
// Passing it once unlocks the rest of this same panel-open session; closing
// the panel (including by navigating to one of the gated destinations below)
// re-locks it, so re-opening Settings always challenges again.
const authorized = ref(false)
const reauthOpen = ref(false)
const pendingRoute = ref<string | null>(null)

function closePanel() {
  authorized.value = false
  emit('close')
}

function requestGatedNav(path: string) {
  if (authorized.value) {
    closePanel()
    router.push(path)
    return
  }
  pendingRoute.value = path
  reauthOpen.value = true
}

function onAuthenticated() {
  authorized.value = true
  if (pendingRoute.value) {
    const path = pendingRoute.value
    pendingRoute.value = null
    closePanel()
    router.push(path)
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  const next: ThemeName = isDark.value ? 'dark' : 'light'
  theme.change(next)
  setStoredTheme(next)
  if (navigator.vibrate) navigator.vibrate(5)
}

function lockNow() {
  vault.lock()
  // An explicit lock, unlike an idle timeout, shouldn't leave a "just active"
  // timestamp behind — that would make VaultUnlockView immediately auto-fire
  // the passkey prompt again and defeat the point of locking on purpose.
  clearLastActivity()
  // This panel stays mounted across a lock/unlock cycle (it's outside the
  // route-gated part of App.vue), so `authorized` would otherwise still be
  // true the next time Settings is opened after unlocking again.
  closePanel()
  // Named route, not '/': if the drawer is opened from the accounts list
  // (the common case — that's the landing page), pushing '/' while already
  // on '/' is a same-location no-op in vue-router, so the router guard never
  // re-runs and the screen doesn't actually redirect to the unlock view
  // until some later click triggers a real navigation.
  router.push({ name: 'vault-unlock' })
}
</script>

<template>
  <div class="pa-4 settings-panel">
    <v-row justify="space-between" align="center" no-gutters>
      <h1 class="text-h5">{{ t('settings.title') }}</h1>
      <div>
        <AppTooltip :text="t('settings.toggleThemeAria')" location="bottom">
          <template #default="{ activatorProps }">
            <v-btn v-bind="activatorProps" :icon="isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
              variant="text" :aria-label="t('settings.toggleThemeAria')" @click="toggleTheme" />
          </template>
        </AppTooltip>
        <AppTooltip :text="t('settings.closeAria')" location="bottom">
          <template #default="{ activatorProps }">
            <v-btn v-bind="activatorProps" icon="mdi-close" variant="text" :aria-label="t('settings.closeAria')"
              @click="closePanel" />
          </template>
        </AppTooltip>
      </div>
    </v-row>

    <v-select class="mt-4" density="default" hide-details :label="t('settings.languageLabel')"
      :items="settings.languages" item-title="name" item-value="id" v-model="settings.locale"
      @update:model-value="settings.setLocale" />
    <v-select v-if="authorized" class="mt-4" density="default" hide-details :label="t('settings.currencyLabel')"
      :items="settings.currencies" v-model="settings.currency" />
    <v-list v-else class="mt-4" rounded="lg">
      <v-list-item :title="t('settings.currencyLabel')" :subtitle="settings.currency" prepend-icon="mdi-cash"
        append-icon="mdi-lock" @click="reauthOpen = true" />
    </v-list>

    <v-list class="mt-4" rounded="lg">
      <v-list-item :title="t('backup.title')" prepend-icon="mdi-cloud-upload"
        :append-icon="authorized ? 'mdi-chevron-right' : 'mdi-lock'" @click="requestGatedNav('/backup-restore')" />
      <v-list-item :title="t('payees.title')" prepend-icon="mdi-account"
        :append-icon="authorized ? 'mdi-chevron-right' : 'mdi-lock'" @click="requestGatedNav('/payees')" />
      <v-list-item :title="t('settings.securityTitle')" prepend-icon="mdi-shield-lock"
        :append-icon="authorized ? 'mdi-chevron-right' : 'mdi-lock'" @click="requestGatedNav('/security')" />
    </v-list>

    <ReauthDialog v-model="reauthOpen" @authenticated="onAuthenticated" />

    <v-btn class="mt-4" color="error" variant="outlined" block prepend-icon="mdi-lock" @click="lockNow">
      {{ t('settings.lockNow') }}
    </v-btn>

    <p class="settings-version text-medium-emphasis mt-4">{{ t('settings.version', { version: appVersion }) }}</p>
  </div>
</template>
