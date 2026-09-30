<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_URL } from '@/config'

const { t } = useI18n()

function scrollToWallet() {
  document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <p class="section-eyebrow">{{ t('hero.eyebrow') }}</p>
      <h1 class="hero-heading gradient-text">{{ t('hero.heading1') }}</h1>
      <h1 class="hero-heading gradient-text">{{ t('hero.heading2') }}</h1>
      <h1 class="hero-heading gradient-text">{{ t('hero.heading3') }}</h1>
      <p class="hero-lede">{{ t('hero.lede') }}</p>
      <div class="hero-actions">
        <a :href="APP_URL" class="btn btn-primary">{{ t('hero.ctaPrimary') }}</a>
        <button type="button" class="btn btn-secondary" @click="scrollToWallet">
          {{ t('hero.ctaSecondary') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: calc(var(--header-height) + var(--space-2)) 0 var(--space-6);
  min-height: 88vh;
  display: flex;
  align-items: center;
}

@media (max-width: 640px) {
  .hero {
    padding-top: calc(var(--header-height) + 56px + var(--space-5));
  }
}

.hero-inner {
  max-width: var(--container-max);
}

.hero-heading {
  font-size: clamp(2.25rem, 1.6rem + 3vw, 3.5rem);
  margin-bottom: var(--space-4);
}

.hero-lede {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: var(--space-5);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
