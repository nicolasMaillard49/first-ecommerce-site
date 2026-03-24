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
  totalAmount: number
  status: string
}

interface OrdersResponse {
  orders: Order[]
  total: number
  page: number
  totalPages: number
}

const { apiFetch } = useApi()
const authStore = useAuthStore()

const data = ref<OrdersResponse | null>(null)
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)
const updatingOrderId = ref<string | null>(null)

const statuses = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  PAID: 'bg-green-500/15 text-green-400 border-green-500/30',
  PROCESSING: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  SHIPPED: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  DELIVERED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/30',
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
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatPrice = (cents: number) => {
  return (cents / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
}

const fetchOrders = async () => {
  loading.value = true
  error.value = ''
  try {
    data.value = await apiFetch<OrdersResponse>(`/admin/orders?page=${currentPage.value}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors du chargement des commandes'
    if (e?.status === 401) authStore.logout()
  } finally {
    loading.value = false
  }
}

const updateStatus = async (orderId: string, newStatus: string) => {
  updatingOrderId.value = orderId
  try {
    await apiFetch(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { status: newStatus },
    })
    // Update locally
    if (data.value) {
      const order = data.value.orders.find((o) => o.id === orderId)
      if (order) order.status = newStatus
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors de la mise a jour du statut'
    if (e?.status === 401) authStore.logout()
  } finally {
    updatingOrderId.value = null
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  fetchOrders()
}

onMounted(fetchOrders)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">Commandes</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-400">Chargement...</div>

    <!-- Error -->
    <div v-if="error" class="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
      {{ error }}
    </div>

    <template v-if="data && !loading">
      <!-- Orders table -->
      <div class="bg-surface-light rounded-xl border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-white/10 text-gray-400 text-left">
                <th class="px-5 py-3 font-medium">Date</th>
                <th class="px-5 py-3 font-medium">Client</th>
                <th class="px-5 py-3 font-medium">Email</th>
                <th class="px-5 py-3 font-medium">Total</th>
                <th class="px-5 py-3 font-medium">Statut</th>
                <th class="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in data.orders"
                :key="order.id"
                class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td class="px-5 py-3 text-gray-300 whitespace-nowrap">{{ formatDate(order.createdAt) }}</td>
                <td class="px-5 py-3 text-white">{{ order.customerName }}</td>
                <td class="px-5 py-3 text-gray-400">{{ order.customerEmail }}</td>
                <td class="px-5 py-3 text-white font-medium whitespace-nowrap">{{ formatPrice(order.totalAmount) }}</td>
                <td class="px-5 py-3">
                  <span
                    :class="statusColors[order.status] || 'bg-gray-500/15 text-gray-400'"
                    class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ statusLabels[order.status] || order.status }}
                  </span>
                </td>
                <td class="px-5 py-3">
                  <select
                    :value="order.status"
                    :disabled="updatingOrderId === order.id"
                    class="bg-surface border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50"
                    @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                  >
                    <option v-for="s in statuses" :key="s" :value="s">
                      {{ statusLabels[s] || s }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr v-if="!data.orders?.length">
                <td colspan="6" class="px-5 py-8 text-center text-gray-500">Aucune commande</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="data.totalPages > 1" class="flex items-center justify-between mt-4">
        <p class="text-sm text-gray-400">
          Page {{ data.page }} sur {{ data.totalPages }} ({{ data.total }} commandes)
        </p>
        <div class="flex gap-2">
          <button
            :disabled="currentPage <= 1"
            class="px-4 py-2 text-sm font-medium bg-surface-light border border-white/10 rounded-lg text-gray-300 hover:bg-surface-lighter disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="goToPage(currentPage - 1)"
          >
            Precedent
          </button>
          <button
            :disabled="currentPage >= data.totalPages"
            class="px-4 py-2 text-sm font-medium bg-surface-light border border-white/10 rounded-lg text-gray-300 hover:bg-surface-lighter disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="goToPage(currentPage + 1)"
          >
            Suivant
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
