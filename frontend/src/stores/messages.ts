import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SNACKBAR_DEFAULT_TIMEOUT_MS } from '@/config/appSettings'

export interface AppMessage {
  id: number
  text: string
  severity: 'info' | 'success' | 'warning' | 'error'
  /** -1 means "stays until manually dismissed or updated" (Vuetify's v-snackbar convention). */
  timeout: number
}

let nextId = 1

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<AppMessage[]>([])

  function push(text: string, severity: AppMessage['severity'] = 'info', timeout = SNACKBAR_DEFAULT_TIMEOUT_MS) {
    const id = nextId++
    messages.value.push({ id, text, severity, timeout })
    return id
  }

  /** Advances an in-flight message to its next stage, e.g. a staged transaction toast. */
  function update(id: number, text: string, severity?: AppMessage['severity'], timeout = SNACKBAR_DEFAULT_TIMEOUT_MS) {
    const message = messages.value.find((m) => m.id === id)
    if (!message) return
    message.text = text
    if (severity) message.severity = severity
    message.timeout = timeout
  }

  function dismiss(id: number) {
    messages.value = messages.value.filter((m) => m.id !== id)
  }

  return { messages, push, update, dismiss }
})
