<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChainSlug, TokenListItem } from '@/services/api'
import { popularTokens, searchTokenList } from '@/services/tokenSearch'
import { tokenUrl } from '@/services/blockExplorer'
import { convertUsd, formatAmount, formatFiat } from '@/services/money'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useChainDataStore } from '@/stores/chainData'
import { TOKEN_SEARCH_DEBOUNCE_MS } from '@/config/appSettings'
import { POPULAR_TOKEN_SYMBOLS } from '@/config/popularTokens'
import AppTooltip from '@/components/AppTooltip.vue'
import { isTouchFirst } from '@/services/touchInput'

/** A token already resolved to a concrete identity — `address: null` means the chain's native asset. */
export interface PickedToken {
  address: string | null
  symbol: string
  name: string
  decimals: number
  logoUrl: string | null
}

/** A token this account actually holds, with its current balance — shown as
 * a quick pick before the user types anything, and pinned above remote
 * search results afterward. */
export interface HeldToken {
  address: string | null
  symbol: string
  name: string
  decimals: number
  logoUrl: string | null
  balance: number
  /** null when no price is known for this token — treated the same as $0: filtered out. */
  usdValue: number | null
}

const props = defineProps<{
  chain: ChainSlug
  modelValue: PickedToken | null
  heldTokens: HeldToken[]
  label: string
  /** Only the held tokens, no token-list search — for sending, where only what's held can go. */
  heldOnly?: boolean
  /** No block-explorer link beside the button — the transfer panel's tighter rows. */
  compact?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [value: PickedToken] }>()

const { t, locale } = useI18n({ useScope: 'global' })
const settingsLocale = useSettingsLocaleStore()
const chainData = useChainDataStore()

function fiatDisplay(usdValue: number): string {
  return formatFiat(
    convertUsd(usdValue, settingsLocale.currency, chainData.fxRates),
    settingsLocale.currency,
    locale.value,
  )
}

const dialogOpen = ref(false)
const search = ref('')
const loading = ref(false)
const remoteResults = ref<PickedToken[]>([])
let debounceHandle: ReturnType<typeof setTimeout> | undefined

// Lowercased: a held token's address (from balances) and the same token's
// address in a token list can differ only in checksum casing.
function keyFor(item: { address: string | null }): string {
  return (item.address ?? 'native').toLowerCase()
}

// Every held token on offer, before any search — what the picker's own
// shape is decided from (see showPicker/showSearch), so typing a query can't
// make the button or the search box itself disappear.
const pickableHeld = computed(() => {
  // The native asset is always kept regardless of balance/price — unlike an
  // ERC-20, it's never reachable through remote search (no real contract to
  // look up), so hiding it here whenever the balance is zero would make it
  // permanently unselectable for an account that doesn't hold any yet, even
  // though "sell X to get some ETH for gas" is one of the most common
  // reasons to open this picker in the first place.
  // Sending and swapping list the same tokens: priced, with something
  // actually worth sending. An unpriced token is almost always an airdropped
  // spam contract (the same ones AccountCard's "hide unknown tokens" hides),
  // and offering it as something to send is how address-poisoning scams get
  // their clicks.
  const held = props.heldTokens.filter((t) => t.address === null || (t.usdValue != null && t.usdValue > 0))
  return [...held].sort((a, b) => (b.usdValue ?? 0) - (a.usdValue ?? 0))
})

const heldMatches = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return pickableHeld.value
  return pickableHeld.value.filter(
    (t) => t.symbol.toLowerCase().includes(query) || t.name.toLowerCase().includes(query),
  )
})

// Choosing only among held tokens (sending): no picker when there's nothing
// to choose between, and no search box until the list is long enough to need
// one. Otherwise (swapping) the search box is how any token on the chain is
// found, held or not — so both are always there.
const showPicker = computed(() => !props.heldOnly || pickableHeld.value.length > 1)
const showSearch = computed(() => !props.heldOnly || pickableHeld.value.length > 10)

