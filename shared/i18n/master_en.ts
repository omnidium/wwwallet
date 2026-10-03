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
    search: 'Search',
    noMatches: 'No matches',
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
    viewHidden: 'View hidden items',
    hideHidden: 'Hide hidden items',
  },
  accountCard: {
    copyAddress: 'Copy the address',
    copied: 'Copied!',
    viewQr: 'View QR code',
    viewNativeToken: 'View {symbol} details',
    send: 'Send (drag to transfer to another account or payee)',
    moreActions: 'More actions',
    edit: 'Edit account details',
    hide: 'Hide account',
    show: 'Show account',
    viewPrivateKey: 'View private key',
    viewMnemonic: 'View mnemonic',
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
    warningPrivateKey:
      'Anyone with this private key can have full access to that account. Make sure you are somewhere private and on a personal device before viewing it.',
    warningMnemonic:
      'Anyone with this recovery phrase (mnemonic) can have full access to that account. Make sure you are somewhere private and on a personal device before viewing it.',
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
    networkFee: 'Transaction fee',
    paidBySender: 'Paid by the sender',
    feeUnavailable: 'Not available yet',
    todaysPriceNote: "* At today's price — no price was found for when this transaction was made.",
  },
  quickUnlock: {
    title: 'Set up quick unlock',
    usePhone: 'Use a phone instead',
    useSecurityKey: 'Use a security key instead',
    passkeyUnavailable: 'Not available in this browser — set an unlock password below instead',
    passkeyUnavailableBody:
      "This browser can't use Face ID / Touch ID to unlock wwwallet. Set an unlock password for this device instead, so you're not typing your whole recovery phrase every time.",
    platformLacksPrfBody:
      "This device's built-in Face ID / Touch ID can't unlock wwwallet. You can use a passkey on your phone (by scanning a QR code) or a security key instead — or set an unlock password for this device.",
    reminder:
      "You're still unlocking with your full recovery phrase. Set up quick unlock on this device to get in faster and keep your phrase out of sight.",
    setPassword: 'Set an unlock password',
    passwordTitle: 'Unlock password',
    passwordIntro:
      "Unlocks wwwallet on this device only. Make it long — at least {min} characters; a phrase of several words works well. Anyone who copied this device's storage could try to guess it, so length matters more than symbols.",
    passwordField: 'Unlock password',
    confirmField: 'Repeat unlock password',
    tooShort: 'At least {min} characters',
    mismatch: "Passwords don't match",
    passwordSet: 'Unlock password set.',
    passwordEnabled: 'Set on this device',
    passwordNotSet: 'Not set — for devices where a passkey isn\'t available',
    change: 'Change',
  },
  passkeyNudge: {
    title: 'Set up Face ID / Touch ID',
    body: "Right now, unlocking wwwallet means typing your whole recovery phrase — slow, and every time it's on screen is a chance for it to be seen. A passkey unlocks in a second with your face, fingerprint or device PIN, and your recovery phrase stays put away.",
    deviceOnly: 'The passkey stays on this device. Your recovery phrase still works as before, on any device.',
    reminder: "You're still unlocking with your full recovery phrase. Set up Face ID / Touch ID on this device to unlock in a second and keep your phrase out of sight.",
    notNow: 'Not now',
    dontShowAgain: "Don't show again",
  },
  transferPicker: {
    title: 'Drop on an account or payee to transfer',
    myAccounts: 'My Accounts',
    payees: 'Payees',
  },
  transfer: {
    fromNetwork: 'From network',
    toNetwork: 'To network',
    chainAria: '{label}: {network}. Change network',
    chooseAccount: 'Choose account',
    chooseRecipient: 'Choose recipient',
    myAccounts: 'My accounts',
    payees: 'Payees',
    noOptions: 'Nothing to choose from',
    enterAddress: 'Paste or type an address (0x…)',
    useAddress: 'Use this address',
    externalAddress: 'External address',
    sameAccountSameChain:
      "That's the sending account — choose another recipient, or a different network to move funds across.",
    payeeOtherChain: 'Saved as a payee on {saved}. Make sure they can receive on {network}.',
    movingOwnFunds: 'Moving funds to this account on {network}.',
    receiveIntoSame: 'Swapped tokens arrive in this same account',
    flip: 'Switch direction',
    noPrice: 'No price available',
    summaryTitle: 'Summary',
    routeDirect: 'Direct',
    routeBridge: 'Bridge',
    via: 'Route',
    youSend: 'You send',
    youGet: 'You receive',
    recipientGets: 'Recipient gets',
    minReceived: 'Minimum received',
    minReceivedHint:
      "The least that can arrive if prices move before it lands (slippage). If it would be less, the transfer doesn't go through.",
    rate: 'Rate',
    bridgeFees: 'Bridge fees',
    swapFees: 'Swap fees',
    networkFee: 'Transaction fee',
    arrives: 'Arrives in',
    etaNextBlock: 'Seconds',
    etaSeconds: '~{n} sec',
    etaMinutes: '~{n} min',
    etaHours: '~{n} h',
    placeholderRecipient: 'Choose who to send to and enter an amount to see fees and timing.',
    placeholderAmount: 'Enter an amount to see fees and timing.',
    placeholderBuyToken: 'Choose a token to receive and enter an amount to see the rate and fees.',
    bridgeSigningNotice: "You're signing a transaction to contract {address} (via the LI.FI bridge aggregator).",
    tokenNotOnChain: "{symbol} can't be bridged to {network} — choose another network or token.",
    tokenNotOnChainSwap: "That token can't be bridged to {network} — choose another token.",
    reviewBridge: 'Review bridge',
    submitBridge: 'Bridge',
  },
  review: {
    title: 'Confirm transaction',
    from: 'From',
    to: 'To',
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
    scanQrAria: 'Scan QR code',
    tokenLabel: 'Token',
    amountInLabel: 'Amount in {unit}',
    maxLabel: 'Max',
    toggleAmountUnitAria: 'Toggle between token amount and {currency}',
    submit: 'Send',
    addPayeeTitle: 'Add this address as a payee?',
    addPayeePrompt:
      "You haven't sent to this address before. Save it as a payee so it's easy to send to again.",
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
    sellTokenLabel: 'Sell',
    buyTokenLabel: 'Buy',
    sellAmountLabel: 'Sell amount',
    selectToken: 'Select token',
    searchTokenPlaceholder: 'Search name or symbol',
    yourTokens: 'Your tokens',
    allTokens: 'All tokens',
    popularTokens: 'Popular tokens',
    noResults: 'No tokens found.',
    viewOnExplorer: 'View token on block explorer',
    signingNotice: "You're signing a transaction to contract {address} (via the 0x aggregator).",
    submit: 'Swap',
  },
  payees: {
    labelPlaceholder: 'e.g. Alice',
    chainHint: 'The network they receive on — sends to them default to it.',
    title: 'Payees',
    add: 'Add payee',
    edit: 'Edit payee',
    empty: 'No payees yet.',
    deleteAria: 'Delete {label}',
    labelField: 'Label',
    addressField: 'Address',
  },
  backup: {
    title: 'Backup & Restore',
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
  license: {
    title: 'License',
    summaryTitle: 'In plain English',
    canUse: 'You can use wwwallet for free, for personal and other noncommercial purposes.',
    canRead: 'You can read and audit every line of its source code.',
    cannot: "You can't copy, change, redistribute or sell it.",
    englishNote: 'The full license follows, in its original English — it is the legal text.',
    viewSource: 'View source on GitHub',
  },
  vaultSetup: {
    createTitle: 'Create your wallet',
    createIntroBody:
      "Generates a new recovery phrase and vault on this device. Nothing is sent to a server — you're fully in control from the start.",
    createWalletCta: 'Create wallet',
    disclaimerTitle: 'Before you continue',
    disclaimerBody:
      'wwwallet is non-custodial software provided “as is”, without warranty of any kind. You alone control your keys and funds: a lost recovery phrase or backup cannot be recovered by anyone, and blockchain transactions are irreversible. wwwallet is not financial, investment, legal, or tax advice. Use it at your own risk. The code is source-available under the PolyForm Strict License 1.0.0 — you may read and audit it, but not copy, modify, redistribute, or use it commercially.',
    disclaimerLicenseLink: 'Read the license',
    disclaimerAckLabel: 'I have read and accept these terms',
    // Whole sentences, never split around an emphasised word or a noun
    // dropped in: word order and grammar differ between languages, so
    // fragments translated apart don't fit back together.
    recoveryExplainer:
      "This is your recovery phrase. It encrypts everything on this device. Write it down or copy it somewhere safe, offline. You won't need it day-to-day once quick unlock is set up on the next screen, and wwwallet will never show it to you again.",
    recoveryOnlyWayBack:
      "This is the only way back into your wallet if you ever lose access to your passkey — including restoring a backup on a new device. Without it, any funds stored in the wallet are completely and irretrievably lost.",
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
    priceTooltip: 'Price of 1 {symbol} token in USD',
    amount: 'Amount',
    amountTooltip: 'Amount of {symbol} tokens held',
    total: 'Total',
    totalTooltip: 'Total value of tokens held in local currency',
    network: 'Network',
    addFavourite: 'Add to favourites (shown on the lock screen)',
    removeFavourite: 'Remove from favourites',
    refreshPrice: 'Click to refresh',
    moreDetails: 'More',
    lessDetails: 'Less',
    currentPrice: 'Current price (USD)',
    change24h: '24h change',
    chart24h: 'Past 24 hours',
  },
  qrScanner: {
    title: 'Scan address QR code',
    cameraError: 'Camera access failed. Check permissions and try again.',
  },
  validation: {
    amountGreaterThanZero: 'Enter an amount greater than zero.',
    insufficientBalance:
      'Amount to send is more than the FROM account balance (including transaction fee).',
    insufficientGas: 'Not enough {symbol} in this account to cover the transaction fee.',
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
    approval: {
      submitted: 'Approval submitted. Waiting for it to confirm…',
      confirmed: 'Approval confirmed. Preparing transaction…',
      failed: 'Approval failed. Hash: {hash}',
      stillPending: "Approval still pending — it hasn't been confirmed yet. Try again shortly. Hash: {hash}",
    },
    bridge: {
      waiting: 'Bridge submitted. Waiting for it to confirm…',
      inFlight: 'On its way to {network} — usually {eta}.',
      arrived: 'Arrived on {network}.',
      refunded: 'The bridge refunded this transfer. Hash: {hash}',
      failed: 'Bridge transfer failed. Hash: {hash}',
      stillPending: 'Still on its way — check back later. Hash: {hash}',
    },
    swap: {
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
      "This device's built-in Face ID / Touch ID can't unlock wwwallet (it lacks the WebAuthn PRF feature). Try a passkey on your phone or a security key instead, or set an unlock password for this device.",
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
    incorrectUnlockPassword: 'Incorrect unlock password.',
    recoveryPhraseNotSetUp: 'Recovery phrase is not set up for this vault.',
    passkeyNotSetUp: 'Passkey is not set up for this vault.',
    passwordNotSetUp: 'Password is not set up for this vault.',
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
    serviceBusy: 'wwwallet is busy right now — please try again in a minute.',
    tokenNotOnChain: "That token isn't supported on one of these networks.",
    noLiquidity: 'No route is available for this right now — try a different token, amount or network.',
    transactionWouldFail:
      'This transaction would fail if submitted — check your balance and any required approval.',
  },
  accountCarousel: {
    label: '{name} on each network',
    show: 'Show the {network} account',
  },
  favourites: {
    title: 'Favourites',
    edit: 'Edit favourites',
    doneEditing: 'Done',
    hideCard: 'Hide this card',
    showCard: 'Show this card',
    empty: 'No favourites yet — use the pencil to add coins or currency pairs.',
    dragToReorder: 'Drag to reorder',
    remove: 'Remove {name} from favourites',
    add: 'Add {name} to favourites',
    addLabel: 'Add a favourite',
    addPlaceholder: 'Bitcoin, SOL, EUR/USD…',
    fxPair: 'Currency pair',
    searchFailed: "Couldn't search right now — try again in a moment.",
    noResults: 'No matches.',
  },
}

export const websiteEn = {
  // The page's title and description in search results and link previews
  // (set per language by scripts/prerender.mjs). Keep the title under ~60
  // characters and the description under ~160, or search engines cut them.
  meta: {
    title: 'wwwallet — Free, non-custodial Ethereum wallet',
    description:
      'Free Ethereum wallet in your browser. No sign-up, no ads, no tracking — your keys stay encrypted on your device. Ethereum, Arbitrum, Base, Optimism and Polygon.',
  },
  nav: {
    principles: 'Principles',
    wallet: 'wwwallet',
    ethereum: 'Ethereum',
    crypto: 'Crypto',
    faqs: 'FAQs',
    launch: 'Launch wwwallet',
    home: 'Back to top',
    sectionNavLabel: 'Section navigation',
  },
  license: {
    title: 'License',
    close: 'Close',
    summaryTitle: 'In plain English',
    canUse: 'You can use wwwallet for free, for personal and other noncommercial purposes.',
    canRead: 'You can read and audit every line of its source code.',
    cannot: "You can't copy, change, redistribute or sell it.",
    englishNote: 'The full license follows, in its original English — it is the legal text.',
    viewSource: 'View source on GitHub',
  },
  settings: {
    open: 'Settings',
    close: 'Close settings',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Language',
    search: 'Search',
    noMatches: 'No matches',
    version: 'Version {version}',
  },
  hero: {
    eyebrow: 'A free, non-custodial Ethereum wallet',
    heading1: 'Your keys.',
    heading2: 'Your device.',
    heading3: 'Free for everyone.',
    lede: 'wwwallet runs in your browser and keeps your keys encrypted on your own device. There’s no account to create, nothing to pay and no ads, and it works the same way for everyone.',
    ctaPrimary: 'Launch wwwallet',
    ctaSecondary: 'See how it works',
    note: 'No sign-up · No ads · No tracking · 31 languages',
  },
  principles: {
    eyebrow: 'Principles',
    heading: 'Free, open and built for anyone',
    lede: 'Software that holds your money should be a tool you use, not a business built on its users. These are the commitments wwwallet is built around.',
    items: [
      {
        title: 'Free, with no catch',
        body: 'No price, no premium tier, no paid features. wwwallet adds no fees of its own — the only cost is the network’s own transaction fee.',
      },
      {
        title: 'No ads, no tracking',
        body: 'No adverts, no analytics, no tracking scripts, and no data sold to anyone. There’s no profile of you to sell in the first place.',
      },
      {
        title: 'No sign-up',
        body: 'No email, phone number or ID check. Open it, create a wallet, and you’re ready.',
      },
      {
        title: 'Your keys stay with you',
        body: 'Keys are created and encrypted on your device and never leave it. wwwallet can’t see them, move your funds or lock you out.',
      },
      {
        title: 'Works anywhere',
        body: 'Runs in any modern browser on phone or desktop, and installs like an app — no app store account needed.',
      },
      {
        title: 'In 31 languages',
        body: 'Use it in the language you’re most comfortable with, in light or dark mode.',
      },
      {
        title: 'Code in the open',
        body: 'The full source is published for anyone to read and audit. It’s source-available rather than open source — the FAQs explain what the licence allows.',
      },
      {
        title: 'Nothing to switch off',
        body: 'There’s no account for anyone to freeze. Your funds live on Ethereum itself, and any account’s key can be taken to another wallet at any time.',
      },
    ],
  },
  wallet: {
    eyebrow: 'wwwallet',
    heading: 'Built so only you can open it',
    lede: "wwwallet doesn't hold your funds — it helps you hold them yourself. Here's what that means in practice.",
    points: [
      {
        title: 'Non-custodial, always',
        body: "Your private keys are generated and encrypted on your own device. wwwallet's servers never see them — there's no database of keys to breach, because there isn't a database at all.",
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
        title: 'Five Ethereum networks, one set of accounts',
        body: 'Hold and send across Ethereum mainnet, Polygon, Arbitrum, Base, and Optimism with the same accounts and addresses.',
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
        body: 'A custodial wallet or exchange holds your keys for you — convenient, but you’re trusting someone else not to freeze, lose, or misuse your funds. A non-custodial wallet such as wwwallet leaves the keys, and the responsibility, in your hands alone.',
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
        body: 'No exchange, no support agent and nobody from wwwallet will ever ask for your recovery phrase — whichever app you use. Anyone who does is trying to rob you.',
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
        q: 'Is wwwallet really free?',
        a: 'Yes. There’s no charge to use it, no premium tier and nothing behind a paywall, and wwwallet adds no fee to anything you send or swap. The only unavoidable cost is the network’s own transaction (gas) fee, which goes to the network rather than to wwwallet. Swap quotes come from the 0x exchange aggregator, which can include its own fee on some trades — any such fee is listed on the review screen before you confirm.',
      },
      {
        q: 'Are there ads, trackers or analytics?',
        a: 'No. wwwallet shows no ads, runs no analytics or tracking scripts, and doesn’t build a profile of you. There’s no account, so there’s nothing to attach one to.',
      },
      {
        q: 'Do I need an account or ID to use it?',
        a: 'No. There’s no sign-up, email address, phone number or identity check — you create a wallet on your device and start using it.',
      },
      {
        q: 'If it’s free, how does wwwallet pay for itself?',
        a: 'It doesn’t make money from its users — no fees, no ads, no data sales. Running costs are kept small by design: the app itself runs in your browser, and the backend only relays public blockchain and price data.',
      },
      {
        q: 'Can anyone freeze my wallet?',
        a: 'There’s no account, so there’s nothing for wwwallet — or anyone else — to freeze. Your keys never leave your device, and transactions are signed there before they’re sent to the network. Your funds live on Ethereum, not in wwwallet: you can view any account’s private key or recovery phrase from its menu and import it into any other Ethereum wallet app whenever you like.',
      },
      {
        q: 'Is my recovery phrase enough to get my wallet back?',
        a: 'Not by itself. Your recovery phrase unlocks your encrypted vault, but the vault itself lives only on your device. If you lose or wipe that device without ever taking a backup, there’s nothing left for the phrase to unlock. Always pair your recovery phrase with a Google Drive or file backup — see the next question.',
      },
      {
        q: 'How do I back up my wallet?',
        a: 'From Settings, back up your encrypted vault to your own Google Drive or as a file you download and keep yourself. A Drive backup goes in a private app folder, and wwwallet can’t see anything else in your Drive. Back up when you first set up, and again whenever you add accounts.',
      },
      {
        q: 'Can I use wwwallet on more than one device?',
        a: 'Yes, but it doesn’t sync automatically — each device holds its own local vault. To use wwwallet on a new device, restore it there from a Drive or file backup, then unlock with your recovery phrase.',
      },
      {
        q: 'What happens if I lose my device and never backed up?',
        a: 'Your funds are unrecoverable. That’s by design: wwwallet has no account system and keeps no copy of your vault anywhere, so nobody — including us — can restore it for you. It’s the trade-off for keys nobody but you can access.',
      },
      {
        q: 'Do passkeys (Face ID / Touch ID) carry over to a new device?',
        a: 'No. A passkey is tied to the device it was created on. After restoring a backup on a new device, unlock with your recovery phrase and you can set up a fresh passkey there.',
      },
      {
        q: 'Is wwwallet open source?',
        a: 'No — it’s source-available. The full source is public on GitHub so anyone can read, review, and audit it, but it isn’t open source: the code is licensed under the PolyForm Strict License 1.0.0.',
      },
      {
        q: 'What am I allowed to do with the code?',
        a: 'You can read and audit all of it, and run an unmodified copy for noncommercial purposes such as personal study, research, and testing. You can’t distribute it, modify it or build derivative works (including forks), or use it commercially. If you need something the license doesn’t allow, contact the copyright holder for a separate license.',
      },
      {
        q: 'Is wwwallet safe to use? Is there any warranty?',
        a: 'wwwallet is non-custodial software provided “as is”, without warranty of any kind. You alone control your keys and funds — nobody, including us, can recover a lost recovery phrase or backup, reverse a transaction, or compensate you for losses. Only use funds you can afford to lose, double-check addresses and networks before you send, and nothing here is financial, investment, legal, or tax advice.',
      },
      {
        q: 'What networks does wwwallet support?',
        a: 'Ethereum mainnet, plus the Layer-2 networks Polygon, Arbitrum, Base, and Optimism — all from the same set of accounts.',
      },
      {
        q: 'How do I fund my wallet?',
        a: 'Open an account, choose “View QR code” to see its address, and send funds to that address from an exchange or another wallet. Make sure you send on the right network (Ethereum, Polygon, Arbitrum, Base, or Optimism) — the same address works on all of them, but funds sent on one network only appear on that network. You’ll also want a little of the network’s native coin (such as ETH) to pay transaction fees.',
      },
      {
        q: 'What can I do with wwwallet?',
        a: 'Send: transfer ETH or any token to an address you paste, scan from a QR code, or pick from your own accounts, and review the details before you confirm. Swap: exchange one token for another on the same network from the Swap tab, with a quote and fee estimate shown up front. Receive: show your address as a QR code. You can also see your balances with USD values and your transaction history across all supported networks.',
      },
      {
        q: 'What does wwwallet know about me?',
        a: 'Nothing that identifies you. There’s no account, login, or database. Balance and price data is fetched through wwwallet’s own backend rather than your browser calling third-party providers directly, and that backend never sees your keys, passwords, or recovery phrase.',
      },
    ],
  },
  footer: {
    tagline: 'A free, non-custodial Ethereum wallet for everyone.',
    copyright: '© {year} wwwallet',
    licenseLink: 'Licensed under PolyForm Strict 1.0.0',
    disclaimer:
      'Non-custodial software provided “as is”, without warranty. Not financial advice. You are solely responsible for your keys and funds.',
  },
}
