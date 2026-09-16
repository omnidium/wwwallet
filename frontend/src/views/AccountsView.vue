<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { useChainDataStore } from '@/stores/chainData'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import type { ChainSlug, Transaction } from '@/services/api'
import { useDefaultAccountFallback } from '@/composables/useDefaultAccountFallback'
import { useDragToTransfer } from '@/composables/useDragToTransfer'
import { useBackupReminderDismissed } from '@/composables/useBackupReminder'
import AccountCard from '@/components/AccountCard.vue'
import TransferTargetPicker from '@/components/TransferTargetPicker.vue'
import TransactionDetailDialog from '@/components/TransactionDetailDialog.vue'

const BACKUP_REMINDER_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000

const { t } = useI18n()
const router = useRouter()
const accounts = useAccountsStore()
const chainData = useChainDataStore()
const vault = useVaultStore()
const messages = useMessagesStore()
const { reconcile } = useDefaultAccountFallback()
const dragToTransfer = useDragToTransfer(router)
const backupDismissed = useBackupReminderDismissed()

const online = ref(navigator.onLine)
const refreshing = ref(false)
const showHidden = ref(false)
const visibleListEl = ref<HTMLElement | null>(null)
const detailTransaction = ref<Transaction | null>(null)
const detailChain = ref<ChainSlug>('ethereum')
const detailOpen = ref(false)
let sortable: Sortable | null = null

const visibleAccounts = computed(() => accounts.accounts.filter((a) => a.visible))
const hiddenAccounts = computed(() => accounts.accounts.filter((a) => !a.visible))

const showBackupReminder = computed(
  () =>
    !backupDismissed.value &&
    (vault.lastBackupAt === null || Date.now() - vault.lastBackupAt > BACKUP_REMINDER_THRESHOLD_MS),
)

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
  refreshing.value = true
  try {
    await loadAllData()
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    refreshing.value = false
  }
}

function updateOnlineStatus() {
  online.value = navigator.onLine
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
  await loadAllData()
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
  sortable?.destroy()
})
</script>

<template>
  <v-container>
    <div class="floating-header d-flex align-center mb-2">
      <h1 class="text-h5 flex-grow-1">{{ t('accounts.title') }}</h1>
      <v-icon
        :icon="online ? 'mdi-circle' : 'mdi-circle-outline'"
        :color="online ? 'success' : 'grey'"
        size="x-small"
        class="mr-3"
        :aria-label="online ? t('accounts.online') : t('accounts.offline')"
      />
      <v-btn icon="mdi-refresh" variant="text" :loading="refreshing" :aria-label="t('accounts.refresh')" @click="refresh" />
      <v-btn color="primary" to="/accounts/new">{{ t('accounts.addAccount') }}</v-btn>
    </div>

    <v-card v-if="showBackupReminder" class="pa-4 mb-4 backup-reminder position-relative">
      <div class="d-flex align-center">
        <v-icon icon="mdi-shield-alert-outline" class="mr-3" />
        <p class="flex-grow-1">{{ t('accounts.backupReminder') }}</p>
      </div>
      <v-btn class="mt-3" variant="outlined" to="/backup-restore">{{ t('backup.backUpNow') }}</v-btn>
      <v-icon
        icon="mdi-close"
        size="small"
        class="dismiss-btn"
        role="button"
        :aria-label="t('common.close')"
        @click="backupDismissed = true"
      />
    </v-card>

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="mt-4">
      {{ t('accounts.empty') }}
    </v-alert>

    <div ref="visibleListEl">
      <div v-for="account in visibleAccounts" :key="account.address" :data-address="account.address">
        <div class="drag-handle-row">
          <v-icon icon="mdi-drag-horizontal-variant" class="drag-handle" size="small" />
        </div>
        <AccountCard
          :account="account"
          :eligible-transfer-siblings="eligibleTransferSiblings(account)"
          @transfer-pointerdown="(e) => dragToTransfer.onPointerDown(e, account, accounts.accounts)"
          @open-transaction="(txn) => openTransaction(account.chain, txn)"
        />
      </div>
    </div>

    <template v-if="hiddenAccounts.length > 0">
      <p class="hidden-toggle text-medium-emphasis" @click="showHidden = !showHidden">
        {{ showHidden ? t('accounts.hideHidden') : t('accounts.viewHidden') }}
      </p>
      <div v-if="showHidden">
        <AccountCard
          v-for="account in hiddenAccounts"
          :key="account.address"
          :account="account"
          :eligible-transfer-siblings="eligibleTransferSiblings(account)"
          @open-transaction="(txn) => openTransaction(account.chain, txn)"
        />
      </div>
    </template>

    <TransactionDetailDialog v-model="detailOpen" :chain="detailChain" :transaction="detailTransaction" />
    <TransferTargetPicker
      :open="dragToTransfer.pickerOpen.value"
      :targets="dragToTransfer.targets.value"
      :hovered-address="dragToTransfer.hoveredAddress.value"
    />
  </v-container>
</template>

<style scoped>
.backup-reminder {
  background-color: rgba(var(--v-theme-warning), 0.12);
}

.dismiss-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.drag-handle-row {
  display: flex;
  justify-content: center;
  opacity: 0.4;
}

.drag-handle {
  cursor: move;
}

.hidden-toggle {
  cursor: pointer;
  text-align: center;
  padding-bottom: 1em;
}

.hidden-toggle:hover {
  opacity: 0.7;
}
</style>
