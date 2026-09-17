<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { api, type ChainSlug, type TokenMetadata } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { toHumanAmount, convertUsd, formatFiat } from '@/services/money'
import { tokenUrl } from '@/services/blockExplorer'
import { groupTransactionsByDate } from '@/services/transactionGrouping'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import type { Transaction } from '@/services/api'
import InfoTooltip from '@/components/InfoTooltip.vue'
import TransactionRow from '@/components/TransactionRow.vue'
import TransactionDetailDialog from '@/components/TransactionDetailDialog.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const messages = useMessagesStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()

const hideDustTxns = ref(false)
const detailTransaction = ref<Transaction | null>(null)
const detailOpen = ref(false)

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
// Which of the user's own accounts this came from — needed for the
// amount-held/total-value rows, since the same token contract can have a
// different balance per account. Absent on a direct/deep link, in which case
// those two rows just don't render rather than showing wrong data.
const holderAddress = typeof route.query.holder === 'string' ? route.query.holder : null

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
  try {
    const loaders = [chainData.loadFxRates()]
    if (holderAddress) loaders.push(chainData.loadAddressActivity(chain, holderAddress))
    await Promise.all(loaders)
  } catch {
    // Amount-held/total rows just won't render without this.
  }
})

const amountHeld = computed(() => {
  if (!holderAddress || !metadata.value) return null
  const activity = chainData.activityByAddress[chainData.keyFor(chain, holderAddress)]
  const balance = activity?.balances.find(
    (b) => b.contract_address?.toLowerCase() === address.toLowerCase(),
  )
  if (!balance) return null
  return toHumanAmount(balance.balance, metadata.value.decimals ?? balance.decimals)
})

// Shown in USD regardless of the user's chosen display currency — that's
// the actual currency the upstream price source (Ethplorer) reports in, so
// converting it would be presenting a number as more precise than it is.
const priceFormatted = computed(() =>
  metadata.value?.usd_price != null ? formatFiat(metadata.value.usd_price, 'USD', locale.value) : null,
)

const totalFormatted = computed(() => {
  if (amountHeld.value === null || metadata.value?.usd_price == null) return null
  const usd = amountHeld.value * metadata.value.usd_price
  return formatFiat(
    convertUsd(usd, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
})

const tokenTransactions = computed(() => {
  if (!holderAddress) return []
  const activity = chainData.activityByAddress[chainData.keyFor(chain, holderAddress)]
  return (
    activity?.transactions.filter((t) => t.contract_address?.toLowerCase() === address.toLowerCase()) ?? []
  )
})
const visibleTokenTransactions = computed(() => {
  if (!hideDustTxns.value) return tokenTransactions.value
  const priceUsd = metadata.value?.usd_price
  if (priceUsd == null) return tokenTransactions.value
  return tokenTransactions.value.filter((t) => Number(t.value) * priceUsd >= DUST_THRESHOLD_USD)
})
const transactionGroups = computed(() => groupTransactionsByDate(visibleTokenTransactions.value, locale.value))

function openTransaction(txn: Transaction) {
  detailTransaction.value = txn
  detailOpen.value = true
}
</script>

<template>
  <div class="token-detail-view">
    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <div class="d-flex align-center mb-4">
      <v-avatar v-if="metadata?.logo_url" :image="metadata.logo_url" size="40" class="mr-3" />
      <v-icon v-else icon="mdi-cash-multiple" size="large" class="mr-3" />
      <h1 class="text-h5">
        {{ metadata?.name ?? t('token.defaultLabel') }}
        <span v-if="metadata?.symbol" class="text-medium-emphasis">({{ metadata.symbol }})</span>
      </h1>
    </div>

    <v-card class="pa-4" max-width="480">
      <div class="detail-row d-flex justify-space-between py-2">
        <span class="text-medium-emphasis">{{ t('common.address') }}</span>
        <a :href="tokenUrl(chain, address)" target="_blank" rel="noopener noreferrer" style="word-break: break-all">
          {{ address }}
        </a>
      </div>

      <div v-if="metadata?.decimals != null" class="detail-row d-flex justify-space-between py-2">
        <span class="text-medium-emphasis">{{ t('token.decimals') }}</span>
        <span>{{ metadata.decimals }}</span>
      </div>

      <div v-if="priceFormatted" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.price') }}
          <InfoTooltip :text="t('token.priceTooltip', { symbol: metadata?.symbol ?? '' })" />
        </span>
        <span>{{ priceFormatted }}</span>
      </div>

      <div v-if="amountHeld !== null" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.amount') }}
          <InfoTooltip :text="t('token.amountTooltip', { symbol: metadata?.symbol ?? '' })" />
        </span>
        <span>{{ amountHeld.toFixed(5) }} {{ metadata?.symbol }}</span>
      </div>

      <div v-if="totalFormatted" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.total') }}
          <InfoTooltip :text="t('token.totalTooltip')" />
        </span>
        <span class="font-weight-bold">{{ totalFormatted }}</span>
      </div>
    </v-card>

    <template v-if="holderAddress">
      <h2 class="text-h6 mt-6 mb-2">{{ t('transactions.title') }}</h2>
      <v-card class="pa-2 token-detail-txn-card" max-width="480">
        <div class="expanded-list pa-2">
          <v-switch
            v-model="hideDustTxns"
            :label="t('accountCard.hideDustTxns')"
            density="compact"
            hide-details
            color="primary"
            class="dust-toggle"
          />
          <template v-for="group in transactionGroups" :key="group.dateLabel">
            <p v-if="group.dateLabel" class="text-caption text-medium-emphasis px-2 mt-2">{{ group.dateLabel }}</p>
            <TransactionRow
              v-for="txn in group.transactions"
              :key="txn.hash"
              :transaction="txn"
              :my-address="holderAddress"
              :chain="chain"
              @click="openTransaction(txn)"
            />
          </template>
          <p v-if="transactionGroups.length === 0" class="text-caption text-medium-emphasis pa-2">
            {{ t('transactions.empty') }}
          </p>
        </div>
      </v-card>
    </template>

    <TransactionDetailDialog v-model="detailOpen" :chain="chain" :transaction="detailTransaction" />
  </div>
</template>
