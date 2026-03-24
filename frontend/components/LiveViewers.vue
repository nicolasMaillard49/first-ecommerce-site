<template>
  <div class="inline-flex items-center gap-2 bg-surface/80 border border-surface-lighter rounded-full px-4 py-2">
    <span class="relative flex h-2.5 w-2.5">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
    </span>
    <span class="text-sm text-gray-300">
      <span class="font-semibold text-white tabular-nums">{{ viewers }}</span> personnes regardent ce produit
    </span>
  </div>
</template>

<script setup lang="ts">
const viewers = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const randomViewers = () => Math.floor(Math.random() * 13) + 3

onMounted(() => {
  viewers.value = randomViewers()
  interval = setInterval(() => {
    const current = viewers.value
    let next = randomViewers()
    // Avoid big jumps: keep within +-3 of current, clamped to 3-15
    while (Math.abs(next - current) > 3) {
      next = randomViewers()
    }
    viewers.value = next
  }, (Math.random() * 30 + 30) * 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
