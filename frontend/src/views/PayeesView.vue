<script setup lang="ts">
import { ref } from 'vue'
import { usePayeesStore } from '@/stores/payees'
import { isValidAddress } from '@/services/wallet'
import type { ChainSlug } from '@/services/api'

const payees = usePayeesStore()

const dialogOpen = ref(false)
const formValid = ref(false)
const label = ref('')
const address = ref('')
const chain = ref<ChainSlug>('ethereum')
const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

const labelRules = [(v: string) => !!v.trim() || 'Label is required.']
const addressRules = [(v: string) => isValidAddress(v.trim()) || 'Enter a valid address.']

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
  <v-container>
    <v-row justify="space-between" align="center">
      <h1 class="text-h5">Payees</h1>
      <v-btn color="primary" @click="openDialog">Add payee</v-btn>
    </v-row>

    <v-alert v-if="payees.payees.length === 0" type="info" variant="tonal" class="mt-4">
      No payees yet.
    </v-alert>
    <v-list v-else>
      <v-list-item v-for="payee in payees.payees" :key="payee.id" :title="payee.label" :subtitle="`${payee.address} (${payee.chain})`">
        <template #append>
          <v-btn icon="mdi-delete" variant="text" :aria-label="`Delete ${payee.label}`" @click="remove(payee.id)" />
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogOpen" max-width="480">
      <v-card class="pa-4">
        <v-card-title>Add payee</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field v-model="label" label="Label" :rules="labelRules" />
            <v-text-field v-model="address" label="Address" :rules="addressRules" />
            <v-select v-model="chain" :items="chains" label="Chain" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
