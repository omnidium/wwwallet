<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'

const { t } = useI18n()
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  'update:modelValue': [boolean]
  decoded: [string]
}>()

const videoEl = ref<HTMLVideoElement | null>(null)
const error = ref('')
let scanner: QrScanner | null = null

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      await nextTick()
      await startScanning()
    } else {
      stopScanning()
    }
  },
)

async function startScanning() {
  error.value = ''
  if (!videoEl.value) return
  try {
    scanner = new QrScanner(
      videoEl.value,
      (result) => {
        emit('decoded', result.data)
        close()
      },
      { highlightScanRegion: true, highlightCodeOutline: true },
    )
    await scanner.start()
  } catch {
    error.value = t('qrScanner.cameraError')
  }
}

function stopScanning() {
  scanner?.stop()
  scanner?.destroy()
  scanner = null
}

function close() {
  emit('update:modelValue', false)
}

onBeforeUnmount(stopScanning)
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="close" max-width="480">
    <v-card>
      <v-card-title>{{ t('qrScanner.title') }}</v-card-title>
      <v-card-text>
        <v-alert v-if="error" type="error" variant="tonal" class="mb-2">{{ error }}</v-alert>
        <video ref="videoEl" style="width: 100%" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">{{ t('common.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
