<script setup lang="ts" generic="T extends string">
import { ref } from 'vue'

export interface SegmentedOption<V extends string = string> {
  value: V
  label: string
  /** An SVG path (24×24 viewBox) shown before the label. */
  iconPath?: string
}

// The website's twin of the wallet app's AppSegmented (frontend/src/components/
// AppSegmented.vue) — same pill track, same raised accent option — without
// Vuetify. A radio group: arrow keys move between options.
const props = defineProps<{ modelValue: T; options: SegmentedOption<T>[]; label: string }>()
const emit = defineEmits<{ 'update:modelValue': [T] }>()

const buttons = ref<HTMLButtonElement[]>([])

function onKeydown(e: KeyboardEvent, index: number) {
  const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (!step) return
  e.preventDefault()
  const next = (index + step + props.options.length) % props.options.length
  emit('update:modelValue', props.options[next]!.value)
  buttons.value[next]?.focus()
}
</script>

<template>
  <div class="segmented" role="radiogroup" :aria-label="label">
    <button v-for="(opt, i) in options" :key="opt.value" ref="buttons" type="button" class="segmented-option"
      :class="{ active: modelValue === opt.value }" role="radio" :aria-checked="modelValue === opt.value"
      :tabindex="modelValue === opt.value ? 0 : -1" @click="emit('update:modelValue', opt.value)"
      @keydown="onKeydown($event, i)">
      <svg v-if="opt.iconPath" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path :d="opt.iconPath" />
      </svg>
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.segmented {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius-full);
  background: rgb(var(--border-rgb) / 7%);
}

.segmented-option {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 16px;
  border: 0;
  border-radius: var(--radius-full);
  background: none;
  color: var(--text-muted);
  font: 600 0.9rem/1.2 var(--font-body);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.segmented-option:hover:not(.active) {
  color: var(--text);
}

.segmented-option:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.segmented-option.active {
  background: rgb(var(--surface-rgb));
  color: var(--accent-ink);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
}
</style>
