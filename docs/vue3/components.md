# 组件化开发

## 组件化概述

Vue3.0 的组件化系统是其核心特性之一，它提供了强大的组件抽象能力，让开发者能够构建可复用、可维护的界面组件。与 Vue2 相比，Vue3.0 在组件化方面有了显著的改进和增强。

**组件化的核心优势：**
- **代码复用**：将通用功能封装为组件，在多个地方复用
- **逻辑分离**：将复杂的界面逻辑分解为小的、可管理的组件
- **团队协作**：不同开发者可以并行开发不同的组件
- **维护性**：组件职责单一，便于测试和维护

## 组件定义与注册

### 1. 组件定义方式

**Options API 方式（兼容 Vue2）：**
```javascript
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
}
```

**Composition API 方式（Vue3.0 推荐）：**
```javascript
import { ref, computed } from 'vue'

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isExpanded = ref(false)
    
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }
    
    const displayName = computed(() => {
      return props.user.firstName + ' ' + props.user.lastName
    })
    
    return {
      isExpanded,
      toggleExpanded,
      displayName
    }
  }
}
```

**`<script setup>` 语法糖（最简洁）：**
```vue
<script setup>
import { ref, computed } from 'vue'

// Props 定义
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

// 响应式数据
const isExpanded = ref(false)

// 计算属性
const displayName = computed(() => {
  return props.user.firstName + ' ' + props.user.lastName
})

// 方法
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// 事件
const emit = defineEmits(['update', 'delete'])
</script>
```

### 2. 组件注册

**全局注册：**
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import UserCard from './components/UserCard.vue'

const app = createApp(App)

// 全局注册组件
app.component('UserCard', UserCard)

app.mount('#app')
```

**局部注册：**
```vue
<script setup>
import UserCard from './components/UserCard.vue'
import UserList from './components/UserList.vue'

// 组件自动可用，无需额外注册
</script>

<template>
  <div>
    <UserCard :user="currentUser" />
    <UserList :users="userList" />
  </div>
</template>
```

**异步组件注册：**
```javascript
import { defineAsyncComponent } from 'vue'

// 基础异步组件
const AsyncComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))

// 带配置的异步组件
const AsyncComponentWithConfig = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})
```

## Props 系统

### 1. Props 定义与验证

**基础 Props 定义：**
```javascript
const props = defineProps({
  // 基础类型
  title: String,
  count: Number,
  isVisible: Boolean,
  
  // 带默认值
  message: {
    type: String,
    default: 'Hello World'
  },
  
  // 必填项
  userId: {
    type: [String, Number],
    required: true
  },
  
  // 带验证器
  email: {
    type: String,
    required: true,
    validator: (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
  },
  
  // 对象或数组的默认值
  user: {
    type: Object,
    default: () => ({ name: 'Anonymous', age: 0 })
  },
  
  tags: {
    type: Array,
    default: () => []
  }
})
```

**TypeScript 类型定义：**
```typescript
interface Props {
  title: string
  count?: number
  isVisible?: boolean
  user: {
    id: number
    name: string
    email: string
  }
  onUpdate?: (value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isVisible: false
})
```

### 2. Props 传递与接收

**父组件传递 Props：**
```vue
<template>
  <div>
    <!-- 基础属性绑定 -->
    <UserCard 
      :user="currentUser"
      :is-editable="true"
      title="用户信息"
    />
    
    <!-- 动态绑定 -->
    <UserCard 
      :user="selectedUser"
      :is-editable="userCanEdit"
      :title="cardTitle"
    />
    
    <!-- 传递所有 Props -->
    <UserCard v-bind="userCardProps" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserCard from './UserCard.vue'

const currentUser = ref({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
})

const userCanEdit = ref(true)
const cardTitle = computed(() => `用户: ${currentUser.value.name}`)

const userCardProps = {
  user: currentUser.value,
  isEditable: true,
  title: '用户信息'
}
</script>
```

**子组件接收 Props：**
```vue
<template>
  <div class="user-card">
    <h3>{{ title }}</h3>
    <div class="user-info">
      <p><strong>姓名:</strong> {{ user.name }}</p>
      <p><strong>邮箱:</strong> {{ user.email }}</p>
    </div>
    
    <div v-if="isEditable" class="actions">
      <button @click="handleEdit">编辑</button>
      <button @click="handleDelete">删除</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '用户信息'
  },
  user: {
    type: Object,
    required: true
  },
  isEditable: {
    type: Boolean,
    default: false
  }
})

