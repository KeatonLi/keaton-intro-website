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
          <span class="text-primary-600 text-sm font-medium">文本对比</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-primary-600">文本对比工具</span>
        </h1>
        <p class="text-gray-600">
          对比两段文本的差异，高亮显示增删改内容，支持行级和字符级对比
        </p>
      </div>
    </section>

    <!-- 工具主体 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 操作按钮栏 -->
        <div class="flex flex-wrap gap-3 mb-6">
          <button 
            @click="compareText" 
            class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!leftText && !rightText"
          >
            <Icon name="ph:arrows-left-right-bold" class="w-4 h-4" />
            开始对比
          </button>
          <button 
            @click="swapText" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
            :disabled="!leftText && !rightText"
          >
            <Icon name="ph:swap-bold" class="w-4 h-4" />
            交换
          </button>
          <div class="flex-1"></div>
          <button 
            @click="clearAll" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Icon name="ph:trash-bold" class="w-4 h-4" />
            清空
          </button>
        </div>

        <!-- 输入区域 -->
        <div class="grid lg:grid-cols-2 gap-6 mb-6">
          <!-- 左侧文本 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                <span class="text-sm font-medium text-gray-700">原文本 A</span>
              </div>
              <span class="text-xs text-gray-400">{{ leftStats }}</span>
            </div>
            <textarea
              v-model="leftText"
              placeholder="在此粘贴原文本..."
              class="w-full h-[300px] p-4 font-mono text-sm resize-none focus:outline-none"
              spellcheck="false"
            ></textarea>
          </div>

          <!-- 右侧文本 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-green-500"></span>
                <span class="text-sm font-medium text-gray-700">对比文本 B</span>
              </div>
              <span class="text-xs text-gray-400">{{ rightStats }}</span>
            </div>
            <textarea
              v-model="rightText"
              placeholder="在此粘贴对比文本..."
              class="w-full h-[300px] p-4 font-mono text-sm resize-none focus:outline-none"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <!-- 对比结果 -->
        <div v-if="diffResult.length > 0" class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon name="ph:eye-bold" class="w-4 h-4 text-gray-500" />
              <span class="text-sm font-medium text-gray-700">对比结果</span>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded bg-red-100 border border-red-300"></span>
                删除 {{ removedCount }}
              </span>
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded bg-green-100 border border-green-300"></span>
                新增 {{ addedCount }}
              </span>
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></span>
                修改 {{ modifiedCount }}
              </span>
            </div>
          </div>
          <div class="max-h-[400px] overflow-auto">
            <div v-for="(line, index) in diffResult" :key="index" class="flex border-b border-gray-100 last:border-b-0">
              <!-- 行号 -->
              <div class="w-16 flex-shrink-0 bg-gray-50 text-right pr-3 py-2 text-xs text-gray-400 font-mono select-none">
                {{ line.oldLineNum || '-' }}<br>{{ line.newLineNum || '-' }}
              </div>
              <!-- 内容 -->
              <div 
                class="flex-1 py-2 px-3 font-mono text-sm whitespace-pre-wrap break-all"
                :class="getDiffClass(line.type)"
              >
                <!-- 字符级高亮 -->
                <template v-if="line.chars && line.chars.length > 0">
                  <span 
                    v-for="(char, charIndex) in line.chars" 
                    :key="charIndex"
                    :class="getCharClass(char.type)"
                  >{{ char.text }}</span>
                </template>
                <template v-else>{{ line.text || ' ' }}</template>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-200">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl text-gray-400">
            <Icon name="ph:arrows-left-right-bold" class="w-8 h-8" />
          </div>
          <p class="text-gray-500">输入两段文本后点击"开始对比"查看差异</p>
        </div>

        <!-- 示例数据 -->
        <div class="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="ph:lightbulb-bold" class="w-4 h-4 text-yellow-500" />
            示例数据
          </h3>
          <div class="flex flex-wrap gap-3">
            <button 
              @click="loadExample('code')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              代码对比
            </button>
            <button 
              @click="loadExample('text')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              文本对比
            </button>
            <button 
              @click="loadExample('json')" 
              class="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:border-primary-300 border border-gray-200 transition-colors"
            >
              JSON 对比
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
  title: '文本对比工具 - Keaton',
  meta: [
    { name: 'description', content: '在线文本对比工具，支持行级和字符级差异高亮显示。' }
  ]
})

const leftText = ref('')
const rightText = ref('')
const diffResult = ref([])
const showToast = ref(false)
const toastMessage = ref('')
const toastIcon = ref('ph:check-circle-bold')
const toastIconClass = ref('text-green-400')

const leftStats = computed(() => {
  if (!leftText.value) return '0 行'
  const lines = leftText.value.split('\n').length
  const chars = leftText.value.length
  return `${lines} 行 · ${chars} 字符`
})

const rightStats = computed(() => {
  if (!rightText.value) return '0 行'
  const lines = rightText.value.split('\n').length
  const chars = rightText.value.length
  return `${lines} 行 · ${chars} 字符`
})

