<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChainSlug, Nft, NftCollection } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'
import { looksLikeSpam, useNftsStore } from '@/stores/nfts'
import { useChainDataStore } from '@/stores/chainData'
import { displayErrorMessage } from '@/services/errors'
import { isSendableNftType } from '@/services/nft'
import { nftUrl, tokenUrl, txnUrl } from '@/services/blockExplorer'
import { truncateAddress } from '@/services/format'
import { addressDisplayLabel } from '@/services/addressLabel'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { marketplaceLink } from '@/config/nfts'
import { useNftFloorText } from '@/composables/useNftFloorText'
import AppTooltip from '@/components/AppTooltip.vue'
import NftSendDialog from '@/components/NftSendDialog.vue'

/**
 * One NFT's details, full screen. Everything it says about itself (name,
 * description, traits) is whatever its creator wrote — including lures on
 * spam airdrops — so it's rendered as plain text only: never a link, never
 * HTML.
 *
 * Opens at once on whatever's known so far: with `nft` still null (the
 * gallery opening a collection's only NFT, before it's loaded), on what its
 * collection says, with placeholders for the rest.
 */
const props = defineProps<{
  modelValue: boolean
  chain: ChainSlug
  /** The account holding it. */
  address: string
  /** Null while it's still loading — see `onlyNftOf`. */
  nft: Nft | null
  collectionName: string | null
  /** The collection's floor price, in the chain's native coin. */
  floorPrice: number | null
  /**
   * Its collection, when it's the collection's only NFT and was opened
   * straight from the gallery — which lists collections, not NFTs, so hiding
   * it there has to hide the collection, or it would stay in the gallery.
   */
  onlyNftOf?: NftCollection | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })
const messages = useMessagesStore()
const nfts = useNftsStore()
const chainData = useChainDataStore()

const loading = computed(() => !props.nft)
const contractAddress = computed(() => props.nft?.contract_address ?? props.onlyNftOf?.contract_address ?? '')
const tokenType = computed(() => props.nft?.token_type ?? props.onlyNftOf?.token_type ?? null)

// The thumbnail shows straight away — the tile that opened this has already
// loaded it — and the full-size picture replaces it once it's arrived. Until
// the NFT itself has, its collection's picture stands in. The full-size copy
// is sometimes missing, or a 1-pixel placeholder, where the thumbnail is fine.
const thumbnailUrl = computed(() => props.nft?.image.thumbnail ?? props.onlyNftOf?.image.thumbnail ?? null)
const fullUrl = computed(() => props.nft?.image.full ?? null)
const loadedFullUrl = ref<string | null>(null)
const fullPending = ref(false)
const thumbnailFailed = ref(false)
watch(thumbnailUrl, () => (thumbnailFailed.value = false))
watch(
  fullUrl,
  (url) => {
    loadedFullUrl.value = null
    fullPending.value = false
    if (!url || url === thumbnailUrl.value) return
    fullPending.value = true
    const image = new Image()
    image.referrerPolicy = 'no-referrer'
    const settle = (loaded: boolean) => {
      if (fullUrl.value !== url) return
      fullPending.value = false
      if (loaded && image.naturalWidth > 1) loadedFullUrl.value = url
    }
    image.onload = () => settle(true)
    image.onerror = () => settle(false)
    image.src = url
  },
  { immediate: true },
)
const imageUrl = computed(() => loadedFullUrl.value ?? (thumbnailFailed.value ? null : thumbnailUrl.value))
// Nothing to show yet, but something still on its way.
const imagePending = computed(() => !imageUrl.value && (loading.value || fullPending.value))
function onImageError() {
  if (imageUrl.value === loadedFullUrl.value) loadedFullUrl.value = null
  else thumbnailFailed.value = true
}

const hidden = computed(() => {
  if (props.onlyNftOf) return nfts.isCollectionHidden(props.chain, props.onlyNftOf)
  return props.nft ? nfts.isNftHidden(props.chain, props.nft) : false
})
const hideLabel = computed(() => {
  if (props.onlyNftOf) return hidden.value ? t('nfts.showCollection') : t('nfts.hideCollection')
  return hidden.value ? t('nfts.showNft') : t('nfts.hideNft')
})
const title = computed(() => props.nft?.name ?? (props.nft ? `#${truncateTokenId(props.nft.token_id)}` : ''))
const standard = computed(() => tokenType.value?.replace(/^ERC/, 'ERC-') ?? null)

function truncateTokenId(id: string): string {
  return id.length > 16 ? `${id.slice(0, 6)}…${id.slice(-6)}` : id
}

