<template>
  <div>
    <!-- 页面标题 -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/15 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-400/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="tag-modern mb-4 inline-block">技术栈</span>
        <h1 class="text-responsive-xl font-bold mb-6">
          <span class="gradient-text">专业技能图谱</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          覆盖云原生可观测、高并发实时计算、全栈性能治理等技术领域
        </p>
      </div>
    </section>

    <!-- 技能概览 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="glass-card p-6 text-center card-hover">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl text-white">
              🎯
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">掌握</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">独立设计与调优</p>
            <div class="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-400">{{ masteredCount }}</div>
          </div>
          <div class="glass-card p-6 text-center card-hover">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-3xl text-white">
              ⭐
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">熟练</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">生产环境实战</p>
            <div class="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-400">{{ proficientCount }}</div>
          </div>
          <div class="glass-card p-6 text-center card-hover">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-3xl text-white">
              📚
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">了解</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">技术视野拓展</p>
            <div class="mt-4 text-3xl font-bold text-gray-600 dark:text-gray-400">{{ familiarCount }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 掌握技能详情 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="tag-modern mb-4 inline-block">掌握</span>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            独立设计与调优
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            具备独立架构设计、性能调优与问题排查能力
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Java 生态 -->
          <div class="glass-card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl text-white">
                ☕
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Java 生态</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">高并发编程与 JVM 深度调优</p>
              </div>
            </div>
            <div class="space-y-4">
              <SkillBar name="高并发编程 (JUC/AQS/线程池)" :level="90" color="primary" />
              <SkillBar name="JVM 深度调优 (G1/ZGC/Arthas)" :level="85" color="primary" />
              <SkillBar name="Spring Cloud (Nacos/Sentinel/Seata)" :level="88" color="primary" />
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">JUC</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">AQS</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">线程池调优</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">G1/ZGC</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Arthas</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Spring Cloud</span>
              </div>
            </div>
          </div>

          <!-- 数据存储 -->
          <div class="glass-card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl text-white">
                🗄️
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">数据存储</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">数据库优化与缓存治理</p>
              </div>
            </div>
            <div class="space-y-4">
              <SkillBar name="MySQL (索引优化/执行计划/分库分表)" :level="88" color="primary" />
              <SkillBar name="Redis (Cluster/RDB+AOF/缓存治理)" :level="90" color="primary" />
              <SkillBar name="ClickHouse (列式存储/分区键设计)" :level="82" color="primary" />
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">索引优化</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">执行计划</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">锁机制</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Redis Cluster</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Redisson</span>
              </div>
            </div>
          </div>

          <!-- 实时计算 -->
          <div class="glass-card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl text-white">
                ⚡
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">实时计算</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Flink 实时计算框架</p>
              </div>
            </div>
            <div class="space-y-4">
              <SkillBar name="Flink (EventTime 窗口/Checkpoint)" :level="85" color="primary" />
              <SkillBar name="RocksDB State Backend" :level="80" color="primary" />
              <SkillBar name="数据倾斜治理" :level="82" color="primary" />
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">EventTime</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">窗口聚合</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Checkpoint</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">RocksDB</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">加盐打散</span>
              </div>
            </div>
          </div>

          <!-- 高性能计算 -->
          <div class="glass-card p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl text-white">
                🚀
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">高性能计算</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">内存级算法与数据结构</p>
              </div>
            </div>
            <div class="space-y-4">
              <SkillBar name="Trie 树 / 布隆过滤器" :level="88" color="primary" />
              <SkillBar name="贪心算法 / 动态规划" :level="80" color="primary" />
              <SkillBar name="JVM 字节码优化" :level="82" color="primary" />
            </div>
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Trie 树</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">布隆过滤器</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">贪心算法</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">Java Agent</span>
                <span class="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm">字节码插桩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 熟练技能 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="tag-modern mb-4 inline-block">熟练</span>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            生产环境实战
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            在实际项目中广泛使用并积累了丰富经验
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard
            v-for="(skill, index) in proficientSkills"
            :key="index"
            v-bind="skill"
            color="primary"
          />
        </div>
      </div>
    </section>

    <!-- 了解技能 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="tag-modern mb-4 inline-block">了解</span>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            技术视野拓展
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            持续学习，保持对前沿技术的关注
          </p>
        </div>

        <div class="glass-card p-8">
          <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(category, index) in familiarSkills" :key="index">
              <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span class="text-2xl">{{ category.icon }}</span>
                {{ category.name }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in category.skills" 
                  :key="skill"
                  class="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术成长路线 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            技术成长路线
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            从基础开发到云原生架构的持续进阶
          </p>
        </div>

        <div class="glass-card p-8">
          <div class="relative">
            <!-- 时间线 -->
            <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 transform md:-translate-x-1/2"></div>
            
            <div class="space-y-12">
              <div v-for="(milestone, index) in milestones" :key="index" class="relative pl-12 md:pl-0" :class="index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'">
                <!-- 时间点 -->
                <div class="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-2 border-white dark:border-surface-900 bg-primary-500 transform -translate-x-1/2 flex items-center justify-center">
                  <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                </div>
                
                <!-- 内容 -->
                <div class="ml-4 md:ml-0" :class="index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'">
                  <span class="tag-modern text-xs mb-2 inline-block">{{ milestone.time }}</span>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ milestone.title }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ milestone.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-12 text-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full filter blur-3xl"></div>
          
          <div class="relative">
            <h2 class="text-responsive-md font-bold text-gray-900 dark:text-white mb-4">
              对我的技术栈感兴趣？
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              欢迎查看我的项目经历，或与我交流技术话题
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/portfolio" class="btn-glow px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl inline-flex items-center justify-center gap-2">
                <Icon name="ph:briefcase-bold" class="w-5 h-5" />
                查看项目
              </NuxtLink>
              <NuxtLink to="/about" class="px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-2xl inline-flex items-center justify-center gap-2 hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all">
                <Icon name="ph:user-bold" class="w-5 h-5" />
                关于我
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
  title: '技术栈 - Keaton',
  meta: [
    { name: 'description', content: '覆盖云原生可观测、高并发实时计算、全栈性能治理等技术领域，掌握 Java 生态、数据存储、Flink 实时计算等核心技术。' }
  ]
})

