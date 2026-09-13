<script setup lang="ts">
import { useSettingsLocaleStore } from '@/stores/settingsLocale'

const settings = useSettingsLocaleStore()
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
    <v-select
      class="mt-4"
      label="Currency"
      :items="settings.currencies"
      v-model="settings.currency"
    />
  </v-container>
</template>
