<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePayeesStore, type Payee } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { isValidAddress } from '@/services/wallet'
import { truncateAddress } from '@/services/format'
import type { ChainSlug } from '@/services/api'
import AppTooltip from '@/components/AppTooltip.vue'
import QrScannerDialog from '@/components/QrScannerDialog.vue'

const { t } = useI18n({ useScope: 'global' })
const payees = usePayeesStore()
const messages = useMessagesStore()

const dialogOpen = ref(false)
const scannerOpen = ref(false)
const formValid = ref(false)
const editingId = ref<string | null>(null)
const label = ref('')
const address = ref('')
const chain = ref<ChainSlug>('ethereum')
const chains: ChainSlug[] = ['ethereum', 'polygon', 'arbitrum', 'base', 'optimism']

const labelRules = [(v: string) => !!v.trim() || t('validation.labelRequired')]
const addressRules = [(v: string) => isValidAddress(v.trim()) || t('validation.validAddress')]

function openDialog() {
  editingId.value = null
  label.value = ''
  address.value = ''
  chain.value = 'ethereum'
  dialogOpen.value = true
}

function openEditDialog(payee: Payee) {
  editingId.value = payee.id
  label.value = payee.label
  address.value = payee.address
  chain.value = payee.chain
  dialogOpen.value = true
}

/** Handles both a bare address and an EIP-681 "ethereum:0x...@chainId" URI. */
function onQrDecoded(data: string) {
  const match = data.match(/0x[a-fA-F0-9]{40}/)
  if (!match) {
    messages.push(t('msg.qr.noAddress'), 'warning')
    return
  }
  address.value = match[0]
}

async function save() {
  if (!formValid.value) return
  const patch = { label: label.value.trim(), address: address.value.trim(), chain: chain.value }
  if (editingId.value) {
    await payees.updatePayee(editingId.value, patch)
  } else {
    await payees.addPayee({ id: crypto.randomUUID(), ...patch })
  }
  dialogOpen.value = false
}

async function remove(id: string) {
  await payees.removePayee(id)
}
</script>

<template>
  <div class="settings-pane">
    <div class="pane-header d-flex align-center flex-wrap ga-4">
      <div class="d-flex align-center ga-3">
        <v-icon icon="mdi-account" size="28" />
        <h1 class="text-h5">{{ t('payees.title') }}</h1>
      </div>
      <v-spacer />
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog">{{ t('payees.add') }}</v-btn>
    </div>

    <v-alert v-if="payees.payees.length === 0" type="info" variant="tonal" class="mt-6">
      {{ t('payees.empty') }}
    </v-alert>
    <v-list v-else class="payees-list mt-4" bg-color="transparent">
      <v-list-item v-for="payee in payees.payees" :key="payee.id" :title="payee.label"
        :subtitle="`${truncateAddress(payee.address)} (${payee.chain})`" class="py-3"
        @click="openEditDialog(payee)">
        <template #append>
          <AppTooltip :text="t('payees.deleteAria', { label: payee.label })">
            <template #default="{ activatorProps }">
              <v-btn v-bind="activatorProps" icon="mdi-delete" variant="text" :aria-label="t('payees.deleteAria', { label: payee.label })" @click.stop="remove(payee.id)" />
            </template>
          </AppTooltip>
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogOpen" max-width="480">
      <v-card class="pa-4">
        <v-card-title>{{ editingId ? t('payees.edit') : t('payees.add') }}</v-card-title>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field v-model="label" :label="t('payees.labelField')" :rules="labelRules" />
            <v-text-field v-model="address" :label="t('payees.addressField')" :rules="addressRules">
              <template #append-inner>
                <AppTooltip :text="t('send.scanQrAria')">
                  <template #default="{ activatorProps }">
                    <v-icon v-bind="activatorProps" icon="mdi-qrcode-scan" role="button"
                      :aria-label="t('send.scanQrAria')" @click="scannerOpen = true" />
                  </template>
                </AppTooltip>
              </template>
            </v-text-field>
            <v-select v-model="chain" :items="chains" :label="t('common.chain')" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogOpen = false">{{ t('common.cancel') }}</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="save">{{ t('common.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />
  </div>
</template>
