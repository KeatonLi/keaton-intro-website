<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <h1>你好，我是 Keaton</h1>
        <p>一名充满热情的 Java 工程师，专注于构建高质量的软件解决方案</p>
        <div class="hero-buttons">
          <router-link to="/portfolio" class="btn btn-primary">查看作品</router-link>
          <router-link to="/about" class="btn btn-outline">了解更多</router-link>
        </div>
      </div>
    </section>

    <!-- 个人介绍 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">个人简介</h2>
        <p class="section-subtitle">用代码创造价值，用技术改变世界</p>
        
        <div class="grid grid-2">
          <div class="card fade-in">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem; font-size: 1.5rem;">🎯 职业理念</h3>
            <p style="color: var(--text-gray); line-height: 1.6; margin-bottom: 1rem;">
              作为一名 Java 工程师，我始终相信技术的力量能够解决现实问题，创造真正的价值。
              我热衷于学习新技术，追求代码的优雅与高效，致力于构建稳定、可扩展的软件系统。
            </p>
            <p style="color: var(--text-gray); line-height: 1.6;">
              在我看来，编程不仅仅是写代码，更是一种思维方式和解决问题的艺术。
              每一行代码都承载着对用户体验的思考和对系统性能的追求。
            </p>
          </div>
          
          <div class="card fade-in">
            <h3 style="color: var(--primary-blue); margin-bottom: 1rem; font-size: 1.5rem;">🌟 技术追求</h3>
            <p style="color: var(--text-gray); line-height: 1.6; margin-bottom: 1rem;">
              我专注于 Java 生态系统的深度学习和实践，从 Spring 框架到微服务架构，
              从数据库优化到分布式系统设计，每一个技术领域都是我探索的方向。
            </p>
            <p style="color: var(--text-gray); line-height: 1.6;">
              同时，我也关注前端技术的发展，相信全栈能力能让我更好地理解整个系统的运作，
              为用户提供更完整、更优质的解决方案。
            </p>
          </div>
        </div>

        <div class="grid grid-3" style="margin-top: 3rem;">
          <div class="card fade-in text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">💡</div>
            <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">创新思维</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem;">保持对新技术的敏感度，勇于尝试和创新</p>
          </div>
          
          <div class="card fade-in text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔧</div>
            <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">工程实践</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem;">注重代码质量，遵循最佳实践和设计模式</p>
          </div>
          
          <div class="card fade-in text-center">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
            <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem;">团队合作</h4>
            <p style="color: var(--text-gray); font-size: 0.9rem;">善于沟通协作，乐于分享知识和经验</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈展示 -->
    <section class="section" style="background: var(--bg-white);">
      <div class="container">
        <h2 class="section-title">技术栈</h2>
        <p class="section-subtitle">掌握的核心技术和工具</p>
        
        <div class="tech-stack">
          <div class="tech-category">
            <h3>后端技术</h3>
            <div class="tech-tags">
              <span class="tech-tag">Java</span>
              <span class="tech-tag">Spring Boot</span>
              <span class="tech-tag">Spring Cloud</span>
              <span class="tech-tag">MyBatis</span>
              <span class="tech-tag">JPA</span>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>数据库</h3>
            <div class="tech-tags">
              <span class="tech-tag">MySQL</span>
              <span class="tech-tag">Redis</span>
              <span class="tech-tag">MongoDB</span>
              <span class="tech-tag">Elasticsearch</span>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>前端技术</h3>
            <div class="tech-tags">
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">React</span>
              <span class="tech-tag">JavaScript</span>
              <span class="tech-tag">TypeScript</span>
            </div>
          </div>
          
          <div class="tech-category">
            <h3>工具与部署</h3>
            <div class="tech-tags">
              <span class="tech-tag">Docker</span>
              <span class="tech-tag">Kubernetes</span>
              <span class="tech-tag">Git</span>
              <span class="tech-tag">Maven</span>
              <span class="tech-tag">Jenkins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
      
      document.querySelectorAll('.card').forEach(card => {
        observer.observe(card)
      })
    }
  }
}
</script>

<style scoped>
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tech-category h3 {
  color: var(--primary-blue);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--bg-light);
  color: var(--primary-blue);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: var(--primary-blue);
  color: white;
  transform: translateY(-2px);
}

.text-center {
  text-align: center;
}
</style>