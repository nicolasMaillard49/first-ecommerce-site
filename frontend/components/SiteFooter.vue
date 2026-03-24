<template>
  <footer class="border-t border-surface-lighter bg-surface py-12 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <a
          href="#"
          class="font-display font-black text-xl text-brand tracking-tight cursor-pointer"
          @click.prevent="scrollToTop"
        >
          GEESTOCK
        </a>

        <!-- Links -->
        <nav class="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <a
            href="#"
            class="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Mentions Légales
          </a>
          <a
            href="#"
            class="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Politique de Confidentialité
          </a>
          <a
            href="#"
            class="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 cursor-pointer"
          >
            Contact
          </a>
        </nav>
      </div>

      <!-- Copyright -->
      <p class="text-center text-xs text-gray-600 mt-8">
        &copy; 2026 Geestock. Tous droits réservés.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
