<script setup lang="ts">
import { computed, mergeProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useMessagesStore } from '@/stores/messages'
import { displayErrorMessage } from '@/services/errors'
import { toHumanAmount, tokenUsdValue, convertUsd, formatFiat, formatAmount } from '@/services/money'
import { groupTransactionsByDate } from '@/services/transactionGrouping'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { useTransactionBatchLoader } from '@/composables/useTransactionBatchLoader'
import type { Transaction } from '@/services/api'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import EditAccountDialog from '@/components/EditAccountDialog.vue'
import HideAccountConfirmDialog from '@/components/HideAccountConfirmDialog.vue'
import SecretRevealDialog from '@/components/SecretRevealDialog.vue'
import TransactionRow from '@/components/TransactionRow.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import { addressUrl } from '@/services/blockExplorer'

const props = defineProps<{ account: WalletAccount; reorderable?: boolean }>()
const emit = defineEmits<{
  transferPointerdown: [PointerEvent]
  openTransaction: [Transaction]
}>()

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const accounts = useAccountsStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()
const messages = useMessagesStore()

const expandedTxns = ref(false)
const expandedTokens = ref(false)
const hideDustTxns = ref(true)
const hideUnknownTokens = ref(true)
const justCopied = ref(false)
const editOpen = ref(false)
const hideOpen = ref(false)
const revealPrivateKeyOpen = ref(false)
const revealMnemonicOpen = ref(false)

function goToSend() {
  router.push(`/accounts/${props.account.chain}/${props.account.address}/send`)
}

// Same refresh the periodic auto-refresh runs, scoped to this account:
// balances, newest transactions (merged into whatever's already loaded) and
// metadata for held tokens worth over $0.01 (see chainData.loadAddressActivity), plus the
// native price and fx rates its fiat totals are computed from. Unlike the
// silent background auto-refresh, a failure here is the direct result of
// something the user just clicked, so it gets a toast instead of failing quietly.
const refreshing = computed(() => chainData.isLoading(props.account.chain, props.account.address))
async function refreshAccount() {
  if (refreshing.value) return
  const results = await Promise.allSettled([
    chainData.loadAddressActivity(props.account.chain, props.account.address),
    chainData.loadNativePrice(props.account.chain),
    chainData.loadFxRates(),
  ])
  const failure = results.find((r) => r.status === 'rejected')
  if (failure) messages.push(displayErrorMessage(failure.reason), 'error')
}

const activity = computed(
  () => chainData.activityByAddress[chainData.keyFor(props.account.chain, props.account.address)],
)
const nativeBalance = computed(() => {
  const native = activity.value?.balances.find((b) => b.contract_address === null)
  return native ? toHumanAmount(native.balance, native.decimals) : null
})
const nativeSymbol = computed(
  () => activity.value?.balances.find((b) => b.contract_address === null)?.symbol ?? '',
)
const fiatTotal = computed(() => {
  if (nativeBalance.value === null) return null
  // A confirmed zero balance is worth zero in any currency — no need to wait
  // on this chain's native price to say so, and it would otherwise show a
  // bare "—" next to an already-visible "0.00000 ETH" if the price hadn't
  // loaded yet (or failed to).
  if (nativeBalance.value === 0) return formatFiat(0, settingsLocale.currency, locale.value)
  const priceUsd = chainData.nativePriceUsdByChain[props.account.chain]
  if (priceUsd === undefined) return null
  const usd = nativeBalance.value * priceUsd
  return formatFiat(convertUsd(usd, settingsLocale.currency, chainData.fxRates), settingsLocale.currency, locale.value)
})

