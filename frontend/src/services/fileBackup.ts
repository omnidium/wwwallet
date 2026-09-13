const BACKUP_FILENAME = 'wwwallet-vault.json'

export function downloadEncryptedVaultBlob(blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = BACKUP_FILENAME
  link.click()
  URL.revokeObjectURL(url)
}
