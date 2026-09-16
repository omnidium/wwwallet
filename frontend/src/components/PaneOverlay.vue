<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

function close() {
  router.push('/')
}
</script>

<template>
  <div class="pane-scrim" @click.self="close">
    <div class="pane-card">
      <v-btn
        class="pane-close-btn"
        icon="mdi-close"
        variant="text"
        size="small"
        :aria-label="t('common.close')"
        @click="close"
      />
      <slot />
    </div>
  </div>
</template>
