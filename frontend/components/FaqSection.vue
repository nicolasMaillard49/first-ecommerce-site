<template>
  <section class="py-20 sm:py-28 px-4 sm:px-6 bg-surface-light">
    <div class="max-w-3xl mx-auto">
      <h2
        class="font-display font-black text-3xl sm:text-4xl md:text-5xl text-center text-white mb-4"
      >
        Questions <span class="text-brand">fréquentes</span>
      </h2>
      <p class="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
        Tout ce que vous devez savoir avant de commander.
      </p>

      <div class="space-y-3">
        <div
          v-for="(item, idx) in faqs"
          :key="idx"
          class="bg-surface border border-surface-lighter rounded-xl overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer transition-colors duration-200 hover:bg-surface-lighter/30 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
            :aria-expanded="openIndex === idx"
            @click="toggle(idx)"
          >
            <span class="font-semibold text-white text-base sm:text-lg">{{ item.question }}</span>
            <svg
              :class="[
                'w-5 h-5 flex-shrink-0 text-brand transition-transform duration-300',
                openIndex === idx ? 'rotate-180' : '',
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            :class="[
              'grid transition-all duration-300 ease-in-out',
              openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            ]"
          >
            <div class="overflow-hidden">
              <p class="px-6 pb-5 text-gray-400 leading-relaxed">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

const toggle = (idx: number) => {
  openIndex.value = openIndex.value === idx ? null : idx
}

const faqs = [
  {
    question: 'Combien de temps dure la livraison ?',
    answer:
      'La livraison prend entre 7 et 14 jours ouvrés. Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande.',
  },
  {
    question: 'Est-ce compatible avec ma bouteille ?',
    answer:
      'Le Geestock est compatible avec toutes les bouteilles standard (de 500ml à 1L). Son design universel s\'adapte à la grande majorité des bouteilles du marché.',
  },
  {
    question: 'La fixation magnétique est-elle solide ?',
    answer:
      'Absolument. Nos aimants néodyme ultra-puissants garantissent une fixation ferme et sécurisée, même pendant les activités sportives intenses. Votre bouteille ne bougera pas.',
  },
  {
    question: 'Puis-je retourner le produit ?',
    answer:
      'Bien sûr. Nous offrons une garantie satisfait ou remboursé de 30 jours. Si le produit ne vous convient pas, renvoyez-le et nous vous rembourserons intégralement.',
  },
  {
    question: 'Le paiement est-il sécurisé ?',
    answer:
      'Oui, le paiement est 100% sécurisé via Stripe. Vos données bancaires sont chiffrées et ne sont jamais stockées sur nos serveurs.',
  },
]
</script>
