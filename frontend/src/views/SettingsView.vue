<script setup lang="ts">
import { onMounted } from 'vue'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'

const settings = useSettingsLocaleStore()
onMounted(() => settings.loadLanguages())
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
