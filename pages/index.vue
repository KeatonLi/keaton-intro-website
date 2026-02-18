<template>
  <div>
    <!-- Hero 区域 -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <!-- 动态背景 -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full filter blur-3xl animate-float"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/15 rounded-full filter blur-3xl animate-float delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-300/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <!-- 网格装饰 -->
        <div class="absolute inset-0 grid-pattern opacity-30"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <!-- 标签 -->
        <div class="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm mb-8 animate-fade-in-up">
          <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
          <span class="text-gray-700 dark:text-gray-300">在职 · 深圳市名通科技 · 中级Java工程师</span>
        </div>
        
        <!-- 主标题 -->
        <h1 class="text-responsive-xl font-bold mb-6 animate-fade-in-up delay-100">
          <span class="text-gray-900 dark:text-white">你好，我是 </span>
          <span class="gradient-text">Keaton</span>
        </h1>
        
        <!-- 副标题 -->
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
          专注于
          <span class="text-primary-600 dark:text-primary-400 font-semibold">云原生可观测</span>
          、
          <span class="text-primary-500 dark:text-primary-300 font-semibold">高并发实时计算</span>
          与
          <span class="text-primary-700 dark:text-primary-200 font-semibold">全栈性能治理</span>
        </p>
        
        <!-- 按钮组 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
          <NuxtLink to="/portfolio" class="group btn-glow px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2">
            <Icon name="ph:briefcase-bold" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
            查看作品
          </NuxtLink>
          <NuxtLink to="/skills" class="group px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700">
            <Icon name="ph:code-bold" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            技术栈
          </NuxtLink>
          <NuxtLink to="/about" class="group px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700">
            <Icon name="ph:user-bold" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            了解更多
          </NuxtLink>
        </div>
        
        <!-- 核心数据展示 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up delay-400">
          <div class="glass-card p-6 card-hover">
            <div class="text-3xl md:text-4xl font-bold gradient-text mb-1">
              <CountUp :end="100" suffix="亿+" />
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">日均日志处理</div>
          </div>
          <div class="glass-card p-6 card-hover">
            <div class="text-3xl md:text-4xl font-bold gradient-text mb-1">
              <CountUp :end="1000" suffix="x" />
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">QPS性能提升</div>
          </div>
          <div class="glass-card p-6 card-hover">
            <div class="text-3xl md:text-4xl font-bold gradient-text mb-1">
              <CountUp :end="50" suffix="%" />
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">效率提升</div>
          </div>
          <div class="glass-card p-6 card-hover">
            <div class="text-3xl md:text-4xl font-bold gradient-text mb-1">
              <CountUp :end="2" suffix="+" />
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">年经验</div>
          </div>
        </div>
        
        <!-- 滚动提示 -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ph:arrow-down-bold" class="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>

    <!-- 个人优势 -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="tag-modern mb-4 inline-block">个人优势</span>
          <h2 class="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
            核心技术能力
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            从内核层到应用层的全链路技术能力，支撑大规模分布式系统的可观测与性能治理
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdvantageCard
            v-for="(advantage, index) in advantages"
            :key="index"
            v-bind="advantage"
          />
        </div>
      </div>
    </section>

    <!-- 个人简介 -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="tag-modern mb-4 inline-block">关于我</span>
          <h2 class="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
            用代码创造价值
          </h2>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- 个人信息卡片 -->
          <div class="glass-card p-8 card-hover group">
            <div class="flex items-start gap-6 mb-6">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-4xl shadow-glow group-hover:shadow-glow-lg transition-shadow">
                👨‍💻
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Keaton</h3>
                <p class="text-primary-600 dark:text-primary-400 font-medium">中级 Java 工程师</p>
                <div class="flex gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    <Icon name="ph:map-pin-bold" class="w-4 h-4" />
                    深圳
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="ph:graduation-cap-bold" class="w-4 h-4" />
                    广东海洋大学
                  </span>
                </div>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              毕业于广东海洋大学计算机科学与技术专业，目前就职于深圳市名通科技股份有限公司。主导 eBPF+Beyla 无侵入链路追踪平台建设，支撑日均百亿级日志处理；主导短信平台核心链路重构，单机 QPS 5→5000。
            </p>
            <div class="flex gap-6">
              <div v-for="(item, index) in quickInfo" :key="index" class="text-center">
                <div class="text-2xl font-bold gradient-text">{{ item.value }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.label }}</div>
              </div>
            </div>
          </div>
          
          <!-- 核心能力 -->
          <div class="space-y-4">
            <SkillCard
              v-for="(skill, index) in coreSkills"
              :key="index"
              v-bind="skill"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈预览 -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="tag-modern mb-4 inline-block">技术栈</span>
          <h2 class="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
            掌握的技术
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            覆盖云原生、实时计算、性能治理等全栈技术领域
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div v-for="(tech, index) in technologies" :key="index" class="glass-card p-4 text-center card-hover group">
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl transition-transform group-hover:scale-110" :class="tech.gradient">
              {{ tech.icon }}
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white text-sm">{{ tech.name }}</h4>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <NuxtLink to="/skills" class="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all">
            查看完整技能图谱
            <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 项目亮点 -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="tag-modern mb-4 inline-block">项目经历</span>
          <h2 class="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
            核心项目
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            主导可观测平台、精准测试平台、造价大数据平台等核心系统建设
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(project, index) in featuredProjects" 
            :key="index"
            class="glass-card p-6 card-hover group"
          >
            <div 
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110"
              :class="project.iconBg"
            >
              {{ project.icon }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.technologies" :key="tech" class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                {{ tech }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm">
              <span class="font-semibold">{{ project.highlight }}</span>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-8">
          <NuxtLink to="/portfolio" class="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all">
            查看全部项目
            <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 兴趣爱好 -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="tag-modern mb-4 inline-block">兴趣爱好</span>
          <h2 class="text-responsive-lg font-bold text-gray-900 dark:text-white mb-4">
            代码之外的生活
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(hobby, index) in hobbies" :key="index" class="glass-card p-8 card-hover group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" :class="hobby.gradient"></div>
            <div class="relative">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6" :class="hobby.gradient">
                {{ hobby.icon }}
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ hobby.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ hobby.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-12 text-center relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full filter blur-3xl"></div>
          
          <div class="relative">
            <h2 class="text-responsive-md font-bold text-gray-900 dark:text-white mb-4">
              有兴趣合作吗？
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              无论是技术交流、项目合作还是工作机会，都欢迎与我联系
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/about" class="btn-glow px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl inline-flex items-center justify-center gap-2">
                <Icon name="ph:hand-waving-bold" class="w-5 h-5" />
                联系我
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Keaton - Java工程师',
  meta: [
    { name: 'description', content: '中级 Java 开发工程师，专注于云原生可观测、高并发实时计算与全栈性能治理。主导 eBPF+Beyla 无侵入链路追踪平台建设，支撑日均百亿级日志处理。' }
  ]
})

