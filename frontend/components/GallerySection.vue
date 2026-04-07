<template>
  <section v-if="hasImages" id="gallery-section" class="py-20 sm:py-28 px-4 sm:px-6 bg-white">
    <div class="max-w-5xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16 animate-on-scroll">
        <span class="inline-block text-accent-dark text-sm font-display font-semibold uppercase tracking-widest mb-4">Galerie</span>
        <h2 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-text mb-4">
          Découvrez le <span class="text-accent-dark">ClipBag</span>
        </h2>
        <p class="text-text-muted text-lg max-w-2xl mx-auto">
          Chaque détail a été pensé pour la performance et l'élégance.
        </p>
      </div>

      <!-- Main image -->
      <div
        class="animate-on-scroll-scale relative aspect-[3/4] sm:aspect-[3/4] max-w-md sm:max-w-lg mx-auto bg-surface-alt rounded-3xl overflow-hidden mb-4 sm:mb-6 border border-border group"
      >
        <!-- Navigation arrows -->
        <button
          class="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-border text-text hover:bg-white hover:text-accent-dark transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:opacity-100"
          aria-label="Image précédente"
          @click="prevImage"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-border text-text hover:bg-white hover:text-accent-dark transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:opacity-100"
          aria-label="Image suivante"
          @click="nextImage"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image counter -->
        <div class="absolute top-4 right-4 z-20 bg-white/70 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-sm text-text-muted font-medium">
          {{ activeIndex + 1 }}/{{ images.length }}
        </div>

        <!-- Main image with crossfade -->
        <Transition
          enter-active-class="transition-opacity duration-500 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300 ease-in absolute inset-0"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <img
            :key="activeIndex"
            :src="images[activeIndex]"
            :alt="`ClipBag Sac Magnétique pour Bouteille - Vue ${activeIndex + 1}`"
            class="w-full h-full object-contain"
            width="600"
            height="600"
            loading="lazy"
          />
        </Transition>
      </div>

      <!-- Thumbnail strip -->
      <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
        <button
          v-for="(image, idx) in images"
          :key="idx"
          :class="[
            'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white',
            activeIndex === idx
              ? 'border-2 border-accent shadow-lg shadow-accent/20 ring-2 ring-accent/20 scale-105'
              : 'border border-border hover:border-accent/40 opacity-60 hover:opacity-100',
          ]"
          :aria-label="`Voir image ${idx + 1}`"
          @click="goToImage(idx)"
        >
          <img
            :src="image"
            :alt="`ClipBag miniature ${idx + 1}`"
            class="w-full h-full object-cover"
            width="80"
            height="80"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const productStore = useProductStore()

const activeIndex = ref(0)

const images = computed(() => productStore.product?.images?.length ? productStore.product.images : [])
const hasImages = computed(() => images.value.length > 0)

// ---- Auto-play ----
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => nextImage(), 4000)
}

const stopAutoplay = () => {
  if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null }
}

const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

const prevImage = () => {
  activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length
  startAutoplay()
}

const goToImage = (idx: number) => {
  activeIndex.value = idx
  startAutoplay()
}

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') { prevImage(); startAutoplay() }
  if (e.key === 'ArrowRight') { nextImage(); startAutoplay() }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  stopAutoplay()
})
</script>
