<script setup lang="ts">
import { ref } from 'vue'
import { usePayeesStore } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { isValidAddress } from '@/services/wallet'
import type { ChainSlug } from '@/services/api'

const payees = usePayeesStore()
const messages = useMessagesStore()

const dialogOpen = ref(false)
const label = ref('')
const address = ref('')
const chain = ref<ChainSlug>('ethereum')
const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

function openDialog() {
  label.value = ''
  address.value = ''
  chain.value = 'ethereum'
  dialogOpen.value = true
}

async function save() {
  if (!label.value.trim()) {
    messages.push('Enter a label.', 'warning')
    return
  }
  if (!isValidAddress(address.value.trim())) {
    messages.push('Enter a valid address.', 'warning')
    return
  }
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
          <v-btn icon="mdi-delete" variant="text" @click="remove(payee.id)" />
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogOpen" max-width="480">
      <v-card class="pa-4">
        <v-card-title>Add payee</v-card-title>
        <v-card-text>
          <v-text-field v-model="label" label="Label" />
          <v-text-field v-model="address" label="Address" />
          <v-select v-model="chain" :items="chains" label="Chain" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">Cancel</v-btn>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
