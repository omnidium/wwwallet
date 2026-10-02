import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import type { Router } from 'vue-router'
import type { WalletAccount } from '@/stores/accounts'
import { TRANSFER_LONG_PRESS_MS } from '@/config/appSettings'
import { useDragToTransfer } from '../useDragToTransfer'

function account(address: string, label: string): WalletAccount {
  return { address, label, chain: 'ethereum', privateKey: '0x00', isDefault: false, visible: true, hasMnemonic: false }
}

const FROM = account('0xfrom', 'Main')
const OTHER = account('0xother', 'Savings')

// jsdom has no PointerEvent constructor, so a plain Event carrying the fields
// the composable reads stands in for one.
function pointer(type: string, init: Partial<PointerEvent> = {}): PointerEvent {
  return Object.assign(new Event(type, { cancelable: true }), {
    pointerId: 1, isPrimary: true, button: 0, clientX: 0, clientY: 0, ...init,
  }) as PointerEvent
}

describe('useDragToTransfer', () => {
  let push: Mock<Router['push']>
  let drag: ReturnType<typeof useDragToTransfer>
  let underPointer: Element | null

  beforeEach(() => {
    vi.useFakeTimers()
    push = vi.fn<Router['push']>()
    drag = useDragToTransfer({ push } as unknown as Router)
    underPointer = null
    document.elementFromPoint = () => underPointer
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function press(init: Partial<PointerEvent> = {}) {
    drag.onPointerDown(pointer('pointerdown', init), FROM, [FROM, OTHER], [])
  }

  function tile(address: string): Element {
    const el = document.createElement('div')
    el.dataset.dropAddress = address
    return el
  }

  it('opens Send empty on a short tap, without ever showing the picker', () => {
    press()
    vi.advanceTimersByTime(TRANSFER_LONG_PRESS_MS - 50)
    window.dispatchEvent(pointer('pointerup'))
    expect(drag.pickerOpen.value).toBe(false)
    expect(push).toHaveBeenCalledWith('/accounts/ethereum/0xfrom/send')
  })

  it('shows the picker on long press and prefills the account released over', () => {
    press()
    vi.advanceTimersByTime(TRANSFER_LONG_PRESS_MS)
    expect(drag.pickerOpen.value).toBe(true)
    underPointer = tile('0xother')
    window.dispatchEvent(pointer('pointermove', { clientX: 50, clientY: 80 }))
    expect(drag.hoveredAddress.value).toBe('0xother')
    window.dispatchEvent(pointer('pointerup', { clientX: 50, clientY: 80 }))
    expect(push).toHaveBeenCalledWith('/accounts/ethereum/0xfrom/send?to=0xother&toKind=account')
    expect(drag.pickerOpen.value).toBe(false)
  })

  it('opens Send empty when a long press is released away from any tile', () => {
    press()
    vi.advanceTimersByTime(TRANSFER_LONG_PRESS_MS)
    window.dispatchEvent(pointer('pointerup', { clientX: 5, clientY: 5 }))
    expect(push).toHaveBeenCalledWith('/accounts/ethereum/0xfrom/send')
  })

  it('opens the picker straight away once the pointer drags past the threshold', () => {
    press()
    window.dispatchEvent(pointer('pointermove', { clientX: 3, clientY: 3 }))
    expect(drag.pickerOpen.value).toBe(false)
    window.dispatchEvent(pointer('pointermove', { clientX: 30, clientY: 0 }))
    expect(drag.pickerOpen.value).toBe(true)
  })

  it('drops a press cancelled before the picker showed, without navigating', () => {
    press()
    window.dispatchEvent(pointer('pointercancel'))
    vi.advanceTimersByTime(TRANSFER_LONG_PRESS_MS)
    expect(drag.pickerOpen.value).toBe(false)
    expect(push).not.toHaveBeenCalled()
  })

  it('ignores secondary buttons and non-primary pointers', () => {
    press({ button: 2 })
    press({ isPrimary: false })
    expect(drag.active.value).toBe(false)
    window.dispatchEvent(pointer('pointerup'))
    expect(push).not.toHaveBeenCalled()
  })
})
