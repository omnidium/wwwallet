<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useChainDataStore } from '@/stores/chainData'
import { useMessagesStore } from '@/stores/messages'
import { useAccountsStore } from '@/stores/accounts'
import type { ChainSlug } from '@/services/api'

const { t } = useI18n()
const route = useRoute()
const chainData = useChainDataStore()
const messages = useMessagesStore()
const accounts = useAccountsStore()
const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = accounts.findAccount(chain, address)

onMounted(async () => {
  try {
    await chainData.loadAddressActivity(chain, address)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
})
</script>

<template>
  <v-container>
    <h1 class="text-h5">{{ account?.label ?? address }}</h1>
    <p class="text-medium-emphasis" style="word-break: break-all">{{ address }} ({{ chain }})</p>

    <v-progress-linear v-if="chainData.loading" indeterminate class="my-4" />

    <template v-else>
      <v-list>
        <v-list-item
          v-for="balance in chainData.activityByAddress[chainData.keyFor(chain, address)]?.balances ?? []"
          :key="balance.contract_address ?? balance.symbol"
          :title="`${balance.balance} ${balance.symbol}`"
        />
      </v-list>
      <v-btn class="mt-4 mr-2" variant="outlined" :to="`/accounts/${chain}/${address}/swap`">{{ t('accountDetail.swap') }}</v-btn>
      <v-btn class="mt-4" variant="outlined" :to="`/accounts/${chain}/${address}/transactions`">{{ t('accountDetail.transactions') }}</v-btn>

      <div class="account-footer-actions">
        <v-btn
          icon="mdi-tray-arrow-down"
          color="receive"
          size="large"
          rounded="circle"
          :to="`/accounts/${chain}/${address}/receive`"
          :aria-label="t('accountDetail.receiveAria')"
        />
        <v-btn
          icon="mdi-tray-arrow-up"
          color="send"
          size="large"
          rounded="circle"
          :to="`/accounts/${chain}/${address}/send`"
          :aria-label="t('accountDetail.sendAria')"
        />
      </div>
      <div style="height: 88px" />
    </template>
  </v-container>
</template>

<style scoped>
.account-footer-actions {
  position: fixed;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 32px;
  pointer-events: none;
}

.account-footer-actions > * {
  pointer-events: auto;
}
</style>
