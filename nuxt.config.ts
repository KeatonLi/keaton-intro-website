// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  
  // 模块
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  
  // 颜色模式配置
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  
  // Content 配置
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      langs: ['java', 'javascript', 'typescript', 'vue', 'sql', 'yaml', 'json', 'bash', 'dockerfile']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },
  
  // 应用配置
  app: {
    head: {
      title: 'Keaton - Java工程师',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '专业的Java后端工程师，精通Spring Boot、微服务架构、全栈开发。' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },
  
  // Nitro 配置（用于 Vercel 部署）
  nitro: {
    preset: 'vercel'
  },
  
  // 兼容性日期
  compatibilityDate: '2024-09-01',

  // 修复 #app-manifest 错误
  experimental: {
    appManifest: false
  }
})
