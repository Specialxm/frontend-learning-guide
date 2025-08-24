# Composition API 详解

## 什么是 Composition API

Composition API 是 Vue3.0 引入的一种新的组件逻辑组织方式，它允许开发者使用函数式的方式来组织组件的逻辑，而不是将逻辑分散在不同的选项中。

**核心优势：**
- **逻辑复用**：将相关的逻辑组合在一起，便于复用
- **类型推导**：更好的 TypeScript 支持
- **逻辑组织**：按功能组织代码，而不是按类型
- **测试友好**：逻辑更容易进行单元测试

## 核心 API 详解

### 1. 响应式 API

#### ref - 基本类型响应式

`ref` 用于创建基本类型的响应式数据，如字符串、数字、布尔值等。

**基本用法：**
```javascript
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello Vue3')
const isVisible = ref(false)

// 修改值
count.value = 1
message.value = 'Updated message'
isVisible.value = true
```

**实际应用场景：**
```javascript
// 表单输入
const username = ref('')
const password = ref('')

// 计数器
const counter = ref(0)
const increment = () => counter.value++

// 加载状态
const isLoading = ref(false)
const fetchData = async () => {
  isLoading.value = true
  try {
    // 异步操作
  } finally {
    isLoading.value = false
  }
}
```

#### reactive - 对象类型响应式

`reactive` 用于创建对象类型的响应式数据，返回一个响应式代理对象。

**基本用法：**
```javascript
import { reactive } from 'vue'

const user = reactive({
  name: 'John',
  age: 25,
  email: 'john@example.com'
})

// 直接修改属性
user.name = 'Jane'
user.age = 26
```

**实际应用场景：**
```javascript
// 用户信息管理
const userProfile = reactive({
  id: null,
  name: '',
  email: '',
  avatar: '',
  preferences: {}
})

// 表单数据
const formData = reactive({
  title: '',
  content: '',
  tags: [],
  category: ''
})

// 应用状态
const appState = reactive({
  theme: 'light',
  language: 'zh-CN',
  notifications: [],
  sidebar: {
    collapsed: false,
    width: 250
  }
})
```

### 2. 计算属性

#### computed - 响应式计算

`computed` 用于创建基于响应式数据的计算属性，当依赖的数据变化时自动更新。

**基本用法：**
```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 带 setter 的计算属性
const fullNameWithSetter = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    const parts = value.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1]
  }
})
```

**实际应用场景：**
```javascript
// 购物车计算
const cart = reactive({
  items: [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    { id: 2, name: 'Product 2', price: 200, quantity: 1 }
  ]
})

const totalPrice = computed(() => {
  return cart.items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

const itemCount = computed(() => {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0)
})

// 过滤和排序
const filteredItems = computed(() => {
  return cart.items.filter(item => item.price > 50)
})

const sortedItems = computed(() => {
  return [...cart.items].sort((a, b) => b.price - a.price)
})
```

### 3. 监听器

#### watch - 响应式监听

`watch` 用于监听响应式数据的变化，执行副作用操作。

**基本用法：**
```javascript
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// 监听单个值
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
  message.value = `Count is now ${newValue}`
})

// 监听多个值
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Multiple values changed')
})

// 深度监听对象
const user = reactive({ name: 'John', age: 25 })
watch(user, (newUser, oldUser) => {
  console.log('User object changed')
}, { deep: true })
```

**实际应用场景：**
```javascript
// 表单验证
const form = reactive({
  username: '',
  email: '',
  password: ''
})

const errors = reactive({})

// 监听表单变化进行验证
watch(() => form.username, (newValue) => {
  if (newValue.length < 3) {
    errors.username = '用户名至少3个字符'
  } else {
    errors.username = ''
  }
})

// 监听邮箱格式
watch(() => form.email, (newValue) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newValue)) {
    errors.email = '请输入有效的邮箱地址'
  } else {
    errors.email = ''
  }
})

// 搜索防抖
const searchQuery = ref('')
const searchResults = ref([])

watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) {
    // 防抖搜索
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      performSearch(newQuery)
    }, 300)
  }
})
```

#### watchEffect - 自动依赖追踪

`watchEffect` 会自动追踪函数内部使用的响应式数据，当这些数据变化时自动执行。

**基本用法：**
```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

// 自动追踪依赖
watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log(`Double count: ${doubleCount.value}`)
})
```

**实际应用场景：**
```javascript
// 自动保存
const document = reactive({
  title: '',
  content: '',
  lastSaved: null
})

// 自动保存功能
watchEffect(() => {
  if (document.title || document.content) {
    // 自动保存到本地存储
    localStorage.setItem('draft', JSON.stringify({
      title: document.title,
      content: document.content,
      timestamp: Date.now()
    }))
    document.lastSaved = new Date()
  }
})

// 响应式主题切换
const theme = ref('light')
const body = document.body

watchEffect(() => {
  body.className = `theme-${theme.value}`
  // 自动更新 CSS 变量
  document.documentElement.style.setProperty('--primary-color', 
    theme.value === 'light' ? '#333' : '#fff')
})
```

