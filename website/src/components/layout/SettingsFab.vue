<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsPanel from './SettingsPanel.vue'

const { t } = useI18n()
const open = ref(false)
const fabRef = ref<HTMLButtonElement | null>(null)

function openPanel() {
  open.value = true
}

function closePanel() {
  open.value = false
  nextTick(() => fabRef.value?.focus())
}
</script>

<template>
  <button
    ref="fabRef"
    type="button"
    class="settings-fab glass-surface"
    :aria-label="t('settings.open')"
    aria-haspopup="dialog"
    :aria-expanded="open"
    @click="openPanel"
  >
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
      />
    </svg>
  </button>
  <Teleport to="body">
    <Transition name="settings-fade">
      <div v-if="open" class="settings-overlay" @click.self="closePanel">
        <Transition name="settings-slide" appear>
          <SettingsPanel @close="closePanel" />
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.settings-fab {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1005;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-fab);
  color: var(--text);
  cursor: pointer;
}

.settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 1010;
  background: rgb(0 0 0 / 25%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.settings-fade-enter-active,
.settings-fade-leave-active {
  transition: opacity 0.2s ease;
}
.settings-fade-enter-from,
.settings-fade-leave-to {
  opacity: 0;
}

.settings-slide-enter-active,
.settings-slide-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.settings-slide-enter-from,
.settings-slide-leave-to {
  transform: translateX(-16px);
  opacity: 0;
}
</style>
