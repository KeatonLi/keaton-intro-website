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
          <div class="category-header" @click="toggleSidebar">
            <div class="category-title">文档目录</div>
            <button class="toggle-btn" :class="{ collapsed: !sidebarExpanded }">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </button>
          </div>
          <div class="category-list" :class="{ collapsed: !sidebarExpanded }">
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
          
          <!-- 博客卡片网格 -->
          <div class="blog-cards-section">
            <h3 class="section-title">技术博客</h3>
            <p class="section-subtitle">点击卡片阅读完整文章</p>
            
            <div class="blog-cards-grid">
              <div 
                v-for="post in posts" 
                :key="post.id"
                class="blog-card"
                @click="selectPost(post)"
              >
                <div class="card-header">
                  <div class="card-category">{{ post.tags[0] || '技术' }}</div>
                  <div class="card-date">{{ formatDate(post.date) }}</div>
                </div>
                
                <div class="card-content">
                  <h4 class="card-title">{{ post.title }}</h4>
                  <p class="card-excerpt">{{ post.excerpt }}</p>
                </div>
                
                <div class="card-footer">
                  <div class="card-author">
                    <span class="author-avatar">{{ post.author.charAt(0) }}</span>
                    <span class="author-name">{{ post.author }}</span>
                  </div>
                  <div class="card-tags">
                    <span 
                      v-for="tag in post.tags.slice(0, 2)" 
                      :key="tag" 
                      class="card-tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <div class="card-overlay">
                  <div class="read-more-btn">
                    <span>阅读文章</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 文档内容 - 三列布局 -->
        <div v-else class="document-content">
          <!-- 中间标题目录 -->
          <aside class="toc-sidebar">
            <div class="toc-header">
              <h3 class="toc-title">📋 文章目录</h3>
              <button class="back-btn" @click="backToWelcome">
                ← 返回
              </button>
            </div>
            <nav class="toc-nav" v-if="tableOfContents.length > 0">
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
                    @click.prevent="scrollToHeading(item.id)"
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
          
          <!-- 右侧文章详情 -->
          <article class="article-content">
            <header class="post-header">
              <h1 class="post-title">{{ currentPost.title }}</h1>
              <div class="post-meta">
                <span class="post-date">{{ formatDate(currentPost.date) }}</span>
                <span class="post-author">作者：{{ currentPost.author }}</span>
                <div class="post-tags">
                  <span v-for="tag in currentPost.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
            </header>
            
            <div class="post-content blog-content" v-html="renderedContent" ref="contentRef"></div>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts } from '../data/blogPosts.js'
