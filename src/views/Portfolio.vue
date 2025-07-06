<template>
  <div class="portfolio-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">作品集</h1>
        <p class="page-subtitle">这里展示了我参与开发的一些项目和技术成果</p>
      </div>
    </section>

    <!-- 项目展示 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">技术项目</h2>
        <p class="section-subtitle">参与开发的核心项目</p>
        
        <div class="grid grid-3">
          <div class="card fade-in">
            <div class="project-image project-image-enterprise">🏢</div>
            <h3 class="project-title">企业管理系统</h3>
            <p class="project-description">基于 Spring Boot 开发的企业级管理系统，支持用户管理、权限控制、数据统计等功能。</p>
            <div class="tech-tags-container">
              <span class="tech-tag">Spring Boot</span>
              <span class="tech-tag">MySQL</span>
              <span class="tech-tag">Vue.js</span>
            </div>
            <div class="project-features">
              <h4>核心功能：</h4>
              <ul>
                <li>用户权限管理</li>
                <li>数据报表生成</li>
                <li>实时消息通知</li>
                <li>系统监控面板</li>
              </ul>
            </div>
          </div>
          
          <div class="card fade-in">
            <div style="height: 200px; background: linear-gradient(135deg, var(--light-blue), var(--primary-blue)); border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">🛒</div>
            <h3 style="color: var(--primary-blue); margin-bottom: 0.5rem;">电商平台后端</h3>
            <p style="color: var(--text-gray); margin-bottom: 1rem;">高并发电商平台后端服务，采用微服务架构，支持订单处理、支付集成、库存管理。</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Spring Cloud</span>
              <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Redis</span>
              <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">RabbitMQ</span>
            </div>
            <div class="project-features">
              <h4>技术亮点：</h4>
              <ul>
                <li>分布式事务处理</li>
                <li>高并发秒杀系统</li>
                <li>智能推荐算法</li>
                <li>实时数据同步</li>
              </ul>
            </div>
          </div>
          
          <div class="card fade-in">
            <div class="project-image project-image-microservice">🌐</div>
            <h3 class="project-title">微服务架构</h3>
            <p class="project-description">基于 Spring Cloud 的微服务架构，实现服务治理、配置管理、链路追踪等功能。</p>
            <div class="tech-tags-container">
              <span class="tech-tag">Spring Cloud</span>
              <span class="tech-tag">Nacos</span>
              <span class="tech-tag">Gateway</span>
            </div>
            <div class="project-features">
              <h4>技术特点：</h4>
              <ul>
                <li>服务注册与发现</li>
                <li>配置中心管理</li>
                <li>API网关路由</li>
                <li>分布式链路追踪</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片展示 -->
    <section class="section" style="background: var(--bg-white);">
      <div class="container">
        <h2 class="section-title">工作瞬间</h2>
        <p class="section-subtitle">记录工作和生活中的精彩瞬间</p>
        
        <div class="grid grid-3">
          <div class="card fade-in" v-for="(image, index) in galleryImages" :key="index">
            <div :style="{ height: '250px', background: image.gradient, borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '4rem' }">
              {{ image.icon }}
            </div>
            <h3 style="color: var(--primary-blue); margin-bottom: 0.5rem;">{{ image.title }}</h3>
            <p style="color: var(--text-gray);">{{ image.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术成就 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">技术成就</h2>
        <p class="section-subtitle">在技术道路上的重要里程碑</p>
        
        <div class="achievements-timeline">
          <div class="achievement-item fade-in" v-for="(achievement, index) in achievements" :key="index">
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-content">
              <h3>{{ achievement.title }}</h3>
              <p class="achievement-date">{{ achievement.date }}</p>
              <p>{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 开源贡献 -->
    <section class="section" style="background: var(--bg-white);">
      <div class="container">
        <h2 class="section-title">开源贡献</h2>
        <p class="section-subtitle">参与的开源项目和技术分享</p>
        
        <div class="grid grid-2">
          <div class="card fade-in">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">🔧 工具库开发</h3>
            <p style="color: var(--text-gray); margin-bottom: 1rem;">开发了多个实用的 Java 工具库，简化日常开发工作，提高代码复用性。</p>
            <ul style="color: var(--text-gray); padding-left: 1rem;">
              <li>通用数据校验工具</li>
              <li>Redis 缓存封装库</li>
              <li>API 文档生成工具</li>
            </ul>
          </div>
          
          <div class="card fade-in">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem;">📝 技术博客</h3>
            <p style="color: var(--text-gray); margin-bottom: 1rem;">定期分享技术心得和项目经验，帮助其他开发者解决实际问题。</p>
            <ul style="color: var(--text-gray); padding-left: 1rem;">
              <li>Spring Boot 最佳实践</li>
              <li>微服务架构设计</li>
              <li>性能优化技巧</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      galleryImages: [
        {
          icon: '💻',
          title: '编程时光',
          description: '专注于代码开发，享受解决问题的乐趣',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          icon: '🎯',
          title: '技术分享',
          description: '参与技术会议，分享开发经验和最佳实践',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          icon: '🌟',
          title: '项目成果',
          description: '成功交付的项目，见证技术成长的足迹',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          icon: '📚',
          title: '学习笔记',
          description: '持续学习新技术，记录知识积累的过程',
          gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
          icon: '🤝',
          title: '团队协作',
          description: '与优秀的团队成员一起工作，共同成长',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
          icon: '🚀',
          title: '技术探索',
          description: '探索前沿技术，保持对新事物的好奇心',
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        }
      ],
      achievements: [
        {
          icon: '🏆',
          title: '架构师认证',
          date: '2023年',
          description: '获得 Java 架构师认证，具备大型系统设计能力'
        },
        {
          icon: '🎖️',
          title: '技术团队负责人',
          date: '2022年',
          description: '担任技术团队负责人，带领团队完成多个重要项目'
        },
        {
          icon: '📈',
          title: '性能优化专家',
          date: '2021年',
          description: '成功优化系统性能，响应时间提升 300%'
        },
        {
          icon: '🌐',
          title: '微服务架构实践',
          date: '2020年',
          description: '主导公司微服务架构转型，提升系统可扩展性'
        }
      ]
    }
  },
  mounted() {
    this.observeElements()
  },
  methods: {
    observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s'
            entry.target.classList.add('fade-in')
          }
        })
      }, { threshold: 0.1 })
      
      document.querySelectorAll('.card, .achievement-item').forEach(item => {
        observer.observe(item)
      })
    }
  }
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: white;
  padding: 4rem 0 2rem;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.project-features {
  margin-top: 1rem;
}

.project-features h4 {
  color: var(--primary-blue);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.project-features ul {
  list-style: none;
  padding: 0;
}

.project-features li {
  color: var(--text-gray);
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
  position: relative;
}

.project-features li::before {
  content: '•';
  color: var(--primary-blue);
  position: absolute;
  left: 0;
}

.achievements-timeline {
  max-width: 800px;
  margin: 2rem auto 0;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.achievement-item:hover {
  transform: translateY(-5px);
}

.achievement-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.achievement-content h3 {
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.achievement-date {
  color: var(--accent-blue);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.achievement-content p:last-child {
  color: var(--text-gray);
  line-height: 1.6;
}
</style>