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
 * How long a cached token's metadata (name/symbol/decimals/logo/usd_price) is
 * trusted before re-fetching. Tied to ACCOUNT_AUTO_REFRESH_MS rather than
 * something longer, since usd_price is the one field in there that's
 * genuinely live and expected to move on the same cadence as the native
 * asset's own price — a longer age would leave a held token's fiat value
 * stale for hours between reloads even though it's cheap to keep current.
 * The backend absorbs the resulting request volume: its own KV cache means
 * most of these calls never reach the upstream provider at all, and a
 * stale-on-error fallback covers the rest, so re-checking this often no
 * longer risks the rate-limit/upstream errors an earlier version of this
 * value was trying to avoid.
 */
export const TOKEN_METADATA_MAX_AGE_MS = ACCOUNT_AUTO_REFRESH_MS

/**
 * How long a token already confirmed to have no live price is left alone
 * before being asked about again — most held tokens (airdropped dust
 * especially) never resolve a market price at all, so polling them on the
 * same cadence as a priced token is pure waste that's previously tripped the
 * backend's per-IP rate limit for wallets holding a lot of them (see git
 * history on AccountCard's metadata watcher). Matches the backend's own
 * token-metadata cache TTL: asking more often than that would just replay
 * the same cached (still priceless) answer anyway, so this is the shortest
 * interval that can actually surface a newly-available price.
 */
export const TOKEN_METADATA_PRICELESS_RECHECK_MS = 60 * 60_000

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
