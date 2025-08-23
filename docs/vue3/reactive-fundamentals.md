# Vue 3.0 响应式基础

## 响应式系统概述

Vue 3.0 的响应式系统是整个框架的核心，它能够自动追踪数据的变化并更新相关的视图。这个系统基于 ES6 的 Proxy 实现，相比 Vue 2.x 的 Object.defineProperty 方案，具有更好的性能和更强大的功能。

### 响应式系统的核心特性

- **自动依赖追踪** - 自动检测数据的使用和变化，建立响应式依赖关系
- **高效更新** - 只更新真正变化的部分，避免不必要的渲染
- **深度响应** - 支持嵌套对象的响应式，自动处理深层数据变化
- **现代浏览器支持** - 基于 ES6 Proxy，支持更多数据类型和操作

## 响应式 API 详解

### 1. ref() - 基础类型响应式

`ref()` 函数用于创建基础类型值的响应式引用。ref 创建一个包含响应式引用的对象，通过 .value 属性访问和修改值。在模板中使用时，Vue 会自动解包 ref，无需 .value：

```javascript
import { ref } from 'vue'

// 创建响应式引用
const count = ref(0)
const message = ref('Hello Vue 3.0!')
const isVisible = ref(true)
const price = ref(99.99)

// 访问和修改值
console.log(count.value)        // 0
count.value++                   // 1
console.log(message.value)      // 'Hello Vue 3.0!'
message.value = 'Updated!'      // 更新值
```

#### ref() 的详细用法

```javascript
import { ref, computed, watch } from 'vue'

// 1. 基础类型响应式
const name = ref('张三')
const age = ref(25)
const hobbies = ref(['读书', '编程', '运动'])

// 2. 在模板中自动解包
// 模板中可以直接使用 name 而不是 name.value

// 3. 在 JavaScript 中需要 .value
const updateName = () => {
  name.value = '李四'
  age.value = 30
  hobbies.value.push('游泳')
}

// 4. 响应式对象
const user = ref({
  id: 1,
  profile: {
    firstName: '张',
    lastName: '三',
    contact: {
      email: 'zhangsan@example.com',
      phone: '13800138000'
    }
  }
})

// 5. 修改嵌套属性
user.value.profile.firstName = '李'
user.value.profile.contact.email = 'lisi@example.com'

// 6. 添加新属性
user.value.profile.avatar = '/images/avatar.jpg'
```

#### 在组件中使用 ref()

```vue
<template>
  <div class="ref-demo">
    <h2>ref() 响应式示例</h2>
    
    <!-- 基础类型自动解包 -->
    <div class="counter">
      <p>计数: {{ count }}</p>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <button @click="reset">重置</button>
    </div>
    
    <!-- 字符串响应式 -->
    <div class="message">
      <input v-model="message" placeholder="输入消息" />
      <p>消息: {{ message }}</p>
      <p>消息长度: {{ messageLength }}</p>
    </div>
    
    <!-- 布尔值响应式 -->
    <div class="visibility">
      <button @click="toggleVisibility">
        {{ isVisible ? '隐藏' : '显示' }} 内容
      </button>
      <div v-show="isVisible" class="content">
        这是可以显示/隐藏的内容
      </div>
    </div>
    
    <!-- 数组响应式 -->
    <div class="array-demo">
      <h3>爱好列表</h3>
      <ul>
        <li v-for="hobby in hobbies" :key="hobby">
          {{ hobby }}
          <button @click="removeHobby(hobby)">删除</button>
        </li>
      </ul>
      <input v-model="newHobby" @keyup.enter="addHobby" placeholder="添加新爱好" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const count = ref(0)
const message = ref('')
const isVisible = ref(true)
const hobbies = ref(['读书', '编程', '运动'])
const newHobby = ref('')

// 计算属性
const messageLength = computed(() => message.value.length)

// 方法
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const addHobby = () => {
  if (newHobby.value.trim()) {
    hobbies.value.push(newHobby.value.trim())
    newHobby.value = ''
  }
}

const removeHobby = (hobby) => {
  const index = hobbies.value.indexOf(hobby)
  if (index > -1) {
    hobbies.value.splice(index, 1)
  }
}
</script>
```

### 2. reactive() - 对象响应式

