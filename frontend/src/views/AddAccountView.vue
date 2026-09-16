<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAccountsStore } from '@/stores/accounts'
import { useMessagesStore } from '@/stores/messages'
import { createWallet, importFromKeystoreJson, importFromMnemonic, importFromPrivateKey } from '@/services/wallet'
import type { ChainSlug } from '@/services/api'

const { t } = useI18n({ useScope: 'global' })
const accounts = useAccountsStore()
const messages = useMessagesStore()
const router = useRouter()

const mode = ref<'create' | 'mnemonic' | 'privateKey' | 'keystore'>('create')
const label = ref('')
const chain = ref<ChainSlug>('ethereum')
const filePassword = ref('')
const mnemonic = ref('')
const privateKey = ref('')
const keystoreFile = ref<File | null>(null)
const busy = ref(false)
const formValid = ref(false)

const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

const filePasswordRules = [(v: string) => !!v || t('validation.filePasswordRequired')]
const mnemonicRules = [
  (v: string) => {
    const wordCount = v.trim().split(/\s+/).filter(Boolean).length
    return wordCount === 12 || wordCount === 24 || t('validation.mnemonicWordCount', { count: wordCount })
  },
]

async function submit() {
  if (!formValid.value) return

  busy.value = true
  try {
    const account = await buildAccount()
    await accounts.addAccount(account)
    messages.push(t('msg.account.added'), 'success')
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
      return createWallet(accountLabel, chain.value)
    case 'mnemonic':
      return importFromMnemonic(accountLabel, chain.value, mnemonic.value)
    case 'privateKey':
      return importFromPrivateKey(accountLabel, chain.value, privateKey.value)
    case 'keystore': {
      if (!keystoreFile.value) throw new Error(t('errors.chooseKeystoreFile'))
      const json = await keystoreFile.value.text()
      return importFromKeystoreJson(accountLabel, chain.value, json, filePassword.value)
    }
  }
}

function onKeystoreFileSelected(event: Event) {
  keystoreFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
}
</script>

<template>
  <div>
    <h1 class="text-h5">{{ t('addAccount.title') }}</h1>

    <v-tabs v-model="mode" class="mt-4">
      <v-tab value="create">{{ t('addAccount.tabCreate') }}</v-tab>
      <v-tab value="mnemonic">{{ t('addAccount.tabMnemonic') }}</v-tab>
      <v-tab value="privateKey">{{ t('addAccount.tabPrivateKey') }}</v-tab>
      <v-tab value="keystore">{{ t('addAccount.tabKeystore') }}</v-tab>
    </v-tabs>

    <v-card class="pa-4 mt-4" max-width="480">
      <v-form v-model="formValid">
        <v-text-field v-model="label" :label="t('common.label')" />
        <v-select v-model="chain" :items="chains" :label="t('common.chain')" />

        <v-textarea
          v-if="mode === 'mnemonic'"
          v-model="mnemonic"
          :label="t('addAccount.mnemonicLabel')"
          rows="2"
          :rules="mnemonicRules"
        />
        <v-text-field v-if="mode === 'privateKey'" v-model="privateKey" type="password" :label="t('addAccount.privateKeyLabel')" :rules="[(v: string) => !!v || t('validation.privateKeyRequired')]" />
        <template v-if="mode === 'keystore'">
          <v-file-input :label="t('addAccount.keystoreFileLabel')" accept="application/json" :rules="[() => !!keystoreFile || t('validation.keystoreFileRequired')]" @change="onKeystoreFileSelected" />
          <v-text-field v-model="filePassword" type="password" :label="t('addAccount.filePasswordLabel')" :rules="filePasswordRules" />
          <p class="text-caption text-medium-emphasis">
            {{ t('addAccount.filePasswordHint') }}
          </p>
        </template>
        <p v-else class="text-caption text-medium-emphasis">
          {{ t('addAccount.noPasswordHint') }}
        </p>

        <v-btn color="primary" block class="mt-2" :disabled="!formValid" :loading="busy" @click="submit">{{ t('addAccount.submit') }}</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
