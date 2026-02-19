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
          <span class="text-primary-600 text-sm font-medium">时间戳转换</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-primary-600">时间戳转换工具</span>
        </h1>
        <p class="text-gray-600">
          时间戳与日期时间相互转换，支持秒级/毫秒级，提供多种格式输出
        </p>
      </div>
    </section>

    <!-- 工具主体 -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 当前时间显示 -->
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white shadow-lg mb-8">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p class="text-white/80 text-sm mb-1">当前北京时间</p>
              <p class="text-3xl md:text-4xl font-bold font-mono">{{ currentDateTime }}</p>
            </div>
            <div class="text-center md:text-right">
              <p class="text-white/80 text-sm mb-1">当前时间戳 (秒)</p>
              <p class="text-xl font-mono">{{ currentTimestampSec }}</p>
            </div>
            <div class="text-center md:text-right">
              <p class="text-white/80 text-sm mb-1">当前时间戳 (毫秒)</p>
              <p class="text-xl font-mono">{{ currentTimestampMs }}</p>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- 时间戳转日期 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Icon name="ph:clock-clockwise-bold" class="w-5 h-5 text-primary-600" />
              时间戳转日期
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">输入时间戳</label>
                <div class="flex gap-3">
                  <input 
                    v-model="timestampInput"
                    type="text"
                    placeholder="例如: 1704067200"
                    class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none font-mono"
                  >
                  <select 
                    v-model="timestampUnit"
                    class="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                  >
                    <option value="s">秒</option>
                    <option value="ms">毫秒</option>
                  </select>
                </div>
              </div>

              <button 
                @click="convertTimestampToDate"
                class="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                :disabled="!timestampInput"
              >
                <Icon name="ph:arrows-clockwise-bold" class="w-4 h-4" />
                转换
              </button>

              <!-- 转换结果 -->
              <div v-if="timestampResults.length > 0" class="space-y-3 mt-4">
                <div 
                  v-for="(result, index) in timestampResults" 
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p class="text-xs text-gray-500">{{ result.label }}</p>
                    <p class="font-mono text-sm">{{ result.value }}</p>
                  </div>
                  <button 
                    @click="copyToClipboard(result.value)"
                    class="p-2 rounded-lg hover:bg-white transition-colors text-gray-500 hover:text-primary-600"
                  >
                    <Icon name="ph:copy-bold" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 日期转时间戳 -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Icon name="ph:clock-counter-clockwise-bold" class="w-5 h-5 text-primary-600" />
              日期转时间戳
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">选择日期时间</label>
                <input 
                  v-model="dateInput"
                  type="datetime-local"
                  step="1"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none font-mono"
                >
              </div>

              <button 
                @click="convertDateToTimestamp"
                class="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                :disabled="!dateInput"
              >
                <Icon name="ph:arrows-clockwise-bold" class="w-4 h-4" />
                转换
              </button>

              <!-- 转换结果 -->
              <div v-if="dateResults.length > 0" class="space-y-3 mt-4">
                <div 
                  v-for="(result, index) in dateResults" 
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p class="text-xs text-gray-500">{{ result.label }}</p>
                    <p class="font-mono text-sm">{{ result.value }}</p>
                  </div>
                  <button 
                    @click="copyToClipboard(result.value)"
                    class="p-2 rounded-lg hover:bg-white transition-colors text-gray-500 hover:text-primary-600"
                  >
                    <Icon name="ph:copy-bold" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 常用时间戳参考 -->
        <div class="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Icon name="ph:star-bold" class="w-5 h-5 text-yellow-500" />
            常用时间戳参考
          </h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              v-for="item in commonTimestamps" 
              :key="item.label"
              @click="useCommonTimestamp(item)"
              class="p-4 bg-gray-50 rounded-xl text-left hover:bg-primary-50 hover:border-primary-200 border border-transparent transition-all"
            >
              <p class="text-sm font-medium text-gray-700">{{ item.label }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ item.description }}</p>
            </button>
          </div>
        </div>

        <!-- 批量转换 -->
        <div class="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Icon name="ph:list-bold" class="w-5 h-5 text-primary-600" />
            批量转换
          </h3>
          
          <div class="grid lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                输入多个时间戳（每行一个）
              </label>
              <textarea
                v-model="batchInput"
                placeholder="1704067200&#10;1704153600&#10;1704240000"
                class="w-full h-[200px] p-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none font-mono text-sm resize-none"
              ></textarea>
              <div class="flex gap-3 mt-3">
                <select 
                  v-model="batchUnit"
                  class="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                >
                  <option value="s">秒级</option>
                  <option value="ms">毫秒级</option>
                </select>
                <button 
                  @click="batchConvert"
                  class="flex-1 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                  :disabled="!batchInput"
                >
                  批量转换
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">转换结果</label>
              <div class="h-[200px] overflow-auto bg-gray-50 rounded-xl p-4">
                <table v-if="batchResults.length > 0" class="w-full text-sm">
                  <thead class="text-xs text-gray-500 border-b border-gray-200">
                    <tr>
                      <th class="text-left py-2">时间戳</th>
                      <th class="text-left py-2">日期时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in batchResults" :key="index" class="border-b border-gray-100 last:border-0">
                      <td class="py-2 font-mono text-xs">{{ row.timestamp }}</td>
                      <td class="py-2 font-mono text-xs">{{ row.datetime }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="h-full flex items-center justify-center text-gray-400 text-sm">
                  批量转换结果将显示在这里
                </div>
              </div>
              <button 
                v-if="batchResults.length > 0"
                @click="copyBatchResults"
                class="w-full mt-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="ph:copy-bold" class="w-4 h-4" />
                复制全部结果
              </button>
            </div>
          </div>
        </div>

        <!-- 时区转换 -->
        <div class="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Icon name="ph:globe-bold" class="w-5 h-5 text-primary-600" />
            时区转换
          </h3>
          
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">选择时间</label>
              <input 
                v-model="timezoneInput"
                type="datetime-local"
                step="1"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none font-mono"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">源时区</label>
              <select 
                v-model="sourceTimezone"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                  {{ tz.label }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">目标时区</label>
              <select 
                v-model="targetTimezone"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
                  {{ tz.label }}
                </option>
              </select>
            </div>
          </div>

          <button 
            @click="convertTimezone"
            class="mt-4 w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            :disabled="!timezoneInput"
          >
            转换时区
          </button>

          <div v-if="timezoneResult" class="mt-4 p-4 bg-gray-50 rounded-xl">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500">源时间 ({{ sourceTimezone }})</p>
                <p class="font-mono text-sm mt-1">{{ timezoneInput }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">目标时间 ({{ targetTimezone }})</p>
                <p class="font-mono text-sm mt-1 text-primary-600 font-medium">{{ timezoneResult }}</p>
              </div>
            </div>
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
  title: '时间戳转换工具 - Keaton',
  meta: [
    { name: 'description', content: '在线时间戳转换工具，支持时间戳与日期相互转换、批量转换、时区转换等功能。' }
  ]
})

// 当前时间
const currentTimestampSec = ref(0)
const currentTimestampMs = ref(0)
const currentDateTime = ref('')

// 时间戳转日期
const timestampInput = ref('')
const timestampUnit = ref('s')
const timestampResults = ref([])

// 日期转时间戳
const dateInput = ref('')
const dateResults = ref([])

// 批量转换
const batchInput = ref('')
const batchUnit = ref('s')
const batchResults = ref([])

// 时区转换
const timezoneInput = ref('')
const sourceTimezone = ref('Asia/Shanghai')
const targetTimezone = ref('UTC')
const timezoneResult = ref('')

const showToast = ref(false)
const toastMessage = ref('')
const toastIcon = ref('ph:check-circle-bold')
const toastIconClass = ref('text-green-400')

const timezones = [
  { value: 'UTC', label: 'UTC (协调世界时)' },
  { value: 'Asia/Shanghai', label: '北京时间 (UTC+8)' },
  { value: 'Asia/Tokyo', label: '东京时间 (UTC+9)' },
  { value: 'Asia/Seoul', label: '首尔时间 (UTC+9)' },
  { value: 'Asia/Singapore', label: '新加坡时间 (UTC+8)' },
  { value: 'Asia/Hong_Kong', label: '香港时间 (UTC+8)' },
  { value: 'Asia/Taipei', label: '台北时间 (UTC+8)' },
  { value: 'Asia/Dubai', label: '迪拜时间 (UTC+4)' },
  { value: 'Europe/London', label: '伦敦时间 (UTC+0/+1)' },
  { value: 'Europe/Paris', label: '巴黎时间 (UTC+1/+2)' },
  { value: 'Europe/Berlin', label: '柏林时间 (UTC+1/+2)' },
  { value: 'Europe/Moscow', label: '莫斯科时间 (UTC+3)' },
  { value: 'America/New_York', label: '纽约时间 (UTC-5/-4)' },
  { value: 'America/Los_Angeles', label: '洛杉矶时间 (UTC-8/-7)' },
  { value: 'America/Chicago', label: '芝加哥时间 (UTC-6/-5)' },
  { value: 'America/Toronto', label: '多伦多时间 (UTC-5/-4)' },
  { value: 'Australia/Sydney', label: '悉尼时间 (UTC+10/+11)' },
  { value: 'Pacific/Auckland', label: '奥克兰时间 (UTC+12/+13)' }
]

const commonTimestamps = [
  { label: '今天零点', description: '今日 00:00:00', timestamp: () => getTodayStart() },
  { label: '昨天零点', description: '昨日 00:00:00', timestamp: () => getYesterdayStart() },
  { label: '本周一', description: '本周一 00:00:00', timestamp: () => getWeekStart() },
  { label: '本月1号', description: '本月1日 00:00:00', timestamp: () => getMonthStart() },
  { label: 'Unix 纪元', description: '1970-01-01 00:00:00', timestamp: () => 0 },
  { label: 'Y2K', description: '2000-01-01 00:00:00', timestamp: () => 946656000 },
  { label: '2024元旦', description: '2024-01-01 00:00:00', timestamp: () => 1704067200 },
  { label: '2038年问题', description: '2038-01-19 03:14:07', timestamp: () => 2147483647 }
]

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date()
  currentTimestampSec.value = Math.floor(now.getTime() / 1000)
  currentTimestampMs.value = now.getTime()
  currentDateTime.value = formatDateTime(now)
}

