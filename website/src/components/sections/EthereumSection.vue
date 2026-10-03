<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { useI18n } from 'vue-i18n'
import PointCard from '../ui/PointCard.vue'
import type { IconName } from '../ui/LineIcon.vue'

interface Point {
  title: string
  body: string
}

const { t, tm } = useI18n()

// One per entry in the section's points, in order.
const ICONS: IconName[] = ['cube', 'stack', 'balance', 'layers']
</script>

<template>
  <section id="ethereum" class="section">
    <div class="container">
      <p class="section-eyebrow">{{ t('ethereum.eyebrow') }}</p>
      <h2 class="section-heading">{{ t('ethereum.heading') }}</h2>
      <p class="section-lede"><BrandText :text="t('ethereum.lede')" /></p>
      <div class="points-grid">
        <PointCard
          v-for="(point, index) in tm('ethereum.points') as Point[]"
          :key="index"
          :title="point.title"
          :body="point.body"
          :icon="ICONS[index]"
        />
      </div>
      <a
        class="external-link"
        :href="t('ethereum.linkUrl')"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('ethereum.linkLabel') }} <span class="dir-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.external-link {
  display: inline-block;
  color: var(--accent-ink);
  font-weight: 700;
  text-decoration: none;
}

.external-link:hover {
  text-decoration: underline;
}
</style>
