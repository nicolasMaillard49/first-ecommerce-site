<template>
  <section id="order-section" class="py-20 sm:py-28 px-4 sm:px-6 bg-surface-light relative overflow-hidden">
    <!-- Background effects -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/3 rounded-full blur-[150px]"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/3 rounded-full blur-[120px]"></div>

    <div class="relative max-w-2xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-12 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Commander</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Commandez Votre <span class="text-brand">Geestock</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-xl mx-auto">
          Profitez de l'offre de lancement. Paiement securise, livraison gratuite.
        </p>

        <!-- Live viewers -->
        <div class="mt-6 mb-2">
          <LiveViewers />
        </div>

        <!-- Countdown timer -->
        <div class="inline-flex items-center gap-3 mt-4 bg-surface/80 border border-surface-lighter rounded-2xl px-6 py-3">
          <svg class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm text-gray-300">Offre valable encore</span>
          <span class="font-display font-bold text-white text-lg tabular-nums">{{ countdownDisplay }}</span>
        </div>
      </div>

      <!-- Product card -->
      <div class="bg-surface rounded-3xl border border-surface-lighter p-6 sm:p-8 animate-on-scroll">
        <!-- Product image -->
        <div class="aspect-[4/3] bg-surface-light rounded-2xl overflow-hidden mb-8 relative group">
          <img
            :src="productImage"
            alt="Geestock Sac Magnetique pour Bouteille"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute top-4 right-4 bg-red-500/90 text-white text-sm font-bold px-3 py-1.5 rounded-xl">
            -40%
          </div>
        </div>

        <!-- Pack selection -->
        <div class="mb-8">
          <p class="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Choisissez votre pack</p>
          <div class="flex gap-3">
            <button
              v-for="pack in packs"
              :key="pack.name"
              :class="[
                'relative flex-1 flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer focus:outline-none',
                selectedPack === pack.name
                  ? 'border-brand bg-brand/10 shadow-lg shadow-brand/10'
                  : 'border-surface-lighter bg-surface-light hover:border-gray-600'
              ]"
              @click="selectPack(pack.name)"
            >
              <!-- Discount badge -->
              <span
                v-if="pack.badge"
                class="absolute -top-2.5 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
              >
                {{ pack.badge }}
              </span>
              <!-- Radio indicator -->
              <span
                :class="[
                  'w-4 h-4 rounded-full border-2 flex items-center justify-center mb-1 transition-colors',
                  selectedPack === pack.name ? 'border-brand' : 'border-gray-600'
                ]"
              >
                <span
                  v-if="selectedPack === pack.name"
                  class="w-2 h-2 rounded-full bg-brand"
                ></span>
              </span>
              <span class="text-white font-display font-bold text-sm">{{ pack.label }}</span>
              <span class="text-xs text-gray-400">{{ pack.qty }}x</span>
              <span class="text-brand font-display font-bold text-lg">{{ pack.priceDisplay }}</span>
              <span v-if="pack.oldPriceDisplay" class="text-gray-500 line-through text-xs">{{ pack.oldPriceDisplay }}</span>
            </button>
          </div>
        </div>

        <!-- Price + Quantity row -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <!-- Price -->
          <div>
            <div class="flex items-baseline gap-3">
              <span class="text-gray-500 line-through text-lg">{{ originalTotal }}</span>
              <span class="font-display font-black text-4xl text-brand">{{ formattedTotal }}</span>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <svg class="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-brand text-sm font-semibold">Vous economisez {{ savedAmount }}</span>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <p class="text-xs text-gray-500 mb-2 text-center font-medium">Quantite</p>
            <div class="inline-flex items-center bg-surface-light border border-surface-lighter rounded-2xl">
              <button
                class="flex items-center justify-center w-11 h-11 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer focus:outline-none rounded-l-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="quantity <= 1"
                aria-label="Diminuer la quantite"
                @click="decrementQuantity"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span class="w-12 text-center text-white font-display font-bold text-lg select-none">{{ quantity }}</span>
              <button
                class="flex items-center justify-center w-11 h-11 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer focus:outline-none rounded-r-2xl disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="quantity >= 10"
                aria-label="Augmenter la quantite"
                @click="incrementQuantity"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Sport selection -->
        <div class="mb-8">
          <p class="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Pour quel sport ? <span class="text-gray-600 normal-case">(optionnel)</span></p>
          <div class="grid grid-cols-5 gap-2 sm:gap-3">
            <button
              v-for="s in sports"
              :key="s.value"
              :class="[
                'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none',
                selectedSport === s.value
                  ? 'border-brand bg-brand/10'
                  : 'border-surface-lighter bg-surface-light hover:border-gray-600'
              ]"
              @click="toggleSport(s.value)"
            >
              <span class="text-2xl">{{ s.emoji }}</span>
              <span class="text-[10px] sm:text-xs text-gray-400 leading-tight text-center font-medium">{{ s.label }}</span>
            </button>
          </div>
        </div>

        <!-- Error message -->
        <div
          v-if="error"
          class="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 flex items-center gap-2"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ error }}
        </div>

        <!-- 1-click CTA -->
        <button
          :disabled="loading"
          :class="[
            'group w-full text-white font-display font-bold text-xl py-5 px-8 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface shadow-xl flex items-center justify-center gap-3',
            loading
              ? 'bg-brand/50 cursor-not-allowed'
              : 'bg-brand hover:bg-brand-dark cursor-pointer shadow-brand/25 hover:shadow-brand/40 hover:scale-[1.02] animate-pulse-glow',
          ]"
          @click="handleCheckout"
        >
          <span v-if="loading" class="inline-flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Redirection vers le paiement...
          </span>
          <template v-else>
            Commander &mdash; {{ formattedTotal }}
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </template>
        </button>

        <p class="text-center text-xs text-gray-500 mt-3">
          Adresse et paiement geres par Stripe. 100% securise.
        </p>

        <!-- Trust badges -->
        <div class="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-surface-lighter/50">
          <div
            v-for="(badge, idx) in trustBadges"
            :key="idx"
            class="flex flex-col items-center text-center gap-2 py-2"
          >
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10">
              <component :is="badge.icon" />
            </div>
            <span class="text-xs text-gray-400 leading-tight font-medium">{{ badge.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h, computed } from 'vue'

const productStore = useProductStore()

const quantity = ref(1)
const loading = ref(false)
const error = ref('')
const selectedPack = ref('solo')
const selectedSport = ref('')

const productImage = '/images/product/product-3.jpg'

// --- Packs ---
const UNIT_PRICE = 29.99
const ORIGINAL_UNIT_PRICE = 49.99

interface Pack {
  name: string
  label: string
  qty: number
  packPrice: number
  badge: string
  priceDisplay: string
  oldPriceDisplay: string
}

const packs: Pack[] = [
  {
    name: 'solo',
    label: 'Solo',
    qty: 1,
    packPrice: 29.99,
    badge: '',
    priceDisplay: '29,99\u20AC',
    oldPriceDisplay: '',
  },
  {
    name: 'duo',
    label: 'Duo',
    qty: 2,
    packPrice: 49.99,
    badge: '-17%',
    priceDisplay: '49,99\u20AC',
    oldPriceDisplay: '59,98\u20AC',
  },
  {
    name: 'equipe',
    label: 'Equipe',
    qty: 5,
    packPrice: 99.99,
    badge: '-33%',
    priceDisplay: '99,99\u20AC',
    oldPriceDisplay: '149,95\u20AC',
  },
]

const currentPack = computed(() => packs.find((p) => p.name === selectedPack.value))

const selectPack = (name: string) => {
  selectedPack.value = name
  const pack = packs.find((p) => p.name === name)
  if (pack) {
    quantity.value = pack.qty
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
    syncPackFromQuantity()
  }
}

const incrementQuantity = () => {
  if (quantity.value < 10) {
    quantity.value++
    syncPackFromQuantity()
  }
}

const syncPackFromQuantity = () => {
  const match = packs.find((p) => p.qty === quantity.value)
  selectedPack.value = match ? match.name : ''
}

// --- Pricing ---
const effectiveUnitPrice = computed(() => {
  if (currentPack.value) {
    return currentPack.value.packPrice / currentPack.value.qty
  }
  return UNIT_PRICE
})

const formattedTotal = computed(() => {
  let total: number
  if (currentPack.value) {
    total = currentPack.value.packPrice
  } else {
    total = UNIT_PRICE * quantity.value
  }
  return `${total.toFixed(2).replace('.', ',')}\u20AC`
})

const originalTotal = computed(() => {
  const total = ORIGINAL_UNIT_PRICE * quantity.value
  return `${total.toFixed(2).replace('.', ',')}\u20AC`
})

const savedAmount = computed(() => {
  const original = ORIGINAL_UNIT_PRICE * quantity.value
  let actual: number
  if (currentPack.value) {
    actual = currentPack.value.packPrice
  } else {
    actual = UNIT_PRICE * quantity.value
  }
  const saved = original - actual
  return `${saved.toFixed(2).replace('.', ',')}\u20AC`
})

// --- Sports ---
const sports = [
  { emoji: '\uD83C\uDFCB\uFE0F', value: 'musculation', label: 'Musculation' },
  { emoji: '\uD83C\uDFC3', value: 'running', label: 'Running' },
  { emoji: '\uD83D\uDEB4', value: 'velo', label: 'Velo' },
  { emoji: '\uD83E\uDD7E', value: 'randonnee', label: 'Randonnee' },
  { emoji: '\uD83C\uDFBE', value: 'autre', label: 'Autre' },
]

const toggleSport = (value: string) => {
  selectedSport.value = selectedSport.value === value ? '' : value
}

// Countdown timer
const countdown = ref({ hours: 2, minutes: 47, seconds: 33 })

const countdownDisplay = computed(() => {
  const hh = String(countdown.value.hours).padStart(2, '0')
  const mm = String(countdown.value.minutes).padStart(2, '0')
  const ss = String(countdown.value.seconds).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
})

let countdownInterval: ReturnType<typeof setInterval> | null = null

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--
    } else if (countdown.value.minutes > 0) {
      countdown.value.minutes--
      countdown.value.seconds = 59
    } else if (countdown.value.hours > 0) {
      countdown.value.hours--
      countdown.value.minutes = 59
      countdown.value.seconds = 59
    } else {
      countdown.value.hours = 2
      countdown.value.minutes = 47
      countdown.value.seconds = 33
    }
  }, 1000)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

