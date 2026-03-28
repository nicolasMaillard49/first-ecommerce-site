<template>
  <section id="gallery-section" class="py-20 sm:py-28 px-4 sm:px-6 bg-surface-light">
    <div class="max-w-5xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Galerie</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Decouvrez le <span class="text-brand">ClipBag</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Chaque detail a ete pense pour la performance et l'elegance.
        </p>
      </div>

      <!-- Main image — no card background -->
      <div
        class="animate-on-scroll-scale relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden mb-4 sm:mb-6 group cursor-pointer"
        @mouseenter="zoomed = true; stopAutoplay()"
        @mouseleave="zoomed = false; startAutoplay()"
        @mousemove="handleZoomMove"
      >
        <!-- Navigation arrows -->
        <button
          class="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-surface/70 backdrop-blur-sm border border-surface-lighter text-white hover:bg-surface hover:text-brand transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand focus:opacity-100"
          aria-label="Image precedente"
          @click="prevImage"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-surface/70 backdrop-blur-sm border border-surface-lighter text-white hover:bg-surface hover:text-brand transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand focus:opacity-100"
          aria-label="Image suivante"
          @click="nextImage"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image counter -->
        <div class="absolute top-4 right-4 z-20 bg-surface/70 backdrop-blur-sm border border-surface-lighter rounded-full px-3 py-1 text-sm text-gray-300 font-medium">
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
            :alt="`ClipBag Sac Magnetique pour Bouteille - Vue ${activeIndex + 1}`"
            :class="[
              'w-full h-full object-contain transition-transform duration-300',
              zoomed ? 'scale-150' : 'scale-100',
            ]"
            :style="zoomed ? { transformOrigin: `${zoomX}% ${zoomY}%` } : {}"
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
            'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-light',
            activeIndex === idx
              ? 'border-2 border-brand shadow-lg shadow-brand/20 ring-2 ring-brand/20 scale-105'
              : 'border-2 border-surface-lighter hover:border-brand/40 opacity-60 hover:opacity-100',
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
const zoomed = ref(false)
const zoomX = ref(50)
const zoomY = ref(50)

const images = computed(() => productStore.product?.images?.length ? productStore.product.images : [
  '/images/product/product-7.png',
  '/images/product/product-1.jpg',
  '/images/product/product-2.png',
  '/images/product/product-3.png',
  '/images/product/product-4.png',
  '/images/product/product-5.png',
  '/images/product/product-6.png',
])

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

const handleZoomMove = (e: MouseEvent) => {
  if (!zoomed.value) return
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  zoomX.value = ((e.clientX - rect.left) / rect.width) * 100
  zoomY.value = ((e.clientY - rect.top) / rect.height) * 100
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
