<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { api, type ChainSlug, type TokenMetadata } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'

const { t } = useI18n()
const route = useRoute()
const messages = useMessagesStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const metadata = ref<TokenMetadata | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    metadata.value = await api.tokenMetadata(chain, address)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container>
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />
    <div class="d-flex align-center">
      <v-icon icon="mdi-cash-multiple" size="large" class="mr-3" />
      <h1 class="text-h5">{{ metadata?.symbol ?? t('token.defaultLabel') }}</h1>
    </div>
    <p class="text-medium-emphasis mt-2">{{ address }}</p>
    <p v-if="metadata?.name">{{ metadata.name }}</p>
  </v-container>
</template>
