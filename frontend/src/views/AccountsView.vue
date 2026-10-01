<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useChainDataStore } from '@/stores/chainData'
import { useVaultStore } from '@/stores/vault'
import type { ChainSlug, Transaction } from '@/services/api'
import { useDefaultAccountFallback } from '@/composables/useDefaultAccountFallback'
import { useDragToTransfer } from '@/composables/useDragToTransfer'
import { useBackupReminderDismissed } from '@/composables/useBackupReminder'
import { BACKUP_REMINDER_FIRST_MS, BACKUP_REMINDER_RECURRING_MS, ACCOUNT_AUTO_REFRESH_MS } from '@/config/appSettings'
import AccountCard from '@/components/AccountCard.vue'
import TransferTargetPicker from '@/components/TransferTargetPicker.vue'
import TransactionDetailDialog from '@/components/TransactionDetailDialog.vue'
import AppTooltip from '@/components/AppTooltip.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const accounts = useAccountsStore()
const payees = usePayeesStore()
const chainData = useChainDataStore()
const vault = useVaultStore()
const { reconcile } = useDefaultAccountFallback()
const dragToTransfer = useDragToTransfer(router)
const backupDismissed = useBackupReminderDismissed()

const browserOnline = ref(navigator.onLine)
const backendReachable = ref(true)
const showHidden = ref(false)
const visibleListEl = ref<HTMLElement | null>(null)
const detailTransaction = ref<Transaction | null>(null)
const detailChain = ref<ChainSlug>('ethereum')
const detailOpen = ref(false)
let sortable: Sortable | null = null
let refreshInFlight = false
let refreshIntervalId: ReturnType<typeof setInterval> | undefined

const connected = computed(() => browserOnline.value && backendReachable.value)
const connectionTooltip = computed(() => {
  if (!browserOnline.value) return t('accounts.offlineNoNetwork')
  if (!backendReachable.value) return t('accounts.offlineServerUnreachable')
  return t('accounts.online')
})

const visibleAccounts = computed(() => accounts.accounts.filter((a) => a.visible))
const hiddenAccounts = computed(() => accounts.accounts.filter((a) => !a.visible))

const showBackupReminder = computed(() => {
  if (backupDismissed.value || vault.createdAt === null) return false
  return vault.lastBackupAt === null
    ? Date.now() - vault.createdAt > BACKUP_REMINDER_FIRST_MS
    : Date.now() - vault.lastBackupAt > BACKUP_REMINDER_RECURRING_MS
})

function openTransaction(chain: ChainSlug, txn: Transaction) {
  detailChain.value = chain
  detailTransaction.value = txn
  detailOpen.value = true
}

// Settles every load before reporting any failure, so one account's (or one
// feed's) error neither cuts the others short nor skips the default-account
// reconcile — anything that failed keeps showing its last-known cached data.
async function loadAllData() {
  const chains = new Set(accounts.accounts.map((a) => a.chain))
  const results = await Promise.allSettled([
    chainData.loadFxRates('USD'),
    ...[...chains].map((chain) => chainData.loadNativePrice(chain)),
    ...accounts.accounts.map((a) => chainData.loadAddressActivity(a.chain, a.address)),
  ])
  await reconcile()
  const failure = results.find((r) => r.status === 'rejected')
  if (failure) throw failure.reason
}

async function refresh() {
  if (refreshInFlight) return
  refreshInFlight = true
  try {
    await loadAllData()
    backendReachable.value = true
  } catch {
    // Silent: the connectivity badge already surfaces this, and toasting on
    // every failed 10s auto-refresh during an outage would spam the user.
    backendReachable.value = false
  } finally {
    refreshInFlight = false
  }
}

function updateOnlineStatus() {
  browserOnline.value = navigator.onLine
  if (browserOnline.value) void refresh()
}

function initSortable() {
  sortable?.destroy()
  sortable = null
  if (!visibleListEl.value) return
  sortable = new Sortable(visibleListEl.value, {
    handle: '.drag-handle',
    animation: 150,
    onEnd: () => {
      if (!visibleListEl.value) return
      const orderedAddresses = [...visibleListEl.value.children]
        .map((el) => (el as HTMLElement).dataset.address)
        .filter((a): a is string => !!a)
      const newOrder = orderedAddresses
        .map((address) => visibleAccounts.value.find((a) => a.address === address))
        .filter((a): a is WalletAccount => !!a)
      void accounts.reorderVisible(newOrder)
    },
  })
}

