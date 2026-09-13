# wwwallet

A personal, non-custodial Ethereum/EVM wallet PWA. Rebuilt as a **Rust + Vue** stack, replacing a previous Angular + Flask/MySQL implementation.

Full design rationale and phased migration plan: see the plan history in this repo's commits, or ask for a copy of `eveything-in-wwwallet-needs-nifty-cascade.md` from the migration.

## Design principles

- **Trustless by design**: the backend never sees a private key, mnemonic, password, passphrase, TOTP secret, or WebAuthn credential. It has no database and no user/account concept at all — it only proxies public blockchain/fx data. A full compromise of the backend exposes nothing user-specific, because nothing user-specific is stored there.
- **No local wallet data on the server**: balances, transactions, token metadata, fx rates, and swap quotes are fetched live from external providers (Alchemy, Ethplorer, Etherscan, 0x, a free fx-rate API) on every request, cached briefly in memory where it's safe to (never for quotes/nonces). Nothing is persisted long-term.
- **Client-side vault**: wallets (encrypted keystores), payees, settings, and the TOTP secret all live in one client-side encrypted vault (IndexedDB), unlocked locally via a passkey-verified gate. Recovery/cross-device continuity happens by restoring an encrypted vault backup from the user's own Google Drive (`appDataFolder`) or a local file — entirely client↔Google, no backend involvement.
- **Static i18n**: languages, message strings, and currency names are bundled as static TypeScript files (`frontend/src/locales/`), not fetched from a server — there's nothing to fetch, cache, or go offline for.
- **Multi-chain**: Ethereum mainnet, Polygon, Arbitrum, Base, Optimism.

## Repository layout

```
backend/            Rust workspace (axum API server) — no database
  providers/        Alchemy / Ethplorer / Etherscan / 0x / fx-rate provider abstraction + caching
frontend/           Vue 3 + Vite PWA
  src/locales/      Static i18n: en.ts is fully populated, every other locale is a stub
```

## Backend: local dev

```bash
cp .env.example .env        # fill in ALCHEMY_API_KEY / ETHERSCAN_API_KEY / ZEROX_API_KEY (free tiers)
cargo run --package wwwallet-backend
```

## Frontend: local dev

```bash
cd frontend
npm install
npm run dev
```

## Adding a language

Fill in the corresponding stub in `frontend/src/locales/<code>.ts` with the same shape as `en.ts` (`msg` and `currency` keys). It's picked up automatically via `frontend/src/locales/index.ts` — no other wiring needed.

## What's intentionally NOT here

- No database — the backend is a stateless proxy/cache in front of external providers.
- No user/auth/session tables, no email sending, no server-side password/TOTP/WebAuthn storage.
- No long-lived transaction/balance/token-price tables — that data is always fetched live.
