<template>
  <div>
    <!-- 页面标题 -->
    <section class="pt-24 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 mb-4">
          <NuxtLink to="/tools" class="text-gray-500 hover:text-primary-600 flex items-center gap-1 text-sm">
            <Icon name="ph:arrow-left-bold" class="w-4 h-4" />
            工具箱
          </NuxtLink>
          <span class="text-gray-300">/</span>
          <span class="text-primary-600 text-sm font-medium">JSON 格式转换</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-primary-600">JSON 格式转换</span>
        </h1>
        <p class="text-gray-600">
          JSON 与 YAML、XML、CSV 等格式之间的相互转换
        </p>
      </div>
    </section>

    <!-- 工具主体 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 转换方向选择 -->
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
          <div class="flex flex-col md:flex-row items-center gap-4">
            <!-- 源格式 -->
            <div class="flex-1 w-full">
              <label class="block text-sm font-medium text-gray-700 mb-2">源格式</label>
              <select 
                v-model="sourceFormat" 
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="xml">XML</option>
                <option value="csv">CSV</option>
                <option value="properties">Properties</option>
                <option value="toml">TOML</option>
              </select>
            </div>

            <!-- 交换按钮 -->
            <button 
              @click="swapFormats"
              class="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors mt-6"
            >
              <Icon name="ph:swap-bold" class="w-5 h-5 text-gray-600" />
            </button>

            <!-- 目标格式 -->
            <div class="flex-1 w-full">
              <label class="block text-sm font-medium text-gray-700 mb-2">目标格式</label>
              <select 
                v-model="targetFormat" 
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="xml">XML</option>
                <option value="csv">CSV</option>
                <option value="properties">Properties</option>
                <option value="toml">TOML</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button 
            @click="convert" 
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:arrows-clockwise-bold" class="w-4 h-4" />
            转换
          </button>
          <div class="flex-1"></div>
          <button 
            @click="clearAll" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Icon name="ph:trash-bold" class="w-4 h-4" />
            清空
          </button>
          <button 
            @click="copyResult" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!outputText"
          >
            <Icon name="ph:copy-bold" class="w-4 h-4" />
            复制结果
          </button>
        </div>

        <!-- 输入输出区域 -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- 输入 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="ph:upload-simple-bold" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700">输入 ({{ formatLabels[sourceFormat] }})</span>
              </div>
              <span class="text-xs text-gray-400">{{ inputStats }}</span>
            </div>
            <textarea
              v-model="inputText"
              :placeholder="getPlaceholder(sourceFormat)"
              class="w-full h-[400px] p-4 font-mono text-sm resize-none focus:outline-none"
              spellcheck="false"
            ></textarea>
          </div>

          <!-- 输出 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="ph:download-simple-bold" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700">输出 ({{ formatLabels[targetFormat] }})</span>
              </div>
              <div class="flex items-center gap-2">
                <span v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</span>
                <span class="text-xs text-gray-400">{{ outputStats }}</span>
              </div>
            </div>
            <textarea
              v-model="outputText"
              readonly
              placeholder="转换结果将显示在这里..."
              class="w-full h-[400px] p-4 font-mono text-sm resize-none focus:outline-none bg-gray-50"
              :class="errorMessage ? 'text-red-600' : ''"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- 格式说明 -->
        <div class="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 class="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Icon name="ph:info-bold" class="w-4 h-4" />
            {{ formatLabels[sourceFormat] }} 格式说明
          </h3>
          <p class="text-blue-700 text-sm">{{ getFormatDescription(sourceFormat) }}</p>
        </div>

        <!-- 示例 -->
        <div class="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="ph:lightbulb-bold" class="w-4 h-4 text-yellow-500" />
            示例数据
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              v-for="example in getExamples()" 
              :key="example.name"
              @click="loadExample(example)" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              {{ example.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
      <div v-if="showToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg flex items-center gap-2 z-50">
        <Icon :name="toastIcon" class="w-5 h-5" :class="toastIconClass" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
useHead({
  title: 'JSON 格式转换 - Keaton',
  meta: [
    { name: 'description', content: 'JSON、YAML、XML、CSV、Properties、TOML 格式之间的相互转换工具。' }
  ]
})

const sourceFormat = ref('json')
const targetFormat = ref('yaml')
const inputText = ref('')
const outputText = ref('')
const errorMessage = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastIcon = ref('ph:check-circle-bold')
const toastIconClass = ref('text-green-400')

const formatLabels = {
  json: 'JSON',
  yaml: 'YAML',
  xml: 'XML',
  csv: 'CSV',
  properties: 'Properties',
  toml: 'TOML'
}

const inputStats = computed(() => {
  if (!inputText.value) return '0 字符'
  return `${inputText.value.length} 字符`
})

const outputStats = computed(() => {
  if (!outputText.value) return '0 字符'
  return `${outputText.value.length} 字符`
})

const showMessage = (message, icon = 'ph:check-circle-bold', iconClass = 'text-green-400') => {
  toastMessage.value = message
  toastIcon.value = icon
  toastIconClass.value = iconClass
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000)
}

const getPlaceholder = (format) => {
  const placeholders = {
    json: '{\n  "name": "Keaton",\n  "age": 25\n}',
    yaml: 'name: Keaton\nage: 25',
    xml: '<user>\n  <name>Keaton</name>\n  <age>25</age>\n</user>',
    csv: 'name,age\nKeaton,25',
    properties: 'name=Keaton\nage=25',
    toml: '[user]\nname = "Keaton"\nage = 25'
  }
  return `在此粘贴 ${format.toUpperCase()} 数据...\n\n示例:\n${placeholders[format]}`
}

const getFormatDescription = (format) => {
  const descriptions = {
    json: 'JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式，易于人阅读和编写，也易于机器解析和生成。',
    yaml: 'YAML (YAML Ain\'t Markup Language) 是一种直观的数据序列化格式，使用缩进表示层级关系。',
    xml: 'XML (eXtensible Markup Language) 是一种标记语言，使用标签来定义数据结构。',
    csv: 'CSV (Comma-Separated Values) 是一种以逗号分隔值的纯文本格式，常用于表格数据交换。',
    properties: 'Properties 是 Java 中常用的配置文件格式，使用 key=value 的形式。',
    toml: 'TOML (Tom\'s Obvious, Minimal Language) 是一种语义明显、易于阅读的最小化配置文件格式。'
  }
  return descriptions[format]
}

const swapFormats = () => {
  const temp = sourceFormat.value
  sourceFormat.value = targetFormat.value
  targetFormat.value = temp
  inputText.value = outputText.value
  outputText.value = ''
  errorMessage.value = ''
}

const convert = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入要转换的数据', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  errorMessage.value = ''

  try {
    // 先解析源格式为 JavaScript 对象
    let data = parseInput(inputText.value, sourceFormat.value)
    
    // 再转换为目标格式
    outputText.value = stringifyOutput(data, targetFormat.value)
    showMessage('转换成功')
  } catch (error) {
    errorMessage.value = '转换失败'
    outputText.value = `错误：${error.message}`
    showMessage('转换失败', 'ph:x-circle-bold', 'text-red-400')
  }
}

