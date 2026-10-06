<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { displayErrorMessage } from '@/services/errors'

const { t } = useI18n({ useScope: 'global' })
const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const restoreWarningOpen = ref(false)
const restoring = ref(false)
// A backup has no overlay of its own (a restore does) — the tiles stay
// clickable otherwise, and a second tap would start a second backup.
const backingUp = ref(false)
let pendingRestore: (() => void) | null = null

// Each backup and restore shows a toast for as long as it runs (Google's
// sign-in and the encryption can take a while), which then becomes its
// outcome — the same toast, rather than a second one after it, except for a
// restore that succeeded (see restoreFromDrive).
async function backupToDrive() {
  if (backingUp.value) return
  backingUp.value = true
  const msgId = messages.push(t('msg.backup.driveInProgress'), 'info', -1)
  try {
    await vault.backupToDrive()
    messages.update(msgId, t('msg.backup.driveSuccess'), 'success')
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    backingUp.value = false
  }
}

async function restoreFromDrive() {
  restoring.value = true
  const msgId = messages.push(t('msg.restore.driveInProgress'), 'info', -1)
  try {
    await vault.restoreFromDrive()
    // A new toast rather than updating the in-progress one: restoring ends
    // by locking the vault, and locking clears every toast (stores/vault.ts).
    messages.dismiss(msgId)
    messages.push(t('msg.restore.driveSuccess'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

async function backupToFile() {
  if (backingUp.value) return
  backingUp.value = true
  const msgId = messages.push(t('msg.backup.fileInProgress'), 'info', -1)
  try {
    await vault.backupToFile()
    messages.update(msgId, t('msg.backup.fileSuccess'), 'success')
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    backingUp.value = false
  }
}

async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  restoring.value = true
  const msgId = messages.push(t('msg.restore.fileInProgress'), 'info', -1)
  try {
    await vault.restoreFromFile(file)
    // A new toast rather than updating the in-progress one: restoring ends
    // by locking the vault, and locking clears every toast (stores/vault.ts).
    messages.dismiss(msgId)
    messages.push(t('msg.restore.fileSuccess'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.update(msgId, displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

// Restoring overwrites the vault that's currently active on this device, so
// both paths get a confirmation first rather than replacing everything the
// instant a file is picked or a Drive backup is found.
function confirmRestore(action: () => void) {
  pendingRestore = action
  restoreWarningOpen.value = true
}

function proceedWithRestore() {
  restoreWarningOpen.value = false
  pendingRestore?.()
  pendingRestore = null
}
</script>

<template>
  <div class="settings-pane">
    <div class="pane-header d-flex align-center ga-3">
      <v-icon icon="mdi-cloud-upload" size="28" />
      <h1 class="text-h5">{{ t('backup.title') }}</h1>
    </div>
    <v-alert type="info" variant="tonal" class="mt-6">
      <BrandText :text="t('backup.intro')" />
    </v-alert>

    <!-- The two cards stacked (the pane is narrow at every screen size); the
         back-up/restore tiles inside each, side by side. -->
    <div class="d-flex flex-column ga-4 mt-4">
      <v-card class="pa-4" variant="outlined">
        <div class="d-flex align-center ga-3 mb-3">
          <v-icon icon="mdi-google-drive" />
          <span class="text-subtitle-1 font-weight-medium">{{ t('backup.googleDriveTitle') }}</span>
        </div>
        <div class="backup-tiles">
          <button v-if="vault.isUnlocked" type="button" class="backup-tile backup-tile--backup" :disabled="backingUp"
            @click="backupToDrive">
            <v-icon icon="mdi-cloud-upload-outline" size="32" />
            <span>{{ t('backup.backUpNow') }}</span>
          </button>
          <button type="button" class="backup-tile backup-tile--restore" @click="confirmRestore(restoreFromDrive)">
            <v-icon icon="mdi-cloud-download-outline" size="32" />
            <span>{{ t('backup.restoreLatest') }}</span>
          </button>
        </div>
      </v-card>
      <v-card class="pa-4" variant="outlined">
        <div class="d-flex align-center ga-3 mb-3">
          <v-icon icon="mdi-file-outline" />
          <span class="text-subtitle-1 font-weight-medium">{{ t('backup.localFileTitle') }}</span>
        </div>
        <div class="backup-tiles">
          <button v-if="vault.isUnlocked" type="button" class="backup-tile backup-tile--backup" :disabled="backingUp"
            @click="backupToFile">
            <v-icon icon="mdi-file-download-outline" size="32" />
            <span>{{ t('backup.downloadBackup') }}</span>
          </button>
          <button type="button" class="backup-tile backup-tile--restore"
            @click="confirmRestore(() => fileInput?.click())">
            <v-icon icon="mdi-file-upload-outline" size="32" />
            <span>{{ t('backup.restoreFromFile') }}</span>
          </button>
        </div>
        <input ref="fileInput" type="file" accept="application/json" hidden @change="onFileSelected" />
      </v-card>
    </div>

    <v-dialog v-model="restoreWarningOpen" max-width="420">
      <v-card>
        <v-card-title>{{ t('backup.replaceTitle') }}</v-card-title>
        <v-card-text>
          {{ t('backup.replaceBody') }}
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="restoreWarningOpen = false">{{ t('common.cancel') }}</v-btn>
          <v-spacer />
          <v-btn color="error" @click="proceedWithRestore">{{ t('backup.replaceConfirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :model-value="restoring" persistent class="d-flex align-center justify-center">
      <v-card class="d-flex flex-column align-center pa-8 busy-panel" elevation="8">
        <v-progress-circular indeterminate size="64" color="primary" class="mb-4" />
        <p class="text-body-1">{{ t('backup.recovering') }}</p>
      </v-card>
    </v-overlay>
  </div>
</template>
