<script setup lang="ts">
import { usePayeesStore } from '@/stores/payees'

const payees = usePayeesStore()
</script>

<template>
  <v-container>
    <h1 class="text-h5">Payees</h1>
    <v-alert v-if="payees.payees.length === 0" type="info" variant="tonal" class="mt-4">
      No payees yet. Add/edit/manage is Phase 5 work — payees live in the encrypted vault.
    </v-alert>
    <v-list v-else>
      <v-list-item
        v-for="payee in payees.payees"
        :key="payee.id"
        :title="payee.label"
        :subtitle="payee.address"
      />
    </v-list>
  </v-container>
</template>
