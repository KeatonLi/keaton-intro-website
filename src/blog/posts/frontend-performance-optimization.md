---
title: 前端性能优化实战指南
excerpt: 全面介绍前端性能优化的策略和技巧，包括资源优化、代码分割、缓存策略、图片优化、网络优化等核心技术。
author: Keaton
date: 2024-01-18
tags: [前端, 性能优化, JavaScript, CSS, Web性能]
---

# 前端性能优化实战指南

前端性能优化是提升用户体验的关键因素。一个快速响应的网站不仅能提高用户满意度，还能改善SEO排名和转化率。本文将深入探讨前端性能优化的各个方面，从基础概念到高级技巧。

## 1. 性能指标与测量

### 核心Web指标 (Core Web Vitals)

```javascript
// 测量LCP (Largest Contentful Paint)
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
      // 发送到分析服务
      gtag('event', 'LCP', {
        value: Math.round(entry.startTime),
        custom_parameter: 'performance'
      });
    }
  }
});
observer.observe({ entryTypes: ['largest-contentful-paint'] });

// 测量FID (First Input Delay)
const fidObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'first-input') {
      const fid = entry.processingStart - entry.startTime;
      console.log('FID:', fid);
      gtag('event', 'FID', {
        value: Math.round(fid),
        custom_parameter: 'performance'
      });
    }
  }
});
fidObserver.observe({ entryTypes: ['first-input'] });

// 测量CLS (Cumulative Layout Shift)
let clsValue = 0;
let clsEntries = [];

const clsObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
      clsEntries.push(entry);
    }
  }
});
clsObserver.observe({ entryTypes: ['layout-shift'] });

// 页面卸载时发送CLS数据
window.addEventListener('beforeunload', () => {
  gtag('event', 'CLS', {
    value: Math.round(clsValue * 1000),
    custom_parameter: 'performance'
  });
});
```

### 性能监控工具

```javascript
// 自定义性能监控类
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  init() {
    // 监控页面加载时间
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      this.metrics.firstByte = navigation.responseStart - navigation.fetchStart;
      
      this.sendMetrics();
    });

    // 监控资源加载
    this.observeResources();
    
    // 监控长任务
    this.observeLongTasks();
  }

  observeResources() {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) { // 超过1秒的资源
          console.warn('Slow resource:', entry.name, entry.duration);
          this.reportSlowResource(entry);
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(resourceObserver);
  }

  observeLongTasks() {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long task detected:', entry.duration);
        this.reportLongTask(entry);
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
    this.observers.push(longTaskObserver);
  }

  reportSlowResource(entry) {
    // 发送慢资源报告
    fetch('/api/performance/slow-resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: entry.name,
        duration: entry.duration,
        size: entry.transferSize,
        timestamp: Date.now()
      })
    });
  }

  reportLongTask(entry) {
    // 发送长任务报告
    fetch('/api/performance/long-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duration: entry.duration,
        startTime: entry.startTime,
        timestamp: Date.now()
      })
    });
  }

  sendMetrics() {
    fetch('/api/performance/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.metrics)
    });
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// 初始化性能监控
const performanceMonitor = new PerformanceMonitor();
```

## 2. 资源优化

### JavaScript优化

#### 代码分割 (Code Splitting)

```javascript
// 动态导入实现代码分割
// 路由级别的代码分割
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// 组件级别的代码分割
function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  const [ChartComponent, setChartComponent] = useState(null);

  const loadChart = async () => {
    if (!ChartComponent) {
      const { default: Chart } = await import('./Chart');
      setChartComponent(() => Chart);
    }
    setShowChart(true);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={loadChart}>Show Chart</button>
      {showChart && ChartComponent && <ChartComponent />}
    </div>
  );
}

// 功能级别的代码分割
class FeatureLoader {
  static async loadFeature(featureName) {
    const features = {
      'advanced-editor': () => import('./features/AdvancedEditor'),
      'data-visualization': () => import('./features/DataVisualization'),
      'file-uploader': () => import('./features/FileUploader')
    };

    if (features[featureName]) {
      const module = await features[featureName]();
      return module.default;
    }
    
    throw new Error(`Feature ${featureName} not found`);
  }
}

// 使用示例
async function enableAdvancedEditor() {
  try {
    const AdvancedEditor = await FeatureLoader.loadFeature('advanced-editor');
    // 渲染高级编辑器
    ReactDOM.render(<AdvancedEditor />, document.getElementById('editor'));
  } catch (error) {
    console.error('Failed to load advanced editor:', error);
  }
}
```

#### Tree Shaking优化

