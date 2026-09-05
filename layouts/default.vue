<template>
  <div class="min-h-screen bg-[#f5f5f7] text-[#111114]">
    <header class="sticky top-0 z-50 border-b border-white/70 bg-white/70 shadow-[0_1px_18px_rgba(15,23,42,0.06)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/58">
      <div class="mx-auto flex h-14 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <NuxtLink to="/" class="flex items-center gap-3" aria-label="返回首页">
          <img :src="config.site.logo" alt="Keaton Logo" class="h-8 w-8 rounded-[10px] object-cover shadow-[0_7px_18px_rgba(29,78,216,0.22)]" />
          <span class="text-[15px] font-semibold tracking-[-0.015em]">{{ config.site.name }}</span>
        </NuxtLink>

        <nav class="hidden items-center gap-2 rounded-full border border-white/80 bg-white/42 p-1 shadow-[0_8px_24px_rgba(43,61,91,0.05)] backdrop-blur-2xl md:flex" aria-label="主导航">
          <NuxtLink
            v-for="item in config.site.navigation"
            :key="item.path"
            :to="item.path"
            class="nav-link relative isolate overflow-hidden rounded-full px-4 py-2 text-[13px] font-medium text-black/52 transition-colors duration-300 hover:text-black/80"
            :class="isActive(item.path) ? 'nav-link--active text-[#1749b8]' : ''"
          >
            <span class="relative z-10">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <button
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-black/70 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white md:hidden"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-label="打开导航菜单"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon :name="mobileMenuOpen ? 'ph:x' : 'ph:list'" class="h-5 w-5" />
        </button>
      </div>

      <Transition name="menu-fade">
        <nav v-if="mobileMenuOpen" class="border-t border-white/80 bg-white/82 px-5 py-3 backdrop-blur-2xl md:hidden" aria-label="移动端导航">
          <NuxtLink
            v-for="item in config.site.navigation"
            :key="item.path"
            :to="item.path"
            class="block border-b border-black/5 py-3.5 text-base font-medium last:border-0"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </Transition>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-black/5 bg-white/55 backdrop-blur-xl">
      <div class="mx-auto flex max-w-[1180px] flex-col gap-5 px-5 py-10 text-sm text-black/55 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="font-semibold text-black">{{ config.profile.name }}</p>
          <p class="mt-2 max-w-md leading-6">{{ config.profile.title }}，现就职于{{ config.profile.currentCompany }}。</p>
        </div>
        <div class="md:text-right">
          <a :href="`mailto:${config.profile.email}`" class="transition-colors hover:text-[#1d4ed8]">{{ config.profile.email }}</a>
          <p class="mt-2">© {{ new Date().getFullYear() }} {{ config.profile.name }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import config from '~/data/profile.json'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const isActive = (path) => {
  if (path === '/') return route.path === '/' && !route.hash
  if (path.startsWith('/#')) return isMounted.value && route.path === '/' && route.hash === path.slice(1)
  return route.path.startsWith(path)
}
</script>

<style scoped>
.nav-link::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  border: 1px solid rgb(255 255 255 / 90%);
  border-radius: 9999px;
  background: linear-gradient(145deg, rgb(255 255 255 / 92%), rgb(229 238 252 / 78%));
  box-shadow: 0 7px 18px rgb(42 77 137 / 12%), inset 0 1px 0 rgb(255 255 255 / 95%);
  content: '';
  opacity: 0;
  transform: scale(0.78);
  transition: opacity 220ms ease, transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-link--active::before {
  opacity: 1;
  transform: scale(1);
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
