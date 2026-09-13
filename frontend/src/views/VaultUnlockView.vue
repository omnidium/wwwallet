<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'

const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()
const passphrase = ref('')

async function submit() {
  try {
    await vault.unlock(passphrase.value)
    router.push('/')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function unlockWithPasskey() {
  try {
    await vault.unlockWithPasskey(async () => passphrase.value)
    router.push('/')
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
      <v-card-actions class="flex-column">
        <v-btn color="primary" block @click="submit">Unlock</v-btn>
        <v-btn v-if="vault.hasPasskey" variant="outlined" block class="mt-2" @click="unlockWithPasskey">
          Unlock with passkey
        </v-btn>
      </v-card-actions>
      <v-card-text class="text-caption text-medium-emphasis">
        The passphrase is still required to decrypt the vault — the passkey only
        gates access to the unlock button on this device.
      </v-card-text>
    </v-card>
  </v-container>
</template>
