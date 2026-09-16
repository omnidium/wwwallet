import { ref } from 'vue'
import type { Router } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'

/**
 * Drag-to-transfer between the user's own accounts, matching the old app's
 * gesture: drag the transfer handle on one account card onto another. Built
 * on Pointer Events rather than native HTML5 drag-and-drop — this is a PWA
 * used on mobile, and HTML5 DnD has poor/no touch support, whereas pointer
 * capture works uniformly for mouse and touch.
 */
export function useDragToTransfer(router: Router) {
  const active = ref(false)
  const pickerOpen = ref(false)
  const hoveredAddress = ref<string | null>(null)
  const source = ref<WalletAccount | null>(null)
  const targets = ref<WalletAccount[]>([])

  function eligibleTargets(all: WalletAccount[], from: WalletAccount): WalletAccount[] {
    return all.filter((a) => a.chain === from.chain && a.visible && a.address !== from.address)
  }

  function goToSend(target: WalletAccount) {
    const from = source.value
    if (!from) return
    router.push(`/accounts/${from.chain}/${from.address}/send?to=${target.address}`)
  }

  let captureEl: HTMLElement | null = null
  let capturePointerId: number | null = null

  function reset() {
    if (captureEl && capturePointerId !== null) {
      captureEl.removeEventListener('pointermove', onPointerMove)
      captureEl.removeEventListener('pointerup', onPointerUp)
      captureEl.removeEventListener('pointercancel', onPointerUp)
      if (captureEl.hasPointerCapture(capturePointerId)) captureEl.releasePointerCapture(capturePointerId)
    }
    captureEl = null
    capturePointerId = null
    active.value = false
    pickerOpen.value = false
    hoveredAddress.value = null
    source.value = null
    targets.value = []
  }

  function onPointerMove(event: PointerEvent) {
    if (!active.value) return
    // Pointer capture routes events to captureEl regardless of screen
    // position, but elementFromPoint's hit-testing is unaffected by capture —
    // it just answers "what's visually at these coordinates."
    const el = document.elementFromPoint(event.clientX, event.clientY)
    hoveredAddress.value = el?.closest<HTMLElement>('[data-drop-address]')?.dataset.dropAddress ?? null
  }

  function onPointerUp() {
    if (active.value && hoveredAddress.value) {
      const target = targets.value.find((a) => a.address === hoveredAddress.value)
      if (target) goToSend(target)
    }
    reset()
  }

  function onPointerDown(event: PointerEvent, account: WalletAccount, siblings: WalletAccount[]) {
    const eligible = eligibleTargets(siblings, account)
    if (eligible.length === 0) return
    source.value = account
    targets.value = eligible

    const [onlyTarget] = eligible
    if (onlyTarget && eligible.length === 1) {
      // Exactly one possible destination — no drag or picker needed at all.
      goToSend(onlyTarget)
      reset()
      return
    }

    captureEl = event.target as HTMLElement
    capturePointerId = event.pointerId
    captureEl.setPointerCapture(event.pointerId)
    // Pointer capture keeps routing events to captureEl for this pointer no
    // matter where it physically moves — that's the whole reason this works
    // on touch, where the finger can leave the handle's bounds immediately.
    captureEl.addEventListener('pointermove', onPointerMove)
    captureEl.addEventListener('pointerup', onPointerUp)
    captureEl.addEventListener('pointercancel', onPointerUp)

    active.value = true
    pickerOpen.value = true
  }

  return { active, pickerOpen, hoveredAddress, targets, onPointerDown }
}