// 使用 props
console.log('用户姓名:', props.user.name)
console.log('是否可编辑:', props.isEditable)
</script>
```

## 事件系统

### 1. 事件定义与触发

**定义事件：**
```javascript
// 基础事件定义
const emit = defineEmits(['update', 'delete', 'save'])

// 带验证的事件定义
const emit = defineEmits({
  update: (value) => {
    if (typeof value === 'string') return true
    console.warn('update 事件的值必须是字符串')
    return false
  },
  delete: (id) => {
    if (typeof id === 'number' && id > 0) return true
    console.warn('delete 事件需要有效的 ID')
    return false
  }
})

// TypeScript 类型定义
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
  save: [data: UserData]
}>()
```

**触发事件：**
```javascript
// 基础事件触发
const handleUpdate = () => {
  emit('update', newValue)
}

const handleDelete = () => {
  emit('delete', props.user.id)
}

// 带多个参数的事件
const handleSave = () => {
  emit('save', {
    id: props.user.id,
    data: formData.value,
    timestamp: Date.now()
  })
}

// 条件触发事件
const handleSubmit = () => {
  if (validateForm()) {
    emit('save', formData.value)
  } else {
    emit('validation-error', validationErrors.value)
  }
}
```

### 2. 事件监听与处理

**父组件监听事件：**
```vue
<template>
  <div>
    <UserCard 
      :user="currentUser"
      @update="handleUserUpdate"
      @delete="handleUserDelete"
      @save="handleUserSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const currentUser = ref({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
})

// 事件处理函数
const handleUserUpdate = (newValue) => {
  console.log('用户信息更新:', newValue)
  // 处理更新逻辑
}

const handleUserDelete = (userId) => {
  console.log('删除用户:', userId)
  // 处理删除逻辑
}

const handleUserSave = (userData) => {
  console.log('保存用户:', userData)
  // 处理保存逻辑
}
</script>
```

**事件修饰符：**
```vue
<template>
  <div>
    <!-- 阻止默认行为 -->
    <button @click.prevent="handleClick">点击</button>
    
    <!-- 阻止事件冒泡 -->
    <div @click.stop="handleDivClick">
      <button @click="handleButtonClick">按钮</button>
    </div>
    
    <!-- 只触发一次 -->
    <button @click.once="handleOnceClick">只触发一次</button>
    
    <!-- 按键修饰符 -->
    <input @keyup.enter="handleEnter" @keyup.esc="handleEscape" />
    
    <!-- 系统修饰符 -->
    <button @click.ctrl="handleCtrlClick">Ctrl + 点击</button>
  </div>
</template>
```

## 插槽系统

### 1. 基础插槽

**默认插槽：**
```vue
<!-- 子组件 -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <slot>
        <!-- 默认内容 -->
        <p>这是默认的卡片内容</p>
      </slot>
    </div>
    
    <div class="card-footer">
      <slot name="footer">
        <button>默认按钮</button>
      </slot>
    </div>
  </div>
</template>
```

**父组件使用插槽：**
```vue
<template>
  <div>
    <Card>
      <!-- 默认插槽内容 -->
      <p>这是自定义的卡片内容</p>
      
      <!-- 具名插槽 -->
      <template #header>
        <h3>自定义标题</h3>
      </template>
      
      <template #footer>
        <button @click="handleAction">自定义按钮</button>
      </template>
    </Card>
  </div>
