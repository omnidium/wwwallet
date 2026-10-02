<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { ChainSlug } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import SendForm from '@/components/transfer/SendForm.vue'
import SwapForm from '@/components/transfer/SwapForm.vue'
import AppSegmented from '@/components/AppSegmented.vue'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const chainData = useChainDataStore()

const activeTab = ref<'send' | 'swap'>('send')
const tabs = computed(() => [
  { value: 'send' as const, label: t('send.tabSend'), icon: 'mdi-arrow-top-right' },
  { value: 'swap' as const, label: t('send.tabSwap'), icon: 'mdi-swap-horizontal' },
])

// Shared by both tabs, so switching tab keeps the account and chain picked.
// The route only seeds them — the panel picks any account and chain freely.
const fromChain = ref(route.params.chain as ChainSlug)
const fromAddress = ref(route.params.address as string)

// Prefilled by the drag-to-transfer gesture on the Accounts screen.
const initialTo = typeof route.query.to === 'string' ? route.query.to : null

onMounted(async () => {
  // Every account's balance shows in the pickers (and any chain can be the
  // source), so all of them need loading up front — same pattern as
  // AccountsView's own initial load.
  const chains = new Set(accounts.accounts.map((a) => a.chain))
  try {
    await Promise.all([
      chainData.loadFxRates(),
      ...[...chains].map((c) => chainData.loadNativePrice(c)),
      // Fresh balances for the inline checks; held tokens' metadata is
      // refreshed by the accounts screen, and useHeldTokens fills in any
      // token it hasn't resolved at all yet.
      ...accounts.accounts.map((a) => chainData.loadAddressActivity(a.chain, a.address, { refreshTokenMetadata: false })),
    ])
  } catch {
    // Balances/fiat fall back to cached data for the inline checks.
  }
})

// There's no standalone per-account route to return to — account cards live
// directly on the accounts list — so closing this panel always means going
// back there. Pushing to a fabricated `/accounts/:chain/:address` (no
// matching route) used to leave an empty floating pane behind.
function closePanel() {
  router.push('/')
}
</script>

<template>
  <div class="xfer-view">
    <header class="xfer-header pane-header">
      <h1 class="text-h5">{{ activeTab === 'send' ? t('send.title') : t('send.tabSwap') }}</h1>
      <AppSegmented v-model="activeTab" :options="tabs" :label="t('send.title')" tabs />
    </header>

    <SendForm v-if="activeTab === 'send'" v-model:from-address="fromAddress" v-model:from-chain="fromChain"
      :initial-to="initialTo" @close="closePanel" />
    <SwapForm v-else v-model:from-address="fromAddress" v-model:from-chain="fromChain" @close="closePanel" />
  </div>
</template>
