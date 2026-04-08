<template>
  <section id="explanation-section" class="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-10 sm:mb-16 animate-on-scroll">
        <span class="inline-block text-accent-dark text-xs font-display font-semibold uppercase tracking-widest mb-4">Comment ça marche ?</span>
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

      <!-- Desktop: Video left + Steps right -->
      <div class="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

        <!-- Video -->
        <div class="animate-on-scroll-scale relative">
          <div class="relative overflow-hidden rounded-lg">
            <div class="relative aspect-[4/5]">
              <video
                ref="videoRef"
                class="absolute inset-0 w-full h-full object-cover scale-150 rounded-lg"
                :poster="posterImage"
                playsinline
                loop
                muted
                preload="metadata"
              >
                <source src="/images/product/clipbagPresentation.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div class="mt-10 lg:mt-0">
          <!-- Step 1 -->
          <div class="animate-on-scroll flex items-start gap-4 mb-8">
            <span class="shrink-0 w-12 h-12 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-lg">1</span>
            <div>
              <p class="font-display font-bold text-text text-lg mb-1">Clipsez</p>
              <p class="text-text-muted text-sm leading-relaxed">Fixation magnétique instantanée sur n'importe quelle bouteille. Un geste, c'est accroché.</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="animate-on-scroll flex items-start gap-4 mb-8">
            <span class="shrink-0 w-12 h-12 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-lg">2</span>
            <div>
              <p class="font-display font-bold text-text text-lg mb-1">Rangez</p>
              <p class="text-text-muted text-sm leading-relaxed">Votre bouteille est sécurisée, les mains libres pour votre entraînement.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="animate-on-scroll flex items-start gap-4">
            <span class="shrink-0 w-12 h-12 rounded-full bg-accent/20 text-text border border-accent/30 flex items-center justify-center font-display font-bold text-lg">3</span>
            <div>
              <p class="font-display font-bold text-text text-lg mb-1">Profitez</p>
              <p class="text-text-muted text-sm leading-relaxed">Ultra léger (120g), vous oubliez qu'il est là. En salle, en rando, au quotidien.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null)
const posterImage = computed(() => '/images/product/product-1.png')

let videoObserver: IntersectionObserver | null = null

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.muted = true
    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.value?.play()
          } else {
            videoRef.value?.pause()
          }
        })
      },
      { threshold: 0.3 }
    )
    videoObserver.observe(videoRef.value)
  }
})

onUnmounted(() => {
  if (videoObserver) videoObserver.disconnect()
})
</script>
