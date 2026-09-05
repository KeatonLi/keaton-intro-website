<template>
  <div class="overflow-x-clip bg-[#f3f5f8]">
    <nav class="chapter-scroll sticky top-14 z-40 flex gap-2 overflow-x-auto border-y border-white/80 bg-white/72 px-4 py-3 shadow-[0_8px_24px_rgba(57,75,105,0.05)] backdrop-blur-2xl xl:hidden" aria-label="页面章节导航">
      <a v-for="chapter in chapters" :key="chapter.id" :href="`#${chapter.id}`" class="shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300" :class="activeChapter === chapter.id ? 'bg-[#1d4ed8] text-white shadow-[0_7px_16px_rgba(29,78,216,0.22)]' : 'bg-white/80 text-black/52 ring-1 ring-black/5'">{{ chapter.shortLabel }}</a>
    </nav>

    <aside class="fixed left-[max(12px,calc((100vw-1420px)/2))] top-1/2 z-40 hidden w-[96px] -translate-y-1/2 xl:block">
      <nav class="rounded-[26px] border border-white/90 bg-white/66 p-2.5 shadow-[0_18px_48px_rgba(57,75,105,0.10)] backdrop-blur-2xl" aria-label="页面章节导航">
        <a v-for="chapter in chapters" :key="chapter.id" :href="`#${chapter.id}`" class="group block rounded-[18px] px-3 py-3 transition-colors" :class="activeChapter === chapter.id ? 'bg-[#e5edfa] text-[#1d4ed8]' : 'text-black/42 hover:bg-white/75 hover:text-black/65'">
          <span class="block text-[10px] font-semibold tracking-[0.12em]">{{ chapter.index }}</span>
          <span class="mt-1 block text-xs font-medium">{{ chapter.shortLabel }}</span>
        </a>
      </nav>
    </aside>

    <div class="xl:pl-[112px]">
    <section id="overview" class="scroll-mt-32 px-4 pb-20 pt-5 sm:px-6 md:pb-28 md:pt-7">
      <div class="mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-white/90 bg-[#eef3fb] px-5 py-16 shadow-[0_24px_70px_rgba(69,91,125,0.10)] backdrop-blur-2xl sm:px-10 md:rounded-[44px] md:py-24 lg:px-16 lg:py-28">
        <div class="mx-auto max-w-[1040px] text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/62 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-[#1d4ed8] shadow-[0_10px_30px_rgba(74,96,150,0.10)] backdrop-blur-2xl sm:text-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />
            {{ config.home.eyebrow }}
          </div>

          <h1 class="mt-8 text-[clamp(2.65rem,7vw,6.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#111114]">
            {{ config.home.headlineLine1 }}<br />
            <span class="text-[#1d4ed8]">{{ config.home.headlineAccent }}</span>
          </h1>
          <p class="mx-auto mt-8 max-w-3xl text-base leading-8 text-black/60 sm:text-lg md:text-xl md:leading-9">
            {{ config.home.summary }}
          </p>

          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink to="/#capabilities" class="inline-flex items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_28px_rgba(29,78,216,0.24)] transition-transform hover:-translate-y-0.5">
              查看技术能力
              <Icon name="ph:arrow-down" class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink to="/#profile" class="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/66 px-6 py-3.5 text-sm font-medium text-black/72 shadow-[0_10px_28px_rgba(30,41,59,0.08)] backdrop-blur-2xl transition-colors hover:bg-white/90">
              完整简历
              <Icon name="ph:arrow-up-right" class="h-4 w-4" />
            </NuxtLink>
          </div>

          <div class="mx-auto mt-14 grid max-w-4xl grid-cols-2 overflow-hidden rounded-[24px] border border-white/90 bg-white/58 shadow-[0_18px_50px_rgba(30,41,59,0.08)] backdrop-blur-2xl md:grid-cols-4">
            <div v-for="(metric, index) in config.metrics" :key="metric.label" class="px-3 py-5 text-center sm:py-6" :class="index ? 'border-l border-white/90' : ''">
              <p class="text-xl font-semibold tracking-[-0.03em] text-[#1d4ed8] sm:text-2xl">{{ metric.value }}</p>
              <p class="mt-1.5 text-xs text-black/45 sm:text-sm">{{ metric.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="capabilities" class="relative -mt-8 scroll-mt-20 rounded-t-[44px] border-t border-white/90 bg-[#f8f9fb] px-4 pb-28 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.04)] sm:px-6 md:rounded-t-[64px] md:pb-36 md:pt-28">
      <div class="mx-auto max-w-[1180px]">
        <div class="grid gap-8 lg:grid-cols-[90px_1fr] lg:gap-12">
          <p class="pt-2 text-xs font-semibold tracking-[0.16em] text-[#63769b]">01 / 能力</p>
          <div class="max-w-3xl">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#63769b]">Engineering focus</p>
            <h2 class="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl md:text-6xl">从平台到生产，覆盖系统演进的完整链路。</h2>
            <p class="mt-6 max-w-2xl text-base leading-8 text-black/56 sm:text-lg">技术不只是一组名词，而是把交付效率、运行稳定性和工程体验连接起来的方法。</p>
          </div>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="capability in config.home.capabilities" :key="capability.id" class="group flex min-h-[430px] flex-col rounded-[32px] border border-white/90 bg-white/72 p-7 shadow-[0_18px_48px_rgba(57,75,105,0.07)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1 sm:p-8">
            <div class="flex items-start justify-between gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#e8eefb] text-[#1d4ed8] shadow-inner ring-1 ring-white">
                <Icon :name="capability.icon" class="h-7 w-7" />
              </div>
              <span class="rounded-full bg-[#eff3f8] px-3 py-1.5 text-xs font-medium text-black/45">{{ capability.label }}</span>
            </div>
            <h3 class="mt-9 text-3xl font-semibold tracking-[-0.035em]">{{ capability.title }}</h3>
            <p class="mt-5 text-[15px] leading-7 text-black/58">{{ capability.summary }}</p>
            <div class="mt-7 flex flex-wrap gap-2">
              <span v-for="principle in capability.principles" :key="principle" class="rounded-full border border-black/5 bg-white/75 px-3 py-1.5 text-xs text-black/58 shadow-sm">{{ principle }}</span>
            </div>
            <div class="mt-auto border-t border-black/5 pt-7">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">Stack</p>
              <p class="mt-3 text-sm leading-7 text-black/55">{{ capability.technologies.join(' · ') }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <ResumeJourney />

    <section id="contact" class="relative -mt-8 scroll-mt-32 rounded-t-[44px] border-t border-white/90 bg-[#f8fafc] px-4 pb-10 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.04)] sm:px-6 md:rounded-t-[64px] md:pb-14 md:pt-28">
      <div class="mx-auto max-w-[1180px]">
        <p class="mb-8 text-center text-xs font-semibold tracking-[0.16em] text-[#6076b5]">06 / 联系</p>
        <div class="rounded-[34px] border border-white/90 bg-white/58 px-6 py-16 text-center shadow-[0_24px_70px_rgba(48,65,111,0.10)] backdrop-blur-2xl sm:px-10 md:py-20">
          <h2 class="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{{ config.contact.heading }}</h2>
          <p class="mx-auto mt-5 max-w-xl text-base leading-8 text-black/55">{{ config.contact.description }}</p>
          <a :href="`mailto:${config.profile.email}`" class="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d4ed8] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(29,78,216,0.22)] transition-transform hover:-translate-y-0.5">
            {{ config.contact.emailLabel }}
            <Icon name="ph:arrow-up-right" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import config from '~/data/profile.json'

useHead({
  title: `${config.profile.name} - Cloud Native / DevOps / SRE`,
  meta: [{ name: 'description', content: config.home.summary }]
})

const chapters = [
  { id: 'overview', index: '00', shortLabel: '概览' },
  { id: 'capabilities', index: '01', shortLabel: '技术' },
  { id: 'profile', index: '02', shortLabel: '简介' },
  { id: 'education', index: '03', shortLabel: '教育' },
  { id: 'experience', index: '04', shortLabel: '工作' },
  { id: 'projects', index: '05', shortLabel: '项目' },
  { id: 'contact', index: '06', shortLabel: '联系' }
]

const activeChapter = ref('overview')
let chapterObserver

onMounted(() => {
  chapterObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

    if (visible?.target?.id) activeChapter.value = visible.target.id
  }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.1, 0.25] })

  chapters.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) chapterObserver.observe(section)
  })
})

onBeforeUnmount(() => chapterObserver?.disconnect())
</script>

<style scoped>
.chapter-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chapter-scroll::-webkit-scrollbar {
  display: none;
}
</style>
