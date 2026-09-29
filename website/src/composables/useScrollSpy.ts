import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Tracks which section is currently in view and scrolls smoothly to one on demand. */
export function useScrollSpy(sectionIds: string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const headerHeight =
      getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim() ||
      '72px'

    // A section counts "active" once it's past the sticky header and while
    // it's within the top 30% of the viewport — keeps the highlighted nav
    // item stable rather than flickering between adjacent sections.
    observer = new IntersectionObserver(
      (entries) => {
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

  return { activeId, scrollToSection }
}