### 4. 生命周期钩子

Composition API 提供了与 Options API 对应的生命周期钩子：

**常用生命周期钩子：**
```javascript
import { 
  onMounted, 
  onUnmounted, 
  onUpdated, 
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate
} from 'vue'

// 组件挂载后
onMounted(() => {
  console.log('Component mounted')
  // 初始化第三方库
  initializeChart()
  // 添加事件监听器
  window.addEventListener('resize', handleResize)
})

// 组件卸载前
onUnmounted(() => {
  console.log('Component will unmount')
  // 清理事件监听器
  window.removeEventListener('resize', handleResize)
  // 清理定时器
  clearInterval(timer)
})

// 组件更新后
onUpdated(() => {
  console.log('Component updated')
  // 更新图表
  updateChart()
})
```

**实际应用场景：**
```javascript
// 数据获取
const posts = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/api/posts')
    posts.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
})

// 定时器管理
const timer = ref(null)
const currentTime = ref(new Date())

onMounted(() => {
  timer.value = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

// 第三方库集成
const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = new Chart(chartRef.value, {
      // 图表配置
    })
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
```

## 组合式函数（Composables）

组合式函数是 Composition API 的核心概念，它允许我们将逻辑提取到可复用的函数中。

### 1. 创建组合式函数

**基本结构：**
```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const doubleCount = computed(() => count.value * 2)
  
  return {
    count,
    increment,
    decrement,
    reset,
    doubleCount
  }
}
```

**在组件中使用：**
```javascript
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, increment, decrement, reset, doubleCount } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      reset,
      doubleCount
    }
  }
}
```

### 2. 实际应用场景

**用户认证 Hook：**
```javascript
// useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      localStorage.setItem('token', response.token)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }
  
  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await authService.validateToken(token)
        user.value = response.user
      } catch (err) {
        logout()
      }
    }
  }
  
  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth
  }
}
```

**数据获取 Hook：**
```javascript
// useApi.js
import { ref, computed } from 'vue'

export function useApi(url, options = {}) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const hasData = computed(() => !!data.value)
  const hasError = computed(() => !!error.value)
  
  const fetchData = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url, {
        ...options,
        params
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const refetch = () => fetchData()
  
  return {
    data,
    loading,
    error,
    hasData,
    hasError,
    fetchData,
    refetch
  }
}
```

## 最佳实践

### 1. 命名规范

- 组合式函数以 `use` 开头
- 响应式数据使用描述性名称
- 函数名使用动词开头

### 2. 逻辑组织

- 相关的逻辑放在一起
- 复杂的逻辑提取到组合式函数
- 保持函数的单一职责

### 3. 性能优化

- 合理使用 `computed` 缓存计算结果
- 避免在 `watchEffect` 中执行昂贵操作
- 及时清理副作用

### 4. 类型安全

- 使用 TypeScript 定义接口
- 为组合式函数添加类型注解
- 利用泛型提高复用性

## 总结

Composition API 为 Vue3.0 带来了更灵活的逻辑组织方式，通过组合式函数可以实现逻辑的复用和测试。在实际开发中，合理使用这些 API 可以构建出更易维护和扩展的组件。

## 下一步学习

现在您已经掌握了 Composition API 的核心概念，建议按以下顺序继续学习：

### 🔍 深入理解原理
**[响应式系统原理](./reactivity.md)** - 深入了解 Vue3.0 响应式系统的工作原理，理解 ref、reactive、computed 等 API 的底层实现机制。

### 🧩 组件化开发
**[组件化开发](./components.md)** - 学习如何在实际项目中使用 Composition API 构建组件，掌握组件间的通信模式和最佳实践。

### 📝 TypeScript 集成
**[TypeScript 集成](./typescript.md)** - 学习如何为 Composition API 添加类型定义，提升代码的类型安全性和开发体验。

## 学习建议

1. **实践为主**：创建自己的组合式函数，尝试不同的逻辑组织方式
2. **逻辑复用**：将常用的逻辑提取为组合式函数，提高代码复用性
3. **测试友好**：利用 Composition API 的特性，编写更好的单元测试
4. **性能考虑**：合理使用 computed 和 watch，避免不必要的性能开销

## 常见问题

### Q: Composition API 和 Options API 可以混用吗？
A: 可以，Vue3.0 支持两种 API 的混用，但建议在同一个组件中保持一致的风格。

### Q: 什么时候应该使用 Composition API？
A: 当组件逻辑复杂、需要逻辑复用，或者团队倾向于函数式编程风格时，推荐使用 Composition API。

### Q: 组合式函数和 mixin 有什么区别？
A: 组合式函数更加灵活，没有命名冲突问题，类型推导更好，是 mixin 的现代替代方案。

### Q: 如何避免在组合式函数中创建过多的响应式引用？
A: 合理设计数据结构，避免过度响应式，使用 shallowReactive 处理深层对象。

---

**准备好深入理解响应式系统了吗？** 点击 [响应式系统原理](./reactivity.md) 继续探索 Vue3.0 的核心机制！ 🔍 