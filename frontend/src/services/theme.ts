const STORAGE_KEY = 'wwwallet.theme'

export type ThemeName = 'light' | 'dark'

// Not sensitive — deliberately outside the encrypted vault so the chosen
// theme can be applied before the vault is ever unlocked.
export function getStoredTheme(): ThemeName {
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
}

export function setStoredTheme(name: ThemeName): void {
  localStorage.setItem(STORAGE_KEY, name)
}
