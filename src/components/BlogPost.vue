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
    
    <div class="post-content" v-html="renderedContent"></div>
    
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-white);
  border-radius: 1rem;
  box-shadow: var(--shadow);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--bg-light);
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  color: var(--text-gray);
  font-size: 0.9rem;
}

.post-date,
.post-author {
  font-weight: 500;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: var(--bg-light);
  color: var(--primary-blue);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-content {
  line-height: 1.8;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

/* Markdown 样式已移至全局样式文件 */

.post-footer {
  padding-top: 1rem;
  border-top: 2px solid var(--bg-light);
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .blog-post {
    padding: 1rem;
    margin: 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>