<template>
  <div>
    <!-- 页面标题 -->
    <section class="relative pt-32 pb-20 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="tag-modern mb-4 inline-block">关于我</span>
        <h1 class="text-responsive-xl font-bold mb-6">
          <span class="gradient-text">认识 Keaton</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          一名热爱技术的 Java 工程师，专注于云原生可观测与系统性能治理
        </p>
      </div>
    </section>

    <!-- 个人资料卡片 -->
    <section class="py-16 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- 左侧：个人信息卡片 -->
          <div class="lg:col-span-1">
            <div class="sticky top-28 space-y-6">
              <!-- 头像卡片 -->
              <div class="glass-card p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-cyan-500/10"></div>
                <div class="relative">
                  <div class="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-6xl shadow-glow">
                    👨‍💻
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Keaton</h2>
                  <p class="text-primary-600 dark:text-primary-400 font-medium mb-4">中级 Java 开发工程师</p>
                  <div class="flex justify-center gap-3">
                    <a href="https://github.com" target="_blank" class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110">
                      <Icon name="ph:github-logo-bold" class="w-5 h-5" />
                    </a>
                    <a href="mailto:keaton@example.com" class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all hover:scale-110">
                      <Icon name="ph:envelope-bold" class="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <!-- 基本信息 -->
              <div class="glass-card p-6 space-y-4">
                <div v-for="(info, index) in basicInfo" :key="index" class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                    <Icon :name="info.icon" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ info.label }}</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ info.value }}</p>
                  </div>
                </div>
              </div>

              <!-- 专业资质 -->
              <div class="glass-card p-6">
                <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Icon name="ph:certificate-bold" class="w-5 h-5 text-primary-600" />
                  专业资质
                </h3>
                <div class="space-y-2">
                  <div v-for="(cert, index) in certificates" :key="index" class="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20">
                    <span class="text-2xl">{{ cert.icon }}</span>
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ cert.name }}</span>
                  </div>
                </div>
              </div>

              <!-- 下载简历 -->
              <button class="w-full btn-glow py-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2">
                <Icon name="ph:download-bold" class="w-5 h-5" />
                下载简历 PDF
              </button>
            </div>
          </div>

          <!-- 右侧：详细内容 -->
          <div class="lg:col-span-2 space-y-8">
            <!-- 自我介绍 -->
            <div class="glass-card p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="ph:user-circle-bold" class="w-6 h-6 text-primary-600" />
                自我介绍
              </h3>
              <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  你好！我是 Keaton，一名中级 Java 开发工程师，毕业于广东海洋大学计算机科学与技术专业。目前就职于深圳市名通科技股份有限公司，主导云原生可观测体系、高并发实时计算平台的设计与落地。
                </p>
                <p>
                  我主导了基于 eBPF+Beyla 的无侵入链路追踪平台建设，支撑日均百亿级日志处理，具备从内核层到应用层的全链路监控架构能力。在短信平台核心链路重构中，通过内存级 Trie 树+布隆过滤器替代数据库查询，实现了单机 QPS 从 5 到 5000 的 1000 倍提升。
                </p>
                <p>
                  我持有软考高级系统架构设计师和软考中级软件设计师资质，具备良好的计算机基础和团队协作精神。热衷于探索云原生、实时计算等前沿技术，致力于通过技术手段解决复杂业务问题。
                </p>
              </div>
            </div>

            <!-- 技能专长 -->
            <div class="glass-card p-8">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Icon name="ph:code-bold" class="w-6 h-6 text-primary-600" />
                  专业技能
                </h3>
                <NuxtLink to="/skills" class="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  查看详情
                  <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
                </NuxtLink>
              </div>
              
              <!-- 掌握（独立设计与调优） -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-success-600 dark:text-success-400 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-success-500"></span>
                  掌握（独立设计与调优）
                </h4>
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="(skill, index) in masteredSkills" :key="index" class="p-3 rounded-xl bg-success-50 dark:bg-success-900/10 border border-success-100 dark:border-success-800/30">
                    <div class="flex items-center gap-2">
                      <Icon name="ph:check-circle-bold" class="w-4 h-4 text-success-500" />
                      <span class="font-medium text-gray-900 dark:text-white text-sm">{{ skill.name }}</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">{{ skill.desc }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 熟练（生产环境实战） -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-primary-500"></span>
                  熟练（生产环境实战）
                </h4>
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="(skill, index) in proficientSkills" :key="index" class="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/30">
                    <div class="flex items-center gap-2">
                      <Icon name="ph:star-bold" class="w-4 h-4 text-primary-500" />
                      <span class="font-medium text-gray-900 dark:text-white text-sm">{{ skill.name }}</span>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">{{ skill.desc }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 了解（技术视野拓展） -->
              <div>
                <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-gray-400"></span>
                  了解（技术视野拓展）
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(skill, index) in familiarSkills" :key="index" class="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 工作经历时间线 -->
            <div class="glass-card p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Icon name="ph:briefcase-bold" class="w-6 h-6 text-primary-600" />
                工作经历
              </h3>
              <Timeline :items="workExperience" />
            </div>

            <!-- 教育背景 -->
            <div class="glass-card p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="ph:graduation-cap-bold" class="w-6 h-6 text-primary-600" />
                教育背景
              </h3>
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl flex-shrink-0">
                  🎓
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">计算机科学与技术（本科）</h4>
                  <p class="text-primary-600 dark:text-primary-400">广东海洋大学 · 数学与计算机学院</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">2019.09 - 2023.06</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    主修课程：计算机网络、操作系统、算法与数据结构、数据库原理及应用、C 语言等
                  </p>
                </div>
              </div>
            </div>

            <!-- 兴趣爱好 -->
            <div class="glass-card p-8">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Icon name="ph:heart-bold" class="w-6 h-6 text-primary-600" />
                兴趣爱好
              </h3>
              <div class="flex flex-wrap gap-3">
                <span v-for="(hobby, index) in hobbies" :key="index" class="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2">
                  <span class="text-lg">{{ hobby.icon }}</span>
                  {{ hobby.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我 -->
    <section class="py-16 relative">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass-card p-12 text-center relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          
          <div class="relative">
            <h2 class="text-responsive-md font-bold text-gray-900 dark:text-white mb-4">
              联系我
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              欢迎与我交流技术话题或合作机会
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:keaton@example.com" class="btn-glow px-8 py-4 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-2xl inline-flex items-center justify-center gap-2">
                <Icon name="ph:envelope-bold" class="w-5 h-5" />
                发送邮件
              </a>
              <a href="https://github.com" target="_blank" class="px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-2xl inline-flex items-center justify-center gap-2 hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all">
                <Icon name="ph:github-logo-bold" class="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '关于我 - Keaton',
  meta: [
    { name: 'description', content: '中级 Java 开发工程师，专注于云原生可观测与系统性能治理。毕业于广东海洋大学，持有软考高级系统架构设计师资质。' }
  ]
})