</template>
```

### 2. 作用域插槽

**子组件提供数据：**
```vue
<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-item">
      <slot 
        name="user-item" 
        :user="user" 
        :index="$index"
        :is-selected="selectedUsers.includes(user.id)"
      >
        <!-- 默认插槽内容 -->
        <span>{{ user.name }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  users: {
    type: Array,
    default: () => []
  },
  selectedUsers: {
    type: Array,
    default: () => []
  }
})
</script>
```

**父组件使用作用域插槽：**
```vue
<template>
  <div>
    <UserList :users="users" :selected-users="selectedUsers">
      <template #user-item="{ user, index, isSelected }">
        <div 
          class="user-item" 
          :class="{ selected: isSelected }"
          @click="toggleUser(user.id)"
        >
          <span class="user-index">{{ index + 1 }}</span>
          <span class="user-name">{{ user.name }}</span>
          <span class="user-email">{{ user.email }}</span>
          <span v-if="isSelected" class="selected-indicator">✓</span>
        </div>
      </template>
    </UserList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserList from './UserList.vue'

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
])

const selectedUsers = ref([])

const toggleUser = (userId) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}
</script>
```

## 组件通信

### 1. 父子组件通信

**Props 向下传递，Events 向上传递：**
```vue
<!-- 父组件 -->
<template>
  <div>
    <h2>父组件</h2>
    <p>当前计数: {{ count }}</p>
    
    <ChildComponent 
      :initial-count="count"
      @increment="handleIncrement"
      @decrement="handleDecrement"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const count = ref(0)

const handleIncrement = () => {
  count.value++
}

const handleDecrement = () => {
  count.value--
}
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div class="child-component">
    <h3>子组件</h3>
    <p>初始计数: {{ initialCount }}</p>
    
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup>
const props = defineProps({
  initialCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['increment', 'decrement'])

const increment = () => {
  emit('increment')
}

const decrement = () => {
  emit('decrement')
}
</script>
```

### 2. 兄弟组件通信

**通过父组件中转：**
```vue
<!-- 父组件 -->
<template>
  <div>
    <ComponentA 
      :shared-data="sharedData"
      @update-data="handleDataUpdate"
    />
    
    <ComponentB 
      :shared-data="sharedData"
      @update-data="handleDataUpdate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const sharedData = ref('共享数据')

const handleDataUpdate = (newData) => {
  sharedData.value = newData
}
</script>
```

**使用事件总线（不推荐，Vue3 中已移除）：**
```javascript
// 创建事件总线
import mitt from 'mitt'
const emitter = mitt()

// 组件 A 发送事件
emitter.emit('data-updated', newData)

// 组件 B 监听事件
emitter.on('data-updated', (data) => {
  console.log('数据已更新:', data)
})
```

### 3. 跨层级组件通信

**Provide/Inject 模式：**
```vue
<!-- 祖先组件 -->
<template>
  <div>
    <h2>祖先组件</h2>
    <p>主题: {{ theme }}</p>
    
    <button @click="toggleTheme">切换主题</button>
    
    <ParentComponent />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import ParentComponent from './ParentComponent.vue'

const theme = ref('light')

// 提供数据给后代组件
provide('theme', theme)
provide('toggleTheme', toggleTheme)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
```

```vue
<!-- 后代组件 -->
<template>
  <div class="descendant-component">
    <h3>后代组件</h3>
    <p>当前主题: {{ theme }}</p>
    
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入祖先组件提供的数据
const theme = inject('theme', 'default-theme') // 提供默认值
const toggleTheme = inject('toggleTheme', () => {})
</script>
```

## 高级组件特性

### 1. 动态组件

**使用 `component` 标签：**
```vue
<template>
  <div>
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.name"
        :class="{ active: currentTab === tab.name }"
        @click="currentTab = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="tab-content">
      <component 
        :is="currentTabComponent"
        v-bind="currentTabProps"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'
import Tab3 from './Tab3.vue'

const tabs = [
  { name: 'tab1', label: '标签1', component: Tab1, props: { data: 'data1' } },
  { name: 'tab2', label: '标签2', component: Tab2, props: { data: 'data2' } },
  { name: 'tab3', label: '标签3', component: Tab3, props: { data: 'data3' } }
]

const currentTab = ref('tab1')

const currentTabComponent = computed(() => {
  const tab = tabs.find(t => t.name === currentTab.value)
  return tab?.component
})

const currentTabProps = computed(() => {
  const tab = tabs.find(t => t.name === currentTab.value)
  return tab?.props || {}
})
</script>
```

### 2. 异步组件

**基础异步组件：**
```javascript
import { defineAsyncComponent } from 'vue'

// 简单异步组件
const AsyncComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
)