onMounted(async () => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  await nextTick()
  initSortable()
  await refresh()
  refreshIntervalId = setInterval(refresh, ACCOUNT_AUTO_REFRESH_MS)
})

watch(
  () => visibleAccounts.value.length,
  async () => {
    await nextTick()
    initSortable()
  },
)

// AccountsView stays mounted for the app's whole lifetime (see App.vue) — its
// own onMounted-driven load only ever runs once, and the periodic refresh
// below is 10 minutes out. Without this, an account added or imported via
// AddAccountView (which just pushes into the store and navigates back here)
// would show no balance/activity at all until that refresh fires or the page
// is manually reloaded.
watch(
  () => accounts.accounts.map((a) => `${a.chain}:${a.address}`),
  async (_addresses, previousAddresses) => {
    const previous = new Set(previousAddresses ?? [])
    const added = accounts.accounts.filter((a) => !previous.has(`${a.chain}:${a.address}`))
    if (added.length === 0) return
    try {
      await Promise.all([
        ...[...new Set(added.map((a) => a.chain))]
          .filter((chain) => chainData.nativePriceUsdByChain[chain] === undefined)
          .map((chain) => chainData.loadNativePrice(chain)),
        ...added.map((a) => chainData.loadAddressActivity(a.chain, a.address)),
      ])
    } catch {
      // Silent, same reasoning as refresh() below — the connectivity badge
      // already surfaces this, and the next periodic refresh will retry.
    }
  },
)

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
  clearInterval(refreshIntervalId)
  sortable?.destroy()
})
</script>

<template>
  <AppTooltip :text="connectionTooltip" location="bottom">
    <template #default="{ activatorProps }">
      <div v-bind="activatorProps" class="connectivity-badge" role="status" :aria-label="connectionTooltip">
        <v-icon :icon="connected ? 'mdi-circle' : 'mdi-circle-outline'" :color="connected ? 'success' : 'grey'"
          size="xs" />
      </div>
    </template>
  </AppTooltip>

  <v-container class="pt-16">
    <v-card v-if="showBackupReminder" class="pa-4 mb-4 backup-reminder position-relative">
      <div class="d-flex align-center">
        <v-icon icon="mdi-shield-alert-outline" class="mr-3" />
        <p class="grow">{{ t('accounts.backupReminder') }}</p>
      </div>
      <v-btn class="mt-3" variant="outlined" to="/backup-restore">{{ t('backup.backUpNow') }}</v-btn>
      <AppTooltip :text="t('common.close')">
        <template #default="{ activatorProps }">
          <v-icon v-bind="activatorProps" icon="mdi-close" size="small" class="dismiss-btn" role="button"
            :aria-label="t('common.close')" @click="backupDismissed = true" />
        </template>
      </AppTooltip>
    </v-card>

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="mt-4">
      {{ t('accounts.empty') }}
    </v-alert>

    <div ref="visibleListEl">
      <div v-for="account in visibleAccounts" :key="account.address" :data-address="account.address">
        <AccountCard :account="account" reorderable
          @transfer-pointerdown="(e) => dragToTransfer.onPointerDown(e, account, accounts.accounts, payees.payees)"
          @open-transaction="(txn) => openTransaction(account.chain, txn)" />
      </div>
    </div>

    <div class="add-account-row">
      <AppTooltip :text="t('accounts.addAccount')">
        <template #default="{ activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-plus" size="large" rounded="circle" color="primary" variant="tonal"
            to="/accounts/new" :aria-label="t('accounts.addAccount')" />
        </template>
      </AppTooltip>
    </div>

    <template v-if="hiddenAccounts.length > 0">
      <p class="hidden-toggle text-medium-emphasis" @click="showHidden = !showHidden">
        {{ showHidden ? t('accounts.hideHidden') : t('accounts.viewHidden') }}
      </p>
      <div v-if="showHidden">
        <AccountCard v-for="account in hiddenAccounts" :key="account.address" :account="account"
          @open-transaction="(txn) => openTransaction(account.chain, txn)" />
      </div>
    </template>

    <TransactionDetailDialog v-model="detailOpen" :chain="detailChain" :transaction="detailTransaction" />
    <TransferTargetPicker :open="dragToTransfer.pickerOpen.value" :targets="dragToTransfer.targets.value"
      :hovered-address="dragToTransfer.hoveredAddress.value" />
  </v-container>
</template>
