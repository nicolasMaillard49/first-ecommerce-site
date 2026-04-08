<template>
  <section id="features-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-surface-alt">
    <div class="relative max-w-7xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16 animate-on-scroll">
        <span class="inline-block text-accent-dark text-xs font-display font-semibold uppercase tracking-widest mb-4">Avantages</span>
        <h2 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.15] text-text mb-4">
          Pourquoi <span class="text-accent-dark">ClipBag</span> ?
        </h2>
        <p class="text-text-muted text-lg max-w-2xl mx-auto">
          Conçu pour les sportifs exigeants qui refusent les compromis.
        </p>
      </div>

      <!-- Mobile: horizontal swipable carousel -->
      <div class="sm:hidden relative">
        <div
          ref="carouselRef"
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          @scroll="onCarouselScroll"
        >
          <div
            v-for="(feature, idx) in features"
            :key="idx"
            class="feature-card-enter snap-center flex-shrink-0 w-[85vw] group relative bg-white rounded-2xl p-8 transition-all duration-300 border border-border overflow-hidden feature-card"
            :class="`stagger-${idx + 1}`"
          >
            <div class="relative">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent-dark">
                  <component :is="feature.icon" />
                </div>
                <span class="text-6xl font-display font-bold text-gray-200 select-none">
                  {{ String(idx + 1).padStart(2, '0') }}
                </span>
              </div>

              <h3 class="font-display font-bold text-lg text-text mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-text-muted leading-relaxed text-base">
                {{ feature.description }}
              </p>

              <div v-if="feature.stat" class="mt-6 pt-6 border-t border-border">
                <span class="text-accent-dark font-display font-bold text-2xl">{{ feature.stat }}</span>
                <span class="text-text-muted text-sm ml-2">{{ feature.statLabel }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="flex justify-center gap-2 mt-2">
          <button
            v-for="(_, idx) in features"
            :key="idx"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none',
              activeCard === idx ? 'bg-accent-dark w-6' : 'bg-border',
            ]"
            :aria-label="`Voir avantage ${idx + 1}`"
            @click="scrollToCard(idx)"
          />
        </div>
      </div>

      <!-- Desktop: grid layout -->
      <div class="hidden sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-8">
        <div
          v-for="(feature, idx) in features"
          :key="idx"
          :class="[
            'feature-card-enter group relative bg-white rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-card hover:-translate-y-2 hover:scale-[1.02] cursor-default border border-border hover:border-accent/40 overflow-hidden feature-card w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]',
            `stagger-${idx + 1}`,
          ]"
        >
          <div class="relative">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent-dark transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                <component :is="feature.icon" />
              </div>
              <span class="text-6xl font-display font-bold text-gray-200 group-hover:text-accent/10 transition-colors duration-300 select-none">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>
            </div>

            <h3 class="font-display font-bold text-lg sm:text-xl text-text mb-3 transition-colors duration-300 group-hover:text-accent-dark">
              {{ feature.title }}
            </h3>
            <p class="text-text-muted leading-relaxed text-base">
              {{ feature.description }}
            </p>

            <div v-if="feature.stat" class="mt-6 pt-6 border-t border-border">
              <span class="text-accent-dark font-display font-bold text-2xl">{{ feature.stat }}</span>
              <span class="text-text-muted text-sm ml-2">{{ feature.statLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

const carouselRef = ref<HTMLElement | null>(null)
const activeCard = ref(0)

const onCarouselScroll = () => {
  const el = carouselRef.value
  if (!el) return
  const scrollLeft = el.scrollLeft
  const cardWidth = el.firstElementChild?.clientWidth || 1
  const gap = 16
  activeCard.value = Math.round(scrollLeft / (cardWidth + gap))
}

const scrollToCard = (idx: number) => {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = el.firstElementChild?.clientWidth || 1
  const gap = 16
  el.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' })
}

onMounted(() => {
  const cards = document.querySelectorAll('.feature-card-enter')
  if (cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((el) => observer.observe(el))
  }
})

const MagnetIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 2a4 4 0 014 4v6a4 4 0 01-8 0V6a4 4 0 014-4zM6 10v2a6 6 0 0012 0v-2M4 10h2M18 10h2M4 14h2M18 14h2',
      }),
    ]
  )

const FeatherIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9',
      }),
    ]
  )

const GlobeIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8',
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z',
      }),
    ]
  )

const ShieldIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      }),
    ]
  )

const ZapIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      }),
    ]
  )

const DropletIcon = () =>
  h(
    'svg',
    { class: 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' },
    [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        d: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z',
      }),
    ]
  )

const features = [
  {
    icon: MagnetIcon,
    title: 'Fixation Magnétique',
    description: 'Aimants néodyme ultra-puissants. Se fixe en un instant, tient fermement même en plein effort.',
    stat: '< 1s',
    statLabel: 'pour fixer',
  },
  {
    icon: FeatherIcon,
    title: 'Léger Comme l\'Air',
    description: 'Seulement 120g. Si léger que vous oublierez que vous le portez. Zéro contrainte.',
    stat: '120g',
    statLabel: 'seulement',
  },
  {
    icon: GlobeIcon,
    title: 'Compatible Universel',
    description: 'Fonctionne avec toutes les bouteilles de 500ml à 1L. S\'adapte à votre style de vie.',
    stat: '100%',
    statLabel: 'compatible',
  },
]
</script>

<style scoped>
.feature-card {
  will-change: transform, box-shadow;
}

/* Staggered entrance animation */
.feature-card-enter {
  opacity: 0;
  transform: translateY(30px) scale(0.96);
}

.feature-card-enter.is-visible {
  animation: feature-pop 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.feature-card-enter.is-visible.stagger-1 { animation-delay: 0s; }
.feature-card-enter.is-visible.stagger-2 { animation-delay: 0.15s; }
.feature-card-enter.is-visible.stagger-3 { animation-delay: 0.3s; }

@keyframes feature-pop {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  60% {
    opacity: 1;
    transform: translateY(-4px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Hide scrollbar for carousel */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .feature-card-enter {
    transition: none;
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
