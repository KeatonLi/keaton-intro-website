<template>
  <div>
    <!-- 页面标题 -->
    <section class="bg-gradient-to-br from-primary-600 to-purple-700 dark:from-primary-800 dark:to-purple-900 text-white py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">关于我</h1>
        <p class="text-xl text-gray-200">专业的 Java 工程师，拥有丰富的后端开发经验</p>
      </div>
    </section>

    <!-- 技能和经验 -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- 技术专长 -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">🚀 技术专长</h3>
            <ul class="space-y-4">
              <li v-for="skill in ['Java 企业级应用开发', 'Spring Boot / Spring Cloud', '微服务架构设计', '数据库设计与优化', '前端技术 (Vue.js, React)']" :key="skill" class="flex items-center text-gray-700 dark:text-gray-300">
                <Icon name="ph:check-circle-bold" class="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                {{ skill }}
              </li>
            </ul>
          </div>
          
          <!-- 工作经验 -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">💼 工作经验</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">作为一名经验丰富的 Java 工程师，我专注于：</p>
            <ul class="space-y-4">
              <li v-for="item in ['高并发系统架构设计', '代码质量与性能优化', '团队协作与技术分享', '持续学习新技术']" :key="item" class="flex items-center text-gray-700 dark:text-gray-300">
                <Icon name="ph:check-circle-bold" class="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 我的故事 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">我的故事</h2>
        </div>
        
        <div class="space-y-8">
          <div v-for="(story, index) in stories" :key="index" class="flex gap-6 items-start">
            <div class="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-3xl flex-shrink-0">
              {{ story.icon }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ story.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ story.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能评估 -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技能评估</h2>
          <p class="text-gray-600 dark:text-gray-400">基于项目经验和实际应用的技能水平</p>
        </div>
        
        <div class="grid sm:grid-cols-2 gap-6">
          <div v-for="skill in skills" :key="skill.name" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <div class="flex justify-between items-center mb-3">
              <span class="font-semibold text-gray-900 dark:text-white">{{ skill.name }}</span>
              <span class="text-primary-600 dark:text-primary-400 font-bold">{{ skill.level }}%</span>
            </div>
            <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">联系我</h2>
          <p class="text-gray-600 dark:text-gray-400">欢迎与我交流技术话题或合作机会</p>
        </div>
        
        <div class="grid sm:grid-cols-3 gap-6">
          <a 
            v-for="contact in contacts" 
            :key="contact.name"
            :href="contact.link"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              {{ contact.icon }}
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-1">{{ contact.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ contact.value }}</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '关于我 - Keaton',
  meta: [
    { name: 'description', content: '了解 Keaton 的技术背景、工作经历和联系方式。' }
  ]
})

const stories = [
  {
    icon: '🎓',
    title: '学习之路',
    content: '从计算机科学专业毕业后，我就被编程的魅力深深吸引。Java 作为我的第一门编程语言，让我领略到了面向对象编程的优雅和强大。通过不断的学习和实践，我逐渐掌握了从基础语法到高级特性的各个方面。'
  },
  {
    icon: '💻',
    title: '职业发展',
    content: '在职业生涯中，我参与了多个大型项目的开发，从传统的单体应用到现代的微服务架构，从简单的 CRUD 操作到复杂的分布式系统设计。每一个项目都让我学到了新的知识，积累了宝贵的经验。'
  },
  {
    icon: '🌱',
    title: '持续成长',
    content: '技术日新月异，我始终保持学习的热情。从 Spring 框架的深入研究到云原生技术的探索，从性能优化的实践到架构设计的思考，我相信只有不断学习才能在这个快速发展的行业中保持竞争力。'
  }
]

const skills = [
  { name: 'Java', level: 95 },
  { name: 'Spring Boot', level: 90 },
  { name: 'Spring Cloud', level: 85 },
  { name: 'MySQL', level: 88 },
  { name: 'Redis', level: 82 },
  { name: 'Vue.js', level: 78 },
  { name: 'Docker', level: 80 },
  { name: 'Kubernetes', level: 75 }
]

const contacts = [
  { icon: '📧', name: '邮箱', value: 'keaton@example.com', link: 'mailto:keaton@example.com' },
  { icon: '💼', name: 'LinkedIn', value: 'linkedin.com/in/keaton', link: 'https://linkedin.com' },
  { icon: '🐙', name: 'GitHub', value: 'github.com/keaton', link: 'https://github.com' }
]
</script>
