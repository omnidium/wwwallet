<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'

const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const step = ref<'passphrase' | 'extras'>('passphrase')
const passphrase = ref('')
const confirmPassphrase = ref('')
const totpUri = ref('')
const totpCode = ref('')

async function createVault() {
  if (passphrase.value.length < 12) {
    messages.push('Use a passphrase of at least 12 characters.', 'warning')
    return
  }
  if (passphrase.value !== confirmPassphrase.value) {
    messages.push('Passphrases do not match.', 'error')
    return
  }
  try {
    await vault.createVault(passphrase.value)
    step.value = 'extras'
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function addPasskey() {
  try {
    await vault.registerPasskey('wwwallet')
    messages.push('Passkey registered for local unlock.', 'success')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function startTotpEnrollment() {
  const { provisioningUri } = await vault.enrollTotp()
  totpUri.value = provisioningUri
}

async function confirmTotp() {
  const ok = await vault.confirmTotpEnrollment(totpCode.value)
  messages.push(ok ? 'TOTP enabled.' : 'Incorrect code — try again.', ok ? 'success' : 'error')
}

function finish() {
  router.push('/')
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="480" class="pa-4">
      <template v-if="step === 'passphrase'">
        <v-card-title>Create your wallet</v-card-title>
        <v-card-text>
          This passphrase encrypts everything on this device — wallets, payees, and
          settings. It is never sent anywhere. Losing it without a backup means
          permanent loss, same as any self-custody wallet.
        </v-card-text>
        <v-card-text>
          <v-text-field v-model="passphrase" type="password" label="Passphrase" />
          <v-text-field v-model="confirmPassphrase" type="password" label="Confirm passphrase" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="createVault">Create vault</v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-title>Optional: local unlock &amp; backup codes</v-card-title>
        <v-card-text>
          <v-btn class="mb-4" variant="outlined" block @click="addPasskey" :disabled="vault.hasPasskey">
            {{ vault.hasPasskey ? 'Passkey registered' : 'Register a local passkey' }}
          </v-btn>

          <v-btn
            v-if="!totpUri"
            variant="outlined"
            block
            @click="startTotpEnrollment"
            :disabled="vault.totpEnabled"
          >
            {{ vault.totpEnabled ? 'TOTP enabled' : 'Enable authenticator codes (TOTP)' }}
          </v-btn>
          <template v-else>
            <p class="text-caption mb-2">Add this to your authenticator app:</p>
            <p class="text-caption text-medium-emphasis mb-2" style="word-break: break-all">{{ totpUri }}</p>
            <v-text-field v-model="totpCode" label="Enter the 6-digit code" class="mt-2" />
            <v-btn variant="outlined" block @click="confirmTotp">Confirm code</v-btn>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="finish">Done</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-container>
</template>
