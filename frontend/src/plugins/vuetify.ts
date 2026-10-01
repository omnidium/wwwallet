import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

// Real hex colors are intentionally NOT defined here for Vuetify's own
// built-in color slots (primary/secondary/background/surface/surface-variant/
// error/info/etc.) — Vuetify's theme engine can't consume CSS custom
// properties as color values (it needs real hex/rgb to compute automatic
// on-color contrast), so instead shared/design-tokens.css is the single
// hand-edited source of truth, and frontend/src/assets/main.css overrides
// every --v-theme-*/--v-border-* variable Vuetify generates from whatever
// defaults it falls back to below, pointing each one at design-tokens.css's
// own -rgb tokens. See that file's header for the full explanation
// (including why on-color pairs are hand-supplied rather than
// Vuetify-computed).
//
// send/receive/link are the one exception: they're app-specific names with
// no equivalent in Vuetify's own built-in theme, so Vuetify has no reason to
// generate the `.bg-send`/`.text-send`/etc. utility classes `color="send"`
// props rely on (TransactionRow.vue, AccountCard.vue) unless something
// registers that key. The actual hex values below are never seen — the CSS
// override replaces them immediately — they exist purely so Vuetify knows
// these three color names exist at all.
const UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION = '#000000'
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          send: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
          receive: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
          link: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
        },
        // Vuetify's default light-theme medium-emphasis-opacity (0.60) fails
        // WCAG contrast for field labels against this app's field/surface
        // colors — confirmed via a Lighthouse accessibility audit. Bumped
        // until it clears 4.5:1. Not a color, so no duplication problem to
        // solve — left here rather than also routed through CSS.
        variables: {
          'medium-emphasis-opacity': 0.74,
        },
      },
      dark: {
        dark: true,
        colors: {
          send: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
          receive: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
          link: UNUSED_PLACEHOLDER_FOR_UTILITY_CLASS_GENERATION,
        },
      },
    },
  },
  defaults: {
    // Vuetify 4 changed VBtn's default variant from "elevated" (filled) to
    // "text" — left unset, every color="primary" button in the app rendered
    // as plain unstyled text instead of a filled button, unlike the old
    // app's clearly filled `.button-ok` action buttons. "flat" is a filled
    // button with no elevation shadow, closest to that old style.
    VBtn: { variant: 'flat', rounded: 'lg' },
    // VCardActions has its own nested default (variant: 'text') for every
    // VBtn inside it, which wins over the root-level default above since
    // it's a closer provider in the component tree — nearly every primary
    // action button in this app lives inside a VCardActions. Buttons that
    // explicitly set variant="text" themselves (e.g. "Cancel" links) are
    // unaffected, since an explicit prop always beats a provided default.
    VCardActions: { VBtn: { variant: 'flat' } },
    VCard: { rounded: 'xl' },
    // The old app's inputs are solid rounded gray boxes (`.input2`), not the
    // underlined-only style that's Vuetify's default. "filled" gives a real
    // background tint; "solo" needs its elevation shadow (removed by `flat`)
    // to read as a box at all, so it's not usable here.
    VTextField: { variant: 'filled', rounded: 'lg' },
    VSnackbar: { rounded: 'xl' },
  },
})
