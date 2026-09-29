<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { theme, setTheme } = useTheme()
</script>

<template>
  <div class="theme-toggle">
    <span class="label-text">{{ t('settings.theme') }}</span>
    <div class="segmented" role="group" :aria-label="t('settings.theme')">
      <button
        type="button"
        class="segment"
        :class="{ active: theme === 'light' }"
        :aria-pressed="theme === 'light'"
        @click="setTheme('light')"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {{ t('settings.themeLight') }}
      </button>
      <button
        type="button"
        class="segment"
        :class="{ active: theme === 'dark' }"
        :aria-pressed="theme === 'dark'"
        @click="setTheme('dark')"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
        {{ t('settings.themeDark') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-toggle {
  margin-bottom: var(--space-4);
}

.label-text {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

.segmented {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-md);
  background: rgb(var(--border-rgb) / 6%);
}

.segment {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
}

.segment.active {
  background: rgb(var(--surface-rgb) / 100%);
  color: var(--text);
  box-shadow: var(--shadow-card);
}
</style>
