<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import licenseSource from '../../../../LICENSE?raw'
import { parseLicense } from '../../../../shared/license/parseLicense'
import { GITHUB_REPO_URL } from '@shared/config/links'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()

// The website's twin of the wallet app's LicenseDialog: the licence in a
// panel of its own rather than a link out to GitHub — a plain-language
// summary, then the full text (in its original English), read from the
// repo's LICENSE at build time.
const blocks = parseLicense(licenseSource)

const dialogEl = ref<HTMLElement | null>(null)
let returnFocusTo: HTMLElement | null = null

function focusable(): HTMLElement[] {
  return Array.from(dialogEl.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
}

// Escape closes; Tab stays inside the dialog while it's open.
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    emit('close')
    return
  }
  if (e.key !== 'Tab') return
  const items = focusable()
  const first = items[0]
  const last = items[items.length - 1]
  if (!first || !last) return
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      returnFocusTo = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', onKeydown)
      document.documentElement.style.overflow = 'hidden'
      await nextTick()
      dialogEl.value?.querySelector<HTMLElement>('.license-close')?.focus()
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.documentElement.style.overflow = ''
      returnFocusTo?.focus()
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="#teleports">
    <Transition name="license-fade">
      <div v-if="open" class="license-scrim" @click.self="emit('close')">
        <div ref="dialogEl" class="license-dialog glass-surface" role="dialog" aria-modal="true"
          aria-labelledby="license-title">
          <header class="license-head">
            <h2 id="license-title">{{ t('license.title') }}</h2>
            <button type="button" class="license-close" :aria-label="t('license.close')" @click="emit('close')">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </header>

          <div class="license-body">
            <section class="license-summary">
              <p class="license-summary-title">{{ t('license.summaryTitle') }}</p>
              <ul>
                <li class="yes"><BrandText :text="t('license.canUse')" /></li>
                <li class="yes">{{ t('license.canRead') }}</li>
                <li class="no">{{ t('license.cannot') }}</li>
              </ul>
            </section>

            <p class="license-language-note">{{ t('license.englishNote') }}</p>

            <article class="license-text" lang="en">
              <template v-for="(block, i) in blocks" :key="i">
                <h3 v-if="block.kind === 'title'">{{ block.text }}</h3>
                <h4 v-else-if="block.kind === 'heading'">{{ block.text }}</h4>
                <p v-else>
                  <template v-for="(part, j) in block.parts" :key="j">
                    <a v-if="'href' in part" :href="part.href" target="_blank" rel="noopener noreferrer">{{ part.href }}</a>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </p>
              </template>
            </article>
          </div>

          <footer class="license-foot">
            <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer">{{ t('license.viewSource') }} ↗</a>
            <button type="button" class="btn btn-primary" @click="emit('close')">{{ t('license.close') }}</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.license-scrim {
  position: fixed;
  inset: 0;
  z-index: 1030;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgb(0 0 0 / 35%);
}

.license-dialog {
  display: flex;
  flex-direction: column;
  width: min(640px, 100%);
  max-height: min(86vh, 900px);
  border: 1px solid rgb(var(--border-rgb) / 10%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
  color: var(--text);
}

.license-head,
.license-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
}

.license-head h2 {
  margin: 0;
  font-size: 1.35rem;
}

.license-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
}

.license-close:hover {
  background: rgb(var(--border-rgb) / 8%);
}

.license-close:focus-visible,
.license-foot a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.license-body {
  flex: 1;
  min-height: 0;
  padding: 0 22px;
  overflow-y: auto;
}

.license-summary {
  padding: 14px 16px;
  border: 1px solid rgb(var(--border-rgb) / 12%);
  border-radius: var(--radius-md);
  background: rgb(var(--surface-rgb));
}

.license-summary-title {
  margin: 0 0 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.license-summary ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.925rem;
  line-height: 1.45;
}

.license-summary li {
  position: relative;
  padding-inline-start: 26px;
}

.license-summary li::before {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  font-weight: 700;
}

.license-summary li.yes::before {
  content: '✓';
  color: var(--ink-1);
}

.license-summary li.no::before {
  content: '✕';
  color: rgb(var(--send-rgb));
}

.license-language-note {
  margin: 14px 0 4px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.license-text {
  font-size: 0.875rem;
  line-height: 1.6;
}

.license-text h3 {
  margin: 16px 0 8px;
  font-size: 1.1rem;
}

.license-text h4 {
  margin: 18px 0 6px;
  font-size: 0.95rem;
}

.license-text p {
  margin: 0 0 10px;
}

.license-text a,
.license-foot a {
  color: var(--accent-ink);
  overflow-wrap: anywhere;
}

.license-foot a {
  font-size: 0.875rem;
  text-decoration: none;
}

.license-foot a:hover {
  text-decoration: underline;
}

.license-fade-enter-active,
.license-fade-leave-active {
  transition: opacity 0.2s ease;
}

.license-fade-enter-from,
.license-fade-leave-to {
  opacity: 0;
}
</style>
