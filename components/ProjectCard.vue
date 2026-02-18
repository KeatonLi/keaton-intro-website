<template>
  <div class="project-card glass-card overflow-hidden card-hover group">
    <div class="grid lg:grid-cols-5 gap-0">
      <!-- 项目封面 -->
      <div 
        class="lg:col-span-2 h-64 lg:h-auto flex items-center justify-center relative overflow-hidden"
        :class="gradient"
      >
        <div class="absolute inset-0 bg-black/10"></div>
        <!-- 动态背景 -->
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full filter blur-2xl animate-float"></div>
          <div class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full filter blur-2xl animate-float delay-1000"></div>
        </div>
        <div class="relative text-center p-8">
          <div class="text-8xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
            {{ icon }}
          </div>
          <div class="flex gap-2 justify-center flex-wrap">
            <span class="px-3 py-1 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
              {{ period }}
            </span>
            <span v-if="role" class="px-3 py-1 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
              {{ role }}
            </span>
          </div>
        </div>
      </div>

      <!-- 项目详情 -->
      <div class="lg:col-span-3 p-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{{ description }}</p>

        <!-- 技术栈 -->
        <div class="mb-6">
          <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            技术架构
          </h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tech in technologies" 
              :key="tech"
              class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 text-sm border border-primary-100 dark:border-primary-800"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- 核心贡献/亮点 -->
        <div>
          <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            核心贡献
          </h4>
          <ul class="space-y-2">
            <li 
              v-for="(achievement, i) in achievements" 
              :key="i"
              class="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm"
            >
              <Icon name="ph:star-bold" class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <span>{{ achievement }}</span>
            </li>
          </ul>
        </div>

        <!-- 数据指标 -->
        <div v-if="metrics" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(metric, i) in metrics" :key="i" class="text-center">
              <div class="text-2xl font-bold gradient-text">{{ metric.value }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ metric.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  gradient: { type: String, default: 'bg-gradient-to-br from-primary-500 to-primary-700' },
  period: { type: String, required: true },
  role: { type: String, default: '' },
  technologies: { type: Array, default: () => [] },
  achievements: { type: Array, default: () => [] },
  metrics: { type: Array, default: () => [] }
})
</script>
