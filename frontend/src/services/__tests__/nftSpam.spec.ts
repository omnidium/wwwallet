import { describe, expect, it } from 'vitest'
import { isSpamName } from '../nftSpam'

// Real collection names, from two heavily airdropped addresses.
const LURES = [
  '10,000 USDT reward at usdt-stake.top',
  'CLaim at usd-1000.xyz',
  '$1000 CRO VOUCHER!',
  '150M SHIB VOUCHER!',
  '    $30,000 SHIB',
  '$ TWT BOX lvl',
  '✅$ARB AIRDROP',
  'Official Circle USDC Yield Permit',
  'Designated Circle USDC Transfer Authorization',
  'Priority Digital Dollar Handout Certification',
  'My seed phrase',
  'TRX in TrustWallet Mobile [coyote discover soccer retire police welcome custom arrive front rigid treat appear]',
  'Genesis UNI NFT t.me/s/dropuni',
  'Genesis UNI NFT piqo.to/uni',
  'zerolends.com NFT Coupon',
  'yu 𝙚𝙫𝙢𝙚𝙣𝙩𝙧𝙮 .𝙘𝙤𝙢',
  'mm 𝔢v𝔪e𝔫t𝔯y.c𝔬m',
  'Presale is Live ryg',
  ' Mutant Ape Yacht Club #7952 WINNER!',
  '0x66f8cd3ed17a62f180778d135e414f411c1f16f7',
  '3 stETH',
  'Stake - Play Online Casino',
  'BitCase FREESPIN',
]

// Blank, invisible or letterless names: there's nothing to tell them apart by.
const BLANKS = [null, '', '\u00ad', '\u0001trading bots', "'", "''", '1', '$5']

const REAL = [
  'ETHGlobal Sydney Pack',
  'ETHGlobal Supporter Pack',
  'POAP',
  'ObolLockups',
  'Wei Name Service',
  '451.RED_[LE]',
  'rhino.fi Linea Hunter',
  'Consensus.nft',
  'Ivyburn F.C. Fan Club',
  'Uniswap V3 Positions NFT-V1',
  'Wallet Garden Special Editions',
  'Zora Planet 🌏',
  'PI & ERA Astronaut V3✅',
  'Honor: "名誉" (meiyo)',
  'Puffer Mystery Box NFT 145',
  'Treasure Chests: Genesis',
]

describe('NFT spam by name', () => {
  it.each(LURES)('hides the lure %j', (name) => {
    expect(isSpamName(name)).toBe(true)
  })

  it.each(BLANKS)('hides the blank or invisible name %j', (name) => {
    expect(isSpamName(name)).toBe(true)
  })

  it.each(REAL)('shows the real collection %j', (name) => {
    expect(isSpamName(name)).toBe(false)
  })
})