const heldKeys = computed(() => new Set(heldMatches.value.map((t) => keyFor(t))))

// Token-list search never returns the native asset (it isn't a real ERC-20 in
// any token list), and held tokens matching the query are already shown above —
// de-duped here so a token the user already owns doesn't appear twice.
const searchResults = computed(() => remoteResults.value.filter((t) => !heldKeys.value.has(keyFor(t))))

// Suggestions before anything's typed, when any token can be picked (not
// for sending) — otherwise the list would show only what's already held,
// with nothing to say the search box reaches every token on the chain.
const popular = ref<PickedToken[]>([])
// The last tokens swapped on this chain, ahead of the popular ones — no
// header of their own, just first in line.
const recentShown = computed(() =>
  props.heldOnly || search.value.trim()
    ? []
    : (chainData.recentSwapTokensByChain[props.chain] ?? []).filter((t) => !heldKeys.value.has(keyFor(t))),
)
const popularShown = computed(() => {
  if (search.value.trim()) return []
  const recentKeys = new Set(recentShown.value.map(keyFor))
  return popular.value.filter((t) => !heldKeys.value.has(keyFor(t)) && !recentKeys.has(keyFor(t)))
})

async function loadPopular() {
  popular.value = []
  if (props.heldOnly) return
  const chain = props.chain
  const list = await chainData.loadTokenList(chain)
  // Picker reopened on another chain while the list loaded.
  if (!list || chain !== props.chain) return
  popular.value = popularTokens(list, POPULAR_TOKEN_SYMBOLS[chain]).map(toPicked)
}

function toPicked(r: TokenListItem): PickedToken {
  return { address: r.address, symbol: r.symbol, name: r.name, decimals: r.decimals, logoUrl: r.logo_url }
}

watch(search, (query) => {
  if (debounceHandle) clearTimeout(debounceHandle)
  const trimmed = query.trim()
  if (!trimmed) {
    remoteResults.value = []
    loading.value = false
    return
  }
  if (props.heldOnly) return
  loading.value = true
  debounceHandle = setTimeout(async () => {
    // Searched locally, against the chain's token list as cached on this
    // device — only its very first download is ever waited on here.
    const list = await chainData.loadTokenList(props.chain)
    // A newer keystroke has superseded this search while the list loaded.
    if (search.value.trim() !== trimmed) return
    // No list at all (never downloaded, and that just failed) leaves the
    // results empty — the user's own held tokens above are unaffected, and
    // retyping tries again.
    remoteResults.value = searchTokenList(list ?? [], trimmed).map(toPicked)
    loading.value = false
  }, TOKEN_SEARCH_DEBOUNCE_MS)
})

function select(item: PickedToken) {
  emit('update:modelValue', item)
  dialogOpen.value = false
  search.value = ''
}

function openDialog() {
  search.value = ''
  remoteResults.value = []
  void loadPopular()
  dialogOpen.value = true
}
</script>

