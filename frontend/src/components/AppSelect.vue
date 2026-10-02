<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppTooltip from '@/components/AppTooltip.vue'

export interface SelectItem {
  value: string
  title: string
  subtitle?: string
  /** Items sharing a group are listed together under it, groups in first-seen order. */
  group?: string
  /** An image (chain or token logo) — what the menu row leads with. */
  logoUrl?: string
  /** Letters in a round badge (an account's initial, a currency symbol) — what the chip leads with. */
  avatarText?: string
  icon?: string
  /** Small text after the logo, e.g. "+2" more chains. */
  logoBadge?: string
  /** Shown on the row's logo, e.g. every chain it stands for. */
  logoTooltip?: string
  /** Right-aligned on the menu row, e.g. a balance. */
  trailing?: string
  disabled?: boolean
  /** Badge styling — `secondary` for a payee rather than one of the user's own accounts. */
  tone?: 'secondary'
}

/**
 * The app's one select: a compact chip — what's picked, over a line of
 * detail — opening a rounded menu of the choices, searchable when there are
 * many. The chip leads with the item's avatar (falling back to its logo,
 * then icon); a menu row leads with its logo (falling back to avatar, then
 * icon) — an account reads as a name in the chip and as its chain in the list.
 *
 * `block` stretches the chip across its container, as a form field. The
 * `activator` slot swaps in a different trigger (an icon-only one), and the
 * `header` slot puts extra controls above the list (typing in an address).
 */
const props = withDefaults(
  defineProps<{
    modelValue: string | null
    items: SelectItem[]
    /** What's being picked — the menu's heading and the chip's accessible name. */
    label: string
    placeholder?: string
    placeholderIcon?: string
    /** Shown for a value that isn't one of the items (an address typed in). */
    fallback?: { title: string; subtitle?: string; icon?: string } | null
    /** Defaults to on past SEARCH_THRESHOLD items. */
    searchable?: boolean
    block?: boolean
    /** Detail lines in monospace — for addresses. */
    detailMono?: boolean
    disabled?: boolean
    menuLocation?: 'bottom start' | 'bottom end'
  }>(),
  { placeholder: '', placeholderIcon: 'mdi-menu-down', fallback: null, searchable: undefined, menuLocation: 'bottom start' },
)
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const SEARCH_THRESHOLD = 8

const { t } = useI18n({ useScope: 'global' })

const open = ref(false)
const search = ref('')
// Measured on open, so a block field's menu is exactly as wide as the field.
const activatorWidth = ref(0)
const menuMinWidth = computed(() => (props.block && activatorWidth.value ? activatorWidth.value : 240))

function onActivatorClick(e: MouseEvent) {
  activatorWidth.value = (e.currentTarget as HTMLElement).offsetWidth
}

const selected = computed(() => props.items.find((i) => i.value.toLowerCase() === props.modelValue?.toLowerCase()) ?? null)
const showSearch = computed(() => props.searchable ?? props.items.length > SEARCH_THRESHOLD)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return props.items
  return props.items.filter((i) => [i.title, i.subtitle, i.value].some((s) => s?.toLowerCase().includes(q)))
})

const groups = computed(() => {
  const order: (string | undefined)[] = []
  const byGroup = new Map<string | undefined, SelectItem[]>()
  for (const item of filtered.value) {
    if (!byGroup.has(item.group)) {
      byGroup.set(item.group, [])
      order.push(item.group)
    }
    byGroup.get(item.group)!.push(item)
  }
  return order.map((group) => ({ group, items: byGroup.get(group)! }))
})

watch(open, (isOpen) => {
  if (isOpen) search.value = ''
})

function pick(item: SelectItem) {
  if (item.disabled) return
  emit('update:modelValue', item.value)
  open.value = false
}

function close() {
  open.value = false
}

defineExpose({ close })
</script>

