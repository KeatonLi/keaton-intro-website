<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">关于我</h1>
        <p class="page-subtitle">专业的 Java 工程师，拥有丰富的后端开发经验</p>
      </div>
    </section>

    <!-- 主要内容 -->
    <section class="section">
      <div class="container">
        <div class="grid grid-2">
          <div class="card fade-in">
            <h3 class="skill-card-title">🚀 技术专长</h3>
            <ul class="skill-list">
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                Java 企业级应用开发
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                Spring Boot / Spring Cloud
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                微服务架构设计
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                数据库设计与优化
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                前端技术 (Vue.js, React)
              </li>
            </ul>
          </div>
          
          <div class="card fade-in">
            <h3 class="skill-card-title">💼 工作经验</h3>
            <p class="skill-card-text">作为一名经验丰富的 Java 工程师，我专注于：</p>
            <ul class="skill-list">
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                高并发系统架构设计
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                代码质量与性能优化
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                团队协作与技术分享
              </li>
              <li class="skill-list-item">
                <span class="skill-list-bullet">•</span>
                持续学习新技术
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 详细介绍 -->
    <section class="section section-white">
      <div class="container">
        <h2 class="section-title">我的故事</h2>
        <div class="story-content">
          <div class="story-item fade-in">
            <div class="story-icon">🎓</div>
            <div class="story-text">
              <h3>学习之路</h3>
              <p>从计算机科学专业毕业后，我就被编程的魅力深深吸引。Java 作为我的第一门编程语言，让我领略到了面向对象编程的优雅和强大。通过不断的学习和实践，我逐渐掌握了从基础语法到高级特性的各个方面。</p>
            </div>
          </div>
          
          <div class="story-item fade-in">
            <div class="story-icon">💻</div>
            <div class="story-text">
              <h3>职业发展</h3>
              <p>在职业生涯中，我参与了多个大型项目的开发，从传统的单体应用到现代的微服务架构，从简单的 CRUD 操作到复杂的分布式系统设计。每一个项目都让我学到了新的知识，积累了宝贵的经验。</p>
            </div>
          </div>
          
          <div class="story-item fade-in">
            <div class="story-icon">🌱</div>
            <div class="story-text">
              <h3>持续成长</h3>
              <p>技术日新月异，我始终保持学习的热情。从 Spring 框架的深入研究到云原生技术的探索，从性能优化的实践到架构设计的思考，我相信只有不断学习才能在这个快速发展的行业中保持竞争力。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能评估 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">技能评估</h2>
        <p class="section-subtitle">基于项目经验和实际应用的技能水平</p>
        
        <div class="skills-grid">
          <div class="skill-item fade-in" v-for="skill in skills" :key="skill.name">
            <div class="skill-info">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="section section-white">
      <div class="container">
        <h2 class="section-title">联系我</h2>
        <p class="section-subtitle">欢迎与我交流技术话题或合作机会</p>
        
        <div class="contact-grid">
          <div class="contact-item fade-in">
            <div class="contact-icon">📧</div>
            <h3>邮箱</h3>
            <p>keaton@example.com</p>
          </div>
          
          <div class="contact-item fade-in">
            <div class="contact-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/keaton</p>
          </div>
          
          <div class="contact-item fade-in">
            <div class="contact-icon">🐙</div>
            <h3>GitHub</h3>
            <p>github.com/keaton</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      skills: [
        { name: 'Java', level: 95 },
        { name: 'Spring Boot', level: 90 },
        { name: 'Spring Cloud', level: 85 },
        { name: 'MySQL', level: 88 },
        { name: 'Redis', level: 82 },
        { name: 'Vue.js', level: 78 },
        { name: 'Docker', level: 80 },
        { name: 'Kubernetes', level: 75 }
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
      
      document.querySelectorAll('.card, .story-item, .skill-item, .contact-item').forEach(item => {
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

.story-content {
  max-width: 800px;
  margin: 0 auto;
}

.story-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.story-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.story-text h3 {
  color: var(--primary-blue);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.story-text p {
  color: var(--text-gray);
  line-height: 1.6;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.skill-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: var(--text-dark);
}

.skill-level {
  color: var(--primary-blue);
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: var(--bg-light);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-blue), var(--accent-blue));
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.contact-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-item h3 {
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.contact-item p {
  color: var(--text-gray);
}
</style>