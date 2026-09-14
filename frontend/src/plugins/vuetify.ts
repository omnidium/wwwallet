import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

// Matches the old Angular app's Material theme (custom-theme.scss) as closely
// as makes sense in Vuetify: same primary/accent/warn colors and surface
// tokens, plus its send/receive/link accent colors as named theme colors.
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#478e07',
          secondary: '#3472ca',
          error: '#f44336',
          background: '#fafafa',
          surface: '#ffffff',
          send: '#ff6666',
          receive: '#79ae57',
          link: '#0909c2',
          info: '#cba968',
        },
        // Vuetify's default light-theme medium-emphasis-opacity (0.60) fails
        // WCAG contrast for field labels against this app's field/surface
        // colors — confirmed via a Lighthouse accessibility audit. Bumped
        // until it clears 4.5:1.
        variables: {
          'medium-emphasis-opacity': 0.74,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#478e07',
          secondary: '#3472ca',
          error: '#f44336',
          background: '#303030',
          surface: '#424242',
          send: '#660000',
          receive: '#082100',
          link: '#b3b3ff',
          info: '#9d4700',
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
