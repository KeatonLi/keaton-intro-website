---
title: Vue 3 Composition API 深度解析
excerpt: 全面介绍Vue 3 Composition API的核心概念、使用方法和最佳实践，帮助开发者更好地理解和应用这一新特性。
author: Keaton
date: 2024-01-10
tags: ["Vue 3", "Composition API", "JavaScript", "前端开发"]
---

# Vue 3 Composition API 深度解析

Vue 3引入的Composition API是一个重大的变革，它为Vue应用提供了更灵活、更强大的组合式编程模型。

## 为什么需要Composition API？

### Options API的局限性

在Vue 2中，我们主要使用Options API来组织组件逻辑：

```javascript
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  }
}
```

虽然这种方式简单易懂，但在复杂组件中会遇到以下问题：

- **逻辑分散**：相关的逻辑被分散在不同的选项中
- **复用困难**：逻辑复用主要依赖mixins，容易产生命名冲突
- **类型推导**：TypeScript支持不够完善

## Composition API 核心概念

### 1. setup() 函数

`setup()`是Composition API的入口点：

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const message = ref('Hello')
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 返回给模板使用
    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}
```

### 2. 响应式API

#### ref()

用于创建响应式的基本数据类型：

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

#### reactive()

用于创建响应式的对象：

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++
state.message = 'Hi'
```

#### computed()

创建计算属性：

```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 可写的计算属性
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
```

### 3. 生命周期钩子

Composition API提供了对应的生命周期钩子：

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    onUnmounted(() => {
      console.log('组件即将卸载')
    })
  }
}
```

## 实际应用示例

### 用户管理组件

```javascript
import { ref, reactive, computed, onMounted } from 'vue'
import { fetchUsers, createUser } from '@/api/users'

export default {
  setup() {
    // 状态管理
    const users = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    
    // 新用户表单
    const newUser = reactive({
      name: '',
      email: '',
      role: 'user'
    })
    
    // 计算属性
    const filteredUsers = computed(() => {
      return users.value.filter(user => 
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
    
    // 方法
    const loadUsers = async () => {
      loading.value = true
      try {
        users.value = await fetchUsers()
      } catch (error) {
        console.error('加载用户失败:', error)
      } finally {
        loading.value = false
      }
    }
    
    const addUser = async () => {
      try {
        const user = await createUser(newUser)
        users.value.push(user)
        // 重置表单
        Object.assign(newUser, { name: '', email: '', role: 'user' })
      } catch (error) {
        console.error('创建用户失败:', error)
      }
    }
    
    // 生命周期
    onMounted(() => {
      loadUsers()
    })
    
    return {
      users,
      loading,
      searchQuery,
      newUser,
      filteredUsers,
      loadUsers,
      addUser
    }
  }
}
```

## 组合式函数（Composables）

将相关逻辑提取为可复用的组合式函数：

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count,
    increment,
    decrement,
    reset,
    isEven
  }
}
```

在组件中使用：

```javascript
import { useCounter } from '@/composables/useCounter'

export default {
  setup() {
    const { count, increment, decrement, isEven } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      isEven
    }
  }
}
```

## 最佳实践

### 1. 合理使用ref和reactive

- 基本数据类型使用`ref()`
- 对象和数组使用`reactive()`
- 避免解构reactive对象，使用`toRefs()`保持响应性

### 2. 组织代码结构

```javascript
export default {
  setup() {
    // 1. 响应式数据
    const state = reactive({ ... })
    
    // 2. 计算属性
    const computedValue = computed(() => { ... })
    
    // 3. 方法
    const methods = {
      handleClick() { ... },
      handleSubmit() { ... }
    }
    
    // 4. 生命周期
    onMounted(() => { ... })
    
    // 5. 返回
    return {
      ...toRefs(state),
      computedValue,
      ...methods
    }
  }
}
```

### 3. TypeScript支持

Composition API对TypeScript有更好的支持：

```typescript
import { ref, computed, Ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export default defineComponent({
  setup() {
    const users: Ref<User[]> = ref([])
    const selectedUser: Ref<User | null> = ref(null)
    
    const userCount = computed((): number => users.value.length)
    
    return {
      users,
      selectedUser,
      userCount
    }
  }
})
```

## 总结

Composition API为Vue 3带来了更强大的组合能力和更好的TypeScript支持。它不是Options API的替代品，而是一个补充，让开发者可以根据项目需求选择最合适的编程模式。

对于简单组件，Options API仍然是很好的选择；对于复杂组件或需要逻辑复用的场景，Composition API提供了更好的解决方案。