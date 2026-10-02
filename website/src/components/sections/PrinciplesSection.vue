<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LineIcon, { type IconName } from '../ui/LineIcon.vue'

interface Principle {
  title: string
  body: string
}

const { t, tm } = useI18n()

// One per entry in principles.items, in order.
const ICONS: IconName[] = [
  'tag-zero',
  'eye-off',
  'no-signup',
  'device-key',
  'browser-globe',
  'languages',
  'code',
  'no-off-switch',
]
</script>

<template>
  <section id="principles" class="section principles">
    <div class="container">
      <p class="section-eyebrow">{{ t('principles.eyebrow') }}</p>
      <h2 class="section-heading">{{ t('principles.heading') }}</h2>
      <p class="section-lede">{{ t('principles.lede') }}</p>
      <ul class="principles-grid">
        <li v-for="(item, index) in tm('principles.items') as Principle[]" :key="index" class="principle">
          <span class="principle-icon"><LineIcon :name="ICONS[index] ?? 'mesh'" :size="22" /></span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* A band of its own, so the "what it costs you" answer reads as distinct
   from the feature sections below. */
.principles {
  background: var(--bg-alt);
  border-block: 1px solid rgb(var(--border-rgb) / 6%);
}

.principles-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: var(--space-4) var(--space-5);
}

.principle {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

.principle-icon {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  color: var(--accent-ink);
  background: rgb(var(--surface-rgb) / 80%);
  border: 1px solid rgb(var(--accent-rgb) / 25%);
}

.principle h3 {
  font-size: 1.02rem;
  margin: 2px 0 var(--space-1);
}

.principle p {
  margin: 0;
  font-size: 0.93rem;
  color: var(--text-muted);
}
</style>
