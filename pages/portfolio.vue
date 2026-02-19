<template>
  <div>
    <!-- 页面标题 -->
    <section class="pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">作品集</span>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <span class="text-primary-600">项目经历</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          主导的核心项目，从云原生可观测到精准测试平台的完整技术实践
        </p>
      </div>
    </section>

    <!-- 项目统计 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
              <CountUp :end="100" suffix="亿+" />
            </div>
            <div class="text-sm text-gray-500">日均日志处理</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
              <CountUp :end="1000" suffix="x" />
            </div>
            <div class="text-sm text-gray-500">QPS性能提升</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
              <CountUp :end="95" suffix="%+" />
            </div>
            <div class="text-sm text-gray-500">覆盖率准确性</div>
          </div>
          <div class="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
              <CountUp :end="70" suffix="%" />
            </div>
            <div class="text-sm text-gray-500">存储成本下降</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 重点项目 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            核心项目
          </h2>
          <p class="text-gray-600">
            在名通科技、华阳国际主导的重点项目
          </p>
        </div>

        <!-- 项目卡片 -->
        <div class="space-y-8">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            v-bind="project"
          />
        </div>
      </div>
    </section>

    <!-- 技术亮点 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            技术亮点
          </h2>
          <p class="text-gray-600">
            解决过的复杂技术问题与突破
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(highlight, index) in highlights" 
            :key="index"
            class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all group"
          >
            <div class="relative">
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform"
                :class="highlight.iconBg"
              >
                {{ highlight.icon }}
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                {{ highlight.title }}
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ highlight.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术架构 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
            技术架构全景
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- 云原生可观测 -->
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl text-white">
                🔭
              </div>
              <h3 class="font-bold text-gray-900 mb-2">云原生可观测</h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">eBPF / Beyla</p>
                <p class="text-sm text-gray-500">OTLP / Prometheus</p>
                <p class="text-sm text-gray-500">Grafana / SkyWalking</p>
              </div>
            </div>
            
            <!-- 实时计算 -->
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl text-white">
                ⚡
              </div>
              <h3 class="font-bold text-gray-900 mb-2">实时计算</h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">Flink</p>
                <p class="text-sm text-gray-500">Kafka / RocksDB</p>
                <p class="text-sm text-gray-500">EventTime / Checkpoint</p>
              </div>
            </div>
            
            <!-- 数据存储 -->
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl text-white">
                🗄️
              </div>
              <h3 class="font-bold text-gray-900 mb-2">数据存储</h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">MySQL / Redis</p>
                <p class="text-sm text-gray-500">ElasticSearch / ClickHouse</p>
                <p class="text-sm text-gray-500">MongoDB / Qdrant</p>
              </div>
            </div>
            
            <!-- 工程效能 -->
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-3xl text-white">
                🚀
              </div>
              <h3 class="font-bold text-gray-900 mb-2">工程效能</h3>
              <div class="space-y-1">
                <p class="text-sm text-gray-500">JaCoCo / Java Agent</p>
                <p class="text-sm text-gray-500">K8s / Docker</p>
                <p class="text-sm text-gray-500">AI 辅助工具链</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-12 text-center text-white shadow-xl shadow-primary-500/30 relative overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative">
            <h2 class="text-2xl md:text-3xl font-bold mb-4">
              对我的项目感兴趣？
            </h2>
            <p class="text-white/80 mb-8 max-w-lg mx-auto">
              无论是技术交流、项目合作还是工作机会，都欢迎与我联系
            </p>
            <NuxtLink to="/about" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:bg-gray-50 transition-all hover:-translate-y-0.5">
              <Icon name="ph:hand-waving-bold" class="w-5 h-5" />
              联系我
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: '作品集 - Keaton',
  meta: [
    { name: 'description', content: '主导云帆可观测与CMDB平台、南航精准测试平台、华阳造价大数据平台等核心项目，支撑日均百亿级日志处理，单机QPS提升1000倍。' }
  ]
})

