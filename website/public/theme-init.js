// Applied before any CSS/JS loads (index.html loads it as a blocking
// script) so there's no flash of the wrong theme — this page is
// public/SEO-facing, unlike the wallet app, which sits behind an auth gate
// where a brief flash goes unnoticed.
//
// A file of its own rather than inline in index.html: the site's
// Content-Security-Policy (public/_headers) allows only scripts from its own
// origin, so an inline one is blocked.
;(function () {
  try {
    // A cookie, not localStorage: this value is shared with the wallet
    // app at app.wwwallet.me (see src/composables/sharedPrefs.ts) —
    // localStorage doesn't cross that origin boundary, a cookie scoped
    // to the parent domain does.
    var match = document.cookie.match(/(?:^|; )wwwallet\.theme=([^;]*)/)
    var stored = match ? decodeURIComponent(match[1]) : null
    var theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  } catch {
    document.documentElement.setAttribute('data-theme', 'light')
  }
})()
