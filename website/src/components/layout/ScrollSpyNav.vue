<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollSpy } from '@/composables/useScrollSpy'

const { t } = useI18n()

const sections = [
  { id: 'wallet', label: 'nav.wallet' },
  { id: 'ethereum', label: 'nav.ethereum' },
  { id: 'crypto', label: 'nav.crypto' },
  { id: 'faqs', label: 'nav.faqs' },
]

const { activeId, scrollToSection } = useScrollSpy(sections.map((section) => section.id))

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onNavClick(id: string, event: MouseEvent) {
  event.preventDefault()
  scrollToSection(id)
}
</script>

<template>
  <nav class="scroll-spy-nav glass-surface" :aria-label="t('nav.sectionNavLabel')">
    <a href="#" class="wordmark" :aria-label="t('nav.home')" @click.prevent="scrollToTop">
      wwwallet
    </a>
    <ul>
      <li v-for="section in sections" :key="section.id">
        <a
          :href="`#${section.id}`"
          :class="{ active: activeId === section.id }"
          @click="onNavClick(section.id, $event)"
        >
          {{ t(section.label) }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.scroll-spy-nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1004;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 8px var(--space-4);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-fab);
  max-width: calc(100vw - 180px);
}

.wordmark {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1rem;
  text-decoration: none;
  color: var(--text);
  white-space: nowrap;
}

.scroll-spy-nav ul {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
}

.scroll-spy-nav ul::-webkit-scrollbar {
  display: none;
}

.scroll-spy-nav a:not(.wordmark) {
  display: inline-block;
  padding: 6px 2px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease;
}

.scroll-spy-nav a.active {
  color: var(--text);
  border-bottom-color: var(--accent);
}

/* Below ~640px the three fixed widgets (settings FAB, this nav, launch
   button) no longer fit on one row — drop the nav to a full-width scrollable
   strip just under them instead of overlapping. */
@media (max-width: 640px) {
  .scroll-spy-nav {
    top: 72px;
    left: 8px;
    right: 8px;
    transform: none;
    max-width: none;
    justify-content: flex-start;
  }

  .wordmark {
    display: none;
  }
}
</style>
