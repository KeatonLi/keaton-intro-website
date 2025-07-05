<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">Keaton</router-link>
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link" active-class="active">首页</router-link></li>
          <li><router-link to="/about" class="nav-link" active-class="active">关于我</router-link></li>
          <li><router-link to="/portfolio" class="nav-link" active-class="active">作品集</router-link></li>
          <li><router-link to="/blog" class="nav-link" active-class="active">博客</router-link></li>
        </ul>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer style="background: var(--text-dark); color: white; padding: 2rem 0; text-align: center;">
      <div class="container">
        <p>&copy; 2024 Keaton. 专业的 Java 工程师 | 用心构建每一行代码</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>