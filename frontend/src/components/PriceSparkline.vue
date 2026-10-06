<script setup lang="ts">
import { computed } from 'vue'

// A bare line of the past 24h's prices — no axes or labels, just the shape,
// green when the window ended higher than it started and red otherwise. A
// currency pair has only daily rates, so its two points make a straight line.
const props = withDefaults(defineProps<{ points: number[]; width?: number; height?: number }>(), {
  width: 64,
  height: 20,
})

const STROKE = 1.5
// The smallest price range the full height stands for, as a fraction of the
// price — otherwise a stablecoin's 0.01% wobble is drawn as violently as a
// 10% swing.
const MIN_RELATIVE_SPAN = 0.01

const rising = computed(() => props.points.length > 1 && props.points[props.points.length - 1]! > props.points[0]!)

const path = computed(() => {
  const { points, width, height } = props
  if (points.length < 2) return ''
  const max = Math.max(...points)
  const span = Math.max(max - Math.min(...points), max * MIN_RELATIVE_SPAN)
  // Centred, so a near-flat series sits mid-height rather than on the floor.
  const min = (max + Math.min(...points) - span) / 2
  // Inset by half the stroke so the extremes aren't clipped at the edges.
  const inner = height - STROKE
  return points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = STROKE / 2 + inner - ((p - min) / span) * inner
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})
</script>

<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" class="price-sparkline"
    :class="rising ? 'price-sparkline--up' : 'price-sparkline--down'" aria-hidden="true">
    <path :d="path" fill="none" :stroke-width="STROKE" stroke-linejoin="round" stroke-linecap="round" />
  </svg>
</template>
