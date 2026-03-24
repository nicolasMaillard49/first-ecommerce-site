<script setup lang="ts">
useSeoMeta({
  title: 'Paiement Annulé - Geestock',
  robots: 'noindex',
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-24">
    <div class="max-w-lg w-full text-center">
      <!-- Red X circle -->
      <div class="w-24 h-24 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg class="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 class="font-display font-black text-3xl sm:text-4xl text-white mb-3">Paiement Annulé</h1>
      <p class="text-gray-400 text-lg mb-4 max-w-sm mx-auto">
        Votre paiement a été annulé. Aucun montant n'a été débité.
      </p>
      <p class="text-gray-500 text-sm mb-10">
        Vous pouvez réessayer à tout moment. Votre panier vous attend.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/"
          class="btn-primary inline-flex items-center gap-2 cursor-pointer"
        >
          Réessayer la commande
        </NuxtLink>
        <a
          href="mailto:contact@geestock.fr"
          class="text-sm text-gray-400 hover:text-brand transition-colors duration-200 cursor-pointer"
        >
          Besoin d'aide ?
        </a>
      </div>
    </div>
  </div>
</template>
