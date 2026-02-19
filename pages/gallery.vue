<template>
  <div>
    <!-- 页面标题 -->
    <section class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">相册</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="text-primary-600">生活瞬间</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          记录工作与生活的美好时刻，分享旅途中的风景与故事
        </p>
      </div>
    </section>

    <!-- 相册筛选 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="activeCategory === category.id 
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
              : 'bg-white text-gray-600 shadow-md border border-gray-200 hover:border-primary-300'"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- 照片网格 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 空状态提示 -->
        <div v-if="filteredPhotos.length === 0" class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary-100 flex items-center justify-center text-5xl">
            📷
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">还没有照片</h3>
          <p class="text-gray-500 mb-6">将照片放入 public/images/gallery/ 目录即可展示</p>
          <div class="bg-white rounded-2xl p-6 max-w-md mx-auto text-left shadow-lg border border-gray-100">
            <p class="text-sm text-gray-600 mb-3">使用说明：</p>
            <ol class="text-sm text-gray-500 space-y-2 list-decimal list-inside">
              <li>在 <code class="bg-gray-100 px-2 py-0.5 rounded">public/images/gallery/</code> 目录下放入照片</li>
              <li>支持的格式：jpg、jpeg、png、webp、gif</li>
              <li>建议图片尺寸不小于 800px，保证显示效果</li>
              <li>刷新页面即可自动加载新照片</li>
            </ol>
          </div>
        </div>

        <!-- 照片瀑布流 -->
        <div v-else class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <div
            v-for="(photo, index) in filteredPhotos"
            :key="photo.src"
            class="break-inside-avoid group cursor-pointer"
            @click="openLightbox(photo, index)"
          >
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
              <div class="relative">
                <img
                  :src="photo.src"
                  :alt="photo.title"
                  class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 class="text-white font-semibold text-lg">{{ photo.title }}</h3>
                  <p class="text-white/80 text-sm">{{ photo.description }}</p>
                </div>
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Icon name="ph:calendar-blank" class="w-3 h-3" />
                    {{ photo.date }}
                  </span>
                  <span class="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                    {{ getCategoryName(photo.category) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 灯箱 Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          @click="closeLightbox"
        >
          <!-- 关闭按钮 -->
          <button
            class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            @click="closeLightbox"
          >
            <Icon name="ph:x-bold" class="w-6 h-6" />
          </button>

          <!-- 上一张 -->
          <button
            v-if="currentPhotoIndex > 0"
            class="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            @click.stop="prevPhoto"
          >
            <Icon name="ph:caret-left-bold" class="w-6 h-6" />
          </button>

          <!-- 下一张 -->
          <button
            v-if="currentPhotoIndex < filteredPhotos.length - 1"
            class="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            @click.stop="nextPhoto"
          >
            <Icon name="ph:caret-right-bold" class="w-6 h-6" />
          </button>

          <!-- 图片容器 -->
          <div
            class="max-w-[90vw] max-h-[85vh] relative"
            @click.stop
          >
            <img
              :src="currentPhoto?.src"
              :alt="currentPhoto?.title"
              class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 class="text-white font-bold text-xl mb-1">{{ currentPhoto?.title }}</h3>
              <p class="text-white/80 text-sm mb-2">{{ currentPhoto?.description }}</p>
              <div class="flex items-center gap-4 text-white/60 text-xs">
                <span class="flex items-center gap-1">
                  <Icon name="ph:calendar-blank" class="w-3 h-3" />
                  {{ currentPhoto?.date }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="ph:tag" class="w-3 h-3" />
                  {{ getCategoryName(currentPhoto?.category) }}
                </span>
              </div>
            </div>
          </div>

          <!-- 图片计数 -->
          <div class="absolute bottom-6 right-6 text-white/60 text-sm">
            {{ currentPhotoIndex + 1 }} / {{ filteredPhotos.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
useHead({
  title: '相册 - Keaton',
  meta: [
    { name: 'description', content: '记录工作与生活的美好时刻，分享旅途中的风景与故事。' }
  ]
})

// 分类配置
const categories = [
  { id: 'all', name: '全部' },
  { id: 'life', name: '生活' },
  { id: 'travel', name: '旅行' },
  { id: 'work', name: '工作' },
  { id: 'tech', name: '技术' },
]

const activeCategory = ref('all')

const photos = ref([])

// 扫描 gallery 目录获取照片
onMounted(async () => {
  try {
    const response = await fetch('/api/gallery')
    if (response.ok) {
      const data = await response.json()
      if (data.photos && data.photos.length > 0) {
        photos.value = data.photos
      }
    }
  } catch (error) {
    console.log('Gallery API not available, using static photos')
  }
})

// 根据分类筛选照片
const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') {
    return photos.value
  }
  return photos.value.filter(photo => photo.category === activeCategory.value)
})

// 获取分类名称
const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category?.name || '其他'
}

// 灯箱状态
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const currentPhoto = computed(() => filteredPhotos.value[currentPhotoIndex.value])

// 打开灯箱
const openLightbox = (photo, index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

// 关闭灯箱
const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

// 上一张
const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

// 下一张
const nextPhoto = () => {
  if (currentPhotoIndex.value < filteredPhotos.length - 1) {
    currentPhotoIndex.value++
  }
}

// 键盘导航
onMounted(() => {
  const handleKeydown = (e) => {
    if (!lightboxOpen.value) return
    
    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        prevPhoto()
        break
      case 'ArrowRight':
        nextPhoto()
        break
    }
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
