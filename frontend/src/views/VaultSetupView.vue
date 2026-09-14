<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { PrfNotSupportedError } from '@/services/webauthnLocal'
import { generateRecoveryMnemonic, recoveryMnemonicWords } from '@/services/mnemonic'

const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const step = ref<'recoveryPhrase' | 'extras'>('recoveryPhrase')
const recoveryPhrase = ref(generateRecoveryMnemonic())
const recoveryPhraseWords = ref(recoveryMnemonicWords(recoveryPhrase.value))
const savedAck = ref(false)
const totpUri = ref('')
const totpQrDataUrl = ref('')
const totpCode = ref('')
const restoreFileInput = ref<HTMLInputElement | null>(null)
const passkeyUnsupported = ref(false)
const skipWarningOpen = ref(false)

async function copyRecoveryPhrase() {
  try {
    await navigator.clipboard.writeText(recoveryPhrase.value)
    messages.push('Recovery phrase copied.', 'success')
  } catch {
    messages.push('Could not copy automatically — select and copy the words manually.', 'warning')
  }
}

async function createVault() {
  if (!savedAck.value) return
  try {
    await vault.createVault(recoveryPhrase.value)
    step.value = 'extras'
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function restoreFromDrive() {
  try {
    await vault.restoreFromDrive()
    messages.push('Restored from Google Drive. Enter your recovery phrase to unlock.', 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function onRestoreFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    await vault.restoreFromFile(file)
    messages.push('Restored from file. Enter your recovery phrase to unlock.', 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function addPasskey() {
  try {
    await vault.registerPasskey('wwwallet')
    messages.push('Face ID / Touch ID unlock is ready.', 'success')
  } catch (err) {
    if (err instanceof PrfNotSupportedError) {
      passkeyUnsupported.value = true
      messages.push(err.message, 'warning')
    } else {
      messages.push((err as Error).message, 'error')
    }
  }
}

async function startTotpEnrollment() {
  const { provisioningUri } = vault.enrollTotp()
  totpUri.value = provisioningUri
  totpQrDataUrl.value = await QRCode.toDataURL(provisioningUri, { width: 220, margin: 1 })
}

async function confirmTotp() {
  const ok = await vault.confirmTotpEnrollment(totpCode.value)
  messages.push(ok ? 'Authenticator app unlock is ready.' : 'Incorrect code — try again.', ok ? 'success' : 'error')
}

function finish() {
  if (!vault.hasPasskey && !vault.totpEnabled) {
    skipWarningOpen.value = true
    return
  }
  router.push('/')
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="480" class="pa-4">
      <template v-if="step === 'recoveryPhrase'">
        <v-card-title>Create your wallet</v-card-title>
        <v-card-text>
          This is your <strong>recovery phrase</strong>. It encrypts everything on this
          device and is the only way back in if you ever lose access to a passkey or
          authenticator app — including restoring a backup on a new device. Write it down
          or copy it somewhere safe, offline. You won't need it day-to-day once quick
          unlock is set up on the next screen, and wwwallet will never show it to you again.
        </v-card-text>
        <v-card-text>
          <v-sheet class="pa-3" rounded="lg" color="surface-variant" variant="tonal" data-testid="recovery-phrase">
            <v-row dense no-gutters>
              <v-col v-for="(word, i) in recoveryPhraseWords" :key="i" cols="6" sm="4" class="pa-1">
                <span class="text-caption text-medium-emphasis mr-1">{{ i + 1 }}.</span>
                <span class="font-weight-medium" data-testid="recovery-phrase-word">{{ word }}</span>
              </v-col>
            </v-row>
          </v-sheet>
          <v-btn class="mt-3" variant="outlined" block prepend-icon="mdi-content-copy" @click="copyRecoveryPhrase">
            Copy recovery phrase
          </v-btn>
          <v-checkbox
            v-model="savedAck"
            class="mt-2"
            density="compact"
            hide-details
            label="I've saved my recovery phrase somewhere safe"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :disabled="!savedAck" @click="createVault">Create vault</v-btn>
        </v-card-actions>

        <v-divider class="my-4" />

        <v-card-text class="text-subtitle-2 pb-0">Already have a backup?</v-card-text>
        <v-card-actions class="flex-column">
          <v-btn variant="outlined" block @click="restoreFromDrive">Restore from Google Drive</v-btn>
          <v-btn variant="outlined" block class="mt-2" @click="restoreFileInput?.click()">
            Restore from local file
          </v-btn>
          <input
            ref="restoreFileInput"
            type="file"
            accept="application/json"
            hidden
            @change="onRestoreFileSelected"
          />
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-title>Set up quick unlock</v-card-title>
        <v-card-text class="text-body-2 text-medium-emphasis">
          Use Face ID/Touch ID or an authenticator app to unlock day-to-day, instead of
          your recovery phrase. Set up at least one for the best experience.
        </v-card-text>
        <v-card-text>
          <v-btn
            class="mb-4"
            variant="outlined"
            block
            prepend-icon="mdi-fingerprint"
            @click="addPasskey"
            :disabled="vault.hasPasskey || passkeyUnsupported"
          >
            {{ vault.hasPasskey ? 'Face ID / Touch ID enabled' : 'Enable Face ID / Touch ID' }}
          </v-btn>
          <p v-if="passkeyUnsupported" class="text-caption text-error mb-4">
            Not supported on this device or browser — use an authenticator app instead.
          </p>

          <v-btn
            v-if="!totpUri"
            variant="outlined"
            block
            prepend-icon="mdi-cellphone-key"
            @click="startTotpEnrollment"
            :disabled="vault.totpEnabled"
          >
            {{ vault.totpEnabled ? 'Authenticator app enabled' : 'Set up an authenticator app' }}
          </v-btn>
          <template v-else>
            <p class="text-caption mb-2">Scan this with your authenticator app:</p>
            <div class="d-flex justify-center mb-2">
              <v-img v-if="totpQrDataUrl" :src="totpQrDataUrl" width="220" height="220" />
            </div>
            <p class="text-caption text-medium-emphasis mb-2" style="word-break: break-all">
              Can't scan? Enter this manually: {{ totpUri }}
            </p>
            <v-text-field v-model="totpCode" label="Enter the 6-digit code" maxlength="6" inputmode="numeric" class="mt-2" />
            <v-btn variant="outlined" block @click="confirmTotp">Confirm code</v-btn>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="finish">Done</v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <v-dialog v-model="skipWarningOpen" max-width="420">
      <v-card>
        <v-card-title>Skip quick unlock?</v-card-title>
        <v-card-text>
          Without a passkey or authenticator app, you'll enter your full recovery
          phrase every time you open wwwallet. You can set this up later from Settings.
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="skipWarningOpen = false">Go back</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="router.push('/')">Continue anyway</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
