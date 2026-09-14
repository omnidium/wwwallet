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
const formValid = ref(false)

const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

const passwordRules = [
  (v: string) => !!v || 'Password is required.',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters long.',
]
const confirmPasswordRules = [
  (v: string) => v === keystorePassword.value || 'Passwords do not match.',
]
const mnemonicRules = [
  (v: string) => {
    const wordCount = v.trim().split(/\s+/).filter(Boolean).length
    return (
      wordCount === 12 ||
      wordCount === 24 ||
      `Incorrect number of words (${wordCount}). Either 12 or 24 words are required.`
    )
  },
]

async function submit() {
  if (!formValid.value) return

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
      <v-form v-model="formValid">
        <v-text-field v-model="label" label="Label" />
        <v-select v-model="chain" :items="chains" label="Chain" />

        <v-textarea
          v-if="mode === 'mnemonic'"
          v-model="mnemonic"
          label="Recovery phrase (mnemonic)"
          rows="2"
          :rules="mnemonicRules"
        />
        <v-text-field v-if="mode === 'privateKey'" v-model="privateKey" type="password" label="Private key" :rules="[(v: string) => !!v || 'Private key is required.']" />
        <v-file-input v-if="mode === 'keystore'" label="Keystore JSON file" accept="application/json" :rules="[() => !!keystoreFile || 'Choose a keystore file.']" @change="onKeystoreFileSelected" />

        <v-text-field v-model="keystorePassword" type="password" label="Keystore password" :rules="passwordRules" />
        <v-text-field v-model="confirmKeystorePassword" type="password" label="Confirm keystore password" :rules="confirmPasswordRules" />
        <p class="text-caption text-medium-emphasis">
          This password protects this wallet's key inside your vault. It can be
          different from your vault passphrase.
        </p>

        <v-btn color="primary" block class="mt-2" :disabled="!formValid" :loading="busy" @click="submit">Add account</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
