<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppTooltip from '@/components/AppTooltip.vue'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

function close() {
  router.push('/')
}
</script>

<template>
  <div class="pane-scrim" @click.self="close">
    <div class="pane-card">
      <AppTooltip :text="t('common.close')" location="bottom">
        <template #default="{ activatorProps }">
          <v-btn
            v-bind="activatorProps"
            class="pane-close-btn"
            icon="mdi-close"
            variant="text"
            size="small"
            :aria-label="t('common.close')"
            @click="close"
          />
        </template>
      </AppTooltip>
      <slot />
    </div>
  </div>
</template>
