import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { AUTO_LOCK_MS, IDLE_POLL_MS } from '@/config/appSettings'
import { getLastActivityAt, markActivityNow, clearLastActivity } from '@/services/lastActivity'

const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const

// Persisting on every single activity event would mean a synchronous
// localStorage write on every 'wheel' tick during a scroll gesture — this
// only needs to be accurate to a couple of seconds, so writes are throttled.
const PERSIST_THROTTLE_MS = 2_000

/**
 * Locks the vault after a period of no user interaction, so an unlocked
 * session left unattended on a shared or borrowed device doesn't stay open
 * indefinitely — until now, the only thing that ever re-locked it was
 * closing the tab.
 */
export function useIdleLock(): void {
  const vault = useVaultStore()
  const router = useRouter()

  let lastActivity = getLastActivityAt() ?? Date.now()
  let lastPersistedAt = 0
  let intervalId: ReturnType<typeof setInterval> | undefined

  function resetActivityClock() {
    lastActivity = Date.now()
    if (lastActivity - lastPersistedAt >= PERSIST_THROTTLE_MS) {
      markActivityNow()
      lastPersistedAt = lastActivity
    }
  }

  function checkIdle() {
    if (!vault.isUnlocked) return
    if (Date.now() - lastActivity >= AUTO_LOCK_MS) {
      vault.lock()
      clearLastActivity()
      // Named route, not '/' — see the identical note in SettingsPanel.vue's
      // lockNow(): pushing '/' while already on '/' is a same-location no-op
      // in vue-router, so idle-locking from the accounts screen itself would
      // otherwise never actually navigate to the unlock screen.
      router.push({ name: 'vault-unlock' })
    }
  }

  // A real interaction (click/keypress/etc.) means the tab is alive right
  // now — check first, using the *previous* lastActivity, before resetting
  // it. Without this, an interaction only ever pushed the clock forward and
  // never itself triggered the lock: if the poll interval or visibilitychange
  // had been throttled while the tab sat backgrounded past AUTO_LOCK_MS, nothing
  // locked it until the next poll tick happened to land — from the user's
  // side, the (stale, already-overdue) accounts screen would just sit there,
  // and only their own next click would finally surface the unlock screen.
  function noteActivity() {
    checkIdle()
    resetActivityClock()
  }

  watch(
    () => vault.isUnlocked,
    (unlocked) => {
      // Reset only — must not run checkIdle() here, since lastActivity is
      // still whatever it was before this unlock (possibly long stale),
      // which would immediately re-lock the vault it just unlocked.
      if (unlocked) resetActivityClock()
    },
  )

  onMounted(() => {
    for (const event of ACTIVITY_EVENTS) window.addEventListener(event, noteActivity, { passive: true })
    // visibilitychange/focus/pageshow: several distinct ways a browser can
    // signal "this tab is relevant again" (alt-tab, switching apps, bfcache
    // restore) — wired to the same immediate re-check so the lock is never
    // waiting on the next poll tick once the user is actually looking again.
    document.addEventListener('visibilitychange', checkIdle)
    window.addEventListener('focus', checkIdle)
    window.addEventListener('pageshow', checkIdle)
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
    window.removeEventListener('focus', checkIdle)
    window.removeEventListener('pageshow', checkIdle)
    clearInterval(intervalId)
  })
}
