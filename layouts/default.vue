<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部蓝色导航条 -->
    <nav class="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white shadow-lg relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg border border-white/30 group-hover:bg-white/30 transition-all">
              K
            </div>
            <span class="text-xl font-bold text-white">Keaton</span>
          </NuxtLink>
          
          <!-- 桌面端导航 -->
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              :class="($route.path === item.path || (item.path !== '/' && $route.path.startsWith(item.path)))
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10'"
            >
              {{ item.name }}
            </NuxtLink>
            
            <!-- 暗黑模式切换 -->
            <button
              @click="toggleColorMode"
              class="ml-4 p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun-bold" class="w-5 h-5" />
              <Icon v-else name="ph:moon-bold" class="w-5 h-5" />
            </button>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="flex items-center md:hidden gap-2">
            <button
              @click="toggleColorMode"
              class="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun-bold" class="w-5 h-5" />
              <Icon v-else name="ph:moon-bold" class="w-5 h-5" />
            </button>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Icon v-if="!mobileMenuOpen" name="ph:list-bold" class="w-5 h-5" />
              <Icon v-else name="ph:x-bold" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <Transition name="slide-down">
        <div 
          v-show="mobileMenuOpen" 
          class="md:hidden bg-primary-700 border-t border-white/10"
        >
          <div class="max-w-7xl mx-auto px-4 py-2">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-lg font-medium transition-colors"
              :class="($route.path === item.path || (item.path !== '/' && $route.path.startsWith(item.path)))
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10'"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- 中间内容区域 - 淡蓝色渐变到接近白色 -->
    <main class="flex-1 relative">
      <!-- 背景渐变：从上到下，从淡蓝到白色 -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary-50 via-blue-50/50 to-white pointer-events-none"></div>
      
      <!-- 内容 -->
      <div class="relative">
        <slot />
      </div>
    </main>

    <!-- 底部 - 蓝白分隔效果 -->
    <footer class="relative">
      <!-- 波浪分隔线 -->
      <div class="absolute top-0 left-0 right-0 -translate-y-full overflow-hidden leading-none">
        <svg class="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.77,111.31,321.39,56.44Z" 
                class="fill-primary-600"></path>
        </svg>
      </div>
      
      <!-- 蓝色背景区域 -->
      <div class="bg-gradient-to-b from-primary-600 to-primary-700 text-white pt-8 pb-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <!-- 品牌信息 -->
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold border border-white/30">
                  K
                </div>
                <span class="text-xl font-bold">Keaton</span>
              </div>
              <p class="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                中级 Java 开发工程师，专注于微服务架构与系统性能优化。用代码创造价值，用技术改变世界。
              </p>
              <div class="flex gap-3">
                <a v-for="social in socials" :key="social.name" :href="social.link" target="_blank" 
                   class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110">
                  <Icon :name="social.icon" class="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <!-- 快速链接 -->
            <div>
              <h4 class="font-semibold text-white mb-4">快速链接</h4>
              <ul class="space-y-2">
                <li v-for="item in navItems" :key="item.path">
                  <NuxtLink :to="item.path" class="text-sm text-white/70 hover:text-white transition-colors">
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- 联系方式 -->
            <div>
              <h4 class="font-semibold text-white mb-4">联系方式</h4>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-sm text-white/70">
                  <Icon name="ph:envelope-bold" class="w-4 h-4" />
                  keaton@example.com
                </li>
                <li class="flex items-center gap-2 text-sm text-white/70">
                  <Icon name="ph:map-pin-bold" class="w-4 h-4" />
                  深圳，中国
                </li>
              </ul>
            </div>
          </div>
          
          <!-- 版权信息 -->
          <div class="pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-white/60">
              © {{ new Date().getFullYear() }} Keaton. All rights reserved.
            </p>
            <p class="text-sm text-white/60">
              Made with ❤️ using Nuxt 3
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '作品集', path: '/portfolio' },
  { name: '技术栈', path: '/skills' },
  { name: '博客', path: '/blog' },
  { name: '相册', path: '/gallery' },
  { name: '工具箱', path: '/tools' },
  { name: '关于我', path: '/about' }
]

const socials = [
  { name: 'GitHub', icon: 'ph:github-logo-bold', link: 'https://github.com' },
  { name: 'Email', icon: 'ph:envelope-bold', link: 'mailto:keaton@example.com' }
]

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
/* 移动端菜单动画 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
  opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
