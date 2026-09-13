import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChainSlug } from '@/services/api'
import { useVaultStore } from '@/stores/vault'

export interface Payee {
  id: string
  label: string
  address: string
  chain: ChainSlug
}

/** Payees live inside the encrypted vault, not a backend table — see stores/vault.ts. */
export const usePayeesStore = defineStore('payees', () => {
  const payees = ref<Payee[]>([])

  async function addPayee(payee: Payee): Promise<void> {
    payees.value.push(payee)
    await useVaultStore().persist()
  }

  async function removePayee(id: string): Promise<void> {
    payees.value = payees.value.filter((p) => p.id !== id)
    await useVaultStore().persist()
  }

  return { payees, addPayee, removePayee }
})
