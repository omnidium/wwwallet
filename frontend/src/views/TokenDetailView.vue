<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { type ChainSlug } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'
import { displayErrorMessage } from '@/services/errors'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useFavouritesStore } from '@/stores/favourites'
import { toHumanAmount, convertUsd, formatFiat, formatAmount, formatPercentChange, formatUsdPrice } from '@/services/money'
import { tokenUrl } from '@/services/blockExplorer'
import { truncateAddress } from '@/services/format'
import { groupTransactionsByDate } from '@/services/transactionGrouping'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { useTransactionBatchLoader } from '@/composables/useTransactionBatchLoader'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import type { Transaction } from '@/services/api'
import InfoTooltip from '@/components/InfoTooltip.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import SpinningCoin from '@/components/SpinningCoin.vue'
import PriceSparkline from '@/components/PriceSparkline.vue'
import TransactionRow from '@/components/TransactionRow.vue'
import TransactionDetailDialog from '@/components/TransactionDetailDialog.vue'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const messages = useMessagesStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()
const favourites = useFavouritesStore()

const hideDustTxns = ref(true)
const detailTransaction = ref<Transaction | null>(null)
const detailOpen = ref(false)

const chain = route.params.chain as ChainSlug
// The native-token route (an account's ETH, POL…) puts the holder in the
// path instead, and has no contract address to look metadata up by.
const isNative = route.name === 'native-token-detail'
// The token's contract address; null for the native asset.
const address = isNative ? null : (route.params.address as string)
// Which of the user's own accounts this came from — needed for the
// amount-held/total-value rows, since the same token contract can have a
// different balance per account. Absent on a direct/deep link, in which case
// those two rows just don't render rather than showing wrong data.
const holderAddress = isNative
  ? (route.params.address as string)
  : typeof route.query.holder === 'string' ? route.query.holder : null

const holderActivity = computed(() =>
  holderAddress ? chainData.activityByAddress[chainData.keyFor(chain, holderAddress)] : undefined,
)
// The holder's balance entry for this token (the contract-less one for native).
const heldBalance = computed(() =>
  holderActivity.value?.balances.find((b) =>
    address === null ? b.contract_address === null : b.contract_address?.toLowerCase() === address.toLowerCase(),
  ),
)

// For the native asset, assembled from the holder's balance entry, the
// chain's native price and the static NATIVE_ASSETS details.
const metadata = computed(() => {
  if (address !== null) return chainData.tokenMetadataByKey[chainData.keyFor(chain, address)] ?? null
  const native = NATIVE_ASSETS[chain]
  return {
    name: native.name,
    symbol: heldBalance.value?.symbol ?? native.symbol,
    decimals: heldBalance.value?.decimals ?? null,
    logo_url: native.logoUrl,
    usd_price: chainData.nativePriceUsdByChain[chain] ?? null,
  }
})
const loading = ref(true)

// Everything below renders straight from the persistent cache first; these
// only refresh it. The holder's other tokens aren't shown here, so their
// metadata is left to the accounts screen's own refresh.
onMounted(async () => {
  const metadataLoad = (address === null ? chainData.loadNativePrice(chain) : chainData.loadTokenMetadata(chain, address))
    .catch((err) => {
      // Only worth interrupting the user over when there's nothing at all to show.
      if (address === null ? metadata.value?.usd_price == null : !metadata.value) {
        messages.push(displayErrorMessage(err), 'error')
      }
    })
    .finally(() => {
      loading.value = false
    })
  // The price history also backs the always-visible current price row.
  const loaders: Promise<unknown>[] = [chainData.loadFxRates(), favourites.load(), loadPriceHistory()]
  if (holderAddress) loaders.push(chainData.loadAddressActivity(chain, holderAddress, { refreshTokenMetadata: false }))
  // Amount-held/total rows fall back to cached data (or don't render) on failure.
  await Promise.allSettled([metadataLoad, ...loaders])
})

// The balance entry carries its own decimals, so this doesn't wait on (or
// need) the token's metadata.
const amountHeld = computed(() => {
  if (!heldBalance.value) return null
  return toHumanAmount(heldBalance.value.balance, metadata.value?.decimals ?? heldBalance.value.decimals)
})

