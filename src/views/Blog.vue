<template>
  <div class="blog-page">
    <!-- 博客列表视图 -->
    <BlogList 
      v-if="currentView === 'list'"
      :posts="posts"
      @select-post="viewPost"
    />
    
    <!-- 文章详情视图 -->
    <BlogPost 
      v-else-if="currentView === 'post'"
      :post="currentPost"
      @back="backToList"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { blogPosts } from '../data/blogPosts.js'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'

export default {
  name: 'Blog',
  components: {
    BlogList,
    BlogPost
  },
  setup() {
    const currentView = ref('list') // 'list' | 'post'
    const currentPost = ref(null)
    const posts = ref(blogPosts)

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

    return {
      currentView,
      currentPost,
      posts,
      viewPost,
      backToList
    }
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .blog-page {
    padding: 1rem 0;
  }
}
</style>