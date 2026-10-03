<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { api, type CoinSearchResult } from '@/services/api'
import { coinKey, fxKey, useFavouritesStore } from '@/stores/favourites'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { fxPairsForQuery } from '@/config/fxCurrencies'
import { TOKEN_SEARCH_DEBOUNCE_MS } from '@/config/appSettings'

// The Favourites card's "add" field: any coin the price source lists, by
// name or ticker, plus a currency pair whenever the query names one.
const { t } = useI18n({ useScope: 'global' })
const favourites = useFavouritesStore()
const settingsLocale = useSettingsLocaleStore()

const MIN_QUERY_LENGTH = 2

const query = ref('')
const coins = ref<CoinSearchResult[]>([])
const searching = ref(false)
const failed = ref(false)
let debounceHandle: ReturnType<typeof setTimeout> | undefined
// Only the latest search's results are shown, however the responses race.
let searchSeq = 0

watch(query, (q) => {
  clearTimeout(debounceHandle)
  failed.value = false
  if (q.trim().length < MIN_QUERY_LENGTH) {
    coins.value = []
    searching.value = false
    return
  }
  searching.value = true
  debounceHandle = setTimeout(() => void search(q.trim()), TOKEN_SEARCH_DEBOUNCE_MS)
})

async function search(q: string) {
  const seq = ++searchSeq
  try {
    const results = await api.searchCoins(q)
    if (seq === searchSeq) coins.value = results
  } catch {
    if (seq === searchSeq) {
      coins.value = []
      failed.value = true
    }
  } finally {
    if (seq === searchSeq) searching.value = false
  }
}

onBeforeUnmount(() => clearTimeout(debounceHandle))

const fxPairs = computed(() => fxPairsForQuery(query.value, settingsLocale.currency))

function addCoin(coin: CoinSearchResult) {
  void favourites.addCoin(coin)
}

function addFx(base: string, quote: string) {
  void favourites.addFx(base, quote)
}
</script>

<template>
  <div class="favourite-search">
    <v-text-field v-model="query" :label="t('favourites.addLabel')" :placeholder="t('favourites.addPlaceholder')"
      prepend-inner-icon="mdi-magnify" density="compact" variant="outlined" hide-details clearable
      :loading="searching" autocomplete="off" />
    <div class="favourite-search-results">
      <!-- The whole row adds it; a tick marks one that's already a favourite. -->
      <button v-for="pair in fxPairs" :key="fxKey(pair.base, pair.quote)" type="button"
        class="favourite-search-row d-flex align-center" :disabled="favourites.has(fxKey(pair.base, pair.quote))"
        :aria-label="t('favourites.add', { name: `${pair.base}/${pair.quote}` })" @click="addFx(pair.base, pair.quote)">
        <v-icon icon="mdi-swap-horizontal" size="24" class="mr-3" />
        <span class="font-weight-medium">{{ pair.base }}/{{ pair.quote }}</span>
        <span class="text-caption text-medium-emphasis ml-2 text-truncate">{{ t('favourites.fxPair') }}</span>
        <v-spacer />
        <v-icon v-if="favourites.has(fxKey(pair.base, pair.quote))" icon="mdi-check" size="20"
          class="favourite-search-added ml-2" />
      </button>
      <button v-for="coin in coins" :key="coin.id" type="button" class="favourite-search-row d-flex align-center"
        :disabled="favourites.has(coinKey(coin.id))" :aria-label="t('favourites.add', { name: coin.name })"
        @click="addCoin(coin)">
        <v-avatar v-if="coin.logo_url" :image="coin.logo_url" size="24" class="mr-3" />
        <v-icon v-else icon="mdi-cash" size="24" class="mr-3" />
        <span class="font-weight-medium">{{ coin.symbol }}</span>
        <span class="text-caption text-medium-emphasis ml-2 text-truncate">{{ coin.name }}</span>
        <v-spacer />
        <v-icon v-if="favourites.has(coinKey(coin.id))" icon="mdi-check" size="20" class="favourite-search-added ml-2" />
      </button>
      <p v-if="failed" class="text-caption text-medium-emphasis pa-2">{{ t('favourites.searchFailed') }}</p>
      <p v-else-if="!searching && query.trim().length >= MIN_QUERY_LENGTH && coins.length === 0 && fxPairs.length === 0"
        class="text-caption text-medium-emphasis pa-2">
        {{ t('favourites.noResults') }}
      </p>
    </div>
  </div>
</template>
