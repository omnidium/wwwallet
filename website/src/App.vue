<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import PrinciplesSection from './components/sections/PrinciplesSection.vue'
import WalletSection from './components/sections/WalletSection.vue'
import EthereumSection from './components/sections/EthereumSection.vue'
import CryptoSection from './components/sections/CryptoSection.vue'
import FaqsSection from './components/sections/FaqsSection.vue'
import { resyncTheme } from './composables/useTheme'
import { resyncLocale } from './i18n'


// A bfcache restore (browser Back/Forward) repaints this exact page from a
// frozen snapshot rather than reloading it, so a theme/locale cookie written
// by another page (the wallet app, or this site in another tab) in the
// meantime would otherwise go unnoticed until an actual reload.
function resyncFromSharedCookies() {
  resyncTheme()
  resyncLocale()
}

onMounted(() => {
  window.addEventListener('pageshow', onPageShow)
  document.addEventListener('visibilitychange', onVisibilityChange)
})
onBeforeUnmount(() => {
  window.removeEventListener('pageshow', onPageShow)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

function onPageShow(event: PageTransitionEvent) {
  if (event.persisted) resyncFromSharedCookies()
}
function onVisibilityChange() {
  if (document.visibilityState === 'visible') resyncFromSharedCookies()
}
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <PrinciplesSection />
    <WalletSection />
    <EthereumSection />
    <CryptoSection />
    <FaqsSection />
  </main>
  <AppFooter />
</template>
