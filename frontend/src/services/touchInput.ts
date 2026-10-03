/**
 * True on a touch-first device (phones, most tablets) — where focusing a text
 * field raises the on-screen keyboard. A picker with a search box opens
 * without focusing it there: the keyboard would cover half the list before
 * it's been seen. Same check as the website's SelectMenu.
 */
export function isTouchFirst(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches
}
