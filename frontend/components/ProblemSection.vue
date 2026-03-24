<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 sm:gap-12">
        <!-- Problem side -->
        <div
          class="bg-surface-light border border-surface-lighter rounded-2xl p-8 sm:p-10"
        >
          <h2 class="font-display font-black text-2xl sm:text-3xl text-white mb-8">
            Le problème
          </h2>

          <ul class="space-y-6">
            <li
              v-for="(problem, idx) in problems"
              :key="idx"
              class="flex items-start gap-4"
            >
              <span
                class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 mt-0.5"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <span class="text-gray-300 text-base sm:text-lg leading-relaxed">{{ problem }}</span>
            </li>
          </ul>
        </div>

        <!-- Solution side -->
        <div
          class="bg-surface-light border border-brand/20 rounded-2xl p-8 sm:p-10 ring-1 ring-brand/10"
        >
          <h2 class="font-display font-black text-2xl sm:text-3xl text-brand mb-8">
            La solution
          </h2>

          <ul class="space-y-6">
            <li
              v-for="(solution, idx) in solutions"
              :key="idx"
              class="flex items-start gap-4"
            >
              <span
                class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand/10 text-brand mt-0.5"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="text-gray-200 text-base sm:text-lg leading-relaxed">{{ solution }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const problems = [
  'Vos mains sont toujours occupées à tenir votre bouteille pendant le sport',
  'Les porte-bouteilles classiques glissent, se détachent et vous ralentissent',
  'Impossible de garder votre bouteille accessible sans un sac encombrant',
]

const solutions = [
  'Fixation magnétique instantanée : accrochez votre bouteille en un clic',
  'Tient fermement en toutes circonstances, même en plein effort',
  'Ultra compact et léger : vous oubliez que vous le portez',
]
</script>
