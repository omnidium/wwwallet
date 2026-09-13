import { createRouter, createWebHistory } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { hasVault } from '@/crypto/vault'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'accounts', component: () => import('../views/AccountsView.vue') },
    {
      path: '/accounts/:chain/:address',
      name: 'account-detail',
      component: () => import('../views/AccountDetailView.vue'),
    },
    { path: '/send', name: 'send', component: () => import('../views/SendView.vue') },
    { path: '/receive', name: 'receive', component: () => import('../views/ReceiveView.vue') },
    { path: '/swap', name: 'swap', component: () => import('../views/SwapView.vue') },
    { path: '/payees', name: 'payees', component: () => import('../views/PayeesView.vue') },
    {
      path: '/backup-restore',
      name: 'backup-restore',
      component: () => import('../views/BackupRestoreView.vue'),
    },
    { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
    {
      path: '/accounts/:chain/:address/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
    },
    {
      path: '/tokens/:chain/:address',
      name: 'token-detail',
      component: () => import('../views/TokenDetailView.vue'),
    },
    {
      path: '/vault/unlock',
      name: 'vault-unlock',
      component: () => import('../views/VaultUnlockView.vue'),
    },
    {
      path: '/vault/setup',
      name: 'vault-setup',
      component: () => import('../views/VaultSetupView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.name === 'vault-unlock' || to.name === 'vault-setup') return true

  const vault = useVaultStore()
  if (vault.isUnlocked) return true

  return { name: (await hasVault()) ? 'vault-unlock' : 'vault-setup' }
})

export default router
