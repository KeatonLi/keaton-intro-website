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
    
    <footer class="post-footer">
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
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-3xl);
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
}

.post-header {
  margin-bottom: var(--space-3xl);
  padding-bottom: var(--space-lg);
  border-bottom: 2px solid var(--gray-100);
}

.post-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  align-items: center;
  color: var(--text-tertiary);
  font-size: 1rem;
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
  background: var(--blue-50);
  color: var(--blue-700);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-lg);
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid var(--blue-200);
  transition: all var(--transition-fast);
}

.tag:hover {
  background: var(--blue-100);
  border-color: var(--blue-300);
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
  background: var(--primary-blue);
  color: white;
  border: none;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  box-shadow: var(--shadow-md);
  text-decoration: none;
}

.btn:hover {
  background: var(--blue-700);
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.btn-outline {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
}

.btn-outline:hover {
  background: var(--primary-blue);
  color: white;
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