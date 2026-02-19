<template>
  <div>
    <!-- 页面标题 -->
    <section class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">实用工具</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="text-primary-600">开发工具箱</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          日常开发中常用的在线工具，提升工作效率
        </p>
      </div>
    </section>

    <!-- 工具列表 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- JSON 格式化工具 -->
          <NuxtLink to="/tools/json-formatter" class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
              📝
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">JSON 格式化</h3>
            <p class="text-gray-500 text-sm mb-4">
              JSON 数据美化、压缩、校验、转义，支持语法高亮和搜索功能
            </p>
            <div class="flex items-center gap-2 text-primary-600 text-sm font-medium">
              <span>立即使用</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </NuxtLink>

          <!-- JSON 格式转换 -->
          <NuxtLink to="/tools/json-convert" class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
              🔄
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">JSON 格式转换</h3>
            <p class="text-gray-500 text-sm mb-4">
              JSON 与 YAML、XML、CSV、Properties、TOML 等格式相互转换
            </p>
            <div class="flex items-center gap-2 text-primary-600 text-sm font-medium">
              <span>立即使用</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </NuxtLink>

          <!-- 文本对比工具 -->
          <NuxtLink to="/tools/text-compare" class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
              🔍
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">文本对比</h3>
            <p class="text-gray-500 text-sm mb-4">
              对比两段文本的差异，高亮显示增删改内容，支持行级和字符级对比
            </p>
            <div class="flex items-center gap-2 text-primary-600 text-sm font-medium">
              <span>立即使用</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </NuxtLink>

          <!-- 时间戳转换工具 -->
          <NuxtLink to="/tools/timestamp" class="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
              ⏰
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">时间戳转换</h3>
            <p class="text-gray-500 text-sm mb-4">
              时间戳与日期时间相互转换，支持批量转换、时区转换
            </p>
            <div class="flex items-center gap-2 text-primary-600 text-sm font-medium">
              <span>立即使用</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </NuxtLink>

          <!-- 占位：后续可添加更多工具 -->
          <div class="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-4 text-gray-400">
              🚧
            </div>
            <h3 class="text-lg font-medium text-gray-500 mb-2">更多工具</h3>
            <p class="text-gray-400 text-sm">
              正在开发中，敬请期待...
            </p>
          </div>

          <div class="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl mb-4 text-gray-400">
              🚧
            </div>
            <h3 class="text-lg font-medium text-gray-500 mb-2">更多工具</h3>
            <p class="text-gray-400 text-sm">
              正在开发中，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 提示信息 -->
    <section class="py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Icon name="ph:info-bold" class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 class="font-medium text-blue-900 mb-1">隐私说明</h4>
            <p class="text-blue-700 text-sm">
              所有工具均在浏览器本地运行，不会将您的数据上传到服务器，请放心使用。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '开发工具箱 - Keaton',
  meta: [
    { name: 'description', content: '实用的在线开发工具集合，包括 JSON 格式化、文本对比、时间戳转换等功能。' }
  ]
})
</script>
