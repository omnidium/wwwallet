import { ref } from 'vue'
import type { Router } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'
import type { Payee } from '@/stores/payees'
import { TRANSFER_LONG_PRESS_MS } from '@/config/appSettings'

// Movement (in CSS px) past which a press counts as a drag rather than a
// wobbly tap — and so opens the picker without waiting for the long press.
const DRAG_START_PX = 10

export interface TransferTarget {
  kind: 'account' | 'payee'
  address: string
  label: string
}

/**
 * Send icon gestures on an account card:
 *  - tap/click → open Send with nothing prefilled
 *  - long press (or starting to drag) → show the target picker; releasing
 *    over an account/payee tile prefills Send with it, releasing anywhere
 *    else opens Send empty
 *
 * Built on Pointer Events rather than native HTML5 drag-and-drop — this is a
 * PWA used on mobile, and HTML5 DnD has poor/no touch support. Move/up/cancel
 * are listened for on window rather than on the pressed icon itself, so the
 * gesture still finishes if the card re-renders mid-press (e.g. an
 * auto-refresh swapping the icon element out from under the finger).
 */
export function useDragToTransfer(router: Router) {
  const active = ref(false)
  const pickerOpen = ref(false)
  const hoveredAddress = ref<string | null>(null)
  const source = ref<WalletAccount | null>(null)
  const targets = ref<TransferTarget[]>([])

  function eligibleTargets(accounts: WalletAccount[], payees: Payee[], from: WalletAccount): TransferTarget[] {
    const accountTargets: TransferTarget[] = accounts
      .filter((a) => a.chain === from.chain && a.visible && a.address !== from.address)
      .map((a) => ({ kind: 'account', address: a.address, label: a.label }))
    const payeeTargets: TransferTarget[] = payees
      .filter((p) => p.chain === from.chain)
      .map((p) => ({ kind: 'payee', address: p.address, label: p.label }))
    return [...accountTargets, ...payeeTargets]
  }

  /** No target means "open Send with nothing prefilled". */
  function goToSend(target?: TransferTarget) {
    const from = source.value
    if (!from) return
    const query = target ? `?to=${target.address}&toKind=${target.kind}` : ''
    router.push(`/accounts/${from.chain}/${from.address}/send${query}`)
  }

  let pointerId: number | null = null
  let startX = 0
  let startY = 0
  let longPressTimer: ReturnType<typeof setTimeout> | null = null

  function reset() {
    if (longPressTimer !== null) clearTimeout(longPressTimer)
    longPressTimer = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerCancel)
    pointerId = null
    active.value = false
    pickerOpen.value = false
    hoveredAddress.value = null
    source.value = null
    targets.value = []
  }

  function openPicker() {
    if (longPressTimer !== null) clearTimeout(longPressTimer)
    longPressTimer = null
    if (pickerOpen.value) return
    // Nothing to pick from — release will just open Send empty.
    if (targets.value.length === 0) return
    pickerOpen.value = true
    if (navigator.vibrate) navigator.vibrate(10)
  }

  function updateHovered(event: PointerEvent) {
    // elementFromPoint answers "what's visually at these coordinates",
    // independent of which element the pointer events are delivered to.
    const el = document.elementFromPoint(event.clientX, event.clientY)
    hoveredAddress.value = el?.closest<HTMLElement>('[data-drop-address]')?.dataset.dropAddress ?? null
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    if (!pickerOpen.value) {
      // Dragging off without waiting for the long press is just as clearly
      // "pick a target" — start it now rather than reading it as a tap.
      if (Math.hypot(event.clientX - startX, event.clientY - startY) < DRAG_START_PX) return
      openPicker()
    }
    updateHovered(event)
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    let target: TransferTarget | undefined
    if (pickerOpen.value) {
      updateHovered(event)
      target = targets.value.find((t) => t.address === hoveredAddress.value)
    }
    // A short tap, or a release that isn't over a tile, both open Send empty.
    goToSend(target)
    reset()
  }

  /**
   * The browser taking the pointer away (system gesture, incoming call…).
   * Before the picker showed, the press is simply dropped; once it's up the
   * user was clearly heading for Send, so that still opens — empty.
   */
  function onPointerCancel(event: PointerEvent) {
    if (event.pointerId !== pointerId) return
    if (pickerOpen.value) goToSend()
    reset()
  }

  function onPointerDown(event: PointerEvent, account: WalletAccount, accounts: WalletAccount[], payees: Payee[]) {
    // Primary button / first finger only — a right-click or a second finger
    // landing mid-gesture shouldn't start (or restart) one.
    if (!event.isPrimary || event.button !== 0 || active.value) return
    // Stops mouse text-selection and focus juggling starting from the icon.
    event.preventDefault()

    source.value = account
    targets.value = eligibleTargets(accounts, payees, account)
    pointerId = event.pointerId
    startX = event.clientX
    startY = event.clientY
    active.value = true

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerCancel)
    longPressTimer = setTimeout(openPicker, TRANSFER_LONG_PRESS_MS)
  }

  return { active, pickerOpen, hoveredAddress, targets, onPointerDown }
}
