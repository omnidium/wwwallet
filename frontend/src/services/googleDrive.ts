// Backup/recovery talks to Google directly from the browser — the wwwallet
// backend is never involved. Requires a public OAuth 2.0 Client ID (no secret)
// with the Drive API enabled, set as VITE_GOOGLE_CLIENT_ID.

import { translatedError } from './errors'

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string
            scope: string
            callback: (response: { access_token?: string; error?: string }) => void
          }): { requestAccessToken: () => void }
        }
      }
    }
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata'
const BACKUP_FILENAME = 'wwwallet-vault.json'

let gisScriptPromise: Promise<void> | null = null

function loadGisScript(): Promise<void> {
  if (gisScriptPromise) return gisScriptPromise
  gisScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = () => resolve()
    script.onerror = () => reject(translatedError('errors.gisLoadFailed'))
    document.head.appendChild(script)
  })
  return gisScriptPromise
}

async function getAccessToken(): Promise<string> {
  if (!CLIENT_ID) throw translatedError('errors.googleDriveNotConfigured')
  await loadGisScript()
  return new Promise((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      // response.error, when present, is a short OAuth error code
      // (e.g. "access_denied", "popup_closed_by_user") straight from
      // Google — never shown as-is, since it's English-only and not
      // exactly user-facing wording to begin with.
      callback: (response) => {
        if (response.access_token) resolve(response.access_token)
        else reject(translatedError('errors.googleSignInCancelled'))
      },
    })
    client.requestAccessToken()
  })
}

/** A fetch() call itself rejects (a native, untranslated TypeError) on a network failure, not just on a non-2xx response — both mean the same thing to the caller here, so both funnel through failKey. */
async function fetchOrThrow(input: string | URL, init: RequestInit, failKey: string): Promise<Response> {
  let res: Response
  try {
    res = await fetch(input, init)
  } catch {
    throw translatedError(failKey)
  }
  if (!res.ok) throw translatedError(failKey)
  return res
}

async function findBackupFileId(accessToken: string): Promise<string | null> {
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('spaces', 'appDataFolder')
  url.searchParams.set('q', `name = '${BACKUP_FILENAME}'`)
  url.searchParams.set('fields', 'files(id)')

  const res = await fetchOrThrow(
    url,
    { headers: { Authorization: `Bearer ${accessToken}` } },
    'errors.googleDriveSearchFailed',
  )
  const body = (await res.json()) as { files?: { id: string }[] }
  return body.files?.[0]?.id ?? null
}

export async function backupToGoogleDrive(blob: Blob): Promise<void> {
  const accessToken = await getAccessToken()
  const existingFileId = await findBackupFileId(accessToken)

  const metadata = existingFileId ? {} : { name: BACKUP_FILENAME, parents: ['appDataFolder'] }
  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
  form.append('file', blob)

  const url = existingFileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=multipart`
    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'

  await fetchOrThrow(
    url,
    { method: existingFileId ? 'PATCH' : 'POST', headers: { Authorization: `Bearer ${accessToken}` }, body: form },
    'errors.googleDriveUploadFailed',
  )
}

export async function restoreFromGoogleDrive(): Promise<Blob> {
  const accessToken = await getAccessToken()
  const fileId = await findBackupFileId(accessToken)
  if (!fileId) throw translatedError('errors.googleDriveNoBackup')

  const res = await fetchOrThrow(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
    'errors.googleDriveDownloadFailed',
  )
  return res.blob()
}
