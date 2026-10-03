<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Renders its content only in the browser, once mounted; the prerendered
// page (and the first, matching render that takes it over) shows the
// #placeholder slot instead. For content that can't be the same both times.
const mounted = ref(false)
onMounted(() => (mounted.value = true))
</script>

<template>
  <slot v-if="mounted" />
  <slot v-else name="placeholder" />
</template>
