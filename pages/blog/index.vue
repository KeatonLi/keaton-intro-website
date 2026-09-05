<template>
  <div class="min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#f3f5f8] px-4 pb-20 pt-6 sm:px-6 md:pb-28 md:pt-8">
    <section class="mx-auto max-w-[1180px] overflow-hidden rounded-[34px] border border-white/90 bg-[#eef3fb] px-6 py-16 shadow-[0_24px_70px_rgba(69,91,125,0.10)] backdrop-blur-2xl sm:px-10 md:rounded-[44px] md:py-24 lg:px-16">
      <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#5377b5]">{{ blogConfig.eyebrow }}</p>
          <h1 class="mt-5 text-5xl font-semibold tracking-[-0.055em] text-[#111114] sm:text-6xl md:text-7xl">{{ blogConfig.title }}</h1>
        </div>
        <p class="max-w-2xl text-base leading-8 text-black/56 sm:text-lg">{{ blogConfig.description }}</p>
      </div>
    </section>

    <section class="mx-auto mt-6 max-w-[1180px]">
      <div v-if="blogConfig.articles.length" class="grid gap-5 md:grid-cols-2">
        <a
          v-for="article in blogConfig.articles"
          :key="article.url"
          :href="article.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex min-h-[310px] flex-col rounded-[30px] border border-white/90 bg-white/70 p-7 shadow-[0_18px_48px_rgba(57,75,105,0.07)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 sm:p-8"
        >
          <div class="flex items-center justify-between gap-4 text-xs text-black/42">
            <span class="rounded-full bg-[#e7eef9] px-3 py-1.5 font-medium text-[#315f9d]">{{ article.platform }}</span>
            <span>{{ article.date }}</span>
          </div>
          <h2 class="mt-8 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#111114] sm:text-3xl">{{ article.title }}</h2>
          <p class="mt-5 line-clamp-3 leading-7 text-black/55">{{ article.summary }}</p>
          <div class="mt-auto flex items-end justify-between gap-5 pt-8">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in article.tags" :key="tag" class="rounded-full bg-[#eff3f8] px-3 py-1.5 text-xs text-black/48">{{ tag }}</span>
            </div>
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-white shadow-[0_10px_24px_rgba(29,78,216,0.22)]">
              <Icon name="ph:arrow-up-right" class="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </a>
      </div>

      <div v-else class="rounded-[34px] border border-white/90 bg-white/66 px-6 py-20 text-center shadow-[0_20px_55px_rgba(57,75,105,0.08)] backdrop-blur-2xl sm:px-10 md:py-28">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#e6efff] text-[#3166c7] ring-1 ring-white">
          <Icon name="ph:article" class="h-8 w-8" />
        </div>
        <h2 class="mt-7 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{{ blogConfig.emptyState.title }}</h2>
        <p class="mx-auto mt-4 max-w-xl leading-7 text-black/52">{{ blogConfig.emptyState.description }}</p>
        <NuxtLink to="/#profile" class="mt-8 inline-flex items-center gap-2 rounded-full border border-white bg-white/80 px-5 py-3 text-sm font-medium text-black/65 shadow-sm transition-colors hover:bg-white">
          先查看我的简历
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import blogConfig from '~/data/blog.json'

useHead({
  title: `${blogConfig.title} - Keaton`,
  meta: [{ name: 'description', content: blogConfig.description }]
})
</script>
