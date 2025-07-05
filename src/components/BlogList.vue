<template>
  <div class="blog-list">
    <header class="blog-header">
      <div class="header-content">
        <h1 class="blog-title">技术博客</h1>
        <p class="blog-subtitle">分享技术心得，记录成长足迹</p>
      </div>
      

    </header>
    

    <div class="posts-container">
      <article 
        v-for="post in posts" 
        :key="post.id"
        class="post-item"
        @click="$emit('select-post', post)"
      >
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <div class="post-tags">
              <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
              <span v-if="post.tags.length > 2" class="tag-more">+{{ post.tags.length - 2 }}</span>
            </div>
          </div>
          
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          
          <div class="post-action">
            <span class="read-more">阅读文章</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </article>
    </div>
    
    <div v-if="posts.length === 0" class="no-posts">
      <div class="no-posts-content">
        <svg class="no-posts-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select-post'],
  data() {
    return {}
  },
  computed: {},
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
/* 使用全局CSS变量，只定义组件特有的变量 */

.blog-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
  backdrop-filter: blur(25px);
  border-radius: 32px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.blog-list::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.blog-list > * {
  position: relative;
  z-index: 1;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--gray-200);
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.blog-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  background: var(--bg-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.blog-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.6;
}

/* 两列文章网格 */
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.post-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(102, 126, 234, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06), 0 3px 10px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
}

.post-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-blue), var(--blue-600), var(--accent-blue));
  transform: scaleX(0);
  transition: transform 0.3s ease;
  border-radius: 20px 20px 0 0;
}

.post-item:hover {
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.15);
}

.post-item:hover::before {
  transform: scaleX(1);
}

.post-content {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
  position: relative;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-date {
  color: var(--text-tertiary);
  font-size: 0.85rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  padding: 0.4rem 1rem;
  border-radius: 25px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.post-date:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.12) 100%);
  border-color: rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}

.post-tags {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  color: var(--primary-blue);
  padding: 0.35rem 0.9rem;
  border-radius: 25px;
  font-size: 0.8rem;
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

.tag-more {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-tertiary);
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.015em;
  transition: color 0.3s ease;
}

.post-item:hover .post-title {
  color: var(--primary-blue);
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.05rem;
  flex-grow: 1;
  font-weight: 400;
}

.post-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.read-more {
  color: var(--primary-blue);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arrow-icon {
  color: var(--primary-blue);
  transition: all 0.3s ease;
  width: 18px;
  height: 18px;
}

.post-item:hover .read-more,
.post-item:hover .arrow-icon {
  color: var(--blue-600);
}

.post-item:hover .arrow-icon {
  transform: translateX(6px);
}

/* 空状态设计 */
.no-posts {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin-top: 2rem;
}

.no-posts-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}

.no-posts-icon {
  color: var(--text-tertiary);
  opacity: 0.7;
  width: 64px;
  height: 64px;
}

.no-posts p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
}
/* 响应式设计 */
@media (max-width: 768px) {
  .blog-list {
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 20px;
  }

  .blog-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  .blog-title {
    font-size: clamp(2rem, 6vw, 2.5rem);
    margin-bottom: 0.75rem;
  }

  .blog-subtitle {
    font-size: 1rem;
  }

  .posts-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .post-content {
    padding: 1.5rem;
    gap: 0.75rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .post-date {
    font-size: 0.85rem;
    padding: 0.2rem 0.6rem;
  }

  .post-title {
    font-size: 1.2rem;
    line-height: 1.3;
  }

  .post-excerpt {
    font-size: 0.95rem;
    -webkit-line-clamp: 2;
  }

  .post-item:hover {
    transform: translateY(-8px) scale(1.01);
  }

  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
  }

  .tag-more {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }

  .post-action {
    padding-top: 0.75rem;
  }

  .read-more {
    font-size: 0.9rem;
  }

  .arrow-icon {
    width: 16px;
    height: 16px;
  }

  .no-posts {
    padding: 3rem 1.5rem;
    margin-top: 1.5rem;
  }

  .no-posts-icon {
    width: 48px;
    height: 48px;
  }

  .no-posts p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .blog-list {
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 16px;
  }

  .blog-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }

  .blog-title {
    font-size: clamp(1.75rem, 8vw, 2rem);
    margin-bottom: 0.5rem;
  }

  .blog-subtitle {
    font-size: 0.9rem;
  }

  .posts-container {
    gap: 1rem;
  }

  .post-content {
    padding: 1.25rem;
    gap: 0.6rem;
  }

  .post-meta {
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .post-date {
    font-size: 0.8rem;
    padding: 0.15rem 0.5rem;
  }

  .post-title {
    font-size: 1.1rem;
  }

  .post-excerpt {
    font-size: 0.9rem;
  }

  .tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }

  .tag-more {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }

  .post-action {
    padding-top: 0.5rem;
  }

  .read-more {
    font-size: 0.85rem;
  }

  .arrow-icon {
    width: 14px;
    height: 14px;
  }

  .no-posts {
    padding: 2rem 1rem;
  }

  .no-posts-icon {
    width: 40px;
    height: 40px;
  }

  .no-posts p {
    font-size: 0.9rem;
  }
}
</style>