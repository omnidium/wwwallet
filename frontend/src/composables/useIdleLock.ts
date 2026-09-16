import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { AUTO_LOCK_MS, IDLE_POLL_MS } from '@/config/appSettings'

const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const

/**
 * Locks the vault after a period of no user interaction, so an unlocked
 * session left unattended on a shared or borrowed device doesn't stay open
 * indefinitely — until now, the only thing that ever re-locked it was
 * closing the tab.
 */
export function useIdleLock(): void {
  const vault = useVaultStore()
  const router = useRouter()

  let lastActivity = Date.now()
  let intervalId: ReturnType<typeof setInterval> | undefined

  function noteActivity() {
    lastActivity = Date.now()
  }

  function checkIdle() {
    if (!vault.isUnlocked) return
    if (Date.now() - lastActivity >= AUTO_LOCK_MS) {
      vault.lock()
      // Named route, not '/' — see the identical note in SettingsPanel.vue's
      // lockNow(): pushing '/' while already on '/' is a same-location no-op
      // in vue-router, so idle-locking from the accounts screen itself would
      // otherwise never actually navigate to the unlock screen.
      router.push({ name: 'vault-unlock' })
    }
  }

  watch(
    () => vault.isUnlocked,
    (unlocked) => {
      if (unlocked) noteActivity()
    },
  )

  onMounted(() => {
    for (const event of ACTIVITY_EVENTS) window.addEventListener(event, noteActivity, { passive: true })
    document.addEventListener('visibilitychange', checkIdle)
    // Wall-clock deltas rather than a single long-lived timer, since browsers
    // throttle/pause timers in backgrounded tabs — a naive setTimeout for
    // AUTO_LOCK_MS might not fire promptly right when it matters (someone
    // re-opening the tab after walking away). Polling is cheap and
    // self-corrects on every check.
    intervalId = setInterval(checkIdle, IDLE_POLL_MS)
  })

  onUnmounted(() => {
    for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, noteActivity)
    document.removeEventListener('visibilitychange', checkIdle)
    clearInterval(intervalId)
  })
}
