// A file of its own rather than inline in index.html: the app's
// Content-Security-Policy (_headers) allows only scripts from its own
// origin (and Google's sign-in), so an inline one is blocked.
// The Pages project is also reachable at its default wwwallet.pages.dev
// address; send it to the canonical domain. Exact-host match only, so
// branch previews (<hash>.wwwallet.pages.dev) are left alone.
if (location.hostname === 'wwwallet.pages.dev') {
  location.replace('https://app.wwwallet.me' + location.pathname + location.search + location.hash)
}
