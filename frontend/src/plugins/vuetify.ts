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
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'xl' },
    VTextField: { rounded: 'lg' },
    VSnackbar: { rounded: 'xl' },
  },
})
