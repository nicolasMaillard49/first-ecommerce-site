<template>
  <section id="explanation-section" class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-surface">
    <!-- Ambient glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 max-w-5xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-10 sm:mb-16 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Comment ca marche ?</span>
        <h2 class="font-display font-black text-3xl leading-tight sm:text-4xl md:text-5xl text-white mb-3">
          La magie de <span class="text-brand">ClipBag</span> c'est simple,
        </h2>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium">
          regarde tu as juste a
          <span class="relative inline-block mx-1">
            <span class="text-brand font-display font-bold border-2 border-dashed border-brand/50 rounded-xl px-3 py-1 sm:px-4 sm:py-1.5">Clip ton Bag</span>
          </span>
        </p>
      </div>

      <!-- Video container -->
      <div class="animate-on-scroll-scale relative max-w-3xl mx-auto">
        <!-- Decorative border glow -->
        <div class="absolute -inset-1 bg-gradient-to-br from-brand/20 via-transparent to-brand/10 rounded-[1.75rem] blur-sm pointer-events-none"></div>

        <div class="relative bg-surface-light border border-surface-lighter rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
          <!-- Video — mobile: taller vertical card, desktop: landscape card -->
          <div class="relative min-h-[65vh] sm:min-h-0 sm:aspect-video bg-black">
            <video
              ref="videoRef"
              class="absolute inset-0 w-full h-full object-cover scale-[1.35] sm:scale-100 sm:object-contain"
              :poster="posterImage"
              playsinline
              loop
              preload="metadata"
              @click="togglePlay"
            >
              <source src="/images/product/clipbagPresentation.mp4" type="video/mp4" />
            </video>

            <!-- Play overlay -->
            <Transition
              enter-active-class="transition-opacity duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <button
                v-if="!isPlaying"
                class="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group focus:outline-none"
                aria-label="Lancer la video"
                @click="togglePlay"
              >
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-brand/30 transition-transform duration-200 group-hover:scale-110">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </Transition>
          </div>

          <!-- Controls bar -->
          <div class="flex items-center gap-3 px-4 py-3 bg-surface-light border-t border-surface-lighter">
            <button
              class="shrink-0 text-white/70 hover:text-brand transition-colors cursor-pointer focus:outline-none"
              :aria-label="isPlaying ? 'Pause' : 'Lecture'"
              @click="togglePlay"
            >
              <svg v-if="isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <!-- Progress bar -->
            <div
              class="flex-1 h-1.5 bg-surface rounded-full overflow-hidden cursor-pointer group"
              @click="seekTo"
            >
              <div
                class="h-full bg-brand rounded-full transition-[width] duration-150"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>

            <!-- Time -->
            <span class="shrink-0 text-xs text-gray-500 font-medium tabular-nums min-w-[70px] text-right">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </span>

            <!-- Mute -->
            <button
              class="shrink-0 text-white/70 hover:text-brand transition-colors cursor-pointer focus:outline-none"
              :aria-label="isMuted ? 'Activer le son' : 'Couper le son'"
              @click="toggleMute"
            >
              <svg v-if="isMuted" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Steps below video -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
        <div class="animate-on-scroll text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
            <span class="font-display font-black text-brand text-lg">1</span>
          </div>
          <h3 class="font-display font-bold text-white text-lg mb-2">Clipsez</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Fixez le ClipBag sur n'importe quelle surface métallique en un instant.</p>
        </div>
        <div class="animate-on-scroll text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
            <span class="font-display font-black text-brand text-lg">2</span>
          </div>
          <h3 class="font-display font-bold text-white text-lg mb-2">Rangez</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Glissez votre bouteille, gourde ou accessoires dans le sac magnétique.</p>
        </div>
        <div class="animate-on-scroll text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
            <span class="font-display font-black text-brand text-lg">3</span>
          </div>
          <h3 class="font-display font-bold text-white text-lg mb-2">Profitez</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Les mains libres, concentrez-vous sur votre entrainement ou votre journee.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

const posterImage = computed(() => '/images/product/product-7.png')

let animFrame: number | null = null

const updateProgress = () => {
  const v = videoRef.value
  if (!v) return
  currentTime.value = v.currentTime
  duration.value = v.duration || 0
  progress.value = duration.value > 0 ? (v.currentTime / v.duration) * 100 : 0
  if (isPlaying.value) {
    animFrame = requestAnimationFrame(updateProgress)
  }
}

const togglePlay = () => {
  const v = videoRef.value
  if (!v) return
  if (v.paused) {
    v.play()
    isPlaying.value = true
    updateProgress()
  } else {
    v.pause()
    isPlaying.value = false
    if (animFrame) cancelAnimationFrame(animFrame)
  }
}

const toggleMute = () => {
  const v = videoRef.value
  if (!v) return
  v.muted = !v.muted
  isMuted.value = v.muted
}

const seekTo = (e: MouseEvent) => {
  const v = videoRef.value
  if (!v || !v.duration) return
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  v.currentTime = ratio * v.duration
  updateProgress()
}

const onEnded = () => {
  isPlaying.value = false
  if (animFrame) cancelAnimationFrame(animFrame)
}

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>
