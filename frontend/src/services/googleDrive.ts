// Backup/recovery talks to Google directly from the browser — the wwwallet
// backend is never involved. Requires a public OAuth 2.0 Client ID (no secret)
// with the Drive API enabled, set as VITE_GOOGLE_CLIENT_ID.

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
    script.onerror = () => reject(new Error('failed to load Google Identity Services'))
    document.head.appendChild(script)
  })
  return gisScriptPromise
}

async function getAccessToken(): Promise<string> {
  if (!CLIENT_ID) throw new Error('Google Drive backup is not configured (VITE_GOOGLE_CLIENT_ID missing)')
  await loadGisScript()
  return new Promise((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: (response) => {
        if (response.access_token) resolve(response.access_token)
        else reject(new Error(response.error ?? 'Google sign-in was cancelled'))
      },
    })
    client.requestAccessToken()
  })
}

async function findBackupFileId(accessToken: string): Promise<string | null> {
  const url = new URL('https://www.googleapis.com/drive/v3/files')
  url.searchParams.set('spaces', 'appDataFolder')
  url.searchParams.set('q', `name = '${BACKUP_FILENAME}'`)
  url.searchParams.set('fields', 'files(id)')

  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } })
  if (!res.ok) throw new Error('failed to search Google Drive')
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

  const res = await fetch(url, {
    method: existingFileId ? 'PATCH' : 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: form,
  })
  if (!res.ok) throw new Error('failed to upload backup to Google Drive')
}

export async function restoreFromGoogleDrive(): Promise<Blob> {
  const accessToken = await getAccessToken()
  const fileId = await findBackupFileId(accessToken)
  if (!fileId) throw new Error('no backup found in this Google account')

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('failed to download backup from Google Drive')
  return res.blob()
}
