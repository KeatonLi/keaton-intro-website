<template>
  <div>
    <!-- 页面标题 -->
    <section class="bg-gradient-to-br from-primary-600 to-purple-700 dark:from-primary-800 dark:to-purple-900 text-white py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">作品集</h1>
        <p class="text-xl text-gray-200">这里展示了我参与开发的一些项目和技术成果</p>
      </div>
    </section>

    <!-- 项目展示 -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技术项目</h2>
          <p class="text-gray-600 dark:text-gray-400">参与开发的核心项目</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.title" class="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
            <div :class="project.gradient" class="h-48 flex items-center justify-center text-6xl">
              {{ project.icon }}
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tech in project.technologies" :key="tech" class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded text-sm">
                  {{ tech }}
                </span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">核心功能：</h4>
                <ul class="space-y-1">
                  <li v-for="feature in project.features" :key="feature" class="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                    <span class="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作瞬间 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">工作瞬间</h2>
          <p class="text-gray-600 dark:text-gray-400">记录工作和生活中的精彩瞬间</p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, index) in gallery" :key="index" class="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
            <div :class="item.gradient" class="absolute inset-0 flex items-center justify-center text-6xl transition-transform group-hover:scale-110">
              {{ item.icon }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <div>
                <h3 class="text-xl font-bold text-white mb-1">{{ item.title }}</h3>
                <p class="text-gray-200 text-sm">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术成就时间线 -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技术成就</h2>
          <p class="text-gray-600 dark:text-gray-400">在技术道路上的重要里程碑</p>
        </div>
        
        <div class="relative">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>
          <div class="space-y-8">
            <div v-for="achievement in achievements" :key="achievement.title" class="relative flex items-start gap-6">
              <div class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-3xl z-10 flex-shrink-0 border-4 border-white dark:border-gray-800">
                {{ achievement.icon }}
              </div>
              <div class="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ achievement.title }}</h3>
                  <span class="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded text-sm">{{ achievement.date }}</span>
                </div>
                <p class="text-gray-600 dark:text-gray-300">{{ achievement.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开源贡献 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">开源贡献</h2>
          <p class="text-gray-600 dark:text-gray-400">参与的开源项目和技术分享</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">🔧 工具库开发</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">开发了多个实用的 Java 工具库，简化日常开发工作，提高代码复用性。</p>
            <ul class="space-y-2">
              <li v-for="item in ['通用数据校验工具', 'Redis 缓存封装库', 'API 文档生成工具']" :key="item" class="text-gray-600 dark:text-gray-400 flex items-center">
                <Icon name="ph:check-circle-bold" class="w-5 h-5 text-primary-500 mr-2" />
                {{ item }}
              </li>
            </ul>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <h3 class="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">📝 技术博客</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">定期分享技术心得和项目经验，帮助其他开发者解决实际问题。</p>
            <ul class="space-y-2">
              <li v-for="item in ['Spring Boot 最佳实践', '微服务架构设计', '性能优化技巧']" :key="item" class="text-gray-600 dark:text-gray-400 flex items-center">
                <Icon name="ph:check-circle-bold" class="w-5 h-5 text-primary-500 mr-2" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '作品集 - Keaton',
  meta: [
    { name: 'description', content: '查看 Keaton 的技术项目、作品展示和技术成就。' }
  ]
})

const projects = [
  {
    title: '企业管理系统',
    description: '基于 Spring Boot 开发的企业级管理系统，支持用户管理、权限控制、数据统计等功能。',
    icon: '🏢',
    gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
    technologies: ['Spring Boot', 'MySQL', 'Vue.js'],
    features: ['用户权限管理', '数据报表生成', '实时消息通知', '系统监控面板']
  },
  {
    title: '电商平台后端',
    description: '高并发电商平台后端服务，采用微服务架构，支持订单处理、支付集成、库存管理。',
    icon: '🛒',
    gradient: 'bg-gradient-to-br from-pink-400 to-red-500',
    technologies: ['Spring Cloud', 'Redis', 'RabbitMQ'],
    features: ['分布式事务处理', '高并发秒杀系统', '智能推荐算法', '实时数据同步']
  },
  {
    title: '微服务架构',
    description: '基于 Spring Cloud 的微服务架构，实现服务治理、配置管理、链路追踪等功能。',
    icon: '🌐',
    gradient: 'bg-gradient-to-br from-green-400 to-teal-500',
    technologies: ['Spring Cloud', 'Nacos', 'Gateway'],
    features: ['服务注册与发现', '配置中心管理', 'API网关路由', '分布式链路追踪']
  }
]

const gallery = [
  { icon: '💻', title: '编程时光', description: '专注于代码开发，享受解决问题的乐趣', gradient: 'bg-gradient-to-br from-indigo-400 to-purple-500' },
  { icon: '🎯', title: '技术分享', description: '参与技术会议，分享开发经验和最佳实践', gradient: 'bg-gradient-to-br from-pink-400 to-rose-500' },
  { icon: '🌟', title: '项目成果', description: '成功交付的项目，见证技术成长的足迹', gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
  { icon: '📚', title: '学习笔记', description: '持续学习新技术，记录知识积累的过程', gradient: 'bg-gradient-to-br from-green-400 to-emerald-500' },
  { icon: '🤝', title: '团队协作', description: '与优秀的团队成员一起工作，共同成长', gradient: 'bg-gradient-to-br from-orange-400 to-amber-500' },
  { icon: '🚀', title: '技术探索', description: '探索前沿技术，保持对新事物的好奇心', gradient: 'bg-gradient-to-br from-violet-400 to-fuchsia-500' }
]

const achievements = [
  { icon: '🏆', title: '架构师认证', date: '2023年', description: '获得 Java 架构师认证，具备大型系统设计能力' },
  { icon: '🎖️', title: '技术团队负责人', date: '2022年', description: '担任技术团队负责人，带领团队完成多个重要项目' },
  { icon: '📈', title: '性能优化专家', date: '2021年', description: '成功优化系统性能，响应时间提升 300%' },
  { icon: '🌐', title: '微服务架构实践', date: '2020年', description: '主导公司微服务架构转型，提升系统可扩展性' }
]
</script>
