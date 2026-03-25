<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

interface OrderItem {
  id: string
  quantity: number
  price: number
  variant: string | null
  product: {
    name: string
    slug: string
    images: string[]
  }
}

interface Order {
  id: string
  createdAt: string
  updatedAt: string
  customerName: string
  customerEmail: string
  total: number
  status: string
  stripeSessionId: string | null
  stripePaymentId: string | null
  shippingAddress: {
    line1?: string
    line2?: string
    city?: string
    postalCode?: string
    country?: string
  }
  items: OrderItem[]
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
const selectedOrder = ref<Order | null>(null)

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

const formatPrice = (amount: number) => {
  return amount.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
}

const totalQuantity = (order: Order) => {
  return order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
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
    if (data.value) {
      const order = data.value.orders.find((o) => o.id === orderId)
      if (order) order.status = newStatus
    }
    if (selectedOrder.value?.id === orderId) {
      selectedOrder.value.status = newStatus
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors de la mise a jour du statut'
    if (e?.status === 401) authStore.logout()
  } finally {
    updatingOrderId.value = null
  }
}

const openOrder = (order: Order) => {
  selectedOrder.value = order
}

const closeOrder = () => {
  selectedOrder.value = null
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

    <!-- Order detail modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeOrder" />

          <!-- Modal -->
          <div class="relative bg-surface-light border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-surface-light z-10">
              <div>
                <h2 class="text-lg font-bold text-white">Commande</h2>
                <p class="text-xs text-gray-500 font-mono mt-0.5">{{ selectedOrder.id }}</p>
              </div>
              <button
                class="text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
                @click="closeOrder"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="p-6 space-y-6">
              <!-- Status + Date -->
              <div class="flex items-center justify-between">
                <div>
                  <span
                    :class="statusColors[selectedOrder.status]"
                    class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ statusLabels[selectedOrder.status] || selectedOrder.status }}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">Cree le</p>
                  <p class="text-sm text-gray-300">{{ formatDate(selectedOrder.createdAt) }}</p>
                </div>
              </div>

              <!-- Change status -->
              <div>
                <label class="block text-xs text-gray-500 mb-1.5">Changer le statut</label>
                <select
                  :value="selectedOrder.status"
                  :disabled="updatingOrderId === selectedOrder.id"
                  class="bg-surface border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50"
                  @change="updateStatus(selectedOrder.id, ($event.target as HTMLSelectElement).value)"
                >
                  <option v-for="s in statuses" :key="s" :value="s">
                    {{ statusLabels[s] || s }}
                  </option>
                </select>
              </div>

              <!-- Client info -->
              <div class="bg-surface rounded-xl p-4 border border-white/5 space-y-3">
                <h3 class="text-sm font-semibold text-white">Client</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p class="text-xs text-gray-500">Nom</p>
                    <p class="text-white">{{ selectedOrder.customerName || '—' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Email</p>
                    <p class="text-white">{{ selectedOrder.customerEmail || '—' }}</p>
                  </div>
                </div>
              </div>

              <!-- Shipping address -->
              <div v-if="selectedOrder.shippingAddress && Object.keys(selectedOrder.shippingAddress).length > 0" class="bg-surface rounded-xl p-4 border border-white/5 space-y-3">
                <h3 class="text-sm font-semibold text-white">Adresse de livraison</h3>
                <div class="text-sm text-gray-300 space-y-1">
                  <p v-if="selectedOrder.shippingAddress.line1">{{ selectedOrder.shippingAddress.line1 }}</p>
                  <p v-if="selectedOrder.shippingAddress.line2">{{ selectedOrder.shippingAddress.line2 }}</p>
                  <p>
                    <span v-if="selectedOrder.shippingAddress.postalCode">{{ selectedOrder.shippingAddress.postalCode }} </span>
                    <span v-if="selectedOrder.shippingAddress.city">{{ selectedOrder.shippingAddress.city }}</span>
                  </p>
                  <p v-if="selectedOrder.shippingAddress.country" class="text-gray-500">{{ selectedOrder.shippingAddress.country }}</p>
                </div>
              </div>

              <!-- Order items -->
              <div class="bg-surface rounded-xl p-4 border border-white/5 space-y-3">
                <h3 class="text-sm font-semibold text-white">Articles</h3>
                <div
                  v-for="item in selectedOrder.items"
                  :key="item.id"
                  class="flex items-center gap-4 py-3 border-b border-white/5 last:border-b-0"
                >
                  <!-- Product image -->
                  <div class="w-12 h-12 rounded-lg overflow-hidden bg-surface-light flex-shrink-0 border border-white/10">
                    <img
                      v-if="item.product?.images?.[0]"
                      :src="item.product.images[0]"
                      :alt="item.product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-white font-medium truncate">{{ item.product?.name || 'Produit' }}</p>
                    <p v-if="item.variant" class="text-xs text-gray-500 capitalize">{{ item.variant }}</p>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <p class="text-sm text-white font-medium">{{ formatPrice(item.price) }}</p>
                    <p class="text-xs text-gray-500">x{{ item.quantity }}</p>
                  </div>
                </div>
              </div>

              <!-- Total -->
              <div class="flex items-center justify-between pt-2">
                <span class="text-lg font-semibold text-white">Total</span>
                <span class="text-2xl font-bold text-brand">{{ formatPrice(selectedOrder.total) }}</span>
              </div>

              <!-- Stripe IDs -->
              <div v-if="selectedOrder.stripePaymentId" class="text-xs text-gray-600 space-y-1 pt-2 border-t border-white/5">
                <p v-if="selectedOrder.stripeSessionId">Session: <span class="font-mono">{{ selectedOrder.stripeSessionId }}</span></p>
                <p>Payment: <span class="font-mono">{{ selectedOrder.stripePaymentId }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <template v-if="data && !loading">
      <!-- Orders table -->
      <div class="bg-surface-light rounded-xl border border-white/10 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-white/10 text-gray-400 text-left">
                <th class="px-5 py-3 font-medium">Date</th>
                <th class="px-5 py-3 font-medium">Client</th>
                <th class="px-5 py-3 font-medium">Articles</th>
                <th class="px-5 py-3 font-medium">Total</th>
                <th class="px-5 py-3 font-medium">Statut</th>
                <th class="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in data.orders"
                :key="order.id"
                class="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
                @click="openOrder(order)"
              >
                <td class="px-5 py-3 text-gray-300 whitespace-nowrap">{{ formatDate(order.createdAt) }}</td>
                <td class="px-5 py-3">
                  <p class="text-white">{{ order.customerName || '—' }}</p>
                  <p class="text-xs text-gray-500">{{ order.customerEmail || '—' }}</p>
                </td>
                <td class="px-5 py-3 text-gray-300">{{ totalQuantity(order) }} article{{ totalQuantity(order) > 1 ? 's' : '' }}</td>
                <td class="px-5 py-3 text-white font-medium whitespace-nowrap">{{ formatPrice(order.total) }}</td>
                <td class="px-5 py-3">
                  <span
                    :class="statusColors[order.status] || 'bg-gray-500/15 text-gray-400'"
                    class="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ statusLabels[order.status] || order.status }}
                  </span>
                </td>
                <td class="px-5 py-3" @click.stop>
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
            class="px-4 py-2 text-sm font-medium bg-surface-light border border-white/10 rounded-lg text-gray-300 hover:bg-surface-lighter disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="goToPage(currentPage - 1)"
          >
            Precedent
          </button>
          <button
            :disabled="currentPage >= data.totalPages"
            class="px-4 py-2 text-sm font-medium bg-surface-light border border-white/10 rounded-lg text-gray-300 hover:bg-surface-lighter disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="goToPage(currentPage + 1)"
          >
            Suivant
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
