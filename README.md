# Keaton 个人网站

一个基于 **Nuxt 3** + **Nuxt Content** 构建的现代化个人博客和作品集网站，展示 Java 工程师 Keaton 的技术背景、项目经验和技术博客。

## 🚀 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| [Nuxt 3](https://nuxt.com/) | 全栈 Vue 框架 | ^3.13.0 |
| [Vue](https://vuejs.org/) | 前端框架 | latest |
| [Nuxt Content](https://content.nuxt.com/) | Markdown 内容管理 | ^2.13.0 |
| [Tailwind CSS](https://tailwindcss.com/) | 原子化 CSS 框架 | ^6.12.0 (@nuxtjs/tailwindcss) |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) | 暗黑/亮色模式切换 | ^3.4.0 |
| [@nuxt/icon](https://github.com/nuxt/icon) | 图标组件 | ^1.0.0 |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | 排版样式插件 | ^0.5.15 |

## ✨ 功能特性

- 🎨 现代化设计，支持暗黑/亮色模式切换（跟随系统或手动）
- 📱 完美响应式，适配各种设备
- 📝 Markdown 博客，支持代码高亮（github-light / github-dark 主题）
- 🔍 博客标签筛选功能
- ⚡ 服务端渲染 (SSR)，SEO 友好
- 🖼️ 自动图片优化
- 🔗 文章前后导航
- 📊 文章统计信息

## 🛠️ 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 常用命令

```bash
# 构建生产版本（用于 Vercel 部署）
npm run build

# 生成静态站点
npm run generate

# 预览生产构建
npm run preview

# 安装后准备（Nuxt 自动执行）
npm run postinstall
```

## 📁 项目结构

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
├── components/             # Vue 组件
│
├── content/blog/           # Markdown 博客文章
│   ├── api-design-best-practices.md
│   ├── cloud-native-technologies.md
│   ├── database-design-optimization.md
│   └── ...
│
├── layouts/                # 布局组件
│   └── default.vue         # 默认布局（导航栏、页脚、暗黑模式切换）
│
├── pages/                  # 页面路由（基于文件系统自动生成）
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

## 📝 写博客

所有博客文章放在 `content/blog/` 目录下，使用 Markdown 格式。

### 文章格式示例

```markdown
---
title: 文章标题
date: 2024-01-20
author: Keaton
tags: [Java, 并发编程, 性能优化]
excerpt: 文章摘要，显示在博客列表中
---

# 正文标题

文章内容支持所有 Markdown 语法：

- **粗体**、*斜体*、~~删除线~~
- 代码块：
  ```java
  public class Hello {
      public static void main(String[] args) {
          System.out.println("Hello World");
      }
  }
  ```
- 列表、表格、图片等
```

### 支持的代码语言

Java, JavaScript, TypeScript, Vue, SQL, YAML, JSON, Bash, Dockerfile 等。

## 🌐 部署到 Vercel

### 方法一：Git 集成（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 框架预设选择 "Nuxt.js"
4. 点击 Deploy，自动部署

### 方法二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 部署配置

项目已配置 `vercel.json`，无需额外设置：

```json
{
  "framework": "nuxtjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

## 🔧 开发者指南

### 添加新页面

在 `pages/` 目录下创建 `.vue` 文件，Nuxt 会自动生成对应路由：

```
pages/
  └── new-page.vue     # 对应路由 /new-page
```

### 修改个人信息

编辑各页面文件：
- `pages/index.vue` - 首页内容
- `pages/portfolio.vue` - 项目展示
- `pages/about.vue` - 个人简介和联系方式

### 修改主题色

编辑 `tailwind.config.ts` 中的 `colors.primary` 对象，修改对应色阶的颜色值。

### 添加新图标

使用 `@nuxt/icon` 组件，图标名称遵循 `ph:` (Phosphor Icons) 前缀：

```vue
<Icon name="ph:house-bold" class="w-5 h-5" />
```

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

### 配置文件详解

#### nuxt.config.ts

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

#### tailwind.config.ts

- **内容扫描路径**: components, layouts, pages, composables, plugins, app.vue
- **暗黑模式**: class 策略（通过 `.dark` 类切换）
- **自定义主题色**: primary (50-900 色阶)
- **字体**: Inter, system-ui 等无衬线字体

## 🐛 故障排除

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

## 📄 许可证

MIT License

---

**作者**: Keaton  
**职业**: Java 工程师  
**专注**: 构建高质量的软件解决方案
