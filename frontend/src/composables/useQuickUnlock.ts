import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVaultStore } from '@/stores/vault'
import { useMessagesStore } from '@/stores/messages'
import {
  PrfNotSupportedError,
  phoneAvailability,
  prfAvailability,
  type CapabilityAnswer,
  type PasskeyLocation,
} from '@/services/webauthnLocal'
import { displayErrorMessage } from '@/services/errors'

/**
 * Quick unlock — a way in without typing the whole recovery phrase — in
 * order of preference:
 * 1. a passkey on this device's own authenticator (Face ID / Touch ID / PIN);
 * 2. a passkey on a phone (scanning a QR code — where the browser can) or a
 *    hardware security key, when this device's own authenticator lacks PRF;
 * 3. an unlock password, where no passkey can work at all.
 * Which of those to offer is shared by every place that offers them.
 */

// Module-level: the browser's answer doesn't change within a session.
const prf = ref<CapabilityAnswer>('unknown')
const phone = ref<CapabilityAnswer>('unknown')
let checking: Promise<void> | null = null

// Remembered per device: found out by a failed registration, and true until
// the browser or OS changes — not worth re-discovering by failing again.
const PLATFORM_KEY = 'wwwallet:platformLacksPrf'
// Storage can be unavailable (some private modes, tests); then it's just not remembered.
function readFlag(): boolean {
  try {
    return localStorage.getItem(PLATFORM_KEY) === '1'
  } catch {
    return false
  }
}
const platformLacksPrf = ref(readFlag())

export function useQuickUnlock() {
  const { t } = useI18n({ useScope: 'global' })
  const vault = useVaultStore()
  const messages = useMessagesStore()
  const busy = ref(false)

  checking ??= Promise.all([prfAvailability(), phoneAvailability()]).then(([prfAnswer, phoneAnswer]) => {
    prf.value = prfAnswer
    phone.value = phoneAnswer
  })

  /** False only when the browser says outright it can't do PRF. */
  const passkeyPossible = computed(() => prf.value !== 'unsupported')
  /** Hidden only when the browser says outright it can't use a phone's passkey. */
  const phonePossible = computed(() => passkeyPossible.value && phone.value !== 'unsupported')

  /** Resolves true once a passkey is set up. */
  async function setUpPasskey(where: PasskeyLocation = 'device'): Promise<boolean> {
    busy.value = true
    try {
      await vault.registerPasskey('wwwallet', where)
      messages.push(t('msg.passkey.ready'), 'success')
      return true
    } catch (err) {
      if (err instanceof PrfNotSupportedError && where === 'device') {
        platformLacksPrf.value = true
        try {
          localStorage.setItem(PLATFORM_KEY, '1')
        } catch {
          // Not remembered across reloads — harmless.
        }
      }
      messages.push(displayErrorMessage(err), err instanceof PrfNotSupportedError ? 'warning' : 'error')
      return false
    } finally {
      busy.value = false
    }
  }

  return { prf, passkeyPossible, phonePossible, platformLacksPrf, busy, setUpPasskey }
}
