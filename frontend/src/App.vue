<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { useVaultStore } from '@/stores/vault'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { getStoredTheme, applyDomTheme } from '@/services/theme'
import { getSharedCookie } from '@/services/sharedPrefs'
import { isSupportedLocale, LOCALE_COOKIE_KEY } from '@/i18n'
import { useIdleLock } from '@/composables/useIdleLock'
import SettingsPanel from '@/components/SettingsPanel.vue'
import AccountsView from '@/views/AccountsView.vue'
import PaneOverlay from '@/components/PaneOverlay.vue'
import AppTooltip from '@/components/AppTooltip.vue'

const { t } = useI18n({ useScope: 'global' })
const messages = useMessagesStore()
const vault = useVaultStore()
const settingsLocale = useSettingsLocaleStore()
const theme = useTheme()
const route = useRoute()
const settingsOpen = ref(false)

function closeSettings() {
  settingsOpen.value = false
  // A plain query, not a template ref: the button sits behind AppTooltip's
  // `activatorProps`, which binds its own `ref` on the same element — a
  // template `ref` here loses that race and stays null.
  nextTick(() => document.querySelector<HTMLElement>('.floating-settings-btn')?.focus())
}

// vault-setup in particular can flip vault.isUnlocked to true *before*
// navigating away (creating the vault happens on step 1 of 2, both on this
// same route) — gating on the route rather than just isUnlocked keeps these
// two screens full-page throughout, instead of briefly wrapping the
// still-showing setup pane in a PaneOverlay with AccountsView visible behind it.
const isPreAuthRoute = computed(() => route.name === 'vault-unlock' || route.name === 'vault-setup')

useIdleLock()

// Re-applies the shared theme/locale cookies. Needed on mount, and again
// whenever a bfcache restore (browser Back/Forward) repaints this exact page
// from a frozen snapshot rather than reloading it — nothing else re-runs to
// notice a cookie written by another page (the public website, or this app
// in another tab) in the meantime.
function resyncFromSharedCookies() {
  const storedTheme = getStoredTheme()
  theme.change(storedTheme)
  applyDomTheme(storedTheme)
  // Pre-auth default only: once a vault is unlocked, its own saved locale
  // (loadIntoStores, stores/vault.ts) is an authenticated, per-wallet choice
  // that deliberately takes precedence over this shared cross-origin cookie.
  if (vault.isUnlocked) return
  const sharedLocale = getSharedCookie(LOCALE_COOKIE_KEY)
  if (sharedLocale && isSupportedLocale(sharedLocale)) {
    settingsLocale.setLocale(sharedLocale)
  }
}

function onPageShow(event: PageTransitionEvent) {
  if (event.persisted) resyncFromSharedCookies()
}
function onVisibilityChange() {
  if (document.visibilityState === 'visible') resyncFromSharedCookies()
}

onMounted(() => {
  resyncFromSharedCookies()
  window.addEventListener('pageshow', onPageShow)
  document.addEventListener('visibilitychange', onVisibilityChange)
})
onBeforeUnmount(() => {
  window.removeEventListener('pageshow', onPageShow)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

// Navigating away (e.g. tapping "Payees" inside the panel) should close it
// rather than leave it floating over the newly-loaded page.
watch(() => route.fullPath, () => {
  settingsOpen.value = false
})
</script>

<template>
  <v-app>
    <AppTooltip v-if="!settingsOpen" :text="t('nav.settings')" location="bottom">
      <template #default="{ activatorProps }">
        <button v-bind="activatorProps" class="floating-settings-btn" :aria-label="t('nav.settings')" @click="settingsOpen = true">
          <v-icon icon="mdi-cog" size="20" />
        </button>
      </template>
    </AppTooltip>

    <Teleport to="body">
      <Transition name="settings-fade">
        <div v-if="settingsOpen" class="settings-overlay" @click.self="closeSettings">
          <div class="settings-drawer-inner">
            <SettingsPanel @close="closeSettings" />
          </div>
        </div>
      </Transition>
    </Teleport>

    <v-main>
      <template v-if="!isPreAuthRoute">
        <!--
          Locked out but reachable anyway (backup-restore, security — see
          router/index.ts's guard and each view's own v-if="vault.isUnlocked"
          for why) have nothing decrypted for AccountsView to show, and it'd
          fire its own data-loading side effects for a wallet that isn't
          loaded — but they still get the normal floating-panel treatment via
          PaneOverlay, which doesn't depend on AccountsView being there at
          all, just over an empty background instead of the accounts list.
        -->
        <AccountsView v-if="vault.isUnlocked" />
        <PaneOverlay v-if="route.path !== '/'">
          <RouterView />
        </PaneOverlay>
      </template>
      <RouterView v-else />
    </v-main>

    <v-snackbar
      v-for="message in messages.messages"
      :key="message.id"
      :model-value="true"
      :color="message.severity"
      :timeout="message.timeout"
      location="bottom"
      @update:model-value="messages.dismiss(message.id)"
    >
      <v-icon v-if="message.severity !== 'success'" icon="mdi-alert" class="mr-2" />
      {{ message.text }}

      <template #actions>
        <AppTooltip :text="t('nav.dismiss')">
          <template #default="{ activatorProps }">
            <v-btn
              v-bind="activatorProps"
              icon="mdi-close"
              variant="text"
              density="comfortable"
              :aria-label="t('nav.dismiss')"
              @click="messages.dismiss(message.id)"
            />
          </template>
        </AppTooltip>
      </template>
    </v-snackbar>
  </v-app>
</template>
