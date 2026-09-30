export default {
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