const projects = [
  {
    title: '云帆可观测与 CMDB 平台',
    description: '基于 eBPF+Beyla 的无侵入链路追踪平台，支撑日均百亿级日志处理。原单体 CMDB 存在实时计算瓶颈（复杂聚合耗时久、内存占用高），可观测链路存在 Redis 热点 KEY 与数据一致性问题。',
    icon: '🔭',
    gradient: 'bg-gradient-to-br from-primary-600 to-primary-700',
    period: '2025.03 - 2025.09',
    role: '核心开发/架构优化负责人',
    technologies: ['eBPF', 'Flink', 'Kafka', 'ClickHouse', 'SNMP', 'LLDP', 'Beyla', 'OTLP'],
    achievements: [
      'Flink 实时计算：引入 Flink 替代 Spark，设计加盐打散+窗口聚合解决数据倾斜，实现秒级指标统计；RocksDB State Backend 容错，任务失败自动重启不丢数',
      'eBPF 无侵入追踪：对接 Beyla 探针，开发 OTLP 接收器解析分布式追踪数据，关键接口 P99 从 500ms 降至 80ms；制定《可观测接入标准》，推动 3 个业务线落地',
      '设备自动发现：基于 SNMP Trap+LLDP 协议实现网络设备拓扑自动推断；设计分层采集架构（采集器→Kafka→Flink→ClickHouse），支持百万级设备分钟级纳管',
      '缓存架构优化：针对 SkyWalking ES 解耦发现的 Redis 热点 KEY，设计本地缓存+变更通知机制，消除高频轮询，Redis 负载降低 60%，一致性延迟<100ms'
    ],
    metrics: [
      { value: '100亿+', label: '日均日志' },
      { value: '500→80ms', label: 'P99 延迟' },
      { value: '60%', label: 'Redis 负载降低' }
    ]
  },
  {
    title: '南航资产管理系统精准测试平台',
    description: '传统单体系统回归测试成本高，静态插桩侵入性强且高并发下调用路径混淆。基于 JaCoCo 动态插桩的智能测试平台，实现代码变更驱动的精准测试。',
    icon: '🎯',
    gradient: 'bg-gradient-to-br from-primary-500 to-primary-700',
    period: '2025.06 - 2025.11',
    role: '技术负责人',
    technologies: ['JaCoCo', 'Java Agent', 'Gor', '贪心算法', 'JVM 字节码'],
    achievements: [
      'JaCoCo 动态插桩：设计 Java Agent 运行时轻量级字节码修改，替代静态插桩，降低运行时干扰 30%，解决高并发下调用路径混淆，覆盖率准确性提升至 95%+',
      '智能用例推荐：基于贪心算法构建最小化测试子集模型，结合代码变更 Diff 自动筛选，减少回归用例 40%，缩短测试周期',
      '流量回放闭环：对接 Gor 构建「采集→回放→覆盖率分析」流水线，实现生产流量在测试环境精确回放，高风险变更拦截率提升 50%',
      '根因定位：开发调用链路拓扑自动绘制与故障根因定位算法，平均问题排查时间从 2 小时缩短至 15 分钟'
    ],
    metrics: [
      { value: '95%+', label: '覆盖率准确性' },
      { value: '40%', label: '用例减少' },
      { value: '15min', label: '平均排查时间' }
    ]
  },
  {
    title: '华阳造价指标大数据平台',
    description: '建筑造价数据管理平台，需支持亿级历史工程数据多维度检索与智能测算，原 MongoDB 存在内存告警与聚合性能瓶颈。对标广联达指标网站的建筑互联网系统。',
    icon: '🏗️',
    gradient: 'bg-gradient-to-br from-primary-500 to-primary-600',
    period: '2023.07 - 2024.12',
    role: '核心开发',
    technologies: ['ES', 'ClickHouse', 'MongoDB', 'Qdrant', 'RAG', '微服务'],
    achievements: [
      '亿级数据检索：基于 ElasticSearch 设计分片策略与倒排索引优化，实现多维度关键字毫秒级查询；集成 Qdrant 向量数据库构建 RAG 检索增强，意图识别准确率 85%',
      '数据库架构升级：针对 MongoDB 内存告警（占用>90%），设计冷热数据分层方案，历史数据迁移至 ClickHouse，存储成本下降 70%，内存占用下降 60%',
      '高性能缓存：复杂报表查询优化，重构 SQL 索引+引入 Redis 缓存，查询耗时从 3s 降至 500ms；设计数据切换方案保障迁移过程业务连续性'
    ],
    metrics: [
      { value: '亿级', label: '数据量' },
      { value: '70%', label: '成本下降' },
      { value: '3s→500ms', label: '查询优化' }
    ]
  }
]

const highlights = [
  {
    title: 'eBPF 无侵入追踪',
    icon: '🔍',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: '对接 Beyla 探针开发 OTLP 接收器，实现从内核层到应用层的全链路监控，关键接口 P99 从 500ms 降至 80ms。'
  },
  {
    title: 'Flink 实时计算',
    icon: '⚡',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: '设计加盐打散+窗口聚合解决数据倾斜，实现秒级指标统计；RocksDB State Backend 容错，支撑日均百亿级日志处理。'
  },
  {
    title: 'JVM 字节码优化',
    icon: '🧬',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: 'Java Agent 运行时轻量级字节码修改替代静态插桩，覆盖率准确性提升至 95%+，降低运行时干扰 30%。'
  },
  {
    title: '高并发架构优化',
    icon: '🚀',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: '内存级 Trie 树+布隆过滤器替代数据库查询，单机 QPS 从 5 提升到 5000，实现 1000 倍性能提升。'
  },
  {
    title: '数据库架构治理',
    icon: '🗄️',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: 'MongoDB 迁移 ClickHouse 冷热数据分层方案，存储成本下降 70%，内存占用下降 60%，保障业务连续性。'
  },
  {
    title: '工程效能提升',
    icon: '📈',
    iconBg: 'bg-primary-100 text-primary-600',
    desc: 'AI 辅助代码审查与文档生成，效率提升 50%；建立 Git 统计与性能基线监控，制定 Code Review 规范。'
  }
]
</script>
