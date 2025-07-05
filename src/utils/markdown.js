import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import Prism from 'prismjs'

// 简化的语法高亮函数，避免动态导入问题
function highlightCode(str, lang) {
  // 基础语言支持
  const supportedLanguages = {
    'javascript': 'js',
    'js': 'js',
    'typescript': 'ts',
    'ts': 'ts',
    'java': 'java',
    'python': 'python',
    'py': 'python',
    'sql': 'sql',
    'json': 'json',
    'bash': 'bash',
    'shell': 'bash',
    'css': 'css',
    'html': 'html',
    'xml': 'html'
  }
  
  const normalizedLang = supportedLanguages[lang] || lang
  
  // 简单的语法高亮，不依赖Prism组件
  if (normalizedLang && ['js', 'javascript', 'ts', 'typescript'].includes(normalizedLang)) {
    // JavaScript/TypeScript 简单高亮
    const highlighted = str
      .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export|from|default)\b/g, '<span class="token keyword">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>')
      .replace(/\b\d+\b/g, '<span class="token number">$&</span>')
      .replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="token string">$&</span>')
      .replace(/\/\/.*$/gm, '<span class="token comment">$&</span>')
    return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`
  }
  
  // 其他语言使用基础样式
  return `<pre class="language-${lang || 'text'}"><code class="language-${lang || 'text'}">${str.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
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