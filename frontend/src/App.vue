<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme } from '@/services/theme'
import { useIdleLock } from '@/composables/useIdleLock'
import SettingsPanel from '@/components/SettingsPanel.vue'
import AccountsView from '@/views/AccountsView.vue'
import PaneOverlay from '@/components/PaneOverlay.vue'

const { t } = useI18n({ useScope: 'global' })
const messages = useMessagesStore()
const theme = useTheme()
const route = useRoute()
const settingsOpen = ref(false)

// vault-setup in particular can flip vault.isUnlocked to true *before*
// navigating away (creating the vault happens on step 1 of 2, both on this
// same route) — gating on the route rather than just isUnlocked keeps these
// two screens full-page throughout, instead of briefly wrapping the
// still-showing setup pane in a PaneOverlay with AccountsView visible behind it.
const isPreAuthRoute = computed(() => route.name === 'vault-unlock' || route.name === 'vault-setup')

useIdleLock()

onMounted(() => {
  theme.change(getStoredTheme())
})

// Navigating away (e.g. tapping "Payees" inside the panel) should close it
// rather than leave it floating over the newly-loaded page.
watch(() => route.fullPath, () => {
  settingsOpen.value = false
})
</script>

<template>
  <v-app>
    <button class="floating-settings-btn" :aria-label="t('nav.settings')" @click="settingsOpen = true">
      <v-icon icon="mdi-cog" />
      <v-tooltip activator="parent" location="bottom">{{ t('nav.settings') }}</v-tooltip>
    </button>

    <v-navigation-drawer
      v-model="settingsOpen"
      location="left"
      temporary
      width="340"
      class="settings-drawer"
    >
      <div class="settings-drawer-inner">
        <SettingsPanel @close="settingsOpen = false" />
      </div>
    </v-navigation-drawer>

    <v-main>
      <template v-if="!isPreAuthRoute">
        <AccountsView />
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
        <v-btn
          icon="mdi-close"
          variant="text"
          density="comfortable"
          :aria-label="t('nav.dismiss')"
          @click="messages.dismiss(message.id)"
        >
          <v-icon />
          <v-tooltip activator="parent" location="top">{{ t('nav.dismiss') }}</v-tooltip>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
