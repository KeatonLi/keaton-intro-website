<template>
  <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all group relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" :class="gradient"></div>
    
    <div class="relative">
      <!-- 图标 -->
      <div 
        class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        :class="iconBgClass"
      >
        {{ icon }}
      </div>
      
      <!-- 标题 -->
      <h3 class="text-lg font-bold text-gray-900 mb-2">{{ title }}</h3>
      
      <!-- 描述 -->
      <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ description }}</p>
      
      <!-- 亮点数据 -->
      <div v-if="highlight" class="flex items-center gap-2">
        <span class="text-2xl font-bold text-primary-600">{{ highlight.value }}</span>
        <span class="text-xs text-gray-500">{{ highlight.label }}</span>
      </div>
      
      <!-- 标签 -->
      <div v-if="tags" class="flex flex-wrap gap-1.5 mt-4">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-600"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  highlight: { type: Object, default: null },
  tags: { type: Array, default: () => [] },
  color: { type: String, default: 'primary' }
})

const gradient = computed(() => {
  const gradients = {
    primary: 'from-primary-500 to-primary-600'
  }
  return gradients[props.color] || gradients.primary
})

const iconBgClass = computed(() => {
  const classes = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
  }
  return classes[props.color] || classes.primary
})
</script>
