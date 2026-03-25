<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="visible"
      class="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-40 bg-surface-light/90 backdrop-blur border border-surface-lighter rounded-2xl shadow-xl px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3 max-w-sm"
    >
      <span class="text-2xl shrink-0">🛒</span>
      <p class="text-sm text-white/90 leading-snug">
        <span class="font-semibold text-white">{{ currentName }}</span>
        de
        <span class="font-semibold text-white">{{ currentCity }}</span>
        vient de commander il y a
        <span class="text-brand font-semibold">{{ currentMinutes }} min</span>
      </p>
      <button
        class="shrink-0 ml-auto text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        aria-label="Fermer"
        @click="dismiss"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
  }, 400)
}

const dismiss = () => {
  visible.value = false
}

onMounted(() => {
  generateNotification()
  visible.value = true

  rotationTimer = setInterval(showNext, ROTATION_INTERVAL)
})

onUnmounted(() => {
  if (rotationTimer) {
    clearInterval(rotationTimer)
    rotationTimer = null
  }
})
</script>
