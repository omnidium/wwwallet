import { ref } from 'vue'

// Module-level, not per-component-instance: dismissing the reminder should
// hide it for the rest of this session everywhere it's shown, and naturally
// reset on the next full page load — matching the old app's `showBackupReminder`
// behavior, which was likewise never persisted to storage.
const dismissed = ref(false)

export function useBackupReminderDismissed() {
  return dismissed
}