```javascript
// 避免导入整个库
// ❌ 不好的做法
import _ from 'lodash';
import * as utils from './utils';

// ✅ 好的做法
import { debounce, throttle } from 'lodash';
import { formatDate, validateEmail } from './utils';

// 使用ES6模块和具名导出
// utils.js
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN').format(date);
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 避免副作用导入
// ❌ 不好的做法
import './polyfills'; // 可能包含副作用

// ✅ 好的做法
if (!window.Promise) {
  import('./polyfills/promise');
}
```

#### 代码压缩和混淆

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除console语句
            drop_debugger: true, // 移除debugger语句
            pure_funcs: ['console.log'], // 移除特定函数调用
          },
          mangle: {
            safari10: true, // 兼容Safari 10
          },
          format: {
            comments: false, // 移除注释
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

### CSS优化

#### CSS压缩和优化

```css
/* 使用CSS自定义属性减少重复 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* 优化选择器性能 */
/* ❌ 避免过度嵌套 */
.header .nav .menu .item .link {
  color: var(--primary-color);
}

/* ✅ 使用更简洁的选择器 */
.nav-link {
  color: var(--primary-color);
  transition: var(--transition);
}

/* 使用CSS Grid和Flexbox替代float */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* 优化动画性能 */
.smooth-animation {
  transform: translateX(0);
  transition: transform 0.3s ease;
  will-change: transform; /* 提示浏览器优化 */
}

.smooth-animation:hover {
  transform: translateX(10px);
}

/* 使用contain属性优化渲染 */
.isolated-component {
  contain: layout style paint;
}
```

```javascript
// PostCSS配置优化
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: false,
      }]
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['active', 'show', 'fade', 'collapse']
    })
  ]
};
```

#### Critical CSS

```javascript
// 提取关键CSS
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  minify: true,
  extract: true,
  ignore: {
    atrule: ['@font-face'],
    rule: [/\.sr-only/],
    decl: (node, value) => /url\(/.test(value)
  }
});

// 动态加载非关键CSS
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = function() {
    this.media = 'all';
  };
  document.head.appendChild(link);
}

// 页面加载完成后加载非关键CSS
window.addEventListener('load', () => {
  loadCSS('/css/non-critical.css');
});
```

## 3. 图片优化

### 现代图片格式

```html
<!-- 使用picture元素提供多种格式 -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- 响应式图片 -->
<img 
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="
    (max-width: 400px) 100vw,
    (max-width: 800px) 50vw,
    33vw
  "
  alt="Responsive image"
  loading="lazy"
>
```

```javascript
// 图片懒加载实现
class LazyImageLoader {
  constructor() {
    this.imageObserver = null;
    this.images = [];
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver(
        this.onIntersection.bind(this),
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );
      this.observeImages();
    } else {
      // 降级处理
      this.loadAllImages();
    }
  }

  observeImages() {
    this.images = document.querySelectorAll('img[data-src]');
    this.images.forEach(img => this.imageObserver.observe(img));
  }

  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.imageObserver.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    return new Promise((resolve, reject) => {
      const imageLoader = new Image();
      
      imageLoader.onload = () => {
        img.src = src;
        if (srcset) img.srcset = srcset;
        img.classList.add('loaded');
        resolve(img);
      };
      
      imageLoader.onerror = reject;
      imageLoader.src = src;
    });
  }

  loadAllImages() {
    this.images = document.querySelectorAll('img[data-src]');
    this.images.forEach(img => this.loadImage(img));
  }
}

// 初始化懒加载
const lazyLoader = new LazyImageLoader();
```

### 图片压缩和优化

```javascript
// 客户端图片压缩
class ImageCompressor {
  static compress(file, options = {}) {
    const {
      quality = 0.8,
      maxWidth = 1920,
      maxHeight = 1080,
      format = 'image/jpeg'
    } = options;

    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // 计算新尺寸
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // 绘制并压缩
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, format, quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  static async batchCompress(files, options) {
    const compressedFiles = [];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const compressed = await this.compress(file, options);
        compressedFiles.push(compressed);
      } else {
        compressedFiles.push(file);
      }
    }
    
    return compressedFiles;
  }
}

// 使用示例
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  const compressedFiles = await ImageCompressor.batchCompress(files, {
    quality: 0.7,
    maxWidth: 1200
  });
  
  // 上传压缩后的文件
  uploadFiles(compressedFiles);
});
```

## 4. 网络优化

### HTTP/2和HTTP/3优化

```javascript
// 资源预加载策略
class ResourcePreloader {
  constructor() {
    this.preloadedResources = new Set();
  }

  // DNS预解析
  preconnect(origins) {
    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      document.head.appendChild(link);
    });
  }

  // 预加载关键资源
  preload(resources) {
    resources.forEach(({ href, as, type, crossorigin }) => {
      if (this.preloadedResources.has(href)) return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (crossorigin) link.crossOrigin = crossorigin;
      
      document.head.appendChild(link);
      this.preloadedResources.add(href);
    });
  }

  // 预取下一页资源
  prefetch(urls) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // 智能预加载
  intelligentPreload() {
    // 监听鼠标悬停，预加载链接
    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'A' && e.target.href) {
        this.prefetch([e.target.href]);
      }
    });

    // 监听滚动，预加载即将进入视口的内容
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const preloadUrls = entry.target.dataset.preload;
          if (preloadUrls) {
            this.prefetch(preloadUrls.split(','));
          }
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('[data-preload]').forEach(el => {
      observer.observe(el);
    });
  }
}

// 初始化预加载
const preloader = new ResourcePreloader();

// 预连接到关键域名
preloader.preconnect([
  'https://fonts.googleapis.com',
  'https://api.example.com',
  'https://cdn.example.com'
]);

// 预加载关键资源
preloader.preload([
  { href: '/css/critical.css', as: 'style' },
  { href: '/js/app.js', as: 'script' },
  { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
]);

// 启用智能预加载
preloader.intelligentPreload();
```

### 缓存策略

```javascript
// Service Worker缓存策略
class CacheStrategy {
  constructor() {
    this.CACHE_NAME = 'app-cache-v1';
    this.STATIC_CACHE = 'static-cache-v1';
    this.DYNAMIC_CACHE = 'dynamic-cache-v1';
    this.API_CACHE = 'api-cache-v1';
  }

  // 安装时预缓存静态资源
  async precacheStaticAssets() {
    const staticAssets = [
      '/',
      '/css/app.css',
      '/js/app.js',
      '/images/logo.png',
      '/manifest.json'
    ];

    const cache = await caches.open(this.STATIC_CACHE);
    return cache.addAll(staticAssets);
  }

  // 网络优先策略（适用于API请求）
  async networkFirst(request) {
    try {
      const response = await fetch(request);
      const cache = await caches.open(this.API_CACHE);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      return cachedResponse || new Response('Offline', { status: 503 });
    }
  }

  // 缓存优先策略（适用于静态资源）
  async cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const response = await fetch(request);
      const cache = await caches.open(this.DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      return new Response('Resource not available', { status: 404 });
    }
  }

  // 陈旧时重新验证策略
  async staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then(response => {
      const cache = caches.open(this.DYNAMIC_CACHE);
      cache.then(c => c.put(request, response.clone()));
      return response;
    });

    return cachedResponse || fetchPromise;
  }

  // 清理过期缓存
  async cleanupCache() {
    const cacheNames = await caches.keys();
    const validCaches = [this.STATIC_CACHE, this.DYNAMIC_CACHE, this.API_CACHE];
    
    return Promise.all(
      cacheNames
        .filter(cacheName => !validCaches.includes(cacheName))
        .map(cacheName => caches.delete(cacheName))
    );
  }
}

// Service Worker事件处理
const cacheStrategy = new CacheStrategy();

self.addEventListener('install', (event) => {
  event.waitUntil(
    cacheStrategy.precacheStaticAssets()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    cacheStrategy.cleanupCache()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API请求使用网络优先策略
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(cacheStrategy.networkFirst(request));
  }
  // 静态资源使用缓存优先策略
  else if (request.destination === 'image' || request.destination === 'script' || request.destination === 'style') {
    event.respondWith(cacheStrategy.cacheFirst(request));
  }
  // 其他请求使用陈旧时重新验证策略
  else {
    event.respondWith(cacheStrategy.staleWhileRevalidate(request));
  }
});
```

## 5. 运行时优化

### 虚拟滚动

```javascript
// 虚拟滚动组件
class VirtualScroller {
  constructor(container, options = {}) {
    this.container = container;
    this.itemHeight = options.itemHeight || 50;
    this.bufferSize = options.bufferSize || 5;
    this.items = options.items || [];
    this.renderItem = options.renderItem;
    
    this.scrollTop = 0;
    this.containerHeight = 0;
    this.totalHeight = 0;
    this.visibleStart = 0;
    this.visibleEnd = 0;
    
    this.init();
  }

  init() {
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    
    this.viewport = document.createElement('div');
    this.viewport.style.position = 'absolute';
    this.viewport.style.top = '0';
    this.viewport.style.left = '0';
    this.viewport.style.right = '0';
    
    this.container.appendChild(this.viewport);
    
    this.container.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    
    this.update();
  }

  onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleRange();
    this.render();
  }

  onResize() {
    this.containerHeight = this.container.clientHeight;
    this.updateVisibleRange();
    this.render();
  }

  updateVisibleRange() {
    this.containerHeight = this.container.clientHeight;
    this.totalHeight = this.items.length * this.itemHeight;
    
    this.visibleStart = Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.bufferSize);
    this.visibleEnd = Math.min(
      this.items.length - 1,
      Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + this.bufferSize
    );
  }

  render() {
    // 设置总高度
    this.container.style.height = `${this.totalHeight}px`;
    
    // 清空视口
    this.viewport.innerHTML = '';
    
    // 渲染可见项目
    for (let i = this.visibleStart; i <= this.visibleEnd; i++) {
      const item = this.items[i];
      if (!item) continue;
      
      const element = this.renderItem(item, i);
      element.style.position = 'absolute';
      element.style.top = `${i * this.itemHeight}px`;
      element.style.height = `${this.itemHeight}px`;
      element.style.left = '0';
      element.style.right = '0';
      
      this.viewport.appendChild(element);
    }
  }

  update() {
    this.updateVisibleRange();
    this.render();
  }

  setItems(items) {
    this.items = items;
    this.update();
  }
}

// 使用示例
const container = document.getElementById('list-container');
const virtualScroller = new VirtualScroller(container, {
  itemHeight: 60,
  bufferSize: 10,
  items: largeDataArray,
  renderItem: (item, index) => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    return div;
  }
});
```

### 防抖和节流

```javascript
// 高性能防抖和节流实现
class PerformanceUtils {
  // 防抖函数
  static debounce(func, wait, immediate = false) {
    let timeout;
    let result;
    
    const debounced = function(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) result = func.apply(this, args);
      };
      
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) result = func.apply(this, args);
      return result;
    };
    
    debounced.cancel = () => {
      clearTimeout(timeout);
      timeout = null;
    };
    
    return debounced;
  }

  // 节流函数
  static throttle(func, wait, options = {}) {
    let timeout;
    let previous = 0;
    const { leading = true, trailing = true } = options;
    
    const throttled = function(...args) {
      const now = Date.now();
      
      if (!previous && !leading) previous = now;
      
      const remaining = wait - (now - previous);
      
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        return func.apply(this, args);
      } else if (!timeout && trailing) {
        timeout = setTimeout(() => {
          previous = leading ? Date.now() : 0;
          timeout = null;
          func.apply(this, args);
        }, remaining);
      }
    };
    
    throttled.cancel = () => {
      clearTimeout(timeout);
      timeout = null;
      previous = 0;
    };
    
    return throttled;
  }

  // 使用requestAnimationFrame的节流
  static rafThrottle(func) {
    let ticking = false;
    
    return function(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          func.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  // 空闲时执行
  static idleCallback(func, options = {}) {
    if ('requestIdleCallback' in window) {
      return requestIdleCallback(func, options);
    } else {
      // 降级处理
      return setTimeout(func, 1);
    }
  }
}

// 使用示例
const searchInput = document.getElementById('search');
const scrollContainer = document.getElementById('scroll-container');

// 搜索防抖
const debouncedSearch = PerformanceUtils.debounce((query) => {
  console.log('Searching for:', query);
  // 执行搜索逻辑
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// 滚动节流
const throttledScroll = PerformanceUtils.throttle(() => {
  console.log('Scroll position:', scrollContainer.scrollTop);
  // 执行滚动处理逻辑
}, 100);

scrollContainer.addEventListener('scroll', throttledScroll);

// 使用RAF节流处理动画
const rafThrottledAnimation = PerformanceUtils.rafThrottle(() => {
  // 执行动画逻辑
  updateAnimationFrame();
});

window.addEventListener('scroll', rafThrottledAnimation);
```

## 6. 构建优化

### Webpack优化配置

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      app: './src/index.js',
      vendor: ['react', 'react-dom', 'lodash']
    },
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
      clean: true,
    },
    
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
    },
    
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                isProduction && 'babel-plugin-transform-remove-console'
              ].filter(Boolean)
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024 // 8kb
            }
          },
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        }
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false
      }),
      
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].chunk.css'
      }),
      
      isProduction && new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      }),
      
      process.env.ANALYZE && new BundleAnalyzerPlugin()
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
        'utils': path.resolve(__dirname, 'src/utils')
      },
      extensions: ['.js', '.jsx', '.json']
    },
    
    devServer: {
      hot: true,
      compress: true,
      historyApiFallback: true,
    }
  };
};
```

## 总结

前端性能优化是一个系统性工程，需要从多个维度进行考虑：

1. **测量和监控**：建立完善的性能监控体系
2. **资源优化**：代码分割、压缩、Tree Shaking
3. **图片优化**：现代格式、懒加载、压缩
4. **网络优化**：缓存策略、预加载、HTTP/2
5. **运行时优化**：虚拟滚动、防抖节流、内存管理
6. **构建优化**：Webpack配置、打包策略

性能优化是一个持续的过程，需要根据实际业务场景和用户需求，选择合适的优化策略。同时要注意平衡性能和开发效率，避免过度优化。