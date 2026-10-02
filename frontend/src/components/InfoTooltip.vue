<script setup lang="ts">
import AppTooltip from '@/components/AppTooltip.vue'

defineProps<{ text: string }>()
</script>

<template>
  <!-- An icon that exists only to show its text: AppTooltip's info mode, where a tap or click pins it open. -->
  <AppTooltip :text="text" info>
    <template #default="{ activatorProps }">
      <v-icon v-bind="activatorProps" icon="mdi-information-outline" size="small" class="ml-1" role="button"
        tabindex="0" :aria-label="text" />
    </template>
  </AppTooltip>
</template>