const justCopied = ref(false)
async function copyTokenId() {
  if (!props.nft) return
  await navigator.clipboard.writeText(props.nft.token_id)
  justCopied.value = true
  setTimeout(() => (justCopied.value = false), 2000)
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// Fetched when the dialog opens on an NFT, at most once a session (see the store).
watch(
  () => [props.modelValue, props.nft] as const,
  ([open, nft]) => {
    if (open && nft) void nfts.ensureTransfers(props.chain, props.address, nft.contract_address, nft.token_id).catch(() => { })
  },
  { immediate: true },
)
const transfers = computed(() =>
  props.nft ? nfts.transfersOf(props.chain, props.address, props.nft.contract_address, props.nft.token_id) : undefined,
)
// Placeholders until there's a history to show — or an NFT to fetch one for.
const loadingTransfers = computed(
  () =>
    loading.value ||
    (!transfers.value &&
      nfts.isLoadingTransfers(props.chain, props.address, props.nft!.contract_address, props.nft!.token_id)),
)
const transferRows = computed(() =>
  (transfers.value ?? []).map((transfer) => {
    const incoming = transfer.to.toLowerCase() === props.address.toLowerCase()
    const party = incoming ? transfer.from : transfer.to
    let label: string
    if (incoming && party === ZERO_ADDRESS) label = t('nfts.minted')
    else if (!incoming && party === ZERO_ADDRESS) label = t('nfts.burned')
    else label = t(incoming ? 'nfts.receivedFrom' : 'nfts.sentTo', { party: addressDisplayLabel(props.chain, party) })
    return {
      key: `${transfer.hash}:${transfer.from}:${transfer.to}`,
      incoming,
      label,
      hash: transfer.hash,
      date: transfer.timestamp ? new Date(transfer.timestamp).toLocaleDateString() : null,
      amount: props.nft?.token_type === 'ERC1155' ? `×${transfer.amount}` : null,
    }
  }),
)

const floorText = useNftFloorText()
const floor = computed(() => floorText(props.chain, props.floorPrice))
// Named while the NFT is still loading, so its button is already in place.
const marketplace = computed(() =>
  contractAddress.value ? marketplaceLink(props.chain, contractAddress.value, props.nft?.token_id ?? '') : null,
)

const sending = computed(() => (props.nft ? nfts.isSending(props.chain, props.address, props.nft) : false))
// An ERC-404-style hybrid is a fungible token too, and moving one of its
// "NFTs" moves a whole token's worth — that's the token's own Send.
const alsoFungible = computed(
  () =>
    !!props.nft &&
    !!chainData.activityByAddress[chainData.keyFor(props.chain, props.address)]?.balances.some(
      (b) => b.contract_address?.toLowerCase() === props.nft!.contract_address,
    ),
)
const sendable = computed(() => !!props.nft && isSendableNftType(props.nft.token_type) && !alsoFungible.value)
// Its Send shows, disabled, while it loads — when its kind is one that's sent.
const mayBeSendable = computed(() => loading.value && !!tokenType.value && isSendableNftType(tokenType.value))
const sendOpen = ref(false)

function toggleHidden() {
  let change: Promise<void>
  if (props.onlyNftOf) change = nfts.setCollectionHidden(props.chain, props.onlyNftOf, !hidden.value)
  else if (props.nft) change = nfts.setNftHidden(props.chain, props.nft, !hidden.value)
  else return
  change.catch((err) => messages.push(displayErrorMessage(err), 'error'))
}
</script>

<template>
  <v-dialog :model-value="modelValue" fullscreen scrollable transition="dialog-bottom-transition"
    @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="nft || onlyNftOf" rounded="0" class="nft-detail txn-detail-card">
      <v-card-title class="d-flex align-center">
        <span v-if="nft" class="text-truncate">{{ title }}</span>
        <span v-else class="skeleton-row nft-skeleton-title" role="status" :aria-label="t('common.loading')" />
        <v-spacer />
        <AppTooltip :text="hideLabel">
          <template #default="{ activatorProps }">
            <v-btn v-bind="activatorProps" :icon="hidden ? 'mdi-eye' : 'mdi-eye-off'" variant="text" size="small"
              class="ml-2 mr-n2" :aria-label="hideLabel" @click="toggleHidden" />
          </template>
        </AppTooltip>
      </v-card-title>
      <v-card-text>
        <div class="nft-detail-content">
          <v-alert v-if="onlyNftOf && hidden && looksLikeSpam(onlyNftOf)" type="warning" variant="tonal"
            density="compact" class="mb-3" :text="t('nfts.spamNotice')" />
          <div class="nft-detail-image mb-3" :class="{ 'nft-detail-image--pending': imagePending }">
            <img v-if="imageUrl" :key="imageUrl" :src="imageUrl" alt="" decoding="async" referrerpolicy="no-referrer"
              @error="onImageError" />
            <v-icon v-else-if="!imagePending" icon="mdi-image-outline" size="64" class="text-medium-emphasis" />
          </div>

          <p v-if="nft?.description" class="nft-detail-description text-body-2 text-medium-emphasis mb-3">
            {{ nft.description }}
          </p>
          <div v-else-if="loading" class="mb-3" aria-hidden="true">
            <span class="skeleton-row nft-skeleton-line" />
            <span class="skeleton-row nft-skeleton-line" />
          </div>

          <table class="txn-details">
            <tbody>
              <tr>
                <td>{{ t('nfts.collection') }}</td>
                <td>{{ collectionName ?? t('nfts.unnamedCollection') }}</td>
              </tr>
              <tr>
                <td>{{ t('nfts.tokenId') }}</td>
                <td>
                  <template v-if="nft">
                    {{ truncateTokenId(nft.token_id) }}
                    <AppTooltip :text="justCopied ? t('accountCard.copied') : t('nfts.copyTokenId')">
                      <template #default="{ activatorProps }">
                        <v-icon v-bind="activatorProps" icon="mdi-content-copy" size="small" class="ml-1" role="button"
                          :aria-label="t('nfts.copyTokenId')" @click="copyTokenId" />
                      </template>
                    </AppTooltip>
                  </template>
                  <span v-else class="skeleton-row nft-skeleton-value" aria-hidden="true" />
                </td>
              </tr>
              <tr v-if="standard">
                <td>{{ t('nfts.standard') }}</td>
                <td>{{ standard }}</td>
              </tr>
              <tr v-if="nft?.token_type === 'ERC1155'">
                <td>{{ t('nfts.quantity') }}</td>
                <td>{{ nft.balance }}</td>
              </tr>
              <tr>
                <td>{{ t('nfts.contract') }}</td>
                <td>
                  <a :href="tokenUrl(chain, contractAddress)" target="_blank" rel="noopener noreferrer">{{
                    truncateAddress(contractAddress) }}</a>
                </td>
              </tr>
              <tr>
                <td>{{ t('token.network') }}</td>
                <td>{{ NATIVE_ASSETS[chain].networkName }}</td>
              </tr>
              <tr v-if="floor">
                <td>{{ t('nfts.floorPrice') }}</td>
                <td>
                  {{ floor }}
                  <span class="d-block text-caption text-medium-emphasis">{{ t('nfts.floorSource', { marketplace: 'OpenSea' }) }}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <template v-if="loading || nft!.attributes.length > 0">
            <p class="text-medium-emphasis mt-3 mb-1">{{ t('nfts.traits') }}</p>
            <div v-if="nft" class="nft-traits">
              <div v-for="(attribute, i) in nft.attributes" :key="i" class="nft-trait">
                <span v-if="attribute.trait_type" class="text-caption text-medium-emphasis d-block text-truncate">{{
                  attribute.trait_type }}</span>
                <span class="text-truncate d-block">{{ attribute.value }}</span>
              </div>
            </div>
            <div v-else class="nft-traits" aria-hidden="true">
              <div v-for="i in 3" :key="i" class="nft-trait nft-skeleton-trait" />
            </div>
          </template>

          <p class="text-medium-emphasis mt-3 mb-1">{{ t('nfts.history') }}</p>
          <div v-if="loadingTransfers" aria-hidden="true">
            <div v-for="i in 3" :key="i" class="nft-transfer py-2">
              <span class="skeleton-row nft-skeleton-line mb-0" />
            </div>
          </div>
          <p v-else-if="transferRows.length === 0" class="text-caption text-medium-emphasis">{{ t('nfts.noHistory') }}</p>
          <a v-for="row in transferRows" :key="row.key" :href="txnUrl(chain, row.hash)" target="_blank"
            rel="noopener noreferrer" class="nft-transfer d-flex align-center py-1">
            <v-icon :icon="row.incoming ? 'mdi-arrow-bottom-left' : 'mdi-arrow-top-right'" size="small"
              :color="row.incoming ? 'success' : undefined" class="mr-2" />
            <span class="flex-grow-1 text-truncate">{{ row.label }}</span>
            <span v-if="row.amount" class="ml-2">{{ row.amount }}</span>
            <span v-if="row.date" class="text-caption text-medium-emphasis ml-2">{{ row.date }}</span>
          </a>
        </div>
      </v-card-text>
      <v-card-actions class="flex-wrap">
        <v-btn :href="nft ? nftUrl(chain, nft.contract_address, nft.token_id) : undefined" :disabled="!nft"
          target="_blank" rel="noopener noreferrer" variant="text" prepend-icon="mdi-open-in-new">{{
            t('nfts.viewOnExplorer') }}</v-btn>
        <v-btn v-if="marketplace" :href="nft ? marketplace.url : undefined" :disabled="!nft" target="_blank"
          rel="noopener noreferrer" variant="text" prepend-icon="mdi-storefront-outline">{{
            t('nfts.viewOn', { marketplace: marketplace.name }) }}</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn v-if="sendable || mayBeSendable" color="primary" variant="flat" prepend-icon="mdi-send"
          :disabled="loading || sending" @click="sendOpen = true">
          {{ sending ? t('nfts.sending') : t('nfts.send') }}
        </v-btn>
      </v-card-actions>
      <p v-if="nft && !sendable" class="text-caption text-medium-emphasis px-4 pb-2">{{ t('nfts.notSendable') }}</p>
    </v-card>
  </v-dialog>

  <NftSendDialog v-if="nft && sendable" v-model="sendOpen" :chain="chain" :address="address" :nft="nft"
    :title="title" :collection-name="collectionName" @sent="emit('update:modelValue', false)" />
</template>
