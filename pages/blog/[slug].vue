<template>
  <div>
    <!-- 文章内容 -->
    <article class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- 返回按钮 -->
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
        >
          <Icon name="ph:arrow-left-bold" class="w-5 h-5 mr-2" />
          返回博客列表
        </NuxtLink>

        <!-- 文章头部 -->
        <header class="mb-12">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {{ post.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            <span class="flex items-center">
              <Icon name="ph:calendar-blank-bold" class="w-5 h-5 mr-2" />
              {{ formatDate(post.date) }}
            </span>
            <span class="flex items-center">
              <Icon name="ph:user-bold" class="w-5 h-5 mr-2" />
              {{ post.author || 'Keaton' }}
            </span>
            <div class="flex gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded-full text-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </header>

        <!-- 文章正文 -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
          <div class="p-8 md:p-12">
            <ContentDoc 
              :path="`/blog/${route.params.slug}`"
              class="prose dark:prose-invert prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 dark:prose-pre:bg-black"
            />
          </div>
        </div>

        <!-- 文章导航 -->
        <div class="mt-12 flex justify-between items-center">
          <NuxtLink 
            v-if="prevPost"
            :to="prevPost._path"
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon name="ph:arrow-left-bold" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">{{ prevPost.title }}</span>
            <span class="sm:hidden">上一篇</span>
          </NuxtLink>
          <div v-else></div>
          
          <NuxtLink 
            v-if="nextPost"
            :to="nextPost._path"
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-right"
          >
            <span class="hidden sm:inline">{{ nextPost.title }}</span>
            <span class="sm:hidden">下一篇</span>
            <Icon name="ph:arrow-right-bold" class="w-5 h-5 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()

// 获取当前文章
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('blog').where({ _path: `/blog/${route.params.slug}` }).findOne()
)

// 获取前后文章
const { data: surrounding } = await useAsyncData(`surrounding-${route.params.slug}`, () =>
  queryContent('blog').sort({ date: -1 }).findSurround(`/blog/${route.params.slug}`)
)

const prevPost = computed(() => surrounding.value?.[0] || null)
const nextPost = computed(() => surrounding.value?.[1] || null)

// 设置页面标题
useHead({
  title: `${post.value?.title || '文章'} - Keaton`,
  meta: [
    { name: 'description', content: post.value?.description || '' }
  ]
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style>
/* 代码块样式优化 */
.prose pre {
  @apply rounded-lg;
}

.prose code {
  @apply px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-sm;
}

.prose pre code {
  @apply bg-transparent p-0;
}

/* 图片样式 */
.prose img {
  @apply rounded-lg shadow-md;
}

/* 表格样式 */
.prose table {
  @apply w-full border-collapse;
}

.prose th,
.prose td {
  @apply border border-gray-200 dark:border-gray-700 px-4 py-2;
}

.prose th {
  @apply bg-gray-50 dark:bg-gray-800 font-semibold;
}
</style>
