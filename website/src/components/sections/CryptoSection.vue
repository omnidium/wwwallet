<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PointCard from '../ui/PointCard.vue'

interface Point {
  title: string
  body: string
}

const { t, tm } = useI18n()
</script>

<template>
  <section id="crypto" class="section">
    <div class="container">
      <p class="section-eyebrow">{{ t('crypto.eyebrow') }}</p>
      <h2 class="section-heading">{{ t('crypto.heading') }}</h2>
      <p class="section-lede">{{ t('crypto.lede') }}</p>
      <div class="points-grid">
        <PointCard
          v-for="(point, index) in tm('crypto.points') as Point[]"
          :key="index"
          :title="point.title"
          :body="point.body"
        />
      </div>
      <a class="external-link" :href="t('crypto.linkUrl')" target="_blank" rel="noopener noreferrer">
        {{ t('crypto.linkLabel') }} →
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
  color: var(--accent);
  font-weight: 700;
  text-decoration: none;
}

.external-link:hover {
  text-decoration: underline;
}
</style>
