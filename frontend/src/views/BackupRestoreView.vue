<script setup lang="ts">
import { ref } from 'vue'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { importEncryptedVaultBlob } from '@/crypto/vault'

const vault = useVaultStore()
const messages = useMessagesStore()
const fileInput = ref<HTMLInputElement | null>(null)

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
    messages.push('Restored from Google Drive. Unlock with your passphrase to continue.', 'success')
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
    await importEncryptedVaultBlob(file)
    messages.push('Restored from file. Unlock with your passphrase to continue.', 'success')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  }
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
          <v-btn block variant="outlined" @click="restoreFromDrive">Restore latest backup</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-subtitle-1">Local file</v-card-title>
          <v-btn class="mb-2" block variant="outlined" @click="backupToFile">Download backup file</v-btn>
          <v-btn block variant="outlined" @click="fileInput?.click()">Restore from file</v-btn>
          <input ref="fileInput" type="file" accept="application/json" hidden @change="onFileSelected" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
