<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { generateRecoveryMnemonic, recoveryMnemonicWords } from '@/services/mnemonic'
import { copyWithAutoClear } from '@/services/clipboard'
import { displayErrorMessage } from '@/services/errors'
import LicenseDialog from '@/components/LicenseDialog.vue'
import { deferPasskeyNudge } from '@/composables/usePasskeyNudge'
import { useQuickUnlock } from '@/composables/useQuickUnlock'
import UnlockPasswordDialog from '@/components/UnlockPasswordDialog.vue'
import PasskeyAlternatives from '@/components/PasskeyAlternatives.vue'

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
const quick = useQuickUnlock()
const passwordDialogOpen = ref(false)
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
  // Shown for as long as it runs, then turned into its outcome — see BackupRestoreView.
  const msgId = messages.push(t('msg.restore.driveInProgress'), 'info', -1)
  try {
    await vault.restoreFromDrive()
    // A new toast rather than updating the in-progress one: restoring ends
    // by locking the vault, and locking clears every toast (stores/vault.ts).
    messages.dismiss(msgId)
    messages.push(t('msg.restore.driveSuccessSetup'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

async function onRestoreFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  restoring.value = true
  const msgId = messages.push(t('msg.restore.fileInProgress'), 'info', -1)
  try {
    await vault.restoreFromFile(file)
    // A new toast rather than updating the in-progress one: restoring ends
    // by locking the vault, and locking clears every toast (stores/vault.ts).
    messages.dismiss(msgId)
    messages.push(t('msg.restore.fileSuccessSetup'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

function addPasskey() {
  void quick.setUpPasskey('device')
}

// Just declined it — the daily reminder starts tomorrow, not on the next screen.
function continueWithoutPasskey() {
  deferPasskeyNudge()
  router.push('/')
}

function finish() {
  if (!vault.hasPasskey && !vault.hasPassword) {
    skipWarningOpen.value = true
    return
  }
  router.push('/')
}

// Opened from the disclaimer's "Read the license" — in a panel, not a link out to GitHub.
const licenseOpen = ref(false)
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
            <BrandText :text="t('vaultSetup.disclaimerBody')" />
            <button type="button" class="text-link" @click="licenseOpen = true">{{
              t('vaultSetup.disclaimerLicenseLink') }}</button>
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
          <BrandText :text="t('vaultSetup.recoveryExplainer')" />
          <v-alert type="warning" variant="tonal" density="compact" class="mt-3">
            {{ t('vaultSetup.recoveryOnlyWayBack') }}
          </v-alert>
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
        <v-card-text v-if="quick.passkeyPossible.value" class="text-body-2 text-medium-emphasis">
          {{ t('vaultSetup.quickUnlockBody') }}
        </v-card-text>
        <v-card-text>
          <template v-if="quick.passkeyPossible.value">
            <v-btn v-if="vault.hasPasskey || !quick.platformLacksPrf.value" class="mb-2" variant="outlined" block
              prepend-icon="mdi-fingerprint" :loading="quick.busy.value" :disabled="vault.hasPasskey"
              @click="addPasskey">
              {{ vault.hasPasskey ? t('vaultSetup.passkeyEnabledLabel') : t('vaultSetup.enablePasskey') }}
            </v-btn>
            <div v-if="!vault.hasPasskey" class="d-flex flex-column ga-1 mb-4">
              <PasskeyAlternatives :variant="quick.platformLacksPrf.value ? 'outlined' : 'text'"
                :small="!quick.platformLacksPrf.value" />
            </div>
          </template>
          <p v-else class="text-body-2 text-medium-emphasis mb-4"><BrandText :text="t('quickUnlock.passkeyUnavailableBody')" /></p>
          <!-- The fallback, offered once a passkey is known not to work here. -->
          <v-btn v-if="!vault.hasPasskey && (!quick.passkeyPossible.value || quick.platformLacksPrf.value)" class="mb-4"
            variant="outlined" block prepend-icon="mdi-form-textbox-password" :disabled="vault.hasPassword"
            @click="passwordDialogOpen = true">
            {{ vault.hasPassword ? t('quickUnlock.passwordEnabled') : t('quickUnlock.setPassword') }}
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="finish">{{ t('common.done') }}</v-btn>
        </v-card-actions>
      </template>
    </v-card>

    <UnlockPasswordDialog v-model="passwordDialogOpen" />

    <v-dialog v-model="skipWarningOpen" max-width="420">
      <v-card>
        <v-card-title>{{ t('vaultSetup.skipTitle') }}</v-card-title>
        <v-card-text>
          <BrandText :text="t('vaultSetup.skipBody')" />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="skipWarningOpen = false">{{ t('common.goBack') }}</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="continueWithoutPasskey">{{ t('vaultSetup.continueAnyway') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :model-value="restoring" persistent class="d-flex align-center justify-center">
      <v-card class="d-flex flex-column align-center pa-8 busy-panel" elevation="8">
        <v-progress-circular indeterminate size="64" color="primary" class="mb-4" />
        <p class="text-body-1">{{ t('backup.recovering') }}</p>
      </v-card>
    </v-overlay>

    <LicenseDialog v-model="licenseOpen" />
  </v-container>
</template>
