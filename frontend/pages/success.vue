<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-20">
    <div class="max-w-md w-full text-center">
      <!-- Loading state -->
      <div v-if="loading" class="animate-pulse">
        <div class="w-20 h-20 bg-surface-lighter rounded-full mx-auto mb-6"></div>
        <div class="h-6 bg-surface-lighter rounded w-48 mx-auto mb-4"></div>
        <div class="h-4 bg-surface-lighter rounded w-64 mx-auto"></div>
      </div>

      <!-- Success state -->
      <div v-else>
        <!-- Green checkmark circle -->
        <div class="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="font-display font-black text-3xl text-white mb-3">Commande Confirmée !</h1>
        <p class="text-gray-400 mb-8">Merci pour votre achat. Vous recevrez un email de confirmation.</p>

        <!-- Order details card -->
        <div v-if="order" class="bg-surface-light border border-surface-lighter rounded-2xl p-6 text-left mb-8">
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-400">Produit</span>
              <span class="text-white font-medium">{{ order.items?.[0]?.product?.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Quantité</span>
              <span class="text-white font-medium">{{ order.items?.[0]?.quantity }}</span>
            </div>
            <div class="border-t border-surface-lighter pt-3 flex justify-between">
              <span class="text-gray-400 font-medium">Total</span>
              <span class="text-brand font-display font-bold text-lg">{{ order.total?.toFixed(2).replace('.', ',') }}&euro;</span>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/"
          class="btn-primary inline-block"
        >
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(true)
const order = ref<any>(null)

onMounted(async () => {
  const sessionId = route.query.session_id as string
  if (sessionId) {
    try {
      const { apiFetch } = useApi()
      const data = await apiFetch<any>(`/payments/session-status?session_id=${sessionId}`)
      order.value = data.order
    } catch (e) {
      console.error('Failed to fetch session status:', e)
    }
  }
  loading.value = false
})
</script>