import { renderMarkdown } from '../utils/markdown.js'
import { useSEO, pageSEO, useBlogPostSEO } from '../utils/seo.js'
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
    const sidebarExpanded = ref(true)
    const tableOfContents = ref([])
    const activeHeading = ref('')
    const contentRef = ref(null)
    const observer = ref(null)
    const scrollTimeout = ref(null)
    
    // SEO配置
    const setupSEO = () => {
      if (props.postId && currentPost.value) {
        // 单篇文章SEO
        useBlogPostSEO(currentPost.value)
      } else {
        // 博客列表页SEO
        useSEO(pageSEO.blog)
      }
    }
    
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
    
    // 渲染markdown内容
    const renderedContent = computed(() => {
      if (!currentPost.value) {
        console.log('当前没有选中的文章')
        return ''
      }
      console.log('正在渲染文章:', currentPost.value.title)
      console.log('文章内容长度:', currentPost.value.content.length)
      const rendered = renderMarkdown(currentPost.value.content)
      console.log('渲染后的HTML长度:', rendered.length)
      return rendered
    })
    
    // 生成目录
    const generateTableOfContents = () => {
      if (!contentRef.value) {
        console.log('contentRef.value 为空，无法生成目录')
        return
      }
      
      const headings = contentRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
      console.log('找到的标题元素数量:', headings.length)
      tableOfContents.value = []
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        const text = heading.textContent.trim()
        // 使用已有的ID，如果没有则创建新的
        let id = heading.id
        if (!id) {
          id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-') || `heading-${index}`
          heading.id = id
        }
        
        console.log(`标题 ${index + 1}: ${text} (${heading.tagName}) - ID: ${id}`)
        
        tableOfContents.value.push({
          id,
          text,
          level,
          element: heading
        })
      })
      
      console.log('生成的目录:', tableOfContents.value)
    }
    
    // 设置滚动监听 - 改进版本
    const setupScrollSpy = () => {
      if (!tableOfContents.value.length) return
      
      // 清理之前的观察器
      if (observer.value) {
        observer.value.disconnect()
      }
      
      const scrollContainer = document.querySelector('.article-content')
      if (!scrollContainer) return
      
      const options = {
        root: scrollContainer,
        // 调整rootMargin以获得更好的定位效果
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.1, 0.5, 1]
      }
      
      // 用于跟踪当前可见的标题
      const visibleHeadings = new Set()
      
      observer.value = new IntersectionObserver((entries) => {
        // 清除之前的超时
        if (scrollTimeout.value) {
          clearTimeout(scrollTimeout.value)
        }
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleHeadings.add(entry.target.id)
          } else {
            visibleHeadings.delete(entry.target.id)
          }
        })
        
        // 使用防抖来优化性能
        scrollTimeout.value = setTimeout(() => {
          // 选择第一个可见的标题作为活跃标题
          if (visibleHeadings.size > 0) {
            // 按照在文档中的顺序找到第一个可见标题
            for (const item of tableOfContents.value) {
              if (visibleHeadings.has(item.id)) {
                activeHeading.value = item.id
                break
              }
            }
          }
        }, 100) // 100ms 防抖延迟
      }, options)
      
      tableOfContents.value.forEach(item => {
        if (item.element) {
          observer.value.observe(item.element)
        }
      })
    }
    
    // 滚动到指定标题 - 改进版本
    const scrollToHeading = (id) => {
      const element = document.getElementById(id)
      const scrollContainer = document.querySelector('.article-content')
      
      if (element && scrollContainer) {
        // 获取元素相对于滚动容器的位置
        const containerTop = scrollContainer.offsetTop
        const elementTop = element.offsetTop
        
        // 计算滚动位置，考虑固定头部和间距
        const headerOffset = 120 // 为固定头部留出空间
        const scrollPosition = elementTop - containerTop - headerOffset
        
        // 确保滚动位置不会超出容器范围
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
        const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll))
        
        scrollContainer.scrollTo({
          top: finalScrollPosition,
          behavior: 'smooth'
        })
        
        // 临时高亮目标标题
        highlightHeading(id)
      }
    }
    
    // 临时高亮标题
    const highlightHeading = (id) => {
      const element = document.getElementById(id)
      if (element) {
        element.style.transition = 'background-color 0.3s ease'
        element.style.backgroundColor = 'rgba(102, 126, 234, 0.1)'
        element.style.borderRadius = '4px'
        element.style.padding = '0.25rem 0.5rem'
        element.style.margin = '0 -0.5rem'
        
        setTimeout(() => {
          element.style.backgroundColor = 'transparent'
          setTimeout(() => {
            element.style.removeProperty('background-color')
            element.style.removeProperty('border-radius')
            element.style.removeProperty('padding')
            element.style.removeProperty('margin')
            element.style.removeProperty('transition')
          }, 300)
        }, 1000)
      }
    }
    
    // 选择文章
    const selectPost = (post) => {
      console.log('选择文章:', post.title, 'ID:', post.id)
      router.push({ name: 'BlogPost', params: { postId: post.id } })
      console.log('路由跳转到:', `/blog/${post.id}`)
      // 等待DOM更新后生成目录
      nextTick(() => {
        setTimeout(() => {
          generateTableOfContents()
          setupScrollSpy()
          // 滚动到顶部
          const contentArea = document.querySelector('.article-content')
          if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }, 300) // 增加延迟时间
      })
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
    
    // 切换侧边栏展开状态
    const toggleSidebar = () => {
      sidebarExpanded.value = !sidebarExpanded.value
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
      } else if (newPostId && currentPost.value) {
        // 当路由变化时重新生成目录
        nextTick(() => {
          setTimeout(() => {
            generateTableOfContents()
            setupScrollSpy()
          }, 300)
        })
      }
      // 更新SEO
      setupSEO()
    }, { immediate: true })
    
    // 监听当前文章变化，更新SEO
    watch(currentPost, () => {
      setupSEO()
    }, { immediate: true })
    
    // 监听渲染内容变化
    watch(renderedContent, (newContent) => {
      if (newContent && currentPost.value) {
        console.log('渲染内容已更新，重新生成目录')
        nextTick(() => {
          setTimeout(() => {
            generateTableOfContents()
            setupScrollSpy()
          }, 200)
        })
      }
    })
    
    // 清理观察器
    onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect()
      }
      if (scrollTimeout.value) {
        clearTimeout(scrollTimeout.value)
      }
    })

    return {
      posts,
      searchQuery,
      sidebarExpanded,
      currentPost,
      filteredPosts,
      totalWords,
      renderedContent,
      tableOfContents,
      activeHeading,
      contentRef,
      scrollTimeout,
      selectPost,
      backToWelcome,
      toggleSidebar,
      scrollToHeading,
      formatDate
    }
  }
}
</script>

