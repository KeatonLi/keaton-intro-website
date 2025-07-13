import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    // SEO优化：生成更好的文件名
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['@vueuse/head']
        }
      }
    },
    // 压缩优化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // 开发服务器配置
  server: {
    port: 3000,
    host: true
  },
  // 预构建优化
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/head']
  }
})