<script setup lang="ts">
import { ref } from 'vue'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'

const vault = useVaultStore()
const messages = useMessagesStore()
const passphrase = ref('')

async function submit() {
  try {
    await vault.unlock(passphrase.value)
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title>Unlock wwwallet</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="passphrase"
          type="password"
          label="Passphrase"
          @keyup.enter="submit"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="submit">Unlock</v-btn>
      </v-card-actions>
      <v-card-text class="text-caption text-medium-emphasis">
        Local passkey and TOTP unlock options are Phase 3 work.
      </v-card-text>
    </v-card>
  </v-container>
</template>
