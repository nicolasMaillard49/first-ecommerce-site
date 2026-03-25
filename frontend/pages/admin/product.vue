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
  images: string[]
  supplierUrl: string | null
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
  images: [] as string[],
  supplierUrl: '',
  socialVideos: [] as { url: string; title: string; thumbnail: string }[],
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
    form.price = product.value.price
    form.comparePrice = product.value.comparePrice || 0
    form.images = [...product.value.images]
    form.supplierUrl = product.value.supplierUrl || ''
    // Load social videos from localStorage (not stored in DB)
    const saved = localStorage.getItem('geestock_social_videos')
    if (saved) {
      form.socialVideos = JSON.parse(saved)
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors du chargement du produit'
    if (e?.status === 401) authStore.logout()
  } finally {
    loading.value = false
  }
}

// Image management
const addImage = () => {
  form.images.push('')
}
const removeImage = (idx: number) => {
  form.images.splice(idx, 1)
}

// Social video management
const addVideo = () => {
  form.socialVideos.push({ url: '', title: '', thumbnail: '' })
}
const removeVideo = (idx: number) => {
  form.socialVideos.splice(idx, 1)
}
const saveSocialVideos = () => {
  localStorage.setItem('geestock_social_videos', JSON.stringify(form.socialVideos))
}

const saveProduct = async () => {
  if (!product.value) return
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    // Filter out empty image URLs
    const cleanImages = form.images.filter((img) => img.trim() !== '')
    await apiFetch(`/admin/product/${product.value.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: {
        name: form.name,
        description: form.description,
        price: form.price,
        comparePrice: form.comparePrice || null,
        images: cleanImages,
        supplierUrl: form.supplierUrl || null,
      },
    })
    // Also save social videos to localStorage
    saveSocialVideos()
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
        <!-- Basic info -->
        <div class="bg-surface-light rounded-xl p-6 border border-white/10 space-y-5">
          <h2 class="text-lg font-semibold text-white">Informations</h2>

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

        <!-- Supplier URL -->
        <div class="bg-surface-light rounded-xl p-6 border border-orange-500/20 space-y-4">
          <h2 class="text-lg font-semibold text-orange-400">Fournisseur</h2>
          <div>
            <label for="supplier-url" class="block text-sm font-medium text-gray-300 mb-1.5">Lien produit AliExpress</label>
            <input
              id="supplier-url"
              v-model="form.supplierUrl"
              type="url"
              placeholder="https://www.aliexpress.com/item/123456789.html"
              class="w-full px-3 py-2.5 bg-surface border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors"
            />
            <p class="text-xs text-gray-600 mt-1.5">Ce lien sera utilise dans les commandes pour ouvrir directement la page produit AliExpress.</p>
          </div>
        </div>

        <!-- Images -->
        <div class="bg-surface-light rounded-xl p-6 border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Images produit</h2>
            <button
              type="button"
              class="text-sm text-brand hover:text-brand-light transition-colors cursor-pointer"
              @click="addImage"
            >
              + Ajouter une image
            </button>
          </div>
          <p class="text-xs text-gray-500">Chemin local (ex: /images/product/product-1.jpg) ou URL externe</p>

          <div v-for="(img, idx) in form.images" :key="idx" class="flex items-center gap-3">
            <span class="text-xs text-gray-500 w-6 text-right">{{ idx + 1 }}.</span>
            <input
              v-model="form.images[idx]"
              type="text"
              placeholder="/images/product/product-1.jpg"
              class="flex-1 px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
            />
            <!-- Preview -->
            <div v-if="form.images[idx]" class="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
              <img :src="form.images[idx]" class="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              class="text-red-400 hover:text-red-300 transition-colors cursor-pointer p-1"
              @click="removeImage(idx)"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div v-if="form.images.length === 0" class="text-sm text-gray-500 text-center py-4">
            Aucune image. Cliquez sur "+ Ajouter une image" pour commencer.
          </div>
        </div>

        <!-- Social Videos -->
        <div class="bg-surface-light rounded-xl p-6 border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Videos reseaux sociaux</h2>
            <button
              type="button"
              class="text-sm text-brand hover:text-brand-light transition-colors cursor-pointer"
              @click="addVideo"
            >
              + Ajouter une video
            </button>
          </div>
          <p class="text-xs text-gray-500">Collez l'URL TikTok, Instagram ou YouTube. La plateforme est detectee automatiquement.</p>

          <div v-for="(video, idx) in form.socialVideos" :key="idx" class="bg-surface rounded-lg p-4 border border-white/5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-300">Video {{ idx + 1 }}</span>
              <button
                type="button"
                class="text-red-400 hover:text-red-300 text-xs transition-colors cursor-pointer"
                @click="removeVideo(idx)"
              >
                Supprimer
              </button>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">URL de la video</label>
              <input
                v-model="form.socialVideos[idx].url"
                type="url"
                placeholder="https://www.tiktok.com/@compte/video/123..."
                class="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Titre</label>
              <input
                v-model="form.socialVideos[idx].title"
                type="text"
                placeholder="Test du Geestock en salle de sport"
                class="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Miniature (chemin image, optionnel pour YouTube)</label>
              <input
                v-model="form.socialVideos[idx].thumbnail"
                type="text"
                placeholder="/images/videos/tiktok-1.jpg"
                class="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors"
              />
            </div>
          </div>

          <div v-if="form.socialVideos.length === 0" class="text-sm text-gray-500 text-center py-4">
            Aucune video. Cliquez sur "+ Ajouter une video" pour commencer.
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span v-if="saving">Enregistrement...</span>
          <span v-else>Enregistrer les modifications</span>
        </button>
      </form>
    </template>
  </div>
</template>
