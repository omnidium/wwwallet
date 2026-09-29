<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FaqItem from './FaqItem.vue'

interface FaqEntry {
  q: string
  a: string
}

const { t, tm } = useI18n()
</script>

<template>
  <section id="faqs" class="section">
    <div class="container">
      <p class="section-eyebrow">{{ t('faqs.eyebrow') }}</p>
      <h2 class="section-heading">{{ t('faqs.heading') }}</h2>
      <div class="faq-list">
        <FaqItem
          v-for="(item, index) in tm('faqs.items') as FaqEntry[]"
          :key="index"
          :question="item.q"
          :answer="item.a"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-list {
  max-width: 68ch;
}
</style>
