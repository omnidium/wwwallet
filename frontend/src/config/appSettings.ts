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
export const ACCOUNT_AUTO_REFRESH_MS = 10 * 60_000

/** How often to poll for a new deployed version while the app stays open — see services/pwaUpdate.ts. */
export const PWA_UPDATE_CHECK_INTERVAL_MS = 30 * 60_000

/** Below this fiat value, a token balance or transaction is considered dust and can be filtered out. */
export const DUST_THRESHOLD_USD = 0.01

/**
 * How long a held token worth $0.01 or less (dust), or one with no known
 * price, waits between metadata re-checks — tokens worth more are re-fetched
 * on every refresh instead, and "unknown" ones (no logo from any source) are
 * never re-checked at all. Counted from the last
 * attempt, successful or not, and persisted, so app restarts don't reset it.
 * See chainData's refreshHeldTokenMetadata.
 */
export const TOKEN_METADATA_RECHECK_MS = 24 * 60 * 60_000

/**
 * How many token-metadata requests may be in flight at once, across every
 * account combined — a first load, or a day's worth of low-value tokens
 * coming due together (see TOKEN_METADATA_RECHECK_MS), re-fetches many held
 * tokens' metadata at once, and a wallet holding many tokens (airdropped
 * dust included) would otherwise burst past the backend's per-IP rate limit
 * and Ethplorer's own.
 */
export const TOKEN_METADATA_CONCURRENCY = 4

/**
 * How many transactions a single infinite-scroll "load more" batch tries to
 * surface before stopping (see useTransactionBatchLoader) — user-configurable
 * from Settings, this is just the default for a vault that's never set one.
 */
export const DEFAULT_TRANSACTION_BATCH_SIZE = 200

/** Preset choices offered for the transaction batch size setting. */
export const TRANSACTION_BATCH_SIZE_OPTIONS = [25, 50, 100, 200]

/** How long the swap token picker waits after the last keystroke before searching. */
export const TOKEN_SEARCH_DEBOUNCE_MS = 300

/** How long a touch must be held on a button for its tooltip to show (see AppTooltip). */
export const TOOLTIP_LONG_PRESS_MS = 450

/** How long a tooltip shown by a long press stays up, unless tapped away sooner. */
export const TOOLTIP_TOUCH_SHOW_MS = 2500

/** How long the transfer panel waits after the last edit before fetching a swap/bridge quote or fee estimate. */
export const QUOTE_DEBOUNCE_MS = 600

/** A shown quote older than this is re-fetched before it's reviewed — prices and bridge fees drift. */
export const QUOTE_MAX_AGE_MS = 30_000

/** How often a bridged transfer's arrival is checked, and for at most how long. */
export const BRIDGE_STATUS_POLL_MS = 10_000
export const BRIDGE_STATUS_MAX_WAIT_MS = 60 * 60_000

// How long the Send icon on an account card must be held before the
// drag-to-transfer target picker opens (shorter presses just open Send).
export const TRANSFER_LONG_PRESS_MS = 400
