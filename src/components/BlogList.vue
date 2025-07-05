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
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
}

.blog-subtitle {
  font-size: 1.25rem;
  color: var(--text-gray);
  max-width: 600px;
  margin: 0 auto;
}

.blog-filters {
  margin-bottom: 2rem;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag-filter {
  background: var(--bg-light);
  color: var(--text-gray);
  border: 2px solid transparent;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-filter:hover {
  background: var(--primary-blue);
  color: white;
}

.tag-filter.active {
  background: var(--primary-blue);
  color: white;
  border-color: var(--primary-blue);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-card {
  background: var(--bg-white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-blue);
}

.post-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.post-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-blue);
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.post-date {
  color: var(--text-gray);
  font-size: 0.9rem;
  white-space: nowrap;
  font-weight: 500;
}

.post-excerpt {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.tag {
  background: var(--bg-light);
  color: var(--primary-blue);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  color: var(--primary-blue);
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.post-card:hover .read-more {
  color: var(--dark-blue);
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--text-gray);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .blog-list {
    padding: 1rem;
  }
  
  .blog-title {
    font-size: 2.5rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .post-card {
    padding: 1.5rem;
  }
  
  .post-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .post-card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>