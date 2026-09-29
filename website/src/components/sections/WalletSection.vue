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
  <section id="wallet" class="section">
    <div class="container">
      <p class="section-eyebrow">{{ t('wallet.eyebrow') }}</p>
      <h2 class="section-heading">{{ t('wallet.heading') }}</h2>
      <p class="section-lede">{{ t('wallet.lede') }}</p>
      <div class="points-grid">
        <PointCard
          v-for="(point, index) in tm('wallet.points') as Point[]"
          :key="index"
          :title="point.title"
          :body="point.body"
        />
      </div>
      <aside class="caveat">
        <h3>{{ t('wallet.caveatTitle') }}</h3>
        <p>{{ t('wallet.caveatBody') }}</p>
        <a href="#faqs">{{ t('wallet.caveatLink') }} →</a>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
}

.caveat {
  margin-top: var(--space-5);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid rgb(var(--accent-rgb) / 30%);
  background: rgb(var(--accent-rgb) / 8%);
}

.caveat h3 {
  font-size: 1rem;
  margin-bottom: var(--space-2);
}

.caveat p {
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

.caveat a {
  color: var(--accent);
  font-weight: 700;
  text-decoration: none;
}

.caveat a:hover {
  text-decoration: underline;
}
</style>
