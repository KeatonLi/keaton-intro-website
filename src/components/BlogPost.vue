<template>
  <div class="blog-post-container">
    <!-- 目录侧边栏 -->
    <aside class="table-of-contents" :class="{ 'toc-visible': tocVisible }">
      <div class="toc-header" @click="toggleToc">
        <h3 class="toc-title">📋 文章目录</h3>
        <button class="toc-toggle" :class="{ collapsed: !tocVisible }">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <nav class="toc-nav" :class="{ collapsed: !tocVisible }" v-if="tableOfContents.length > 0">
        <ul class="toc-list">
          <li 
            v-for="(item, index) in tableOfContents" 
            :key="index"
            class="toc-item"
            :class="`toc-level-${item.level}`"
          >
            <a 
              :href="`#${item.id}`" 
              class="toc-link"
              :class="{ 'toc-active': activeHeading === item.id }"
              @click="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
      <div v-else class="toc-empty">
        <p>暂无目录</p>
      </div>
    </aside>

    <!-- 主要内容区域 -->
    <article class="blog-post">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-author">作者：{{ post.author }}</span>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </header>
      
      <div class="post-content blog-content" v-html="renderedContent" ref="contentRef"></div>
      
      <footer class="post-footer" v-if="showBackButton">
        <div class="post-navigation">
          <button @click="$emit('back')" class="btn btn-outline">
            ← 返回博客列表
          </button>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import { renderMarkdown } from '../utils/markdown.js'

