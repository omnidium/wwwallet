<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

export interface SelectMenuItem {
  value: string
  title: string
  subtitle?: string
  /** Letters in the round badge leading the chip and the row. */
  avatarText?: string
}

// The website's twin of the wallet app's AppSelect (frontend/src/components/
// AppSelect.vue) — a full-width chip opening a rounded, searchable list —
// without Vuetify: a button and an ARIA listbox. Escape and clicks outside
// close it; arrow keys move through the list and Enter picks.
const props = withDefaults(
  defineProps<{ modelValue: string; items: SelectMenuItem[]; label: string; searchPlaceholder?: string; emptyText?: string }>(),
  { searchPlaceholder: 'Search', emptyText: 'No matches' },
)
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const SEARCH_THRESHOLD = 8
const listId = `select-menu-${Math.random().toString(36).slice(2, 9)}`

const open = ref(false)
const search = ref('')
const activeIndex = ref(0)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
// Fixed to the viewport, under (or, without room, over) the chip, and
// teleported to <body>: the settings panel scrolls, and its backdrop-filter
// makes it the containing block for fixed descendants — a menu left inside
// it would be clipped by, and scroll, the panel.
const popover = ref<HTMLElement | null>(null)
const popoverStyle = ref<Record<string, string>>({})
const POPOVER_GAP = 4
const POPOVER_MAX_HEIGHT = 420

function place() {
  const rect = trigger.value?.getBoundingClientRect()
  if (!rect) return
  const below = window.innerHeight - rect.bottom - POPOVER_GAP - 8
  const above = rect.top - POPOVER_GAP - 8
  const flip = below < 240 && above > below
  const maxHeight = Math.min(POPOVER_MAX_HEIGHT, flip ? above : below)
  popoverStyle.value = {
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    maxHeight: `${maxHeight}px`,
    ...(flip ? { bottom: `${window.innerHeight - rect.top + POPOVER_GAP}px` } : { top: `${rect.bottom + POPOVER_GAP}px` }),
  }
}

const selected = computed(() => props.items.find((i) => i.value === props.modelValue) ?? null)
const showSearch = computed(() => props.items.length > SEARCH_THRESHOLD)
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? props.items.filter((i) => [i.title, i.subtitle, i.value].some((s) => s?.toLowerCase().includes(q))) : props.items
})

watch(filtered, () => (activeIndex.value = 0))

async function toggle() {
  if (open.value) return close()
  place()
  open.value = true
  search.value = ''
  activeIndex.value = Math.max(0, props.items.findIndex((i) => i.value === props.modelValue))
  await nextTick()
  // No scrolling to reveal it — the menu is fixed in view, and a scroll closes it.
  if (showSearch.value) searchInput.value?.focus({ preventScroll: true })
  else listEl.value?.focus({ preventScroll: true })
  scrollActiveIntoView()
}

function close(refocus = true) {
  open.value = false
  if (refocus) trigger.value?.focus()
}

function pick(item: SelectMenuItem) {
  emit('update:modelValue', item.value)
  close()
}

// By hand rather than scrollIntoView, which would scroll the panel and page too.
function scrollActiveIntoView() {
  nextTick(() => {
    const list = listEl.value
    const row = list?.querySelector<HTMLElement>(`[data-index="${activeIndex.value}"]`)
    if (!list || !row) return
    if (row.offsetTop < list.scrollTop) list.scrollTop = row.offsetTop
    else if (row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = row.offsetTop + row.offsetHeight - list.clientHeight
    }
  })
}

// Keys inside the open menu stay here — the settings panel closes itself on
// Escape from a document listener, and must not hear the menu's.
function onMenuKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = filtered.value.length
    if (n) activeIndex.value = (activeIndex.value + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[activeIndex.value]
    if (item) pick(item)
  } else if (e.key === 'Tab') {
    close(false)
  }
}

function onDocumentPointerDown(e: PointerEvent) {
  if (!(e.target instanceof Node)) return
  if (root.value?.contains(e.target) || popover.value?.contains(e.target)) return
  close(false)
}

// Scrolling the panel or page under an open menu would leave it floating
// away from its chip — it closes instead, as a native select's does.
function onScrollOrResize(e: Event) {
  if (e.target instanceof Node && listEl.value?.contains(e.target)) return
  close(false)
}

