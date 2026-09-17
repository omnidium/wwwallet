<script setup lang="ts">
withDefaults(defineProps<{ text: string; location?: 'top' | 'bottom' }>(), { location: 'top' })
</script>

<template>
  <v-tooltip :text="text" :location="location" class="app-tooltip">
    <template #activator="{ props: activatorProps }">
      <slot :activator-props="activatorProps" />
    </template>
  </v-tooltip>
</template>