`reactive()` 函数用于创建对象的深度响应式。reactive 返回一个响应式代理对象，可以直接访问和修改属性。与 ref 不同，reactive 对象不需要 .value 访问：

```javascript
import { reactive } from 'vue'

// 创建响应式对象
const state = reactive({
  user: {
    name: '张三',
    age: 25,
    profile: {
      email: 'zhangsan@example.com',
      phone: '13800138000'
    }
  },
  settings: {
    theme: 'light',
    language: 'zh-CN'
  }
})

// 修改属性
state.user.name = '李四'
state.user.profile.email = 'lisi@example.com'
state.settings.theme = 'dark'

// 添加新属性
state.user.avatar = '/images/avatar.jpg'
state.settings.notifications = true
```

#### reactive() vs ref() 对比

| 特性 | reactive() | ref() |
|------|------------|-------|
| **数据类型** | 对象、数组 | 任意类型 |
| **访问方式** | 直接访问 | 需要 .value |
| **模板使用** | 自动解包 | 自动解包 |
| **重新赋值** | 会失去响应性 | 保持响应性 |
| **适用场景** | 复杂对象状态 | 简单值、需要重新赋值 |

#### reactive() 的最佳实践

```javascript
import { reactive, toRefs } from 'vue'

// 1. 创建响应式状态对象
const state = reactive({
  // 用户信息
  user: {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '/images/avatar.jpg'
  },
  
  // 应用设置
  settings: {
    theme: 'light',
    language: 'zh-CN',
    notifications: true,
    autoSave: true
  },
  
  // UI 状态
  ui: {
    loading: false,
    sidebarCollapsed: false,
    currentTab: 'home'
  }
})

// 2. 使用 toRefs 解构保持响应性
const { user, settings, ui } = toRefs(state)

// 3. 状态更新方法
const updateUser = (updates) => {
  Object.assign(state.user, updates)
}

const toggleTheme = () => {
  state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light'
}

const setLoading = (loading) => {
  state.ui.loading = loading
}

// 4. 导出状态和方法
export {
  state,
  user,
  settings,
  ui,
  updateUser,
  toggleTheme,
  setLoading
}
```

### 3. computed() - 计算属性

`computed()` 函数用于创建基于响应式数据的计算属性。computed 会自动缓存计算结果，只有当依赖的响应式数据发生变化时才会重新计算，这大大提升了性能：

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')
const age = ref(25)

// 基础计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 带缓存的复杂计算
const userInfo = computed(() => {
  return {
    name: fullName.value,
    age: age.value,
    isAdult: age.value >= 18,
    birthYear: new Date().getFullYear() - age.value
  }
})

// 可写的计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0]
    lastName.value = names[1] || ''
  }
})
```

#### 计算属性的高级用法

```vue
<template>
  <div class="computed-demo">
    <h2>计算属性示例</h2>
    
    <!-- 基础计算属性 -->
    <div class="section">
      <h3>基础计算</h3>
      <input v-model="firstName" placeholder="名" />
      <input v-model="lastName" placeholder="姓" />
      <p>全名: {{ fullName }}</p>
      <p>姓名长度: {{ nameLength }}</p>
    </div>
    
    <!-- 复杂计算属性 -->
    <div class="section">
      <h3>复杂计算</h3>
      <input v-model="price" type="number" placeholder="价格" />
      <input v-model="taxRate" type="number" placeholder="税率" step="0.01" />
      <p>原价: ¥{{ price }}</p>
      <p>税额: ¥{{ taxAmount }}</p>
      <p>总价: ¥{{ totalPrice }}</p>
      <p>价格区间: {{ priceRange }}</p>
    </div>
    
    <!-- 可写计算属性 -->
    <div class="section">
      <h3>可写计算属性</h3>
      <input v-model="fullNameWritable" placeholder="输入全名" />
      <p>名: {{ firstName }}</p>
      <p>姓: {{ lastName }}</p>
    </div>
    
    <!-- 列表过滤和排序 -->
    <div class="section">
      <h3>列表计算</h3>
      <input v-model="searchTerm" placeholder="搜索用户" />
      <select v-model="sortBy">
        <option value="name">按姓名排序</option>
        <option value="age">按年龄排序</option>
        <option value="email">按邮箱排序</option>
      </select>
      
      <ul>
        <li v-for="user in filteredAndSortedUsers" :key="user.id">
          {{ user.name }} ({{ user.age }}) - {{ user.email }}
        </li>
      </ul>
      
      <p>显示 {{ filteredAndSortedUsers.length }} 个用户</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 基础数据
