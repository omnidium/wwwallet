<script setup lang="ts">
import { useI18n } from 'vue-i18n'

export interface ReviewRow {
  label: string
  value: string
  sub?: string
  bold?: boolean
}

defineProps<{
  modelValue: boolean
  title: string
  rows: ReviewRow[]
  confirmLabel: string
  busy: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; confirm: [] }>()

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    persistent
    transition="none"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="pa-4">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <div v-for="row in rows" :key="row.label" class="review-row d-flex justify-space-between py-2">
          <span class="text-medium-emphasis flex-shrink-0 mr-2">{{ row.label }}</span>
          <span class="text-right" :class="{ 'font-weight-bold': row.bold }" style="word-break: break-all">
            {{ row.value }}
            <span v-if="row.sub" class="text-caption text-medium-emphasis d-block">{{ row.sub }}</span>
          </span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" :disabled="busy" @click="emit('update:modelValue', false)">{{ t('common.cancel') }}</v-btn>
        <v-spacer />
        <v-btn color="primary" :loading="busy" @click="emit('confirm')">{{ confirmLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