<style scoped>
.blog-page {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-attachment: fixed;
  padding: 0;
  overflow: hidden;
}

.docs-layout {
  display: flex;
  height: 100vh;
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
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  flex: 1;
  overflow-y: auto;
}

.category-header {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(102, 126, 234, 0.05);
}

.category-header:hover {
  background: rgba(102, 126, 234, 0.03);
}

.category-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  color: var(--primary-blue);
}

.toggle-btn svg {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-btn.collapsed svg {
  transform: rotate(-90deg);
}

.toggle-btn:active {
  transform: scale(0.95);
}

.category-list {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 1000px;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-list.collapsed {
  max-height: 0;
  padding: 0 1.5rem;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
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

/* 文档内容三列布局 */
.document-content {
  display: flex;
  height: 100%;
  gap: 0;
}

/* 中间标题目录 */
.toc-sidebar {
  width: 280px;
  min-width: 280px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-right: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(102, 126, 234, 0.05);
}

.toc-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  flex-shrink: 0;
}

.toc-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0;
}

.back-btn {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.toc-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
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

/* 右侧文章详情 */
.article-content {
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
  backdrop-filter: blur(25px);
  overflow-y: auto;
  height: 100%;
  position: relative;
}

.post-header {
  padding: 3rem 3rem 2rem;
  border-bottom: 2px solid var(--gray-100);
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
}

.post-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.post-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.post-date, .post-author {
  font-weight: 500;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-content {
  padding: 0 3rem 3rem;
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text-primary);
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

/* 博客卡片部分 */
.blog-cards-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2rem;
}

.blog-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-card:nth-child(1) { animation-delay: 0.1s; }
.blog-card:nth-child(2) { animation-delay: 0.2s; }
.blog-card:nth-child(3) { animation-delay: 0.3s; }
.blog-card:nth-child(4) { animation-delay: 0.4s; }
.blog-card:nth-child(5) { animation-delay: 0.5s; }
.blog-card:nth-child(6) { animation-delay: 0.6s; }
.blog-card:nth-child(n+7) { animation-delay: 0.7s; }

.blog-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.2);
}

.blog-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-category {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-date {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.card-content {
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-blue) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.author-name {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.card-tag {
  background: rgba(102, 126, 234, 0.1);
  color: var(--primary-blue);
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

.read-more-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.read-more-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
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
  
  .blog-cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
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
  
  .blog-cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .blog-card {
    padding: 1rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .card-excerpt {
    -webkit-line-clamp: 2;
  }
}
</style>