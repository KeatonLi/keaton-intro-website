<template>
  <div>
    <!-- Hero 区域 -->
    <section class="relative bg-gradient-to-br from-primary-900 via-primary-700 to-purple-800 dark:from-gray-900 dark:via-primary-900 dark:to-purple-900 text-white py-24 lg:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          你好，我是 <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Keaton</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          一名充满热情的 Java 工程师，专注于构建高质量的软件解决方案
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/portfolio" class="px-8 py-3 bg-white text-primary-700 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
            查看作品
          </NuxtLink>
          <NuxtLink to="/about" class="px-8 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all">
            了解更多
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 个人简介 -->
    <section class="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">个人简介</h2>
          <p class="text-gray-600 dark:text-gray-400">用代码创造价值，用技术改变世界</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- 个人信息卡片 -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keaton</h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium mb-4">Java 后端工程师</p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              作为一名充满热情的Java工程师，我专注于构建高质量、可扩展的后端系统。拥有丰富的企业级应用开发经验。
            </p>
            <div class="flex justify-center gap-8">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">年经验</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">20+</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">项目经验</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">技术栈</div>
              </div>
            </div>
          </div>
          
          <!-- 技术追求卡片 -->
          <div class="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌟 技术追求</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              我专注于 Java 生态系统的深度学习和实践，从 Spring 框架到微服务架构，从数据库优化到分布式系统设计。
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              同时，我也关注前端技术的发展，相信全栈能力能让我更好地理解整个系统的运作，为用户提供更完整、更优质的解决方案。
            </p>
          </div>
        </div>
        
        <!-- 特性卡片 -->
        <div class="grid sm:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
            <div class="text-4xl mb-3">{{ feature.icon }}</div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">技术栈</h2>
          <p class="text-gray-600 dark:text-gray-400">掌握的核心技术和工具</p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="category in techStack" :key="category.name" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 class="font-bold text-primary-600 dark:text-primary-400 mb-4">{{ category.name }}</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in category.technologies" 
                :key="tech"
                class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Keaton - Java工程师个人网站',
  meta: [
    { name: 'description', content: '专业的Java后端工程师，精通Spring Boot、微服务架构、全栈开发。' }
  ]
})

const features = [
  { icon: '💡', title: '创新思维', desc: '保持对新技术的敏感度，勇于尝试和创新' },
  { icon: '🔧', title: '工程实践', desc: '注重代码质量，遵循最佳实践和设计模式' },
  { icon: '🤝', title: '团队合作', desc: '善于沟通协作，乐于分享知识和经验' }
]

const techStack = [
  { name: '后端技术', technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'MyBatis', 'JPA'] },
  { name: '数据库', technologies: ['MySQL', 'Redis', 'MongoDB', 'Elasticsearch'] },
  { name: '前端技术', technologies: ['Vue.js', 'React', 'JavaScript', 'TypeScript'] },
  { name: '工具与部署', technologies: ['Docker', 'Kubernetes', 'Git', 'Maven', 'Jenkins'] }
]
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
