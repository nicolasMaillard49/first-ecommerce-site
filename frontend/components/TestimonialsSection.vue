<template>
  <section id="testimonials-section" class="py-20 sm:py-28 px-4 sm:px-6 bg-surface-alt relative overflow-hidden">
    <div class="relative max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-14 sm:mb-20 animate-on-scroll">
        <span class="inline-block text-accent-dark text-xs font-display font-semibold uppercase tracking-widest mb-4">Témoignages</span>
        <h2 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-text mb-4">
          Ce que disent <span class="text-accent-dark">nos clients</span>
        </h2>

        <!-- Overall rating summary -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <div class="flex items-center gap-1">
            <svg v-for="star in 5" :key="star" class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div class="text-left">
            <span class="text-text font-display font-bold text-lg">4.9/5</span>
            <span class="text-text-muted text-sm ml-1">basé sur 200 avis</span>
          </div>
        </div>
      </div>

      <!-- Carousel -->
      <div class="relative">
        <!-- Arrow left -->
        <button
          class="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-border text-text-muted hover:text-accent-dark hover:border-accent/30 hover:bg-surface-alt transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label="Avis précédent"
          @click="navigate(-1)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Arrow right -->
        <button
          class="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-border text-text-muted hover:text-accent-dark hover:border-accent/30 hover:bg-surface-alt transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label="Avis suivant"
          @click="navigate(1)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- 3D Stage -->
        <div
          ref="stageRef"
          class="review-stage relative mx-8 sm:mx-14"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @keydown.left="navigate(-1)"
          @keydown.right="navigate(1)"
          tabindex="0"
          role="region"
          aria-label="Carrousel d'avis clients"
          aria-roledescription="carousel"
        >
          <div
            v-for="(testimonial, idx) in testimonials"
            :key="idx"
            class="review-card"
            :class="{ 'review-card--active': idx === current }"
            :style="cardStyle(idx)"
            :aria-hidden="idx !== current"
            @click="onCardClick(idx)"
          >
            <!-- Card content -->
            <div class="relative h-full flex flex-col p-5 sm:p-6">
              <!-- Stars -->
              <div class="flex items-center gap-0.5 mb-4">
                <svg v-for="star in 5" :key="star" class="w-4 h-4 text-yellow-400 star-pulse" :style="{ animationDelay: `${star * 0.1}s` }" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <!-- Quote -->
              <blockquote class="text-text-muted text-sm leading-relaxed flex-1 mb-5">
                "{{ testimonial.quote }}"
              </blockquote>

              <!-- Author -->
              <div class="flex items-center gap-3 pt-4 border-t border-border">
                <div class="flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 text-accent-dark font-display font-bold text-xs ring-2 ring-accent/20">
                  {{ testimonial.initials }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-text font-display font-semibold text-sm">{{ testimonial.name }}</p>
                  <p class="text-text-muted text-xs">{{ testimonial.sport }}</p>
                </div>
                <div class="flex items-center gap-1 bg-accent/10 rounded-full px-2 py-0.5">
                  <svg class="w-3 h-3 text-accent-dark" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-[10px] text-accent-dark font-display font-semibold">Vérifié</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots -->
        <div class="flex items-center justify-center gap-1.5 mt-6 sm:mt-8" role="tablist" aria-label="Navigation avis">
          <button
            v-for="(_, idx) in testimonials"
            :key="idx"
            class="review-dot"
            :class="idx === current ? 'review-dot--active' : ''"
            role="tab"
            :aria-selected="idx === current"
            :aria-label="`Avis ${idx + 1}`"
            @click="current = idx; startAutoplay()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stageRef = ref<HTMLElement | null>(null)
const current = ref(0)

// ---- Auto-play ----
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => navigate(1), 4000)
}

const stopAutoplay = () => {
  if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null }
}

onMounted(() => startAutoplay())
onUnmounted(() => stopAutoplay())

// ---- Navigation ----
const navigate = (dir: number) => {
  const len = testimonials.length
  if (!len) return
  current.value = (current.value + dir + len) % len
  startAutoplay()
}

// ---- Touch / Swipe ----
let tx0 = 0
let dx = 0

const onTouchStart = (e: TouchEvent) => { tx0 = e.touches[0].clientX; dx = 0 }
const onTouchMove = (e: TouchEvent) => { dx = e.touches[0].clientX - tx0 }
const onTouchEnd = () => {
  if (Math.abs(dx) > 40) navigate(dx < 0 ? 1 : -1)
  dx = 0
}

// ---- Card click ----
const onCardClick = (idx: number) => {
  if (idx !== current.value) { current.value = idx; startAutoplay() }
}

