<script setup lang="ts">
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import WalletSection from './components/sections/WalletSection.vue'
import EthereumSection from './components/sections/EthereumSection.vue'
import CryptoSection from './components/sections/CryptoSection.vue'
import FaqsSection from './components/sections/FaqsSection.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <WalletSection />
    <EthereumSection />
    <CryptoSection />
    <FaqsSection />
  </main>
  <AppFooter />
</template>