const quickInfo = [
  { value: '2+', label: '年经验' },
  { value: '3', label: '公司' },
  { value: '软考高级', label: '资质' }
]

const advantages = [
  {
    icon: '🔭',
    title: '云原生可观测',
    description: '主导基于 eBPF+Beyla 的无侵入链路追踪平台建设，支撑日均百亿级日志处理',
    highlight: { value: '百亿级', label: '日均日志' },
    tags: ['eBPF', 'Beyla', 'Flink', 'ClickHouse'],
    color: 'primary'
  },
  {
    icon: '⚡',
    title: '高并发实时计算',
    description: '主导短信平台核心链路重构，单机 QPS 提升 1000 倍，设计 Flink 实时计算框架',
    highlight: { value: '1000x', label: 'QPS提升' },
    tags: ['Flink', 'Trie树', '布隆过滤器'],
    color: 'primary'
  },
  {
    icon: '📊',
    title: '工程效能',
    description: '引入 AI 辅助研发工具链提升文档效率 50%，建立代码量统计与性能基线监控',
    highlight: { value: '50%', label: '效率提升' },
    tags: ['AI工具链', 'Code Review', '性能监控'],
    color: 'primary'
  },
  {
    icon: '🎯',
    title: '全栈性能治理',
    description: '擅长 JVM 级字节码优化、内存级高性能计算、分布式数据库架构优化',
    highlight: { value: '95%+', label: '覆盖率准确性' },
    tags: ['JaCoCo', 'JVM', 'MongoDB', 'ClickHouse'],
    color: 'primary'
  }
]

