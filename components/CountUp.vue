<template>
  <span class="count-up">{{ displayValue }}</span>
</template>

<script setup>
const props = defineProps({
  end: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' },
  startOnMount: { type: Boolean, default: true }
})

const displayValue = ref(props.prefix + '0' + props.suffix)
const isAnimating = ref(false)

const animate = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  
  const startTime = performance.now()
  const startValue = 0
  const endValue = props.end
  
  const step = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // 使用 easeOutExpo 缓动函数
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress)
    
    displayValue.value = props.prefix + currentValue + props.suffix
    
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      isAnimating.value = false
    }
  }
  
  requestAnimationFrame(step)
}

onMounted(() => {
  if (props.startOnMount) {
    setTimeout(animate, 300)
  }
})

defineExpose({ animate })
</script>