<template>
  <v-menu v-model="open" :location="menuLocation" :close-on-content-click="false" :disabled="disabled"
    :max-width="block ? undefined : 380" :min-width="menuMinWidth">
    <template #activator="{ props: menuProps }">
      <slot name="activator" :props="menuProps" :selected="selected" :open="open">
        <button v-bind="menuProps" type="button" class="app-select" :class="{ 'app-select--block': block }"
          @click.capture="onActivatorClick"
          :disabled="disabled" :aria-label="`${label}: ${selected?.title ?? fallback?.title ?? placeholder}`">
          <template v-if="selected">
            <span v-if="selected.avatarText" class="app-select-avatar"
              :class="{ 'app-select-avatar--secondary': selected.tone === 'secondary' }">{{ selected.avatarText }}</span>
            <img v-else-if="selected.logoUrl" :src="selected.logoUrl" alt="" class="app-select-logo" />
            <v-icon v-else-if="selected.icon" :icon="selected.icon" size="22" class="app-select-icon" />
          </template>
          <span v-else class="app-select-avatar app-select-avatar--empty">
            <v-icon :icon="fallback?.icon ?? placeholderIcon" size="16" />
          </span>
          <span class="app-select-text">
            <span class="app-select-name">{{ selected?.title ?? fallback?.title ?? placeholder }}</span>
            <span v-if="selected?.subtitle ?? fallback?.subtitle" class="app-select-detail"
              :class="{ 'app-select-detail--mono': detailMono }">
              {{ selected?.subtitle ?? fallback?.subtitle }}
            </span>
          </span>
          <v-icon icon="mdi-chevron-down" size="16" class="app-select-caret" />
        </button>
      </slot>
    </template>

    <v-card class="app-select-menu">
      <slot name="header" :close="close" />
      <div v-if="showSearch" class="pa-3 pb-1">
        <v-text-field v-model="search" :placeholder="t('common.search')" density="compact" hide-details
          prepend-inner-icon="mdi-magnify" autofocus autocomplete="off" />
      </div>
      <v-list density="comfortable" class="app-select-list">
        <v-list-subheader v-if="!$slots.header && !showSearch && !groups.some((g) => g.group)">{{ label }}</v-list-subheader>
        <template v-for="{ group, items: groupItems } in groups" :key="group ?? ''">
          <v-list-subheader v-if="group">{{ group }}</v-list-subheader>
          <v-list-item v-for="item in groupItems" :key="item.value" :active="item === selected" :disabled="item.disabled"
            @click="pick(item)">
            <template #prepend>
              <AppTooltip v-if="item.logoUrl && item.logoTooltip" :text="item.logoTooltip">
                <template #default="{ activatorProps }">
                  <span v-bind="activatorProps" class="app-select-row-visual">
                    <img :src="item.logoUrl" alt="" class="app-select-logo" />
                    <span v-if="item.logoBadge" class="app-select-logo-badge">{{ item.logoBadge }}</span>
                  </span>
                </template>
              </AppTooltip>
              <span v-else class="app-select-row-visual">
                <img v-if="item.logoUrl" :src="item.logoUrl" alt="" class="app-select-logo" />
                <span v-else-if="item.avatarText" class="app-select-avatar"
                  :class="{ 'app-select-avatar--secondary': item.tone === 'secondary' }">{{ item.avatarText }}</span>
                <v-icon v-else-if="item.icon" :icon="item.icon" size="22" />
                <span v-if="item.logoBadge" class="app-select-logo-badge">{{ item.logoBadge }}</span>
              </span>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.subtitle">{{ item.subtitle }}</v-list-item-subtitle>
            <template #append>
              <span v-if="item.trailing" class="app-select-trailing">{{ item.trailing }}</span>
              <v-icon v-if="item === selected" icon="mdi-check" size="18" color="primary" class="ml-2" />
            </template>
          </v-list-item>
        </template>
        <v-list-item v-if="!filtered.length" disabled>
          <v-list-item-title class="text-medium-emphasis">{{ t('common.noMatches') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
