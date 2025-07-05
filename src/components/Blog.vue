<template>
  <div class="blog-container">
    <!-- 博客列表视图 -->
    <div v-if="currentView === 'list'" class="blog-list-view">
      <div class="blog-header">
        <h1 class="blog-title">技术博客</h1>
        <p class="blog-subtitle">分享技术心得与实践经验</p>
      </div>
      
      <!-- 标签过滤 -->
      <div class="tag-filter">
        <button 
          :class="['tag-btn', { active: selectedTag === '' }]"
          @click="filterByTag('')"
        >
          全部
        </button>
        <button 
          v-for="tag in allTags" 
          :key="tag"
          :class="['tag-btn', { active: selectedTag === tag }]"
          @click="filterByTag(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <!-- 文章列表 -->
      <div class="posts-grid">
        <article 
          v-for="post in filteredPosts" 
          :key="post.id"
          class="post-card"
          @click="viewPost(post)"
        >
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-author">{{ post.author }}</span>
          </div>
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-tags">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
          <div class="read-more">
            阅读全文 →
          </div>
        </article>
      </div>
    </div>

    <!-- 文章详情视图 -->
    <div v-else-if="currentView === 'post'" class="blog-post-view">
      <div class="post-header">
        <button class="back-btn" @click="backToList">
          ← 返回博客列表
        </button>
        <div class="post-info">
          <h1 class="post-title">{{ currentPost.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(currentPost.date) }}</span>
            <span class="post-author">作者：{{ currentPost.author }}</span>
          </div>
          <div class="post-tags">
            <span 
              v-for="tag in currentPost.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="post-content" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { blogPosts } from '../data/blogPosts.js'
import { markdownRenderer } from '../utils/markdown.js'

export default {
  name: 'Blog',
  setup() {
    const currentView = ref('list') // 'list' | 'post'
    const currentPost = ref(null)
    const selectedTag = ref('')
    const posts = ref(blogPosts)

    // 获取所有标签
    const allTags = computed(() => {
      const tags = new Set()
      posts.value.forEach(post => {
        post.tags.forEach(tag => tags.add(tag))
      })
      return Array.from(tags).sort()
    })

    // 过滤后的文章
    const filteredPosts = computed(() => {
      if (!selectedTag.value) {
        return posts.value
      }
      return posts.value.filter(post => 
        post.tags.includes(selectedTag.value)
      )
    })

    // 渲染的Markdown内容
    const renderedContent = computed(() => {
      if (!currentPost.value) return ''
      return markdownRenderer.render(currentPost.value.content)
    })

    // 方法
    const filterByTag = (tag) => {
      selectedTag.value = tag
    }

    const viewPost = (post) => {
      currentPost.value = post
      currentView.value = 'post'
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const backToList = () => {
      currentView.value = 'list'
      currentPost.value = null
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      currentView,
      currentPost,
      selectedTag,
      posts,
      allTags,
      filteredPosts,
      renderedContent,
      filterByTag,
      viewPost,
      backToList,
      formatDate
    }
  }
}
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 博客头部 */
.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* 标签过滤 */
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.tag-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tag-btn:hover,
.tag-btn.active {
  background: var(--primary-color);
  color: white;
}

/* 文章网格 */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e1e5e9;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.post-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f0f8ff;
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 0.9rem;
}

/* 文章详情视图 */
.blog-post-view {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 2rem;
}

.back-btn {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #0056b3;
}

.post-info .post-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.post-info .post-meta {
  margin-bottom: 1rem;
  gap: 1rem;
}

.post-info .post-tags {
  margin-bottom: 0;
}

/* 文章内容样式 */
.post-content {
  line-height: 1.8;
  color: #333;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.post-content :deep(h1) {
  font-size: 2rem;
  border-bottom: 2px solid #e1e5e9;
  padding-bottom: 0.5rem;
}

.post-content :deep(h2) {
  font-size: 1.6rem;
}

.post-content :deep(h3) {
  font-size: 1.3rem;
}

.post-content :deep(p) {
  margin-bottom: 1rem;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
}

.post-content :deep(code) {
  background: #f1f3f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.post-content :deep(pre) {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.post-content :deep(th),
.post-content :deep(td) {
  border: 1px solid #e1e5e9;
  padding: 0.75rem;
  text-align: left;
}

.post-content :deep(th) {
  background: #f8f9fa;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .post-card {
    padding: 1.25rem;
  }
  
  .tag-filter {
    justify-content: flex-start;
  }
  
  .post-info .post-title {
    font-size: 1.8rem;
  }
}
</style>