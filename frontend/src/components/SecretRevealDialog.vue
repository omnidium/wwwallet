<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { passkeyWrapMeta, unlockWithMnemonic as verifyMnemonic } from '@/crypto/vault'
import { unlockPasskeyPrfSecret } from '@/services/webauthnLocal'
import { hasLocalPasskey } from '@/services/webauthnLocal'
import { isValidRecoveryMnemonic, normalizeMnemonic } from '@/services/mnemonic'
import { copyWithAutoClear } from '@/services/clipboard'
import { useMessagesStore } from '@/stores/messages'
import AppTooltip from '@/components/AppTooltip.vue'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

const props = defineProps<{
  modelValue: boolean
  /** Dialog title, e.g. "View private key" — an action-phrased label. */
  title: string
  /** Which secret it is — picks the warning, a whole sentence per kind (a
   *  noun dropped into one sentence can't agree with it in every language). */
  kind: 'privateKey' | 'mnemonic'
  secret: string
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n({ useScope: 'global' })
const messages = useMessagesStore()

type Stage = 'warning' | 'reauth' | 'reveal'
const stage = ref<Stage>('warning')
const hasPasskey = ref(false)
const reauthing = ref(false)
const reauthFailed = ref(false)
const recoveryPhrase = ref('')
const recoveryPhraseRules = [
  (v: string) => !v || isValidRecoveryMnemonic(v) || t('validation.recoveryPhraseFormat'),
]

watch(
  () => props.modelValue,
  async (open) => {
    if (!open) return
    stage.value = 'warning'
    reauthFailed.value = false
    recoveryPhrase.value = ''
    hasPasskey.value = await hasLocalPasskey()
  },
)

function close() {
  emit('update:modelValue', false)
}

async function proceedToReauth() {
  stage.value = 'reauth'
  if (hasPasskey.value) await tryPasskeyReauth()
}

async function tryPasskeyReauth() {
  reauthing.value = true
  reauthFailed.value = false
  try {
    const meta = await passkeyWrapMeta()
    if (!meta) throw new Error('no passkey')
    await unlockPasskeyPrfSecret(meta.credentialId, meta.prfSalt)
    stage.value = 'reveal'
  } catch {
    reauthFailed.value = true
  } finally {
    reauthing.value = false
  }
}

async function tryPhraseReauth() {
  reauthing.value = true
  reauthFailed.value = false
  try {
    await verifyMnemonic(normalizeMnemonic(recoveryPhrase.value))
    stage.value = 'reveal'
  } catch {
    reauthFailed.value = true
  } finally {
    reauthing.value = false
  }
}

async function copySecret() {
  try {
    await copyWithAutoClear(props.secret)
    messages.push(t('msg.recoveryPhrase.copied'), 'success')
  } catch {
    messages.push(t('msg.recoveryPhrase.copyFailed'), 'warning')
  }
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="480" @update:model-value="emit('update:modelValue', $event)">
    <v-card class="pa-4">
      <template v-if="stage === 'warning'">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>{{ kind === 'privateKey' ? t('secretReveal.warningPrivateKey') : t('secretReveal.warningMnemonic') }}</v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="close">{{ t('common.cancel') }}</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="proceedToReauth">{{ t('secretReveal.ok') }}</v-btn>
        </v-card-actions>
      </template>

      <template v-else-if="stage === 'reauth'">
        <v-card-title>{{ t('secretReveal.confirmIdentity') }}</v-card-title>
        <v-card-text v-if="hasPasskey">
          <p class="mb-2">{{ t('secretReveal.confirmWithPasskey') }}</p>
          <v-alert v-if="reauthFailed" type="error" variant="tonal" class="mb-2">{{ t('secretReveal.reauthFailed') }}</v-alert>
          <v-btn color="primary" block :loading="reauthing" prepend-icon="mdi-fingerprint" @click="tryPasskeyReauth">
            {{ t('secretReveal.tryAgain') }}
            <template #loader>
              <CircuitSpinner />
            </template>
          </v-btn>
        </v-card-text>
        <v-card-text v-else>
          <p class="mb-2">{{ t('secretReveal.confirmWithPhrase') }}</p>
          <v-textarea v-model="recoveryPhrase" :label="t('vaultUnlock.recoveryPhraseLabel')" rows="2" auto-grow :rules="recoveryPhraseRules" />
          <v-alert v-if="reauthFailed" type="error" variant="tonal" class="mb-2">{{ t('secretReveal.reauthFailed') }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="close">{{ t('common.cancel') }}</v-btn>
          <v-spacer />
          <v-btn v-if="!hasPasskey" color="primary" :loading="reauthing" @click="tryPhraseReauth">
            {{ t('secretReveal.ok') }}
            <template #loader>
              <CircuitSpinner />
            </template>
          </v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-center">
            <p class="secret-text">{{ secret }}</p>
            <AppTooltip :text="t('secretReveal.copy')">
              <template #default="{ activatorProps }">
                <v-icon v-bind="activatorProps" icon="mdi-content-copy" class="ml-2" role="button" :aria-label="t('secretReveal.copy')" @click="copySecret" />
              </template>
            </AppTooltip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="close">{{ t('common.close') }}</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>
