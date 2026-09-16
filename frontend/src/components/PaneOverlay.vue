<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

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
      >
        <v-icon />
        <v-tooltip activator="parent" location="bottom">{{ t('common.close') }}</v-tooltip>
      </v-btn>
      <slot />
    </div>
  </div>
</template>
