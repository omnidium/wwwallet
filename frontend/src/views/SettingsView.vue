<script setup lang="ts">
import { onMounted } from 'vue'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useMessagesStore } from '@/stores/messages'

const settings = useSettingsLocaleStore()
const messages = useMessagesStore()
onMounted(async () => {
  try {
    await settings.loadLanguages()
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
})
</script>

<template>
  <v-container>
    <h1 class="text-h5">Settings</h1>
    <v-select
      class="mt-4"
      label="Language"
      :items="settings.languages"
      item-title="name"
      item-value="id"
      v-model="settings.locale"
      @update:model-value="settings.setLocale"
    />
  </v-container>
</template>
