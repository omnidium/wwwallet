<script setup lang="ts">
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
let pendingRestore: (() => void) | null = null

async function backupToDrive() {
  try {
    await vault.backupToDrive()
    messages.push(t('msg.backup.driveSuccess'), 'success')
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  }
}

async function restoreFromDrive() {
  restoring.value = true
  try {
    await vault.restoreFromDrive()
    messages.push(t('msg.restore.driveSuccess'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    restoring.value = false
  }
}

async function backupToFile() {
  try {
    await vault.backupToFile()
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  }
}

async function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  restoring.value = true
  try {
    await vault.restoreFromFile(file)
    messages.push(t('msg.restore.fileSuccess'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
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
      {{ t('backup.intro') }}
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
          <button v-if="vault.isUnlocked" type="button" class="backup-tile backup-tile--backup" @click="backupToDrive">
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
          <button v-if="vault.isUnlocked" type="button" class="backup-tile backup-tile--backup" @click="backupToFile">
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
