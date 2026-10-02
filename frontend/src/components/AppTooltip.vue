<script setup lang="ts">
import { mergeProps, onBeforeUnmount, ref, watch } from 'vue'
import { TOOLTIP_LONG_PRESS_MS, TOOLTIP_TOUCH_SHOW_MS } from '@/config/appSettings'

/**
 * The app's one tooltip. Two kinds of activator:
 *
 *  - default — an activator that *does* something (a button, a link, a
 *    menu): a mouse hover or keyboard focus shows the tooltip, and a click
 *    just does the thing and puts the tooltip away. A touch screen has no
 *    hover, so there a long press shows it for a moment instead — and
 *    swallows that press's click, so peeking at what a button does never
 *    also does it.
 *  - `info` — an activator that only explains (an ⓘ icon, a logo): a mouse
 *    still gets the hover preview, but a click or tap pins it open — on a
 *    touch screen, the only way to see it — until it's tapped again, or
 *    anywhere else.
 *
 * Vuetify's own triggers are all switched off and driven from pointer
 * events instead: a tap fires an emulated mouseenter just before its click,
 * so its hover handling would open the tooltip on every tap — and, on the
 * old setup, leave it stuck open when the click changed the layout under it.
 */
const props = withDefaults(defineProps<{ text: string; location?: 'top' | 'bottom'; info?: boolean }>(), {
  location: 'top',
  info: false,
})

const open = ref(false)
const pinned = ref(false)
let activatorEl: Element | null = null
let pressTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
// Set when a long press has shown the tooltip — its click is swallowed.
let longPressed = false
let lastPointerType = ''

function show(autoHideMs?: number) {
  clearTimeout(hideTimer)
  open.value = true
  if (autoHideMs) hideTimer = setTimeout(hide, autoHideMs)
}

function hide() {
  clearTimeout(hideTimer)
  open.value = false
  pinned.value = false
}

function cancelPress() {
  clearTimeout(pressTimer)
  pressTimer = undefined
}

// A tap or click anywhere else closes a tooltip that a long press opened or
// a click pinned — there's no pointer leaving to close it.
function onDocumentPointerDown(e: PointerEvent) {
  if (activatorEl && e.target instanceof Node && activatorEl.contains(e.target)) return
  hide()
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('pointerdown', onDocumentPointerDown, true)
  else document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

onBeforeUnmount(() => {
  cancelPress()
  clearTimeout(hideTimer)
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
})

const handlers = {
  class: 'app-tooltip-activator',
  onPointerenter(e: PointerEvent) {
    if (e.pointerType === 'mouse') show()
  },
  onPointerleave(e: PointerEvent) {
    if (e.pointerType === 'mouse' && !pinned.value) hide()
  },
  onPointerdown(e: PointerEvent) {
    activatorEl = e.currentTarget as Element
    lastPointerType = e.pointerType
    longPressed = false
    if (e.pointerType !== 'touch' || props.info) return
    cancelPress()
    pressTimer = setTimeout(() => {
      longPressed = true
      show(TOOLTIP_TOUCH_SHOW_MS)
    }, TOOLTIP_LONG_PRESS_MS)
  },
  // Lifting, or the browser taking the gesture over to scroll.
  onPointerup: cancelPress,
  onPointercancel: cancelPress,
  // A long press is a context-menu gesture on touch screens — the tooltip is
  // what it's for here, not the browser's own menu.
  onContextmenu(e: Event) {
    if (lastPointerType === 'touch') e.preventDefault()
  },
  // Capture phase, so a swallowed click stops before the activator's own
  // click handlers (the button's action, a menu opening) ever see it.
  onClickCapture(e: MouseEvent) {
    activatorEl = e.currentTarget as Element
    if (longPressed) {
      longPressed = false
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }
    if (!props.info) {
      hide()
      return
    }
    // An info activator may sit in something clickable; tapping it is about the tooltip.
    e.stopPropagation()
    pinned.value = !pinned.value
    if (pinned.value) show()
    else hide()
  },
  onFocus(e: FocusEvent) {
    // Keyboard focus only — a click or tap focuses too, and has its own handling.
    if ((e.currentTarget as Element).matches(':focus-visible')) show()
  },
  onBlur() {
    if (!pinned.value) hide()
  },
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') hide()
    // A <button> turns Enter/Space into a click itself; anything else
    // focusable (an icon with role="button") needs it done here.
    if (props.info && (e.key === 'Enter' || e.key === ' ') && !(e.currentTarget instanceof HTMLButtonElement)) {
      e.preventDefault()
      pinned.value = !pinned.value
      if (pinned.value) show()
      else hide()
    }
  },
}
</script>

<template>
  <v-tooltip v-model="open" :text="text" :location="location" class="app-tooltip" :open-on-hover="false"
    :open-on-focus="false" :open-on-click="false">
    <template #activator="{ props: activatorProps }">
      <slot :activator-props="mergeProps(activatorProps, handlers)" />
    </template>
  </v-tooltip>
</template>
