<script setup lang="ts" generic="T extends string">
import { ref } from 'vue'

export interface SegmentedOption<V extends string = string> {
  value: V
  label: string
  icon?: string
}

/**
 * The app's one segmented toggle: a pill track with the picked option
 * raised in it — Send/Swap, Light/Dark. `tabs` when it switches what's
 * shown below it (tab semantics), otherwise a radio group. Arrow keys move
 * between options, as both patterns expect. `block` stretches it across
 * its container, options sharing the width.
 */
const props = withDefaults(
  defineProps<{ modelValue: T; options: SegmentedOption<T>[]; label: string; tabs?: boolean; block?: boolean }>(),
  { tabs: false, block: false },
)
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
  <div class="segmented" :class="{ 'segmented--block': block }" :role="tabs ? 'tablist' : 'radiogroup'"
    :aria-label="label">
    <button v-for="(opt, i) in options" :key="opt.value" ref="buttons" type="button" class="segmented-option"
      :class="{ 'segmented-option--active': modelValue === opt.value }" :role="tabs ? 'tab' : 'radio'"
      :aria-selected="tabs ? modelValue === opt.value : undefined"
      :aria-checked="tabs ? undefined : modelValue === opt.value" :tabindex="modelValue === opt.value ? 0 : -1"
      @click="emit('update:modelValue', opt.value)" @keydown="onKeydown($event, i)">
      <v-icon v-if="opt.icon" :icon="opt.icon" size="18" />
      {{ opt.label }}
    </button>
  </div>
</template>
