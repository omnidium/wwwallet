<script setup lang="ts">
// Hand-drawn line icons for the site, on a 24px grid with a shared stroke —
// original artwork (no icon-font or third-party set), so no licence to track.
// Deliberately avoids the usual crypto shorthand (padlocks, shields, coins,
// rockets): each one sketches the specific idea its card is about.
export type IconName =
  | 'tag-zero'
  | 'eye-off'
  | 'no-signup'
  | 'device-key'
  | 'browser-globe'
  | 'languages'
  | 'code'
  | 'no-off-switch'
  | 'cipher'
  | 'timer'
  | 'mesh'
  | 'cube'
  | 'stack'
  | 'balance'
  | 'layers'
  | 'handover'
  | 'gauge'
  | 'compass'
  | 'no-ask'

defineProps<{ name: IconName; size?: number }>()

const PATHS: Record<IconName, string> = {
  // A price tag with a zero on it: free.
  'tag-zero': 'M12 3H4a1 1 0 0 0-1 1v8l9 9 9-9z M7.5 7.5h.01 M13.5 11a2.4 3 0 1 1 0 6a2.4 3 0 1 1 0-6',
  'eye-off':
    'M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z M12 9.2a2.8 2.8 0 1 1 0 5.6a2.8 2.8 0 1 1 0-5.6 M4 4l16 16',
  // A blank sign-up form, struck through.
  'no-signup': 'M5 3h14v18H5z M8.5 8h7 M8.5 12h7 M8.5 16h4 M3 3l18 18',
  'device-key': 'M8 2.5h8a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z M12 7.5a2.3 2.3 0 1 1 0 4.6a2.3 2.3 0 1 1 0-4.6 M12 12.1V17 M12 15h1.8',
  'browser-globe':
    'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M3 8h18 M12 10.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6 M8.2 14h7.6 M12 10.2c-1.3 1-1.3 6.6 0 7.6 M12 10.2c1.3 1 1.3 6.6 0 7.6',
  languages:
    'M4 3.5h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H8l-3 2.5v-2.5H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z M17 8.5h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1V19l-3-2.5h-4a1 1 0 0 1-1-1v-2',
  code: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5.5l-3 13',
  // A power symbol, struck through: there's no switch for anyone to flip.
  'no-off-switch': 'M12 3.5v7 M7.4 6.6a7.2 7.2 0 1 0 9.2 0 M3.5 3.5l17 17',
  // A grid of scrambled cells: encrypted data.
  cipher:
    'M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M8 8h.01 M12 8h2 M16 8h.01 M8 12h2 M14 12h.01 M16 12h.01 M8 16h.01 M11 16h.01 M14 16h2',
  timer: 'M12 4.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17 M12 8.5V13l3 2 M9.5 2.5h5',
  // Five peers in a ring, no hub.
  mesh:
    'M12 3.2a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6 M19.1 8.6a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6 M16.4 17.2a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6 M7.6 17.2a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6 M4.9 8.6a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6 M13.6 6l3.9 3.2 M18.4 12.1l-1.2 5.1 M14.6 19h-5.2 M6.8 17.2l-1.2-5.1 M6.5 9.2l3.9-3.2 M6.7 10.4h10.6',
  cube: 'M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z M4 7.4l8 4.6 8-4.6 M12 12v9.2',
  stack:
    'M12 4.5c3.9 0 7 1.1 7 2.5s-3.1 2.5-7 2.5S5 8.4 5 7s3.1-2.5 7-2.5z M5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7 M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5',
  // Level scales: the same rules for everyone.
  balance: 'M12 4v16 M7.5 20h9 M5 7.5h14 M5 7.5l-2.6 6h5.2z M19 7.5l-2.6 6h5.2z M2.4 13.5a2.6 1.6 0 0 0 5.2 0 M16.4 13.5a2.6 1.6 0 0 0 5.2 0',
  layers: 'M12 3.5l9 5-9 5-9-5z M3 13l9 5 9-5 M3 17l9 5 9-5',
  handover: 'M4 8.5h14 M15 5.5l3 3-3 3 M20 15.5H6 M9 12.5l-3 3 3 3',
  gauge: 'M4.2 17.5a8.5 8.5 0 1 1 15.6 0 M12 14l4-4.5 M12 12.8a1.2 1.2 0 1 1 0 2.4a1.2 1.2 0 1 1 0-2.4',
  compass: 'M12 3.5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 1 1 0-17 M15.5 8.5l-2 5-5 2 2-5z',
  // A speech bubble asking for a secret (***), struck through.
  'no-ask':
    'M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9l-4 3.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M8 10.5h.01 M12 10.5h.01 M16 10.5h.01 M3 3l18 18',
}
</script>

<template>
  <svg class="line-icon" :width="size ?? 24" :height="size ?? 24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="PATHS[name]" />
  </svg>
</template>
