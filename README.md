# Keaton 个人网站

一个基于 Nuxt 3 + Nuxt Content 构建的现代化个人博客和作品集网站。

## 🚀 技术栈

- **框架**: [Nuxt 3](https://nuxt.com/) - 全栈 Vue 框架
- **内容管理**: [Nuxt Content](https://content.nuxt.com/) - 基于 Markdown 的内容管理
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- **暗黑模式**: [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) - 自动适配系统主题
- **图标**: [@nuxt/icon](https://github.com/nuxt/icon) - 图标组件
- **部署**: [Vercel](https://vercel.com/) - 无服务器部署平台

## ✨ 功能特性

- 🎨 现代化设计，支持暗黑模式
- 📱 完美响应式，适配各种设备
- 📝 Markdown 博客，支持代码高亮
- 🔍 博客标签筛选功能
- ⚡ 服务端渲染 (SSR)，SEO 友好
- 🖼️ 自动图片优化
- 🔗 自动生成目录导航
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

### 构建生产版本
```bash
npm run build
```

### 静态生成
```bash
npm run generate
```

## 📝 写博客

所有博客文章放在 `content/blog/` 目录下，使用 Markdown 格式。

### 文章格式示例

```markdown
---
title: 文章标题
date: 2024-01-15
description: 文章简介，会显示在博客列表中
tags: ['Java', 'Spring Boot', '后端']
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

## 📁 项目结构

```
keaton-intro-website/
├── assets/css/          # 全局样式
├── components/          # Vue 组件
├── content/blog/        # Markdown 博客文章
├── layouts/             # 布局组件
├── pages/               # 页面路由
│   ├── index.vue        # 首页
│   ├── portfolio.vue    # 作品集
│   ├── about.vue        # 关于我
│   └── blog/            # 博客相关
│       ├── index.vue    # 博客列表
│       └── [slug].vue   # 博客详情
├── public/              # 静态资源
├── app.vue              # 应用入口
├── nuxt.config.ts       # Nuxt 配置
├── tailwind.config.ts   # Tailwind 配置
└── package.json         # 项目依赖
```

## 🎨 自定义配置

### 修改个人信息

编辑各页面文件：
- `pages/index.vue` - 首页内容
- `pages/portfolio.vue` - 项目展示
- `pages/about.vue` - 个人简介和联系方式

### 修改主题色

编辑 `tailwind.config.ts` 中的 `colors.primary` 部分。

### 添加新页面

在 `pages/` 目录下创建新的 `.vue` 文件，Nuxt 会自动生成路由。

## 📄 许可证

MIT License

---

**作者**: Keaton  
**职业**: Java 工程师  
**专注**: 构建高质量的软件解决方案