// 带配置的异步组件
const AsyncComponentWithConfig = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})
```

**路由级别的异步组件：**
```javascript
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue')
  },
  {
    path: '/user/:id',
    component: () => import('./views/UserDetail.vue')
  }
]
```

### 3. 组件缓存

**使用 KeepAlive：**
```vue
<template>
  <div>
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.name"
        :class="{ active: currentTab === tab.name }"
        @click="currentTab = tab.name"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <keep-alive :include="cachedComponents">
      <component :is="currentTabComponent" />
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('tab1')
const cachedComponents = ['Tab1', 'Tab2'] // 需要缓存的组件名
</script>
```

**动态控制缓存：**
```javascript
// 根据条件决定是否缓存
const shouldCache = computed(() => {
  return user.value?.role === 'admin' || route.meta.keepAlive
})

// 手动控制缓存
const cacheInstance = getCurrentInstance()
if (cacheInstance) {
  // 标记组件需要被缓存
  cacheInstance.ctx.activated = true
}
```

## 组件最佳实践

### 1. 组件设计原则

**单一职责原则：**
- 每个组件只负责一个功能
- 组件名称应该清晰表达其功能
- 避免组件过于复杂

**可复用性：**
- 设计通用的 Props 接口
- 提供合理的默认值
- 支持插槽自定义内容

**可维护性：**
- 组件逻辑清晰，易于理解
- 适当的注释和文档
- 遵循一致的命名规范

### 2. 性能优化

**合理使用异步组件：**
- 大型组件使用异步加载
- 路由级别的代码分割
- 预加载关键组件

**组件缓存策略：**
- 使用 KeepAlive 缓存频繁切换的组件
- 合理设置缓存条件
- 避免过度缓存

**Props 优化：**
- 避免传递过大的对象
- 使用 computed 处理 Props 数据
- 合理使用 Props 验证

### 3. 测试策略

**单元测试：**
- 测试组件的 Props 处理
- 测试事件触发
- 测试计算属性和方法

**集成测试：**
- 测试组件间的交互
- 测试插槽内容渲染
- 测试异步组件加载

## 总结

Vue3.0 的组件化系统提供了强大而灵活的功能，通过合理使用 Props、Events、Slots 等特性，我们可以构建出可复用、可维护的组件库。在实际开发中，需要根据具体场景选择合适的通信方式，遵循组件设计的最佳实践，并持续优化组件性能。

## 下一步学习

现在您已经掌握了 Vue3.0 的组件化开发，建议按以下顺序继续学习：

### 📝 TypeScript 集成
**[TypeScript 集成](./typescript.md)** - 学习如何为组件添加类型定义，提升代码的类型安全性和开发体验，掌握泛型组件的开发技巧。

### ⚡ 性能优化
**[性能优化](./performance.md)** - 学习如何优化组件性能，掌握编译时优化、运行时优化和组件缓存等策略。

### 🏗️ 工程化配置
**[工程化配置](./engineering.md)** - 学习如何配置项目的构建工具、代码规范和自动化流程，提升开发效率和代码质量。

## 学习建议

1. **组件设计**：遵循单一职责原则，设计可复用的组件接口
2. **性能考虑**：合理使用异步组件和组件缓存，避免不必要的重渲染
3. **测试策略**：为组件编写单元测试和集成测试，确保组件质量
4. **最佳实践**：学习优秀的开源组件库，借鉴其设计思路

## 常见问题

### Q: 什么时候使用 Props，什么时候使用 Events？
A: Props 用于向下传递数据，Events 用于向上传递事件。遵循单向数据流原则。

### Q: 如何避免 Props 钻取（Prop Drilling）问题？
A: 使用 Provide/Inject、状态管理库（如 Pinia）或事件总线来解决跨层级组件通信。

### Q: 插槽和作用域插槽有什么区别？
A: 插槽用于内容分发，作用域插槽可以让父组件访问子组件的数据。

### Q: 如何优化大型组件的性能？
A: 使用异步组件、组件缓存、虚拟滚动等技术，合理拆分组件职责。

---

**准备好学习 TypeScript 集成了吗？** 点击 [TypeScript 集成](./typescript.md) 继续提升代码的类型安全性！ 📝 