// Single hand-maintained source of truth for every English string across
// both wwwallet properties (the wallet app and the marketing website).
//
// Edit ONLY this file — never frontend/src/locales/en.ts or
// website/src/i18n/locales/en.ts directly. Both are now generated output:
// running `node scripts/sync-i18n.mjs` from the repo root rewrites each
// project's own en.ts from the matching section below, reports what changed
// (edited / added / removed keys), and re-runs the existing DeepL sync so
// every translated locale file for that project picks up the change too.
//
// Kept as two separate top-level sections rather than one merged object:
// the two projects already reuse a couple of namespace names (`nav`,
// `settings`) for unrelated concepts with different shapes, so merging them
// would either collide or need an unrelated restructuring of both apps'
// existing key paths. Each section's shape is otherwise an exact mirror of
// that project's own en.ts.
//
// Plain object literals only — no TypeScript-specific syntax — since
// scripts/lib/masterSync.mjs evaluates this file directly (reads the source
// text and runs each `export const` block through `new Function(...)`)
// rather than going through a TS toolchain, same convention every generated
// locale file already follows (see scripts/lib/localeSync.mjs).

export const frontendEn = {
  common: {
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
    close: 'Close',
    goBack: 'Go back',
    label: 'Label',
    chain: 'Chain',
    address: 'Address',
    review: 'Review',
  },
  nav: {
    settings: 'Settings',
    dismiss: 'Dismiss',
  },
  accounts: {
    addAccount: 'Add account',
    empty: 'No accounts yet. Add one to get started.',
    online: 'Connected',
    offlineNoNetwork: 'No internet connection',
    offlineServerUnreachable: 'Can’t reach the server',
    backupReminder:
      'It has been a while since your last backup. Back up regularly, and whenever you make changes.',
    viewHidden: 'View hidden accounts',
    hideHidden: 'Hide hidden accounts',
  },
  accountCard: {
    copyAddress: 'Copy the address',
    copied: 'Copied!',
    viewQr: 'View QR code',
    refresh: 'Refresh this account',
    send: 'Send (drag to transfer to another account or payee)',
    moreActions: 'More actions',
    edit: 'Edit account details',
    hide: 'Hide account',
    show: 'Show account',
    viewPrivateKey: 'View private key',
    viewMnemonic: 'View mnemonic',
    privateKeyNoun: 'private key',
    mnemonicNoun: 'mnemonic phrase',
    showTransactions: 'Show recent transactions',
    hideTransactions: 'Hide recent transactions',
    showTokens: 'Show token balances',
    hideTokens: 'Hide token balances',
    hideDustTxns: 'Hide transactions under $0.01',
    hideUnknownTokens: 'Hide unknown tokens',
    dragToReorder: 'Drag to reorder',
    viewOnEtherscan: 'Click to view on Etherscan',
  },
  editAccount: {
    title: 'Edit account',
    labelField: 'Label',
    setDefault: 'Set as default account',
    update: 'Update',
  },
  hideAccount: {
    confirm: 'Are you sure you wish to hide this account?',
    hide: 'Hide',
  },
  secretReveal: {
    warning:
      'Anyone with this {secret} can have full access to that account. Make sure you are somewhere private and on a personal device before viewing it.',
    ok: 'OK',
    confirmIdentity: 'Confirm it’s you',
    confirmWithPasskey: 'Confirm with Face ID / Touch ID to continue.',
    confirmWithPhrase: 'Enter your recovery phrase to continue.',
    reauthFailed: 'Could not confirm your identity. Try again.',
    tryAgain: 'Try again',
    copy: 'Copy',
  },
  transactionDetail: {
    title: 'Transaction details',
    hash: 'Hash',
    status: 'Status',
    status_success: 'Success',
    status_failed: 'Failed',
    status_pending: 'Pending',
    timestamp: 'Timestamp',
    from: 'From',
    to: 'To',
    amount: 'Amount',
    sold: 'Sold',
    bought: 'Bought',
  },
  transferPicker: {
    title: 'Drop on an account or payee to transfer',
    myAccounts: 'My Accounts',
    payees: 'Payees',
  },
  review: {
    title: 'Confirm transaction',
    from: 'From',
    to: 'To',
    chain: 'Chain',
    amount: 'Amount',
    fee: 'Fee',
    total: 'Total',
    sell: 'Sell',
    buy: 'Buy',
    price: 'Price',
    swapFee: 'Swap fee',
    integratorFee: 'Service fee',
  },
  addAccount: {
    title: 'Add account',
    tabCreate: 'Create new',
    tabMnemonic: 'Import mnemonic',
    tabPrivateKey: 'Import private key',
    tabKeystore: 'Import keystore file',
    mnemonicLabel: 'Recovery phrase (mnemonic)',
    privateKeyLabel: 'Private key',
    keystoreFileLabel: 'Keystore JSON file',
    filePasswordLabel: "This file's password",
    filePasswordHint:
      "The password this keystore file was originally encrypted with — not a new password. Once imported, unlocking your vault is all you'll need.",
    noPasswordHint:
      "No password needed — this account is protected by your vault's own unlock (Face ID/Touch ID or recovery phrase).",
    submit: 'Add account',
  },
  send: {
    title: 'Send',
    tabSend: 'Send',
    tabSwap: 'Swap',
    fromLabel: 'From',
    chainLabel: 'Chain',
    recipientLabel: 'Recipient address',
    scanQrAria: 'Scan QR code',
    tokenLabel: 'Token',
    amountLabel: 'Amount',
    amountInLabel: 'Amount in {unit}',
    maxLabel: 'Max',
    toggleAmountUnitAria: 'Toggle between token amount and {currency}',
    submit: 'Send',
    addPayeeTitle: 'Add this address as a payee?',
    addPayeePrompt:
      "You scanned this address with a QR code. Save it as a payee so it's easy to send to again.",
    addPayeeLabelField: 'Label',
    addPayeeSave: 'Save',
    addPayeeSkip: 'Skip',
  },
  receive: {
    title: 'Receive',
    defaultAccountLabel: 'Account',
    tapToCopy: 'Tap to copy',
    copyAria: 'Copy address',
  },
  swap: {
    title: 'Swap',
    sellTokenLabel: 'Sell',
    buyTokenLabel: 'Buy',
    sellAmountLabel: 'Sell amount',
    selectToken: 'Select token',
    searchTokenPlaceholder: 'Search name or symbol',
    yourTokens: 'Your tokens',
    allTokens: 'All tokens',
    noResults: 'No tokens found.',
    viewOnExplorer: 'View token on block explorer',
    getQuote: 'Get quote',
    estimateText: 'Estimated to receive: {amount} at price {price}',
    estimatedFee: 'Estimated network fee: {fee}',
    swapFee: 'Swap fee: {fee}',
    integratorFee: 'Service fee: {fee}',
    signingNotice: "You're signing a transaction to contract {address} (via the 0x aggregator).",
    submit: 'Swap',
  },
  payees: {
    title: 'Payees',
    add: 'Add payee',
    edit: 'Edit payee',
    empty: 'No payees yet.',
    deleteAria: 'Delete {label}',
    labelField: 'Label',
    addressField: 'Address',
  },
  backup: {
    title: 'Backup & restore',
    intro:
      "Backups are encrypted on this device before they ever leave it. wwwallet's server is never involved — restoring on a new device talks directly to Google or reads a local file.",
    googleDriveTitle: 'Google Drive',
    backUpNow: 'Back up now',
    restoreLatest: 'Restore latest backup',
    localFileTitle: 'Local file',
    downloadBackup: 'Download backup file',
    restoreFromFile: 'Restore from file',
    replaceTitle: 'Replace your current wallet?',
    replaceBody:
      "Restoring overwrites everything currently in this vault — accounts, payees, and settings — with what's in the backup, and removes any passkey set up on this device (you'll re-enable it after unlocking). This can't be undone.",
    replaceConfirm: 'Replace it',
    recovering: 'Recovering wallet…',
  },
  vaultSetup: {
    createTitle: 'Create your wallet',
    createIntroBody:
      "Generates a new recovery phrase and vault on this device. Nothing is sent to a server — you're fully in control from the start.",
    createWalletCta: 'Create Wallet',
    recoveryExplainer:
      "This is your {phrase}. It encrypts everything on this device and is the only way back in if you ever lose access to your passkey — including restoring a backup on a new device. Write it down or copy it somewhere safe, offline. You won't need it day-to-day once quick unlock is set up on the next screen, and wwwallet will never show it to you again.",
    recoveryExplainerPhrase: 'recovery phrase',
    copyRecoveryPhrase: 'Copy recovery phrase',
    savedAckLabel: "I've saved my recovery phrase somewhere safe",
    createVault: 'Create vault',
    haveBackup: 'Already have a backup?',
    restoreFromDrive: 'Restore from Google Drive',
    restoreFromLocalFile: 'Restore from local file',
    quickUnlockTitle: 'Set up quick unlock',
    quickUnlockBody:
      'Use Face ID or Touch ID to unlock day-to-day, instead of your recovery phrase.',
    enablePasskey: 'Enable Face ID / Touch ID',
    passkeyEnabledLabel: 'Face ID / Touch ID enabled',
    passkeyUnsupportedNote:
      'Not supported on this device or browser — you can still unlock with your recovery phrase, or try again later from Settings.',
    skipTitle: 'Skip quick unlock?',
    skipBody:
      "Without a passkey, you'll enter your full recovery phrase every time you open wwwallet. You can set this up later from Settings.",
    continueAnyway: 'Continue anyway',
  },
  vaultUnlock: {
    title: 'Unlock wwwallet',
    unlockWithPasskey: 'Unlock with Face ID / Touch ID',
    recoveryPhraseLabel: 'Recovery phrase (24 words)',
    unlock: 'Unlock',
    useRecoveryInstead: 'Use recovery phrase instead',
  },
  settings: {
    title: 'Settings',
    themeLabel: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    closeAria: 'Close settings',
    lockNow: 'Lock now',
    backToWebsite: 'Back to main site',
    languageLabel: 'Language',
    currencyLabel: 'Currency',
    transactionBatchSizeLabel: 'Transactions per load',
    version: 'Version {version}',
    securityTitle: 'Security',
    securityIntro:
      'Your recovery phrase is never stored anywhere it could be shown back to you — keep it somewhere safe. Face ID / Touch ID is the fast path for everyday unlock; wwwallet also locks itself automatically after a few minutes of inactivity.',
    passkeyLabel: 'Face ID / Touch ID',
    passkeyEnabled: 'Enabled',
    passkeyNotSetUp: 'Not set up',
    remove: 'Remove',
    enable: 'Enable',
    removePasskeyTitle: 'Remove Face ID / Touch ID unlock?',
    removePasskeyBody:
      "You'll need your full recovery phrase every time you unlock wwwallet until you set up a passkey again.",
    removeAnyway: 'Remove anyway',
    dangerZoneTitle: 'Danger zone',
    deleteWalletLabel: 'Delete wallet from this device',
    deleteWalletDescription:
      'Permanently erase your encrypted vault, private keys, and quick-unlock passkey from this device.',
    deleteWalletButton: 'Delete',
    deleteWalletTitle: 'Delete this wallet from this device?',
    deleteWalletBody:
      'This permanently erases your encrypted vault and private keys from this device. There is no undo — without your recovery phrase, or a Google Drive or file backup, any funds in these accounts are lost forever.',
    deleteWalletNeverBackedUp: 'You have never backed up this wallet.',
    deleteWalletAckLabel:
      'I have my recovery phrase saved somewhere safe and understand this cannot be undone',
    deleteWalletConfirm: 'Delete wallet',
  },
  transactions: {
    title: 'Transactions',
    empty: 'No transactions found.',
    visitAccountFirst: 'Visit an account first to load its transaction history.',
  },
  token: {
    defaultLabel: 'Token',
    decimals: 'Decimals',
    price: 'Price',
    priceTooltip: 'Price of 1 {symbol} token in USD',
    amount: 'Amount',
    amountTooltip: 'Amount of {symbol} tokens held',
    total: 'Total',
    totalTooltip: 'Total value of tokens held in local currency',
  },
  qrScanner: {
    title: 'Scan address QR code',
    cameraError: 'Camera access failed. Check permissions and try again.',
  },
  validation: {
    amountGreaterThanZero: 'Enter an amount greater than zero.',
    insufficientBalance:
      'Amount to send is more than the FROM account balance (including transaction fee).',
    insufficientGas: 'Not enough ETH in this account to cover the network fee.',
    invalidRecipientAddress: 'Enter a valid recipient address.',
    sameTokenSwap: 'Sell and buy tokens must be different.',
    labelRequired: 'Label is required.',
    validAddress: 'Enter a valid address.',
    filePasswordRequired: "This file's password is required.",
    mnemonicWordCount: 'Incorrect number of words ({count}). Either 12 or 24 words are required.',
    privateKeyRequired: 'Private key is required.',
    keystoreFileRequired: 'Choose a keystore file.',
    recoveryPhraseFormat: "That doesn't look like a valid recovery phrase.",
  },
  msg: {
    account: {
      added: 'Account added.',
    },
    address: {
      copied: 'Address copied.',
    },
    qr: {
      noAddress: 'QR code did not contain a recognizable address.',
    },
    send: {
      submitting: 'Submitting transaction…',
      waiting: 'Waiting for transaction to complete…',
      success: 'Sent.',
      failed: 'Transaction failed. Hash: {hash}',
      stillPending: "Still pending — it hasn't been confirmed yet. Hash: {hash}",
    },
    swap: {
      approvalSubmitted: 'Approval submitted. Waiting for it to confirm…',
      approvalConfirmed: 'Approval confirmed. Preparing swap…',
      approvalFailed: 'Approval failed. Hash: {hash}',
      approvalStillPending:
        "Approval still pending — it hasn't been confirmed yet. Try swapping again shortly. Hash: {hash}",
      submitting: 'Submitting transaction…',
      waiting: 'Waiting for transaction to complete…',
      success: 'Swap submitted.',
      failed: 'Swap failed. Hash: {hash}',
      stillPending: "Still pending — it hasn't been confirmed yet. Hash: {hash}",
    },
    backup: {
      driveSuccess: 'Backed up to Google Drive.',
    },
    restore: {
      driveSuccess: 'Restored from Google Drive. Unlock with your recovery phrase to continue.',
      fileSuccess: 'Restored from file. Unlock with your recovery phrase to continue.',
      driveSuccessSetup: 'Restored from Google Drive. Enter your recovery phrase to unlock.',
      fileSuccessSetup: 'Restored from file. Enter your recovery phrase to unlock.',
    },
    recoveryPhrase: {
      copied: "Recovery phrase copied — it'll be cleared from your clipboard in 45s.",
      copyFailed: 'Could not copy automatically — select and copy the words manually.',
    },
    passkey: {
      ready: 'Face ID / Touch ID unlock is ready.',
    },
  },
  errors: {
    unknown: 'Unknown error occurred',
    requestFailed: 'request to {path} failed with {status}',
    webauthnUnavailable: 'WebAuthn is not available in this browser',
    passkeyRegistrationCancelled: 'passkey registration was cancelled',
    passkeyNoPrfSecret: 'passkey did not return a PRF secret',
    passkeyUnlockCancelled: 'passkey unlock was cancelled',
    prfNotSupported:
      'This device or browser does not support passwordless passkey unlock (WebAuthn PRF). You can still unlock with your recovery phrase, or try a different device/browser.',
    googleDriveNotConfigured:
      'Google Drive backup is not configured (VITE_GOOGLE_CLIENT_ID missing)',
    gisLoadFailed: 'failed to load Google Identity Services',
    googleSignInCancelled: 'Google sign-in was cancelled',
    googleDriveSearchFailed: 'failed to search Google Drive',
    googleDriveUploadFailed: 'failed to upload backup to Google Drive',
    googleDriveNoBackup: 'no backup found in this Google account',
    googleDriveDownloadFailed: 'failed to download backup from Google Drive',
    noVaultOnDevice: 'no vault exists on this device',
    cannotSaveNoVault: 'cannot save: no vault exists yet',
    noRecoveryWrapToExport: 'vault has no recovery-phrase wrap to export',
    invalidBackupFile: 'This file is not a valid wwwallet backup.',
    vaultUnlockFailed: 'Incorrect recovery phrase or corrupted vault.',
    unlockMethodNotEnrolled: '{method} is not set up for this vault.',
    passkeyNotSetUp: 'Passkey is not set up for this vault.',
    vaultLocked: 'vault is locked',
    chooseKeystoreFile: 'choose a keystore file',
    passkeyOperationFailed:
      'The passkey operation failed. Try again, or use your recovery phrase instead.',
    invalidMnemonic: 'That recovery phrase is not valid. Double-check the words and try again.',
    invalidPrivateKey: 'That private key is not valid.',
    invalidKeystoreFile:
      'Could not open this keystore file — it may be corrupted, or the password may be wrong.',
    networkFailed: 'Could not reach the server. Check your connection and try again.',
    rateLimited: 'Too many requests — please wait a moment and try again.',
    noLiquidity: "This token pair isn't tradable right now — try a different token.",
    transactionWouldFail:
      'This transaction would fail if submitted — check your balance and any required approval.',
  },
  currency: {
    USD: 'US dollar',
    EUR: 'Euro',
    GBP: 'Pound sterling',
    AUD: 'Australian dollar',
    CAD: 'Canadian dollar',
    JPY: 'Japanese yen',
    CHF: 'Swiss franc',
    CNH: 'Yuan',
    SEK: 'Swedish krona',
    NZD: 'New Zealand dollar',
  },
}

