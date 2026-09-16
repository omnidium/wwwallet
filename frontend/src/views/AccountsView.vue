<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
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

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const accounts = useAccountsStore()
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

function eligibleTransferSiblings(account: WalletAccount): WalletAccount[] {
  return accounts.accounts.filter(
    (a) => a.chain === account.chain && a.visible && a.address !== account.address,
  )
}

function openTransaction(chain: ChainSlug, txn: Transaction) {
  detailChain.value = chain
  detailTransaction.value = txn
  detailOpen.value = true
}

async function loadAllData() {
  const chains = new Set(accounts.accounts.map((a) => a.chain))
  await Promise.all([
    chainData.loadFxRates('USD'),
    ...[...chains].map((chain) => chainData.loadNativePrice(chain)),
    ...accounts.accounts.map((a) => chainData.loadAddressActivity(a.chain, a.address)),
  ])
  await reconcile()
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

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
  clearInterval(refreshIntervalId)
  sortable?.destroy()
})
</script>

<template>
  <div class="connectivity-badge" role="status" :aria-label="connectionTooltip">
    <v-icon :icon="connected ? 'mdi-circle' : 'mdi-circle-outline'" :color="connected ? 'success' : 'grey'" size="small" />
    <v-tooltip activator="parent" location="bottom">{{ connectionTooltip }}</v-tooltip>
  </div>

  <v-container>
    <v-card v-if="showBackupReminder" class="pa-4 mb-4 backup-reminder position-relative">
      <div class="d-flex align-center">
        <v-icon icon="mdi-shield-alert-outline" class="mr-3" />
        <p class="grow">{{ t('accounts.backupReminder') }}</p>
      </div>
      <v-btn class="mt-3" variant="outlined" to="/backup-restore">{{ t('backup.backUpNow') }}</v-btn>
      <v-icon icon="mdi-close" size="small" class="dismiss-btn" role="button" :aria-label="t('common.close')"
        @click="backupDismissed = true" />
    </v-card>

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="mt-4">
      {{ t('accounts.empty') }}
    </v-alert>

    <div ref="visibleListEl">
      <div v-for="account in visibleAccounts" :key="account.address" :data-address="account.address">
        <div class="drag-handle-row">
          <v-icon icon="mdi-drag-horizontal-variant" class="drag-handle" size="small" />
        </div>
        <AccountCard :account="account" :eligible-transfer-siblings="eligibleTransferSiblings(account)"
          @transfer-pointerdown="(e) => dragToTransfer.onPointerDown(e, account, accounts.accounts)"
          @open-transaction="(txn) => openTransaction(account.chain, txn)" />
      </div>
    </div>

    <div class="add-account-row">
      <v-btn icon="mdi-plus" size="large" rounded="circle" color="primary" variant="tonal" to="/accounts/new"
        :aria-label="t('accounts.addAccount')" />
    </div>

    <template v-if="hiddenAccounts.length > 0">
      <p class="hidden-toggle text-medium-emphasis" @click="showHidden = !showHidden">
        {{ showHidden ? t('accounts.hideHidden') : t('accounts.viewHidden') }}
      </p>
      <div v-if="showHidden">
        <AccountCard v-for="account in hiddenAccounts" :key="account.address" :account="account"
          :eligible-transfer-siblings="eligibleTransferSiblings(account)"
          @open-transaction="(txn) => openTransaction(account.chain, txn)" />
      </div>
    </template>

    <TransactionDetailDialog v-model="detailOpen" :chain="detailChain" :transaction="detailTransaction" />
    <TransferTargetPicker :open="dragToTransfer.pickerOpen.value" :targets="dragToTransfer.targets.value"
      :hovered-address="dragToTransfer.hoveredAddress.value" />
  </v-container>
</template>
