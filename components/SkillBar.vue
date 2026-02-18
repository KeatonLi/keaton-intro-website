<template>
  <div class="skill-bar">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2">
        <Icon v-if="icon" :name="icon" class="w-4 h-4 text-primary-500" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ name }}</span>
      </div>
      <span v-if="showLevel" class="text-xs text-gray-500 dark:text-gray-400">{{ levelText }}</span>
    </div>
    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        class="h-full rounded-full transition-all duration-1000 ease-out relative"
        :class="gradientClass"
        :style="{ width: animated ? `${level}%` : '0%' }"
      >
        <div class="absolute inset-0 bg-white/20 animate-shimmer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true }, // 0-100
  icon: { type: String, default: '' },
  showLevel: { type: Boolean, default: true },
  color: { type: String, default: 'primary' } // primary, success, warning, danger, accent
})

const animated = ref(false)

const levelText = computed(() => {
  if (props.level >= 90) return '精通'
  if (props.level >= 75) return '熟练'
  if (props.level >= 60) return '掌握'
  return '了解'
})

const gradientClass = computed(() => {
  const gradients = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-400'
  }
  return gradients[props.color] || gradients.primary
})

onMounted(() => {
  setTimeout(() => {
    animated.value = true
  }, 100)
})
</script>
