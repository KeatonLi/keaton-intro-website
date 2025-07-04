# Keaton 个人网站

一个基于 Vue.js 构建的个人作品集网站，展示 Java 工程师的专业技能和项目经验。

## 🚀 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **样式**: CSS3 (原生CSS，蓝色主题设计)
- **部署平台**: Vercel

## 📋 功能特性

- ✨ 响应式设计，适配各种设备
- 🎨 蓝色主色调，简洁优雅的UI设计
- 📱 移动端友好的导航和布局
- 🔄 平滑滚动和动画效果
- 📊 个人介绍、技能展示
- 💼 作品集项目展示
- 🖼️ 个人图片画廊
- 📞 联系方式和社交链接

## 🛠️ 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 🌐 部署到 Vercel

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 登录 Vercel
```bash
vercel login
```

3. 部署项目
```bash
vercel
```

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上连接你的 GitHub 账户
3. 导入项目并自动部署

### 部署配置

项目已配置好 `vite.config.js`，支持静态部署：

```javascript
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist'
  }
})
```

## 📁 项目结构

```
keaton-intro-website/
├── public/
│   └── favicon.svg          # 网站图标
├── src/
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
└── README.md              # 项目说明
```

## 🎨 设计特色

- **蓝色主题**: 使用专业的蓝色调色板
- **现代布局**: 采用 CSS Grid 和 Flexbox
- **动画效果**: 平滑的滚动和淡入动画
- **响应式**: 完美适配桌面端和移动端

## 📝 自定义内容

你可以在 `src/App.vue` 中修改以下内容：

- 个人信息和介绍
- 技能和经验描述
- 项目作品集
- 图片展示内容
- 联系方式

## 📄 许可证

MIT License

---

**作者**: Keaton  
**职业**: Java 工程师  
**专注**: 构建高质量的软件解决方案