const removedCount = computed(() => diffResult.value.filter(d => d.type === 'removed').length)
const addedCount = computed(() => diffResult.value.filter(d => d.type === 'added').length)
const modifiedCount = computed(() => diffResult.value.filter(d => d.type === 'modified').length)

const showMessage = (message, icon = 'ph:check-circle-bold', iconClass = 'text-green-400') => {
  toastMessage.value = message
  toastIcon.value = icon
  toastIconClass.value = iconClass
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000)
}

const compareText = () => {
  if (!leftText.value && !rightText.value) {
    showMessage('请至少输入一段文本', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  const leftLines = leftText.value.split('\n')
  const rightLines = rightText.value.split('\n')
  
  const result = []
  let oldLineNum = 0
  let newLineNum = 0
  
  // 简化的 diff 算法
  const maxLen = Math.max(leftLines.length, rightLines.length)
  
  for (let i = 0; i < maxLen; i++) {
    const leftLine = leftLines[i] || ''
    const rightLine = rightLines[i] || ''
    
    if (leftLine === rightLine) {
      // 相同行
      oldLineNum++
      newLineNum++
      result.push({
        type: 'same',
        text: leftLine,
        oldLineNum,
        newLineNum
      })
    } else {
      // 尝试找后续匹配的行
      const nextMatchInRight = rightLines.slice(i + 1).findIndex(l => l === leftLine)
      const nextMatchInLeft = leftLines.slice(i + 1).findIndex(l => l === rightLine)
      
      if (leftLine && nextMatchInRight !== -1 && (nextMatchInLeft === -1 || nextMatchInRight < nextMatchInLeft)) {
        // 添加多行
        for (let j = 0; j <= nextMatchInRight; j++) {
          newLineNum++
          result.push({
            type: 'added',
            text: rightLines[i + j],
            newLineNum,
            chars: [{ text: rightLines[i + j], type: 'added' }]
          })
        }
        i += nextMatchInRight
      } else if (rightLine && nextMatchInLeft !== -1) {
        // 删除多行
        for (let j = 0; j <= nextMatchInLeft; j++) {
          oldLineNum++
          result.push({
            type: 'removed',
            text: leftLines[i + j],
            oldLineNum,
            chars: [{ text: leftLines[i + j], type: 'removed' }]
          })
        }
        i += nextMatchInLeft
      } else {
        // 修改行 - 字符级对比
        oldLineNum++
        newLineNum++
        const chars = compareChars(leftLine, rightLine)
        result.push({
          type: 'modified',
          text: rightLine,
          oldLineNum,
          newLineNum,
          chars
        })
      }
    }
  }
  
  diffResult.value = result
  showMessage('对比完成')
}

const compareChars = (oldStr, newStr) => {
  const chars = []
  const maxLen = Math.max(oldStr.length, newStr.length)
  
  for (let i = 0; i < maxLen; i++) {
    const oldChar = oldStr[i] || ''
    const newChar = newStr[i] || ''
    
    if (oldChar === newChar) {
      chars.push({ text: newChar, type: 'same' })
    } else {
      if (oldChar) {
        chars.push({ text: oldChar, type: 'removed' })
      }
      if (newChar) {
        chars.push({ text: newChar, type: 'added' })
      }
    }
  }
  
  return chars
}

const getDiffClass = (type) => {
  switch (type) {
    case 'removed': return 'bg-red-50 text-red-800'
    case 'added': return 'bg-green-50 text-green-800'
    case 'modified': return 'bg-yellow-50'
    default: return ''
  }
}

const getCharClass = (type) => {
  switch (type) {
    case 'removed': return 'bg-red-200 text-red-900'
    case 'added': return 'bg-green-200 text-green-900'
    default: return ''
  }
}

const swapText = () => {
  const temp = leftText.value
  leftText.value = rightText.value
  rightText.value = temp
  diffResult.value = []
  showMessage('已交换')
}

const clearAll = () => {
  leftText.value = ''
  rightText.value = ''
  diffResult.value = []
  showMessage('已清空')
}

const loadExample = (type) => {
  const examples = {
    code: {
      left: `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(10, 20);
console.log(result);`,
      right: `function calculateSum(a, b, c) {
  return a + b + c;
}

function multiply(a, b) {
  return a * b;
}

const result = calculateSum(10, 20, 30);
console.log(result);`
    },
    text: {
      left: `欢迎使用文本对比工具
这是一个示例文本
用于展示对比功能
可以看到删除和新增的内容`,
      right: `欢迎使用文本对比工具
这是一个全新的示例文本
用于展示对比功能
新增了一行内容
可以看到删除和新增的内容`
    },
    json: {
      left: `{
  "name": "Keaton",
  "age": 25,
  "city": "深圳",
  "skills": ["Java", "Spring"]
}`,
      right: `{
  "name": "Keaton",
  "age": 26,
  "city": "深圳",
  "company": "名通科技",
  "skills": ["Java", "Spring", "Flink"]
}`
    }
  }
  
  const example = examples[type]
  if (example) {
    leftText.value = example.left
    rightText.value = example.right
    diffResult.value = []
    showMessage('已加载示例')
  }
}
</script>
