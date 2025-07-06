import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import hljs from 'highlight.js'

// 导入 Highlight.js 的默认样式
import 'highlight.js/styles/github.css'

// 配置 Highlight.js
hljs.configure({
  // 禁用自动检测以提高性能
  languages: [
    'javascript', 'typescript', 'java', 'python', 'sql', 'json', 
    'bash', 'shell', 'css', 'html', 'xml', 'markdown', 'yaml',
    'dockerfile', 'nginx', 'apache', 'php', 'go', 'rust', 'cpp',
    'c', 'csharp', 'ruby', 'kotlin', 'swift', 'scala', 'r'
  ]
})

// 使用 Highlight.js 进行代码高亮
function highlightCode(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const result = hljs.highlight(str, { language: lang })
      return `<pre class="hljs language-${lang}"><code class="hljs language-${lang}">${result.value}</code></pre>`
    } catch (error) {
      console.warn(`代码高亮失败 (${lang}):`, error)
    }
  }
  
  // 如果没有指定语言或语言不支持，尝试自动检测
  try {
    const result = hljs.highlightAuto(str)
    const detectedLang = result.language || 'text'
    return `<pre class="hljs language-${detectedLang}"><code class="hljs language-${detectedLang}">${result.value}</code></pre>`
  } catch (error) {
    console.warn('自动代码高亮失败:', error)
    // 降级到纯文本
    return `<pre class="hljs"><code class="hljs">${str.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  }
}

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
  highlight: function (str, lang) {
    try {
      return highlightCode(str, lang)
    } catch (error) {
      console.warn('代码高亮失败:', error)
      return `<pre class="language-${lang || 'text'}"><code class="language-${lang || 'text'}">${str.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    }
  }
})

// 添加容器插件用于提示框
md.use(container, 'tip', {
  render: function (tokens, idx) {
    const token = tokens[idx]
    const info = token.info.trim().slice(3).trim()
    if (token.nesting === 1) {
      const title = info || 'TIP'
      return `<div class="custom-container tip">\n<p class="custom-container-title">${title}</p>\n`
    } else {
      return '</div>\n'
    }
  }
})

md.use(container, 'warning', {
  render: function (tokens, idx) {
    const token = tokens[idx]
    const info = token.info.trim().slice(7).trim()
    if (token.nesting === 1) {
      const title = info || 'WARNING'
      return `<div class="custom-container warning">\n<p class="custom-container-title">${title}</p>\n`
    } else {
      return '</div>\n'
    }
  }
})

md.use(container, 'danger', {
  render: function (tokens, idx) {
    const token = tokens[idx]
    const info = token.info.trim().slice(6).trim()
    if (token.nesting === 1) {
      const title = info || 'DANGER'
      return `<div class="custom-container danger">\n<p class="custom-container-title">${title}</p>\n`
    } else {
      return '</div>\n'
    }
  }
})

md.use(container, 'info', {
  render: function (tokens, idx) {
    const token = tokens[idx]
    const info = token.info.trim().slice(4).trim()
    if (token.nesting === 1) {
      const title = info || 'INFO'
      return `<div class="custom-container info">\n<p class="custom-container-title">${title}</p>\n`
    } else {
      return '</div>\n'
    }
  }
})

// 自定义渲染规则
// 表格渲染
md.renderer.rules.table_open = () => '<div class="table-container"><table>'
md.renderer.rules.table_close = () => '</table></div>'

// 链接渲染
const defaultLinkRender = md.renderer.rules.link_open || function(tokens, idx, options, env, renderer) {
  return renderer.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const href = token.attrGet('href')
  
  if (href && (href.startsWith('http') || href.startsWith('//'))) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener noreferrer')
  }
  
  return defaultLinkRender(tokens, idx, options, env, renderer)
}

// 标题渲染 - 添加锚点
md.renderer.rules.heading_open = function (tokens, idx, options, env, renderer) {
  const token = tokens[idx]
  const level = token.tag
  const next = tokens[idx + 1]
  const content = next && next.type === 'inline' ? next.content : ''
  const anchor = content.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  
  token.attrSet('id', anchor)
  return `<${level} id="${anchor}">`
}

export function renderMarkdown(content) {
  return md.render(content)
}

// 导出 markdownRenderer 对象
export const markdownRenderer = {
  render: (content) => md.render(content)
}

export default md