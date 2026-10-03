<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { useI18n } from 'vue-i18n'
import licenseSource from '../../../LICENSE?raw'
import { parseLicense } from '../../../shared/license/parseLicense'
import { GITHUB_REPO_URL } from '@shared/config/links'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })

// The licence in a panel of its own, rather than a link out to GitHub: a
// plain-language summary first, then the full text (kept in its original
// English — it's the legal document itself), read from the repo's LICENSE
// at build time.
const blocks = parseLicense(licenseSource)
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="640" scrollable @update:model-value="emit('update:modelValue', $event)">
    <v-card class="license-card">
      <header class="license-head">
        <div class="d-flex align-center ga-3">
          <v-icon icon="mdi-scale-balance" size="26" />
          <h2>{{ t('license.title') }}</h2>
        </div>
        <button type="button" class="close-btn" :aria-label="t('common.close')" @click="emit('update:modelValue', false)">
          <i class="mdi mdi-close" aria-hidden="true"></i>
        </button>
      </header>

      <v-card-text class="license-body">
        <section class="license-summary">
          <p class="field-label">{{ t('license.summaryTitle') }}</p>
          <ul>
            <li><v-icon icon="mdi-check-circle-outline" size="18" class="license-yes" /> <BrandText :text="t('license.canUse')" /></li>
            <li><v-icon icon="mdi-check-circle-outline" size="18" class="license-yes" /> {{ t('license.canRead') }}</li>
            <li><v-icon icon="mdi-close-circle-outline" size="18" class="license-no" /> {{ t('license.cannot') }}</li>
          </ul>
        </section>

        <p class="license-language-note">{{ t('license.englishNote') }}</p>

        <article class="license-text" lang="en">
          <template v-for="(block, i) in blocks" :key="i">
            <h3 v-if="block.kind === 'title'" class="license-text-title">{{ block.text }}</h3>
            <h4 v-else-if="block.kind === 'heading'">{{ block.text }}</h4>
            <p v-else>
              <template v-for="(part, j) in block.parts" :key="j">
                <a v-if="'href' in part" :href="part.href" target="_blank" rel="noopener noreferrer">{{ part.href }}</a>
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </template>
        </article>
      </v-card-text>

      <footer class="license-foot">
        <a :href="GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer" class="license-source">
          {{ t('license.viewSource') }} <v-icon icon="mdi-open-in-new" size="14" />
        </a>
        <v-btn color="primary" @click="emit('update:modelValue', false)">{{ t('common.close') }}</v-btn>
      </footer>
    </v-card>
  </v-dialog>
</template>
