<script setup lang="ts">
import { computed, mergeProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { toHumanAmount, tokenUsdValue, convertUsd, formatFiat, formatAmount } from '@/services/money'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import EditAccountDialog from '@/components/EditAccountDialog.vue'
import HideAccountConfirmDialog from '@/components/HideAccountConfirmDialog.vue'
import SecretRevealDialog from '@/components/SecretRevealDialog.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import SpinningCoin from '@/components/SpinningCoin.vue'
import { addressUrl } from '@/services/blockExplorer'

const props = defineProps<{ account: WalletAccount; reorderable?: boolean }>()
const emit = defineEmits<{
  transferPointerdown: [PointerEvent]
}>()

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const accounts = useAccountsStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()

const expandedTokens = ref(false)
const hideUnknownTokens = ref(true)
const justCopied = ref(false)
const editOpen = ref(false)
const hideOpen = ref(false)
const revealPrivateKeyOpen = ref(false)
const revealMnemonicOpen = ref(false)

function goToSend() {
  router.push(`/accounts/${props.account.chain}/${props.account.address}/send`)
}

function goToNativeDetail() {
  router.push(`/accounts/${props.account.chain}/${props.account.address}/native`)
}

// The chain logo spins (SpinningCoin) while this account's data is loading —
// the periodic auto-refresh as well as a manual one from the native detail panel.
const refreshing = computed(() => chainData.isLoading(props.account.chain, props.account.address))

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
      <div class="chain-watermark" aria-hidden="true">
        <SpinningCoin :src="`/chains/${account.chain}.svg`" :spinning="refreshing" />
      </div>
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
        <p class="flex-grow-1"></p>
        <AppTooltip :text="t('accountCard.send')">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-send" size="large" class="mr-5 transfer-handle" role="button"
              tabindex="0" aria-hidden="false" :aria-label="t('accountCard.send')"
              @pointerdown="emit('transferPointerdown', $event)" @contextmenu.prevent @keydown.enter="goToSend"
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
          <v-list density="compact" class="app-select-menu">
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

      <div class="balance-row pa-3 d-flex align-center" role="button" tabindex="0"
        :aria-label="t('accountCard.viewNativeToken', { symbol: nativeSymbol })" @click="goToNativeDetail"
        @keydown.enter="goToNativeDetail" @keydown.space.prevent="goToNativeDetail">
        <v-icon icon="mdi-wallet" class="mr-2" />
        <div class="flex-grow-1">
          <span v-if="activity === undefined" class="skeleton-row" />
          <template v-else>
            <span class="balance-figure">{{ fiatTotal ?? '—' }}</span>
            <span v-if="nativeBalance !== null" class="text-medium-emphasis ml-1">
              ({{ formatAmount(nativeBalance) }} {{ nativeSymbol }})
            </span>
          </template>
        </div>
        <AppTooltip :text="t('accountCard.viewNativeToken', { symbol: nativeSymbol })">
          <template #default="{ activatorProps }">
            <v-icon v-bind="activatorProps" icon="mdi-chevron-right" />
          </template>
        </AppTooltip>
      </div>
    </div>

    <div v-if="activity === undefined || visibleTokenRows.length > 0"
      class="balance-row token-row pa-3 d-flex align-center"
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
      kind="privateKey" :secret="account.privateKey" />
    <SecretRevealDialog v-if="account.mnemonic" v-model="revealMnemonicOpen" :title="t('accountCard.viewMnemonic')"
      kind="mnemonic" :secret="account.mnemonic" />
  </v-card>
</template>
