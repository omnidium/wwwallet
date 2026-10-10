<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { ChainSlug, Nft } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'
import { useChainDataStore } from '@/stores/chainData'
import { looksLikeSpam, useNftsStore } from '@/stores/nfts'
import { showsFloorPrice } from '@/config/nfts'
import { useNftFloorText } from '@/composables/useNftFloorText'
import { displayErrorMessage } from '@/services/errors'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import AppTooltip from '@/components/AppTooltip.vue'
import NftTile from '@/components/NftTile.vue'
import NftDetailDialog from '@/components/NftDetailDialog.vue'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const messages = useMessagesStore()
const chainData = useChainDataStore()
const nfts = useNftsStore()
const floorText = useNftFloorText()

// Read reactively: going from one collection to another keeps this view
// mounted and only changes the params.
const chain = computed(() => route.params.chain as ChainSlug)
const address = computed(() => route.params.address as string)
const contract = computed(() => (route.params.contract as string).toLowerCase())

// What the gallery knows about it — absent on a deep link until the
// collections are fetched, which only the gallery does.
const collection = computed(() =>
  nfts.collectionsOf(chain.value, address.value)?.items.find((c) => c.contract_address === contract.value),
)
const collectionHidden = computed(() => (collection.value ? nfts.isCollectionHidden(chain.value, collection.value) : false))
const title = computed(() => collection.value?.name ?? t('nfts.unnamedCollection'))
const floor = computed(() => (collection.value ? floorText(chain.value, collection.value.floor_price) : null))

const showHidden = ref(false)
const page = computed(() => nfts.nftsOf(chain.value, address.value, contract.value))
const hiddenCount = computed(() => page.value?.items.filter((n) => nfts.isNftHidden(chain.value, n)).length ?? 0)
const shownNfts = computed(
  () => page.value?.items.filter((n) => showHidden.value || !nfts.isNftHidden(chain.value, n)) ?? [],
)
const loading = computed(() => nfts.isLoadingNfts(chain.value, address.value, contract.value))
const loadingMore = computed(() => nfts.isLoadingNfts(chain.value, address.value, contract.value, { more: true }))

watch(
  [chain, address, contract],
  async () => {
    showHidden.value = false
    void nfts.readCachedCollections(chain.value, address.value)
    void nfts.readCachedSends(chain.value, address.value)
    // For the floor price's fiat value.
    if (showsFloorPrice(chain.value)) chainData.loadNativePrice(chain.value).catch(() => { })
    try {
      await nfts.loadNfts(chain.value, address.value, contract.value)
    } catch (err) {
      if (!page.value) messages.push(displayErrorMessage(err), 'error')
    }
  },
  { immediate: true },
)

const gridEl = ref<HTMLElement | null>(null)
useInfiniteScroll(() => {
  if (!page.value?.nextPageKey || loading.value || loadingMore.value) return
  nfts
    .loadNfts(chain.value, address.value, contract.value, { more: true })
    .catch((err) => messages.push(displayErrorMessage(err), 'error'))
}, gridEl)

function back() {
  router.push(`/accounts/${chain.value}/${address.value}/nfts`)
}

function toggleCollectionHidden() {
  if (!collection.value) return
  nfts
    .setCollectionHidden(chain.value, collection.value, !collectionHidden.value)
    .catch((err) => messages.push(displayErrorMessage(err), 'error'))
}

function tileTitle(nft: Nft): string {
  return nft.name ?? `#${nft.token_id.length > 12 ? `${nft.token_id.slice(0, 10)}…` : nft.token_id}`
}

function tileBadge(nft: Nft): string | undefined {
  if (nfts.isSending(chain.value, address.value, nft)) return t('nfts.sending')
  return nft.balance !== '1' ? `×${nft.balance}` : undefined
}

const detailNft = ref<Nft | null>(null)
const detailOpen = ref(false)
function open(nft: Nft) {
  detailNft.value = nft
  detailOpen.value = true
}
</script>

<template>
  <div class="nft-view">
    <header class="nft-header pane-header d-flex align-center">
      <AppTooltip :text="t('nfts.backToCollections')">
        <template #default="{ activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-arrow-left" variant="text" size="small" class="mr-1"
            :aria-label="t('nfts.backToCollections')" @click="back" />
        </template>
      </AppTooltip>
      <div class="nft-header-titles">
        <h3 class="text-truncate">
          <v-icon v-if="collection?.verified" icon="mdi-check-decagram" size="small" color="primary" class="mr-1"
            :aria-label="t('nfts.verified')" />{{ title }}
        </h3>
      </div>
      <v-spacer />
      <AppTooltip v-if="collection" :text="collectionHidden ? t('nfts.showCollection') : t('nfts.hideCollection')">
        <template #default="{ activatorProps }">
          <v-btn v-bind="activatorProps" :icon="collectionHidden ? 'mdi-eye' : 'mdi-eye-off'" variant="text"
            size="small" :aria-label="collectionHidden ? t('nfts.showCollection') : t('nfts.hideCollection')"
            @click="toggleCollectionHidden" />
        </template>
      </AppTooltip>
    </header>

    <p v-if="floor" class="text-caption text-medium-emphasis px-2 mb-2">
      {{ t('nfts.floorOn', { marketplace: 'OpenSea', price: floor }) }}
    </p>

    <v-alert v-if="collection && collectionHidden && looksLikeSpam(collection)" type="warning" variant="tonal"
      density="compact" class="mb-2" :text="t('nfts.spamNotice')" />

    <v-switch v-if="hiddenCount > 0" v-model="showHidden" :label="`${t('nfts.showHidden')} (${hiddenCount})`"
      density="compact" hide-details color="primary" class="pl-2" />

    <div ref="gridEl" class="nft-grid-scroll">
      <div v-if="shownNfts.length > 0" class="nft-grid">
        <NftTile v-for="nft in shownNfts" :key="nft.token_id" :image-url="nft.image.thumbnail" :title="tileTitle(nft)"
          :badge="tileBadge(nft)" :dimmed="nfts.isNftHidden(chain, nft) || nfts.isSending(chain, address, nft)"
          @select="open(nft)" />
      </div>
      <div v-if="(loading && !page) || loadingMore" class="d-flex justify-center pa-4">
        <CircuitSpinner :size="22" :label="t('common.loading')" class="text-primary" />
      </div>
      <p v-else-if="page && page.items.length === 0" class="text-medium-emphasis pa-4">{{ t('nfts.empty') }}</p>
      <p v-else-if="page && shownNfts.length === 0" class="text-medium-emphasis pa-4">{{ t('nfts.allHidden') }}</p>
    </div>

    <NftDetailDialog v-model="detailOpen" :chain="chain" :address="address" :nft="detailNft"
      :collection-name="collection?.name ?? null" :floor-price="collection?.floor_price ?? null" />
  </div>
</template>
