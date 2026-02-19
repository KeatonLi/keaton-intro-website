<template>
  <div>
    <!-- 阅读进度条 -->
    <div class="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-200">
      <div 
        class="h-full bg-gradient-to-r from-primary-500 to-cyan-500 transition-all duration-150"
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <!-- 文章头部背景 -->
    <section class="relative bg-gradient-to-br from-primary-500 to-cyan-600 pt-24 pb-16 overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 返回按钮 -->
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
        >
          <Icon name="ph:arrow-left-bold" class="w-5 h-5 mr-2" />
          返回博客列表
        </NuxtLink>

        <!-- 文章标题区 -->
        <div class="text-center">
          <!-- 封面图标 -->
          <div class="text-8xl mb-6">{{ post.cover }}</div>
          
          <!-- 系列标签 -->
          <div class="mb-4">
            <span class="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
              {{ post.series }}
            </span>
          </div>
          
          <!-- 标题 -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {{ post.title }}
          </h1>
          
          <!-- 元信息 -->
          <div class="flex flex-wrap items-center justify-center gap-6 text-white/80">
            <span class="flex items-center">
              <Icon name="ph:calendar-blank-bold" class="w-5 h-5 mr-2" />
              {{ formatDate(post.date) }}
            </span>
            <span class="flex items-center">
              <Icon name="ph:user-bold" class="w-5 h-5 mr-2" />
              {{ post.author || 'Keaton' }}
            </span>
            <span class="flex items-center">
              <Icon name="ph:clock-bold" class="w-5 h-5 mr-2" />
              {{ post.readingTime }}分钟阅读
            </span>
          </div>
          
          <!-- 标签 -->
          <div class="flex flex-wrap justify-center gap-2 mt-6">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 文章内容区 -->
    <article class="min-h-screen pb-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <!-- 文章卡片 -->
        <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
          <!-- 目录（桌面端侧边显示，移动端顶部显示） -->
          <div v-if="toc.length > 0" class="border-b border-gray-100 p-6 lg:p-8 bg-gray-50/50">
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <Icon name="ph:list-dashes-bold" class="w-4 h-4 mr-2" />
              文章目录
            </h3>
            <nav class="flex flex-wrap gap-2">
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                @click.prevent="scrollToSection(item.id)"
                class="text-sm px-3 py-1.5 rounded-full transition-colors"
                :class="activeSection === item.id ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'"
                :style="{ marginLeft: `${(item.depth - 2) * 12}px` }"
              >
                {{ item.text }}
              </a>
            </nav>
          </div>

          <!-- 正文内容 -->
          <div class="p-6 lg:p-12">
            <ContentDoc 
              :path="`/blog/${route.params.slug}`"
              class="prose prose-lg max-w-none 
                prose-headings:text-gray-900 
                prose-headings:font-bold
                prose-p:text-gray-700 
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-code:text-pink-600 prose-code:font-mono prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:rounded-xl
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
            />
          </div>

          <!-- 文章底部操作区 -->
          <div class="px-6 lg:px-12 py-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500">分享文章：</span>
              <button 
                @click="shareArticle('twitter')"
                class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
              >
                <Icon name="ph:twitter-logo-bold" class="w-5 h-5" />
              </button>
              <button 
                @click="shareArticle('copy')"
                class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
              >
                <Icon name="ph:link-bold" class="w-5 h-5" />
              </button>
            </div>
            <div class="text-sm text-gray-500">
              最后更新：{{ formatDate(post.date) }}
            </div>
          </div>
        </div>

        <!-- 作者卡片 -->
        <div class="mt-8 bg-gradient-to-r from-primary-500 to-cyan-600 rounded-2xl p-8 text-white">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">
              👨‍💻
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">关于作者</h3>
              <p class="text-white/90 mb-4">
                我是 Keaton，一名热爱技术的 Java 工程师。如果你喜欢这篇文章，欢迎关注我的更多内容。
              </p>
              <div class="flex gap-4">
                <NuxtLink to="/about" class="text-sm text-white/80 hover:text-white underline">
                  了解更多
                </NuxtLink>
                <NuxtLink to="/portfolio" class="text-sm text-white/80 hover:text-white underline">
                  查看作品
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 同系列文章 -->
        <div v-if="sameSeriesPosts.length > 0" class="mt-12">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Icon name="ph:books-bold" class="w-5 h-5 text-primary-600 mr-2" />
            同系列文章
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="article in sameSeriesPosts"
              :key="article._path"
              :to="article._path"
              class="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-cyan-500 flex items-center justify-center text-2xl flex-shrink-0">
                {{ article.cover }}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                  {{ article.title }}
                </h4>
                <span class="text-sm text-gray-500">{{ article.readingTime }}分钟阅读</span>
              </div>
              <Icon name="ph:arrow-right-bold" class="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </NuxtLink>
          </div>
        </div>

        <!-- 相关文章推荐 -->
        <div v-if="relatedPosts.length > 0" class="mt-12">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Icon name="ph:thumbs-up-bold" class="w-5 h-5 text-primary-600 mr-2" />
            相关推荐
          </h3>
          <div class="grid md:grid-cols-2 gap-4">
            <NuxtLink
              v-for="article in relatedPosts"
              :key="article._path"
              :to="article._path"
              class="group flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-primary-500 flex items-center justify-center text-2xl flex-shrink-0">
                {{ article.cover }}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                  {{ article.title }}
                </h4>
                <span class="text-sm text-gray-500">{{ article.series }}</span>
              </div>
              <Icon name="ph:arrow-right-bold" class="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
            </NuxtLink>
          </div>
        </div>

        <!-- 文章导航 -->
        <div class="mt-12 flex flex-col sm:flex-row justify-between items-stretch gap-4">
          <NuxtLink
            v-if="prevPost"
            :to="prevPost._path"
            class="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group flex-1"
          >
            <Icon name="ph:arrow-left-bold" class="w-5 h-5 text-gray-400 group-hover:text-primary-600 mr-4 flex-shrink-0" />
            <div class="min-w-0">
              <span class="text-sm text-gray-500 block mb-1">上一篇</span>
              <span class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                {{ prevPost.title }}
              </span>
            </div>
          </NuxtLink>
          <div v-else class="flex-1"></div>
          
          <NuxtLink
            v-if="nextPost"
            :to="nextPost._path"
            class="flex items-center justify-end p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group flex-1 text-right"
          >
            <div class="min-w-0">
              <span class="text-sm text-gray-500 block mb-1">下一篇</span>
              <span class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                {{ nextPost.title }}
              </span>
            </div>
            <Icon name="ph:arrow-right-bold" class="w-5 h-5 text-gray-400 group-hover:text-primary-600 ml-4 flex-shrink-0" />
          </NuxtLink>
        </div>
      </div>
    </article>

    <!-- 复制成功提示 -->
    <div
      v-if="showCopyToast"
      class="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg z-50 flex items-center gap-2"
    >
      <Icon name="ph:check-circle-bold" class="w-5 h-5 text-green-400" />
      链接已复制到剪贴板
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const readingProgress = ref(0)
const toc = ref([])
const activeSection = ref('')
const showCopyToast = ref(false)