const masteredCount = 12
const proficientCount = 9
const familiarCount = 7

const proficientSkills = [
  {
    icon: '🔭',
    title: '可观测体系',
    description: 'eBPF、Beyla 探针、OTLP 协议、JaCoCo 动态插桩',
    tags: ['eBPF', 'Beyla', 'OTLP', 'JaCoCo', 'Java Agent']
  },
  {
    icon: '📊',
    title: '监控告警',
    description: 'Prometheus、Grafana、SkyWalking、链路追踪',
    tags: ['Prometheus', 'Grafana', 'SkyWalking', 'Metrics']
  },
  {
    icon: '🐰',
    title: '消息队列',
    description: 'RabbitMQ 镜像队列、死信队列、消息可靠性',
    tags: ['RabbitMQ', '镜像队列', '死信队列', '幂等']
  },
  {
    icon: '🔍',
    title: '搜索引擎',
    description: 'ElasticSearch 分片策略、亿级数据检索优化',
    tags: ['ES', '分片策略', '倒排索引', '查询优化']
  },
  {
    icon: '🏠',
    title: 'ClickHouse',
    description: '列式存储、分区键设计、冷热数据分层',
    tags: ['ClickHouse', '列式存储', '分区键', '数据迁移']
  },
  {
    icon: '☸️',
    title: '云原生基础',
    description: 'K8s Deployment/Service/Ingress、Docker 多阶段构建',
    tags: ['K8s', 'Docker', '容器化', '微服务']
  }
]

const familiarSkills = [
  {
    icon: '🔥',
    name: '大数据生态',
    skills: ['Spark Core', 'Spark Streaming', 'Hadoop Yarn']
  },
  {
    icon: '🤖',
    name: 'AI 与向量',
    skills: ['Qdrant', 'RAG 架构', 'Prompt 工程']
  },
  {
    icon: '🔐',
    name: '服务网格与安全',
    skills: ['Istio', 'OAuth2.0', 'JWT']
  }
]

const milestones = [
  {
    time: '2023',
    title: 'Java 基础与微服务入门',
    desc: '掌握 Spring Boot、Spring Cloud 基础，完成从实习生到初级工程师的转变'
  },
  {
    time: '2024',
    title: '海量数据处理与性能优化',
    desc: '深入 ElasticSearch、ClickHouse，完成亿级数据平台开发与数据库架构升级'
  },
  {
    time: '2025 Q1',
    title: '云原生可观测体系',
    desc: '主导 eBPF+Beyla 无侵入链路追踪平台建设，支撑日均百亿级日志处理'
  },
  {
    time: '2025 Q2',
    title: 'JVM 字节码与精准测试',
    desc: '掌握 Java Agent 与字节码插桩技术，设计精准测试平台'
  },
  {
    time: '2025 Q3',
    title: '实时计算与高并发架构',
    desc: 'Flink 实时计算框架落地，内存级 Trie 树实现 QPS 1000 倍提升'
  }
]
</script>
