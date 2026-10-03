<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppTooltip from '@/components/AppTooltip.vue'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })

function close() {
  router.push('/')
}

// The page behind (the accounts list) scrolls the window, so a wheel or
// swipe over the backdrop — or over a pane with nothing left to scroll —
// would otherwise scroll it instead. Locked for as long as any pane is
// open; padded by the scrollbar's width so hiding it doesn't shift the
// layout sideways.
onMounted(() => {
  const root = document.documentElement
  root.style.setProperty('--pane-scrollbar-width', `${window.innerWidth - root.clientWidth}px`)
  root.classList.add('pane-open')
})
onBeforeUnmount(() => {
  document.documentElement.classList.remove('pane-open')
})
</script>

<template>
  <div class="pane-scrim" @click.self="close">
    <div class="pane-card">
      <AppTooltip :text="t('common.close')" location="bottom">
        <template #default="{ activatorProps }">
          <!-- <v-btn
            v-bind="activatorProps"
            class="pane-close-btn"
            icon="mdi-close"
            variant="text"
            size="small"
            :aria-label="t('common.close')"
            @click="close"
          /> -->
          <button v-bind="activatorProps" type="button" class="close-btn pane-close-btn" :aria-label="t('common.close')"
            @click="close">
            <i class="mdi mdi-close" aria-hidden="true"></i>
          </button>
        </template>
      </AppTooltip>
      <slot />
    </div>
  </div>
</template>
