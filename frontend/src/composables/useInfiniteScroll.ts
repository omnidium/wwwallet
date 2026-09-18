import { onUnmounted, watch, type Ref } from 'vue'

const DEFAULT_THRESHOLD_PX = 200

/**
 * Calls `onLoadMore` whenever the given scrollable element — or the whole
 * page, if `elementRef` is omitted — is scrolled within `thresholdPx` of its
 * bottom edge, OR whenever it isn't tall enough to scroll at all. That
 * second case matters as much as the first: a first page of results often
 * doesn't fill (let alone overflow) its container, especially once a caller
 * filters it down (e.g. AccountCard's transaction list only shows
 * native-asset rows) — with only a 'scroll' listener, a container that never
 * becomes scrollable would never fire a single scroll event, so more data
 * would never load no matter how long it sits there below the fold. A
 * ResizeObserver on the content re-runs the same check after every render
 * that changes its size (a loaded page, a toggled filter), so the check
 * keeps re-firing until the container is actually scrollable — or the
 * caller's own `onLoadMore` reports (via its own bookkeeping) there's
 * nothing left to fetch.
 *
 * Re-entrancy guards and "is there actually more to load" checks are the
 * caller's job (see `chainData.isLoadingMore`/`hasMoreTransactions`) — this
 * only detects when a load attempt is warranted.
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
  function check() {
    const el = elementRef?.value
    const scrollTop = el ? el.scrollTop : window.scrollY
    const clientHeight = el ? el.clientHeight : window.innerHeight
    const scrollHeight = el ? el.scrollHeight : document.documentElement.scrollHeight
    if (scrollHeight - (scrollTop + clientHeight) < thresholdPx) onLoadMore()
  }

  let attachedTo: Window | HTMLElement | null = null
  let resizeObserver: ResizeObserver | null = null
  function attach(target: Window | HTMLElement) {
    if (attachedTo === target) return
    attachedTo?.removeEventListener('scroll', check)
    resizeObserver?.disconnect()
    attachedTo = target
    target.addEventListener('scroll', check, { passive: true })
    resizeObserver = new ResizeObserver(check)
    resizeObserver.observe(target instanceof HTMLElement ? target : document.documentElement)
    check()
  }

  if (elementRef) {
    watch(elementRef, (el) => attach(el ?? window), { immediate: true })
  } else {
    attach(window)
  }

  onUnmounted(() => {
    attachedTo?.removeEventListener('scroll', check)
    resizeObserver?.disconnect()
  })
}