const coreSkills = [
  { 
    icon: '🔬', 
    title: '可观测体系', 
    description: 'eBPF 无侵入追踪、Flink 实时计算、Prometheus 监控告警',
    tags: ['eBPF', 'Beyla', 'OTLP', 'Flink'],
    gradient: 'from-primary-400 to-primary-600',
    color: 'primary'
  },
  { 
    icon: '🚀', 
    title: '高并发架构', 
    description: '内存级 Trie 树+布隆过滤器、单机 QPS 5→5000',
    tags: ['高并发', '内存计算', '性能优化'],
    gradient: 'from-primary-500 to-primary-700',
    color: 'primary'
  },
  { 
    icon: '🧬', 
    title: 'JVM 字节码优化', 
    description: 'JaCoCo 动态插桩、Java Agent、覆盖率准确性 95%+',
    tags: ['Java Agent', '字节码', '精准测试'],
    gradient: 'from-primary-400 to-primary-500',
    color: 'primary'
  }
]

const technologies = [
  { name: 'Java', icon: '☕', gradient: 'from-primary-500 to-primary-600' },
  { name: 'Spring', icon: '🍃', gradient: 'from-primary-400 to-primary-500' },
  { name: 'Flink', icon: '⚡', gradient: 'from-primary-500 to-primary-700' },
  { name: 'eBPF', icon: '🔍', gradient: 'from-primary-400 to-primary-600' },
  { name: 'MySQL', icon: '🐬', gradient: 'from-primary-500 to-primary-600' },
  { name: 'Redis', icon: '🔴', gradient: 'from-primary-500 to-primary-700' },
  { name: 'ES', icon: '🔎', gradient: 'from-primary-400 to-primary-500' },
  { name: 'ClickHouse', icon: '🏠', gradient: 'from-primary-500 to-primary-600' }
]

const featuredProjects = [
  {
    icon: '🔭',
    title: '云帆可观测与 CMDB 平台',
    description: '基于 eBPF+Beyla 的无侵入链路追踪平台，支撑日均百亿级日志处理',
    technologies: ['eBPF', 'Flink', 'ClickHouse', 'Kafka'],
    highlight: 'P99 500ms→80ms',
    iconBg: 'bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-600'
  },
  {
    icon: '🎯',
    title: '南航精准测试平台',
    description: 'JaCoCo 动态插桩替代静态插桩，实现智能用例推荐与流量回放',
    technologies: ['JaCoCo', 'Java Agent', 'Gor', '贪心算法'],
    highlight: '用例减少 40%',
    iconBg: 'bg-gradient-to-br from-primary-400/20 to-primary-600/20 text-primary-600'
  },
  {
    icon: '🏗️',
    title: '华阳造价大数据平台',
    description: '亿级历史工程数据多维度检索，MongoDB 迁移 ClickHouse',
    technologies: ['ES', 'ClickHouse', 'Qdrant', 'RAG'],
    highlight: '存储成本下降 70%',
    iconBg: 'bg-gradient-to-br from-primary-500/20 to-primary-700/20 text-primary-600'
  }
]

const hobbies = [
  { icon: '⚫', title: '围棋', desc: '培养大局观和策略思维，在复杂局面中寻找最优解', gradient: 'from-gray-400 to-gray-600' },
  { icon: '🏸', title: '羽毛球', desc: '保持活力的方式，双打中的配合让我更理解团队协作', gradient: 'from-primary-400 to-primary-600' },
  { icon: '☕', title: '咖啡', desc: '享受手冲咖啡的过程，探索不同产区的风味', gradient: 'from-primary-500 to-primary-700' }
]
</script>
