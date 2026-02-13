<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="text-center">
      <div class="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">{{ error?.statusCode || 404 }}</div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ error?.statusCode === 404 ? '页面未找到' : '出错了' }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ error?.statusCode === 404 ? '您访问的页面不存在或已被移除。' : '抱歉，发生了一些错误。' }}
      </p>
      <NuxtLink 
        to="/"
        class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-colors"
      >
        <Icon name="ph:house-bold" class="w-5 h-5 mr-2" />
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

// 清除错误状态
const handleError = () => clearError({ redirect: '/' })
</script>
