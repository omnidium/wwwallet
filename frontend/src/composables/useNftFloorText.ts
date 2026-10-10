import { useI18n } from 'vue-i18n'
import type { ChainSlug } from '@/services/api'
import { useChainDataStore } from '@/stores/chainData'
import { useSettingsLocaleStore } from '@/stores/settingsLocale'
import { convertUsd, formatAmount, formatFiat } from '@/services/money'
import { NATIVE_ASSETS } from '@/config/nativeAssets'
import { showsFloorPrice } from '@/config/nfts'

/** "0.0024 ETH (≈ $6.00)" for a collection's floor price, or null where there's none to show. */
export function useNftFloorText() {
  const { locale } = useI18n({ useScope: 'global' })
  const chainData = useChainDataStore()
  const settingsLocale = useSettingsLocaleStore()

  return (chain: ChainSlug, floorPrice: number | null): string | null => {
    if (floorPrice === null || !showsFloorPrice(chain)) return null
    const native = `${formatAmount(floorPrice)} ${NATIVE_ASSETS[chain].symbol}`
    const usdPrice = chainData.nativePriceUsdByChain[chain]
    if (usdPrice === undefined) return native
    const fiat = formatFiat(
      convertUsd(floorPrice * usdPrice, settingsLocale.currency, chainData.fxRates),
      settingsLocale.currency,
      locale.value,
    )
    return `${native} (≈ ${fiat})`
  }
}
