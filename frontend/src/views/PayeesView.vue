<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePayeesStore } from '@/stores/payees'
import { isValidAddress } from '@/services/wallet'
import { truncateAddress } from '@/services/format'
import type { ChainSlug } from '@/services/api'
import AppTooltip from '@/components/AppTooltip.vue'

const { t } = useI18n({ useScope: 'global' })
const payees = usePayeesStore()

const dialogOpen = ref(false)
const formValid = ref(false)
const label = ref('')
const address = ref('')
const chain = ref<ChainSlug>('ethereum')
const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

const labelRules = [(v: string) => !!v.trim() || t('validation.labelRequired')]
const addressRules = [(v: string) => isValidAddress(v.trim()) || t('validation.validAddress')]

function openDialog() {
  label.value = ''
  address.value = ''
  chain.value = 'ethereum'
  dialogOpen.value = true
}

async function save() {
  if (!formValid.value) return
  await payees.addPayee({
    id: crypto.randomUUID(),
    label: label.value.trim(),
    address: address.value.trim(),
    chain: chain.value,
  })
  dialogOpen.value = false
}

async function remove(id: string) {
  await payees.removePayee(id)
}
</script>

<template>
  <div>
    <v-row justify="space-between" align="center">
      <h1 class="text-h5">{{ t('payees.title') }}</h1>
      <v-btn color="primary" @click="openDialog">{{ t('payees.add') }}</v-btn>
    </v-row>

    <v-alert v-if="payees.payees.length === 0" type="info" variant="tonal" class="mt-4">
      {{ t('payees.empty') }}
    </v-alert>
    <v-list v-else>
      <v-list-item v-for="payee in payees.payees" :key="payee.id" :title="payee.label" :subtitle="`${truncateAddress(payee.address)} (${payee.chain})`">
        <template #append>
          <AppTooltip :text="t('payees.deleteAria', { label: payee.label })">
            <template #default="{ activatorProps }">
              <v-btn v-bind="activatorProps" icon="mdi-delete" variant="text" :aria-label="t('payees.deleteAria', { label: payee.label })" @click="remove(payee.id)" />
            </template>
          </AppTooltip>
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogOpen" max-width="480">
      <v-card class="pa-4">
        <v-card-title>{{ t('payees.add') }}</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field v-model="label" :label="t('payees.labelField')" :rules="labelRules" />
            <v-text-field v-model="address" :label="t('payees.addressField')" :rules="addressRules" />
            <v-select v-model="chain" :items="chains" :label="t('common.chain')" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">{{ t('common.cancel') }}</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="save">{{ t('common.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
