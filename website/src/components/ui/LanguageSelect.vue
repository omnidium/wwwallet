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
  /* Room for the custom arrow below, plus a visible gap before the border —
     a native select's own arrow ignores padding-right entirely in Chromium,
     so it has to be replaced rather than just padded around. */
  padding-right: 2.5em;
  border-radius: var(--radius-md);
  border: 1px solid rgb(var(--border-rgb) / 16%);
  background-color: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  font-size: 0.95rem;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234d5f59' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
}

:root[data-theme='dark'] select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239db3ac' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
}
</style>
