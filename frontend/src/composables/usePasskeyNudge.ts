import { computed, ref } from 'vue'
import { useVaultStore } from '@/stores/vault'
import { useQuickUnlock } from '@/composables/useQuickUnlock'
import { PASSKEY_NUDGE_INTERVAL_MS } from '@/config/appSettings'
import type { PasskeyLocation } from '@/services/webauthnLocal'

/**
 * Nudges towards setting up quick unlock on this device — a passkey, or an
 * unlock password where a passkey can't work (see useQuickUnlock) — instead
 * of typing the whole recovery phrase every time:
 * - a strong one (a dialog) right after a restore or a new account, the
 *   moments there's most at stake and quick unlock is most obviously missing;
 * - after that, a daily reminder on the accounts screen until it's set up,
 *   or the user ticks "don't show again".
 *
 * Kept in localStorage, not the vault: a passkey belongs to one device, so
 * whether to keep asking is per device too. Nothing in it is sensitive.
 */
interface NudgeState {
  strong?: boolean
  dismissedAt?: number
  optOut?: boolean
}

const STORAGE_KEY = 'wwwallet:passkeyNudge'

function read(): NudgeState {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as NudgeState
  } catch {
    return {}
  }
}

// Module-level, so every place showing or triggering a nudge shares it.
const state = ref<NudgeState>(read())

function update(patch: NudgeState) {
  state.value = { ...state.value, ...patch }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
  } catch {
    // Storage unavailable: the nudge state just lasts this session.
  }
}

/** After a restore or a new account — see stores/vault.ts and stores/accounts.ts. */
export function requestStrongPasskeyNudge() {
  update({ strong: true })
}

/** Called after an explicit "skip" elsewhere (vault setup), so the daily reminder starts tomorrow. */
export function deferPasskeyNudge() {
  update({ dismissedAt: Date.now() })
}

/** For deleteFromDevice: a fresh start asks afresh. */
export function resetPasskeyNudge() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing stored to remove.
  }
  state.value = {}
}

export function usePasskeyNudge() {
  const vault = useVaultStore()
  const quick = useQuickUnlock()

  // Any quick unlock will do — a passkey, or a password where one can't work.
  const wanted = computed(
    () => vault.isUnlocked && !vault.hasPasskey && !vault.hasPassword && !state.value.optOut,
  )
  const showStrong = computed(() => wanted.value && !!state.value.strong)
  const showDaily = computed(
    () =>
      wanted.value &&
      !state.value.strong &&
      Date.now() - (state.value.dismissedAt ?? 0) >= PASSKEY_NUDGE_INTERVAL_MS,
  )

  /**
   * What to offer: a passkey on this device; a phone/security-key passkey
   * (or a password) once this device's own authenticator is known to lack
   * PRF; or only a password where the browser can't do passkeys at all.
   */
  const mode = computed<'passkey' | 'alternatives' | 'password'>(() => {
    if (!quick.passkeyPossible.value) return 'password'
    return quick.platformLacksPrf.value ? 'alternatives' : 'passkey'
  })

  function dismissStrong() {
    update({ strong: false, dismissedAt: Date.now() })
  }

  function dismissDaily(dontShowAgain: boolean) {
    update({ dismissedAt: Date.now(), optOut: dontShowAgain || undefined })
  }

  async function setUpPasskey(where?: PasskeyLocation) {
    if (await quick.setUpPasskey(where)) update({ strong: false })
  }

  /** After quick unlock was set up some other way (UnlockPasswordDialog, PasskeyAlternatives). */
  function quickUnlockSet() {
    update({ strong: false })
  }

  return {
    showStrong,
    showDaily,
    mode,
    phonePossible: quick.phonePossible,
    busy: quick.busy,
    dismissStrong,
    dismissDaily,
    setUpPasskey,
    quickUnlockSet,
  }
}
