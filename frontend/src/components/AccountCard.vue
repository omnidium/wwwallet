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
import EditAccountDialog from '@/components/EditAccountDialog.vue'
import HideAccountConfirmDialog from '@/components/HideAccountConfirmDialog.vue'
import SecretRevealDialog from '@/components/SecretRevealDialog.vue'

const props = defineProps<{ account: WalletAccount; eligibleTransferSiblings: WalletAccount[] }>()
const emit = defineEmits<{
  transferPointerdown: [PointerEvent]
  openTransaction: [Transaction]
}>()

const { t, locale } = useI18n()
const accounts = useAccountsStore()
const chainData = useChainDataStore()
const settingsLocale = useSettingsLocaleStore()
const messages = useMessagesStore()

const expandedTxns = ref(false)
const expandedTokens = ref(false)
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
  const priceUsd = chainData.nativePriceUsdByChain[props.account.chain]
  if (nativeBalance.value === null || priceUsd === undefined) return null
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

const transactionGroups = computed(() =>
  groupTransactionsByDate(activity.value?.transactions ?? [], locale.value),
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
      <v-icon
        icon="mdi-qrcode"
        size="small"
        class="mr-2"
        role="button"
        :aria-label="t('accountCard.viewQr')"
        @click="$router.push(`/accounts/${account.chain}/${account.address}/receive`)"
      />
      <v-icon
        icon="mdi-send"
        size="small"
        class="mr-2"
        role="button"
        :aria-label="t('accountCard.send')"
        @click="$router.push(`/accounts/${account.chain}/${account.address}/send`)"
      />
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-icon v-bind="menuProps" icon="mdi-dots-horizontal" role="button" :aria-label="t('accountCard.moreActions')" />
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
      <v-icon :icon="expandedTxns ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
      <v-icon
        v-if="eligibleTransferSiblings.length > 0"
        icon="mdi-swap-horizontal"
        class="transfer-handle ml-2"
        role="button"
        :aria-label="t('accountCard.transfer')"
        @click.stop
        @pointerdown="emit('transferPointerdown', $event)"
      />
    </div>

    <div v-if="expandedTxns" class="expanded-list pa-2">
      <template v-for="group in transactionGroups" :key="group.dateLabel">
        <p v-if="group.dateLabel" class="text-caption text-medium-emphasis px-2 mt-2">{{ group.dateLabel }}</p>
        <v-list-item
          v-for="txn in group.transactions"
          :key="txn.hash"
          :title="`${txn.value} ${txn.asset}`"
          :subtitle="txn.hash"
          density="compact"
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
      <v-icon :icon="expandedTokens ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
    </div>

    <div v-if="expandedTokens" class="expanded-list pa-2">
      <v-list-item
        v-for="tokenRow in tokenRows"
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

<style scoped>
.account-card {
  background: linear-gradient(160deg, rgba(var(--v-theme-surface), 1), rgba(var(--v-theme-surface-variant), 1));
}

.balance-row {
  cursor: pointer;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.balance-row:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.balance-figure {
  font-size: 1.8em;
  font-weight: 600;
}

.transfer-handle {
  touch-action: none;
  cursor: grab;
}

.expanded-list {
  max-height: 45vh;
  overflow-y: auto;
}
</style>
