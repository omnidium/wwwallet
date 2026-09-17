import { ref } from 'vue'
import type { Router } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'
import type { Payee } from '@/stores/payees'

export interface TransferTarget {
  kind: 'account' | 'payee'
  address: string
  label: string
}

/**
 * Drag-to-transfer between the user's own accounts or a payee: press the
 * Send icon on one account card, drag onto another account or payee tile,
 * release to drop. Built on Pointer Events rather than native HTML5
 * drag-and-drop — this is a PWA used on mobile, and HTML5 DnD has poor/no
 * touch support, whereas pointer capture works uniformly for mouse and touch.
 *
 * Strictly press-to-start, release-to-finish: pointerdown always begins
 * tracking (no long-press delay), and whatever's under the pointer at
 * release decides the outcome — hovering a tile prefills Send with that
 * target, releasing anywhere else just opens Send empty.
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

  /** No target means "open Send with nothing prefilled" — the same outcome a plain click always had. */
  function goToSend(target?: TransferTarget) {
    const from = source.value
    if (!from) return
    const query = target ? `?to=${target.address}&toKind=${target.kind}` : ''
    router.push(`/accounts/${from.chain}/${from.address}/send${query}`)
  }

  let captureEl: HTMLElement | null = null
  let capturePointerId: number | null = null

  function reset() {
    if (captureEl && capturePointerId !== null) {
      captureEl.removeEventListener('pointermove', onPointerMove)
      captureEl.removeEventListener('pointerup', onPointerUp)
      captureEl.removeEventListener('pointercancel', onPointerCancel)
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
    // Always finishes the gesture on release — the only thing that decides
    // whether Send opens prefilled is what's under the pointer right now.
    const target = hoveredAddress.value
      ? targets.value.find((t) => t.address === hoveredAddress.value)
      : undefined
    goToSend(target)
    reset()
  }

  /** A cancelled gesture (e.g. the browser claims it for scrolling) is aborted outright, not treated as a drop. */
  function onPointerCancel() {
    reset()
  }

  function onPointerDown(event: PointerEvent, account: WalletAccount, accounts: WalletAccount[], payees: Payee[]) {
    source.value = account
    targets.value = eligibleTargets(accounts, payees, account)

    captureEl = event.target as HTMLElement
    capturePointerId = event.pointerId
    captureEl.setPointerCapture(event.pointerId)
    // Pointer capture keeps routing events to captureEl for this pointer no
    // matter where it physically moves — that's the whole reason this works
    // on touch, where the finger can leave the handle's bounds immediately.
    captureEl.addEventListener('pointermove', onPointerMove)
    captureEl.addEventListener('pointerup', onPointerUp)
    captureEl.addEventListener('pointercancel', onPointerCancel)

    active.value = true
    // Nothing to show a picker for if there's nowhere else to send — release
    // just opens Send empty in that case, same as targets.value staying empty.
    if (targets.value.length > 0) pickerOpen.value = true
  }

  return { active, pickerOpen, hoveredAddress, targets, onPointerDown }
}