const parseInput = (text, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(text)
    case 'yaml':
      return parseYAML(text)
    case 'xml':
      return parseXML(text)
    case 'csv':
      return parseCSV(text)
    case 'properties':
      return parseProperties(text)
    case 'toml':
      return parseTOML(text)
    default:
      throw new Error(`不支持的源格式: ${format}`)
  }
}

const stringifyOutput = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2)
    case 'yaml':
      return stringifyYAML(data)
    case 'xml':
      return stringifyXML(data)
    case 'csv':
      return stringifyCSV(data)
    case 'properties':
      return stringifyProperties(data)
    case 'toml':
      return stringifyTOML(data)
    default:
      throw new Error(`不支持的目标格式: ${format}`)
  }
}

// YAML 解析（简化版）
const parseYAML = (text) => {
  const lines = text.split('\n')
  const result = {}
  let current = result
  const stack = []
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    
    const indent = line.search(/\S/)
    const content = line.trim()
    
    if (content.includes(':')) {
      const [key, ...valueParts] = content.split(':')
      const value = valueParts.join(':').trim()
      
      // 处理缩进层级
      while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
        current = stack.length > 0 ? stack[stack.length - 1].obj : result
      }
      
      if (value === '') {
        // 子对象
        current[key] = {}
        stack.push({ obj: current[key], indent })
        current = current[key]
      } else {
        // 解析值
        current[key] = parseYAMLValue(value)
      }
    }
  }
  
  return result
}

const parseYAMLValue = (value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null' || value === '~') return null
  if (/^-?\d+$/.test(value)) return parseInt(value)
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value)
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1)
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1)
  return value
}