const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const formatForInput = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

const getTodayStart = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor(today.getTime() / 1000)
}

const getYesterdayStart = () => {
  const now = new Date()
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  return Math.floor(yesterday.getTime() / 1000)
}

const getWeekStart = () => {
  const now = new Date()
  const day = now.getDay() || 7
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1)
  return Math.floor(monday.getTime() / 1000)
}

const getMonthStart = () => {
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  return Math.floor(firstDay.getTime() / 1000)
}

// 初始化
onMounted(() => {
  updateCurrentTime()
  setInterval(updateCurrentTime, 1000)
  
  // 设置默认日期为当前时间
  const now = new Date()
  dateInput.value = formatForInput(now)
  timezoneInput.value = formatForInput(now)
})

const showMessage = (message, icon = 'ph:check-circle-bold', iconClass = 'text-green-400') => {
  toastMessage.value = message
  toastIcon.value = icon
  toastIconClass.value = iconClass
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000)
}

const convertTimestampToDate = () => {
  if (!timestampInput.value) {
    showMessage('请输入时间戳', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  const timestamp = parseInt(timestampInput.value)
  if (isNaN(timestamp)) {
    showMessage('请输入有效的时间戳', 'ph:x-circle-bold', 'text-red-400')
    return
  }

  const ms = timestampUnit.value === 's' ? timestamp * 1000 : timestamp
  const date = new Date(ms)
  
  if (isNaN(date.getTime())) {
    showMessage('无效的时间戳', 'ph:x-circle-bold', 'text-red-400')
    return
  }

  timestampResults.value = [
    { label: '标准格式', value: formatDateTime(date) },
    { label: 'ISO 8601', value: date.toISOString() },
    { label: 'UTC 格式', value: date.toUTCString() },
    { label: '本地格式', value: date.toLocaleString('zh-CN') },
    { label: '日期', value: date.toLocaleDateString('zh-CN') },
    { label: '时间', value: date.toLocaleTimeString('zh-CN') },
    { label: '时间戳 (秒)', value: String(Math.floor(ms / 1000)) },
    { label: '时间戳 (毫秒)', value: String(ms) }
  ]
}

const convertDateToTimestamp = () => {
  if (!dateInput.value) {
    showMessage('请选择日期时间', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  const date = new Date(dateInput.value)
  if (isNaN(date.getTime())) {
    showMessage('无效的日期', 'ph:x-circle-bold', 'text-red-400')
    return
  }

  const sec = Math.floor(date.getTime() / 1000)
  const ms = date.getTime()

  dateResults.value = [
    { label: '时间戳 (秒)', value: String(sec) },
    { label: '时间戳 (毫秒)', value: String(ms) },
    { label: 'UTC 时间', value: date.toUTCString() },
    { label: 'ISO 格式', value: date.toISOString() }
  ]
}

const batchConvert = () => {
  if (!batchInput.value.trim()) {
    showMessage('请输入时间戳列表', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  const lines = batchInput.value.split('\n').filter(line => line.trim())
  const results = []

  for (const line of lines) {
    const timestamp = parseInt(line.trim())
    if (!isNaN(timestamp)) {
      const ms = batchUnit.value === 's' ? timestamp * 1000 : timestamp
      const date = new Date(ms)
      if (!isNaN(date.getTime())) {
        results.push({
          timestamp: line.trim(),
          datetime: formatDateTime(date)
        })
      }
    }
  }

  batchResults.value = results
  showMessage(`成功转换 ${results.length} 个时间戳`)
}

const copyBatchResults = () => {
  const text = batchResults.value.map(r => `${r.timestamp}\t${r.datetime}`).join('\n')
  copyToClipboard(text)
}

const useCommonTimestamp = (item) => {
  timestampInput.value = String(item.timestamp())
  timestampUnit.value = 's'
  convertTimestampToDate()
}

const convertTimezone = () => {
  if (!timezoneInput.value) {
    showMessage('请选择时间', 'ph:warning-bold', 'text-yellow-400')
    return
  }

  try {
    const date = new Date(timezoneInput.value)
    
    // 获取源时区偏移
    const sourceOffset = getTimezoneOffset(date, sourceTimezone.value)
    const targetOffset = getTimezoneOffset(date, targetTimezone.value)
    
    // 计算目标时间
    const offsetDiff = (targetOffset - sourceOffset) * 60000 // 转换为毫秒
    const targetDate = new Date(date.getTime() + offsetDiff)
    
    timezoneResult.value = formatDateTime(targetDate)
    showMessage('时区转换成功')
  } catch (error) {
    showMessage('转换失败', 'ph:x-circle-bold', 'text-red-400')
  }
}

const getTimezoneOffset = (date, timezone) => {
  // 简化的时区偏移计算
  const offsets = {
    'UTC': 0,
    'Asia/Shanghai': -480,
    'Asia/Tokyo': -540,
    'Asia/Seoul': -540,
    'Asia/Singapore': -480,
    'Asia/Hong_Kong': -480,
    'Asia/Taipei': -480,
    'Asia/Dubai': -240,
    'Europe/London': 0,
    'Europe/Paris': -60,
    'Europe/Berlin': -60,
    'Europe/Moscow': -180,
    'America/New_York': 300,
    'America/Los_Angeles': 420,
    'America/Chicago': 360,
    'America/Toronto': 300,
    'Australia/Sydney': -600,
    'Pacific/Auckland': -720
  }
  return offsets[timezone] || 0
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showMessage('已复制到剪贴板')
  } catch (err) {
    showMessage('复制失败', 'ph:x-circle-bold', 'text-red-400')
  }
}
</script>
