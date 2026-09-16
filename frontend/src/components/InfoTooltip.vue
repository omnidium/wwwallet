<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <v-tooltip :text="text" location="top">
    <template #activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" icon="mdi-information-outline" size="small" class="ml-1" />
    </template>
  </v-tooltip>
</template>
