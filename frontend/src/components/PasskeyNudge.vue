<script setup lang="ts">
import BrandText from '@shared/ui/BrandText.vue'
import { mergeProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppTooltip from '@/components/AppTooltip.vue'
import UnlockPasswordDialog from '@/components/UnlockPasswordDialog.vue'
import PasskeyAlternatives from '@/components/PasskeyAlternatives.vue'
import { usePasskeyNudge } from '@/composables/usePasskeyNudge'
import CircuitSpinner from '@/components/CircuitSpinner.vue'

// The accounts screen's quick-unlock nudges — see composables/usePasskeyNudge.ts
// for when each shows and what it offers. The daily one follows the backup
// reminder's look.
const { t } = useI18n({ useScope: 'global' })
const { showStrong, showDaily, mode, busy, dismissStrong, dismissDaily, setUpPasskey, quickUnlockSet } = usePasskeyNudge()
const dontShowAgain = ref(false)
const passwordDialogOpen = ref(false)
</script>

<template>
  <v-dialog :model-value="showStrong && !passwordDialogOpen" max-width="420" persistent>
    <v-card class="pa-2">
      <div class="d-flex justify-center pt-4">
        <v-icon :icon="mode === 'password' ? 'mdi-form-textbox-password' : 'mdi-fingerprint'" size="56" color="primary" />
      </div>
      <v-card-title class="text-center text-wrap">
        {{ mode === 'passkey' ? t('passkeyNudge.title') : t('quickUnlock.title') }}
      </v-card-title>
      <v-card-text>
        <template v-if="mode === 'passkey'">
          <p><BrandText :text="t('passkeyNudge.body')" /></p>
          <p class="text-caption text-medium-emphasis mt-3">{{ t('passkeyNudge.deviceOnly') }}</p>
        </template>
        <p v-else-if="mode === 'alternatives'"><BrandText :text="t('quickUnlock.platformLacksPrfBody')" /></p>
        <p v-else><BrandText :text="t('quickUnlock.passkeyUnavailableBody')" /></p>
      </v-card-text>
      <v-card-actions class="flex-column ga-2 px-4 pb-4">
        <template v-if="mode === 'passkey'">
          <v-btn color="primary" variant="flat" block prepend-icon="mdi-fingerprint" :loading="busy"
            @click="setUpPasskey()">
            {{ t('vaultSetup.enablePasskey') }}
            <template #loader>
              <CircuitSpinner />
            </template>
          </v-btn>
          <PasskeyAlternatives small @done="quickUnlockSet" />
        </template>
        <template v-else-if="mode === 'alternatives'">
          <PasskeyAlternatives variant="outlined" @done="quickUnlockSet" />
          <v-btn variant="outlined" block :disabled="busy" @click="passwordDialogOpen = true">
            {{ t('quickUnlock.setPassword') }}
          </v-btn>
        </template>
        <v-btn v-else color="primary" variant="flat" block prepend-icon="mdi-form-textbox-password"
          @click="passwordDialogOpen = true">
          {{ t('quickUnlock.setPassword') }}
        </v-btn>
        <v-btn variant="text" block :disabled="busy" @click="dismissStrong">{{ t('passkeyNudge.notNow') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-alert v-if="showDaily" type="warning" variant="tonal"
    :icon="mode === 'password' ? 'mdi-form-textbox-password' : 'mdi-fingerprint'" class="mb-4 backup-reminder">
    {{ mode === 'passkey' ? t('passkeyNudge.reminder') : t('quickUnlock.reminder') }}
    <div class="d-flex align-center flex-wrap ga-4 mt-3">
      <v-btn v-if="mode === 'passkey'" variant="outlined" :loading="busy" @click="setUpPasskey()">
        {{ t('vaultSetup.enablePasskey') }}
        <template #loader>
          <CircuitSpinner />
        </template>
      </v-btn>
      <PasskeyAlternatives v-else-if="mode === 'alternatives'" variant="outlined" :block="false"
        @done="quickUnlockSet" />
      <v-btn v-if="mode !== 'passkey'" variant="outlined" :disabled="busy" @click="passwordDialogOpen = true">
        {{ t('quickUnlock.setPassword') }}
      </v-btn>
      <v-checkbox v-model="dontShowAgain" :label="t('passkeyNudge.dontShowAgain')" density="compact" hide-details />
    </div>
    <template #close="{ props: closeProps }">
      <AppTooltip :text="t('common.close')">
        <template #default="{ activatorProps }">
          <v-btn v-bind="mergeProps(closeProps, activatorProps)" icon="mdi-close" variant="text" size="small"
            density="comfortable" :aria-label="t('common.close')" @click="dismissDaily(dontShowAgain)" />
        </template>
      </AppTooltip>
    </template>
  </v-alert>

  <UnlockPasswordDialog v-model="passwordDialogOpen" @saved="quickUnlockSet" />
</template>
