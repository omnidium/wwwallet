<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { getStoredTheme, setStoredTheme, applyDomTheme, type ThemeName } from '@/services/theme'
import { clearLastActivity } from '@/services/lastActivity'

const emit = defineEmits<{ close: [] }>()

const { t } = useI18n({ useScope: 'global' })
const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const theme = useTheme()
const router = useRouter()
const currentTheme = ref<ThemeName>(getStoredTheme())
const appVersion = __APP_VERSION__
// The marketing website lives on the apex domain (this app is on app.*); in
// dev it runs separately on port 3002.
const websiteUrl = import.meta.env.VITE_WEBSITE_URL ?? (import.meta.env.DEV ? 'http://localhost:3002' : 'https://wwwallet.me')
const panelRef = ref<HTMLElement | null>(null)

// v-navigation-drawer used to provide Escape-to-close and a scrim for free;
// now that App.vue renders this as a plain overlay (see its fade-transition
// swap), this panel owns that behavior itself instead — same approach as
// website/src/components/layout/SettingsPanel.vue.
function getFocusable(): HTMLElement[] {
  if (!panelRef.value) return []
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation()
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  const focusable = getFocusable()
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}


onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  getFocusable()[0]?.focus()
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

function setTheme(next: ThemeName) {
  currentTheme.value = next
  theme.change(next)
  applyDomTheme(next)
  setStoredTheme(next)
  if (navigator.vibrate) navigator.vibrate(5)
}

function onLanguageChange(event: Event) {
  settings.setLocale((event.target as HTMLSelectElement).value)
}

function onCurrencyChange(event: Event) {
  settings.currency = (event.target as HTMLSelectElement).value
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
  <div ref="panelRef" class="pa-4 settings-panel" role="dialog" aria-modal="true" :aria-label="t('settings.title')">
    <div class="panel-header">
      <h2>{{ t('settings.title') }}</h2>
      <button type="button" class="close-btn" :aria-label="t('settings.closeAria')" @click="emit('close')">
        <i class="mdi mdi-close" aria-hidden="true"></i>
      </button>
    </div>

    <div class="settings-section mt-2">
      <p class="settings-section-label">{{ t('settings.themeLabel') }}</p>
      <div class="theme-segmented" role="group" :aria-label="t('settings.themeLabel')">
        <button type="button" class="theme-segment" :class="{ active: currentTheme === 'light' }"
          :aria-pressed="currentTheme === 'light'" @click="setTheme('light')">
          <v-icon icon="mdi-white-balance-sunny" size="16" />
          {{ t('settings.themeLight') }}
        </button>
        <button type="button" class="theme-segment" :class="{ active: currentTheme === 'dark' }"
          :aria-pressed="currentTheme === 'dark'" @click="setTheme('dark')">
          <v-icon icon="mdi-weather-night" size="16" />
          {{ t('settings.themeDark') }}
        </button>
      </div>
    </div>

    <div class="settings-section mt-2">
      <p class="settings-section-label">{{ t('settings.languageLabel') }}</p>
      <select class="settings-select" :class="{ 'settings-select--dark': currentTheme === 'dark' }"
        :value="settings.locale" @change="onLanguageChange">
        <option v-for="lang in settings.languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
      </select>
    </div>

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
    <div v-if="vault.isUnlocked" class="settings-section mt-2">
      <p class="settings-section-label">{{ t('settings.currencyLabel') }}</p>
      <select class="settings-select" :class="{ 'settings-select--dark': currentTheme === 'dark' }"
        :value="settings.currency" @change="onCurrencyChange">
        <option v-for="currency in settings.currencies" :key="currency" :value="currency">{{ currency }}</option>
      </select>
    </div>

    <v-list class="mt-4" rounded="lg" bg-color="transparent">
      <v-list-item to="/backup-restore" :title="t('backup.title')" prepend-icon="mdi-cloud-upload"
        append-icon="mdi-chevron-right" @click="emit('close')" rounded="lg" />
      <v-list-item v-if="vault.isUnlocked" to="/payees" :title="t('payees.title')" prepend-icon="mdi-account"
        append-icon="mdi-chevron-right" @click="emit('close')" rounded="lg" />
      <v-list-item to="/security" :title="t('settings.securityTitle')" prepend-icon="mdi-shield-lock"
        append-icon="mdi-chevron-right" @click="emit('close')" rounded="lg" />
    </v-list>

    <v-btn v-if="vault.isUnlocked" class="mt-4" color="error" variant="outlined" block prepend-icon="mdi-lock"
      @click="lockNow">
      {{ t('settings.lockNow') }}
    </v-btn>

    <v-btn class="settings-back" variant="outlined" prepend-icon="mdi-arrow-left" :href="websiteUrl">
      {{ t('settings.backToWebsite') }}
    </v-btn>

    <p class="settings-version text-medium-emphasis mt-4">{{ t('settings.version', { version: appVersion }) }}</p>
  </div>
</template>

<style scoped>
/* Below: pixel-for-pixel matches of website/src/components/layout/SettingsPanel.vue,
   ui/ThemeToggle.vue and ui/LanguageSelect.vue, built on the shared tokens
   (shared/design-tokens.css, imported by assets/main.css) both projects use —
   not Vuetify's own theme tokens, so this stays byte-identical to the
   website's version rather than just similarly-colored. Vuetify-native
   elements elsewhere in this panel (v-list, v-btn "Lock now") intentionally
   keep using Vuetify's own tokens. */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.panel-header h2 {
  font-size: 1.1rem;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  font-size: 20px;
  cursor: pointer;
}

.close-btn:hover {
  background: rgb(var(--border-rgb) / 8%);
}

/* Theme/Language/Currency each get their own section — a bottom border
 * (rather than between every pair, to avoid a trailing line under the last
 * one) visually separates them beyond the mt-4 spacing utility alone. */
.settings-section {
  padding-bottom: var(--space-1);
  ;
  border-bottom: 0px solid rgb(var(--border-rgb) / 8%);
}

.settings-section:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.settings-section-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: var(--space-1);
}

.theme-segmented {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-md);
  background: rgb(var(--border-rgb) / 6%);
}

.theme-segment {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
}

.theme-segment.active {
  background: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  box-shadow: var(--shadow-card);
}

.settings-select {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  padding-right: 2.5em;
  border-radius: var(--radius-md);
  border: 1px solid rgb(var(--border-rgb) / 16%);
  background-color: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
  appearance: none;
  -webkit-appearance: none;
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234d5f59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}

.settings-select--dark {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239db3ac' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}
</style>
