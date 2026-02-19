<template>
  <div>
    <!-- 页面标题 -->
    <section class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">技术博客</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="text-primary-600">我的技术分享</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          在这里记录我的技术成长，分享开发经验与学习心得
        </p>
        
        <!-- 平台统计 -->
        <div class="flex flex-wrap justify-center gap-4">
          <div class="bg-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-md border border-gray-100">
            <Icon name="ph:article-bold" class="w-5 h-5 text-primary-500" />
            <span class="text-sm text-gray-600">累计发布 <strong class="text-gray-900">50+</strong> 篇文章</span>
          </div>
          <div class="bg-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-md border border-gray-100">
            <Icon name="ph:users-bold" class="w-5 h-5 text-cyan-500" />
            <span class="text-sm text-gray-600">累计阅读 <strong class="text-gray-900">10万+</strong> 次</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 博客平台 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            选择平台阅读
          </h2>
          <p class="text-gray-600">
            我的文章发布在以下平台，点击即可跳转阅读
          </p>
        </div>

        <!-- 平台卡片网格 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <a 
            v-for="(platform, index) in platforms" 
            :key="index"
            :href="platform.url"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all group relative overflow-hidden"
          >
            <!-- 背景渐变 -->
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" :class="platform.gradient"></div>
            
            <div class="relative">
              <!-- 平台图标和名称 -->
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" :class="platform.iconBg">
                  {{ platform.icon }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{ platform.name }}</h3>
                  <p class="text-sm text-gray-500">{{ platform.desc }}</p>
                </div>
              </div>

              <!-- 文章数量 -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-500">文章数量</span>
                <span class="text-2xl font-bold text-primary-600">{{ platform.count }}</span>
              </div>

              <!-- 特色标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in platform.tags" :key="tag" class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {{ tag }}
                </span>
              </div>

              <!-- 跳转按钮 -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-primary-600 font-medium">点击访问</span>
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <Icon name="ph:arrow-right-bold" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </a>
        </div>

        <!-- 推荐文章 -->
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Icon name="ph:star-bold" class="w-6 h-6 text-yellow-500" />
            热门文章推荐
          </h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <a 
              v-for="(article, index) in featuredArticles" 
              :key="index"
              :href="article.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" :class="article.iconBg">
                {{ article.icon }}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1 mb-1">
                  {{ article.title }}
                </h4>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <span>{{ article.platform }}</span>
                  <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{{ article.views }} 阅读</span>
                </div>
              </div>
              <Icon name="ph:arrow-up-right-bold" class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>

        <!-- 文章分类 -->
        <div class="mt-12">
          <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">
            文章分类
          </h3>
          
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              v-for="category in categories" 
              :key="category.name"
              @click="selectedCategory = category.name"
              class="px-6 py-3 rounded-xl font-medium transition-all"
              :class="selectedCategory === category.name ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-white text-gray-700 shadow-md border border-gray-200 hover:border-primary-300'"
            >
              <span class="mr-2">{{ category.icon }}</span>
              {{ category.name }}
              <span class="ml-2 text-xs opacity-80">({{ category.count }})</span>
            </button>
          </div>

          <!-- 分类描述 -->
          <div class="mt-8 text-center">
            <p class="text-gray-600">
              {{ categories.find(c => c.name === selectedCategory)?.desc }}
            </p>
          </div>
        </div>

        <!-- RSS 订阅提示 -->
        <div class="mt-12 bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
              📡
            </div>
            <div>
              <h4 class="font-bold text-gray-900">订阅更新</h4>
              <p class="text-sm text-gray-500">通过 RSS 或邮件订阅我的最新文章</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors">
              RSS 订阅
            </button>
            <button class="px-4 py-2 rounded-xl bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:border-primary-300 transition-colors">
              邮件订阅
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '技术博客 - Keaton',
  meta: [
    { name: 'description', content: 'Keaton 的技术博客，分享 Java、微服务架构、性能优化等技术文章。' }
  ]
})

const selectedCategory = ref('全部')

const platforms = [
  {
    name: '掘金',
    icon: '📚',
    iconBg: 'bg-blue-500/20 text-blue-600',
    desc: '优质技术社区',
    url: 'https://juejin.cn',
    count: '20+',
    tags: ['技术文章', '前端', '后端'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'CSDN',
    icon: '💻',
    iconBg: 'bg-red-500/20 text-red-600',
    desc: '专业技术博客',
    url: 'https://blog.csdn.net',
    count: '15+',
    tags: ['Java', 'Spring', '数据库'],
    gradient: 'from-red-500 to-orange-500'
  },
  {
    name: '知乎',
    icon: '❓',
    iconBg: 'bg-blue-600/20 text-blue-700',
    desc: '知识分享平台',
    url: 'https://zhuanlan.zhihu.com',
    count: '10+',
    tags: ['技术问答', '行业思考'],
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    name: 'GitHub',
    icon: '🐙',
    iconBg: 'bg-gray-800/20 text-gray-800',
    desc: '代码与技术文档',
    url: 'https://github.com',
    count: '5+',
    tags: ['开源项目', '技术文档'],
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    name: '公众号',
    icon: '💬',
    iconBg: 'bg-green-500/20 text-green-600',
    desc: '微信公众号',
    url: '#',
    count: '8+',
    tags: ['深度文章', '技术分享'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: '个人笔记',
    icon: '📝',
    iconBg: 'bg-purple-500/20 text-purple-600',
    desc: 'Notion/Obsidian',
    url: '#',
    count: '30+',
    tags: ['学习笔记', '技术总结'],
    gradient: 'from-purple-500 to-pink-500'
  }
]

const featuredArticles = [
  {
    title: 'Spring Boot 微服务性能优化实战：接口响应时间降低 73%',
    platform: '掘金',
    views: '5.2k',
    icon: '⚡',
    iconBg: 'bg-yellow-100',
    url: 'https://juejin.cn'
  },
  {
    title: '亿级数据检索优化：Elasticsearch 在工程造价平台的实践',
    platform: 'CSDN',
    views: '3.8k',
    icon: '🔍',
    iconBg: 'bg-blue-100',
    url: 'https://blog.csdn.net'
  },
  {
    title: 'MongoDB 高频告警解决之路：从分析到 ClickHouse 迁移',
    platform: '掘金',
    views: '2.9k',
    icon: '🗄️',
    iconBg: 'bg-green-100',
    url: 'https://juejin.cn'
  },
  {
    title: '消息队列幂等性设计：基于 Redis 的消息去重方案',
    platform: '知乎',
    views: '2.1k',
    icon: '📨',
    iconBg: 'bg-purple-100',
    url: 'https://zhuanlan.zhihu.com'
  }
]

const categories = [
  { name: '全部', icon: '📁', count: 50, desc: '查看所有技术文章' },
  { name: 'Java', icon: '☕', count: 20, desc: 'Java 核心技术、JVM、并发编程' },
  { name: '微服务', icon: '🏗️', count: 12, desc: 'Spring Cloud、服务治理、分布式架构' },
  { name: '数据库', icon: '🗄️', count: 10, desc: 'MySQL、Redis、ClickHouse、MongoDB' },
  { name: '性能优化', icon: '⚡', count: 8, desc: '系统性能调优、SQL 优化、缓存设计' }
]
</script>

<style scoped>
/* Component styles */
</style>
