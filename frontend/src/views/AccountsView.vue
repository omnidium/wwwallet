<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAccountsStore } from '@/stores/accounts'

const { t } = useI18n()
const accounts = useAccountsStore()
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <h1 class="text-h5">{{ t('accounts.title') }}</h1>
      <v-btn color="primary" to="/accounts/new">
        {{ t('accounts.addAccount') }}
      </v-btn>
    </v-row>

    <v-alert v-if="accounts.accounts.length === 0" type="info" variant="tonal" class="mt-4">
      {{ t('accounts.empty') }}
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