function stopListening() {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
}

watch(open, (isOpen) => {
  if (!isOpen) return stopListening()
  document.addEventListener('pointerdown', onDocumentPointerDown, true)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(stopListening)
</script>

<template>
  <div ref="root" class="select-menu">
    <button ref="trigger" type="button" class="select-chip" :class="{ open }" aria-haspopup="listbox"
      :aria-expanded="open" :aria-controls="listId" :aria-label="`${label}: ${selected?.title ?? ''}`" @click="toggle"
      @keydown.down.prevent="!open && toggle()">
      <span v-if="selected?.avatarText" class="select-avatar">{{ selected.avatarText }}</span>
      <span class="select-text">
        <span class="select-name">{{ selected?.title }}</span>
        <span v-if="selected?.subtitle" class="select-detail">{{ selected.subtitle }}</span>
      </span>
      <svg class="select-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <Teleport to="body">
    <div v-if="open" ref="popover" class="select-popover" :style="popoverStyle" @keydown="onMenuKeydown">
      <div v-if="showSearch" class="select-search">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
        </svg>
        <input ref="searchInput" v-model="search" type="text" :placeholder="searchPlaceholder" autocomplete="off"
          :aria-controls="listId" :aria-activedescendant="filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined" />
      </div>
      <ul :id="listId" ref="listEl" class="select-list" role="listbox" :aria-label="label" tabindex="-1"
        :aria-activedescendant="filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined">
        <li v-for="(item, i) in filtered" :id="`${listId}-${i}`" :key="item.value" :data-index="i" role="option"
          class="select-option" :class="{ active: i === activeIndex, selected: item.value === modelValue }"
          :aria-selected="item.value === modelValue" @click="pick(item)" @pointermove="activeIndex = i">
          <span v-if="item.avatarText" class="select-avatar">{{ item.avatarText }}</span>
          <span class="select-text">
            <span class="select-option-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="select-detail">{{ item.subtitle }}</span>
          </span>
          <svg v-if="item.value === modelValue" class="select-check" viewBox="0 0 24 24" width="18" height="18"
            fill="currentColor" aria-hidden="true">
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </li>
        <li v-if="!filtered.length" class="select-empty">{{ emptyText }}</li>
      </ul>
    </div>
    </Teleport>
  </div>
</template>

<style scoped>
.select-menu {
  position: relative;
}

.select-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  padding: 5px 14px 5px 6px;
  border: 1px solid rgb(var(--border-rgb) / 15%);
  border-radius: var(--radius-md);
  background: rgb(var(--surface-rgb));
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.select-chip:hover,
.select-chip.open {
  border-color: rgb(var(--accent-rgb) / 55%);
}

.select-chip:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.select-avatar {
  display: grid;
  flex: none;
  place-items: center;
  min-width: 30px;
  height: 30px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  background: var(--gradient-brand);
  color: #063b33;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1;
}

.select-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.2;
}

.select-name {
  overflow: hidden;
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.select-detail {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.select-caret {
  flex: none;
  margin-left: auto;
  opacity: 0.6;
}

.select-popover {
  position: fixed;
  /* Over the settings panel (SettingsFab.vue: scrim 1005, panel 1010). */
  z-index: 1020;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: rgb(var(--surface-rgb));
  box-shadow: var(--shadow-panel);
}

.select-search {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 12px 4px;
  padding: 0 12px;
  border-radius: var(--radius-sm);
  background: rgb(var(--border-rgb) / 7%);
  color: var(--text-muted);
}

.select-search input {
  flex: 1;
  min-width: 0;
  padding: 10px 0;
  border: 0;
  outline: 0;
  background: none;
  color: var(--text);
  font: inherit;
  font-size: 16px; /* stops iOS Safari zooming in on focus */
}

.select-list {
  position: relative;
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 6px 0;
  overflow-y: auto;
  list-style: none;
  outline: none;
}

.select-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  cursor: pointer;
}

.select-option.active {
  background: rgb(var(--border-rgb) / 6%);
}

.select-option.selected {
  background: rgb(var(--accent-rgb) / 12%);
}

.select-option-title {
  font-size: 0.95rem;
}

.select-check {
  flex: none;
  margin-left: auto;
  color: var(--accent-ink);
}

.select-empty {
  padding: 12px 16px;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
