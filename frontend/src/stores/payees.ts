import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChainSlug } from '@/services/api'

export interface Payee {
  id: string
  label: string
  address: string
  chain: ChainSlug
}

/** Payees live inside the encrypted vault, not a backend table — see stores/vault.ts. */
export const usePayeesStore = defineStore('payees', () => {
  const payees = ref<Payee[]>([])

  return { payees }
})
