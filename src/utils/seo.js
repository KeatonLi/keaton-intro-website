// SEO工具函数
import { useHead } from '@vueuse/head'

// 默认SEO配置
const defaultSEO = {
  title: 'Keaton - Java工程师个人网站',
  description: '专业的Java后端工程师，精通Spring Boot、微服务架构、全栈开发。查看我的技术作品集和技术博客。',
  keywords: 'Java工程师,Spring Boot,微服务,后端开发,全栈开发,Vue.js,技术博客',
  author: 'Keaton',
  url: 'https://keaton.dev', // 请替换为实际域名
  image: '/favicon.svg',
  type: 'website',
  locale: 'zh_CN'
}

// 页面SEO配置
export const pageSEO = {
  home: {
    title: 'Keaton - Java工程师个人网站 | 专业后端开发',
    description: '我是Keaton，一名专业的Java后端工程师，拥有5年+企业级开发经验。精通Spring Boot、Spring Cloud微服务架构，熟悉Vue.js全栈开发。',
    keywords: 'Java工程师,后端开发,Spring Boot,微服务架构,全栈开发,个人简历,技术专家',
    type: 'website'
  },
  about: {
    title: '关于我 - Keaton | Java工程师技能与经验',
    description: '了解Keaton的技术背景、工作经验和专业技能。5年+Java开发经验，精通Spring生态系统、数据库优化、分布式系统设计。',
    keywords: 'Java工程师简历,技术技能,工作经验,Spring Boot专家,微服务架构师',
    type: 'profile'
  },
  portfolio: {
    title: '技术作品集 - Keaton | Java项目案例展示',
    description: '查看Keaton的技术项目作品集，包括企业级Java应用、微服务系统、全栈Web应用等优秀案例。',
    keywords: 'Java项目,技术作品集,微服务案例,Spring Boot项目,全栈开发案例',
    type: 'website'
  },
  blog: {
    title: '技术博客 - Keaton | Java开发技术分享',
    description: 'Keaton的技术博客，分享Java开发经验、Spring框架深度解析、微服务架构设计、性能优化等技术文章。',
    keywords: 'Java技术博客,Spring Boot教程,微服务架构,技术分享,编程经验',
    type: 'blog'
  }
}

// 使用SEO配置的组合函数
export function useSEO(pageConfig = {}) {
  const config = { ...defaultSEO, ...pageConfig }
  
  useHead({
    title: config.title,
    meta: [
      // 基础meta标签
      { name: 'description', content: config.description },
      { name: 'keywords', content: config.keywords },
      { name: 'author', content: config.author },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
      
      // Open Graph标签
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: config.type },
      { property: 'og:url', content: config.url },
      { property: 'og:image', content: config.image },
      { property: 'og:locale', content: config.locale },
      { property: 'og:site_name', content: 'Keaton - Java工程师' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image },
      
      // 移动端优化
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'format-detection', content: 'telephone=no' },
      
      // 地理位置（可选）
      { name: 'geo.region', content: 'CN' },
      { name: 'geo.placename', content: 'China' },
      
      // 其他SEO标签
      { name: 'theme-color', content: '#667eea' },
      { name: 'msapplication-TileColor', content: '#667eea' }
    ],
    link: [
      // Canonical链接
      { rel: 'canonical', href: config.url },
      
      // 图标
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      
      // 预连接优化
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }
    ],
    script: [
      // 结构化数据 - Person Schema
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Keaton',
          jobTitle: 'Java工程师',
          description: 'Java后端工程师，专注于Spring Boot和微服务架构开发',
          url: config.url,
          sameAs: [
            'https://github.com/keaton',
            'https://linkedin.com/in/keaton'
          ],
          knowsAbout: [
            'Java',
            'Spring Boot',
            'Spring Cloud',
            '微服务架构',
            'Vue.js',
            'MySQL',
            'Redis',
            'Docker'
          ],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: '计算机科学专业'
          }
        })
      },
      
      // 网站结构化数据
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Keaton - Java工程师个人网站',
          url: config.url,
          description: config.description,
          author: {
            '@type': 'Person',
            name: 'Keaton'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${config.url}/blog?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        })
      }
    ]
  })
}

// 博客文章SEO配置
export function useBlogPostSEO(post) {
  const config = {
    title: `${post.title} - Keaton技术博客`,
    description: post.excerpt || post.description,
    keywords: post.tags ? post.tags.join(',') : defaultSEO.keywords,
    url: `${defaultSEO.url}/blog/${post.id}`,
    type: 'article',
    image: post.image || defaultSEO.image
  }
  
  useHead({
    title: config.title,
    meta: [
      { name: 'description', content: config.description },
      { name: 'keywords', content: config.keywords },
      { name: 'author', content: post.author || defaultSEO.author },
      { name: 'robots', content: 'index,follow' },
      
      // Article specific meta
      { name: 'article:author', content: post.author || defaultSEO.author },
      { name: 'article:published_time', content: post.date },
      { name: 'article:section', content: 'Technology' },
      { name: 'article:tag', content: config.keywords },
      
      // Open Graph for articles
      { property: 'og:title', content: config.title },
      { property: 'og:description', content: config.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: config.url },
      { property: 'og:image', content: config.image },
      { property: 'og:article:author', content: post.author || defaultSEO.author },
      { property: 'og:article:published_time', content: post.date },
      { property: 'og:article:section', content: 'Technology' },
      
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: config.title },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.image }
    ],
    link: [
      { rel: 'canonical', href: config.url }
    ],
    script: [
      // Article结构化数据
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: config.description,
          author: {
            '@type': 'Person',
            name: post.author || defaultSEO.author
          },
          datePublished: post.date,
          dateModified: post.date,
          publisher: {
            '@type': 'Person',
            name: defaultSEO.author
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': config.url
          },
          image: config.image,
          keywords: post.tags || []
        })
      }
    ]
  })
}

// 生成sitemap数据
export function generateSitemapData() {
  const baseUrl = defaultSEO.url
  const pages = [
    { url: baseUrl, priority: 1.0, changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changefreq: 'monthly' },
    { url: `${baseUrl}/portfolio`, priority: 0.9, changefreq: 'monthly' },
    { url: `${baseUrl}/blog`, priority: 0.9, changefreq: 'weekly' }
  ]
  
  return pages
}