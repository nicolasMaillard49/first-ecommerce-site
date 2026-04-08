<template>
  <section id="problem-section" class="relative overflow-hidden bg-surface-alt">
    <!-- Subtle accent glow -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
      <!-- Section header — left-aligned, editorial -->
      <div class="mb-16 sm:mb-24 animate-on-scroll">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-px bg-accent-dark"></div>
          <span class="text-accent-dark text-xs font-display font-semibold uppercase tracking-[0.3em]">Le constat</span>
        </div>
        <h2 class="font-display font-bold text-[28px] sm:text-[36px] lg:text-[48px] uppercase tracking-tight text-text leading-[1.05] max-w-2xl">
          Arrêtez de
          <span class="relative inline-block">
            <span class="text-urgency">subir</span>
            <svg class="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
              <path d="M0 5C40 2 60 7 100 4C140 1 160 6 200 3" stroke="#d43a35" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>,<br>
          commencez à
          <span class="text-accent-dark">performer</span>.
        </h2>
      </div>

      <!-- Strike & Resolve blocks -->
      <div class="space-y-6 sm:space-y-8">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="strike-block animate-on-scroll cursor-pointer"
          :class="{ 'is-revealed': item.revealed, 'is-visible': item.visible }"
          :data-idx="idx"
          :style="{ animationDelay: idx * 0.1 + 's' }"
          @click="reveal(idx)"
        >
          <div class="relative rounded-2xl overflow-hidden">
            <!-- Glass card bg -->
            <div class="absolute inset-0 glass-card rounded-2xl transition-all duration-500"></div>

            <div class="relative flex flex-col lg:flex-row lg:items-stretch">
              <!-- Problem side -->
              <div class="flex-1 px-6 sm:px-8 py-6 sm:py-8 lg:border-r lg:border-text/[0.06]">
                <div class="flex items-start gap-4 sm:gap-5">
                  <!-- Large number -->
                  <span class="font-display font-black text-[56px] sm:text-[72px] leading-none text-text/[0.04] select-none -mt-2 transition-colors duration-500 number-glow">
                    {{ idx + 1 }}
                  </span>
                  <div class="pt-2 sm:pt-3 min-w-0">
                    <!-- Struck problem text -->
                    <div class="relative inline-block">
                      <h3 class="font-display font-bold text-lg sm:text-xl lg:text-2xl uppercase tracking-tight text-text/60 leading-tight transition-colors duration-500">
                        {{ item.pain }}
                      </h3>
                      <!-- Animated strike line -->
                      <div class="absolute top-1/2 left-0 h-[2px] bg-urgency/80 -translate-y-1/2 strike-line rounded-full"></div>
                    </div>
                    <p class="text-text-muted text-sm sm:text-base mt-2 leading-relaxed max-w-md">{{ item.painDetail }}</p>

                    <!-- Tap hint (hidden once revealed) -->
                    <div class="tap-hint flex items-center gap-1.5 mt-3 transition-all duration-300">
                      <svg class="w-3.5 h-3.5 text-accent-dark/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                      <span class="text-accent-dark/50 text-xs font-display uppercase tracking-wider">Voir la solution</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Arrow transition (desktop) -->
              <div class="hidden lg:flex items-center justify-center w-16 flex-shrink-0 relative">
                <div class="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center transition-all duration-500 arrow-circle">
                  <svg class="w-4 h-4 text-accent-dark transition-transform duration-500 arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              <!-- Mobile arrow -->
              <div class="flex lg:hidden justify-center -my-1 relative z-10">
                <div class="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center transition-all duration-500 arrow-circle">
                  <svg class="w-3.5 h-3.5 text-accent-dark transition-transform duration-500 arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>
              </div>

              <!-- Solution side (hidden by default) -->
              <div class="flex-1 solution-panel overflow-hidden">
                <div class="px-6 sm:px-8 py-6 sm:py-8">
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 check-icon">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div class="pt-0.5 sm:pt-1">
                      <h4 class="font-display font-bold text-lg sm:text-xl lg:text-2xl uppercase tracking-tight text-accent-dark leading-tight">
                        {{ item.solution }}
                      </h4>
                      <p class="text-text-muted text-sm sm:text-base mt-2 leading-relaxed">{{ item.solutionDetail }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 sm:mt-20 animate-on-scroll flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          class="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover active:scale-[0.98] text-text font-display font-bold text-base sm:text-lg uppercase tracking-wider py-4 px-10 sm:px-12 rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_24px_rgba(169,249,85,0.25)] hover:shadow-[0_8px_40px_rgba(169,249,85,0.35)]"
          @click="scrollToOrder"
        >
          Découvrir ClipBag
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <span class="text-text-muted text-sm font-display uppercase tracking-wider">4 problèmes. 1 solution.</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'

const items = reactive([
  {
    pain: 'Mains occupées pendant le sport',
    painDetail: 'Impossible de tenir sa bouteille et s\'entraîner correctement.',
    solution: 'Fixation magnétique en un clic',
    solutionDetail: 'Clipse et décroche instantanément, les mains libres.',
    revealed: false,
    visible: false,
  },
  {
    pain: 'Porte-bouteilles instables',
    painDetail: 'Ça bouge, ça tombe, c\'est frustrant à chaque séance.',
    solution: 'Aimants néodyme ultra-stables',
    solutionDetail: 'Tient même en plein effort, garanti.',
    revealed: false,
    visible: false,
  },
  {
    pain: 'Sac à dos trop encombrant',
    painDetail: 'On transpire plus, on est moins libre de ses mouvements.',
    solution: '120g seulement, zéro gêne',
    solutionDetail: 'On oublie qu\'on le porte.',
    revealed: false,
    visible: false,
  },
  {
    pain: 'On boit moins, on performe moins',
    painDetail: 'La bouteille reste dans le sac, on oublie de s\'hydrater.',
    solution: 'Bouteille toujours à portée',
    solutionDetail: 'Hydratation optimale, performance maximale.',
    revealed: false,
    visible: false,
  },
])

const reveal = (idx: number) => {
  items[idx].revealed = true
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-idx'))
          if (!isNaN(idx)) items[idx].visible = true
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('#problem-section .strike-block').forEach((el) => {
    observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

const scrollToOrder = () => {
  const el = document.getElementById('order-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 4px 16px rgba(16, 16, 16, 0.06),
    0 1px 3px rgba(16, 16, 16, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.strike-block:hover .glass-card {
  box-shadow:
    0 8px 32px rgba(16, 16, 16, 0.1),
    0 2px 8px rgba(16, 16, 16, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.7);
}

.is-revealed .glass-card {
  background: rgba(255, 255, 255, 0.75);
  box-shadow:
    0 12px 40px rgba(16, 16, 16, 0.1),
    0 4px 12px rgba(169, 249, 85, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-color: rgba(169, 249, 85, 0.2);
}

/* Strike blocks — entrance */
.strike-block {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.strike-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animated strike line — draws on scroll */
.strike-line {
  width: 0;
  transition: width 0.6s cubic-bezier(0.33, 1, 0.68, 1) 0.4s;
}

.strike-block.is-visible .strike-line {
  width: 100%;
}

/* Number glow on reveal */
.is-revealed .number-glow {
  color: rgba(169, 249, 85, 0.12);
}

/* Tap hint — hidden on reveal */
.tap-hint {
  opacity: 1;
  max-height: 40px;
}

.is-revealed .tap-hint {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.4s ease 0.1s, margin-top 0.4s ease 0.1s;
}

/* Problem text dims on reveal */
.is-revealed h3 {
  color: rgba(16, 16, 16, 0.3);
}

/* Solution panel — collapsed by default, expands on click */
.solution-panel {
  max-height: 0;
  opacity: 0;
  transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.5s ease 0.15s;
}

.is-revealed .solution-panel {
  max-height: 200px;
  opacity: 1;
}

/* Arrow circle glow on reveal */
.is-revealed .arrow-circle {
  background: rgba(169, 249, 85, 0.25);
  box-shadow: 0 0 20px rgba(169, 249, 85, 0.2);
}

/* Check icon pop on reveal */
.is-revealed .check-icon {
  background: rgba(169, 249, 85, 0.3);
  box-shadow: 0 0 16px rgba(169, 249, 85, 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .strike-block {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .strike-line {
    width: 100%;
    transition: none;
  }
  .solution-panel {
    max-height: none;
    opacity: 1;
    transition: none;
  }
  .tap-hint {
    display: none;
  }
}
</style>