// Priced like the current-price row above it — the metadata's price can be
// missing (the token price lookup is the most rate-limited upstream call)
// while the price history has one, and the two rows must never disagree.
const totalFormatted = computed(() => {
  if (amountHeld.value === null || currentPriceUsd.value === null) return null
  const usd = amountHeld.value * currentPriceUsd.value
  return formatFiat(
    convertUsd(usd, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
})

const isFavourite = computed(() => favourites.isFavourite(chain, address))
// A token's lock-screen row has nothing else to name it by.
const favouriteDisplay = computed(() =>
  address !== null && metadata.value?.symbol
    ? { symbol: metadata.value.symbol, logoUrl: metadata.value.logo_url ?? null }
    : undefined,
)
function toggleFavourite() {
  void favourites.setFavourite(chain, address, !isFavourite.value, favouriteDisplay.value)
}
watch(favouriteDisplay, (display) => {
  if (address !== null && display) favourites.updateTokenDisplay(chain, address, display)
})

const priceHistory = computed(() => chainData.priceHistoryByAsset[chainData.assetKey(chain, address)] ?? null)
// Shown in USD regardless of the user's chosen display currency — that's
// what the upstream price sources report in, so converting it would be
// presenting a number as more precise than it is. The 24h history's latest
// sample once it's in; until then, the price that came with the metadata.
const currentPriceUsd = computed(() => priceHistory.value?.usd ?? metadata.value?.usd_price ?? null)
const showMoreDetails = ref(false)
const loadingPriceHistory = ref(false)
async function loadPriceHistory() {
  loadingPriceHistory.value = true
  try {
    await chainData.loadPriceHistory(chain, address)
  } finally {
    loadingPriceHistory.value = false
  }
}
function toggleMoreDetails() {
  showMoreDetails.value = !showMoreDetails.value
}

// Clicking the header's name refreshes everything this panel shows: the
// price row and 24h figures (so the two never disagree after a click), plus,
// with a holder, their balances and newest transactions — the same refresh
// the accounts screen's auto-refresh runs. The header logo spins meanwhile,
// matching the account card's chain logo.
const refreshingPrice = ref(false)
const refreshing = computed(() =>
  refreshingPrice.value || (!!holderAddress && chainData.isLoading(chain, holderAddress)),
)
async function refresh() {
  if (refreshing.value) return
  refreshingPrice.value = true
  const loaders: Promise<unknown>[] = [
    address === null ? chainData.loadNativePrice(chain) : chainData.loadTokenMetadata(chain, address),
    loadPriceHistory(),
  ]
  if (holderAddress) loaders.push(chainData.loadAddressActivity(chain, holderAddress), chainData.loadFxRates())
  const results = await Promise.allSettled(loaders)
  refreshingPrice.value = false
  const failure = results.find((r) => r.status === 'rejected')
  if (failure) messages.push(displayErrorMessage(failure.reason), 'error')
}

const activityLoaded = computed(() => !holderAddress || holderActivity.value !== undefined)
const tokenTransactions = computed(
  () =>
    holderActivity.value?.transactions.filter((t) =>
      address === null ? t.contract_address === null : t.contract_address?.toLowerCase() === address.toLowerCase(),
    ) ?? [],
)
const visibleTokenTransactions = computed(() => {
  if (!hideDustTxns.value) return tokenTransactions.value
  const priceUsd = currentPriceUsd.value
  if (priceUsd === null) return tokenTransactions.value
  return tokenTransactions.value.filter((t) => Number(t.value) * priceUsd >= DUST_THRESHOLD_USD)
})
const transactionGroups = computed(() => groupTransactionsByDate(visibleTokenTransactions.value, locale.value))

// This view is always rendered inside PaneOverlay's own scrolling
// `.pane-card`, and `.token-detail-txn-card .expanded-list` (see the CSS)
// is flex-bounded to the remaining space within it and scrolls internally —
// it's never the window that scrolls, so useInfiniteScroll needs a ref to
// that element rather than falling back to its window default. No-op when
// there's no holderAddress (a direct/deep link with nothing loaded to page
// through in the first place).
const txnListEl = ref<HTMLElement | null>(null)
const { loadNextBatch: loadNextTokenBatch, isLoading: loadingMoreTxns } = holderAddress
  ? useTransactionBatchLoader(chain, holderAddress, () => visibleTokenTransactions.value.length)
  : { loadNextBatch: async () => { }, isLoading: ref(false) }
useInfiniteScroll(() => void loadNextTokenBatch(), txnListEl)

function openTransaction(txn: Transaction) {
  detailTransaction.value = txn
  detailOpen.value = true
}
</script>

<template>
  <div class="token-detail-view">
    <!-- <v-progress-linear v-if="loading" indeterminate class="mb-4" /> -->

    <div class="token-detail-header d-flex align-center mb-2">
      <div v-if="metadata?.logo_url" class="token-detail-logo mr-3">
        <SpinningCoin :src="metadata.logo_url" :spinning="refreshing" />
      </div>
      <v-icon v-else icon="mdi-cash-multiple" size="large" class="mr-3" />
      <AppTooltip :text="t('token.refreshPrice')">
        <template #default="{ activatorProps }">
          <h3 v-bind="activatorProps" class="token-detail-name"
            :class="{ 'token-detail-name--refreshing': refreshing && !metadata?.logo_url }" role="button"
            tabindex="0" :aria-busy="refreshing" @click="refresh" @keydown.enter="refresh"
            @keydown.space.prevent="refresh">
            {{ metadata?.name ?? t('token.defaultLabel') }}
            <span v-if="metadata?.symbol" class="text-medium-emphasis">({{ metadata.symbol }})</span>
          </h3>
        </template>
      </AppTooltip>
      <AppTooltip :text="isFavourite ? t('token.removeFavourite') : t('token.addFavourite')">
        <template #default="{ activatorProps }">
          <v-icon v-bind="activatorProps" :icon="isFavourite ? 'mdi-star' : 'mdi-star-outline'" size="large"
            class="favourite-star flex-shrink-0 ml-3" :class="{ 'favourite-star--on': isFavourite }" role="button"
            :aria-pressed="isFavourite" :aria-label="isFavourite ? t('token.removeFavourite') : t('token.addFavourite')"
            @click="toggleFavourite" />
        </template>
      </AppTooltip>
    </div>

    <v-card class="pa-4" max-width="480">
      <div v-if="address === null" class="detail-row d-flex justify-space-between py-2">
        <span class="text-medium-emphasis">{{ t('token.network') }}</span>
        <span>{{ NATIVE_ASSETS[chain].networkName }}</span>
      </div>
      <div v-else class="detail-row d-flex justify-space-between py-2">
        <span class="text-medium-emphasis">{{ t('common.address') }}</span>
        <a :href="tokenUrl(chain, address)" target="_blank" rel="noopener noreferrer">
          {{ truncateAddress(address) }}
        </a>
      </div>

      <div v-if="currentPriceUsd !== null" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.currentPrice') }}
          <InfoTooltip :text="t('token.priceTooltip', { symbol: metadata?.symbol ?? '' })" />
        </span>
        <span>{{ formatUsdPrice(currentPriceUsd, locale) }}</span>
      </div>

      <div v-if="amountHeld !== null" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.amount') }}
          <InfoTooltip :text="t('token.amountTooltip', { symbol: metadata?.symbol ?? '' })" />
        </span>
        <span>{{ formatAmount(amountHeld) }} {{ metadata?.symbol }}</span>
      </div>

      <div v-if="totalFormatted" class="detail-row d-flex align-center justify-space-between py-2">
        <span class="text-medium-emphasis d-flex align-center">
          {{ t('token.total') }}
          <InfoTooltip :text="t('token.totalTooltip')" />
        </span>
        <span class="font-weight-bold">{{ totalFormatted }}</span>
      </div>

      <template v-if="showMoreDetails">
        <div class="detail-row d-flex align-center justify-space-between py-2">
          <span class="text-medium-emphasis">{{ t('token.change24h') }}</span>
          <span v-if="priceHistory"
            :class="priceHistory.change_24h_pct > 0 ? 'price-change--up' : 'price-change--down'">
            {{ formatPercentChange(priceHistory.change_24h_pct, locale) }}
          </span>
          <span v-else>—</span>
        </div>
        <div class="detail-row d-flex align-center justify-space-between py-2">
          <span class="text-medium-emphasis">{{ t('token.chart24h') }}</span>
          <PriceSparkline v-if="priceHistory" :points="priceHistory.points" :width="160" :height="40" />
          <v-progress-circular v-else-if="loadingPriceHistory" indeterminate size="20" width="2" color="primary" />
          <span v-else>—</span>
        </div>
      </template>
      <div class="pt-2">
        <a href="#" class="text-caption" @click.prevent="toggleMoreDetails">
          {{ showMoreDetails ? t('token.lessDetails') : t('token.moreDetails') }}
        </a>
      </div>
    </v-card>

    <template v-if="holderAddress">
      <h4 class="pt-4 mb-1">{{ t('transactions.title') }}</h4>
      <v-switch v-model="hideDustTxns" :label="t('accountCard.hideDustTxns')" density="compact" hide-details
        color="primary" class="pl-2 pb-2" />
      <v-card class="pa-2 token-detail-txn-card" max-width="480">
        <div ref="txnListEl" class="token-detail-txn">
          <template v-for="group in transactionGroups" :key="group.dateLabel">
            <p v-if="group.dateLabel" class="txn-date-label text-caption px-2">{{ group.dateLabel }}</p>
            <TransactionRow v-for="txn in group.transactions" :key="txn.hash" :transaction="txn"
              :my-address="holderAddress" :chain="chain" @click="openTransaction(txn)" />
          </template>
          <div v-if="!activityLoaded" class="d-flex justify-center pa-2">
            <v-progress-circular indeterminate size="20" width="2" color="primary" />
          </div>
          <p v-else-if="transactionGroups.length === 0" class="text-caption text-medium-emphasis pa-2">
            {{ t('transactions.empty') }}
          </p>
          <div v-if="loadingMoreTxns" class="d-flex justify-center pa-2">
            <v-progress-circular indeterminate size="20" width="2" color="primary" />
          </div>
        </div>

      </v-card>
    </template>

    <TransactionDetailDialog v-model="detailOpen" :chain="chain" :transaction="detailTransaction"
      :my-address="holderAddress" />
  </div>
</template>
