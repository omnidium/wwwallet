import { onUnmounted, watch, type Ref } from 'vue'

const DEFAULT_THRESHOLD_PX = 200

/**
 * Calls `onLoadMore` whenever the given scrollable element — or the whole
 * page, if `elementRef` is omitted — is scrolled within `thresholdPx` of its
 * bottom edge. Purely a scroll-position detector: re-entrancy guards and
 * "is there actually more to load" checks are the caller's job (see
 * `chainData.isLoadingMore`/`hasMoreTransactions`).
 *
 * `elementRef` is watched rather than bound once on mount, since the target
 * element is often behind a `v-if` (e.g. AccountCard's transaction list only
 * exists once expanded) and won't be there yet at mount time.
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  elementRef?: Ref<HTMLElement | null>,
  thresholdPx = DEFAULT_THRESHOLD_PX,
): void {
  function handleScroll() {
    const el = elementRef?.value
    const scrollTop = el ? el.scrollTop : window.scrollY
    const clientHeight = el ? el.clientHeight : window.innerHeight
    const scrollHeight = el ? el.scrollHeight : document.documentElement.scrollHeight
    if (scrollHeight - (scrollTop + clientHeight) < thresholdPx) onLoadMore()
  }

  let attachedTo: EventTarget | null = null
  function attach(target: EventTarget) {
    if (attachedTo === target) return
    attachedTo?.removeEventListener('scroll', handleScroll)
    attachedTo = target
    target.addEventListener('scroll', handleScroll, { passive: true })
  }

  if (elementRef) {
    watch(elementRef, (el) => attach(el ?? window), { immediate: true })
  } else {
    attach(window)
  }

  onUnmounted(() => attachedTo?.removeEventListener('scroll', handleScroll))
}
