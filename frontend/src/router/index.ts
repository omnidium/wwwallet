import { createRouter, createWebHistory } from 'vue-router'
import { useVaultStore } from '@/stores/vault'
import { hasVault } from '@/crypto/vault'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'accounts', component: () => import('../views/AccountsView.vue') },
    {
      path: '/accounts/new',
      name: 'add-account',
      component: () => import('../views/AddAccountView.vue'),
    },
    {
      path: '/accounts/:chain/:address/send',
      name: 'send',
      component: () => import('../views/SendView.vue'),
    },
    {
      path: '/accounts/:chain/:address/receive',
      name: 'receive',
      component: () => import('../views/ReceiveView.vue'),
    },
    {
      path: '/accounts/:chain/:address/swap',
      name: 'swap',
      component: () => import('../views/SwapView.vue'),
    },
    { path: '/payees', name: 'payees', component: () => import('../views/PayeesView.vue') },
    { path: '/security', name: 'security', component: () => import('../views/SecurityView.vue') },
    {
      path: '/backup-restore',
      name: 'backup-restore',
      component: () => import('../views/BackupRestoreView.vue'),
    },
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
