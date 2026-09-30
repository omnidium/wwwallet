import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Tracks which section is currently in view and scrolls smoothly to one on demand. */
export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let observer: IntersectionObserver | undefined
  let suppressed = false

  onMounted(() => {
    const headerHeight =
      getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim() ||
      '72px'

    // A section counts "active" once it's past the sticky header and while
    // it's within the top 30% of the viewport — keeps the highlighted nav
    // item stable rather than flickering between adjacent sections.
    observer = new IntersectionObserver(
      (entries) => {
        if (suppressed) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        }
      },
      { rootMargin: `-${headerHeight} 0px -70% 0px`, threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Scrolling to the very top (e.g. clicking the logo) shouldn't leave any
  // nav item looking active — but the observer above only ever *sets*
  // activeId, never clears it, and a smooth scroll upward typically passes
  // through a tracked section on the way there, re-triggering it right
  // before landing. Clear explicitly and ignore the observer until the
  // scroll actually settles.
  function scrollToTop() {
    suppressed = true
    activeId.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })

    let done = false
    const finish = () => {
      if (done) return
      done = true
      activeId.value = ''
      suppressed = false
      window.removeEventListener('scrollend', finish)
    }
    window.addEventListener('scrollend', finish)
    // Fallback in case scrollend never fires — already at the top so
    // nothing actually scrolls, or a browser without scrollend support.
    setTimeout(finish, 800)
  }

  return { activeId, scrollToSection, scrollToTop }
}
