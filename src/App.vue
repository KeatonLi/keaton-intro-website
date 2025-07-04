<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <a href="#" class="logo">Keaton</a>
        <ul class="nav-menu">
          <li><a href="#home" class="nav-link" :class="{ active: activeSection === 'home' }" @click="scrollToSection('home')">首页</a></li>
          <li><a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }" @click="scrollToSection('about')">关于我</a></li>
          <li><a href="#portfolio" class="nav-link" :class="{ active: activeSection === 'portfolio' }" @click="scrollToSection('portfolio')">作品集</a></li>
          <li><a href="#gallery" class="nav-link" :class="{ active: activeSection === 'gallery' }" @click="scrollToSection('gallery')">图片展示</a></li>
        </ul>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 英雄区域 -->
      <section id="home" class="hero">
        <div class="container">
          <h1>你好，我是 Keaton</h1>
          <p>一名充满热情的 Java 工程师，专注于构建高质量的软件解决方案</p>
          <div class="hero-buttons">
            <a href="#portfolio" class="btn btn-primary" @click="scrollToSection('portfolio')">查看作品</a>
            <a href="#about" class="btn btn-outline" @click="scrollToSection('about')">了解更多</a>
          </div>
        </div>
      </section>

      <!-- 关于我 -->
      <section id="about" class="section">
        <div class="container">
          <h2 class="section-title">关于我</h2>
          <p class="section-subtitle">专业的 Java 工程师，拥有丰富的后端开发经验</p>
          
          <div class="grid grid-2">
            <div class="card fade-in">
              <h3 style="color: var(--primary-blue); margin-bottom: 1rem; font-size: 1.5rem;">🚀 技术专长</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  Java 企业级应用开发
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  Spring Boot / Spring Cloud
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  微服务架构设计
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  数据库设计与优化
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  前端技术 (Vue.js, React)
                </li>
              </ul>
            </div>
            
            <div class="card fade-in">
              <h3 style="color: var(--primary-blue); margin-bottom: 1rem; font-size: 1.5rem;">💼 工作经验</h3>
              <p style="color: var(--text-gray); margin-bottom: 1rem;">作为一名经验丰富的 Java 工程师，我专注于：</p>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  高并发系统架构设计
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  代码质量与性能优化
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  团队协作与技术分享
                </li>
                <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
                  <span style="position: absolute; left: 0; color: var(--primary-blue);">•</span>
                  持续学习新技术
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 作品集 -->
      <section id="portfolio" class="section" style="background: var(--bg-white);">
        <div class="container">
          <h2 class="section-title">作品集</h2>
          <p class="section-subtitle">这里展示了我参与开发的一些项目和技术成果</p>
          
          <div class="grid grid-3">
            <div class="card fade-in">
              <div style="height: 200px; background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue)); border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">🏢</div>
              <h3 style="color: var(--primary-blue); margin-bottom: 0.5rem;">企业管理系统</h3>
              <p style="color: var(--text-gray); margin-bottom: 1rem;">基于 Spring Boot 开发的企业级管理系统，支持用户管理、权限控制、数据统计等功能。</p>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Spring Boot</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">MySQL</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Vue.js</span>
              </div>
            </div>
            
            <div class="card fade-in">
              <div style="height: 200px; background: linear-gradient(135deg, var(--light-blue), var(--primary-blue)); border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">🛒</div>
              <h3 style="color: var(--primary-blue); margin-bottom: 0.5rem;">电商平台后端</h3>
              <p style="color: var(--text-gray); margin-bottom: 1rem;">高并发电商平台后端服务，采用微服务架构，支持订单处理、支付集成、库存管理。</p>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Spring Cloud</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Redis</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">RabbitMQ</span>
              </div>
            </div>
            
            <div class="card fade-in">
              <div style="height: 200px; background: linear-gradient(135deg, var(--accent-blue), var(--light-blue)); border-radius: 0.5rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">📊</div>
              <h3 style="color: var(--primary-blue); margin-bottom: 0.5rem;">数据分析平台</h3>
              <p style="color: var(--text-gray); margin-bottom: 1rem;">实时数据处理和分析平台，提供数据可视化、报表生成、预警系统等功能。</p>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Apache Kafka</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Elasticsearch</span>
                <span style="background: var(--bg-light); color: var(--primary-blue); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 图片展示 -->
      <section id="gallery" class="section">
        <div class="container">
          <h2 class="section-title">图片展示</h2>
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
    </main>

    <!-- 页脚 -->
    <footer style="background: var(--text-dark); color: white; padding: 2rem 0; text-align: center;">
      <div class="container">
        <p>&copy; 2024 Keaton. 专业的 Java 工程师 | 用心构建每一行代码</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeSection: 'home',
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
      ]
    }
  },
  mounted() {
    // 监听滚动事件，更新活动导航
    window.addEventListener('scroll', this.handleScroll)
    
    // 添加滚动动画
    this.observeElements()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop - 80 // 考虑导航栏高度
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    },
    
    handleScroll() {
      const sections = ['home', 'about', 'portfolio', 'gallery']
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop) {
          this.activeSection = sections[i]
          break
        }
      }
    },
    
    observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s'
            entry.target.classList.add('fade-in')
          }
        })
      }, { threshold: 0.1 })
      
      // 观察所有卡片元素
      document.querySelectorAll('.card').forEach(card => {
        observer.observe(card)
      })
    }
  }
}
</script>