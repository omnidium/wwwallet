<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useVaultStore } from '@/stores/vault'
import { getStoredTheme, setStoredTheme, applyDomTheme, type ThemeName } from '@/services/theme'
import { clearLastActivity } from '@/services/lastActivity'
import { currencySymbol } from '@/services/money'
import AppSelect, { type SelectItem } from '@/components/AppSelect.vue'
import AppSegmented from '@/components/AppSegmented.vue'
import LicenseDialog from '@/components/LicenseDialog.vue'
import { WEBSITE_URL } from '@shared/config/links'

const emit = defineEmits<{ close: [] }>()

const { t, locale } = useI18n({ useScope: 'global' })
const settings = useSettingsLocaleStore()
const vault = useVaultStore()
const theme = useTheme()
const router = useRouter()
const currentTheme = ref<ThemeName>(getStoredTheme())
const licenseOpen = ref(false)
const appVersion = __APP_VERSION__
// The marketing website lives on the apex domain (this app is on app.*); in
// dev it runs separately on port 3002.
const websiteUrl = import.meta.env.VITE_WEBSITE_URL ?? (import.meta.env.DEV ? 'http://localhost:3002' : WEBSITE_URL)
const panelRef = ref<HTMLElement | null>(null)
// Same 700px cut-off as the account cards' full-width breakpoint (main.css):
// below it, Theme/Language/Currency collapse into one row of icon controls.
const display = useDisplay()
const compact = computed(() => display.width.value <= 700)
const currentLanguageName = computed(() => settings.languages.find((lang) => lang.id === settings.locale)?.name ?? settings.locale)

const themeOptions = computed(() => [
  { value: 'light' as const, label: t('settings.themeLight'), icon: 'mdi-white-balance-sunny' },
  { value: 'dark' as const, label: t('settings.themeDark'), icon: 'mdi-weather-night' },
])

const languageItems = computed<SelectItem[]>(() =>
  settings.languages.map((lang) => ({ value: lang.id, title: lang.name, avatarText: lang.id.split('-')[0]!.toUpperCase() })),
)

// Each currency by its symbol and its name in the app's language.
const currencyItems = computed<SelectItem[]>(() => {
  const names = new Intl.DisplayNames([locale.value], { type: 'currency' })
  return settings.currencies.map((code) => ({
    value: code,
    title: code,
    subtitle: names.of(code) === code ? undefined : names.of(code),
    avatarText: currencySymbol(code, locale.value),
  }))
})

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
  // A menu open over the panel (language, currency) takes its own Escape and
  // Tab — it's rendered outside the panel, so this listener hears them too.
  if (event.target instanceof Element && event.target.closest('.v-overlay')) return
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

function onLanguageChange(id: string) {
  settings.setLocale(id)
}

function onCurrencyChange(code: string) {
  settings.currency = code
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

    <!-- Compact (phone-width) variant: one row of icon controls, Language and
      Currency opening the same menus as the full-size selects. -->
    <div v-if="compact" class="settings-compact-row mt-2">
      <button type="button" class="settings-icon-control"
        :aria-label="`${t('settings.themeLabel')}: ${currentTheme === 'dark' ? t('settings.themeDark') : t('settings.themeLight')}`"
        @click="setTheme(currentTheme === 'dark' ? 'light' : 'dark')">
        <v-icon :icon="currentTheme === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'" size="20" />
      </button>
      <AppSelect :model-value="settings.locale" :items="languageItems" :label="t('settings.languageLabel')"
        @update:model-value="onLanguageChange">
        <template #activator="{ props: menuProps }">
          <button v-bind="menuProps" type="button" class="settings-icon-control"
            :aria-label="`${t('settings.languageLabel')}: ${currentLanguageName}`">
            <v-icon icon="mdi-web" size="20" />
          </button>
        </template>
      </AppSelect>
      <!-- Locked-vault hiding: see the comment on the full-size currency section below. -->
      <AppSelect v-if="vault.isUnlocked" :model-value="settings.currency" :items="currencyItems"
        :label="t('settings.currencyLabel')" @update:model-value="onCurrencyChange">
        <template #activator="{ props: menuProps }">
          <button v-bind="menuProps" type="button" class="settings-icon-control"
            :aria-label="`${t('settings.currencyLabel')}: ${settings.currency}`">
            <v-icon icon="mdi-cash-multiple" size="20" />
            <span class="settings-icon-control-text">{{ settings.currency }}</span>
          </button>
        </template>
      </AppSelect>
    </div>

    <template v-else>
      <div class="settings-section mt-2">
        <p class="settings-section-label">{{ t('settings.themeLabel') }}</p>
        <AppSegmented :model-value="currentTheme" :options="themeOptions" :label="t('settings.themeLabel')" block
          @update:model-value="setTheme" />
      </div>

      <div class="settings-section mt-2">
        <p class="settings-section-label">{{ t('settings.languageLabel') }}</p>
        <AppSelect :model-value="settings.locale" :items="languageItems" :label="t('settings.languageLabel')" block
          @update:model-value="onLanguageChange" />
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
        <AppSelect :model-value="settings.currency" :items="currencyItems" :label="t('settings.currencyLabel')" block
          @update:model-value="onCurrencyChange" />
      </div>
    </template>

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

    <p class="settings-version mt-4">
      <span class="text-medium-emphasis">{{ t('settings.version', { version: appVersion }) }}</span>
      <span class="flex-grow-1"></span>
      <button type="button" class="settings-license-link mr-2" @click="licenseOpen = true">{{ t('license.title')
      }}</button>
    </p>

    <LicenseDialog v-model="licenseOpen" />
  </div>
</template>

<style scoped>
/* Below: kept in step with website/src/components/layout/SettingsPanel.vue —
   the theme toggle and selects there match AppSegmented/AppSelect here —
   built on the shared tokens
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

.settings-compact-row {
  display: flex;
  gap: var(--space-2);
}

.settings-icon-control {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 44px;
  height: 44px;
  padding: 0 var(--space-3);
  border: 1px solid rgb(var(--border-rgb) / 16%);
  border-radius: var(--radius-md);
  background: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  font-family: inherit;
  cursor: pointer;
}

.settings-icon-control:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

.settings-icon-control-text {
  font-size: 0.85rem;
  font-weight: 700;
}
</style>
