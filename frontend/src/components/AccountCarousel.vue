<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChainSlug } from '@/services/api'
import type { WalletAccount } from '@/stores/accounts'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import AccountCard from '@/components/AccountCard.vue'

// One address's cards across chains (see composables/useChainDiscovery.ts),
// in the order AccountsView gives them — highest balance first.
//
// Two layouts for the same cards:
//  - phone width: a native horizontal scroller with snap points, so swiping
//    just works; the neighbours peek in as a sliver either side.
//  - wider: a stack — the active card in front, the rest tucked behind it,
//    fanned out to the left or right according to where they sit in the
//    order. Clicking one (or its chain logo) brings it to the front.
// The chain-logo pager below drives both; its ring slides to the active
// logo in step with the cards.
const props = defineProps<{ accounts: WalletAccount[]; reorderable?: boolean }>()
const emit = defineEmits<{ transferPointerdown: [PointerEvent, WalletAccount] }>()

const { t } = useI18n({ useScope: 'global' })

// Same breakpoint as the account cards' own full-width switch (main.css).
const stackQuery = window.matchMedia('(min-width: 701px)')
const stacked = ref(stackQuery.matches)
function onQueryChange(event: MediaQueryListEvent) {
  stacked.value = event.matches
}

// Tracked by chain, not position: a balance refresh can reorder the cards,
// and the one being looked at should stay put.
const activeChain = ref<ChainSlug | undefined>(props.accounts[0]?.chain)
const activeIndex = computed(() => Math.max(0, props.accounts.findIndex((a) => a.chain === activeChain.value)))

// ---- Stack layout ----------------------------------------------------------

// How far each step back in the stack is shifted sideways and shrunk; the
// shift outpaces the shrink, so a strip of every card behind stays visible.
const STACK_SHIFT_PX = 64
const STACK_SCALE_STEP = 0.06

function stackStyle(index: number) {
  const offset = index - activeIndex.value
  const depth = Math.abs(offset)
  // Cards stay opaque — fading them would let the ones behind show through
  // the front card mid-transition. The cover's own tint dims them instead.
  return {
    transform: `translateX(${offset * STACK_SHIFT_PX}px) scale(${1 - depth * STACK_SCALE_STEP})`,
    zIndex: String(props.accounts.length - depth),
    '--cover-dim': String(depth === 0 ? 0 : Math.min(0.7, 0.3 + depth * 0.15)),
  }
}

// ---- Scroller layout -------------------------------------------------------

const trackEl = ref<HTMLElement | null>(null)
// Fractional slide position while scrolling (1.5 = halfway between the
// second and third), so the pager ring can follow the swipe continuously.
const scrollProgress = ref(0)

function slideStep(): number {
  const slides = trackEl.value?.children
  if (!slides || slides.length < 2) return 1
  return (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft
}

let frame = 0
function onScroll() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    if (!trackEl.value) return
    scrollProgress.value = trackEl.value.scrollLeft / slideStep()
    const nearest = props.accounts[Math.round(scrollProgress.value)]
    if (nearest) activeChain.value = nearest.chain
  })
}

function scrollToActive(behavior: ScrollBehavior) {
  const track = trackEl.value
  if (!track) return
  track.scrollTo({ left: activeIndex.value * slideStep(), behavior })
}

// ---- Shared ---------------------------------------------------------------

function select(chain: ChainSlug) {
  activeChain.value = chain
  if (!stacked.value) scrollToActive('smooth')
}

// The pager ring's place: wherever the swipe is on a phone, else the active
// logo (animated there by CSS, in time with the stack's own transition).
const DOT_STEP_PX = 36
const ringOffset = computed(() => (stacked.value ? activeIndex.value : scrollProgress.value) * DOT_STEP_PX)

// A re-sort, or switching layouts, mustn't leave the scroller showing a
// different card from the active one.
watch(
  () => [props.accounts.map((a) => a.chain).join(), stacked.value],
  async () => {
    if (!props.accounts.some((a) => a.chain === activeChain.value)) activeChain.value = props.accounts[0]?.chain
    await nextTick()
    if (!stacked.value) {
      scrollToActive('instant')
      scrollProgress.value = activeIndex.value
    }
  },
)

onMounted(() => stackQuery.addEventListener('change', onQueryChange))
onBeforeUnmount(() => {
  stackQuery.removeEventListener('change', onQueryChange)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="account-carousel" :class="stacked ? 'account-carousel--stack' : 'account-carousel--scroll'" role="group"
    :aria-label="t('accountCarousel.label', { name: accounts[0]?.label })">
    <div ref="trackEl" class="account-carousel-track" @scroll.passive="onScroll">
      <div v-for="(account, i) in accounts" :key="account.chain" class="account-carousel-slide"
        :class="{ 'account-carousel-slide--active': i === activeIndex }" :style="stacked ? stackStyle(i) : undefined">
        <!-- Behind the front card in the stack: not interactive, just a way to bring it forward. -->
        <div :inert="stacked && i !== activeIndex">
          <AccountCard :account="account" :reorderable="reorderable"
            @transfer-pointerdown="(e) => emit('transferPointerdown', e, account)" />
        </div>
        <!-- Kept mounted on the front card too (just transparent and click-through) so its tint fades out with the move. -->
        <button v-if="stacked" type="button" class="account-carousel-cover"
          :class="{ 'account-carousel-cover--front': i === activeIndex }" :tabindex="i === activeIndex ? -1 : 0"
          :aria-hidden="i === activeIndex ? 'true' : undefined"
          :aria-label="t('accountCarousel.show', { network: NATIVE_ASSETS[account.chain].networkName })"
          @click="select(account.chain)" />
      </div>
    </div>
    <div class="account-carousel-pager" role="tablist">
      <span class="account-carousel-ring" :class="{ 'account-carousel-ring--follow': !stacked }"
        :style="{ transform: `translateX(${ringOffset}px)` }" aria-hidden="true" />
      <button v-for="(account, i) in accounts" :key="account.chain" type="button" role="tab"
        class="account-carousel-dot" :class="{ 'account-carousel-dot--active': i === activeIndex }"
        :aria-selected="i === activeIndex" :aria-label="NATIVE_ASSETS[account.chain].networkName"
        @click="select(account.chain)">
        <img :src="`/chains/${account.chain}.svg`" alt="" />
      </button>
    </div>
  </div>
</template>