export const websiteEn = {
  nav: {
    wallet: 'Wallet',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'FAQs',
    launch: 'Launch Wallet',
    home: 'Back to top',
    sectionNavLabel: 'Section navigation',
  },
  settings: {
    open: 'Settings',
    close: 'Close settings',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Language',
  },
  hero: {
    eyebrow: 'A personal, non-custodial Ethereum wallet',
    heading1: 'Your Keys.',
    heading2: 'Your Device.',
    heading3: 'Your Wallet.',
    lede: 'wwwallet encrypts your wallet on your own device and never sends your keys, passwords, or recovery phrase anywhere else. No account to create. No server to breach. Just you and your crypto.',
    ctaPrimary: 'Launch Wallet',
    ctaSecondary: 'See how it works',
  },
  wallet: {
    eyebrow: 'Wallet',
    heading: 'Built so only you can open it',
    lede: "wwwallet doesn't hold your funds — it helps you hold them yourself. Here's what that means in practice.",
    points: [
      {
        title: 'Non-custodial, always',
        body: "Your private keys are generated and encrypted on your own device. wwwallet's servers never see them — there's no database of wallets to breach, because there isn't a database at all.",
      },
      {
        title: 'Encrypted with AES-256, unlocked your way',
        body: 'Your vault is protected with AES-256-GCM encryption. Unlock it with your recovery phrase, or enable a passkey — Face ID, Touch ID, or Windows Hello — for fast, local-only access.',
      },
      {
        title: 'Locks itself automatically',
        body: 'wwwallet locks after a short period of inactivity, and never writes your unlocked session to disk — close the tab and it forgets, on purpose.',
      },
      {
        title: 'One wallet, five Ethereum networks',
        body: 'Hold and send across Ethereum mainnet, Polygon, Arbitrum, Base, and Optimism from the same set of accounts.',
      },
    ],
    caveatTitle: 'Your recovery phrase unlocks your vault — it’s not a magic backup',
    caveatBody:
      'Save your recovery phrase somewhere safe, but also take a Google Drive or file backup. You’ll need the backup to restore your wallet on a new device, and the phrase to unlock it once you do.',
    caveatLink: 'Read more in the FAQs',
  },
  ethereum: {
    eyebrow: 'Ethereum',
    heading: 'Why Ethereum',
    lede: 'wwwallet is built around Ethereum specifically. Here’s the case for it, in plain terms.',
    points: [
      {
        title: 'A world computer, not just a ledger',
        body: 'Ethereum took Bitcoin’s idea of a shared, tamper-proof ledger and extended it: a global, programmable computer that anyone can build on, and no single party can switch off.',
      },
      {
        title: 'Secured by staking, not mining',
        body: 'Since “the Merge” in 2022, Ethereum has been secured by Proof-of-Stake rather than energy-intensive mining — validators put ETH at risk as collateral instead of burning electricity to compete for blocks.',
      },
      {
        title: 'Open and permissionless',
        body: 'Nobody approves your account. Anyone, anywhere, can hold ETH or build an application on Ethereum — the same rules apply to everybody, including the largest institutions.',
      },
      {
        title: 'The standard other networks build on',
        body: 'Layer-2 networks like Arbitrum, Base, and Optimism — all supported in wwwallet — extend Ethereum’s security to faster, cheaper transactions instead of starting from scratch.',
      },
    ],
    linkLabel: 'Read more at the Ethereum Foundation',
    linkUrl: 'https://ethereum.org/en/foundation/',
  },
  crypto: {
    eyebrow: 'Crypto',
    heading: 'Crypto, in plain terms',
    lede: 'A few concepts worth understanding before you hold any crypto yourself — not just with wwwallet.',
    points: [
      {
        title: 'Custodial vs. non-custodial',
        body: 'A custodial wallet or exchange holds your keys for you — convenient, but you’re trusting someone else not to freeze, lose, or misuse your funds. A non-custodial wallet like wwwallet puts the keys, and the responsibility, in your hands alone.',
      },
      {
        title: 'Staking vs. mining',
        body: 'Proof-of-Work mining secures a blockchain with raw computing power and electricity. Proof-of-Stake secures it with capital at risk instead. Ethereum’s move to staking cut its energy use by more than 99.9% — roughly the difference between powering a small country and a small town.',
      },
      {
        title: 'Beyond Ethereum',
        body: 'Bitcoin prioritizes simplicity and predictability over programmability. Chains like Solana push raw throughput, often trading off decentralization to get there. Ethereum leans toward decentralization and security first, and leaves speed and cost to Layer-2 networks built on top of it.',
      },
      {
        title: 'Nobody legitimate asks for your phrase',
        body: 'Whatever wallet you use: no exchange, no support agent, and no wwwallet employee will ever ask for your recovery phrase. Anyone who does is trying to rob you.',
      },
    ],
    linkLabel: 'Go deeper with the Bankless podcast',
    linkUrl: 'https://www.bankless.com/',
  },
  faqs: {
    eyebrow: 'FAQs',
    heading: 'Common questions',
    items: [
      {
        q: 'Is my recovery phrase enough to get my wallet back?',
        a: 'Not by itself. Your recovery phrase unlocks your encrypted vault, but the vault itself lives only on your device. If you lose or wipe that device without ever taking a backup, there’s nothing left for the phrase to unlock. Always pair your recovery phrase with a Google Drive or file backup — see the next question.',
      },
      {
        q: 'How do I back up my wallet?',
        a: 'From Settings, back up your encrypted vault to your own Google Drive — stored in a private, app-only folder wwwallet can’t see the rest of — or as a file you download and keep yourself. Do this whenever you set up a wallet or add new accounts.',
      },
      {
        q: 'Can I use wwwallet on more than one device?',
        a: 'Yes, but it doesn’t sync automatically — each device holds its own local vault. To use wwwallet on a new device, restore it there from a Drive or file backup, then unlock with your recovery phrase.',
      },
      {
        q: 'What happens if I lose my device and never backed up?',
        a: 'Your funds are unrecoverable. That’s by design: wwwallet has no account system and keeps no copy of your vault anywhere, so nobody — including us — can restore it for you. It’s the trade-off of a wallet nobody but you can access.',
      },
      {
        q: 'Do passkeys (Face ID / Touch ID) carry over to a new device?',
        a: 'No. A passkey is tied to the device it was created on. After restoring a backup on a new device, unlock with your recovery phrase and you can set up a fresh passkey there.',
      },
      {
        q: 'Is wwwallet open source?',
        a: 'The source is public on GitHub, so anyone can read it. It isn’t released under an open-source license yet, so treat it as public for review rather than open source for now.',
      },
      {
        q: 'What networks does wwwallet support?',
        a: 'Ethereum mainnet, plus the Layer-2 networks Polygon, Arbitrum, Base, and Optimism — all from the same set of accounts.',
      },
      {
        q: 'What does wwwallet know about me?',
        a: 'Nothing that identifies you. There’s no account, login, or database. Balance and price data is fetched through wwwallet’s own backend rather than your browser calling third-party providers directly, and that backend never sees your keys, passwords, or recovery phrase.',
      },
    ],
  },
  footer: {
    tagline: 'A personal, non-custodial Ethereum wallet.',
    sourceLink: 'View the source on GitHub',
    copyright: '© {year} wwwallet',
  },
}
