# Keaton 个人网站 - AI 代理开发指南

## 项目概述

这是一个基于 **Nuxt 3** + **Nuxt Content** 构建的现代化个人博客和作品集网站，展示 Java 工程师 Keaton 的技术背景、项目经验和技术博客。

- **项目名称**: keaton-intro-website
- **项目类型**: 个人作品集与博客网站
- **部署平台**: Vercel
- **主要语言**: 中文

## 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Nuxt 3](https://nuxt.com/) | 全栈 Vue 框架 | ^3.13.0 |
| [Vue](https://vuejs.org/) | 前端框架 | latest |
| [Nuxt Content](https://content.nuxt.com/) | Markdown 内容管理 | ^2.13.0 |
| [Tailwind CSS](https://tailwindcss.com/) | 原子化 CSS 框架 | ^6.12.0 (@nuxtjs/tailwindcss) |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) | 暗黑/亮色模式切换 | ^3.4.0 |
| [@nuxt/icon](https://github.com/nuxt/icon) | 图标组件 | ^1.0.0 |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | 排版样式插件 | ^0.5.15 |

## 项目结构

```
keaton-intro-website/
├── app.vue                 # 应用入口组件
├── error.vue               # 错误页面组件 (404/500)
├── nuxt.config.ts          # Nuxt 配置文件
├── tailwind.config.ts      # Tailwind CSS 配置
├── vercel.json             # Vercel 部署配置
├── package.json            # 项目依赖
│
├── assets/css/             # 全局样式文件
│   ├── main.css            # 主样式（含自定义工具类）
│   └── tailwind.css        # Tailwind 基础导入
│
├── components/             # Vue 组件（当前为空）
│
├── content/blog/           # Markdown 博客文章
│   ├── api-design-best-practices.md
│   ├── cloud-native-technologies.md
│   ├── database-design-optimization.md
│   ├── docker-containerization-guide.md
│   ├── frontend-performance-optimization.md
│   ├── java-concurrent-programming.md
│   ├── microservices-architecture-guide.md
│   ├── mysql-performance-optimization.md
│   ├── redis-cache-strategies.md
│   └── vue3-composition-api.md
│
├── layouts/                # 布局组件
│   └── default.vue         # 默认布局（导航栏、页脚、暗黑模式切换）
│
├── pages/                  # 页面路由（基于文件系统自动生成路由）
│   ├── index.vue           # 首页（个人简介、技术栈展示）
│   ├── about.vue           # 关于我页面
│   ├── portfolio.vue       # 作品集页面
│   └── blog/               # 博客相关页面
│       ├── index.vue       # 博客列表页
│       └── [slug].vue      # 博客详情页（动态路由）
│
├── public/                 # 静态资源
│   ├── favicon.svg         # 网站图标
│   ├── robots.txt          # 搜索引擎爬虫配置
│   └── sitemap.xml         # 站点地图
│
└── server/                 # 服务端 API（当前为空）
    └── api/                # API 路由目录
```

## 构建与开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 3000）
npm run dev

# 构建生产版本（用于 Vercel 部署）
npm run build

# 生成静态站点
npm run generate

# 预览生产构建
npm run preview

# 安装后准备（Nuxt 自动执行）
npm run postinstall
```

## 核心功能模块

### 1. 暗黑模式支持
- 使用 `@nuxtjs/color-mode` 模块实现
- 支持跟随系统主题或手动切换
- 配置在 `nuxt.config.ts` 中的 `colorMode` 部分
- 切换按钮位于导航栏右侧

### 2. 博客系统
- 基于 `Nuxt Content` 模块
- 博客文章存储在 `content/blog/` 目录下
- 支持 YAML Frontmatter 元数据（title, date, author, tags, excerpt）
- 支持代码语法高亮（主题：github-light / github-dark）
- 博客列表页支持按标签筛选
- 文章详情页支持前后文章导航

### 3. 响应式设计
- 基于 Tailwind CSS 的响应式断点
- 移动端有独立的汉堡菜单
- 所有页面适配各种屏幕尺寸

### 4. SEO 优化
- 每个页面使用 `useHead()` 设置标题和描述
- 服务端渲染 (SSR) 支持
- 已配置 `robots.txt` 和 `sitemap.xml`

## 代码风格指南

### Vue 单文件组件规范

```vue
<template>
  <!-- 使用语义化 HTML -->
  <section class="...">
    <!-- 类名使用 Tailwind 原子类 -->
  </section>
</template>

<script setup>
// 1. 首先导入 composables
const route = useRoute()
const colorMode = useColorMode()

// 2. 使用 useHead 设置页面元数据
useHead({
  title: '页面标题 - Keaton',
  meta: [
    { name: 'description', content: '页面描述' }
  ]
})

// 3. 响应式数据定义
const mobileMenuOpen = ref(false)
const selectedTag = ref(null)

// 4. 计算属性
const filteredPosts = computed(() => {
  // ...
})

// 5. 方法定义
const formatDate = (date) => {
  // ...
}
</script>

<style scoped>
/* 仅添加必要的自定义样式 */
/* 优先使用 Tailwind 工具类 */
</style>
```

### Tailwind CSS 使用规范

1. **优先使用工具类**: 大部分样式应通过 Tailwind 工具类实现
2. **自定义颜色**: 主题色通过 `tailwind.config.ts` 中的 `colors.primary` 配置
3. **暗黑模式**: 使用 `dark:` 前缀实现暗黑模式样式
4. **响应式**: 使用 `sm:`, `md:`, `lg:` 等前缀实现响应式布局

### Markdown 文章格式

```markdown
---
title: 文章标题
date: 2024-01-20
author: Keaton
tags: [Java, 并发编程, 性能优化]
excerpt: 文章摘要，显示在博客列表中
---

# 正文标题

文章内容支持标准 Markdown 语法和代码块。
```

## 配置文件详解

### nuxt.config.ts

```typescript
{
  // 启用的模块
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/icon'],
  
  // 暗黑模式配置
  colorMode: {
    classSuffix: '',
    preference: 'system',  // 默认跟随系统
    fallback: 'light'
  },
  
  // Nuxt Content 配置
  content: {
    highlight: {
      theme: { default: 'github-light', dark: 'github-dark' },
      langs: ['java', 'javascript', 'typescript', 'vue', 'sql', 'yaml', 'json', 'bash', 'dockerfile']
    }
  },
  
  // Vercel 部署预设
  nitro: { preset: 'vercel' }
}
```

### tailwind.config.ts

- **内容扫描路径**: components, layouts, pages, composables, plugins, app.vue
- **暗黑模式**: class 策略（通过 `.dark` 类切换）
- **自定义主题色**: primary (50-900 色阶)
- **字体**: Inter, system-ui 等无衬线字体

## 部署流程

### Vercel 部署配置 (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": "nuxtjs",
  "installCommand": "npm install"
}
```

### 部署步骤

1. 代码推送到 GitHub 仓库
2. Vercel 自动检测到 Nuxt.js 项目
3. 使用 `npm run build` 构建
4. 输出目录为 `.output/public`

## 开发注意事项

### 添加新页面

在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成对应路由：

```
pages/
  └── new-page.vue     # 对应路由 /new-page
```

### 添加博客文章

1. 在 `content/blog/` 目录下创建 `.md` 文件
2. 添加 YAML Frontmatter 元数据
3. 使用标准 Markdown 语法编写内容
4. 文章会自动显示在博客列表中

### 修改主题色

编辑 `tailwind.config.ts` 中的 `colors.primary` 对象，修改对应色阶的颜色值。

### 添加新图标

使用 `@nuxt/icon` 组件，图标名称遵循 `ph:` (Phosphor Icons) 前缀：

```vue
<Icon name="ph:house-bold" class="w-5 h-5" />
```

## 依赖版本锁定

项目使用 `package-lock.json` 锁定依赖版本。添加新依赖时：

```bash
npm install <package-name>
```

## 已知限制

1. **无后端 API**: 当前 `server/api/` 目录为空，如需添加服务端接口可在此创建
2. **无数据库**: 博客内容完全基于静态 Markdown 文件
3. **无用户系统**: 纯展示型网站，无用户认证功能
4. **无评论系统**: 博客文章暂无评论功能

## 故障排除

### 开发服务器启动失败

```bash
# 清除缓存后重试
rm -rf .nuxt node_modules
npm install
npm run dev
```

### 样式不生效

检查 `tailwind.config.ts` 中的 `content` 配置是否包含对应文件路径。

### 博客文章不显示

- 检查文件是否在 `content/blog/` 目录下
- 检查 YAML Frontmatter 格式是否正确
- 检查 `date` 字段格式是否为 `YYYY-MM-DD`
