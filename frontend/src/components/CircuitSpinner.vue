<script setup lang="ts">
// The app's "still working" mark — on in-progress toasts (App.vue), in
// loading buttons (their #loader slot) and wherever a value is still
// loading: the logo's three circuit traces, in its own proportions — the top
// trace stepping up and the bottom one down to nodes set further out than
// the middle one's — with a signal running along each to light its node,
// top to bottom. Drawn in currentColor, so it takes the color of the text
// around it in either theme (add text-primary for the accent).
// Coordinates are the 512px icon's own (icons/icon-512.png).
const props = defineProps<{
  /** Height in px; otherwise 26, or 22 inside a button (see main.css). */
  size?: number
  /**
   * Announces it as a progress bar under this name. Leave it out where the
   * text beside it already says what's happening (a toast, a button).
   */
  label?: string
}>()

const ROWS = [
  { trace: 'M40 183H100L130 153H160', node: { cx: 192, cy: 154 } },
  { trace: 'M40 256H106', node: { cx: 138, cy: 256 } },
  { trace: 'M40 331H113L146 363H212', node: { cx: 244, cy: 364 } },
]
</script>

<template>
  <svg class="circuit-spinner" viewBox="36 116 246 286" :style="props.size ? { height: `${props.size}px` } : undefined"
    v-bind="props.label ? { role: 'progressbar', 'aria-label': props.label } : { 'aria-hidden': 'true' }">
    <g v-for="(row, i) in ROWS" :key="i" :style="{ '--row': i }">
      <path class="circuit-spinner-trace" :d="row.trace" />
      <!-- pathLength: each signal crosses its own trace in the same time, however long. -->
      <path class="circuit-spinner-signal" :d="row.trace" pathLength="100" />
      <circle class="circuit-spinner-node" :cx="row.node.cx" :cy="row.node.cy" r="32" />
    </g>
  </svg>
</template>
