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
          <span class="text-primary-600 text-sm font-medium">JSON 格式化</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-primary-600">JSON 格式化工具</span>
        </h1>
        <p class="text-gray-600">
          JSON 数据美化、压缩、转义、校验，支持语法高亮
        </p>
      </div>
    </section>

    <!-- 工具主体 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 操作按钮栏 -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button 
            @click="formatJSON" 
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:brackets-angle-bold" class="w-4 h-4" />
            美化
          </button>
          <button 
            @click="compressJSON" 
            class="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:arrows-in-line-horizontal-bold" class="w-4 h-4" />
            压缩
          </button>
          <button 
            @click="escapeJSON" 
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:quotes-bold" class="w-4 h-4" />
            转义
          </button>
          <button 
            @click="unescapeJSON" 
            class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:quotes-slash-bold" class="w-4 h-4" />
            去转义
          </button>
          <button 
            @click="validateJSON" 
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText"
          >
            <Icon name="ph:check-circle-bold" class="w-4 h-4" />
            校验
          </button>
          <button 
            @click="showSearchPanel = !showSearchPanel" 
            class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!outputText"
          >
            <Icon name="ph:magnifying-glass-bold" class="w-4 h-4" />
            搜索
          </button>
          <div class="flex-1"></div>
          <button 
            @click="clearAll" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!inputText && !outputText"
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
          <!-- 输入区域 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="ph:pencil-simple-bold" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700">输入</span>
              </div>
              <div class="text-xs text-gray-400">
                {{ inputStats }}
              </div>
            </div>
            <textarea
              v-model="inputText"
              placeholder="在此粘贴 JSON 数据..."
              class="w-full h-[500px] p-4 font-mono text-sm resize-none focus:outline-none"
              spellcheck="false"
            ></textarea>
          </div>

          <!-- 输出区域 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <!-- 搜索面板 -->
            <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-0 translate-y-0" leave-active-class="transition duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
              <div v-if="showSearchPanel" class="px-4 py-3 bg-orange-50 border-b border-orange-100">
                <div class="flex items-center gap-3">
                  <div class="flex-1 relative">
                    <Icon name="ph:magnifying-glass-bold" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="输入搜索内容..."
                      class="w-full pl-9 pr-4 py-2 rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                      @input="performSearch"
                      @keydown.enter="nextSearchResult"
                      @keydown.shift.enter.prevent="prevSearchResult"
                    >
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <span v-if="searchResults.length > 0" class="font-mono">
                      {{ currentSearchIndex + 1 }} / {{ searchResults.length }}
                    </span>
                    <span v-else-if="searchQuery" class="text-gray-400">无结果</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <button 
                      @click="prevSearchResult"
                      :disabled="searchResults.length === 0"
                      class="p-2 rounded-lg hover:bg-orange-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Icon name="ph:caret-up-bold" class="w-4 h-4" />
                    </button>
                    <button 
                      @click="nextSearchResult"
                      :disabled="searchResults.length === 0"
                      class="p-2 rounded-lg hover:bg-orange-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Icon name="ph:caret-down-bold" class="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    @click="showSearchPanel = false; clearSearch()"
                    class="p-2 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <Icon name="ph:x-bold" class="w-4 h-4" />
                  </button>
                </div>
                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input v-model="searchOptions.caseSensitive" type="checkbox" class="rounded text-orange-500" @change="performSearch">
                    区分大小写
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input v-model="searchOptions.wholeWord" type="checkbox" class="rounded text-orange-500" @change="performSearch">
                    全字匹配
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input v-model="searchOptions.regex" type="checkbox" class="rounded text-orange-500" @change="performSearch">
                    正则表达式
                  </label>
                </div>
              </div>
            </Transition>
            
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="ph:eye-bold" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700">输出</span>
              </div>
              <div class="flex items-center gap-4">
                <span v-if="validationStatus" :class="validationStatus.class" class="text-xs flex items-center gap-1">
                  <Icon :name="validationStatus.icon" class="w-3 h-3" />
                  {{ validationStatus.text }}
                </span>
                <span class="text-xs text-gray-400">{{ outputStats }}</span>
              </div>
            </div>
            <div class="relative">
              <textarea
                ref="outputTextarea"
                v-model="outputText"
                readonly
                placeholder="结果将显示在这里..."
                class="w-full h-[500px] p-4 font-mono text-sm resize-none focus:outline-none bg-gray-50"
                spellcheck="false"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 选项设置 -->
        <div class="mt-6 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 class="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="ph:gear-bold" class="w-4 h-4" />
            选项设置
          </h3>
          <div class="flex flex-wrap gap-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="options.indentSize" 
                type="radio" 
                :value="2" 
                class="w-4 h-4 text-primary-600"
              >
              <span class="text-sm text-gray-600">2 空格缩进</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="options.indentSize" 
                type="radio" 
                :value="4" 
                class="w-4 h-4 text-primary-600"
              >
              <span class="text-sm text-gray-600">4 空格缩进</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="options.sortKeys" 
                type="checkbox" 
                class="w-4 h-4 text-primary-600 rounded"
              >
              <span class="text-sm text-gray-600">按键名排序</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="options.unicodeToChinese" 
                type="checkbox" 
                class="w-4 h-4 text-primary-600 rounded"
              >
              <span class="text-sm text-gray-600">Unicode 转中文</span>
            </label>
          </div>
        </div>

        <!-- 示例数据 -->
        <div class="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="ph:lightbulb-bold" class="w-4 h-4 text-yellow-500" />
            示例数据
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              @click="loadExample('simple')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              简单对象
            </button>
            <button 
              @click="loadExample('nested')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              嵌套对象
            </button>
            <button 
              @click="loadExample('array')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              数组
            </button>
            <button 
              @click="loadExample('complex')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              复杂结构
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 复制成功提示 -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
      <div v-if="showToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg flex items-center gap-2 z-50">
        <Icon name="ph:check-circle-bold" class="w-5 h-5 text-green-400" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