const firstName = ref('张')
const lastName = ref('三')
const price = ref(100)
const taxRate = ref(0.13)
const searchTerm = ref('')
const sortBy = ref('name')

// 用户列表
const users = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com' }
])

// 基础计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

const nameLength = computed(() => {
  return fullName.value.length
})

// 复杂计算属性
const taxAmount = computed(() => {
  return price.value * taxRate.value
})

const totalPrice = computed(() => {
  return price.value + taxAmount.value
})

const priceRange = computed(() => {
  if (price.value < 50) return '低价'
  if (price.value < 200) return '中价'
  return '高价'
})

// 可写计算属性
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    const names = value.split(' ')
    firstName.value = names[0] || ''
    lastName.value = names[1] || ''
  }
})

// 列表计算属性
const filteredAndSortedUsers = computed(() => {
  let result = users.value
  
  // 过滤
  if (searchTerm.value) {
    result = result.filter(user => 
      user.name.includes(searchTerm.value) ||
      user.email.includes(searchTerm.value)
    )
  }
  
  // 排序
  result = [...result].sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy.value === 'age') {
      return a.age - b.age
    } else if (sortBy.value === 'email') {
      return a.email.localeCompare(b.email)
    }
    return 0
  })
  
  return result
})
</script>
```

### 4. watch() - 侦听器

`watch()` 函数用于侦听响应式数据的变化。watch 提供了灵活的数据变化监听机制，可以监听单个或多个数据源，支持深度监听和立即执行等选项：

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const message = ref('')

// 基本侦听器
watch(count, (newValue, oldValue) => {
  console.log(`count从${oldValue}变为${newValue}`)
  message.value = `计数已更新为${newValue}`
})

// 侦听多个源
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('count或message发生了变化')
})

// 深度侦听对象
const user = ref({ name: 'John', age: 30 })
watch(user, (newUser, oldUser) => {
  console.log('用户信息发生变化')
}, { deep: true })

// 立即执行
watch(count, (newValue) => {
  console.log(`当前计数: ${newValue}`)
}, { immediate: true })

// 停止侦听
const stopWatch = watch(count, (newValue) => {
  console.log(newValue)
})

// 手动停止
stopWatch()
```

#### watch() 的高级配置

```javascript
import { ref, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

// 1. 基础侦听器
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(`搜索查询从 "${oldQuery}" 变为 "${newQuery}"`)
  
  if (newQuery.trim()) {
    performSearch(newQuery)
  } else {
    searchResults.value = []
  }
})

// 2. 深度侦听对象
const userSettings = ref({
  theme: 'light',
  language: 'zh-CN',
  notifications: {
    email: true,
    push: false,
    sms: true
  }
})

watch(userSettings, (newSettings, oldSettings) => {
  console.log('用户设置发生变化')
  saveSettings(newSettings)
}, { 
  deep: true,        // 深度侦听
  flush: 'post'      // 在 DOM 更新后执行
})

// 3. 侦听器选项
const expensiveData = ref(null)

watch(expensiveData, (newData) => {
  processExpensiveData(newData)
}, {
  deep: true,           // 深度侦听
  immediate: false,     // 不立即执行
  flush: 'pre',         // 在 DOM 更新前执行
  onTrack(effect) {     // 依赖追踪时触发
    console.log('依赖被追踪:', effect)
  },
  onTrigger(effect) {   // 依赖变化时触发
    console.log('依赖被触发:', effect)
  }
})

// 4. 停止侦听器
const stopWatch = watch(searchQuery, (newQuery) => {
  console.log('搜索查询变化:', newQuery)
})

// 在需要时停止侦听
const stopListening = () => {
  stopWatch()
}

// 5. 异步侦听器
watch(searchQuery, async (newQuery) => {
  if (newQuery.trim()) {
    isLoading.value = true
    try {
      const results = await searchAPI(newQuery)
      searchResults.value = results
    } catch (error) {
      console.error('搜索失败:', error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }
}, { flush: 'post' })

// 辅助函数
const performSearch = (query) => {
  // 执行搜索逻辑
}

const saveSettings = (settings) => {
  // 保存设置逻辑
}

const processExpensiveData = (data) => {
  // 处理昂贵数据的逻辑
}

const searchAPI = async (query) => {
  // 模拟 API 调用
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: `搜索结果 1 for ${query}` },
        { id: 2, title: `搜索结果 2 for ${query}` }
      ])
    }, 500)
  })
}
```