// YAML 序列化
const stringifyYAML = (data, indent = 0) => {
  const spaces = '  '.repeat(indent)
  let result = ''
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null) {
      result += `${spaces}${key}: null\n`
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      result += `${spaces}${key}:\n${stringifyYAML(value, indent + 1)}`
    } else if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`
      for (const item of value) {
        if (typeof item === 'object') {
          result += `${spaces}-\n${stringifyYAML(item, indent + 2).replace(new RegExp(`^${spaces}  `, 'gm'), `${spaces}  `)}`
        } else {
          result += `${spaces}- ${item}\n`
        }
      }
    } else if (typeof value === 'string' && (value.includes(':') || value.includes('#'))) {
      result += `${spaces}${key}: "${value}"\n`
    } else {
      result += `${spaces}${key}: ${value}\n`
    }
  }
  
  return result
}

// XML 解析（简化版）
const parseXML = (text) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(text, 'text/xml')
  
  const parseNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim()
      if (!text) return null
      // 尝试转换为数字或布尔值
      if (/^-?\d+$/.test(text)) return parseInt(text)
      if (/^-?\d+\.\d+$/.test(text)) return parseFloat(text)
      if (text === 'true') return true
      if (text === 'false') return false
      return text
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const result = {}
      
      // 处理属性
      if (node.attributes) {
        for (const attr of node.attributes) {
          result[`@${attr.name}`] = attr.value
        }
      }
      
      // 处理子节点
      const childNodes = Array.from(node.childNodes).filter(n => 
        n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      )
      
      if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
        const textValue = parseNode(childNodes[0])
        if (Object.keys(result).length === 0) {
          return textValue
        }
        result['#text'] = textValue
      } else if (childNodes.length > 0) {
        for (const child of childNodes) {
          const childResult = parseNode(child)
          if (childResult === null) continue
          
          if (child.nodeType === Node.ELEMENT_NODE) {
            if (result[child.nodeName]) {
              if (!Array.isArray(result[child.nodeName])) {
                result[child.nodeName] = [result[child.nodeName]]
              }
              result[child.nodeName].push(childResult)
            } else {
              result[child.nodeName] = childResult
            }
          }
        }
      }
      
      return Object.keys(result).length > 0 ? result : ''
    }
    
    return null
  }
  
  const root = xmlDoc.documentElement
  const result = {}
  result[root.nodeName] = parseNode(root)
  return result
}

// XML 序列化
const stringifyXML = (data, rootName = 'root') => {
  const escapeXML = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }
  
  const toXML = (obj, name) => {
    if (obj === null) return `<${name}></${name}>`
    if (typeof obj !== 'object') return `<${name}>${escapeXML(obj)}</${name}>`
    
    let attrs = ''
    let content = ''
    
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('@')) {
        attrs += ` ${key.slice(1)}="${escapeXML(value)}"`
      } else if (key === '#text') {
        content = escapeXML(value)
      } else if (Array.isArray(value)) {
        for (const item of value) {
          content += toXML(item, key)
        }
      } else if (typeof value === 'object') {
        content += toXML(value, key)
      } else {
        content += toXML(value, key)
      }
    }
    
    return `<${name}${attrs}>${content}</${name}>`
  }
  
  const entries = Object.entries(data)
  if (entries.length === 1) {
    const [key, value] = entries[0]
    return `<?xml version="1.0" encoding="UTF-8"?>\n${toXML(value, key)}`
  }
  
  return `<?xml version="1.0" encoding="UTF-8"?>\n${toXML(data, rootName)}`
}

// CSV 解析
const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim())
  if (lines.length < 2) throw new Error('CSV 至少需要标题行和一行数据')
  
  const headers = parseCSVLine(lines[0])
  const result = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] || ''
    })
    result.push(obj)
  }
  
  return result
}

const parseCSVLine = (line) => {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

// CSV 序列化
const stringifyCSV = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('CSV 输出需要数组格式')
  }
  
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const escapeCSV = (str) => {
    const s = String(str)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`
    }
    return s
  }
  
  let result = headers.map(escapeCSV).join(',') + '\n'
  
  for (const row of data) {
    result += headers.map(h => escapeCSV(row[h] || '')).join(',') + '\n'
  }
  
  return result.trim()
}

