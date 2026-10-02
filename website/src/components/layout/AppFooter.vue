<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LicenseModal from '../ui/LicenseModal.vue'

const { t } = useI18n()
// The licence opens in a panel here rather than linking out to GitHub.
const licenseOpen = ref(false)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <p class="footer-tagline">{{ t('footer.tagline') }}</p>
      <p class="footer-copyright">
        {{ t('footer.copyright', { year }) }} ·
        <button type="button" class="footer-source" @click="licenseOpen = true">
          {{ t('footer.licenseLink') }}
        </button>
      </p>
      <p class="footer-disclaimer">{{ t('footer.disclaimer') }}</p>
    </div>
    <LicenseModal :open="licenseOpen" @close="licenseOpen = false" />
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid rgb(var(--border-rgb) / 10%);
  padding: var(--space-5) 0;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-tagline {
  margin: 0;
}

.footer-disclaimer {
  flex-basis: 100%;
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.8;
}

.footer-source {
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent-ink);
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.footer-source:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.footer-source:hover {
  text-decoration: underline;
}

.footer-copyright {
  margin: 0;
  width: 100%;
  order: 3;
  font-size: 0.8rem;
}

@media (min-width: 640px) {
  .footer-copyright {
    width: auto;
    order: 0;
  }
}
</style>
