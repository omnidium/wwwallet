<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LANGUAGES } from '@/i18n/locales'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()

function onChange(event: Event) {
  setLocale((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <label class="language-select">
    <span class="label-text">{{ t('settings.language') }}</span>
    <select :value="locale" @change="onChange">
      <option v-for="lang in SUPPORTED_LANGUAGES" :key="lang.id" :value="lang.id">
        {{ lang.name }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.language-select {
  display: block;
}

.label-text {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

select {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid rgb(var(--border-rgb) / 16%);
  background: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  font-size: 0.95rem;
}
</style>
