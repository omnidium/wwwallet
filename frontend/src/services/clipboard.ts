const CLIPBOARD_CLEAR_MS = 45_000

/**
 * Copies `text` to the clipboard, then clears it again after 45s — used for
 * every secret this app ever displays (recovery phrase, private key,
 * mnemonic) so none of them sit in the clipboard indefinitely.
 */
export async function copyWithAutoClear(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
  setTimeout(async () => {
    try {
      // Only clear it if it's still what we put there — don't clobber
      // something else the user copied in the meantime.
      const current = await navigator.clipboard.readText()
      if (current === text) await navigator.clipboard.writeText('')
    } catch {
      // Clipboard read access can be denied/unsupported — nothing to do then.
    }
  }, CLIPBOARD_CLEAR_MS)
}