### 5. watchEffect() - 自动侦听器

`watchEffect()` 函数会自动追踪其内部使用的响应式依赖。watchEffect 会立即执行一次，并自动检测函数内部使用的响应式数据，当这些数据发生变化时自动重新执行：

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

// 自动侦听所有依赖
watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log(`计数: ${count.value}, 双倍: ${doubleCount.value}`)
})

// 修改 count 会自动触发 watchEffect
count.value = 5  // 输出: 计数: 5, 双倍: 10
count.value = 10 // 输出: 计数: 10, 双倍: 20
```

#### watchEffect() 的实际应用

```vue
<template>
  <div class="watcheffect-demo">
    <h2>watchEffect 示例</h2>
    
    <!-- 自动依赖追踪 -->
    <div class="section">
      <h3>自动依赖追踪</h3>
      <input v-model="firstName" placeholder="名" />
      <input v-model="lastName" placeholder="姓" />
      <p>全名: {{ fullName }}</p>
      <p>姓名统计: {{ nameStats }}</p>
    </div>
    
    <!-- 副作用处理 -->
    <div class="section">
      <h3>副作用处理</h3>
      <input v-model="searchTerm" placeholder="搜索内容" />
      <p>搜索结果数量: {{ searchResultCount }}</p>
      <p>搜索历史: {{ searchHistory.join(', ') }}</p>
    </div>
    
    <!-- 异步操作 -->
    <div class="section">
      <h3>异步操作</h3>
      <input v-model="userId" type="number" placeholder="用户ID" />
      <div v-if="loading">加载中...</div>
      <div v-else-if="user">
        <h4>{{ user.name }}</h4>
        <p>邮箱: {{ user.email }}</p>
        <p>年龄: {{ user.age }}</p>
      </div>
      <div v-else-if="error">错误: {{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

// 响应式数据
const firstName = ref('张')
const lastName = ref('三')
const searchTerm = ref('')
const userId = ref(1)

// 计算属性
const fullName = ref('')
const nameStats = ref('')
const searchResultCount = ref(0)
const searchHistory = ref([])
const loading = ref(false)
const user = ref(null)
const error = ref(null)

// 1. 自动依赖追踪
watchEffect(() => {
  fullName.value = `${firstName.value} ${lastName.value}`
  nameStats.value = `姓名长度: ${fullName.value.length}, 字符数: ${fullName.value.replace(/\s/g, '').length}`
})

// 2. 副作用处理
watchEffect(() => {
  if (searchTerm.value.trim()) {
    // 模拟搜索
    searchResultCount.value = Math.floor(Math.random() * 100) + 1
    
    // 添加到搜索历史
    if (!searchHistory.value.includes(searchTerm.value)) {
      searchHistory.value.unshift(searchTerm.value)
      // 限制历史记录数量
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10)
      }
    }
  } else {
    searchResultCount.value = 0
  }
})

// 3. 异步操作
watchEffect(async () => {
  if (userId.value > 0) {
    loading.value = true
    error.value = null
    user.value = null
    
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟用户数据
      const mockUsers = {
        1: { name: '张三', email: 'zhangsan@example.com', age: 25 },
        2: { name: '李四', email: 'lisi@example.com', age: 30 },
        3: { name: '王五', email: 'wangwu@example.com', age: 28 }
      }
      
      user.value = mockUsers[userId.value] || null
      
      if (!user.value) {
        error.value = '用户不存在'
      }
    } catch (err) {
      error.value = '加载失败: ' + err.message
    } finally {
      loading.value = false
    }
  }
})
</script>
```

## 响应式工具函数

### 1. toRef() 和 toRefs()

这两个函数用于在响应式对象和普通对象之间进行转换，保持响应性：

```javascript
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({
  name: '张三',
  age: 25
})

// toRef: 为源响应式对象上的某个属性创建一个 ref
const nameRef = toRef(state, 'name')
console.log(nameRef.value) // '张三'

