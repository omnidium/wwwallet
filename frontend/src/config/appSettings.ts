/** Locks the vault after this long with no user interaction. */
export const AUTO_LOCK_MS = 5 * 60 * 1000

/** How often useIdleLock checks whether AUTO_LOCK_MS has elapsed. */
export const IDLE_POLL_MS = 15_000

/** How long a copied secret (recovery phrase, private key, mnemonic) stays on the clipboard. */
export const CLIPBOARD_CLEAR_MS = 45_000

/** The backup reminder doesn't appear at all until the vault is this old, if it's never been backed up. */
export const BACKUP_REMINDER_FIRST_MS = 14 * 24 * 60 * 60 * 1000

/** Once a vault has been backed up at least once, the reminder re-appears this long after the last backup. */
export const BACKUP_REMINDER_RECURRING_MS = 182 * 24 * 60 * 60 * 1000

/** Default auto-dismiss timeout for a toast, in ms. -1 means it stays until manually dismissed or updated. */
export const SNACKBAR_DEFAULT_TIMEOUT_MS = 5000

/** How often the accounts screen silently re-fetches balances/prices/activity in the background. */
export const ACCOUNT_AUTO_REFRESH_MS = 10_000

/** Below this fiat value, a token balance or transaction is considered dust and can be filtered out. */
export const DUST_THRESHOLD_USD = 0.01
