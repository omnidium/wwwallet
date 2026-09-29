import { ref, watch } from 'vue'

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'wwwallet-site.theme'

function readInitialTheme(): ThemeName {
  // index.html's inline blocking script already resolved and applied the
  // initial theme (stored choice, else prefers-color-scheme) before any
  // Vue code runs, so we just read it back rather than re-deriving it.
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

// Module-level state: a singleton shared by every useTheme() call, the same
// pattern Pinia gives the app but without pulling Pinia into this project.
const theme = ref<ThemeName>(readInitialTheme())

let mediaListenerAttached = false
function attachSystemPreferenceListener() {
  if (mediaListenerAttached) return
  mediaListenerAttached = true
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    // Once the user picks explicitly, stop following the system setting.
    let hasExplicitChoice = false
    try {
      hasExplicitChoice = localStorage.getItem(STORAGE_KEY) !== null
    } catch {
      hasExplicitChoice = false
    }
    if (!hasExplicitChoice) {
      theme.value = event.matches ? 'dark' : 'light'
    }
  })
}

watch(
  theme,
  (next) => {
    document.documentElement.setAttribute('data-theme', next)
  },
  { immediate: true },
)

export function useTheme() {
  attachSystemPreferenceListener()

  function setTheme(next: ThemeName) {
    theme.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private-mode/blocked storage — theme still applies for this page load.
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
