<template>
  <div class="blog-page">
    <!-- 文档风格布局 -->
    <div class="docs-layout">
      <!-- 左侧目录导航 -->
      <aside class="docs-sidebar">
        <div class="sidebar-header">
          <h2 class="sidebar-title">技术文档</h2>
          <div class="sidebar-subtitle">{{ posts.length }} 篇文章</div>
        </div>
        
        <!-- 搜索框 -->
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索文档..."
            class="search-input"
          />
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        
        <!-- 文档目录 -->
        <div class="doc-categories">
          <div class="category-title">文档目录</div>
          <div class="category-list">
            <div class="category-item">
              <ul class="doc-list">
                <li 
                  v-for="post in filteredPosts" 
                  :key="post.id"
                  class="doc-item"
                  :class="{ active: currentPost?.id === post.id }"
                  @click="selectPost(post)"
                >
                  <span class="doc-title">{{ post.title }}</span>
                  <span class="doc-date">{{ formatDate(post.date) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

      </aside>
      
      <!-- 右侧内容区域 -->
      <main class="docs-content">
        <!-- 欢迎页面 -->
        <div v-if="!currentPost" class="welcome-content">
          <div class="welcome-header">
            <h1 class="welcome-title">欢迎来到技术文档中心</h1>
            <p class="welcome-subtitle">选择左侧文档开始阅读，探索技术知识的海洋</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ posts.length }}</div>
              <div class="stat-label">技术文档</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ totalWords }}</div>
              <div class="stat-label">总字数</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ new Set(posts.flatMap(p => p.tags)).size }}</div>
              <div class="stat-label">技术标签</div>
            </div>
          </div>
          
          <div class="recent-docs">
            <h3 class="recent-title">最新文档</h3>
            <div class="recent-list">
              <div 
                v-for="post in posts.slice(0, 3)" 
                :key="post.id"
                class="recent-item"
                @click="selectPost(post)"
              >
                <div class="recent-content">
                  <h4 class="recent-doc-title">{{ post.title }}</h4>
                  <p class="recent-excerpt">{{ post.excerpt }}</p>
                  <div class="recent-meta">
                    <span class="recent-date">{{ formatDate(post.date) }}</span>
                    <span class="recent-author">{{ post.author }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 文档内容 -->
        <div v-else class="document-content">
          <BlogPost 
            :post="currentPost"
            @back="backToWelcome"
            :showBackButton="false"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts } from '../data/blogPosts.js'
import BlogPost from '../components/BlogPost.vue'

export default {
  name: 'Blog',
  components: {
    BlogPost
  },
  props: {
    postId: String
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const posts = ref(blogPosts)
    const searchQuery = ref('')
    
    // 当前选中的文章
    const currentPost = computed(() => {
      console.log('当前postId:', props.postId)
      if (!props.postId) {
        console.log('没有postId，返回null')
        return null
      }
      const foundPost = posts.value.find(post => post.id === props.postId)
      console.log('找到的文章:', foundPost ? foundPost.title : '未找到')
      return foundPost
    })
    
    // 根据搜索条件过滤文档
    const filteredPosts = computed(() => {
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        return posts.value.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
        )
      }
      return posts.value
    })
    
    // 计算总字数
    const totalWords = computed(() => {
      return posts.value.reduce((total, post) => {
        return total + (post.content ? post.content.length : 0)
      }, 0)
    })
    
    // 选择文章
    const selectPost = (post) => {
      console.log('选择文章:', post.title, 'ID:', post.id)
      router.push({ name: 'BlogPost', params: { postId: post.id } })
      console.log('路由跳转到:', `/blog/${post.id}`)
      // 滚动到顶部
      setTimeout(() => {
        const contentArea = document.querySelector('.docs-content')
        if (contentArea) {
          contentArea.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    }
    
    // 返回欢迎页面
    const backToWelcome = () => {
      router.push({ name: 'Blog' })
      setTimeout(() => {
        const contentArea = document.querySelector('.docs-content')
        if (contentArea) {
          contentArea.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    }
    
    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    
    // 监听路由变化
    watch(() => props.postId, (newPostId) => {
      if (newPostId && !currentPost.value) {
        router.push({ name: 'Blog' })
      }
    }, { immediate: true })

    return {
      posts,
      searchQuery,
      currentPost,
      filteredPosts,
      totalWords,
      selectPost,
      backToWelcome,
      formatDate
    }
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
}

.docs-layout {
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}

/* 左侧导航栏 */
.docs-sidebar {
  width: 350px;
  min-width: 350px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-right: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-shadow: 4px 0 20px rgba(102, 126, 234, 0.08);
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 搜索框 */
.search-box {
  position: relative;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.search-icon {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  pointer-events: none;
}

/* 文档目录 */
.doc-categories {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  flex: 1;
  overflow-y: auto;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-item {
  border-radius: 0.5rem;
  overflow: hidden;
}



.doc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.doc-item {
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.doc-item:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.2);
}

.doc-item.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: #1d4ed8;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.doc-title {
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  margin-right: 0.5rem;
}

.doc-date {
  font-size: 0.75rem;
  opacity: 0.7;
  white-space: nowrap;
}

.doc-item.active .doc-date {
  opacity: 0.9;
}



/* 右侧内容区域 */
.docs-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  height: 100vh;
}

/* 欢迎页面 */
.welcome-content {
  padding: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.welcome-header {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.6;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.08);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 最新文档 */
.recent-docs {
  margin-top: 3rem;
}

.recent-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recent-item {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.recent-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.2);
}

.recent-doc-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.recent-excerpt {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.recent-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.recent-author {
  font-size: 0.75rem;
  color: var(--primary-blue);
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
}

/* 文档内容区域 */
.document-content {
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .docs-sidebar {
    width: 300px;
    min-width: 300px;
  }
  
  .welcome-content {
    padding: 2rem;
  }
  
  .welcome-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .docs-layout {
    flex-direction: column;
  }
  
  .docs-sidebar {
    width: 100%;
    min-width: auto;
    height: auto;
    max-height: 40vh;
    order: 2;
  }
  
  .docs-content {
    order: 1;
    height: 60vh;
  }
  
  .welcome-content {
    padding: 1.5rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>