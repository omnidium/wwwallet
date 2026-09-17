<script setup lang="ts">
import AppTooltip from '@/components/AppTooltip.vue'

defineProps<{ text: string }>()
</script>

<template>
  <AppTooltip :text="text">
    <template #default="{ activatorProps }">
      <v-icon v-bind="activatorProps" icon="mdi-information-outline" size="small" class="ml-1" />
    </template>
  </AppTooltip>
</template>