<template>
  <div class="token-picker">
    <v-btn v-if="showPicker" variant="tonal" class="text-none token-picker-btn" rounded="pill"
      :aria-label="label" @click="openDialog">
      <v-avatar v-if="modelValue?.logoUrl" :image="modelValue.logoUrl" size="20" class="mr-2" />
      <v-icon v-else icon="mdi-cash" size="20" />
      {{ modelValue?.symbol ?? label }}
      <v-icon icon="mdi-menu-down" end />
    </v-btn>
    <span v-else class="text-none token-picker-btn mr-4 pt-2">
      <v-avatar v-if="modelValue?.logoUrl" :image="modelValue.logoUrl" size="20" class="mr-2" />
      <v-icon v-else icon="mdi-cash" size="20" />
      {{ modelValue?.symbol ?? label }}
    </span>
    <AppTooltip v-if="modelValue?.address && !compact" :text="t('swap.viewOnExplorer')">
      <template #default="{ activatorProps }">
        <a v-bind="activatorProps" :href="tokenUrl(chain, modelValue.address)" target="_blank" rel="noopener"
          class="ml-1">
          <v-icon icon="mdi-open-in-new" size="16" />
        </a>
      </template>
    </AppTooltip>

    <v-dialog v-model="dialogOpen" max-width="420">
      <v-card>
        <v-card-title class="mt-2 ml-2 pb-0">{{ label }}</v-card-title>
        <v-card-text>
          <v-text-field v-if="showSearch" v-model="search" :placeholder="t('swap.searchTokenPlaceholder')"
            prepend-inner-icon="mdi-magnify" :autofocus="!isTouchFirst()" clearable hide-details class="mb-2" />
          <div class="expanded-list">
            <!-- <v-list-subheader v-if="heldMatches.length">{{ t('swap.yourTokens') }}</v-list-subheader> -->
            <v-list-item v-for="tok in heldMatches" :key="keyFor(tok)" @click="select(tok)">
              <template #prepend>
                <v-avatar v-if="tok.logoUrl" :image="tok.logoUrl" size="28" />
                <v-icon v-else icon="mdi-cash" size="28" />
              </template>
              <v-list-item-title>{{ tok.symbol }}</v-list-item-title>
              <v-list-item-subtitle>{{ tok.name }}</v-list-item-subtitle>
              <template #append>
                <span v-if="tok.usdValue != null" class="text-body-2">{{ fiatDisplay(tok.usdValue) }}</span>
                <span v-else class="text-body-2">{{ formatAmount(tok.balance) }}</span>
              </template>
            </v-list-item>

            <p v-if="heldOnly && !heldMatches.length" class="text-caption text-medium-emphasis text-center pa-4">
              {{ t('swap.noResults') }}
            </p>
            <v-list-item v-for="tok in recentShown" :key="`recent-${keyFor(tok)}`" @click="select(tok)">
              <template #prepend>
                <v-avatar v-if="tok.logoUrl" :image="tok.logoUrl" size="28" />
                <v-icon v-else icon="mdi-cash" size="28" />
              </template>
              <v-list-item-title>{{ tok.symbol }}</v-list-item-title>
              <v-list-item-subtitle>{{ tok.name }}</v-list-item-subtitle>
              <template #append>
                <v-icon icon="mdi-history" size="18" class="text-medium-emphasis" />
              </template>
            </v-list-item>
            <template v-if="popularShown.length">
              <v-list-subheader>{{ t('swap.popularTokens') }}</v-list-subheader>
              <v-list-item v-for="tok in popularShown" :key="keyFor(tok)" @click="select(tok)">
                <template #prepend>
                  <v-avatar v-if="tok.logoUrl" :image="tok.logoUrl" size="28" />
                  <v-icon v-else icon="mdi-cash" size="28" />
                </template>
                <v-list-item-title>{{ tok.symbol }}</v-list-item-title>
                <v-list-item-subtitle>{{ tok.name }}</v-list-item-subtitle>
              </v-list-item>
            </template>
            <template v-if="search.trim() && !heldOnly">
              <v-progress-linear v-if="loading" indeterminate class="my-2" />
              <template v-else>
                <v-list-subheader v-if="searchResults.length">{{ t('swap.allTokens') }}</v-list-subheader>
                <v-list-item v-for="tok in searchResults" :key="keyFor(tok)" @click="select(tok)">
                  <template #prepend>
                    <v-avatar v-if="tok.logoUrl" :image="tok.logoUrl" size="28" />
                    <v-icon v-else icon="mdi-cash" size="28" />
                  </template>
                  <v-list-item-title>{{ tok.symbol }}</v-list-item-title>
                  <v-list-item-subtitle>{{ tok.name }}</v-list-item-subtitle>
                </v-list-item>
                <p v-if="!heldMatches.length && !searchResults.length"
                  class="text-caption text-medium-emphasis text-center pa-4">
                  {{ t('swap.noResults') }}
                </p>
              </template>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
