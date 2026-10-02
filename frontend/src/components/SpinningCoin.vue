<script setup lang="ts">
import { ref, watch } from 'vue'

// A logo drawn as a coin that turns about its vertical axis while `spinning`
// is true — the "refreshing" indicator on account cards (chain watermark) and
// the token/chain detail panel's header. Sized by its container: give that a
// height (and `perspective`, for the 3D to read); the width follows the image.
const props = defineProps<{ src: string; spinning: boolean }>()

// Latched on, and only released at the end of a full turn, so a quick load
// still gets one clean revolution instead of snapping back mid-turn.
const latched = ref(props.spinning)
watch(() => props.spinning, (now) => {
  if (now) latched.value = true
})
function onIteration() {
  if (!props.spinning) latched.value = false
}

// Copies of the logo stacked along Z give the coin its thickness.
const LAYERS = 7
</script>

<template>
  <div class="coin" :class="{ 'coin--spinning': latched }" aria-hidden="true" @animationiteration="onIteration">
    <img v-for="layer in LAYERS" :key="layer" :src="src" alt="" class="coin-layer"
      :style="{ '--layer': layer - 1 - (LAYERS - 1) / 2 }" />
  </div>
</template>
