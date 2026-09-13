<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { createWallet, importFromKeystoreJson, importFromMnemonic, importFromPrivateKey } from '@/services/wallet'
import type { ChainSlug } from '@/services/api'

const accounts = useAccountsStore()
const messages = useMessagesStore()
const router = useRouter()

const mode = ref<'create' | 'mnemonic' | 'privateKey' | 'keystore'>('create')
const label = ref('')
const chain = ref<ChainSlug>('ethereum')
const keystorePassword = ref('')
const confirmKeystorePassword = ref('')
const mnemonic = ref('')
const privateKey = ref('')
const keystoreFile = ref<File | null>(null)
const busy = ref(false)

const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

async function submit() {
  if (keystorePassword.value.length < 8) {
    messages.push('Use a keystore password of at least 8 characters.', 'warning')
    return
  }
  if (keystorePassword.value !== confirmKeystorePassword.value) {
    messages.push('Keystore passwords do not match.', 'error')
    return
  }

  busy.value = true
  try {
    const account = await buildAccount()
    await accounts.addAccount(account)
    messages.push('Account added.', 'success')
    router.push('/')
  } catch (err) {
    messages.push((err as Error).message, 'error')
  } finally {
    busy.value = false
  }
}

async function buildAccount() {
  const accountLabel = label.value.trim() || 'Wallet'
  switch (mode.value) {
    case 'create':
      return createWallet(accountLabel, chain.value, keystorePassword.value)
    case 'mnemonic':
      return importFromMnemonic(accountLabel, chain.value, mnemonic.value, keystorePassword.value)
    case 'privateKey':
      return importFromPrivateKey(accountLabel, chain.value, privateKey.value, keystorePassword.value)
    case 'keystore': {
      if (!keystoreFile.value) throw new Error('choose a keystore file')
      const json = await keystoreFile.value.text()
      return importFromKeystoreJson(accountLabel, chain.value, json, keystorePassword.value)
    }
  }
}

function onKeystoreFileSelected(event: Event) {
  keystoreFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
}
</script>

<template>
  <v-container>
    <h1 class="text-h5">Add account</h1>

    <v-tabs v-model="mode" class="mt-4">
      <v-tab value="create">Create new</v-tab>
      <v-tab value="mnemonic">Import mnemonic</v-tab>
      <v-tab value="privateKey">Import private key</v-tab>
      <v-tab value="keystore">Import keystore file</v-tab>
    </v-tabs>

    <v-card class="pa-4 mt-4" max-width="480">
      <v-text-field v-model="label" label="Label" />
      <v-select v-model="chain" :items="chains" label="Chain" />

      <v-textarea v-if="mode === 'mnemonic'" v-model="mnemonic" label="Recovery phrase (mnemonic)" rows="2" />
      <v-text-field v-if="mode === 'privateKey'" v-model="privateKey" type="password" label="Private key" />
      <v-file-input v-if="mode === 'keystore'" label="Keystore JSON file" accept="application/json" @change="onKeystoreFileSelected" />

      <v-text-field v-model="keystorePassword" type="password" label="Keystore password" />
      <v-text-field v-model="confirmKeystorePassword" type="password" label="Confirm keystore password" />
      <p class="text-caption text-medium-emphasis">
        This password protects this wallet's key inside your vault. It can be
        different from your vault passphrase.
      </p>

      <v-btn color="primary" block class="mt-2" :loading="busy" @click="submit">Add account</v-btn>
    </v-card>
  </v-container>
</template>
