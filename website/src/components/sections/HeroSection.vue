<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_URL } from '@/config'
import HeroGraphic from '@shared/ui/NetworkGlobe.vue'

const { t } = useI18n()

function scrollToWallet() {
  document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-copy">
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
      <p class="hero-note">{{ t('hero.note') }}</p>
      </div>
      <div class="hero-art">
        <HeroGraphic />
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
    padding-top: calc(var(--header-height) + 56px + var(--space-6));
  }
}

.hero-inner {
  max-width: var(--container-max);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: center;
  gap: var(--space-5);
}

.hero-art {
  display: flex;
  justify-content: center;
}

/* Below this the graphic sits under the copy, smaller, so the headline and
   buttons still land in the first screenful. */
@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .hero-art {
    max-width: 320px;
    margin: 0 auto;
  }
}

.hero-note {
  margin-top: var(--space-4);
  font-size: 0.9rem;
  color: var(--text-muted);
}

.hero-heading {
  font-size: clamp(2.25rem, 1.6rem + 3vw, 3.5rem);
  margin-bottom: var(--space-2);
}

.hero-heading:last-of-type {
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
