<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { api, type ChainSlug } from '@/services/api'
import { tokenUrl } from '@/services/blockExplorer'
import { convertUsd, formatFiat } from '@/services/money'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { useChainDataStore } from '@/stores/chainData'
import { TOKEN_SEARCH_DEBOUNCE_MS } from '@/config/appSettings'
import AppTooltip from '@/components/AppTooltip.vue'

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

function keyFor(item: { address: string | null }): string {
  return item.address ?? 'native'
}

const heldMatches = computed(() => {
  const query = search.value.trim().toLowerCase()
  const held = props.heldTokens.filter((t) => t.usdValue != null && t.usdValue > 0)
  const matching = query
    ? held.filter(
        (t) => t.symbol.toLowerCase().includes(query) || t.name.toLowerCase().includes(query),
      )
    : held
  return [...matching].sort((a, b) => (b.usdValue ?? 0) - (a.usdValue ?? 0))
})

const heldKeys = computed(() => new Set(heldMatches.value.map((t) => keyFor(t))))

// Remote search never returns the native asset (it isn't a real ERC-20 in any
// token list), and held tokens matching the query are already shown above —
// de-duped here so a token the user already owns doesn't appear twice.
const searchResults = computed(() => remoteResults.value.filter((t) => !heldKeys.value.has(keyFor(t))))

watch(search, (query) => {
  if (debounceHandle) clearTimeout(debounceHandle)
  const trimmed = query.trim()
  if (!trimmed) {
    remoteResults.value = []
    loading.value = false
    return
  }
  loading.value = true
  debounceHandle = setTimeout(async () => {
    try {
      const results = await api.searchTokens(props.chain, trimmed)
      remoteResults.value = results.map((r) => ({
        address: r.address,
        symbol: r.symbol,
        name: r.name,
        decimals: r.decimals,
        logoUrl: r.logo_url,
      }))
    } catch {
      // A failed search just leaves the list empty — the user's own held
      // tokens above are unaffected, and retyping tries again.
      remoteResults.value = []
    } finally {
      loading.value = false
    }
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
  dialogOpen.value = true
}
</script>

<template>
  <div>
    <v-btn
      variant="tonal"
      class="text-none"
      :aria-label="label"
      @click="openDialog"
    >
      <v-avatar v-if="modelValue?.logoUrl" :image="modelValue.logoUrl" size="20" class="mr-2" />
      <v-icon v-else icon="mdi-cash" size="20" class="mr-2" />
      {{ modelValue?.symbol ?? label }}
      <v-icon icon="mdi-menu-down" end />
    </v-btn>
    <AppTooltip v-if="modelValue?.address" :text="t('swap.viewOnExplorer')">
      <template #default="{ activatorProps }">
        <a
          v-bind="activatorProps"
          :href="tokenUrl(chain, modelValue.address)"
          target="_blank"
          rel="noopener"
          class="ml-1"
        >
          <v-icon icon="mdi-open-in-new" size="16" />
        </a>
      </template>
    </AppTooltip>

    <v-dialog v-model="dialogOpen" max-width="420">
      <v-card>
        <v-card-title>{{ label }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            :placeholder="t('swap.searchTokenPlaceholder')"
            prepend-inner-icon="mdi-magnify"
            autofocus
            clearable
            hide-details
            class="mb-2"
          />
          <div class="expanded-list">
            <v-list-subheader v-if="heldMatches.length">{{ t('swap.yourTokens') }}</v-list-subheader>
            <v-list-item v-for="tok in heldMatches" :key="keyFor(tok)" @click="select(tok)">
              <template #prepend>
                <v-avatar v-if="tok.logoUrl" :image="tok.logoUrl" size="28" />
                <v-icon v-else icon="mdi-cash" size="28" />
              </template>
              <v-list-item-title>{{ tok.symbol }}</v-list-item-title>
              <v-list-item-subtitle>{{ tok.name }}</v-list-item-subtitle>
              <template #append>
                <span class="text-body-2">{{ fiatDisplay(tok.usdValue!) }}</span>
              </template>
            </v-list-item>

            <template v-if="search.trim()">
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
                <p
                  v-if="!heldMatches.length && !searchResults.length"
                  class="text-caption text-medium-emphasis text-center pa-4"
                >
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
