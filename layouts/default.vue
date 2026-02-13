<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- 导航栏 -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
            Keaton
          </NuxtLink>
          
          <!-- 桌面端导航 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path"
              :to="item.path"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              :class="{ 'text-primary-600 dark:text-primary-400': $route.path === item.path }"
            >
              {{ item.name }}
            </NuxtLink>
            
            <!-- 暗黑模式切换 -->
            <button
              @click="toggleColorMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun-bold" class="w-5 h-5" />
              <Icon v-else name="ph:moon-bold" class="w-5 h-5" />
            </button>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <div class="flex items-center md:hidden space-x-2">
            <button
              @click="toggleColorMode"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              <Icon v-if="colorMode.value === 'dark'" name="ph:sun-bold" class="w-5 h-5" />
              <Icon v-else name="ph:moon-bold" class="w-5 h-5" />
            </button>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <Icon v-if="!mobileMenuOpen" name="ph:list-bold" class="w-6 h-6" />
              <Icon v-else name="ph:x-bold" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-show="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="px-4 py-3 space-y-2">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            :class="{ 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400': $route.path === item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- 主内容 -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-900 dark:bg-black text-white py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400">
          &copy; {{ new Date().getFullYear() }} Keaton. 专业的 Java 工程师 | 用心构建每一行代码
        </p>
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
  { name: '博客', path: '/blog' },
  { name: '关于我', path: '/about' }
]

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
