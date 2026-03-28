<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    :enter-from-class="isMobile ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'"
    :enter-to-class="isMobile ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'"
    leave-active-class="transition-all duration-300 ease-in"
    :leave-from-class="isMobile ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-100'"
    :leave-to-class="isMobile ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'"
  >
    <!-- Mobile: slim top banner / Desktop: bottom-left card -->
    <div
      v-if="visible"
      :class="[
        'fixed z-50 backdrop-blur border shadow-lg transition-colors',
        isMobile
          ? 'top-0 inset-x-0 bg-surface/90 border-b border-surface-lighter px-4 py-2.5 flex items-center gap-2.5'
          : 'bottom-6 left-6 bg-surface-light/90 border-surface-lighter rounded-2xl px-5 py-4 flex items-center gap-3 max-w-sm'
      ]"
    >
      <span :class="isMobile ? 'text-base shrink-0' : 'text-2xl shrink-0'">🛒</span>
      <p :class="[
        'text-white/90 leading-snug flex-1 min-w-0',
        isMobile ? 'text-xs truncate' : 'text-sm'
      ]">
        <span class="font-semibold text-white">{{ currentName }}</span>
        de {{ currentCity }} —
        <span class="text-brand font-semibold">il y a {{ currentMinutes }} min</span>
      </p>
      <button
        class="shrink-0 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        aria-label="Fermer"
        @click="dismiss"
      >
        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const names = [
  'Thomas', 'Lucas', 'Hugo', 'Léo', 'Nathan', 'Louis', 'Jules', 'Gabriel',
  'Arthur', 'Raphaël', 'Mathis', 'Ethan', 'Noah', 'Maxime', 'Alexandre',
  'Antoine', 'Clément', 'Théo', 'Romain', 'Baptiste', 'Emma', 'Jade',
  'Louise', 'Chloé', 'Manon', 'Camille', 'Sarah', 'Léa', 'Julie', 'Marie',
]

const cities = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes',
  'Strasbourg', 'Montpellier', 'Rennes', 'Nice', 'Grenoble', 'Rouen',
  'Toulon', 'Dijon', 'Angers', 'Reims', 'Brest', 'Metz', 'Clermont-Ferrand',
]

const ROTATION_INTERVAL = 20_000

const visible = ref(false)
const isMobile = ref(false)
const currentName = ref('')
const currentCity = ref('')
const currentMinutes = ref(1)

let rotationTimer: ReturnType<typeof setInterval> | null = null

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const generateNotification = () => {
  currentName.value = pickRandom(names)
  currentCity.value = pickRandom(cities)
  currentMinutes.value = Math.floor(Math.random() * 15) + 1
}

const showNext = () => {
  visible.value = false
  setTimeout(() => {
    generateNotification()
    visible.value = true
    // Auto-dismiss after 5s on mobile to stay non-intrusive
    if (isMobile.value) {
      setTimeout(() => { visible.value = false }, 5000)
    }
  }, 400)
}

const dismiss = () => {
  visible.value = false
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile, { passive: true })

  // Delay first show so it doesn't appear instantly on page load
  setTimeout(() => {
    generateNotification()
    visible.value = true
    if (isMobile.value) {
      setTimeout(() => { visible.value = false }, 5000)
    }
  }, 3000)

  rotationTimer = setInterval(showNext, ROTATION_INTERVAL)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  if (rotationTimer) {
    clearInterval(rotationTimer)
    rotationTimer = null
  }
})
</script>
