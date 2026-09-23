<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ text: string; location?: 'top' | 'bottom' }>(), { location: 'top' })

// Vuetify's hover/focus tooltip state can get confused when clicking the
// activator itself changes the surrounding layout (e.g. closes a drawer the
// activator sits in) — the pointer never leaves the activator via a real
// mouseleave, so the tooltip is left showing with nothing to dismiss it.
// Closing on every click sidesteps that regardless of the underlying cause.
const isOpen = ref(false)

function hide() {
  isOpen.value = false
}
</script>

<template>
  <v-tooltip v-model="isOpen" :text="text" :location="location" class="app-tooltip">
    <template #activator="{ props: activatorProps }">
      <slot :activator-props="{ ...activatorProps, onClick: hide }" />
    </template>
  </v-tooltip>
</template>
