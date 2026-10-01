<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <p class="footer-tagline">{{ t('footer.tagline') }}</p>
      <p class="footer-copyright">
        {{ t('footer.copyright', { year }) }} ·
        <a class="footer-source" href="https://github.com/omnidium/wwwallet/blob/main/LICENSE" target="_blank"
          rel="noopener noreferrer">
          {{ t('footer.licenseLink') }}
        </a>
      </p>
      <p class="footer-disclaimer">{{ t('footer.disclaimer') }}</p>
    </div>
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
  color: var(--accent);
  text-decoration: none;
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
