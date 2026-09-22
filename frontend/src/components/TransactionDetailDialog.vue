<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChainSlug, Transaction } from '@/services/api'
import { txnUrl, addressUrl } from '@/services/blockExplorer'
import { addressDisplayLabel } from '@/services/addressLabel'
import { truncateAddress } from '@/services/format'
import { formatAmount } from '@/services/money'

const props = defineProps<{
  modelValue: boolean
  chain: ChainSlug
  transaction: Transaction | null
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="emit('update:modelValue', $event)">
    <v-card v-if="transaction" class="pa-2">
      <v-card-title>{{ t('transactionDetail.title') }}</v-card-title>
      <v-card-text>
        <table class="txn-details">
          <tbody>
            <tr>
              <td>{{ t('transactionDetail.hash') }}</td>
              <td>
                <a :href="txnUrl(props.chain, transaction.hash)" target="_blank" rel="noopener noreferrer">{{
                  truncateAddress(transaction.hash)
                  }}</a>
              </td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.status') }}</td>
              <td>
                <span
                  :style="{ color: transaction.status === 'success' ? 'green' : transaction.status === 'failed' ? 'red' : undefined }">
                  {{ t(`transactionDetail.status_${transaction.status}`) }}
                </span>
              </td>
            </tr>
            <tr v-if="transaction.timestamp">
              <td>{{ t('transactionDetail.timestamp') }}</td>
              <td>{{ new Date(transaction.timestamp).toLocaleString() }}</td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr>
              <td>{{ t('transactionDetail.from') }}</td>
              <td>
                <a :href="addressUrl(props.chain, transaction.from)" target="_blank" rel="noopener noreferrer">{{
                  addressDisplayLabel(props.chain, transaction.from)
                  }}</a>
              </td>
            </tr>
            <tr v-if="transaction.to">
              <td>{{ t('transactionDetail.to') }}</td>
              <td>
                <a :href="addressUrl(props.chain, transaction.to)" target="_blank" rel="noopener noreferrer">{{
                  addressDisplayLabel(props.chain, transaction.to)
                  }}</a>
              </td>
            </tr>
            <tr>
              <td colspan="2"><v-divider class="my-2" /></td>
            </tr>
            <tr>
              <td>{{ transaction.counter_asset != null ? t('transactionDetail.sold') : t('transactionDetail.amount') }}
              </td>
              <td>{{ formatAmount(Number(transaction.value)) }} {{ transaction.asset }}</td>
            </tr>
            <tr v-if="transaction.counter_asset != null">
              <td>{{ t('transactionDetail.bought') }}</td>
              <td>{{ formatAmount(Number(transaction.counter_value)) }} {{ transaction.counter_asset }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="emit('update:modelValue', false)">{{ t('common.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
