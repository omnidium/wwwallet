<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { RouterView } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { getStoredTheme } from '@/services/theme'

const messages = useMessagesStore()
const theme = useTheme()

onMounted(() => {
  theme.global.name.value = getStoredTheme()
})
</script>

<template>
  <v-app>
    <v-app-bar flat>
      <v-btn to="/" variant="text" icon="mdi-wallet" aria-label="Accounts" />
      <v-app-bar-title>wwwallet</v-app-bar-title>
      <v-btn to="/settings" variant="text" icon="mdi-cog" aria-label="Settings" />
    </v-app-bar>

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
