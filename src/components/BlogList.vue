<template>
  <div class="blog-list">
    <header class="blog-header">
      <h1 class="blog-title">技术博客</h1>
      <p class="blog-subtitle">分享技术心得，记录成长足迹</p>
    </header>
    
    <div class="blog-filters">
      <div class="filter-tags">
        <button 
          v-for="tag in allTags" 
          :key="tag"
          @click="toggleTag(tag)"
          :class="['tag-filter', { active: selectedTags.includes(tag) }]"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    
    <div class="posts-grid">
      <article 
        v-for="post in filteredPosts" 
        :key="post.id"
        class="post-card"
        @click="$emit('select-post', post)"
      >
        <div class="post-card-header">
          <h2 class="post-card-title">{{ post.title }}</h2>
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </div>
        
        <p class="post-excerpt">{{ post.excerpt }}</p>
        
        <div class="post-card-footer">
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <span class="read-more">阅读更多 →</span>
        </div>
      </article>
    </div>
    
    <div v-if="filteredPosts.length === 0" class="no-posts">
      <p>暂无符合条件的文章</p>
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
    return {
      selectedTags: []
    }
  },
  computed: {
    allTags() {
      const tags = new Set()
      this.posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag))
      })
      return Array.from(tags)
    },
    filteredPosts() {
      if (this.selectedTags.length === 0) {
        return this.posts
      }
      return this.posts.filter(post => 
        this.selectedTags.some(tag => post.tags.includes(tag))
      )
    }
  },
  methods: {
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag)
      if (index > -1) {
        this.selectedTags.splice(index, 1)
      } else {
        this.selectedTags.push(tag)
      }
    },
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
.blog-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3xl);
}

.blog-header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.blog-title {
  font-size: clamp(2.5rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--space-lg);
  letter-spacing: -0.025em;
}

.blog-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-tertiary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.blog-filters {
  margin-bottom: var(--space-3xl);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

.tag-filter {
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 2px solid var(--gray-300);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
  font-size: 0.9rem;
}

.tag-filter:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tag-filter.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: var(--shadow-lg);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.post-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid var(--gray-200);
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--bg-gradient);
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--gray-300);
}

.post-card:hover::before {
  transform: scaleX(1);
}

.post-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-lg);
  gap: var(--space-lg);
}

.post-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.post-date {
  color: var(--text-tertiary);
  font-size: 0.9rem;
  white-space: nowrap;
  font-weight: 500;
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-lg);
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  flex: 1;
}

.tag {
  background: var(--gray-100);
  color: var(--text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-lg);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid var(--gray-200);
}

.tag:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  transform: translateY(-1px);
}

.read-more {
  color: var(--primary-blue);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  transition: all var(--transition-normal);
}

.post-card:hover .read-more {
  color: var(--primary-dark);
  transform: translateX(5px);
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--text-gray);
  font-size: 1.1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-top: var(--space-2xl);
}

.pagination button {
  background: var(--bg-primary);
  color: var(--text-secondary);
  border: 1px solid var(--gray-200);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: 600;
  min-width: 44px;
}

.pagination button:hover {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.pagination button.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
  box-shadow: var(--shadow-lg);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pagination button:disabled:hover {
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-color: var(--gray-200);
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .blog-list {
    padding: var(--space-lg);
  }

  .blog-title {
    font-size: 2rem;
    margin-bottom: var(--space-md);
  }

  .blog-subtitle {
    font-size: 1rem;
    line-height: 1.5;
  }

  .blog-header {
    margin-bottom: var(--space-2xl);
  }

  .blog-filters {
    margin-bottom: var(--space-2xl);
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .post-card {
    padding: var(--space-xl);
  }

  .post-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }

  .post-card-title {
    font-size: 1.25rem;
    line-height: 1.2;
  }

  .post-excerpt {
    margin-bottom: var(--space-md);
    font-size: 0.95rem;
  }

  .filter-tags {
    justify-content: flex-start;
    gap: var(--space-sm);
  }

  .tag-filter {
    font-size: 0.8rem;
    padding: var(--space-xs) var(--space-md);
  }

  .post-card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .pagination {
    margin-top: var(--space-xl);
    gap: var(--space-xs);
  }

  .pagination button {
    padding: var(--space-xs) var(--space-sm);
    font-size: 0.9rem;
    min-width: 40px;
  }
}
</style>