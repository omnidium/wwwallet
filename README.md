# wwwallet

A personal, non-custodial Ethereum/EVM wallet PWA. Rebuilt as a **MySQL + Rust + Vue** stack, replacing a previous Angular + Flask/MySQL implementation.

Full design rationale and phased migration plan: see the plan history in this repo's commits, or ask for a copy of `eveything-in-wwwallet-needs-nifty-cascade.md` from the migration.

## Design principles

- **Trustless by design**: the backend never sees a private key, mnemonic, password, passphrase, TOTP secret, or WebAuthn credential. It has no user/account database at all — it only serves reference/localization data and proxies public blockchain/fx data. A full compromise of the backend or its MySQL database exposes nothing user-specific, because nothing user-specific is stored there.
- **No local wallet data on the server**: balances, transactions, token metadata, and fx rates are fetched live from external providers (Alchemy, Ethplorer, Etherscan, a free fx-rate API) on every request, cached briefly in memory. Nothing is persisted long-term server-side.
- **Client-side vault**: wallets (encrypted keystores), payees, settings, and the TOTP secret all live in one client-side encrypted vault (IndexedDB), unlocked locally via a passkey-verified gate. Recovery/cross-device continuity happens by restoring an encrypted vault backup from the user's own Google Drive (`appDataFolder`) or a local file — entirely client↔Google, no backend involvement.
- **Multi-chain**: Ethereum mainnet, Polygon, Arbitrum, Base, Optimism.

## Repository layout

```
backend/            Rust workspace (axum API server)
  db/               MySQL access — reference/localization data only
  providers/        Alchemy / Ethplorer / Etherscan / fx-rate provider abstraction + caching
frontend/           Vue 3 + Vite PWA
```

## Backend: local dev

```bash
cp .env.example .env        # fill in ALCHEMY_API_KEY / ETHERSCAN_API_KEY (free tiers)
docker compose up -d mysql
cargo run --package wwwallet-backend    # runs sqlx migrations automatically on boot
```

Seed reference data (currencies/languages/msg codes/templates) once the schema exists:

```bash
mysql -h 127.0.0.1 -u webuser -p common < backend/db/seeds/0001_reference_data_seed.sql
```

## Frontend: local dev

```bash
cd frontend
npm install
npm run dev
```

## What's intentionally NOT here

- No stored procedures — all SQL lives in Rust as parameterized `sqlx` queries.
- No user/auth/session tables, no email sending, no server-side password/TOTP/WebAuthn storage.
- No long-lived transaction/balance/token-price tables — that data is always fetched live.
