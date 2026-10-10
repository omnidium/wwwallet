<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { ChainSlug, NftCollection } from '@/services/api'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { useNftsStore } from '@/stores/nfts'
import { displayErrorMessage } from '@/services/errors'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import NftTile from '@/components/NftTile.vue'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const accounts = useAccountsStore()
const messages = useMessagesStore()
const nfts = useNftsStore()

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

function open(collection: NftCollection) {
  router.push(`/accounts/${chain}/${address}/nfts/${collection.contract_address}`)
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
  </div>
</template>
