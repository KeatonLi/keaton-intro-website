<template>
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
    
    <div class="post-content blog-content" v-html="renderedContent"></div>
    
    <footer class="post-footer" v-if="showBackButton">
      <div class="post-navigation">
        <button @click="$emit('back')" class="btn btn-outline">
          ← 返回博客列表
        </button>
      </div>
    </footer>
  </article>
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
  computed: {
    renderedContent() {
      return renderMarkdown(this.post.content)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.blog-post {
  max-width: 950px;
  margin: 0 auto;
  padding: 4rem 3.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
  border-radius: 32px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(25px);
  position: relative;
  overflow: hidden;
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

@media (max-width: 768px) {
  .blog-post {
    padding: var(--space-xl);
    margin: 0 var(--space-md);
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
  
  .post-content {
    font-size: 1rem;
  }
}
</style>