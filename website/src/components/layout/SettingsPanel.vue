<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '../ui/ThemeToggle.vue'
import LanguageSelect from '../ui/LanguageSelect.vue'
import LicenseModal from '../ui/LicenseModal.vue'

const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const panelRef = ref<HTMLElement | null>(null)
const licenseOpen = ref(false)
const appVersion = __APP_VERSION__

function getFocusable(): HTMLElement[] {
  if (!panelRef.value) return []
  return Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function onKeydown(event: KeyboardEvent) {
  // The licence modal handles its own Escape and focus trap while it's open.
  if (licenseOpen.value) return
  if (event.key === 'Escape') {
    event.stopPropagation()
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  const focusable = getFocusable()
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  getFocusable()[0]?.focus()
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="panelRef" class="settings-panel glass-surface" role="dialog" aria-modal="true"
    :aria-label="t('settings.open')">
    <div class="panel-header">
      <h2>{{ t('settings.open') }}</h2>
      <button type="button" class="close-btn" :aria-label="t('settings.close')" @click="emit('close')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </button>
    </div>
    <ThemeToggle />
    <LanguageSelect />
    <p class="settings-version">
      <span>{{ t('settings.version', { version: appVersion }) }}</span>
      <span class="flex-1"></span>
      <button type="button" class="settings-license-link" @click="licenseOpen = true">
        {{ t('license.title') }}
      </button>
    </p>
    <LicenseModal :open="licenseOpen" @close="licenseOpen = false" />
  </div>
</template>

<style scoped>
.settings-panel {
  width: min(340px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  margin: 16px;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.panel-header h2 {
  font-size: 1.1rem;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}

.close-btn:hover {
  background: rgb(var(--border-rgb) / 8%);
}

.settings-version {
  display: flex;
  align-items: baseline;
  gap: var(--space-6);
  margin: var(--space-4) 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.settings-license-link {
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent-ink);
  font: inherit;
  cursor: pointer;
  font-size: 0.9rem;
}

.settings-license-link:hover {
  text-decoration: underline;
}

.settings-license-link:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
</style>
