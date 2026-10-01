<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChainDataStore } from '@/stores/chainData'
import { useFavouritesStore } from '@/stores/favourites'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { formatPercentChange, formatUsdPrice } from '@/services/money'
import PriceSparkline from '@/components/PriceSparkline.vue'

// The lock screen's favourites. Everything here comes from the favourites
// store's own unencrypted record, never from chainData — see
// stores/favourites.ts.
const { locale } = useI18n({ useScope: 'global' })
const chainData = useChainDataStore()
const favourites = useFavouritesStore()

const rows = computed(() =>
  favourites.lockScreenAssets.map(({ chain, contractAddress }) => {
    const key = chainData.assetKey(chain, contractAddress)
    const token = contractAddress === null ? null : favourites.tokenDisplay[key]
    return {
      key,
      symbol: contractAddress === null ? NATIVE_ASSETS[chain].symbol : (token?.symbol ?? '?'),
      logoUrl: contractAddress === null ? NATIVE_ASSETS[chain].logoUrl : token?.logoUrl,
      history: favourites.prices[key],
    }
  }),
)

// Last known prices render straight away, then refresh.
onMounted(() => favourites.refreshPrices())
</script>

<template>
  <div v-if="rows.length > 0" class="favourites-list">
    <div v-for="row in rows" :key="row.key" class="favourite-row d-flex align-center py-2">
      <v-avatar v-if="row.logoUrl" :image="row.logoUrl" size="24" class="mr-3" />
      <v-icon v-else icon="mdi-cash" size="24" class="mr-3" />
      <span class="font-weight-medium">{{ row.symbol }}</span>
      <v-spacer />
      <template v-if="row.history">
        <span>{{ formatUsdPrice(row.history.usd, locale) }}</span>
        <span class="favourite-change ml-3"
          :class="row.history.change_24h_pct > 0 ? 'price-change--up' : 'price-change--down'">
          {{ formatPercentChange(row.history.change_24h_pct, locale) }}
        </span>
        <PriceSparkline :points="row.history.points" class="ml-3" />
      </template>
      <span v-else class="text-medium-emphasis">—</span>
    </div>
  </div>
</template>
