<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_URL } from '@/config'

const { t } = useI18n()
</script>

<template>
  <a :href="APP_URL" class="launch-button btn btn-primary">
    <span>{{ t('nav.launch') }}</span>
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </a>
</template>

<style scoped>
.launch-button {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1005;
  padding: 10px 18px;
  font-size: 0.9rem;
}
</style>
