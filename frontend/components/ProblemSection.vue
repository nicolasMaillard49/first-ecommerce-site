<template>
  <section id="problem-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <!-- Subtle background glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/3 rounded-full blur-[120px]"></div>

    <div class="relative max-w-3xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-12 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Le constat</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Vous Connaissez Ce
          <span class="text-brand">Problème</span> ?
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Chaque sportif a vécu cette frustration. Nous avons conçu la solution définitive.
        </p>
      </div>

      <!-- Single VS card -->
      <div class="animate-on-scroll bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-3xl overflow-hidden">
        <!-- Column headers -->
        <div class="grid grid-cols-2">
          <div class="flex items-center justify-center gap-2 py-4 sm:py-5 border-r border-white/[0.06] bg-red-500/[0.04]">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="font-display font-bold text-sm sm:text-lg text-red-400">Sans</span>
          </div>
          <div class="flex items-center justify-center gap-2 py-4 sm:py-5 bg-brand/[0.04]">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class="font-display font-bold text-sm sm:text-lg text-brand">Avec</span>
          </div>
        </div>

        <!-- VS rows -->
        <div
          v-for="(row, idx) in rows"
          :key="idx"
          class="grid grid-cols-2 border-t border-white/[0.06]"
        >
          <div class="flex items-start gap-2 p-3 sm:p-5 border-r border-white/[0.06]">
            <svg class="shrink-0 w-4 h-4 text-red-400/60 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="text-gray-500 text-xs sm:text-sm leading-snug">{{ row.problem }}</span>
          </div>
          <div class="flex items-start gap-2 p-3 sm:p-5">
            <svg class="shrink-0 w-4 h-4 text-brand/80 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-300 text-xs sm:text-sm leading-snug">{{ row.solution }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { problem: 'Mains occupées pendant le sport', solution: 'Fixation magnétique en un clic' },
  { problem: 'Porte-bouteilles instables', solution: 'Aimants néodyme ultra-stables' },
  { problem: 'Sac à dos trop encombrant', solution: '120g seulement, zéro gêne' },
  { problem: 'On boit moins, on performe moins', solution: 'Bouteille toujours à portée' },
]
</script>
