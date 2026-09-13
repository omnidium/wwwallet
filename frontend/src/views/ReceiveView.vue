<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import type { ChainSlug } from '@/services/api'

const route = useRoute()
const accounts = useAccountsStore()
const messages = useMessagesStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)
const qrDataUrl = ref('')

onMounted(async () => {
  qrDataUrl.value = await QRCode.toDataURL(address, { width: 280, margin: 1 })
})

async function copyAddress() {
  await navigator.clipboard.writeText(address)
  messages.push('Address copied.', 'success')
}
</script>

<template>
  <v-container class="d-flex flex-column align-center">
    <h1 class="text-h5">Receive</h1>
    <p class="text-medium-emphasis mb-4">{{ account?.label ?? 'Account' }} ({{ chain }})</p>

    <v-img v-if="qrDataUrl" :src="qrDataUrl" width="280" height="280" />

    <v-card class="pa-4 mt-4" max-width="480" @click="copyAddress" style="cursor: pointer">
      <p class="text-body-2" style="word-break: break-all">{{ address }}</p>
      <p class="text-caption text-medium-emphasis mt-1">Tap to copy</p>
    </v-card>
  </v-container>
</template>