const handleCheckout = async () => {
  loading.value = true
  error.value = ''

  try {
    const { apiFetch } = useApi()
    const body: Record<string, unknown> = {
      productId: productStore.product?.id || '',
      quantity: quantity.value,
      packType: selectedPack.value,
    }
    if (selectedSport.value) {
      body.sport = selectedSport.value
    }
    const response = await apiFetch<{ sessionId: string; url: string }>('/payments/create-checkout', {
      method: 'POST',
      body,
    })

    if (response.url) {
      window.location.href = response.url
    }
  } catch (e: any) {
    if (e?.message?.includes('fetch') || e?.cause?.code === 'ECONNREFUSED' || !navigator.onLine) {
      error.value = 'Le serveur est temporairement indisponible. Veuillez reessayer dans quelques instants.'
    } else {
      error.value = e?.data?.message || 'Une erreur est survenue. Veuillez reessayer.'
    }
  } finally {
    loading.value = false
  }
}

// Trust badge icons
const LockIcon = () =>
  h('svg', { class: 'w-5 h-5 text-brand', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }),
  ])

const TruckIcon = () =>
  h('svg', { class: 'w-5 h-5 text-brand', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' }),
  ])

const ShieldCheckIcon = () =>
  h('svg', { class: 'w-5 h-5 text-brand', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }),
  ])

const trustBadges = [
  { label: 'Paiement\nSecurise', icon: LockIcon },
  { label: 'Livraison\nGratuite', icon: TruckIcon },
  { label: 'Garantie\n30 Jours', icon: ShieldCheckIcon },
]
</script>
