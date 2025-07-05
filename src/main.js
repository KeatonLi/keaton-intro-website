import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { Buffer } from 'buffer'

// 设置全局 Buffer polyfill
window.Buffer = Buffer
globalThis.Buffer = Buffer
if (typeof global !== 'undefined') {
  global.Buffer = Buffer
}

createApp(App).mount('#app')