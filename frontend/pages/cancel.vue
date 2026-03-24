<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-20">
    <div class="max-w-md w-full text-center">
      <!-- Red X circle -->
      <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 class="font-display font-black text-3xl text-white mb-3">Paiement Annulé</h1>
      <p class="text-gray-400 mb-8">Votre paiement a été annulé. Aucun montant n'a été débité.</p>

      <NuxtLink
        to="/"
        class="btn-primary inline-block"
      >
        Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>
