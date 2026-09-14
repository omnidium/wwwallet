<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { availableUnlockMethods } from '@/crypto/vault'

const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const passphrase = ref('')
const totpCode = ref('')
const showPassphraseField = ref(false)
const hasPasskeyWrap = ref(false)
const hasTotpWrap = ref(false)
const busy = ref(false)

onMounted(async () => {
  const methods = await availableUnlockMethods()
  hasPasskeyWrap.value = methods.includes('passkeyPrf')
  hasTotpWrap.value = methods.includes('totp')
  // Neither quick-unlock method is set up — the passphrase is the only option, so show it directly.
  if (!hasPasskeyWrap.value && !hasTotpWrap.value) showPassphraseField.value = true
})

async function submitPassphrase() {
  busy.value = true
  try {
    await vault.unlockWithPassphrase(passphrase.value)
    router.push('/')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function submitPasskey() {
  busy.value = true
  try {
    await vault.unlockWithPasskey()
    router.push('/')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function submitTotp() {
  if (totpCode.value.length !== 6) return
  busy.value = true
  try {
    await vault.unlockWithTotp(totpCode.value)
    router.push('/')
  } catch (err) {
    messages.push((err as Error).message, 'error')
    totpCode.value = ''
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title>Unlock wwwallet</v-card-title>

      <v-card-text v-if="hasPasskeyWrap">
        <v-btn color="primary" block :loading="busy" prepend-icon="mdi-fingerprint" @click="submitPasskey">
          Unlock with Face ID / Touch ID
        </v-btn>
      </v-card-text>

      <v-card-text v-if="hasTotpWrap">
        <p class="text-body-2 mb-2">Enter your authenticator app code</p>
        <v-text-field
          v-model="totpCode"
          label="6-digit code"
          maxlength="6"
          inputmode="numeric"
          autofocus
          @update:model-value="submitTotp"
        />
      </v-card-text>

      <template v-if="showPassphraseField">
        <v-card-text>
          <v-text-field
            v-model="passphrase"
            type="password"
            label="Recovery passphrase"
            @keyup.enter="submitPassphrase"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :loading="busy" @click="submitPassphrase">Unlock</v-btn>
        </v-card-actions>
      </template>
      <v-card-actions v-else-if="hasPasskeyWrap || hasTotpWrap">
        <v-btn variant="text" size="small" block @click="showPassphraseField = true">
          Use recovery passphrase instead
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
