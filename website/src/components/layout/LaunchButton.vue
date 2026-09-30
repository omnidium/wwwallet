<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_URL } from '@/config'

const { t } = useI18n()
</script>

<template>
  <a :href="APP_URL" class="launch-button btn btn-primary">
    <span>{{ t('nav.launch') }}</span>
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
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
