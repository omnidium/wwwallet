import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AppMessage {
  id: number
  text: string
  severity: 'info' | 'success' | 'warning' | 'error'
}

let nextId = 1

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<AppMessage[]>([])

  function push(text: string, severity: AppMessage['severity'] = 'info') {
    const id = nextId++
    messages.value.push({ id, text, severity })
    return id
  }

  function dismiss(id: number) {
    messages.value = messages.value.filter((m) => m.id !== id)
  }

  return { messages, push, dismiss }
})
