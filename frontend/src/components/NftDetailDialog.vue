<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChainSlug, Nft } from '@/services/api'
import { useMessagesStore } from '@/stores/messages'
import { useNftsStore } from '@/stores/nfts'
import { displayErrorMessage } from '@/services/errors'
import { nftUrl, tokenUrl } from '@/services/blockExplorer'
import { truncateAddress } from '@/services/format'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import AppTooltip from '@/components/AppTooltip.vue'

/**
 * One NFT's details. Everything it says about itself (name, description,
 * traits) is whatever its creator wrote — including lures on spam airdrops —
 * so it's rendered as plain text only: never a link, never HTML.
 */
const props = defineProps<{
  modelValue: boolean
  chain: ChainSlug
  /** The account holding it. */
  address: string
  nft: Nft | null
  collectionName: string | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })
const messages = useMessagesStore()
const nfts = useNftsStore()

// Full size first, then the thumbnail: the provider's cached full-size
// copy is sometimes missing, or a 1-pixel placeholder, where its thumbnail
// is fine.
const imageSources = computed(() =>
  [props.nft?.image.full, props.nft?.image.thumbnail].filter((url, i, all): url is string => !!url && all.indexOf(url) === i),
)
const imageAttempt = ref(0)
watch(
  () => props.nft,
  () => (imageAttempt.value = 0),
)
const imageUrl = computed(() => imageSources.value[imageAttempt.value] ?? null)
function onImageLoad(event: Event) {
  if ((event.target as HTMLImageElement).naturalWidth <= 1) imageAttempt.value++
}
const hidden = computed(() => (props.nft ? nfts.isNftHidden(props.chain, props.nft) : false))
const title = computed(() => props.nft?.name ?? (props.nft ? `#${truncateTokenId(props.nft.token_id)}` : ''))

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

function toggleHidden() {
  if (!props.nft) return
  nfts.setNftHidden(props.chain, props.nft, !hidden.value).catch((err) => messages.push(displayErrorMessage(err), 'error'))
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="nft" class="pa-2 txn-detail-card">
      <v-card-title class="text-truncate">{{ title }}</v-card-title>
      <v-card-text>
        <div class="nft-detail-image mb-3">
          <img v-if="imageUrl" :key="imageUrl" :src="imageUrl" alt="" decoding="async" referrerpolicy="no-referrer"
            @load="onImageLoad" @error="imageAttempt++" />
          <v-icon v-else icon="mdi-image-outline" size="64" class="text-medium-emphasis" />
        </div>

        <p v-if="nft.description" class="nft-detail-description text-body-2 text-medium-emphasis mb-3">
          {{ nft.description }}
        </p>

        <table class="txn-details">
          <tbody>
            <tr>
              <td>{{ t('nfts.collection') }}</td>
              <td>{{ collectionName ?? t('nfts.unnamedCollection') }}</td>
            </tr>
            <tr>
              <td>{{ t('nfts.tokenId') }}</td>
              <td>
                {{ truncateTokenId(nft.token_id) }}
                <AppTooltip :text="justCopied ? t('accountCard.copied') : t('nfts.copyTokenId')">
                  <template #default="{ activatorProps }">
                    <v-icon v-bind="activatorProps" icon="mdi-content-copy" size="small" class="ml-1" role="button"
                      :aria-label="t('nfts.copyTokenId')" @click="copyTokenId" />
                  </template>
                </AppTooltip>
              </td>
            </tr>
            <tr>
              <td>{{ t('nfts.standard') }}</td>
              <td>{{ nft.token_type.replace(/^ERC/, 'ERC-') }}</td>
            </tr>
            <tr v-if="nft.token_type === 'ERC1155'">
              <td>{{ t('nfts.quantity') }}</td>
              <td>{{ nft.balance }}</td>
            </tr>
            <tr>
              <td>{{ t('nfts.contract') }}</td>
              <td>
                <a :href="tokenUrl(chain, nft.contract_address)" target="_blank" rel="noopener noreferrer">{{
                  truncateAddress(nft.contract_address) }}</a>
              </td>
            </tr>
            <tr>
              <td>{{ t('token.network') }}</td>
              <td>{{ NATIVE_ASSETS[chain].networkName }}</td>
            </tr>
          </tbody>
        </table>

        <template v-if="nft.attributes.length > 0">
          <p class="text-medium-emphasis mt-3 mb-1">{{ t('nfts.traits') }}</p>
          <div class="nft-traits">
            <div v-for="(attribute, i) in nft.attributes" :key="i" class="nft-trait">
              <span v-if="attribute.trait_type" class="text-caption text-medium-emphasis d-block text-truncate">{{
                attribute.trait_type }}</span>
              <span class="text-truncate d-block">{{ attribute.value }}</span>
            </div>
          </div>
        </template>
      </v-card-text>
      <v-card-actions class="flex-wrap">
        <v-btn :href="nftUrl(chain, nft.contract_address, nft.token_id)" target="_blank" rel="noopener noreferrer"
          variant="text" prepend-icon="mdi-open-in-new">{{ t('nfts.viewOnExplorer') }}</v-btn>
        <v-spacer />
        <v-btn variant="text" :prepend-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'" @click="toggleHidden">
          {{ hidden ? t('nfts.showNft') : t('nfts.hideNft') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
