<template>
  <div class="grid gap-8 lg:grid-cols-[90px_1fr] lg:gap-12">
    <p class="pt-2 text-xs font-semibold tracking-[0.16em]" :class="tone === 'blue' ? 'text-[#5377b5]' : 'text-[#63769b]'">{{ index }} / {{ title.slice(0, 2) }}</p>
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em]" :class="tone === 'blue' ? 'text-[#5377b5]' : 'text-[#63769b]'">{{ eyebrow }}</p>
        <h2 class="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{{ title }}</h2>
      </div>
      <p v-if="$slots.meta" class="hidden text-sm text-black/42 sm:block"><slot name="meta" /></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  index: { type: String, required: true },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  tone: { type: String, default: 'gray' }
})
</script>