// ---- 3D positioning (infinite wrap-around) — same algo as SocialVideoSection ----
const cardStyle = (idx: number) => {
  const len = testimonials.length
  if (!len) return { opacity: 0, pointerEvents: 'none' as const, transform: 'scale(0)' }

  let diff = idx - current.value
  if (diff > len / 2) diff -= len
  if (diff < -len / 2) diff += len

  const abs = Math.abs(diff)

  if (abs > 3) return { opacity: 0, pointerEvents: 'none' as const, transform: 'scale(0)' }

  const tx = diff * 58
  const tz = -abs * 80
  const ry = diff * -8
  const s = abs === 0 ? 1 : Math.max(0.7, 1 - abs * 0.12)
  const o = abs === 0 ? 1 : Math.max(0, 1 - abs * 0.3)

  return {
    transform: `translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${s})`,
    opacity: o,
    zIndex: 20 - abs,
    pointerEvents: abs > 2 ? 'none' as const : 'auto' as const,
    filter: abs > 0 ? `brightness(${0.92 + (1 - abs * 0.15) * 0.08})` : 'none',
  }
}

// ---- Testimonials data (~90% gym, ~10% other sport/lifestyle) ----
const testimonials = [
  {
    name: 'Thomas L.',
    initials: 'TL',
    sport: 'Musculation',
    quote: "Je l'accroche sur le rack entre chaque série, ma bouteille est toujours à portée de main. Un game-changer en salle.",
  },
  {
    name: 'Camille D.',
    initials: 'CD',
    sport: 'Fitness & Cardio',
    quote: "Plus besoin de poser ma gourde par terre entre les machines. Le ClipBag se fixe partout en salle, c'est hyper pratique.",
  },
  {
    name: 'Mehdi B.',
    initials: 'MB',
    sport: 'Musculation',
    quote: "Sceptique au départ, convaincu après 5 minutes. La fixation magnétique sur les machines est ultra solide. J'en ai pris un deuxième.",
  },
  {
    name: 'Sophie M.',
    initials: 'SM',
    sport: 'CrossFit',
    quote: "Entre les WODs j'ai toujours ma bouteille sous la main. Plus de temps perdu à la chercher dans la salle. Indispensable.",
  },
  {
    name: 'Lucas R.',
    initials: 'LR',
    sport: 'Musculation',
    quote: "120g seulement et ça tient une bouteille d'1L sans broncher. Je le fixe sur la smith machine, sur le banc, partout.",
  },
  {
    name: 'Léa P.',
    initials: 'LP',
    sport: 'Fitness',
    quote: "Le design est canon et la qualité au top. Toutes les filles de ma salle me demandent où je l'ai trouvé.",
  },
  {
    name: 'Antoine G.',
    initials: 'AG',
    sport: 'Powerlifting',
    quote: "Je soulève lourd et j'ai besoin de m'hydrater souvent. Le ClipBag sur le rack c'est la solution parfaite, zéro contrainte.",
  },
  {
    name: 'Nathan F.',
    initials: 'NF',
    sport: 'Musculation',
    quote: "Ça fait 4 mois que je l'utilise tous les jours en salle. Toujours comme neuf. La qualité des aimants est impressionnante.",
  },
  {
    name: 'Julie V.',
    initials: 'JV',
    sport: 'Randonnée',
    quote: "Je l'ai pris pour la rando. Sur les poteaux métalliques des refuges, sur la voiture, c'est génial même en dehors de la salle.",
  },
  {
    name: 'Maxime T.',
    initials: 'MT',
    sport: 'Quotidien & Bureau',
    quote: "Je l'utilise même au bureau, clipsé sur le pied de mon écran. Ma bouteille est toujours là sans encombrer le bureau. Malin.",
  },
]
</script>

<style scoped>
/* ---- Stage: 3D perspective container ---- */
.review-stage {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  height: 260px;
  position: relative;
  outline: none;
}

/* ---- Card: absolutely centered, 3D-transformed ---- */
.review-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: clamp(260px, 70vw, 320px);
  height: 260px;
  margin-left: calc(clamp(260px, 70vw, 320px) / -2);
  border-radius: 1rem;
  overflow: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  cursor: pointer;
  background: #fff;
  border: 1px solid rgba(16, 16, 16, 0.12);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* ---- Active card ---- */
.review-card--active {
  background: #fff;
  border-color: rgba(16, 16, 16, 0.12);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.04);
}

/* ---- Dots ---- */
.review-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: rgba(16, 16, 16, 0.15);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.review-dot:hover {
  background: rgba(16, 16, 16, 0.35);
}

.review-dot--active {
  width: 28px;
  background: var(--color-accent, #a9f955);
  box-shadow: 0 0 12px rgba(169, 249, 85, 0.4);
}

/* ---- Desktop: larger cards ---- */
@media (min-width: 640px) {
  .review-stage {
    height: 280px;
  }

  .review-card {
    width: clamp(340px, 32vw, 440px);
    height: 280px;
    margin-left: calc(clamp(340px, 32vw, 440px) / -2);
    border-radius: 1rem;
  }

  .review-dot--active {
    width: 32px;
  }
}

/* ---- Star pulse on active card ---- */
.review-card--active .star-pulse {
  animation: star-pulse 2s ease-in-out infinite;
}

@keyframes star-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.6)); }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .review-card,
  .review-dot,
  .star-pulse {
    transition: none;
    animation: none;
  }
}
</style>
