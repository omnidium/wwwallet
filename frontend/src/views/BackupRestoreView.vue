<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'

const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)
const restoreWarningOpen = ref(false)
let pendingRestore: (() => void) | null = null

async function backupToDrive() {
  try {
    await vault.backupToDrive()
    messages.push('Backed up to Google Drive.', 'success')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
}

async function restoreFromDrive() {
  try {
    await vault.restoreFromDrive()
    messages.push('Restored from Google Drive. Unlock with your recovery phrase to continue.', 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
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
  try {
    await vault.restoreFromFile(file)
    messages.push('Restored from file. Unlock with your recovery phrase to continue.', 'success')
    router.push({ name: 'vault-unlock' })
  } catch (err) {
    messages.push((err as Error).message, 'error')
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
  <v-container>
    <h1 class="text-h5">Backup &amp; restore</h1>
    <v-alert type="info" variant="tonal" class="my-4">
      Backups are encrypted on this device before they ever leave it. wwwallet's
      server is never involved — restoring on a new device talks directly to
      Google or reads a local file.
    </v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-subtitle-1">Google Drive</v-card-title>
          <v-btn class="mb-2" block variant="outlined" @click="backupToDrive">Back up now</v-btn>
          <v-btn block variant="outlined" @click="confirmRestore(restoreFromDrive)">Restore latest backup</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-subtitle-1">Local file</v-card-title>
          <v-btn class="mb-2" block variant="outlined" @click="backupToFile">Download backup file</v-btn>
          <v-btn block variant="outlined" @click="confirmRestore(() => fileInput?.click())">Restore from file</v-btn>
          <input ref="fileInput" type="file" accept="application/json" hidden @change="onFileSelected" />
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="restoreWarningOpen" max-width="420">
      <v-card>
        <v-card-title>Replace your current wallet?</v-card-title>
        <v-card-text>
          Restoring overwrites everything currently in this vault — accounts, payees,
          and settings — with what's in the backup, and removes any passkey set up on
          this device (you'll re-enable it after unlocking). This can't be undone.
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="restoreWarningOpen = false">Cancel</v-btn>
          <v-spacer />
          <v-btn color="error" @click="proceedWithRestore">Replace it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
