<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api, type ChainSlug, type TokenMetadata } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'

const route = useRoute()
const messages = useMessagesStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const metadata = ref<TokenMetadata | null>(null)

onMounted(async () => {
  try {
    metadata.value = await api.tokenMetadata(chain, address)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
})
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ metadata?.symbol ?? 'Token' }}</h1>
    <p class="text-medium-emphasis">{{ address }}</p>
    <p v-if="metadata?.name">{{ metadata.name }}</p>
  </v-container>
</template>
