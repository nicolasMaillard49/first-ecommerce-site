<template>
  <section id="problem-section" class="py-20 sm:py-28 relative overflow-hidden bg-white">
    <!-- Subtle center line (desktop only) -->
    <div class="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent pointer-events-none hidden lg:block"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-14 sm:mb-20 animate-on-scroll">
        <span class="inline-block text-accent-dark text-xs font-display font-semibold uppercase tracking-[0.25em] mb-4">Le constat</span>
        <h2 class="font-display font-bold text-[22px] sm:text-[26px] lg:text-[32px] uppercase tracking-tight text-text leading-[1.15] mb-5">
          Vous Connaissez Ce
          <span class="relative inline-block">
            <span class="text-accent-dark">Problème</span>
            <span class="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"></span>
          </span> ?
        </h2>
        <p class="text-text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Chaque sportif a vécu cette frustration. Nous avons conçu la solution définitive.
        </p>
      </div>

      <!-- ====== MOBILE: Single unified VS card ====== -->
      <div class="lg:hidden animate-on-scroll max-w-lg mx-auto">
        <div class="rounded-2xl overflow-hidden border border-border">
          <!-- Column headers -->
          <div class="grid grid-cols-2">
            <div class="flex items-center justify-center gap-1.5 py-3.5 bg-urgency/[0.06] border-r border-border border-b border-b-urgency/10">
              <svg class="w-4 h-4 text-urgency" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="font-display font-bold text-sm uppercase tracking-wider text-urgency">Sans</span>
            </div>
            <div class="flex items-center justify-center gap-1.5 py-3.5 bg-accent/10 border-b border-b-accent/20">
              <svg class="w-4 h-4 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span class="font-display font-bold text-sm uppercase tracking-wider text-accent-dark">Avec</span>
            </div>
          </div>

          <!-- VS rows -->
          <div
            v-for="(row, idx) in rows"
            :key="'mobile-' + idx"
            class="grid grid-cols-2 border-t border-border"
          >
            <!-- Problem cell -->
            <div class="flex items-start gap-2 p-3 sm:p-4 border-r border-border">
              <div class="w-5 h-5 rounded-full border-2 border-urgency/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-urgency/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span class="text-text-muted text-xs leading-snug">{{ row.problem }}</span>
            </div>
            <!-- Solution cell -->
            <div class="flex items-start gap-2 p-3 sm:p-4 bg-accent/[0.03]">
              <div class="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-2.5 h-2.5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-text text-xs font-medium leading-snug">{{ row.solution }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ====== DESKTOP: Split left/right cards ====== -->
      <div class="hidden lg:grid lg:grid-cols-2 lg:gap-0 max-w-5xl mx-auto">

        <!-- SANS — Left card -->
        <div class="animate-on-scroll problem-card-left relative rounded-l-3xl overflow-hidden border border-border border-r-0">
          <div class="flex items-center gap-2.5 px-7 py-5 bg-urgency/[0.06] border-b border-urgency/10">
            <div class="w-8 h-8 rounded-full bg-urgency/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-urgency" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span class="font-display font-bold text-lg uppercase tracking-wider text-urgency">Sans ClipBag</span>
          </div>
          <div class="divide-y divide-border">
            <div
              v-for="(row, idx) in rows"
              :key="'left-' + idx"
              class="flex items-start gap-3.5 px-7 py-5 group transition-colors duration-200 hover:bg-urgency/[0.03]"
            >
              <div class="w-6 h-6 rounded-full border-2 border-urgency/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-urgency/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <span class="text-text text-base font-medium leading-snug">{{ row.problem }}</span>
                <span class="block text-text-muted text-sm mt-0.5 leading-snug">{{ row.painDetail }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- AVEC — Right card -->
        <div class="animate-on-scroll problem-card-right relative rounded-r-3xl overflow-hidden border border-accent/20 bg-accent/[0.04]">
          <div class="flex items-center gap-2.5 px-7 py-5 bg-accent/10 border-b border-accent/20">
            <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="font-display font-bold text-lg uppercase tracking-wider text-accent-dark">Avec ClipBag</span>
          </div>
          <div class="divide-y divide-accent/10">
            <div
              v-for="(row, idx) in rows"
              :key="'right-' + idx"
              class="flex items-start gap-3.5 px-7 py-5 group transition-colors duration-200 hover:bg-accent/[0.06]"
            >
              <div class="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(169,249,85,0.3)]">
                <svg class="w-3 h-3 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span class="text-text text-base font-semibold leading-snug">{{ row.solution }}</span>
                <span class="block text-text-muted text-sm mt-0.5 leading-snug">{{ row.solutionDetail }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- VS badge (desktop only) -->
      <div class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 z-10">
        <div class="w-14 h-14 rounded-full bg-text flex items-center justify-center shadow-lg ring-4 ring-white">
          <span class="font-display font-black text-sm text-white uppercase tracking-wide">VS</span>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10 sm:mt-14 animate-on-scroll">
        <button
          class="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover active:scale-[0.98] text-text font-display font-bold text-base sm:text-lg uppercase tracking-wider py-3.5 sm:py-4 px-12 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_20px_rgba(169,249,85,0.35)] hover:shadow-[0_6px_30px_rgba(169,249,85,0.45)]"
          @click="scrollToOrder"
        >
          Découvrir la solution
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  {
    problem: 'Mains occupées pendant le sport',
    painDetail: 'Impossible de tenir sa bouteille et s\'entraîner',
    solution: 'Fixation magnétique en un clic',
    solutionDetail: 'Clipse et décroche instantanément',
  },
  {
    problem: 'Porte-bouteilles instables',
    painDetail: 'Ça bouge, ça tombe, c\'est frustrant',
    solution: 'Aimants néodyme ultra-stables',
    solutionDetail: 'Tient même en courant',
  },
  {
    problem: 'Sac à dos trop encombrant',
    painDetail: 'On transpire plus, on est moins libre',
    solution: '120g seulement, zéro gêne',
    solutionDetail: 'Léger comme une plume',
  },
  {
    problem: 'On boit moins, on performe moins',
    painDetail: 'La bouteille reste dans le sac…',
    solution: 'Bouteille toujours à portée',
    solutionDetail: 'Hydratation optimale à chaque instant',
  },
]

const scrollToOrder = () => {
  const el = document.getElementById('order-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.problem-card-left {
  opacity: 0;
  animation: slide-in-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-play-state: paused;
}

.problem-card-right {
  opacity: 0;
  animation: slide-in-right 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
  animation-play-state: paused;
}

.animate-on-scroll.is-visible .problem-card-left,
.problem-card-left.is-visible,
.animate-on-scroll .problem-card-left {
  animation-play-state: running;
}

.animate-on-scroll.is-visible .problem-card-right,
.problem-card-right.is-visible,
.animate-on-scroll .problem-card-right {
  animation-play-state: running;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .problem-card-left,
  .problem-card-right {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