// 获取当前文章
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('blog').where({ _path: `/blog/${route.params.slug}` }).findOne()
)

// 设置页面标题
useHead({
  title: `${post.value?.title || '文章'} - Keaton`,
  meta: [
    { name: 'description', content: post.value?.description || post.value?.excerpt || '' }
  ]
})

// 获取前后文章
const { data: surrounding } = await useAsyncData(`surrounding-${route.params.slug}`, () =>
  queryContent('blog').sort({ date: -1 }).findSurround(`/blog/${route.params.slug}`)
)

const prevPost = computed(() => surrounding.value?.[0] || null)
const nextPost = computed(() => surrounding.value?.[1] || null)

// 获取同系列文章
const { data: sameSeriesPosts } = await useAsyncData(`series-${route.params.slug}`, async () => {
  if (!post.value?.series) return []
  return await queryContent('blog')
    .where({ series: post.value.series, _path: { $ne: `/blog/${route.params.slug}` } })
    .limit(2)
    .find()
})

// 获取相关文章（基于标签）
const { data: relatedPosts } = await useAsyncData(`related-${route.params.slug}`, async () => {
  if (!post.value?.tags) return []
  const posts = await queryContent('blog')
    .where({ 
      _path: { $ne: `/blog/${route.params.slug}` },
      series: { $ne: post.value.series }
    })
    .limit(2)
    .find()
  // 基于共同标签排序
  return posts.filter(p => 
    p.tags?.some(tag => post.value.tags.includes(tag))
  ).slice(0, 2)
})

// 计算阅读进度
const calculateReadingProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = (scrollTop / docHeight) * 100
}

// 生成目录
const generateToc = () => {
  const headings = document.querySelectorAll('h2, h3')
  toc.value = Array.from(headings).map((heading, index) => ({
    id: heading.id || `heading-${index}`,
    text: heading.textContent,
    depth: parseInt(heading.tagName.charAt(1))
  }))
  
  // 为没有 id 的标题添加 id
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`
    }
  })
}

// 监听滚动，更新当前章节
const updateActiveSection = () => {
  const headings = document.querySelectorAll('h2, h3')
  let current = ''
  
  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 150) {
      current = heading.id
    }
  })
  
  activeSection.value = current
}

// 滚动到指定章节
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 分享文章
const shareArticle = (platform) => {
  const url = window.location.href
  const title = post.value?.title
  
  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(url)
    showCopyToast.value = true
    setTimeout(() => showCopyToast.value = false, 3000)
  }
}

// 日期格式化
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', () => {
    calculateReadingProgress()
    updateActiveSection()
  })
  
  // 延迟生成目录，确保内容已渲染
  setTimeout(generateToc, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateReadingProgress)
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style>
/* 代码块样式优化 */
.prose pre {
  @apply rounded-xl my-6;
}

.prose code {
  @apply px-1.5 py-0.5 bg-gray-100 rounded text-sm;
}

.prose pre code {
  @apply bg-transparent p-0;
}

/* 图片样式 */
.prose img {
  @apply rounded-xl shadow-lg my-8;
}

/* 表格样式 */
.prose table {
  @apply w-full border-collapse my-6;
}

.prose th,
.prose td {
  @apply border border-gray-200 px-4 py-3;
}

.prose th {
  @apply bg-gray-50 font-semibold text-left;
}

.prose tr:nth-child(even) {
  @apply bg-gray-50/50;
}

/* 列表样式 */
.prose ul > li {
  @apply marker:text-primary-500;
}

.prose ol > li {
  @apply marker:text-primary-500 marker:font-semibold;
}

/* 标题锚点 */
.prose h2,
.prose h3 {
  @apply scroll-mt-24;
}
</style>