// Properties 解析
const parseProperties = (text) => {
  const result = {}
  const lines = text.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    
    const equalIndex = trimmed.indexOf('=')
    if (equalIndex > 0) {
      const key = trimmed.substring(0, equalIndex).trim()
      const value = trimmed.substring(equalIndex + 1).trim()
      
      // 处理嵌套属性
      const keys = key.split('.')
      let current = result
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
    }
  }
  
  return result
}

// Properties 序列化
const stringifyProperties = (data, prefix = '') => {
  let result = ''
  
  for (const [key, value] of Object.entries(data)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (value === null) {
      result += `${fullKey}=\n`
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      result += stringifyProperties(value, fullKey)
    } else {
      result += `${fullKey}=${value}\n`
    }
  }
  
  return result
}

// TOML 解析（简化版）
const parseTOML = (text) => {
  const result = {}
  let current = result
  const lines = text.split('\n')
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    
    // 处理表头 [section] 或 [[array]]
    if (trimmed.startsWith('[')) {
      const section = trimmed.replace(/\[\[?|\]\]?/g, '')
      current = {}
      
      if (trimmed.startsWith('[[')) {
        // 数组表
        if (!result[section]) result[section] = []
        result[section].push(current)
      } else {
        // 普通表
        const keys = section.split('.')
        let target = result
        for (const key of keys.slice(0, -1)) {
          if (!target[key]) target[key] = {}
          target = target[key]
        }
        target[keys[keys.length - 1]] = current
      }
    } else if (trimmed.includes('=')) {
      // 键值对
      const equalIndex = trimmed.indexOf('=')
      const key = trimmed.substring(0, equalIndex).trim()
      const value = trimmed.substring(equalIndex + 1).trim()
      current[key] = parseTOMLValue(value)
    }
  }
  
  return result
}

const parseTOMLValue = (value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n')
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1)
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    const content = value.slice(1, -1)
    if (!content.trim()) return []
    return content.split(',').map(v => parseTOMLValue(v.trim()))
  }
  if (/^-?\d+$/.test(value)) return parseInt(value)
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value)
  return value
}

// TOML 序列化
const stringifyTOML = (data) => {
  const formatValue = (value) => {
    if (value === null) return ''
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    if (typeof value === 'number') return String(value)
    if (typeof value === 'string') {
      if (value.includes('\n') || value.includes('"')) {
        return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
      }
      return `"${value}"`
    }
    if (Array.isArray(value)) {
      return `[${value.map(formatValue).join(', ')}]`
    }
    return String(value)
  }
  
  const processObject = (obj, prefix = '') => {
    let result = ''
    const simple = {}
    const complex = {}
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        simple[key] = value
      } else {
        complex[key] = value
      }
    }
    
    // 先输出简单值
    for (const [key, value] of Object.entries(simple)) {
      result += `${key} = ${formatValue(value)}\n`
    }
    
    // 再输出复杂值
    for (const [key, value] of Object.entries(complex)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      result += `\n[${fullKey}]\n${processObject(value, fullKey)}`
    }
    
    return result
  }
  
  return processObject(data)
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
  errorMessage.value = ''
  showMessage('已清空')
}

const copyResult = () => {
  if (!outputText.value) return
  
  navigator.clipboard.writeText(outputText.value).then(() => {
    showMessage('复制成功')
  }).catch(() => {
    showMessage('复制失败', 'ph:x-circle-bold', 'text-red-400')
  })
}

const getExamples = () => {
  return [
    { name: 'user', label: '用户对象', data: { name: 'Keaton', age: 25, city: '深圳', email: 'keaton@example.com' } },
    { name: 'config', label: '配置对象', data: { server: { host: 'localhost', port: 8080 }, database: { url: 'jdbc:mysql://localhost:3306/test', username: 'root' } } },
    { name: 'array', label: '数组数据', data: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }] }
  ]
}

const loadExample = (example) => {
  if (sourceFormat.value === 'json') {
    inputText.value = JSON.stringify(example.data, null, 2)
  } else if (sourceFormat.value === 'yaml') {
    inputText.value = stringifyYAML(example.data)
  } else if (sourceFormat.value === 'xml') {
    inputText.value = stringifyXML(example.data, 'data')
  } else if (sourceFormat.value === 'properties') {
    inputText.value = stringifyProperties(example.data)
  } else if (sourceFormat.value === 'toml') {
    inputText.value = stringifyTOML(example.data)
  }
  outputText.value = ''
  errorMessage.value = ''
  showMessage('已加载示例')
}
</script>
