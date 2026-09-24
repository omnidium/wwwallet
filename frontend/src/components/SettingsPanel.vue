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

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n({ useScope: 'global' })
const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const theme = useTheme()
const router = useRouter()
const isDark = ref(getStoredTheme() === 'dark')
const appVersion = __APP_VERSION__

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
              @click="emit('close')" />
          </template>
        </AppTooltip>
      </div>
    </v-row>

    <v-select class="mt-4" density="default" hide-details :label="t('settings.languageLabel')"
      :items="settings.languages" item-title="name" item-value="id" v-model="settings.locale"
      @update:model-value="settings.setLocale" />

    <!--
      Everything below except Backup & Restore and Security is hidden
      outright (not just disabled) while the vault is locked — someone
      glancing at an unattended, locked device shouldn't even see that these
      exist, let alone reach them. The gear button and this drawer stay
      reachable from the vault-unlock screen itself (they're outside
      App.vue's route-gated section), so this can't just rely on "you had to
      get past unlock to open Settings" the way the rest of the app does.

      Backup & Restore and Security stay visible even locked because restore
      (from a file or Google Drive) and deleting the vault from this device
      both need to work without unlocking first — that's the whole point of
      either action. Each of those two views hides its own unlock-requiring
      parts (backing up, passkey management) behind vault.isUnlocked itself;
      see their own v-if for that.
    -->
    <v-select v-if="vault.isUnlocked" class="mt-4" density="default" hide-details :label="t('settings.currencyLabel')"
      :items="settings.currencies" v-model="settings.currency" />

    <v-list class="mt-4" rounded="lg">
      <v-list-item to="/backup-restore" :title="t('backup.title')" prepend-icon="mdi-cloud-upload"
        append-icon="mdi-chevron-right" @click="emit('close')" />
      <v-list-item v-if="vault.isUnlocked" to="/payees" :title="t('payees.title')" prepend-icon="mdi-account"
        append-icon="mdi-chevron-right" @click="emit('close')" />
      <v-list-item to="/security" :title="t('settings.securityTitle')" prepend-icon="mdi-shield-lock"
        append-icon="mdi-chevron-right" @click="emit('close')" />
    </v-list>

    <v-btn v-if="vault.isUnlocked" class="mt-4" color="error" variant="outlined" block prepend-icon="mdi-lock"
      @click="lockNow">
      {{ t('settings.lockNow') }}
    </v-btn>

    <p class="settings-version text-medium-emphasis mt-4">{{ t('settings.version', { version: appVersion }) }}</p>
  </div>
</template>
