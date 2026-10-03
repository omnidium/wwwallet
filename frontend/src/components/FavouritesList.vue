<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Sortable from 'sortablejs'
import AppTooltip from '@/components/AppTooltip.vue'
import { useFavouritesStore, type FavouriteItem } from '@/stores/favourites'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { formatPercentChange, formatUsdPrice } from '@/services/money'
import PriceSparkline from '@/components/PriceSparkline.vue'

// The favourites — on the lock screen, and in the accounts screen's
// Favourites card, which also passes `editable` to reorder and remove them.
// Everything here comes from the favourites store's own unencrypted record,
// never from chainData — see stores/favourites.ts. The lock screen passes
// `autoRefresh`: fresh prices whenever the page comes back into view
// (switching back to the tab or app), and on a tap anywhere on the list.
const props = defineProps<{ editable?: boolean; autoRefresh?: boolean }>()

const { t, locale } = useI18n({ useScope: 'global' })
const favourites = useFavouritesStore()

function describe(item: FavouriteItem): { label: string; title?: string; logoUrl: string | null; icon?: string } {
  if (item.kind === 'coin') return { label: item.symbol, title: item.name, logoUrl: item.logoUrl }
  if (item.kind === 'fx') return { label: `${item.base}/${item.quote}`, logoUrl: null, icon: 'mdi-swap-horizontal' }
  if (item.contractAddress === null) {
    const native = NATIVE_ASSETS[item.chain]
    return { label: native.symbol, logoUrl: native.logoUrl }
  }
  const token = favourites.tokenDisplay[item.key]
  return { label: token?.symbol ?? '?', logoUrl: token?.logoUrl ?? null }
}

const rows = computed(() =>
  favourites.items.map((item) => ({ item, ...describe(item), history: favourites.prices[item.key] })),
)

// A currency pair's "price" is its rate — no currency sign, more decimals.
function formatValue(item: FavouriteItem, value: number): string {
  if (item.kind !== 'fx') return formatUsdPrice(value, locale.value)
  return new Intl.NumberFormat(locale.value, { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(value)
}

const listEl = ref<HTMLElement | null>(null)
let sortable: Sortable | null = null

function initSortable() {
  sortable?.destroy()
  sortable = null
  if (!props.editable || !listEl.value) return
  sortable = new Sortable(listEl.value, {
    handle: '.favourite-drag-handle',
    animation: 150,
    onEnd: () => {
      if (!listEl.value) return
      const keys = [...listEl.value.children]
        .map((el) => (el as HTMLElement).dataset.key)
        .filter((k): k is string => !!k)
      favourites.reorder(keys)
    },
  })
}

watch(() => props.editable, async () => {
  await nextTick()
  initSortable()
})

// Returning to the tab doesn't remount anything, and a lock screen mounted
// while hidden (an idle lock in the background) may have had its fetch
// frozen by a mobile browser — so it refreshes on becoming visible instead.
function onVisibilityChange() {
  if (document.visibilityState === 'visible') void favourites.refreshPrices()
}
function onPageShow(event: PageTransitionEvent) {
  if (event.persisted) void favourites.refreshPrices()
}

// Last known prices render straight away, then refresh.
onMounted(() => {
  initSortable()
  if (!props.autoRefresh || document.visibilityState === 'visible') void favourites.refreshPrices()
  if (props.autoRefresh) {
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', onPageShow)
  }
})
onBeforeUnmount(() => {
  sortable?.destroy()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  window.removeEventListener('pageshow', onPageShow)
})

function onTap() {
  if (props.autoRefresh) void favourites.refreshPrices()
}
</script>

<template>
  <div v-if="rows.length > 0" class="favourites-list" :class="{ 'favourites-list--tappable': autoRefresh }"
    :role="autoRefresh ? 'button' : undefined" :tabindex="autoRefresh ? 0 : undefined"
    :aria-label="autoRefresh ? t('favourites.refresh') : undefined" :aria-busy="favourites.refreshing"
    @click="onTap" @keydown.enter="onTap" @keydown.space.prevent="onTap">
    <v-progress-linear v-if="autoRefresh" :active="favourites.refreshing" indeterminate height="2"
      class="favourites-refresh-bar" />
    <div ref="listEl">
      <div v-for="row in rows" :key="row.item.key" :data-key="row.item.key" class="favourite-row d-flex align-center py-2">
        <v-icon v-if="editable" icon="mdi-drag" size="20" class="favourite-drag-handle mr-2"
          :aria-label="t('favourites.dragToReorder')" />
        <v-avatar v-if="row.logoUrl" :image="row.logoUrl" size="24" class="mr-3" />
        <v-icon v-else :icon="row.icon ?? 'mdi-cash'" size="24" class="mr-3" />
        <!-- A coin's full name ("Bitcoin" for BTC), on hover or a tap of its symbol. -->
        <AppTooltip v-if="row.title" :text="row.title" info>
          <template #default="{ activatorProps }">
            <span v-bind="activatorProps" class="font-weight-medium text-truncate" tabindex="0">{{ row.label }}</span>
          </template>
        </AppTooltip>
        <span v-else class="font-weight-medium text-truncate">{{ row.label }}</span>
        <v-spacer />
        <template v-if="row.history">
          <span class="text-no-wrap">{{ formatValue(row.item, row.history.usd) }}</span>
          <span class="favourite-change ml-3"
            :class="row.history.change_24h_pct > 0 ? 'price-change--up' : 'price-change--down'">
            {{ formatPercentChange(row.history.change_24h_pct, locale) }}
          </span>
          <PriceSparkline v-if="!editable" :points="row.history.points" class="ml-3" />
        </template>
        <span v-else class="text-medium-emphasis">—</span>
        <v-btn v-if="editable" icon="mdi-close" variant="text" size="small" density="comfortable" class="ml-2"
          :aria-label="t('favourites.remove', { name: row.label })" @click="favourites.remove(row.item)" />
      </div>
    </div>
  </div>
</template>
