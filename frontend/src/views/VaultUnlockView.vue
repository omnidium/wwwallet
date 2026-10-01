<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import { availableUnlockMethods } from '@/crypto/vault'
import { isValidRecoveryMnemonic, normalizeMnemonic } from '@/services/mnemonic'
import { getLastActivityAt } from '@/services/lastActivity'
import { AUTO_LOCK_MS } from '@/config/appSettings'
import { displayErrorMessage } from '@/services/errors'
import FavouritesList from '@/components/FavouritesList.vue'

const { t } = useI18n({ useScope: 'global' })
const vault = useVaultStore()
const messages = useMessagesStore()
const router = useRouter()

const recoveryPhrase = ref('')
const showRecoveryPhraseField = ref(false)
const hasPasskeyWrap = ref(false)
const busy = ref(false)

const recoveryPhraseRules = [
  (v: string) => !v || isValidRecoveryMnemonic(v) || t('validation.recoveryPhraseFormat'),
]

onMounted(async () => {
  const methods = await availableUnlockMethods()
  hasPasskeyWrap.value = methods.includes('passkeyPrf')
  if (!hasPasskeyWrap.value) {
    // No quick-unlock method is set up — the recovery phrase is the only option, so show it directly.
    showRecoveryPhraseField.value = true
    return
  }
  const lastActivityAt = getLastActivityAt()
  // Landing here shortly after real activity (e.g. a plain page refresh)
  // isn't the same as coming back after a genuine absence — fire the
  // passkey prompt immediately instead of waiting for a manual tap, using
  // the same grace period as the idle-lock timeout itself. This still
  // requires the actual biometric gesture; it only skips a redundant click.
  // An explicit "Lock now" clears the persisted timestamp precisely so it
  // doesn't trigger this.
  if (lastActivityAt !== null && Date.now() - lastActivityAt < AUTO_LOCK_MS) {
    await submitPasskey()
  }
})

async function submitRecoveryPhrase() {
  busy.value = true
  try {
    await vault.unlockWithMnemonic(normalizeMnemonic(recoveryPhrase.value))
    router.push('/')
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}

async function submitPasskey() {
  busy.value = true
  try {
    await vault.unlockWithPasskey()
    router.push('/')
  } catch (err) {
    messages.push(displayErrorMessage(err), 'error')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title>{{ t('vaultUnlock.title') }}</v-card-title>

      <v-card-text v-if="hasPasskeyWrap">
        <v-btn color="primary" block :loading="busy" prepend-icon="mdi-fingerprint" @click="submitPasskey">
          {{ t('vaultUnlock.unlockWithPasskey') }}
        </v-btn>
      </v-card-text>

      <template v-if="showRecoveryPhraseField">
        <v-card-text>
          <v-textarea v-model="recoveryPhrase" :label="t('vaultUnlock.recoveryPhraseLabel')" rows="2" auto-grow
            autofocus :rules="recoveryPhraseRules" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block :loading="busy" @click="submitRecoveryPhrase">{{ t('vaultUnlock.unlock')
          }}</v-btn>
        </v-card-actions>
      </template>
      <v-card-actions v-else>
        <v-btn variant="text" size="small" block @click="showRecoveryPhraseField = true">
          {{ t('vaultUnlock.useRecoveryInstead') }}
        </v-btn>
      </v-card-actions>

      <FavouritesList class="px-4 pb-1 pt-2" />
    </v-card>
  </v-container>
</template>
