<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'

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
    messages.push((err as Error).message, 'error')
  }
}

async function restoreFromDrive() {
  restoring.value = true
  try {
    await vault.restoreFromDrive()
    messages.push(t('msg.restore.driveSuccess'), 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    restoring.value = false
  }
}

async function backupToFile() {
  try {
    await vault.backupToFile()
  } catch (err) {
    messages.push((err as Error).message, 'error')
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
    messages.push((err as Error).message, 'error')
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
  <div>
    <h1 class="text-h5">{{ t('backup.title') }}</h1>
    <v-alert type="info" variant="tonal" class="my-4">
      {{ t('backup.intro') }}
    </v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-subtitle-1">{{ t('backup.googleDriveTitle') }}</v-card-title>
          <v-btn class="mb-2" block variant="outlined" @click="backupToDrive">{{ t('backup.backUpNow') }}</v-btn>
          <v-btn block variant="outlined" @click="confirmRestore(restoreFromDrive)">{{ t('backup.restoreLatest') }}</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-subtitle-1">{{ t('backup.localFileTitle') }}</v-card-title>
          <v-btn class="mb-2" block variant="outlined" @click="backupToFile">{{ t('backup.downloadBackup') }}</v-btn>
          <v-btn block variant="outlined" @click="confirmRestore(() => fileInput?.click())">{{ t('backup.restoreFromFile') }}</v-btn>
          <input ref="fileInput" type="file" accept="application/json" hidden @change="onFileSelected" />
        </v-card>
      </v-col>
    </v-row>

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
      <div class="d-flex flex-column align-center">
        <v-progress-circular indeterminate size="64" color="primary" class="mb-4" />
        <p class="text-body-1">{{ t('backup.recovering') }}</p>
      </div>
    </v-overlay>
  </div>
</template>
