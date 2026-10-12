<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { ChainSlug, Nft, NftCollection } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { useNftsStore } from '@/stores/nfts'
import { useChainDataStore } from '@/stores/chainData'
import { displayErrorMessage } from '@/services/errors'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { showsFloorPrice } from '@/config/nfts'
import NftTile from '@/components/NftTile.vue'
import CircuitSpinner from '@/components/CircuitSpinner.vue'
import NftDetailDialog from '@/components/NftDetailDialog.vue'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const messages = useMessagesStore()
const nfts = useNftsStore()
const chainData = useChainDataStore()

const chain = route.params.chain as ChainSlug
const address = route.params.address as string
const account = computed(() => accounts.findAccount(chain, address))

const showHidden = ref(false)
const collections = computed(() => nfts.collectionsOf(chain, address))
const hiddenCount = computed(
  () => collections.value?.items.filter((c) => nfts.isCollectionHidden(chain, c)).length ?? 0,
)
const shownCollections = computed(
  () => collections.value?.items.filter((c) => showHidden.value || !nfts.isCollectionHidden(chain, c)) ?? [],
)
const loading = computed(() => nfts.isLoadingCollections(chain, address))
const loadingMore = computed(() => nfts.isLoadingCollections(chain, address, { more: true }))

// Last-known collections show straight away from the cache; this refreshes
// them. A failure only interrupts when there's nothing at all to show.
onMounted(async () => {
  void nfts.readCachedSends(chain, address)
  try {
    await nfts.loadCollections(chain, address)
  } catch (err) {
    if (!collections.value) messages.push(displayErrorMessage(err), 'error')
  }
})

const gridEl = ref<HTMLElement | null>(null)
useInfiniteScroll(() => {
  if (!collections.value?.nextPageKey || loading.value || loadingMore.value) return
  nfts.loadCollections(chain, address, { more: true }).catch((err) => messages.push(displayErrorMessage(err), 'error'))
}, gridEl)

// A collection of one NFT opens straight onto that NFT: its own page would
// hold a single tile, one more tap away from anything. The panel opens at
// once on what's known — the NFT as last seen, or else just its collection —
// and fills in as the NFT loads.
const detailNft = ref<Nft | null>(null)
const detailCollection = ref<NftCollection | null>(null)
const detailOpen = ref(false)
let unmounted = false
onUnmounted(() => (unmounted = true))

async function open(collection: NftCollection) {
  const contract = collection.contract_address
  const collectionPath = `/accounts/${chain}/${address}/nfts/${contract}`
  if (collection.owned_count !== 1) return router.push(collectionPath)
  const cached = nfts.nftsOf(chain, address, contract)?.items
  detailCollection.value = collection
  detailNft.value = cached?.length === 1 ? cached[0]! : null
  detailOpen.value = true
  // For the floor price's fiat value.
  if (showsFloorPrice(chain)) chainData.loadNativePrice(chain).catch(() => { })
  let failure: unknown = null
  try {
    await nfts.loadNfts(chain, address, contract)
  } catch (err) {
    failure = err
  }
  // Closed, or moved on to another, while it loaded.
  if (unmounted || !detailOpen.value || detailCollection.value !== collection) return
  const items = nfts.nftsOf(chain, address, contract)?.items
  if (items?.length === 1) {
    detailNft.value = items[0]!
  } else if (failure) {
    if (detailNft.value) return
    detailOpen.value = false
    messages.push(displayErrorMessage(failure), 'error')
  } else {
    // It holds none, or several, by now: its page shows which.
    detailOpen.value = false
    router.push(collectionPath)
  }
}

function countBadge(collection: NftCollection): string | undefined {
  return collection.owned_count > 1 ? `×${collection.owned_count}` : undefined
}
</script>

<template>
  <div class="nft-view">
    <header class="nft-header pane-header d-flex align-center">
      <img :src="`/chains/${chain}.svg`" alt="" class="nft-header-chain mr-3" />
      <div class="nft-header-titles">
        <h3>{{ t('nfts.galleryTitle', { network: NATIVE_ASSETS[chain].networkName }) }}</h3>
        <span v-if="account" class="text-caption text-medium-emphasis">{{ account.label }}</span>
      </div>
    </header>

    <v-switch v-if="hiddenCount > 0" v-model="showHidden" :label="`${t('nfts.showHidden')} (${hiddenCount})`"
      density="compact" hide-details color="primary" class="pl-2" />

    <div ref="gridEl" class="nft-grid-scroll">
      <div v-if="shownCollections.length > 0" class="nft-grid">
        <NftTile v-for="collection in shownCollections" :key="collection.contract_address"
          :image-url="collection.image.thumbnail" :title="collection.name ?? t('nfts.unnamedCollection')"
          :badge="countBadge(collection)" :verified="collection.verified" :verified-label="t('nfts.verified')"
          :dimmed="nfts.isCollectionHidden(chain, collection)" @select="open(collection)" />
      </div>
      <div v-if="(loading && !collections) || loadingMore" class="d-flex justify-center pa-4">
        <CircuitSpinner :size="22" :label="t('common.loading')" class="text-primary" />
      </div>
      <p v-else-if="collections && collections.items.length === 0" class="text-medium-emphasis pa-4">
        {{ t('nfts.empty') }}
      </p>
      <p v-else-if="collections && shownCollections.length === 0" class="text-medium-emphasis pa-4">
        {{ t('nfts.allHidden') }}
      </p>
    </div>

    <NftDetailDialog v-model="detailOpen" :chain="chain" :address="address" :nft="detailNft"
      :collection-name="detailCollection?.name ?? null" :floor-price="detailCollection?.floor_price ?? null"
      :only-nft-of="detailCollection" />
  </div>
</template>
