<template>
  <div>
    <!-- 页面标题 -->
    <section class="bg-gradient-to-br from-primary-600 to-purple-700 dark:from-primary-800 dark:to-purple-900 text-white py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">技术博客</h1>
        <p class="text-xl text-gray-200">分享技术心得，记录成长足迹</p>
      </div>
    </section>

    <!-- 博客列表 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 统计信息 -->
        <div class="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ posts.length }}</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">文章</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ allTags.length }}</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">标签</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">{{ totalWords }}</div>
            <div class="text-gray-500 dark:text-gray-400 text-sm mt-1">字数</div>
          </div>
        </div>

        <!-- 标签筛选 -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button
            @click="selectedTag = null"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="selectedTag === null ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            全部
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = tag"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="selectedTag === tag ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            {{ tag }}
          </button>
        </div>

        <!-- 文章网格 -->
        <div v-if="filteredPosts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in filteredPosts" 
            :key="post._path"
            class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
            @click="navigateTo(post._path)"
          >
            <div class="p-6">
              <!-- 元信息 -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(post.date) }}
                </span>
                <div class="flex gap-2">
                  <span 
                    v-for="tag in post.tags?.slice(0, 2)" 
                    :key="tag"
                    class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- 标题和摘要 -->
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {{ post.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {{ post.description || post.excerpt }}
              </p>
              
              <!-- 阅读更多 -->
              <div class="flex items-center text-primary-600 dark:text-primary-400 font-medium">
                <span>阅读文章</span>
                <Icon name="ph:arrow-right-bold" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="text-center py-16">
          <Icon name="ph:file-text-bold" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p class="text-gray-500 dark:text-gray-400">暂无文章</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '技术博客 - Keaton',
  meta: [
    { name: 'description', content: '分享技术心得，记录成长足迹。探索 Java、Spring Boot、微服务架构等技术话题。' }
  ]
})

const selectedTag = ref(null)

// 获取所有文章
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent('blog').sort({ date: -1 }).find()
)

// 获取所有标签
const allTags = computed(() => {
  const tags = new Set()
  posts.value?.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

// 筛选文章
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value || []
  return posts.value?.filter(post => post.tags?.includes(selectedTag.value)) || []
})

// 计算总字数
const totalWords = computed(() => {
  return posts.value?.reduce((total, post) => {
    const content = post.body?.value || post.description || ''
    return total + content.length
  }, 0) || 0
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
