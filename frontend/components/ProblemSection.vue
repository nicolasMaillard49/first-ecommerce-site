<template>
  <section id="problem-section" class="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <!-- Subtle background glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/3 rounded-full blur-[120px]"></div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-16 animate-on-scroll">
        <span class="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-4">Le constat</span>
        <h2 class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Vous Connaissez Ce
          <span class="text-brand">Probleme</span> ?
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Chaque sportif a vecu cette frustration. Nous avons concu la solution definitive.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Problem side -->
        <div class="animate-on-scroll-left bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10 rounded-3xl p-8 sm:p-10 relative group">
          <!-- Red accent line -->
          <div class="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>

          <div class="flex items-center gap-3 mb-8">
            <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 text-red-400">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="font-display font-black text-2xl sm:text-3xl text-red-400">Sans ClipBag</h3>
          </div>

          <ul class="space-y-5">
            <li
              v-for="(problem, idx) in problems"
              :key="idx"
              class="flex items-start gap-4"
            >
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 mt-0.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <div>
                <p class="text-white font-semibold text-base sm:text-lg mb-1">{{ problem.title }}</p>
                <p class="text-gray-500 text-sm leading-relaxed">{{ problem.desc }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Solution side -->
        <div class="animate-on-scroll-right bg-gradient-to-br from-brand/5 to-transparent border border-brand/20 rounded-3xl p-8 sm:p-10 relative group ring-1 ring-brand/5">
          <!-- Green accent line -->
          <div class="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"></div>

          <div class="flex items-center gap-3 mb-8">
            <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand/10 text-brand">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-display font-black text-2xl sm:text-3xl text-brand">Avec ClipBag</h3>
          </div>

          <ul class="space-y-5">
            <li
              v-for="(solution, idx) in solutions"
              :key="idx"
              class="flex items-start gap-4"
            >
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand/10 text-brand mt-0.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <p class="text-white font-semibold text-base sm:text-lg mb-1">{{ solution.title }}</p>
                <p class="text-gray-500 text-sm leading-relaxed">{{ solution.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const problems = [
  {
    title: 'Mains toujours occupees',
    desc: 'Impossible de courir, pedaler ou grimper efficacement avec une bouteille a la main.',
  },
  {
    title: 'Porte-bouteilles instables',
    desc: 'Les solutions classiques glissent, se detachent et finissent par vous ralentir.',
  },
  {
    title: 'Sacs encombrants',
    desc: 'Un sac a dos juste pour une bouteille ? Trop lourd, trop chaud, trop contraignant.',
  },
  {
    title: 'Deshydratation par flemme',
    desc: 'Quand boire devient complique, on boit moins. Et les performances chutent.',
  },
]

const solutions = [
  {
    title: 'Fixation magnetique instantanee',
    desc: 'Un clic et votre bouteille est securisee. Detachement tout aussi rapide.',
  },
  {
    title: 'Stabilite a toute epreuve',
    desc: 'Les aimants neodyme tiennent fermement, meme en plein sprint ou sur terrain accidente.',
  },
  {
    title: 'Ultra compact : 120g seulement',
    desc: 'Si leger que vous oublierez que vous le portez. Zero contrainte, zero encombrement.',
  },
  {
    title: 'Hydratation sans effort',
    desc: 'Votre bouteille toujours a portee de main. Buvez plus, performez mieux.',
  },
]
</script>
