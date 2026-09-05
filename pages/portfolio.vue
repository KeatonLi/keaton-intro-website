<template>
  <div class="min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#f3f5f8] px-4 pb-20 pt-6 sm:px-6 md:pb-28 md:pt-8">
    <section class="mx-auto grid min-h-[610px] max-w-[1180px] overflow-hidden rounded-[34px] border border-white/90 bg-[#eef3fb] px-6 py-16 shadow-[0_24px_70px_rgba(69,91,125,0.10)] backdrop-blur-2xl sm:px-10 md:rounded-[44px] md:px-16 md:py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/62 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-[#1d4ed8] shadow-[0_10px_30px_rgba(74,96,150,0.08)] backdrop-blur-2xl">
          <span class="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />
          {{ portfolioConfig.statusLabel }}
        </div>
        <p class="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#5377b5]">{{ portfolioConfig.eyebrow }}</p>
        <h1 class="mt-5 text-6xl font-semibold tracking-[-0.06em] text-[#111114] sm:text-7xl md:text-8xl">{{ portfolioConfig.title }}</h1>
        <p class="mt-7 max-w-2xl text-base leading-8 text-black/56 sm:text-lg">{{ portfolioConfig.description }}</p>
        <NuxtLink to="/#projects" class="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(29,78,216,0.22)] transition-transform hover:-translate-y-0.5">
          先看项目经历
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>

      <div class="mt-14 lg:mt-0" aria-hidden="true">
        <div class="mx-auto flex aspect-square max-w-[390px] flex-col items-center justify-center rounded-[42px] border border-white/95 bg-white/55 p-8 text-center shadow-[0_28px_70px_rgba(67,85,120,0.12)] backdrop-blur-2xl">
          <div class="flex h-24 w-24 items-center justify-center rounded-[30px] bg-[#e3ecf9] text-[#3166c7] shadow-inner ring-1 ring-white">
            <Icon name="ph:squares-four" class="h-12 w-12" />
          </div>
          <p class="mt-8 text-sm font-medium text-black/64">Case studies in progress</p>
          <p class="mt-2 text-xs leading-6 text-black/38">Engineering · Product · Systems</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import portfolioConfig from '~/data/portfolio.json'

useHead({
  title: `${portfolioConfig.title} - Keaton`,
  meta: [{ name: 'description', content: portfolioConfig.description }]
})
</script>
