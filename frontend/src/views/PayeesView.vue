<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePayeesStore, type Payee } from '@/stores/payees'
import { useMessagesStore } from '@/stores/messages'
import { addressInText, parseAddress } from '@/services/wallet'
import { truncateAddress } from '@/services/format'
import { chainItems } from '@/services/chainItems'
import type { ChainSlug } from '@/services/api'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import AppTooltip from '@/components/AppTooltip.vue'
import AppSelect from '@/components/AppSelect.vue'
import QrScannerDialog from '@/components/QrScannerDialog.vue'

const { t } = useI18n({ useScope: 'global' })
const payees = usePayeesStore()
const messages = useMessagesStore()

const dialogOpen = ref(false)
const scannerOpen = ref(false)
const editingId = ref<string | null>(null)
const label = ref('')
const address = ref('')
const chain = ref<ChainSlug>('ethereum')
// Errors only once a field has been left (or Save tried), not while typing it.
const touched = ref({ label: false, address: false })

const networkItems = chainItems()

const labelError = computed(() => (touched.value.label && !label.value.trim() ? t('validation.labelRequired') : null))
const addressError = computed(() =>
  touched.value.address && !parseAddress(address.value) ? t('validation.validAddress') : null,
)
const formValid = computed(() => !!label.value.trim() && !!parseAddress(address.value))

function openForm(payee?: Payee) {
  editingId.value = payee?.id ?? null
  label.value = payee?.label ?? ''
  address.value = payee?.address ?? ''
  chain.value = payee?.chain ?? 'ethereum'
  touched.value = { label: false, address: false }
  dialogOpen.value = true
}

/** Handles a bare address, an EIP-681 "ethereum:0x...@chainId" URI, or Ronin's "ronin:…". */
function onQrDecoded(data: string) {
  const scanned = addressInText(data)
  if (!scanned) {
    messages.push(t('msg.qr.noAddress'), 'warning')
    return
  }
  address.value = scanned
  touched.value.address = true
}

async function save() {
  touched.value = { label: true, address: true }
  if (!formValid.value) return
  const patch = { label: label.value.trim(), address: parseAddress(address.value)!, chain: chain.value }
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
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openForm()">{{ t('payees.add') }}</v-btn>
    </div>

    <v-alert v-if="payees.payees.length === 0" type="info" variant="tonal" class="mt-6">
      {{ t('payees.empty') }}
    </v-alert>
    <v-list v-else class="payees-list mt-4" bg-color="transparent">
      <v-list-item v-for="payee in payees.payees" :key="payee.id" class="py-3" @click="openForm(payee)">
        <template #prepend>
          <AppTooltip :text="NATIVE_ASSETS[payee.chain].networkName">
            <template #default="{ activatorProps }">
              <img v-bind="activatorProps" :src="`/chains/${payee.chain}.svg`" :alt="NATIVE_ASSETS[payee.chain].networkName"
                class="payee-chain-logo" />
            </template>
          </AppTooltip>
        </template>
        <v-list-item-title class="font-weight-medium">{{ payee.label }}</v-list-item-title>
        <v-list-item-subtitle class="payee-address">{{ truncateAddress(payee.address) }}</v-list-item-subtitle>
        <template #append>
          <AppTooltip :text="t('payees.deleteAria', { label: payee.label })">
            <template #default="{ activatorProps }">
              <v-btn v-bind="activatorProps" icon="mdi-delete-outline" variant="text"
                :aria-label="t('payees.deleteAria', { label: payee.label })" @click.stop="remove(payee.id)" />
            </template>
          </AppTooltip>
        </template>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogOpen" max-width="520">
      <v-card class="payee-form">
        <header class="payee-form-head">
          <h2>{{ editingId ? t('payees.edit') : t('payees.add') }}</h2>
          <button type="button" class="close-btn" :aria-label="t('common.close')" @click="dialogOpen = false">
            <i class="mdi mdi-close" aria-hidden="true"></i>
          </button>
        </header>

        <form class="payee-form-body" novalidate @submit.prevent="save">
          <section class="xfer-leg">
            <label class="field-label" for="payee-label">{{ t('payees.labelField') }}</label>
            <input id="payee-label" v-model="label" class="xfer-text-input" :class="{ 'xfer-text-input--error': labelError }"
              autocomplete="off" :placeholder="t('payees.labelPlaceholder')" @blur="touched.label = true" />
            <p v-if="labelError" class="xfer-field-error">{{ labelError }}</p>
          </section>

          <section class="xfer-leg">
            <div class="d-flex align-center">
              <label class="field-label mb-0" for="payee-address">{{ t('payees.addressField') }}</label>
              <AppTooltip :text="t('send.scanQrAria')">
                <template #default="{ activatorProps }">
                  <v-btn v-bind="activatorProps" icon="mdi-qrcode-scan" variant="text" size="small" density="comfortable"
                    class="ml-auto" :aria-label="t('send.scanQrAria')" @click="scannerOpen = true" />
                </template>
              </AppTooltip>
            </div>
            <input id="payee-address" v-model="address" class="xfer-text-input xfer-text-input--mono"
              :class="{ 'xfer-text-input--error': addressError }" autocomplete="off" spellcheck="false"
              placeholder="0x…" @blur="touched.address = true" />
            <p v-if="addressError" class="xfer-field-error">{{ addressError }}</p>
          </section>

          <section class="xfer-leg">
            <span class="field-label">{{ t('common.chain') }}</span>
            <AppSelect v-model="chain" :items="networkItems" :label="t('common.chain')" block />
            <p class="xfer-field-hint">
              <v-icon icon="mdi-information-outline" size="16" /> {{ t('payees.chainHint') }}
            </p>
          </section>

          <div class="payee-form-actions">
            <v-btn variant="text" size="large" @click="dialogOpen = false">{{ t('common.cancel') }}</v-btn>
            <v-btn type="submit" color="primary" size="large" class="flex-grow-1">{{ t('common.save') }}</v-btn>
          </div>
        </form>
      </v-card>
    </v-dialog>

    <QrScannerDialog v-model="scannerOpen" @decoded="onQrDecoded" />
  </div>
</template>
