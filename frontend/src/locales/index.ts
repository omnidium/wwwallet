import ar from './ar'
import bg from './bg'
import cs from './cs'
import da from './da'
import de from './de'
import el from './el'
import en from './en'
import es from './es'
import et from './et'
import fi from './fi'
import fr from './fr'
import hu from './hu'
import id from './id'
import it from './it'
import iw from './iw'
import ja from './ja'
import ko from './ko'
import lt from './lt'
import lv from './lv'
import nl from './nl'
import no from './no'
import pl from './pl'
import ro from './ro'
import ru from './ru'
import sk from './sk'
import sl from './sl'
import sv from './sv'
import tr from './tr'
import uk from './uk'
import vi from './vi'
import zh_CN from './zh-CN'

export { SUPPORTED_LANGUAGES, type LanguageInfo } from './languages'
export { SUPPORTED_CURRENCIES } from './currencies'

// Deliberately just these 30 (plus English) rather than every language a
// locale-code list might suggest — this project translates via DeepL's API,
// and this is DeepL's own "premium" tier (glossaries, style rules and
// translation memory all supported), not its much larger but unproven
// "basic translation only" tier. See scripts/sync-locales.mjs.
export const messages = {
  ar,
  bg,
  cs,
  da,
  de,
  el,
  en,
  es,
  et,
  fi,
  fr,
  hu,
  id,
  it,
  iw,
  ja,
  ko,
  lt,
  lv,
  nl,
  no,
  pl,
  ro,
  ru,
  sk,
  sl,
  sv,
  tr,
  uk,
  vi,
  'zh-CN': zh_CN,
}
