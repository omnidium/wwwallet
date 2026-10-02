<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChainSlug } from '@/services/api'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import AppTooltip from '@/components/AppTooltip.vue'

export interface SummaryRow {
  key: string
  icon: string
  label: string
  value: string
  /** Secondary value beside the main one, e.g. "(≈ $0.01)"; never wraps apart from it. */
  sub?: string
  /** Shown on an info icon beside the label — e.g. each bridge fee itemised. */
  tooltip?: string
  emphasis?: boolean
}

// The panel's right-hand column (below the form on a phone): which way the
// money goes — chain to chain, through which bridge or DEX — and what that
// costs and how long it takes, before anything is reviewed.
defineProps<{
  fromChain: ChainSlug
  toChain: ChainSlug
  /** The bridge/DEX routing it ("Across", "0x"), or null for a plain transfer. */
  via: string | null
  viaLogoUrl?: string | null
  rows: SummaryRow[]
  loading: boolean
  error: string | null
  /** Shown when there's nothing to quote yet. */
  placeholder: string
}>()

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section class="route-summary" :aria-busy="loading">
    <h2 class="route-summary-title">{{ t('transfer.summaryTitle') }}</h2>

    <div class="route-path" :class="{ 'route-path--bridge': fromChain !== toChain }">
      <AppTooltip :text="NATIVE_ASSETS[fromChain].networkName" info>
        <template #default="{ activatorProps }">
          <img v-bind="activatorProps" :src="`/chains/${fromChain}.svg`" :alt="NATIVE_ASSETS[fromChain].networkName"
            class="route-path-chain" />
        </template>
      </AppTooltip>
      <div class="route-path-line">
        <span class="route-path-via">
          <img v-if="viaLogoUrl" :src="viaLogoUrl" alt="" class="route-path-via-logo" />
          <v-icon v-else :icon="fromChain !== toChain ? 'mdi-bridge' : 'mdi-arrow-right'" size="14" />
          <span>{{ via ?? (fromChain !== toChain ? t('transfer.routeBridge') : t('transfer.routeDirect')) }}</span>
        </span>
      </div>
      <AppTooltip :text="NATIVE_ASSETS[toChain].networkName" info>
        <template #default="{ activatorProps }">
          <img v-bind="activatorProps" :src="`/chains/${toChain}.svg`" :alt="NATIVE_ASSETS[toChain].networkName"
            class="route-path-chain" />
        </template>
      </AppTooltip>
    </div>

    <v-progress-linear :active="loading" indeterminate color="primary" height="2" class="route-summary-progress" />

    <p v-if="error" class="route-summary-error">
      <v-icon icon="mdi-alert-circle-outline" size="18" />
      <span>{{ error }}</span>
    </p>
    <dl v-else-if="rows.length" class="route-rows">
      <div v-for="row in rows" :key="row.key" class="route-row" :class="{ 'route-row--emphasis': row.emphasis }">
        <dt>
          <v-icon :icon="row.icon" size="16" class="route-row-icon" />
          <span>{{ row.label }}</span>
          <AppTooltip v-if="row.tooltip" :text="row.tooltip" info>
            <template #default="{ activatorProps }">
              <button v-bind="activatorProps" type="button" class="route-row-info" :aria-label="row.tooltip">
                <v-icon icon="mdi-information-outline" size="14" />
              </button>
            </template>
          </AppTooltip>
        </dt>
        <dd>
          <span class="text-no-wrap">{{ row.value }}</span>
          <template v-if="row.sub">{{ ' ' }}<span class="route-row-sub text-no-wrap">{{ row.sub }}</span></template>
        </dd>
      </div>
    </dl>
    <p v-else-if="!loading" class="route-summary-placeholder">{{ placeholder }}</p>

    <slot />

    <div class="route-summary-actions">
      <slot name="actions" />
    </div>
  </section>
</template>
