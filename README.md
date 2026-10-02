# wwwallet

A personal, non-custodial Ethereum/EVM wallet PWA. Rebuilt as a **Rust + Vue** stack. The backend runs as a **Cloudflare Worker** — no server to maintain, no database.

Full design rationale and phased migration plan: see the plan history in this repo's commits, or ask for a copy of `eveything-in-wwwallet-needs-nifty-cascade.md` from the migration.

## Design principles

- **Trustless by design**: the backend never sees a private key, mnemonic, password, passphrase, TOTP secret, or WebAuthn credential. It has no database and no user/account concept at all — it only proxies public blockchain/fx data. A full compromise of the backend exposes nothing user-specific, because nothing user-specific is stored there.
- **No local wallet data on the server**: balances, transactions, token metadata, fx rates, and swap quotes are fetched live from external providers (Alchemy, Ethplorer, Etherscan, 0x, CoinGecko, a free fx-rate API) on every request. The backend caches nothing tied to an address or user; the one exception is public market data identical for everyone — native prices, price histories, token metadata, coin search, FX — held briefly server-side (seconds to an hour, per type; see `backend/providers/src/public_cache.rs`) so one upstream call serves every user, and served stale if the upstream provider fails. Every response to the browser is still marked `Cache-Control: no-store`; the only client-side cache is client-side, in the browser's IndexedDB, where every refresh overwrites it with the freshest data and it's only ever cleared by the user (clearing site data, uninstalling, or deleting the wallet from the device). Anything in it tied to the user's accounts — addresses, balances, transaction history, which tokens they hold — is encrypted with a key derived from the vault's, so it's unreadable while the vault is locked; only public market data and the lock screen's favourites (starred assets and their prices, never balances or addresses) are stored in the clear.
- **Client-side vault**: wallets (encrypted keystores), payees, settings, and the TOTP secret all live in one client-side encrypted vault (IndexedDB), unlocked locally via a passkey-verified gate. Recovery/cross-device continuity happens by restoring an encrypted vault backup from the user's own Google Drive (`appDataFolder`) or a local file — entirely client↔Google, no backend involvement.
- **Static i18n**: languages, message strings, and currency names are bundled as static TypeScript files (`frontend/src/locales/`), not fetched from a server — there's nothing to fetch, cache, or go offline for.
- **Multi-chain**: Ethereum mainnet, Polygon, Arbitrum, Base, Optimism.

## Repository layout

```
backend/            Rust workspace, compiled to a Cloudflare Worker (wasm32) — no database
  providers/        Alchemy / Ethplorer / Etherscan / 0x / fx-rate provider abstraction (only public market data cached)
frontend/           Vue 3 + Vite PWA — the wallet app itself
  src/locales/      Static i18n: en.ts is fully populated, every other locale is a stub
website/            Vue 3 + Vite public marketing site — deliberately separate from frontend/,
                    no Vuetify/Pinia/ethers/dexie, deploys independently to its own domain
```

## Backend: local dev

```bash
cd backend
cp .dev.vars.example .dev.vars   # fill in provider API keys (free tiers)
wrangler dev                     # runs the actual Workers runtime (workerd) locally
```

The first run needs the wasm toolchain once: `rustup target add wasm32-unknown-unknown && cargo install worker-build`.

Unit tests and clippy run against the normal host target (the `worker` crate compiles there too, so this needs no wasm/workerd setup):

```bash
cargo test --workspace
cargo clippy --all-targets -- -D warnings
```

## Backend: deploying

1. `wrangler secret put ALCHEMY_API_KEY` (repeat for `ETHPLORER_API_KEY`, `ETHERSCAN_API_KEY`, `ZEROX_API_KEY`; optionally `LIFI_API_KEY`, which lifts LI.FI's keyless rate limit on bridge quotes). Also `wrangler secret put SESSION_SECRET` with a random 32+ character string (e.g. `openssl rand -base64 48`): it signs the anonymous proof-of-work session tokens the backend rate-limits by (`backend/src/session.rs`; `SESSION_MODE` in `wrangler.toml` sets whether they're required). Rotating it just makes every app mint a fresh token.
2. Update `CORS_ALLOWED_ORIGINS` in `wrangler.toml` to your actual frontend origin.
3. `wrangler deploy`.

Entirely on Cloudflare's free tier for personal-scale traffic: no database, no server to patch, global edge distribution.

## Frontend: local dev

```bash
cd frontend
npm install
npm run dev
```

Deploys as a static site to Cloudflare Pages, fully decoupled from the backend Worker.

## Website: local dev

```bash
cd website
npm install
npm run dev
```

The public marketing site (`wwwallet.me` / `www.wwwallet.me`) — separate from the wallet app
(`app.wwwallet.me`), on its own dev server port so both can run side by side. Deploys as its
own static site to a separate Cloudflare Pages project, independent of the wallet's release
cadence.

## Adding a language

Fill in the corresponding stub in `frontend/src/locales/<code>.ts` with the same shape as `en.ts` (`msg` and `currency` keys). It's picked up automatically via `frontend/src/locales/index.ts` — no other wiring needed.

## What's intentionally NOT here

- No database — the backend is a stateless proxy/cache in front of external providers.
- No server to provision or patch — it's a Cloudflare Worker, not a VM.
- No user/auth/session tables, no email sending, no server-side password/TOTP/WebAuthn storage.
- No long-lived transaction/balance/token-price tables — that data is always fetched live.

## License

wwwallet is **source-available, not open source**. It is licensed under the [PolyForm Strict License 1.0.0](LICENSE) (SPDX: `PolyForm-Strict-1.0.0`).

In plain terms (the [LICENSE](LICENSE) file is the only authoritative text):

- **You may** read, review and audit all of the code, and run an unmodified copy for noncommercial purposes such as personal study, research and testing.
- **You may not** distribute or republish the code, make changes or derivative works, or use it commercially — this includes forking it into your own product or service.
- Need something the license doesn't allow? Ask the copyright holder for a separate license.

### Disclaimer

wwwallet is non-custodial software provided **"as is", without warranty of any kind**, to the extent permitted by law. You alone are responsible for your recovery phrase, backups and funds. Lost keys or backups cannot be recovered by anyone, and blockchain transactions are irreversible. Nothing here is financial, investment, legal or tax advice. Use at your own risk.

### Contributions and security

This project does **not** accept external contributions — pull requests will not be merged, and issues are disabled. Found a security issue? Please report it privately; see [SECURITY.md](SECURITY.md).
