<template>
  <section id="explanation-section" class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden bg-surface-alt">
    <div class="relative z-10 max-w-5xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-10 sm:mb-16 animate-on-scroll">
        <span class="inline-block text-accent-dark text-sm font-display font-semibold uppercase tracking-widest mb-4">Comment ça marche ?</span>
        <h2 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-text mb-3">
          La magie de <span class="text-accent-dark">ClipBag</span> c'est simple,
        </h2>
        <p class="text-base sm:text-lg text-text-muted font-medium">
          regarde, tu as juste à
          <span class="relative inline-block mx-1">
            <span class="text-accent-dark font-display font-semibold border-2 border-dashed border-accent/50 rounded-xl px-3 py-1 sm:px-4 sm:py-1.5">Clip ton Bag</span>
          </span>
        </p>
      </div>

      <!-- Video container -->
      <div class="animate-on-scroll-scale relative max-w-3xl mx-auto">
        <div class="relative bg-white border border-border rounded-3xl overflow-hidden shadow-card">
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
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-accent/30 transition-transform duration-200 group-hover:scale-110">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </Transition>
          </div>

          <!-- Controls bar -->
          <div class="flex items-center gap-3 px-4 py-3 bg-white border-t border-border">
            <button
              class="shrink-0 text-text-muted hover:text-accent-dark transition-colors cursor-pointer focus:outline-none"
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
              class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer group"
              @click="seekTo"
            >
              <div
                class="h-full bg-accent rounded-full transition-[width] duration-150"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>

            <!-- Time -->
            <span class="shrink-0 text-xs text-text-muted font-medium tabular-nums min-w-[70px] text-right">
              {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
            </span>

            <!-- Mute -->
            <button
              class="shrink-0 text-text-muted hover:text-accent-dark transition-colors cursor-pointer focus:outline-none"
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

      <!-- Steps below video — single strip -->
      <div class="animate-on-scroll mt-10 sm:mt-16 flex justify-center">
        <div class="bg-white border border-border rounded-full px-2 py-2 sm:px-4 sm:py-3 inline-flex shadow-subtle">
          <div class="flex items-center justify-center">
            <!-- Step 1 -->
            <div class="step-card-reveal flex-1 flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 stagger-1">
              <span class="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-sm sm:text-base">1</span>
              <div class="min-w-0">
                <p class="font-display font-bold text-text text-xs sm:text-sm leading-tight">Clipsez</p>
                <p class="text-text-muted text-[9px] sm:text-xs leading-tight hidden sm:block">Fixation magnétique</p>
              </div>
            </div>

            <!-- Chevron 1→2 -->
            <svg class="step-chevron-reveal shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true" style="animation-delay: 0.25s">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>

            <!-- Step 2 -->
            <div class="step-card-reveal flex-1 flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 stagger-2">
              <span class="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-sm sm:text-base">2</span>
              <div class="min-w-0">
                <p class="font-display font-bold text-text text-xs sm:text-sm leading-tight">Rangez</p>
                <p class="text-text-muted text-[9px] sm:text-xs leading-tight hidden sm:block">Bouteille sécurisée</p>
              </div>
            </div>

            <!-- Chevron 2→3 -->
            <svg class="step-chevron-reveal shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true" style="animation-delay: 0.45s">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>

            <!-- Step 3 -->
            <div class="step-card-reveal flex-1 flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 stagger-3">
              <span class="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-sm sm:text-base">3</span>
              <div class="min-w-0">
                <p class="font-display font-bold text-text text-xs sm:text-sm leading-tight">Profitez</p>
                <p class="text-text-muted text-[9px] sm:text-xs leading-tight hidden sm:block">Mains libres</p>
              </div>
            </div>
          </div>
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

const posterImage = computed(() => '/images/product/product-1.png')

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

const isMobile = ref(false)
let videoObserver: IntersectionObserver | null = null

onMounted(() => {
  isMobile.value = window.innerWidth < 640
  if (isMobile.value && videoRef.value) {
    // Autoplay muted on mobile when video enters viewport
    videoRef.value.muted = true
    isMuted.value = true
    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying.value) {
            videoRef.value?.play()
            isPlaying.value = true
            updateProgress()
          }
        })
      },
      { threshold: 0.5 }
    )
    videoObserver.observe(videoRef.value)
  }
})

onUnmounted(() => {
  if (videoObserver) videoObserver.disconnect()
  if (animFrame) cancelAnimationFrame(animFrame)
})
</script>