const basicInfo = [
  { icon: 'ph:map-pin-bold', label: '所在地', value: '深圳，中国' },
  { icon: 'ph:briefcase-bold', label: '工作经验', value: '2+ 年' },
  { icon: 'ph:building-bold', label: '目前就职', value: '深圳市名通科技' },
  { icon: 'ph:envelope-bold', label: '邮箱', value: 'keaton@example.com' }
]

const certificates = [
  { name: '软考高级系统架构设计师', icon: '🏆' },
  { name: '软考中级软件设计师', icon: '📜' }
]

const masteredSkills = [
  { name: 'Java 生态', desc: '高并发编程、JVM 深度调优、Spring Cloud' },
  { name: '数据存储', desc: 'MySQL 优化、Redis 集群、分库分表' },
  { name: '实时计算', desc: 'Flink、EventTime 窗口、Checkpoint 容错' }
]

const proficientSkills = [
  { name: '可观测体系', desc: 'eBPF、Beyla 探针、OTLP 协议、JaCoCo' },
  { name: '消息与检索', desc: 'RabbitMQ、ElasticSearch、ClickHouse' },
  { name: '云原生基础', desc: 'K8s、Docker、Git 高级工作流' }
]

const familiarSkills = [
  'Spark Core/Streaming', 'Hadoop Yarn', 'Qdrant 向量检索', 
  'RAG 架构', 'Prompt 工程', 'Istio 流量管理', 'OAuth2.0/JWT'
]

const workExperience = [
  {
    period: '2025.03 - 至今',
    title: '中级 Java 开发工程师',
    subtitle: '深圳市名通科技股份有限公司',
    tag: '在职',
    dotColor: 'bg-green-500',
    details: [
      '可观测体系：主导 eBPF+Beyla 无侵入链路追踪及 Flink 实时计算框架落地，支撑日均百亿级日志处理',
      '高并发业务：短信平台核心链路重构，内存级 Trie 树+布隆过滤器替代数据库查询，单机 QPS 5→5000',
      '工程效能：AI 辅助代码审查与文档生成，效率提升 50%；建立 Git 统计与性能基线监控'
    ],
    technologies: ['eBPF', 'Flink', 'ClickHouse', 'Java', 'Spring Cloud']
  },
  {
    period: '2023.07 - 2024.12',
    title: '初级研发工程师',
    subtitle: '深圳市华阳国际城市科技有限公司',
    details: [
      '造价大数据：对标广联达平台核心模块开发，SQL 索引重构+Redis 缓存，复杂报表查询 3s→500ms',
      '算力优化：算量服务无状态化改造配合 K8s 动态扩缩容，任务耗时降低 50%',
      '消息中台：站内消息推送平台（日均全站流量），Redis 实现去重/幂等/夜间屏蔽'
    ],
    technologies: ['Spring Cloud', 'ES', 'MongoDB', 'ClickHouse', 'RabbitMQ']
  },
  {
    period: '2022.11 - 2023.02',
    title: 'Java 研发实习生',
    subtitle: '云砺信息科技有限公司 · 华南交付实施部门',
    details: [
      '发票系统：沃尔玛 WAPP 二次开发，修复 20+ 生产缺陷',
      '性能优化：供应商数据导入接口异步化重构，3000 条数据导入 10min→90s',
      '文档交付：独立整理流程/接口/数据库文档，建立标准化交付模板'
    ],
    technologies: ['Java', 'SQL Server', 'Spring', 'Jira']
  }
]

const hobbies = [
  { name: '围棋', icon: '⚫' },
  { name: '羽毛球', icon: '🏸' },
  { name: '咖啡', icon: '☕' }
]
</script>