useHead({
  title: 'JSON 格式化工具 - Keaton',
  meta: [
    { name: 'description', content: '免费的在线 JSON 格式化工具，支持美化、压缩、转义、校验等功能。' }
  ]
})

// 响应式数据
const inputText = ref('')
const outputText = ref('')
const formattedJSON = ref('')
const showHighlight = ref(false)
const validationStatus = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

// 搜索相关
const showSearchPanel = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const currentSearchIndex = ref(-1)
const outputTextarea = ref(null)
const searchOptions = ref({
  caseSensitive: false,
  wholeWord: false,
  regex: false
})

const options = ref({
  indentSize: 2,
  sortKeys: false,
  unicodeToChinese: true
})

// 计算属性：统计信息
const inputStats = computed(() => {
  if (!inputText.value) return '0 字符'
  const chars = inputText.value.length
  const lines = inputText.value.split('\n').length
  return `${chars} 字符 · ${lines} 行`
})

const outputStats = computed(() => {
  if (!outputText.value) return '0 字符'
  const chars = outputText.value.length
  const lines = outputText.value.split('\n').length
  return `${chars} 字符 · ${lines} 行`
})

// 方法
const showMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

// 搜索功能
const performSearch = () => {
  if (!searchQuery.value || !outputText.value) {
    searchResults.value = []
    currentSearchIndex.value = -1
    return
  }

  const text = outputText.value
  const query = searchQuery.value
  const results = []

  try {
    if (searchOptions.value.regex) {
      const flags = searchOptions.value.caseSensitive ? 'g' : 'gi'
      const regex = new RegExp(query, flags)
      let match
      while ((match = regex.exec(text)) !== null) {
        results.push({ start: match.index, end: match.index + match[0].length })
      }
    } else {
      let searchText = text
      let searchQueryStr = query
      
      if (!searchOptions.value.caseSensitive) {
        searchText = text.toLowerCase()
        searchQueryStr = query.toLowerCase()
      }
      
      let index = 0
      while ((index = searchText.indexOf(searchQueryStr, index)) !== -1) {
        const endIndex = index + searchQueryStr.length
        
        // 检查全字匹配
        if (searchOptions.value.wholeWord) {
          const charBefore = index > 0 ? text[index - 1] : ' '
          const charAfter = endIndex < text.length ? text[endIndex] : ' '
          const wordBoundary = /\W/
          if (!wordBoundary.test(charBefore) || !wordBoundary.test(charAfter)) {
            index = endIndex
            continue
          }
        }
        
        results.push({ start: index, end: endIndex })
        index = endIndex
      }
    }
  } catch (e) {
    // 正则表达式错误，忽略
  }

  searchResults.value = results
  currentSearchIndex.value = results.length > 0 ? 0 : -1
  
  if (results.length > 0) {
    highlightSearchResult()
  }
}

const highlightSearchResult = () => {
  if (currentSearchIndex.value < 0 || !outputTextarea.value) return
  
  const result = searchResults.value[currentSearchIndex.value]
  const textarea = outputTextarea.value
  
  // 设置选中区域
  textarea.focus()
  textarea.setSelectionRange(result.start, result.end)
  
  // 计算行号并滚动到对应位置
  const textBefore = outputText.value.substring(0, result.start)
  const lineNumber = textBefore.split('\n').length
  const lineHeight = 20 // 近似行高
  textarea.scrollTop = (lineNumber - 5) * lineHeight
}

const nextSearchResult = () => {
  if (searchResults.value.length === 0) return
  currentSearchIndex.value = (currentSearchIndex.value + 1) % searchResults.value.length
  highlightSearchResult()
}

