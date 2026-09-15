<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { PrfNotSupportedError } from '@/services/webauthnLocal'
import { generateRecoveryMnemonic, recoveryMnemonicWords } from '@/services/mnemonic'

const CLIPBOARD_CLEAR_MS = 45_000

const { t } = useI18n()
const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const step = ref<'recoveryPhrase' | 'extras'>('recoveryPhrase')
const recoveryPhrase = ref(generateRecoveryMnemonic())
const recoveryPhraseWords = ref(recoveryMnemonicWords(recoveryPhrase.value))
const savedAck = ref(false)
const restoreFileInput = ref<HTMLInputElement | null>(null)
const passkeyUnsupported = ref(false)
const skipWarningOpen = ref(false)

async function copyRecoveryPhrase() {
  try {
    await navigator.clipboard.writeText(recoveryPhrase.value)
    messages.push(t('msg.recoveryPhrase.copied'), 'success')
    setTimeout(async () => {
      try {
        // Only clear it if it's still what we put there — don't clobber
        // something else the user copied in the meantime.
        const current = await navigator.clipboard.readText()
        if (current === recoveryPhrase.value) await navigator.clipboard.writeText('')
      } catch {
        // Clipboard read access can be denied/unsupported — nothing to do then.
      }
    }, CLIPBOARD_CLEAR_MS)
  } catch {
    messages.push(t('msg.recoveryPhrase.copyFailed'), 'warning')
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
    messages.push(t('msg.restore.driveSuccessSetup'), 'success')
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
    messages.push(t('msg.restore.fileSuccessSetup'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function addPasskey() {
  try {
    await vault.registerPasskey('wwwallet')
    messages.push(t('msg.passkey.ready'), 'success')
  } catch (err) {
    if (err instanceof PrfNotSupportedError) {
      passkeyUnsupported.value = true
      messages.push(err.message, 'warning')
    } else {
      messages.push((err as Error).message, 'error')
    }
  }
}

function finish() {
  if (!vault.hasPasskey) {
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
        <v-card-title>{{ t('vaultSetup.createTitle') }}</v-card-title>
        <v-card-text>
          <i18n-t keypath="vaultSetup.recoveryExplainer" tag="span">
            <template #phrase><strong>{{ t('vaultSetup.recoveryExplainerPhrase') }}</strong></template>
          </i18n-t>
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
            {{ t('vaultSetup.copyRecoveryPhrase') }}
          </v-btn>
          <v-checkbox
            v-model="savedAck"
            class="mt-2"
            density="compact"
            hide-details
            :label="t('vaultSetup.savedAckLabel')"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :disabled="!savedAck" @click="createVault">{{ t('vaultSetup.createVault') }}</v-btn>
        </v-card-actions>

        <v-divider class="my-4" />

        <v-card-text class="text-subtitle-2 pb-0">{{ t('vaultSetup.haveBackup') }}</v-card-text>
        <v-card-actions class="flex-column">
          <v-btn variant="outlined" block @click="restoreFromDrive">{{ t('vaultSetup.restoreFromDrive') }}</v-btn>
          <v-btn variant="outlined" block class="mt-2" @click="restoreFileInput?.click()">
            {{ t('vaultSetup.restoreFromLocalFile') }}
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
        <v-card-title>{{ t('vaultSetup.quickUnlockTitle') }}</v-card-title>
        <v-card-text class="text-body-2 text-medium-emphasis">
          {{ t('vaultSetup.quickUnlockBody') }}
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
            {{ vault.hasPasskey ? t('vaultSetup.passkeyEnabledLabel') : t('vaultSetup.enablePasskey') }}
          </v-btn>
          <p v-if="passkeyUnsupported" class="text-caption text-error mb-4">
            {{ t('vaultSetup.passkeyUnsupportedNote') }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="finish">{{ t('common.done') }}</v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <v-dialog v-model="skipWarningOpen" max-width="420">
      <v-card>
        <v-card-title>{{ t('vaultSetup.skipTitle') }}</v-card-title>
        <v-card-text>
          {{ t('vaultSetup.skipBody') }}
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="skipWarningOpen = false">{{ t('common.goBack') }}</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="router.push('/')">{{ t('vaultSetup.continueAnyway') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