// toRefs: 将响应式对象转换为普通对象，其中每个属性都是指向源对象相应属性的 ref
const { name, age } = toRefs(state)
console.log(name.value) // '张三'
console.log(age.value)  // 25

// 修改原始状态
state.name = '李四'
console.log(nameRef.value) // '李四'
console.log(name.value)    // '李四'
```

### 2. unref() - 安全解包

unref 可以安全地解包 ref，如果不是 ref 则返回原值：

```javascript
import { ref, unref } from 'vue'

const count = ref(0)
const plainValue = 42

// unref 可以安全地解包 ref，如果不是 ref 则返回原值
console.log(unref(count))      // 0
console.log(unref(plainValue)) // 42

// 等价于
console.log(isRef(count) ? count.value : count)
```

### 3. isRef() - 类型检查

isRef 用于检查一个值是否为 ref 对象：

```javascript
import { ref, reactive, isRef } from 'vue'

const count = ref(0)
const state = reactive({ name: '张三' })
const plainValue = 'hello'

console.log(isRef(count))      // true
console.log(isRef(state))      // false
console.log(isRef(plainValue)) // false
```

## 响应式系统的最佳实践

### 1. 选择合适的响应式 API

```javascript
import { ref, reactive, computed, watch } from 'vue'

// 使用 ref 的场景
const count = ref(0)           // 基础类型值
const isLoading = ref(false)   // 布尔标志
const message = ref('')        // 字符串

// 使用 reactive 的场景
const userState = reactive({   // 复杂对象状态
  profile: { name: '张三', age: 25 },
  settings: { theme: 'light', language: 'zh-CN' }
})

// 使用 computed 的场景
const fullName = computed(() => `${userState.profile.name}`)
const isAdult = computed(() => userState.profile.age >= 18)

// 使用 watch 的场景
watch(() => userState.profile.name, (newName, oldName) => {
  console.log(`用户名从 ${oldName} 变为 ${newName}`)
})
```

### 2. 避免响应式陷阱

```javascript
// ❌ 错误：直接解构 reactive 对象
const state = reactive({ name: '张三', age: 25 })
const { name, age } = state  // 失去响应性

// ✅ 正确：使用 toRefs
const { name, age } = toRefs(state)

// ❌ 错误：重新赋值 reactive 对象
const state = reactive({ name: '张三' })
state = { name: '李四' }  // 失去响应性

// ✅ 正确：修改属性
state.name = '李四'

// ❌ 错误：在异步回调中访问响应式数据
setTimeout(() => {
  console.log(state.name)  // 可能不是最新的值
}, 1000)

// ✅ 正确：使用 toRefs 或 ref
const { name } = toRefs(state)
setTimeout(() => {
  console.log(name.value)  // 总是最新的值
}, 1000)
```

### 3. 性能优化技巧

```javascript
import { ref, computed, watch, nextTick } from 'vue'

// 1. 使用 computed 缓存计算结果
const expensiveValue = computed(() => {
  // 复杂的计算逻辑
  return heavyComputation(state.value)
})

// 2. 合理使用 watch 选项
watch(data, callback, {
  deep: false,        // 避免不必要的深度侦听
  flush: 'post'       // 在 DOM 更新后执行
})

// 3. 批量更新
const updateMultiple = () => {
  state.value1 = 'new value 1'
  state.value2 = 'new value 2'
  state.value3 = 'new value 3'
  
  // 等待下一个 tick 再执行后续操作
  nextTick(() => {
    console.log('所有更新完成')
  })
}

// 4. 避免在 watch 中执行昂贵操作
watch(data, (newData) => {
  // 使用 nextTick 延迟执行
  nextTick(() => {
    expensiveOperation(newData)
  })
})
```

## 总结

Vue 3.0 的响应式系统提供了强大而灵活的数据管理能力：

- **自动响应** - 数据变化自动更新视图，无需手动操作
- **高性能** - 基于 Proxy 的高效响应式系统，性能提升显著
- **灵活配置** - 多种响应式 API 满足不同需求，提供最佳开发体验
- **易于使用** - 简洁的 API 设计，降低学习成本，提高开发效率

**掌握这些响应式基础，你将能够构建出更加动态和交互丰富的 Vue 应用！**

---

*Vue 3.0 响应式基础 - 让数据驱动视图，让开发更高效* 