export default {
  name: 'BlogPost',
  props: {
    post: {
      type: Object,
      required: true
    },
    showBackButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['back'],
  data() {
    return {
      tableOfContents: [],
      activeHeading: '',
      tocVisible: true,
      observer: null
    }
  },
  computed: {
    renderedContent() {
      return renderMarkdown(this.post.content)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.generateTableOfContents()
      this.setupScrollSpy()
    })
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    // 生成目录
    generateTableOfContents() {
      if (!this.$refs.contentRef) return
      
      const headings = this.$refs.contentRef.querySelectorAll('h1, h2, h3, h4, h5, h6')
      this.tableOfContents = []
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent.trim()
        const id = `heading-${index}`
        
        // 为标题添加ID
        heading.id = id
        
        this.tableOfContents.push({
          id,
          text,
          level,
          element: heading
        })
      })
    },
    
    // 设置滚动监听
    setupScrollSpy() {
      if (!this.tableOfContents.length) return
      
      const options = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeHeading = entry.target.id
          }
        })
      }, options)
      
      this.tableOfContents.forEach(item => {
        if (item.element) {
          this.observer.observe(item.element)
        }
      })
    },
    
    // 滚动到指定标题
    scrollToHeading(id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    
    // 切换目录显示
    toggleToc() {
      this.tocVisible = !this.tocVisible
    }
  },
  
  watch: {
    post: {
      handler() {
        this.$nextTick(() => {
          this.generateTableOfContents()
          this.setupScrollSpy()
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* 容器布局 */
.blog-post-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
  height: 100vh;
  overflow: hidden;
}

/* 目录侧边栏 */
.table-of-contents {
  width: 280px;
  min-width: 280px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  height: calc(100vh - 4rem);
  overflow-y: auto;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.toc-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 16px 16px 0 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toc-header:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
}

.toc-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0;
}

.toc-toggle {
  background: none;
  border: none;
  color: var(--primary-blue);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toc-toggle:hover {
  background: rgba(102, 126, 234, 0.1);
}

.toc-toggle svg {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toc-toggle.collapsed svg {
  transform: rotate(-90deg);
}

.toc-toggle:active {
  transform: scale(0.95);
}

.toc-nav {
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toc-nav.collapsed {
  flex: 0;
  min-height: 0;
  padding: 0;
  opacity: 0;
  transform: translateY(-15px) scale(0.95);
  pointer-events: none;
  overflow: hidden;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0;
}

.toc-link {
  display: block;
  padding: 0.5rem 1.5rem;
  color: var(--text-gray);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.toc-link:hover {
  color: var(--primary-blue);
  background: rgba(102, 126, 234, 0.05);
  border-left-color: rgba(102, 126, 234, 0.3);
}

.toc-link.toc-active {
  color: var(--primary-blue);
  background: rgba(102, 126, 234, 0.1);
  border-left-color: var(--primary-blue);
  font-weight: 600;
}

/* 不同级别的标题缩进 */
.toc-level-1 .toc-link { padding-left: 1.5rem; font-weight: 600; }
.toc-level-2 .toc-link { padding-left: 2rem; }
.toc-level-3 .toc-link { padding-left: 2.5rem; font-size: 0.85rem; }
.toc-level-4 .toc-link { padding-left: 3rem; font-size: 0.85rem; }
.toc-level-5 .toc-link { padding-left: 3.5rem; font-size: 0.8rem; }
.toc-level-6 .toc-link { padding-left: 4rem; font-size: 0.8rem; }

.toc-empty {
  padding: 2rem 1.5rem;
  text-align: center;
  color: var(--text-gray);
  font-size: 0.9rem;
}

/* 主要内容区域 */
.blog-post {
  flex: 1;
  max-width: none;
  margin: 0;
  padding: 4rem 3.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
  border-radius: 32px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(25px);
  position: relative;
  height: calc(100vh - 4rem);
  overflow-y: auto;
}

.blog-post::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 15% 25%, rgba(102, 126, 234, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 85% 75%, rgba(118, 75, 162, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.blog-post > * {
  position: relative;
  z-index: 1;
}

.post-header {
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 3px solid var(--gray-100);
  text-align: center;
  position: relative;
}

.post-header::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-blue), var(--blue-600), var(--accent-blue));
  border-radius: 2px;
}

.post-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  font-size: 1rem;
  font-weight: 500;
}

.post-date,
.post-author {
  font-weight: 500;
}

.post-tags {
  display: flex;
  gap: var(--space-sm);
}

.tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  color: var(--primary-blue);
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.tag:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.25);
}

/* post-content 样式由全局 blog-content 类提供 */
.post-content {
  margin-bottom: var(--space-3xl);
}

.post-footer {
  padding-top: var(--space-lg);
  border-top: 2px solid var(--gray-100);
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--blue-600) 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  background: linear-gradient(135deg, var(--blue-700) 0%, var(--blue-800) 100%);
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.btn-outline:hover {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--blue-600) 100%);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .blog-post-container {
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .table-of-contents {
    width: 250px;
    min-width: 250px;
  }
  
  .blog-post {
    padding: 3rem 2.5rem;
  }
}

@media (max-width: 768px) {
  .blog-post-container {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
  
  .table-of-contents {
    width: 100%;
    min-width: auto;
    position: static;
    order: -1;
    max-height: 300px;
  }
  
  .table-of-contents:not(.toc-visible) {
    max-height: 60px;
    overflow: hidden;
  }
  
  .toc-nav {
    display: none;
  }
  
  .toc-visible .toc-nav {
    display: block;
  }
  
  .blog-post {
    padding: 2rem 1.5rem;
    margin: 0;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .post-content {
    font-size: 1rem;
  }
  
  /* 移动端目录项样式调整 */
  .toc-level-1 .toc-link { padding-left: 1rem; }
  .toc-level-2 .toc-link { padding-left: 1.5rem; }
  .toc-level-3 .toc-link { padding-left: 2rem; }
  .toc-level-4 .toc-link { padding-left: 2.5rem; }
  .toc-level-5 .toc-link { padding-left: 3rem; }
  .toc-level-6 .toc-link { padding-left: 3.5rem; }
}

@media (max-width: 480px) {
  .blog-post {
    padding: 1.5rem 1rem;
  }
  
  .post-title {
    font-size: 1.75rem;
  }
  
  .toc-header {
    padding: 1rem;
  }
  
  .toc-title {
    font-size: 1rem;
  }
}
</style>