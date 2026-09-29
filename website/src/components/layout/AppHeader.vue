<script setup lang="ts">
import SettingsFab from './SettingsFab.vue'
import ScrollSpyNav from './ScrollSpyNav.vue'
import LaunchButton from './LaunchButton.vue'
</script>

<template>
  <!-- Three independently fixed-position widgets rather than one bar: -->
  <!-- Settings top-left, section nav centered, Launch top-right. -->
  <header class="app-header">
    <SettingsFab />
    <ScrollSpyNav />
    <LaunchButton />
  </header>
</template>

<style scoped>
.app-header {
  /* Purely a semantic landmark — every child positions itself via fixed. */
  height: 0;
}
</style>
