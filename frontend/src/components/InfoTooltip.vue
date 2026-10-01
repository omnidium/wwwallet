<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{ text: string }>()

// Not built on AppTooltip: its activators are action buttons, so a click there
// means "do the thing" and the tooltip just gets out of the way. This icon
// exists only to show its text, so a click or tap is what opens it — the only
// way to on a touch screen — and pins it open (on desktop too), while a real
// mouse still gets the usual hover preview. Vuetify's own triggers are all
// switched off: a tap fires an emulated mouseenter right before its click, so
// its hover handling would open the tooltip and the click would immediately
// toggle it shut again.
const open = ref(false)
const pinned = ref(false)

function onPointerEnter(e: PointerEvent) {
  if (e.pointerType === 'mouse') open.value = true
}

function onPointerLeave(e: PointerEvent) {
  if (e.pointerType === 'mouse' && !pinned.value) open.value = false
}

function toggle() {
  pinned.value = !pinned.value
  open.value = pinned.value
}

// However it closed — a tap/click elsewhere (Vuetify's click-outside), Escape,
// or the icon itself — the next hover starts out unpinned again.
watch(open, (isOpen) => {
  if (!isOpen) pinned.value = false
})
</script>

<template>
  <v-tooltip v-model="open" :text="text" location="top" class="app-tooltip" :open-on-hover="false"
    :open-on-focus="false" :open-on-click="false">
    <template #activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" icon="mdi-information-outline" size="small" class="ml-1" role="button"
        tabindex="0" :aria-label="text" @pointerenter="onPointerEnter" @pointerleave="onPointerLeave"
        @click.stop="toggle" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle"
        @keydown.esc="open = false" />
    </template>
  </v-tooltip>
</template>
