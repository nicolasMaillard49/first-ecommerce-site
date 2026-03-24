<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

interface Product {
  id: string
  name: string
  description: string
  price: number
  comparePrice: number | null
}

const { apiFetch } = useApi()
const authStore = useAuthStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')

const form = reactive({
  name: '',
  description: '',
  price: 0,
  comparePrice: 0,
})

const fetchProduct = async () => {
  loading.value = true
  error.value = ''
  try {
    product.value = await apiFetch<Product>('/admin/product', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    form.name = product.value.name
    form.description = product.value.description
    form.price = product.value.price / 100
    form.comparePrice = (product.value.comparePrice || 0) / 100
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors du chargement du produit'
    if (e?.status === 401) authStore.logout()
  } finally {
    loading.value = false
  }
}

const saveProduct = async () => {
  if (!product.value) return
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    await apiFetch(`/admin/product/${product.value.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: {
        name: form.name,
        description: form.description,
        price: Math.round(form.price * 100),
        comparePrice: form.comparePrice ? Math.round(form.comparePrice * 100) : null,
      },
    })
    success.value = 'Produit mis a jour avec succes'
    setTimeout(() => { success.value = '' }, 3000)
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors de la sauvegarde'
    if (e?.status === 401) authStore.logout()
  } finally {
    saving.value = false
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">Modifier le produit</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-400">Chargement...</div>

    <!-- Error -->
    <div v-if="error" class="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
      {{ error }}
    </div>

    <!-- Success -->
    <div v-if="success" class="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
      {{ success }}
    </div>

    <template v-if="product && !loading">
      <form class="max-w-2xl space-y-6" @submit.prevent="saveProduct">
        <div class="bg-surface-light rounded-xl p-6 border border-white/10 space-y-5">
          <!-- Name -->
          <div>
            <label for="product-name" class="block text-sm font-medium text-gray-300 mb-1.5">Nom du produit</label>
            <input
              id="product-name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="product-description" class="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
            <textarea
              id="product-description"
              v-model="form.description"
              rows="5"
              required
              class="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors resize-y"
            />
          </div>

          <!-- Prices row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Price -->
            <div>
              <label for="product-price" class="block text-sm font-medium text-gray-300 mb-1.5">Prix (EUR)</label>
              <input
                id="product-price"
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
              />
            </div>

            <!-- Compare Price -->
            <div>
              <label for="product-compare-price" class="block text-sm font-medium text-gray-300 mb-1.5">Prix barre (EUR)</label>
              <input
                id="product-compare-price"
                v-model.number="form.comparePrice"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="saving">Enregistrement...</span>
          <span v-else>Enregistrer les modifications</span>
        </button>
      </form>
    </template>
  </div>
</template>
