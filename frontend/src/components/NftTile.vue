<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * One square in an NFT grid: a collection or a single NFT. The picture only
 * ever comes from the backend's provider's own image cache (see the
 * backend's alchemy/nft.rs), and the title is the NFT's own untrusted text,
 * rendered as plain text and nothing else.
 */
const props = defineProps<{
  imageUrl: string | null
  title: string
  /** Shown over the corner of the picture, e.g. how many are held. */
  badge?: string
  verified?: boolean
  /** Hidden by the user or taken for spam, but shown anyway. */
  dimmed?: boolean
  verifiedLabel?: string
}>()
const emit = defineEmits<{ select: [] }>()

const failed = ref(false)
watch(
  () => props.imageUrl,
  () => (failed.value = false),
)
</script>

<template>
  <button type="button" class="nft-tile" :class="{ 'nft-tile--dimmed': dimmed }" @click="emit('select')">
    <span class="nft-tile-image">
      <img v-if="imageUrl && !failed" :src="imageUrl" alt="" loading="lazy" decoding="async"
        referrerpolicy="no-referrer" @error="failed = true" />
      <v-icon v-else icon="mdi-image-outline" size="x-large" class="text-medium-emphasis" />
      <span v-if="badge" class="nft-tile-badge">{{ badge }}</span>
    </span>
    <span class="nft-tile-title text-truncate">
      <v-icon v-if="verified" icon="mdi-check-decagram" size="x-small" color="primary" class="mr-1"
        :aria-label="verifiedLabel" />{{ title }}
    </span>
  </button>
</template>