const prevSearchResult = () => {
  if (searchResults.value.length === 0) return
  currentSearchIndex.value = currentSearchIndex.value <= 0 
    ? searchResults.value.length - 1 
    : currentSearchIndex.value - 1
  highlightSearchResult()
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  currentSearchIndex.value = -1
  if (outputTextarea.value) {
    outputTextarea.value.setSelectionRange(0, 0)
  }
}

const formatJSON = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入 JSON 数据')
    return
  }
  
  try {
    let parsed = JSON.parse(inputText.value)
    
    // 如果启用按键排序
    if (options.value.sortKeys) {
      parsed = sortObjectKeys(parsed)
    }
    
    const formatted = JSON.stringify(parsed, null, options.value.indentSize)
    outputText.value = formatted
    formattedJSON.value = formatted
    validationStatus.value = { text: '格式正确', class: 'text-green-600', icon: 'ph:check-circle-bold' }
    showMessage('格式化成功')
  } catch (error) {
    outputText.value = `错误：${error.message}`
    validationStatus.value = { text: '格式错误', class: 'text-red-600', icon: 'ph:x-circle-bold' }
  }
}

const compressJSON = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入 JSON 数据')
    return
  }
  
  try {
    const parsed = JSON.parse(inputText.value)
    outputText.value = JSON.stringify(parsed)
    validationStatus.value = { text: '压缩成功', class: 'text-green-600', icon: 'ph:check-circle-bold' }
    showMessage('压缩成功')
  } catch (error) {
    outputText.value = `错误：${error.message}`
    validationStatus.value = { text: '格式错误', class: 'text-red-600', icon: 'ph:x-circle-bold' }
  }
}

const escapeJSON = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入 JSON 数据')
    return
  }
  
  try {
    outputText.value = JSON.stringify(inputText.value).slice(1, -1)
    showMessage('转义成功')
  } catch (error) {
    outputText.value = `错误：${error.message}`
  }
}

const unescapeJSON = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入 JSON 数据')
    return
  }
  
  try {
    outputText.value = JSON.parse(`"${inputText.value}"`)
    showMessage('去转义成功')
  } catch (error) {
    outputText.value = `错误：${error.message}`
  }
}

const validateJSON = () => {
  if (!inputText.value.trim()) {
    showMessage('请输入 JSON 数据')
    return
  }
  
  try {
    JSON.parse(inputText.value)
    validationStatus.value = { text: 'JSON 格式正确', class: 'text-green-600', icon: 'ph:check-circle-bold' }
    showMessage('校验通过，格式正确')
  } catch (error) {
    validationStatus.value = { text: `格式错误：${error.message}`, class: 'text-red-600', icon: 'ph:x-circle-bold' }
    showMessage('校验失败，格式错误')
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
  formattedJSON.value = ''
  validationStatus.value = null
  showMessage('已清空')
}

const copyResult = () => {
  if (!outputText.value) return
  
  navigator.clipboard.writeText(outputText.value).then(() => {
    showMessage('复制成功')
  }).catch(() => {
    showMessage('复制失败')
  })
}

const sortObjectKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((result, key) => {
      result[key] = sortObjectKeys(obj[key])
      return result
    }, {})
  }
  return obj
}

const syntaxHighlight = (json) => {
  if (!json) return ''
  
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  
  return json.replace(/("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, (match, string, colon, boolNull, number) => {
    if (colon) {
      return `<span class="text-purple-600">${string}</span><span class="text-gray-600">:</span>`
    }
    if (string) {
      return `<span class="text-green-600">${string}</span>`
    }
    if (boolNull) {
      return `<span class="text-blue-600">${match}</span>`
    }
    return `<span class="text-orange-600">${match}</span>`
  })
}

const loadExample = (type) => {
  const examples = {
    simple: JSON.stringify({ name: "Keaton", age: 25, city: "深圳", job: "Java工程师" }),
    
    nested: JSON.stringify({
      user: {
        name: "Keaton",
        contact: {
          email: "keaton@example.com",
          phone: "13800138000"
        }
      },
      settings: {
        theme: "dark",
        notifications: true
      }
    }),
    
    array: JSON.stringify([
      { id: 1, name: "项目A", status: "进行中" },
      { id: 2, name: "项目B", status: "已完成" },
      { id: 3, name: "项目C", status: "待开始" }
    ]),
    
    complex: JSON.stringify({
      company: "名通科技",
      employees: [
        {
          id: "E001",
          name: "张三",
          department: "技术部",
          skills: ["Java", "Spring", "MySQL"],
          projects: [
            { name: "云平台", role: "负责人" },
            { name: "数据中台", role: "开发" }
          ]
        },
        {
          id: "E002",
          name: "李四",
          department: "产品部",
          skills: ["产品设计", "数据分析"],
          projects: [
            { name: "云平台", role: "产品经理" }
          ]
        }
      ],
      metadata: {
        created: "2024-01-01",
        version: "2.0",
        active: true
      }
    })
  }
  
  inputText.value = examples[type] || examples.simple
  showMessage('已加载示例')
}
</script>
