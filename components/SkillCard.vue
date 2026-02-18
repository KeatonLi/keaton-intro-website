<template>
  <div class="skill-card glass-card p-6 card-hover group">
    <div class="flex items-start gap-4">
      <div 
        class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
        :class="iconBgClass"
      >
        {{ icon }}
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ title }}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{{ description }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  color: { type: String, default: 'primary' } // primary, success, warning, danger, accent
})

const iconBgClass = computed(() => {
  const classes = {
    primary: 'bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-600'
  }
  return classes[props.color] || classes.primary
})
</script>
