<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import { RouterView, useRoute } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme } from '@/services/theme'
import { useIdleLock } from '@/composables/useIdleLock'
import SettingsPanel from '@/components/SettingsPanel.vue'

const messages = useMessagesStore()
const theme = useTheme()
const route = useRoute()
const settingsOpen = ref(false)

useIdleLock()

onMounted(() => {
  theme.global.name.value = getStoredTheme()
})

// Navigating away (e.g. tapping "Payees" inside the panel) should close it
// rather than leave it floating over the newly-loaded page.
watch(() => route.fullPath, () => {
  settingsOpen.value = false
})
</script>

<template>
  <v-app>
    <v-app-bar flat>
      <v-btn variant="text" icon="mdi-cog" aria-label="Settings" @click="settingsOpen = true" />
      <v-app-bar-title>wwwallet</v-app-bar-title>
      <v-btn to="/" variant="text" icon="mdi-wallet" aria-label="Accounts" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="settingsOpen"
      location="left"
      temporary
      width="340"
      class="settings-drawer"
    >
      <SettingsPanel @close="settingsOpen = false" />
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

    <v-snackbar
      v-for="message in messages.messages"
      :key="message.id"
      :model-value="true"
      :color="message.severity"
      :timeout="5000"
      location="bottom"
      @update:model-value="messages.dismiss(message.id)"
    >
      <v-icon v-if="message.severity !== 'success'" icon="mdi-alert" class="mr-2" />
      {{ message.text }}

      <template #actions>
        <v-btn icon="mdi-close" variant="text" density="comfortable" @click="messages.dismiss(message.id)" />
      </template>
    </v-snackbar>
  </v-app>
</template>

<style>
/* Floating, translucent panel instead of an edge-to-edge drawer — matches the
 * old app's slide-in settings pane. Overrides Vuetify's inline positioning
 * styles (hence !important), since v-navigation-drawer computes top/height
 * itself based on the surrounding layout. */
.settings-drawer {
  top: 16px !important;
  left: 16px !important;
  height: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px);
  border-radius: 16px !important;
  background: rgba(var(--v-theme-surface), 0.85) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  backdrop-filter: blur(14px) !important;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow-y: auto;
}
</style>
