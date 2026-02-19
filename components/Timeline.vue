<template>
  <div class="timeline">
    <div class="relative">
      <!-- 时间线 -->
      <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 transform md:-translate-x-1/2"></div>
      
      <div class="space-y-8">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="relative pl-8 md:pl-0"
          :class="index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'"
        >
          <!-- 时间点 -->
          <div 
            class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-2 border-white transform -translate-x-1/2 mt-1.5 z-10"
            :class="item.dotColor || 'bg-primary-500'"
          >
            <div class="absolute inset-0 rounded-full animate-ping opacity-30" :class="item.dotColor || 'bg-primary-500'"></div>
          </div>
          
          <!-- 内容卡片 -->
          <div 
            class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all ml-4 md:ml-0"
            :class="index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'"
          >
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">{{ item.period }}</span>
              <span v-if="item.tag" class="px-2 py-0.5 rounded-full text-xs bg-primary-100 text-primary-700">
                {{ item.tag }}
              </span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ item.title }}</h3>
            <p class="text-primary-600 text-sm font-medium mb-3">{{ item.subtitle }}</p>
            
            <!-- 描述列表 -->
            <ul v-if="item.details" class="space-y-2">
              <li 
                v-for="(detail, i) in item.details" 
                :key="i"
                class="flex items-start gap-2 text-sm text-gray-600"
              >
                <Icon name="ph:check-circle-bold" class="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>{{ detail }}</span>
              </li>
            </ul>
            
            <!-- 技术栈 -->
            <div v-if="item.technologies" class="mt-4 pt-4 border-t border-gray-100">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in item.technologies" 
                  :key="tech"
                  class="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true }
})
</script>
