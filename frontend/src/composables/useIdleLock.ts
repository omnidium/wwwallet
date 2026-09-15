import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'

const IDLE_LOCK_MS = 5 * 60 * 1000
const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const
// Wall-clock deltas rather than a single long-lived timer, since browsers
// throttle/pause timers in backgrounded tabs — a naive 5-minute setTimeout
// might not fire promptly right when it matters (someone re-opening the tab
// after walking away). Polling is cheap and self-corrects on every check.
const POLL_MS = 15_000

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
    if (Date.now() - lastActivity >= IDLE_LOCK_MS) {
      vault.lock()
      router.push('/')
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
    intervalId = setInterval(checkIdle, POLL_MS)
  })

  onUnmounted(() => {
    for (const event of ACTIVITY_EVENTS) window.removeEventListener(event, noteActivity)
    document.removeEventListener('visibilitychange', checkIdle)
    clearInterval(intervalId)
  })
}
