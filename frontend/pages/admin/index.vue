<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

interface Order {
  id: string
  createdAt: string
  customerName: string
  customerEmail: string
  total: number
  status: string
}

interface DashboardData {
  totalOrders: number
  paidOrders: number
  totalRevenue: number
  recentOrders: Order[]
}

const { apiFetch } = useApi()
const authStore = useAuthStore()

const dashboard = ref<DashboardData | null>(null)
const loading = ref(true)
const error = ref('')

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/15 text-yellow-400',
  PAID: 'bg-green-500/15 text-green-400',
  PROCESSING: 'bg-blue-500/15 text-blue-400',
  SHIPPED: 'bg-purple-500/15 text-purple-400',
  DELIVERED: 'bg-emerald-500/15 text-emerald-400',
  CANCELLED: 'bg-red-500/15 text-red-400',
}

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  PAID: 'Payee',
  PROCESSING: 'En traitement',
  SHIPPED: 'Expediee',
  DELIVERED: 'Livree',
  CANCELLED: 'Annulee',
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatPrice = (amount: number) => {
  return amount.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
}

const fetchDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    dashboard.value = await apiFetch<DashboardData>('/admin/dashboard', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors du chargement du tableau de bord'
    if (e?.status === 401) authStore.logout()
  } finally {
    loading.value = false
  }
}

onMounted(fetchDashboard)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">Tableau de bord</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-400">Chargement...</div>

    <!-- Error -->
    <div v-else-if="error" class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
      {{ error }}
    </div>

    <template v-else-if="dashboard">
      <!-- Stat cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Total commandes -->
        <div class="bg-surface-light rounded-xl p-5 border border-white/10">
          <p class="text-sm text-gray-400 mb-1">Total Commandes</p>
          <p class="text-3xl font-bold text-white">{{ dashboard.totalOrders }}</p>
        </div>
        <!-- Commandes payees -->
        <div class="bg-surface-light rounded-xl p-5 border border-white/10">
          <p class="text-sm text-gray-400 mb-1">Commandes Payees</p>
          <p class="text-3xl font-bold text-brand">{{ dashboard.paidOrders }}</p>
        </div>
        <!-- Revenu total -->
        <div class="bg-surface-light rounded-xl p-5 border border-white/10">
          <p class="text-sm text-gray-400 mb-1">Revenu Total</p>
          <p class="text-3xl font-bold text-white">{{ formatPrice(dashboard.totalRevenue) }}</p>
        </div>
      </div>

      <!-- Recent orders -->
      <div class="bg-surface-light rounded-xl border border-white/10 overflow-hidden">
        <div class="px-5 py-4 border-b border-white/10">
          <h2 class="text-lg font-semibold text-white">Commandes recentes</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-white/10 text-gray-400 text-left">
                <th class="px-5 py-3 font-medium">Date</th>
                <th class="px-5 py-3 font-medium">Client</th>
                <th class="px-5 py-3 font-medium">Email</th>
                <th class="px-5 py-3 font-medium">Total</th>
                <th class="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in dashboard.recentOrders"
                :key="order.id"
                class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td class="px-5 py-3 text-gray-300">{{ formatDate(order.createdAt) }}</td>
                <td class="px-5 py-3 text-white">{{ order.customerName }}</td>
                <td class="px-5 py-3 text-gray-400">{{ order.customerEmail }}</td>
                <td class="px-5 py-3 text-white font-medium">{{ formatPrice(order.total) }}</td>
                <td class="px-5 py-3">
                  <span
                    :class="statusColors[order.status] || 'bg-gray-500/15 text-gray-400'"
                    class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ statusLabels[order.status] || order.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="!dashboard.recentOrders?.length">
                <td colspan="5" class="px-5 py-8 text-center text-gray-500">Aucune commande</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
