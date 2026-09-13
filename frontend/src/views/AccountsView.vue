<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'

const accounts = useAccountsStore()
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <h1 class="text-h5">Accounts</h1>
      <v-btn color="primary" to="/accounts/new">
        Add account
      </v-btn>
    </v-row>

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="mt-4">
      No accounts yet. Add one to get started.
    </v-alert>

    <v-list v-else>
      <v-list-item
        v-for="account in accounts.accounts"
        :key="account.address"
        :to="`/accounts/${account.chain}/${account.address}`"
        :title="account.label"
        :subtitle="account.address"
      />
    </v-list>
  </v-container>
</template>
