<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LANGUAGES } from '@/i18n/locales'
import { setLocale } from '@/i18n'
import SelectMenu from './SelectMenu.vue'

const { t, locale } = useI18n()

const items = computed(() =>
  SUPPORTED_LANGUAGES.map((lang) => ({ value: lang.id, title: lang.name, avatarText: lang.id.split('-')[0]!.toUpperCase() })),
)
</script>

<template>
  <div class="language-select">
    <span class="label-text">{{ t('settings.language') }}</span>
    <SelectMenu :model-value="locale" :items="items" :label="t('settings.language')" :search-placeholder="t('settings.search')"
      :empty-text="t('settings.noMatches')" @update:model-value="setLocale" />
  </div>
</template>

<style scoped>
.label-text {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}
</style>
