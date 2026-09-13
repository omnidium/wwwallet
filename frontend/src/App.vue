<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'

const messages = useMessagesStore()
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>wwwallet</v-app-bar-title>
      <v-btn to="/" variant="text">Accounts</v-btn>
      <v-btn to="/payees" variant="text">Payees</v-btn>
      <v-btn to="/backup-restore" variant="text">Backup</v-btn>
      <v-btn to="/settings" variant="text" icon="mdi-cog" />
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-snackbar
      v-for="message in messages.messages"
      :key="message.id"
      :model-value="true"
      :color="message.severity"
      @update:model-value="messages.dismiss(message.id)"
    >
      {{ message.text }}
    </v-snackbar>
  </v-app>
</template>
