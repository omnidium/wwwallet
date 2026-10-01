<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { PrfNotSupportedError } from '@/services/webauthnLocal'
import { generateRecoveryMnemonic, recoveryMnemonicWords } from '@/services/mnemonic'
import { copyWithAutoClear } from '@/services/clipboard'
import { displayErrorMessage } from '@/services/errors'

const { t } = useI18n({ useScope: 'global' })
const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const step = ref<'intro' | 'recoveryPhrase' | 'extras'>('intro')
const recoveryPhrase = ref('')
const recoveryPhraseWords = ref<string[]>([])
const savedAck = ref(false)
const termsAck = ref(false)
const restoreFileInput = ref<HTMLInputElement | null>(null)
const passkeyUnsupported = ref(false)
const skipWarningOpen = ref(false)
const restoring = ref(false)

function startCreate() {
  recoveryPhrase.value = generateRecoveryMnemonic()
  recoveryPhraseWords.value = recoveryMnemonicWords(recoveryPhrase.value)
  step.value = 'recoveryPhrase'
}

async function copyRecoveryPhrase() {
  try {
    await copyWithAutoClear(recoveryPhrase.value)
    messages.push(t('msg.recoveryPhrase.copied'), 'success')
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
    messages.push(displayErrorMessage(err), 'error')
  }
}

async function restoreFromDrive() {
  restoring.value = true
  try {
    await vault.restoreFromDrive()
    messages.push(t('msg.restore.driveSuccessSetup'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

async function onRestoreFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  restoring.value = true
  try {
    await vault.restoreFromFile(file)
    messages.push(t('msg.restore.fileSuccessSetup'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
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
      messages.push(displayErrorMessage(err), 'error')
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
      <template v-if="step === 'intro'">
        <v-card-title>{{ t('vaultSetup.createTitle') }}</v-card-title>
        <v-card-text class="text-body-2 text-medium-emphasis">
          {{ t('vaultSetup.createIntroBody') }}
        </v-card-text>
        <v-card-text class="pt-0">
          <v-alert type="warning" variant="tonal" density="compact" class="text-body-2">
            <div class="font-weight-medium mb-1">{{ t('vaultSetup.disclaimerTitle') }}</div>
            {{ t('vaultSetup.disclaimerBody') }}
            <a href="https://github.com/omnidium/wwwallet/blob/main/LICENSE" target="_blank"
              rel="noopener noreferrer">{{
                t('vaultSetup.disclaimerLicenseLink') }}</a>
          </v-alert>
          <v-checkbox v-model="termsAck" class="mt-2" density="compact" hide-details
            :label="t('vaultSetup.disclaimerAckLabel')" data-testid="terms-ack" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :disabled="!termsAck" @click="startCreate">{{ t('vaultSetup.createWalletCta')
            }}</v-btn>
        </v-card-actions>

        <v-divider class="my-4" />

        <v-card-text class="text-subtitle-2 pb-0">{{ t('vaultSetup.haveBackup') }}</v-card-text>
        <v-card-actions class="flex-column">
          <v-btn variant="outlined" block :disabled="!termsAck" @click="restoreFromDrive">{{
            t('vaultSetup.restoreFromDrive') }}</v-btn>
          <v-btn variant="outlined" block class="mt-2" :disabled="!termsAck" @click="restoreFileInput?.click()">
            {{ t('vaultSetup.restoreFromLocalFile') }}
          </v-btn>
          <input ref="restoreFileInput" type="file" accept="application/json" hidden @change="onRestoreFileSelected" />
        </v-card-actions>
      </template>

      <template v-else-if="step === 'recoveryPhrase'">
        <v-card-title>{{ t('vaultSetup.createTitle') }}</v-card-title>
        <v-card-text>
          <i18n-t keypath="vaultSetup.recoveryExplainer" tag="span" scope="global">
            <template #phrase><strong>{{ t('vaultSetup.recoveryExplainerPhrase') }}</strong></template>
          </i18n-t>
        </v-card-text>
        <v-card-text>
          <v-sheet class="passphrase_box pa-3" rounded="lg" color="surface" variant="tonal"
            data-testid="recovery-phrase">
            <v-row density="compact" no-gutters>
              <v-col v-for="(word, i) in recoveryPhraseWords" :key="i" cols="6" sm="4" class="pa-1">
                <!-- <span class="text-caption text-medium-emphasis mr-1">{{ i + 1 }}.</span> -->
                <span color="surface-variant" class="text-caption font-weight-medium"
                  data-testid="recovery-phrase-word">{{ word
                  }}</span>
              </v-col>
            </v-row>
          </v-sheet>
          <v-btn class="mt-3" variant="outlined" block prepend-icon="mdi-content-copy" @click="copyRecoveryPhrase">
            {{ t('vaultSetup.copyRecoveryPhrase') }}
          </v-btn>
          <v-checkbox v-model="savedAck" class="mt-2" density="compact" hide-details
            :label="t('vaultSetup.savedAckLabel')" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :disabled="!savedAck" @click="createVault">{{ t('vaultSetup.createVault')
          }}</v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-title>{{ t('vaultSetup.quickUnlockTitle') }}</v-card-title>
        <v-card-text class="text-body-2 text-medium-emphasis">
          {{ t('vaultSetup.quickUnlockBody') }}
        </v-card-text>
        <v-card-text>
          <v-btn class="mb-4" variant="outlined" block prepend-icon="mdi-fingerprint" @click="addPasskey"
            :disabled="vault.hasPasskey || passkeyUnsupported">
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

    <v-overlay :model-value="restoring" persistent class="d-flex align-center justify-center">
      <div class="d-flex flex-column align-center">
        <v-progress-circular indeterminate size="64" color="primary" class="mb-4" />
        <p class="text-body-1">{{ t('backup.recovering') }}</p>
      </div>
    </v-overlay>
  </v-container>
</template>
