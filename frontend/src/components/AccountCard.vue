<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WalletAccount } from '@/stores/accounts'
import { useAccountsStore } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useMessagesStore } from '@/stores/messages'
import { toHumanAmount, convertUsd, formatFiat } from '@/services/money'
import { groupTransactionsByDate } from '@/services/transactionGrouping'
import type { Transaction } from '@/services/api'
import { DUST_THRESHOLD_USD } from '@/config/appSettings'
import EditAccountDialog from '@/components/EditAccountDialog.vue'
import HideAccountConfirmDialog from '@/components/HideAccountConfirmDialog.vue'
import SecretRevealDialog from '@/components/SecretRevealDialog.vue'
import TransactionRow from '@/components/TransactionRow.vue'

const props = defineProps<{ account: WalletAccount; eligibleTransferSiblings: WalletAccount[] }>()
const emit = defineEmits<{
  transferPointerdown: [PointerEvent]
  openTransaction: [Transaction]
}>()

const { t, locale } = useI18n({ useScope: 'global' })
const accounts = useAccountsStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()
const messages = useMessagesStore()

const expandedTxns = ref(false)
const expandedTokens = ref(false)
const hideDustTxns = ref(false)
const hideDustTokens = ref(false)
const justCopied = ref(false)
const editOpen = ref(false)
const hideOpen = ref(false)
const revealPrivateKeyOpen = ref(false)
const revealMnemonicOpen = ref(false)

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
  tokenBalances.value.map((balance) => {
    const key = chainData.keyFor(props.account.chain, balance.contract_address!)
    const metadata = chainData.tokenMetadataByKey[key]
    const amount = toHumanAmount(balance.balance, metadata?.decimals ?? balance.decimals)
    const usd = metadata?.usd_price ? amount * metadata.usd_price : null
    return {
      contractAddress: balance.contract_address!,
      symbol: metadata?.symbol ?? balance.symbol,
      name: metadata?.name,
      logoUrl: metadata?.logo_url,
      amount,
      fiat: usd === null ? null : formatFiat(convertUsd(usd, settingsLocale.currency, chainData.fxRates), settingsLocale.currency, locale.value),
      usd,
    }
  }),
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
// (what's actually rendered) responds to the dust toggle.
const visibleTokenRows = computed(() =>
  hideDustTokens.value
    ? tokenRows.value.filter((r) => r.usd === null || r.usd >= DUST_THRESHOLD_USD)
    : tokenRows.value,
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

// Lazy-load token metadata the first time the token row actually appears.
watch(tokenBalances, (balances) => {
  for (const b of balances) {
    const key = chainData.keyFor(props.account.chain, b.contract_address!)
    if (!chainData.tokenMetadataByKey[key]) void chainData.loadTokenMetadata(props.account.chain, b.contract_address!)
  }
})

async function copyAddress() {
  await navigator.clipboard.writeText(props.account.address)
  justCopied.value = true
  setTimeout(() => (justCopied.value = false), 2000)
}

async function toggleShow() {
  await accounts.setVisibility(props.account.chain, props.account.address, true)
}
</script>

<template>
  <v-card class="account-card mb-6">
    <div class="card-header d-flex align-center pa-4 pb-2">
      <span v-if="account.isDefault" class="mr-1">*</span>
      <p class="font-weight-bold flex-grow-1 text-truncate" style="cursor: pointer" @click="copyAddress">
        {{ account.label }}
      </p>
      <v-tooltip :text="justCopied ? t('accountCard.copied') : t('accountCard.copyAddress')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps" icon="mdi-content-copy" size="small" class="mr-2" role="button" @click="copyAddress" />
        </template>
      </v-tooltip>
      <v-tooltip :text="t('accountCard.viewQr')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon
            v-bind="activatorProps"
            icon="mdi-qrcode"
            size="small"
            class="mr-2"
            role="button"
            :aria-label="t('accountCard.viewQr')"
            @click="$router.push(`/accounts/${account.chain}/${account.address}/receive`)"
          />
        </template>
      </v-tooltip>
      <v-tooltip :text="t('accountCard.send')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon
            v-bind="activatorProps"
            icon="mdi-send"
            size="small"
            class="mr-2"
            role="button"
            :aria-label="t('accountCard.send')"
            @click="$router.push(`/accounts/${account.chain}/${account.address}/send`)"
          />
        </template>
      </v-tooltip>
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-tooltip :text="t('accountCard.moreActions')" location="top">
            <template #activator="{ props: tooltipProps }">
              <v-icon v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-dots-horizontal" role="button" :aria-label="t('accountCard.moreActions')" />
            </template>
          </v-tooltip>
        </template>
        <v-list density="compact">
          <v-list-item :title="t('accountCard.swap')" prepend-icon="mdi-swap-vertical-bold" @click="$router.push(`/accounts/${account.chain}/${account.address}/swap`)" />
          <v-list-item :title="t('accountCard.edit')" prepend-icon="mdi-pencil" @click="editOpen = true" />
          <v-list-item
            v-if="account.visible"
            :title="t('accountCard.hide')"
            prepend-icon="mdi-eye-off"
            @click="hideOpen = true"
          />
          <v-list-item v-else :title="t('accountCard.show')" prepend-icon="mdi-eye" @click="toggleShow" />
          <v-list-item :title="t('accountCard.viewPrivateKey')" prepend-icon="mdi-key" @click="revealPrivateKeyOpen = true" />
          <v-list-item
            v-if="account.hasMnemonic"
            :title="t('accountCard.viewMnemonic')"
            prepend-icon="mdi-format-list-numbered"
            @click="revealMnemonicOpen = true"
          />
        </v-list>
      </v-menu>
    </div>

    <div class="balance-row pa-3 d-flex align-center" @click="expandedTxns = !expandedTxns">
      <v-icon icon="mdi-wallet" class="mr-2" />
      <div class="flex-grow-1">
        <span class="balance-figure">{{ fiatTotal ?? '—' }}</span>
        <span v-if="nativeBalance !== null" class="text-medium-emphasis ml-1">
          ({{ nativeBalance.toFixed(5) }} {{ nativeSymbol }})
        </span>
      </div>
      <v-tooltip :text="expandedTxns ? t('accountCard.hideTransactions') : t('accountCard.showTransactions')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps" :icon="expandedTxns ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
        </template>
      </v-tooltip>
      <v-tooltip v-if="eligibleTransferSiblings.length > 0" :text="t('accountCard.transfer')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon
            v-bind="activatorProps"
            icon="mdi-swap-horizontal"
            class="transfer-handle ml-2"
            role="button"
            :aria-label="t('accountCard.transfer')"
            @click.stop
            @pointerdown="emit('transferPointerdown', $event)"
          />
        </template>
      </v-tooltip>
    </div>

    <div v-if="expandedTxns" class="expanded-list pa-2">
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
          :my-address="account.address"
          @click="emit('openTransaction', txn)"
        />
      </template>
      <p v-if="transactionGroups.length === 0" class="text-caption text-medium-emphasis pa-2">
        {{ t('transactions.empty') }}
      </p>
    </div>

    <div v-if="tokenFiatTotal" class="balance-row token-row pa-3 d-flex align-center" @click="expandedTokens = !expandedTokens">
      <v-icon icon="mdi-cash-multiple" class="mr-2" />
      <span class="balance-figure">{{ tokenFiatTotal }}</span>
      <v-spacer />
      <v-tooltip :text="expandedTokens ? t('accountCard.hideTokens') : t('accountCard.showTokens')" location="top">
        <template #activator="{ props: activatorProps }">
          <v-icon v-bind="activatorProps" :icon="expandedTokens ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
        </template>
      </v-tooltip>
    </div>

    <div v-if="expandedTokens" class="expanded-list pa-2">
      <v-switch
        v-model="hideDustTokens"
        :label="t('accountCard.hideDustTokens')"
        density="compact"
        hide-details
        color="primary"
        class="dust-toggle"
      />
      <v-list-item
        v-for="tokenRow in visibleTokenRows"
        :key="tokenRow.contractAddress"
        :to="`/tokens/${account.chain}/${tokenRow.contractAddress}?holder=${account.address}`"
        density="compact"
      >
        <template #prepend>
          <v-avatar v-if="tokenRow.logoUrl" :image="tokenRow.logoUrl" size="24" />
          <v-icon v-else icon="mdi-cash" size="24" />
        </template>
        <v-list-item-title>{{ tokenRow.name ?? tokenRow.symbol }} ({{ tokenRow.amount.toFixed(4) }} {{ tokenRow.symbol }})</v-list-item-title>
        <template #append>
          <span v-if="tokenRow.fiat">{{ tokenRow.fiat }}</span>
        </template>
      </v-list-item>
    </div>

    <EditAccountDialog v-model="editOpen" :account="account" />
    <HideAccountConfirmDialog v-model="hideOpen" :account="account" />
    <SecretRevealDialog
      v-model="revealPrivateKeyOpen"
      :title="t('accountCard.viewPrivateKey')"
      :secret-noun="t('accountCard.privateKeyNoun')"
      :secret="account.privateKey"
    />
    <SecretRevealDialog
      v-if="account.mnemonic"
      v-model="revealMnemonicOpen"
      :title="t('accountCard.viewMnemonic')"
      :secret-noun="t('accountCard.mnemonicNoun')"
      :secret="account.mnemonic"
    />
  </v-card>
</template>
