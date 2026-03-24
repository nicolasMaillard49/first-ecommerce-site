<template>
  <section id="order-section" class="py-20 sm:py-28 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto">
      <h2
        class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-4"
      >
        Commandez Votre <span class="text-brand">Geestock</span>
      </h2>
      <p class="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
        Profitez de l'offre de lancement avant qu'il ne soit trop tard.
      </p>

      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <!-- Product preview -->
        <div>
          <!-- Product image -->
          <div
            class="aspect-square bg-surface-light rounded-2xl overflow-hidden border border-surface-lighter mb-6"
          >
            <img
              :src="selectedImage"
              alt="Geestock Sac Magnétique pour Bouteille"
              class="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <!-- Color picker -->
          <div class="mb-6">
            <p class="text-sm text-gray-400 mb-3 font-medium">
              Couleur : <span class="text-white">{{ selectedColorLabel }}</span>
            </p>
            <div class="flex gap-3">
              <button
                v-for="color in colors"
                :key="color.value"
                :class="[
                  'w-11 h-11 rounded-full border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface',
                  selectedColor === color.value
                    ? 'border-brand scale-110 shadow-lg'
                    : 'border-surface-lighter hover:border-gray-500',
                ]"
                :style="{ backgroundColor: color.hex }"
                :aria-label="`Couleur ${color.label}`"
                :title="color.label"
                @click="selectedColor = color.value"
              ></button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <p class="text-sm text-gray-400 mb-3 font-medium">Quantité</p>
            <div class="inline-flex items-center bg-surface-light border border-surface-lighter rounded-xl">
              <button
                class="flex items-center justify-center w-12 h-12 text-white hover:text-brand transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand rounded-l-xl disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="quantity <= 1"
                aria-label="Diminuer la quantité"
                @click="quantity > 1 && quantity--"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span class="w-12 text-center text-white font-semibold text-lg select-none">{{ quantity }}</span>
              <button
                class="flex items-center justify-center w-12 h-12 text-white hover:text-brand transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand rounded-r-xl disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="quantity >= 10"
                aria-label="Augmenter la quantité"
                @click="quantity < 10 && quantity++"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-4 mb-3">
            <span class="text-gray-500 line-through text-lg">49,99&euro;</span>
            <span class="font-display font-black text-4xl text-brand">29,99&euro;</span>
          </div>
          <div
            class="inline-flex items-center gap-2 bg-brand/10 border border-brand/30 text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Économisez 20&euro; !
          </div>
        </div>

        <!-- Order form -->
        <div>
          <form
            class="bg-surface-light border border-surface-lighter rounded-2xl p-6 sm:p-8"
            @submit.prevent="handleSubmit"
          >
            <h3 class="font-display font-bold text-xl text-white mb-6">Vos informations</h3>

            <div class="space-y-4">
              <div>
                <label for="order-name" class="block text-sm text-gray-400 mb-1.5 font-medium">Nom complet</label>
                <input
                  id="order-name"
                  v-model="form.name"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder="Jean Dupont"
                  class="w-full bg-surface border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label for="order-email" class="block text-sm text-gray-400 mb-1.5 font-medium">Email</label>
                <input
                  id="order-email"
                  v-model="form.email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="jean@exemple.fr"
                  class="w-full bg-surface border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div>
                <label for="order-address" class="block text-sm text-gray-400 mb-1.5 font-medium">Adresse</label>
                <input
                  id="order-address"
                  v-model="form.address"
                  type="text"
                  required
                  autocomplete="street-address"
                  placeholder="12 Rue de la Paix"
                  class="w-full bg-surface border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="order-city" class="block text-sm text-gray-400 mb-1.5 font-medium">Ville</label>
                  <input
                    id="order-city"
                    v-model="form.city"
                    type="text"
                    required
                    autocomplete="address-level2"
                    placeholder="Paris"
                    class="w-full bg-surface border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label for="order-zip" class="block text-sm text-gray-400 mb-1.5 font-medium">Code Postal</label>
                  <input
                    id="order-zip"
                    v-model="form.zip"
                    type="text"
                    required
                    autocomplete="postal-code"
                    placeholder="75001"
                    class="w-full bg-surface border border-surface-lighter rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="w-full mt-8 bg-brand hover:bg-brand-dark text-white font-display font-bold text-lg py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-light shadow-lg shadow-brand/20 hover:shadow-brand/40"
            >
              Commander &mdash; {{ formattedTotal }}
            </button>

            <!-- Trust badges -->
            <div class="grid grid-cols-3 gap-3 mt-6">
              <div
                v-for="(badge, idx) in trustBadges"
                :key="idx"
                class="flex flex-col items-center text-center gap-2 py-3"
              >
                <component :is="badge.icon" />
                <span class="text-xs text-gray-400 leading-tight">{{ badge.label }}</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'

const selectedColor = ref('black')
const quantity = ref(1)

const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
})

const colors = [
  { value: 'black', label: 'Noir', hex: '#1a1a1a' },
  { value: 'blue', label: 'Bleu', hex: '#2563eb' },
  { value: 'green', label: 'Vert', hex: '#16a34a' },
  { value: 'red', label: 'Rouge', hex: '#dc2626' },
]

const images = [
  'https://ae01.alicdn.com/kf/Sb3f10763c9c948c7a9bdc6e84a6e9a0fe.jpg',
  'https://ae01.alicdn.com/kf/S12e824863ec645dea0aef595f904c0eaf.jpg',
  'https://ae01.alicdn.com/kf/S4d8bac28c4794424a382b37bf383cac4d.jpg',
  'https://ae01.alicdn.com/kf/Scb8b59e6be9442c292b42251f3afd438u.jpg',
]

const selectedColorLabel = computed(() => {
  const c = colors.find((c) => c.value === selectedColor.value)
  return c?.label || ''
})

const selectedImage = computed(() => {
  const idx = colors.findIndex((c) => c.value === selectedColor.value)
  return images[idx >= 0 ? idx : 0]
})

const formattedTotal = computed(() => {
  const total = (29.99 * quantity.value).toFixed(2).replace('.', ',')
  return `${total}\u20AC`
})

const emit = defineEmits<{
  (e: 'order-submitted', data: {
    color: string
    quantity: number
    customer: typeof form
  }): void
}>()

const handleSubmit = () => {
  const orderData = {
    color: selectedColor.value,
    quantity: quantity.value,
    customer: { ...form },
  }
  console.log('Order submitted:', orderData)
  emit('order-submitted', orderData)
}

// Trust badge icons
const LockIcon = () =>
  h(
    'svg',
    {
      class: 'w-6 h-6 text-brand',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '2',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      }),
    ]
  )

const TruckIcon = () =>
  h(
    'svg',
    {
      class: 'w-6 h-6 text-brand',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '2',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
      }),
    ]
  )

const ShieldCheckIcon = () =>
  h(
    'svg',
    {
      class: 'w-6 h-6 text-brand',
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '2',
    },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      }),
    ]
  )

const trustBadges = [
  { label: 'Paiement Sécurisé', icon: LockIcon },
  { label: 'Livraison Gratuite', icon: TruckIcon },
  { label: 'Garantie 30 jours', icon: ShieldCheckIcon },
]
</script>
