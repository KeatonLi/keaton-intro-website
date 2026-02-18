<template>
  <div class="min-h-screen bg-surface-50 dark:bg-surface-950 relative">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- 网格背景 -->
      <div class="absolute inset-0 grid-pattern opacity-50"></div>
      
      <!-- 渐变光球 -->
      <div class="blur-blob w-96 h-96 bg-primary-400/20 -top-48 -right-48 animate-float"></div>
      <div class="blur-blob w-64 h-64 bg-primary-300/20 top-1/3 -left-32 animate-float delay-1000"></div>
      <div class="blur-blob w-80 h-80 bg-primary-500/10 bottom-0 right-1/4 animate-float delay-2000"></div>
    </div>

    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'py-4': !scrolled, 'py-2': scrolled }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          class="flex justify-between items-center h-16 px-6 rounded-2xl transition-all duration-300"
          :class="scrolled ? 'glass shadow-lg' : 'bg-transparent'"
        >
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-glow group-hover:shadow-glow-lg transition-shadow">
              K
            </div>
            <span class="text-xl font-bold gradient-text">Keaton</span>
          </NuxtLink>
          
          <!-- 桌面端导航 -->
          <div class="hidden md:flex items-center gap-2">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group"
              :class="$route.path === item.path ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
            >
              {{ item.name }}
              <span 
                v-if="$route.path === item.path"
                class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"
              ></span>
            </NuxtLink>
            
            <!-- 暗黑模式切换 -->
            <button
              @click="toggleColorMode"
              class="ml-4 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
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
              class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun-bold" class="w-5 h-5" />
              <Icon v-else name="ph:moon-bold" class="w-5 h-5" />
            </button>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <Icon v-if="!mobileMenuOpen" name="ph:list-bold" class="w-5 h-5" />
              <Icon v-else name="ph:x-bold" class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <!-- 移动端菜单 -->
        <div 
          v-show="mobileMenuOpen" 
          class="md:hidden mt-2 glass rounded-2xl overflow-hidden animate-fade-in-down"
        >
          <div class="p-2 space-y-1">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-xl font-medium transition-colors"
              :class="$route.path === item.path ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容 -->
    <main class="relative pt-24">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="relative mt-20">
      <!-- 渐变分隔线 -->
      <div class="line-gradient mb-12"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid md:grid-cols-4 gap-8 mb-12">
          <!-- 品牌信息 -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold">
                K
              </div>
              <span class="text-xl font-bold gradient-text">Keaton</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
              中级 Java 开发工程师，专注于微服务架构与系统性能优化。用代码创造价值，用技术改变世界。
            </p>
            <div class="flex gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.link" target="_blank" class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110">
                <Icon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <!-- 快速链接 -->
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">快速链接</h4>
            <ul class="space-y-2">
              <li v-for="item in navItems" :key="item.path">
                <NuxtLink :to="item.path" class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <!-- 联系方式 -->
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">联系方式</h4>
            <ul class="space-y-2">
              <li class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="ph:envelope-bold" class="w-4 h-4" />
                keaton@example.com
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon name="ph:map-pin-bold" class="w-4 h-4" />
                深圳，中国
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 版权信息 -->
        <div class="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Keaton. All rights reserved.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Made with ❤️ using Nuxt 3
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '作品集', path: '/portfolio' },
  { name: '技术栈', path: '/skills' },
  { name: '博客', path: '/blog' },
  { name: '关于我', path: '/about' }
]

const socials = [
  { name: 'GitHub', icon: 'ph:github-logo-bold', link: 'https://github.com' },
  { name: 'Email', icon: 'ph:envelope-bold', link: 'mailto:keaton@example.com' }
]

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// 监听滚动
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
/* Layout styles */
</style>
