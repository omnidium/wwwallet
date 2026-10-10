<script setup lang="ts">
import { computed, mergeProps, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Sortable from 'sortablejs'
import { useAccountsStore, type WalletAccount } from '@/stores/accounts'
import { usePayeesStore } from '@/stores/payees'
import { useChainDataStore } from '@/stores/chainData'
import { isChainUnavailableError } from '@/services/api'
import { useVaultStore } from '@/stores/vault'
import { useDefaultAccountFallback } from '@/composables/useDefaultAccountFallback'
import { useDragToTransfer } from '@/composables/useDragToTransfer'
import { nativeBalanceUsd, useChainDiscovery } from '@/composables/useChainDiscovery'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { useBackupReminderDismissed } from '@/composables/useBackupReminder'
import { BACKUP_REMINDER_FIRST_MS, BACKUP_REMINDER_RECURRING_MS, ACCOUNT_AUTO_REFRESH_MS } from '@/config/appSettings'
import AccountCard from '@/components/AccountCard.vue'
import PasskeyNudge from '@/components/PasskeyNudge.vue'
import AccountCarousel from '@/components/AccountCarousel.vue'
import FavouritesCard from '@/components/FavouritesCard.vue'
import TransferTargetPicker from '@/components/TransferTargetPicker.vue'
import AppTooltip from '@/components/AppTooltip.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const accounts = useAccountsStore()
const payees = usePayeesStore()
const chainData = useChainDataStore()
const vault = useVaultStore()
const { reconcile } = useDefaultAccountFallback()
const dragToTransfer = useDragToTransfer(router)
const { discover } = useChainDiscovery()
const backupDismissed = useBackupReminderDismissed()

const browserOnline = ref(navigator.onLine)
const backendReachable = ref(true)
const showHidden = ref(false)
const visibleListEl = ref<HTMLElement | null>(null)
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

// One card — or, once the same address turns up on other chains (see
// useChainDiscovery), one carousel — per address, its chains ordered by
// account balance in USD, highest first. Until balances load: the original
// account first, then the usual chain order.
const CHAIN_ORDER = Object.keys(NATIVE_ASSETS)
const visibleGroups = computed<WalletAccount[][]>(() => {
  const groups = new Map<string, WalletAccount[]>()
  for (const account of visibleAccounts.value) {
    const address = account.address.toLowerCase()
    groups.set(address, [...(groups.get(address) ?? []), account])
  }
  const usd = (a: WalletAccount) => nativeBalanceUsd(chainData, a.chain, a.address) ?? -1
  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        usd(b) - usd(a) ||
        Number(!!a.discovered) - Number(!!b.discovered) ||
        CHAIN_ORDER.indexOf(a.chain) - CHAIN_ORDER.indexOf(b.chain),
    ),
  )
})

// The Favourites card's slot in the visible list — the key below never
// collides with an account's, since those are 0x addresses.
const FAVOURITES_ENTRY = 'favourites'
type ListEntry = { key: string; group: WalletAccount[] | null }
const visibleEntries = computed<ListEntry[]>(() => {
  const entries: ListEntry[] = visibleGroups.value.map((group) => ({ key: group[0]!.address, group }))
  if (accounts.favouritesCard.visible) {
    const position = accounts.favouritesCard.position ?? entries.length
    entries.splice(Math.min(position, entries.length), 0, { key: FAVOURITES_ENTRY, group: null })
  }
  return entries
})
const hasHiddenCards = computed(() => hiddenAccounts.value.length > 0 || !accounts.favouritesCard.visible)

const showBackupReminder = computed(() => {
  if (backupDismissed.value || vault.createdAt === null) return false
  return vault.lastBackupAt === null
    ? Date.now() - vault.createdAt > BACKUP_REMINDER_FIRST_MS
    : Date.now() - vault.lastBackupAt > BACKUP_REMINDER_RECURRING_MS
})

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
  // After the known accounts' own data, so their cards fill in first.
  await discover()
  // A chain the backend can't serve says so on its own cards; the server
  // answered, so it doesn't count against being reachable.
  const failure = results.find(
    (r): r is PromiseRejectedResult => r.status === 'rejected' && !isChainUnavailableError(r.reason),
  )
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
      const favouritesIndex = orderedAddresses.indexOf(FAVOURITES_ENTRY)
      void accounts.reorderVisible(
        orderedAddresses.filter((address) => address !== FAVOURITES_ENTRY),
        favouritesIndex === -1 ? undefined : favouritesIndex,
      )
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
  () => visibleEntries.value.length,
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
    // Settled, like loadAllData: one account's failure (a chain the backend
    // can't serve, say) mustn't keep the others from discovery.
    await Promise.allSettled([
      ...[...new Set(added.map((a) => a.chain))]
        .filter((chain) => chainData.nativePriceUsdByChain[chain] === undefined)
        .map((chain) => chainData.loadNativePrice(chain)),
      ...added.map((a) => chainData.loadAddressActivity(a.chain, a.address)),
    ])
    // A newly added (not discovered) account may already be in use elsewhere.
    // Failures stay silent, same reasoning as refresh() below — the
    // connectivity badge already surfaces them, and the next periodic
    // refresh retries.
    if (added.some((a) => !a.discovered)) await discover().catch(() => { })
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
    <v-alert v-if="showBackupReminder" type="warning" variant="tonal" icon="mdi-shield-alert-outline"
      class="mb-4 backup-reminder">
      {{ t('accounts.backupReminder') }}
      <div>
        <v-btn class="mt-3" variant="outlined" to="/backup-restore">{{ t('backup.backUpNow') }}</v-btn>
      </div>
      <template #close="{ props: closeProps }">
        <AppTooltip :text="t('common.close')">
          <template #default="{ activatorProps }">
            <v-btn v-bind="mergeProps(closeProps, activatorProps)" icon="mdi-close" variant="text" size="small"
              density="comfortable" :aria-label="t('common.close')" @click="backupDismissed = true" />
          </template>
        </AppTooltip>
      </template>
    </v-alert>

    <PasskeyNudge />

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="backup-reminder mt-4 mb-4">
      {{ t('accounts.empty') }}
    </v-alert>

    <div ref="visibleListEl">
      <div v-for="entry in visibleEntries" :key="entry.key" :data-address="entry.key">
        <FavouritesCard v-if="!entry.group" reorderable />
        <AccountCard v-else-if="entry.group.length === 1" :account="entry.group[0]!" reorderable
          @transfer-pointerdown="(e) => dragToTransfer.onPointerDown(e, entry.group![0]!, accounts.accounts, payees.payees)" />
        <AccountCarousel v-else :accounts="entry.group" reorderable
          @transfer-pointerdown="(e, account) => dragToTransfer.onPointerDown(e, account, accounts.accounts, payees.payees)" />
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

    <template v-if="hasHiddenCards">
      <p class="hidden-toggle text-medium-emphasis" @click="showHidden = !showHidden">
        {{ showHidden ? t('accounts.hideHidden') : t('accounts.viewHidden') }}
      </p>
      <div v-if="showHidden">
        <AccountCard v-for="account in hiddenAccounts" :key="account.address" :account="account" />
        <FavouritesCard v-if="!accounts.favouritesCard.visible" />
      </div>
    </template>

    <TransferTargetPicker :open="dragToTransfer.pickerOpen.value" :targets="dragToTransfer.targets.value"
      :hovered-address="dragToTransfer.hoveredAddress.value" />
  </v-container>
</template>
