# Composition API 详解 🚀

Composition API是Vue 3.0最重要的新特性，它提供了一种全新的组织组件逻辑的方式，解决了Options API在逻辑复用和代码组织方面的局限性。

## 🎯 为什么需要Composition API？

### Options API的问题

1. **逻辑分散**: 相关的逻辑分散在不同的选项中
2. **难以复用**: 逻辑难以在组件间复用
3. **TypeScript支持有限**: 类型推导不够友好
4. **代码组织困难**: 大型组件难以维护

### Composition API的优势

1. **逻辑集中**: 相关的逻辑可以组织在一起
2. **逻辑复用**: 通过组合函数轻松复用逻辑
3. **更好的TypeScript支持**: 完整的类型推导
4. **更灵活的代码组织**: 按功能而非选项组织代码

## 🔧 核心概念

### 1. setup() 函数

`setup()`是Composition API的入口点，它在组件实例创建之前执行。

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    
    // 方法
    const increment = () => count.value++
    
    // 返回模板需要的数据和方法
    return {
      count,
      increment
    }
  }
}
</script>
```

### 2. 响应式数据

#### ref()
用于创建基础类型的响应式引用。

```javascript
import { ref } from 'vue'

// 创建响应式引用
const count = ref(0)
const message = ref('Hello')
const isVisible = ref(false)

// 访问和修改值
console.log(count.value) // 0
count.value = 1
console.log(count.value) // 1

// 在模板中自动解包
// <template>{{ count }}</template> 不需要.value
```

#### reactive()
用于创建对象的响应式代理。

```javascript
import { reactive } from 'vue'

// 创建响应式对象
const state = reactive({
  name: 'Vue 3.0',
  version: '3.x',
  features: ['Composition API', 'Teleport', 'Fragments']
})

// 直接修改属性
state.name = 'Vue 3.0 Updated'
state.features.push('Suspense')

// 添加新属性
state.newProperty = '动态添加的属性'

// 删除属性
delete state.version
```

#### 响应式原理

```javascript
import { ref, reactive, nextTick } from 'vue'

const count = ref(0)
const state = reactive({ value: 0 })

// 批量更新
const batchUpdate = () => {
  count.value++
  count.value++
  count.value++
  
  state.value++
  state.value++
  state.value++
  
  // 等待DOM更新
  nextTick(() => {
    console.log('DOM已更新')
  })
}
```

### 3. 计算属性

#### computed()
创建基于响应式数据的派生状态。

```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

// 只读计算属性
const doubleCount = computed(() => count.value * 2)

// 可写计算属性
const doubleCount = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2
  }
})

// 基于多个响应式数据的计算属性
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// 计算属性缓存
const expensiveValue = computed(() => {
  // 这个函数只会在依赖变化时执行
  return heavyCalculation(count.value)
})
```

### 4. 侦听器

#### watch()
侦听响应式数据的变化。

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const message = ref('')

// 基本侦听
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

#### watchEffect()
立即执行一次，并自动追踪依赖。

```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

// 自动追踪依赖
watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log(`计算了双倍计数: ${doubleCount.value}`)
})

// 清理副作用
watchEffect((onCleanup) => {
  const timer = setInterval(() => {
    count.value++
  }, 1000)
  
  // 清理定时器
  onCleanup(() => {
    clearInterval(timer)
  })
})
```

### 5. 生命周期钩子

```javascript
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

export default {
  setup() {
    // 组件挂载后
    onMounted(() => {
      console.log('组件已挂载')
      // 可以访问DOM元素
    })
    
    // 组件更新后
    onUpdated(() => {
      console.log('组件已更新')
    })
    
    // 组件卸载前
    onUnmounted(() => {
      console.log('组件即将卸载')
      // 清理定时器、事件监听器等
    })
    
    // 错误捕获
    onErrorCaptured((err, instance, info) => {
      console.error('捕获到错误:', err)
      return false // 阻止错误继续传播
    })
  }
}
```

## 🎨 逻辑复用

### 组合函数 (Composables)

组合函数是使用Composition API的逻辑复用方式。

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count,
    increment,
    decrement,
    reset,
    doubleCount,
    isEven
  }
}

// 使用组合函数
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, increment, decrement, doubleCount } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      doubleCount
    }
  }
}
```

### 高级组合函数

```javascript
// useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  // 监听值变化，自动保存到localStorage
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  })
  
  return value
}

// useAsync.js
import { ref, onMounted } from 'vue'

export function useAsync(asyncFn) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const execute = async (...args) => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn(...args)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    execute
  }
}

// 使用示例
export default {
  setup() {
    const { data: users, loading, error, execute: fetchUsers } = useAsync(
      () => fetch('/api/users').then(res => res.json())
    )
    
    onMounted(() => {
      fetchUsers()
    })
    
    return {
      users,
      loading,
      error
    }
  }
}
```

## 🔄 与Options API的对比

### 计数器组件对比

**Options API:**
```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</script>
```

**Composition API:**
```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => count.value++
const decrement = () => count.value--
</script>
```

## 🚀 最佳实践

### 1. 命名约定
```javascript
// 组合函数以use开头
export function useCounter() { }
export function useLocalStorage() { }
export function useAsync() { }

// 响应式数据使用描述性名称
const userCount = ref(0)
const isLoading = ref(false)
const errorMessage = ref('')
```

### 2. 组织代码
```javascript
export default {
  setup() {
    // 1. 响应式数据
    const count = ref(0)
    const message = ref('')
    
    // 2. 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 3. 方法
    const increment = () => count.value++
    
    // 4. 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 5. 返回模板需要的内容
    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}
```

### 3. 类型安全
```typescript
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export default {
  setup() {
    const users = ref<User[]>([])
    const currentUser = ref<User | null>(null)
    
    const userCount = computed(() => users.value.length)
    
    return {
      users,
      currentUser,
      userCount
    }
  }
}
```

## 📚 进阶技巧

### 1. 响应式工具函数
```javascript
import { isRef, unref, toRef, toRefs } from 'vue'

// 检查是否为ref
console.log(isRef(count)) // true

// 获取值（如果是ref则取.value，否则直接返回）
const value = unref(count)

// 为对象属性创建ref
const user = reactive({ name: 'John', age: 30 })
const nameRef = toRef(user, 'name')

// 将响应式对象转换为ref对象
const userRefs = toRefs(user)
// userRefs.name.value, userRefs.age.value
```

### 2. 自定义ref
```javascript
import { customRef } from 'vue'

function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

// 使用
const searchQuery = useDebouncedRef('', 300)
```

## 🎯 总结

Composition API为Vue 3.0带来了：

1. **更好的逻辑组织** - 相关逻辑可以组织在一起
2. **逻辑复用** - 通过组合函数轻松复用逻辑
3. **TypeScript支持** - 完整的类型推导和类型安全
4. **更灵活的代码结构** - 按功能而非选项组织代码
5. **更好的性能** - 更精确的依赖追踪

---

**掌握Composition API，你将能够构建更强大、更易维护的Vue应用！** 🚀 