<template>
  <div>
    <section id="profile" class="relative -mt-8 scroll-mt-32 rounded-t-[44px] border-t border-white/90 bg-[#edf3f9] px-4 pb-28 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.05)] sm:px-6 md:rounded-t-[64px] md:pb-36 md:pt-28">
      <div class="mx-auto max-w-[1080px]">
        <SectionHeading index="02" eyebrow="Profile" title="个人简介" tone="blue" />
        <div class="mt-10 rounded-[34px] border border-white/90 bg-white/66 p-6 shadow-[0_20px_55px_rgba(57,75,105,0.08)] backdrop-blur-2xl sm:p-9 md:p-11">
          <div class="grid gap-8 md:grid-cols-[148px_1fr] md:items-center">
            <figure class="h-[132px] w-[132px] overflow-hidden rounded-[34px] bg-white shadow-[0_18px_45px_rgba(30,41,59,0.14)] ring-1 ring-white sm:h-[148px] sm:w-[148px]">
              <img :src="config.profile.portrait" :alt="`${config.profile.chineseName} 的头像`" class="h-full w-full origin-bottom-right scale-[1.35] object-cover" />
            </figure>
            <div>
              <p class="text-sm font-medium text-[#1d4ed8]">{{ config.profile.location }}</p>
              <div class="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h3 class="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{{ config.profile.chineseName }}</h3>
                  <p class="mt-3 text-lg text-black/58">{{ config.profile.title }}</p>
                </div>
                <div class="space-y-2 text-sm text-black/48 lg:text-right">
                  <p>{{ config.profile.currentCompany }}</p>
                  <a :href="`mailto:${config.profile.email}`" class="block font-medium text-[#1d4ed8] hover:underline">{{ config.profile.email }}</a>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-9 max-w-4xl text-base leading-8 text-black/60 sm:text-lg">{{ config.profile.about }}</p>
        </div>
      </div>
    </section>

    <section id="education" class="relative -mt-8 scroll-mt-32 rounded-t-[44px] border-t border-white/90 bg-[#f8f9fb] px-4 pb-28 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.04)] sm:px-6 md:rounded-t-[64px] md:pb-36 md:pt-28">
      <div class="mx-auto max-w-[1080px]">
        <SectionHeading index="03" eyebrow="Education" title="教育经历" tone="gray" />
        <div class="mt-9 rounded-[30px] border border-white/90 bg-white/72 p-6 shadow-[0_18px_48px_rgba(57,75,105,0.07)] backdrop-blur-2xl sm:p-8">
          <div v-for="item in config.education" :key="item.school" class="grid gap-6 sm:grid-cols-[92px_1fr_auto] sm:items-center">
            <div class="flex h-[88px] w-[88px] items-center justify-center rounded-[22px] bg-white p-2 shadow-sm ring-1 ring-black/5">
              <img :src="item.logo" :alt="`${item.school} 校徽`" class="h-full w-full object-contain" />
            </div>
            <div>
              <h3 class="text-xl font-semibold">{{ item.school }}</h3>
              <p class="mt-2 text-black/56">{{ item.degree }}</p>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-black/50">{{ item.description }}</p>
            </div>
            <p class="text-sm text-black/42">{{ item.period }}</p>
          </div>
          <div class="mt-8 flex flex-wrap gap-3 border-t border-black/5 pt-7">
            <span v-for="certificate in config.certifications" :key="certificate" class="rounded-full bg-[#eff3f8] px-4 py-2 text-sm text-black/58">{{ certificate }}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" class="relative -mt-8 scroll-mt-32 rounded-t-[44px] border-t border-white/90 bg-[#f4f7fb] px-4 pb-28 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.04)] sm:px-6 md:rounded-t-[64px] md:pb-36 md:pt-28">
      <div class="mx-auto max-w-[1080px]">
        <SectionHeading index="04" eyebrow="Experience" title="工作经历" tone="blue">
          <template #meta>{{ config.workExperience.length }} 段经历</template>
        </SectionHeading>
        <div class="mt-9 space-y-5">
          <article v-for="experience in config.workExperience" :key="`${experience.company}-${experience.period}`" class="grid gap-7 rounded-[30px] border border-white/90 bg-white/70 p-6 shadow-[0_18px_48px_rgba(57,75,105,0.07)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[210px_1fr]">
            <div>
              <div class="flex min-h-[84px] items-center justify-center rounded-[20px] bg-white px-4 py-5 shadow-sm ring-1 ring-black/5">
                <img :src="experience.logo" :alt="`${experience.company} Logo`" class="max-h-12 w-full object-contain" />
              </div>
              <p class="mt-4 text-sm leading-6 text-black/42">{{ experience.period }}</p>
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-2xl font-semibold tracking-[-0.025em]">{{ experience.company }}</h3>
                <span v-if="experience.current" class="rounded-full bg-[#e8f0ff] px-3 py-1 text-xs font-medium text-[#1d4ed8]">在职</span>
              </div>
              <p class="mt-2 text-base text-black/52">{{ experience.title }}</p>
              <ul class="mt-6 space-y-3 text-[15px] leading-7 text-black/60">
                <li v-for="detail in experience.details" :key="detail" class="resume-bullet">{{ detail }}</li>
              </ul>
              <div class="mt-6 flex flex-wrap gap-2">
                <span v-for="tech in experience.technologies" :key="tech" class="rounded-full bg-[#eff3f8] px-3 py-1.5 text-xs text-black/52">{{ tech }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="projects" class="relative -mt-8 scroll-mt-32 rounded-t-[44px] border-t border-white/90 bg-[#edf3f9] px-4 pb-20 pt-20 shadow-[0_-12px_36px_rgba(55,70,92,0.05)] sm:px-6 md:rounded-t-[64px] md:pb-28 md:pt-28">
      <div class="mx-auto max-w-[1080px]">
        <SectionHeading index="05" eyebrow="Projects" title="项目经历" tone="blue">
          <template #meta>{{ config.projects.length }} 个项目</template>
        </SectionHeading>
        <div class="mt-9 grid gap-6">
          <article v-for="project in config.projects" :key="project.id" class="overflow-hidden rounded-[32px] border border-white/90 bg-white/70 p-5 shadow-[0_20px_55px_rgba(57,75,105,0.08)] backdrop-blur-2xl sm:p-8">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="flex items-start gap-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#e6efff] text-[#3166c7] ring-1 ring-white"><Icon :name="project.icon" class="h-7 w-7" /></div>
                <div><h3 class="text-2xl font-semibold tracking-[-0.025em]">{{ project.title }}</h3><p class="mt-2 text-sm text-black/45">{{ project.role }}</p></div>
              </div>
              <p class="shrink-0 text-sm text-black/42">{{ project.period }}</p>
            </div>
            <div class="mt-7 grid gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
              <div>
                <p class="leading-7 text-black/58">{{ project.summary }}</p>
                <ul class="mt-6 space-y-3 text-[15px] leading-7 text-black/58"><li v-for="achievement in project.achievements" :key="achievement" class="resume-bullet">{{ achievement }}</li></ul>
              </div>
              <figure class="min-h-[270px] overflow-hidden rounded-[24px] bg-[#f6f8fc] ring-1 ring-black/5"><img :src="project.visual" :alt="`${project.title} 项目视觉图`" class="h-full min-h-[270px] w-full object-cover" /></figure>
            </div>
            <div class="mt-7 grid grid-cols-3 overflow-hidden rounded-[20px] bg-[#eff3f8]">
              <div v-for="(metric, index) in project.metrics" :key="metric.label" class="px-3 py-4 text-center" :class="index ? 'border-l border-white' : ''"><p class="font-semibold text-[#3166c7]">{{ metric.value }}</p><p class="mt-1 text-[11px] text-black/42 sm:text-xs">{{ metric.label }}</p></div>
            </div>
            <div class="mt-7 flex flex-wrap gap-2 border-t border-black/5 pt-6"><span v-for="tech in project.technologies" :key="tech" class="rounded-full bg-[#eff3f8] px-3 py-1.5 text-xs text-black/55 ring-1 ring-white">{{ tech }}</span></div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import config from '~/data/profile.json'
</script>

<style scoped>
.resume-bullet { position: relative; padding-left: 1rem; }
.resume-bullet::before { position: absolute; left: 0; top: 0.72rem; width: 0.25rem; height: 0.25rem; border-radius: 9999px; background: rgb(17 17 20 / 0.35); content: ''; }
</style>