const tokenBalances = computed(
  () => activity.value?.balances.filter((b) => b.contract_address !== null) ?? [],
)
const tokenRows = computed(() =>
  tokenBalances.value
    .map((balance) => {
      const key = chainData.keyFor(props.account.chain, balance.contract_address!)
      const metadata = chainData.tokenMetadataByKey[key]
      const amount = toHumanAmount(balance.balance, metadata?.decimals ?? balance.decimals)
      const usd = tokenUsdValue(balance, metadata)
      return {
        contractAddress: balance.contract_address!,
        symbol: metadata?.symbol ?? balance.symbol,
        name: metadata?.name,
        logoUrl: metadata?.logo_url,
        amount,
        fiat: usd === null ? null : formatFiat(convertUsd(usd, settingsLocale.currency, chainData.fxRates), settingsLocale.currency, locale.value),
        usd,
      }
    })
    // Highest USD value first; a token with no resolved price (e.g. the
    // token-list metadata fallback, which never carries a live price) sinks
    // to the bottom rather than sorting arbitrarily among the priced ones.
    .sort((a, b) => (b.usd ?? -1) - (a.usd ?? -1)),
)
// Watermark stack on the collapsed token row: the most valuable non-dust
// holdings (tokenRows is already sorted by USD value, highest first). Tokens
// without a logo are skipped, since there'd be nothing to draw.
const MAX_TOKEN_WATERMARKS = 5
const tokenWatermarks = computed(() =>
  tokenRows.value
    .filter((r) => r.logoUrl != null && (r.usd ?? 0) > DUST_THRESHOLD_USD)
    .slice(0, MAX_TOKEN_WATERMARKS),
)
const tokenFiatUsdTotal = computed(() =>
  tokenRows.value.reduce((sum, t) => sum + (t.usd ?? 0), 0),
)
const tokenFiatTotal = computed(() =>
  tokenFiatUsdTotal.value > 0
    ? formatFiat(convertUsd(tokenFiatUsdTotal.value, settingsLocale.currency, chainData.fxRates), settingsLocale.currency, locale.value)
    : null,
)
// The total above always reflects every token held; only the row list below
// (what's actually rendered) responds to the toggle. "Unknown" means the
// backend's token-metadata lookup didn't resolve a logo for it — not a
// dust/value threshold.
const visibleTokenRows = computed(() =>
  hideUnknownTokens.value ? tokenRows.value.filter((r) => r.logoUrl != null) : tokenRows.value,
)

// Only native-asset transfers — a token's own transfers show on that
// token's own detail page instead, alongside the rest of its history.
const nativeTransactions = computed(
  () => activity.value?.transactions.filter((t) => t.contract_address === null) ?? [],
)
const visibleNativeTransactions = computed(() => {
  if (!hideDustTxns.value) return nativeTransactions.value
  const priceUsd = chainData.nativePriceUsdByChain[props.account.chain]
  if (priceUsd === undefined) return nativeTransactions.value
  return nativeTransactions.value.filter((t) => Number(t.value) * priceUsd >= DUST_THRESHOLD_USD)
})
const transactionGroups = computed(() =>
  groupTransactionsByDate(visibleNativeTransactions.value, locale.value),
)

const expandedListEl = ref<HTMLElement | null>(null)
const { loadNextBatch: loadNextTransactionBatch, isLoading: loadingMoreTxns } = useTransactionBatchLoader(
  props.account.chain,
  props.account.address,
  () => visibleNativeTransactions.value.length,
)
useInfiniteScroll(() => void loadNextTransactionBatch(), expandedListEl)

async function copyAddress() {
  await navigator.clipboard.writeText(props.account.address)
  justCopied.value = true
  setTimeout(() => (justCopied.value = false), 2000)
}

async function toggleShow() {
  await accounts.setVisibility(props.account.chain, props.account.address, true)
}

function openInNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <v-card class="account-card mb-6">
    <div v-if="reorderable" class="drag-handle-row">
      <AppTooltip :text="t('accountCard.dragToReorder')">
        <template #default="{ activatorProps }">
          <img v-bind="activatorProps" src="/drag_dots.svg" :alt="t('accountCard.dragToReorder')" class="drag-handle" />
        </template>
      </AppTooltip>
    </div>
    <div class="card-summary">
      <img :src="`/chains/${account.chain}.svg`" alt="" aria-hidden="true" class="chain-watermark" />
      <div class=" card-header d-flex align-center pa-4 pb-2">
        <span v-if="account.isDefault" class="mr-1">*</span>
        <AppTooltip :text="t('accountCard.viewOnEtherscan')">
          <template #default="{ activatorProps }">
            <p class="account-name grow-0 text-truncate" style="cursor: pointer" v-bind="activatorProps"
              @click="openInNewTab(addressUrl(props.account.chain, props.account.address))">
              {{ account.label }}
            </p>
          </template>
        </AppTooltip>
        <AppTooltip :text="justCopied ? t('accountCard.copied') : t('accountCard.copyAddress')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-content-copy" size="large" class="mr-2 ml-5" role="button"
              @click="copyAddress" />
          </template>
        </AppTooltip>
        <AppTooltip :text="t('accountCard.viewQr')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-qrcode" size="large" class="mr-2" role="button"
              :aria-label="t('accountCard.viewQr')"
              @click="$router.push(`/accounts/${account.chain}/${account.address}/receive`)" />
          </template>
        </AppTooltip>
        <AppTooltip :text="t('accountCard.viewNativeToken', { symbol: nativeSymbol })">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-information-outline" size="large" class="mr-2" role="button"
              :aria-label="t('accountCard.viewNativeToken', { symbol: nativeSymbol })"
              @click="$router.push(`/accounts/${account.chain}/${account.address}/native`)" />
          </template>
        </AppTooltip>
        <p class="flex-grow-1"></p>
        <AppTooltip :text="t('accountCard.refresh')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-refresh" size="large" class="mr-2"
              :class="{ 'mdi-spin': refreshing }" role="button" :aria-label="t('accountCard.refresh')"
              :aria-busy="refreshing" @click="refreshAccount" />
          </template>
        </AppTooltip>
        <p class="flex-grow-1"></p>
        <AppTooltip :text="t('accountCard.send')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-send" size="large" class="mr-5 transfer-handle" role="button"
              tabindex="0" aria-hidden="false" :aria-label="t('accountCard.send')"
              @pointerdown="emit('transferPointerdown', $event)" @keydown.enter="goToSend"
              @keydown.space.prevent="goToSend" />
          </template>
        </AppTooltip>
        <v-menu>
          <template #activator="{ props: menuProps }">
            <AppTooltip :text="t('accountCard.moreActions')">
              <template #default="{ activatorProps }">
                <v-icon v-bind="mergeProps(menuProps, activatorProps)" icon="mdi-dots-horizontal" role="button"
                  :aria-label="t('accountCard.moreActions')" />
              </template>
            </AppTooltip>
          </template>
          <v-list density="compact">
            <v-list-item :title="t('accountCard.edit')" prepend-icon="mdi-pencil" @click="editOpen = true" />
            <v-list-item v-if="account.visible" :title="t('accountCard.hide')" prepend-icon="mdi-eye-off"
              @click="hideOpen = true" />
            <v-list-item v-else :title="t('accountCard.show')" prepend-icon="mdi-eye" @click="toggleShow" />
            <v-list-item :title="t('accountCard.viewPrivateKey')" prepend-icon="mdi-key"
              @click="revealPrivateKeyOpen = true" />
            <v-list-item v-if="account.hasMnemonic" :title="t('accountCard.viewMnemonic')"
              prepend-icon="mdi-format-list-numbered" @click="revealMnemonicOpen = true" />
          </v-list>
        </v-menu>
      </div>

      <div class="balance-row pa-3 d-flex align-center" @click="expandedTxns = !expandedTxns">
        <v-icon icon="mdi-wallet" class="mr-2" />
        <div class="grow">
          <span v-if="activity === undefined" class="skeleton-row" />
          <template v-else>
            <span class="balance-figure">{{ fiatTotal ?? '—' }}</span>
            <span v-if="nativeBalance !== null" class="text-medium-emphasis ml-1">
              ({{ formatAmount(nativeBalance) }} {{ nativeSymbol }})
            </span>
          </template>
        </div>
        <AppTooltip :text="expandedTxns ? t('accountCard.hideTransactions') : t('accountCard.showTransactions')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" :icon="expandedTxns ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </template>
        </AppTooltip>
      </div>
    </div>

    <div v-if="expandedTxns">
      <v-switch v-model="hideDustTxns" :label="t('accountCard.hideDustTxns')" density="compact" hide-details
        color="primary" class="dust-toggle pa-2" />
      <div ref="expandedListEl" class="expanded-list pa-2">
        <template v-for="group in transactionGroups" :key="group.dateLabel">
          <p v-if="group.dateLabel" class="text-caption text-medium-emphasis px-2 mt-2">{{ group.dateLabel }}</p>
          <TransactionRow v-for="txn in group.transactions" :key="txn.hash" :transaction="txn"
            :my-address="account.address" :chain="account.chain" @click="emit('openTransaction', txn)" />
        </template>
        <div v-if="activity === undefined" class="d-flex justify-center pa-2">
          <v-progress-circular indeterminate size="20" width="2" color="primary" />
        </div>
        <p v-else-if="transactionGroups.length === 0" class="text-caption text-medium-emphasis pa-2">
          {{ t('transactions.empty') }}
        </p>
        <div v-if="loadingMoreTxns" class="d-flex justify-center pa-2">
          <v-progress-circular indeterminate size="20" width="2" color="primary" />
        </div>
      </div>
    </div>

    <div v-if="activity === undefined || tokenRows.length > 0" class="balance-row token-row pa-3 d-flex align-center"
      @click="activity !== undefined && (expandedTokens = !expandedTokens)">
      <template v-if="activity === undefined">
        <v-icon icon="mdi-cash-multiple" class="mr-2" />
        <span class="skeleton-row" />
      </template>
      <template v-else>
        <v-icon icon="mdi-cash-multiple" class="mr-2" />
        <span class="balance-figure">{{ tokenFiatTotal ?? '—' }}</span>
        <v-spacer />
        <div v-if="tokenWatermarks.length > 0" class="token-watermarks mr-2" aria-hidden="true">
          <img v-for="tokenRow in tokenWatermarks" :key="tokenRow.contractAddress" :src="tokenRow.logoUrl!" alt=""
            class="token-watermark" />
        </div>
        <AppTooltip :text="expandedTokens ? t('accountCard.hideTokens') : t('accountCard.showTokens')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" :icon="expandedTokens ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </template>
        </AppTooltip>
      </template>
    </div>

    <div v-if="expandedTokens">
      <v-switch v-model="hideUnknownTokens" :label="t('accountCard.hideUnknownTokens')" density="compact" hide-details
        color="primary" class="dust-toggle" />
      <div class="expanded-list pa-2">
        <v-list-item v-for="tokenRow in visibleTokenRows" :key="tokenRow.contractAddress"
          :to="`/tokens/${account.chain}/${tokenRow.contractAddress}?holder=${account.address}`" density="compact">
          <template #prepend>
            <v-avatar v-if="tokenRow.logoUrl" :image="tokenRow.logoUrl" size="24" />
            <v-icon v-else icon="mdi-cash" size="24" />
          </template>
          <v-list-item-title>{{ tokenRow.name ?? tokenRow.symbol }} ({{ formatAmount(tokenRow.amount) }} {{
            tokenRow.symbol
            }})</v-list-item-title>
          <template #append>
            <span v-if="tokenRow.fiat">{{ tokenRow.fiat }}</span>
          </template>
        </v-list-item>
      </div>
    </div>

    <EditAccountDialog v-model="editOpen" :account="account" />
    <HideAccountConfirmDialog v-model="hideOpen" :account="account" />
    <SecretRevealDialog v-model="revealPrivateKeyOpen" :title="t('accountCard.viewPrivateKey')"
      :secret-noun="t('accountCard.privateKeyNoun')" :secret="account.privateKey" />
    <SecretRevealDialog v-if="account.mnemonic" v-model="revealMnemonicOpen" :title="t('accountCard.viewMnemonic')"
      :secret-noun="t('accountCard.mnemonicNoun')" :secret="account.mnemonic" />
  </v-card>
</template>
