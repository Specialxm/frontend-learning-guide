# Vue 3.0 组件基础

组件是Vue应用的核心概念，它允许我们将UI拆分为独立、可复用的片段。Vue 3.0在组件系统方面带来了许多改进，包括更好的TypeScript支持、更灵活的API设计和更强大的功能。

## 什么是组件？

组件是可复用的Vue实例，具有自己的名称、模板、逻辑和样式。组件可以接收输入（props），发出事件（emits），并且可以嵌套使用。通过组件化，我们可以构建模块化、可维护的前端应用。

## 创建组件

### 1. 单文件组件 (SFC)

单文件组件是Vue 3.0推荐的组件创建方式，它将模板、脚本和样式组织在一个文件中，提供更好的开发体验：

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" class="avatar">
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>{{ user.role }}</p>
    </div>
    <div class="actions">
      <button @click="editUser">编辑</button>
      <button @click="deleteUser">删除</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const editUser = () => {
  emit('edit', props.user)
}

const deleteUser = () => {
  emit('delete', props.user.id)
}
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  max-width: 300px;
}
</style>
```

### 2. 使用组件

在父组件中使用子组件，通过props传递数据，通过事件进行通信：

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>用户管理</h1>
    <div class="user-list">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: '开发者',
    avatar: '/avatars/john.jpg'
  }
])

const handleEdit = (user) => {
  console.log('编辑用户:', user)
}

const handleDelete = (userId) => {
  users.value = users.value.filter(u => u.id !== userId)
}
</script>
```

## Props 传递

### 1. 基础Props

Props是组件接收外部数据的方式，Vue 3.0提供了强大的props验证和类型检查功能：

```vue
<!-- Button.vue -->
<template>
  <button
    :class="['btn', `btn-${type}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  text: {
    type: String,
    default: '按钮'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
```

### 2. Props验证

Vue 3.0提供了完整的props验证系统，包括类型检查、默认值、验证函数等：

```javascript
const props = defineProps({
  // 基础类型
  title: String,
  count: Number,
  isVisible: Boolean,
  
  // 必填
  required: {
    type: String,
    required: true
  },
  
  // 默认值
  message: {
    type: String,
    default: '默认消息'
  },
  
  // 自定义验证
  age: {
    type: Number,
    validator: (value) => value >= 0 && value <= 150
  },
  
  // 对象默认值
  config: {
    type: Object,
    default: () => ({ theme: 'light', size: 'medium' })
  }
})
```

## 事件通信

### 1. 基础事件

事件是子组件向父组件通信的方式，Vue 3.0提供了完整的事件系统：

```vue
<!-- Counter.vue -->
<template>
  <div class="counter">
    <h3>计数器</h3>
    <p>当前值: {{ currentValue }}</p>
    
    <div class="buttons">
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  initialValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['increment', 'decrement', 'reset'])

const currentValue = ref(props.initialValue)

const increment = () => {
  currentValue.value++
  emit('increment', currentValue.value)
}

const decrement = () => {
  currentValue.value--
  emit('decrement', currentValue.value)
}

const reset = () => {
  currentValue.value = props.initialValue
  emit('reset', currentValue.value)
}
</script>
```

### 2. 事件验证

Vue 3.0支持事件验证，确保事件参数的正确性：

```javascript
const emit = defineEmits({
  // 无验证
  click: null,
  
  // 验证参数
  submit: (payload) => {
    if (payload.email && payload.password) {
      return true
    }
    return false
  }
})
```

## 插槽系统

### 1. 基础插槽

插槽允许父组件向子组件传递内容，实现灵活的内容分发：

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h3>默认标题</h3>
      </slot>
    </div>
    
    <div class="card-body">
      <slot>
        <p>默认内容</p>
      </slot>
    </div>
    
    <div class="card-footer">
      <slot name="footer">
        <p>默认底部</p>
      </slot>
    </div>
  </div>
</template>
```

### 2. 作用域插槽

作用域插槽允许父组件访问子组件的数据，实现更灵活的内容定制：

```vue
<!-- UserList.vue -->
<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-item">
      <slot name="user-card" :user="user" :index="user.id - 1">
        <div class="default-user-card">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => []
  }
})
</script>
```

### 3. 使用插槽

在父组件中使用插槽，可以传递自定义内容：

```vue
<template>
  <Card>
    <template #header>
      <h3>自定义标题</h3>
    </template>
    
    <template #default>
      <p>这是自定义内容</p>
    </template>
    
    <template #footer>
      <button @click="handleAction">执行操作</button>
    </template>
  </Card>
  
  <UserList :users="users">
    <template #user-card="{ user, index }">
      <div class="custom-user-card">
        <h3>{{ index + 1 }}. {{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="editUser(user)">编辑</button>
      </div>
    </template>
  </UserList>
</template>

<script setup>
import Card from './Card.vue'
import UserList from './UserList.vue'

const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
])

const handleAction = () => {
  console.log('执行操作')
}

const editUser = (user) => {
  console.log('编辑用户:', user)
}
</script>
```

## 组件生命周期

### 1. 生命周期钩子

Vue 3.0提供了完整的生命周期钩子，允许我们在组件的不同阶段执行代码：

```vue
<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

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

// 组件挂载前
onBeforeMount(() => {
  console.log('组件挂载前')
})

// 组件更新前
onBeforeUpdate(() => {
  console.log('组件更新前')
})

// 组件卸载前
onBeforeUnmount(() => {
  console.log('组件卸载前')
})
</script>
```

## 最佳实践

### 1. 组件命名

使用清晰的命名约定，提高代码的可读性：

```javascript
// 使用PascalCase命名组件
import UserProfile from './UserProfile.vue'
import ProductCard from './ProductCard.vue'

// 在模板中使用kebab-case
<UserProfile />
<ProductCard />
```

### 2. Props设计

明确定义props的类型、默认值和验证规则：

```javascript
// 明确定义props类型和默认值
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0
  }
})
```

### 3. 事件命名

使用一致的事件命名约定：

```javascript
// 使用kebab-case命名事件
const emit = defineEmits([
  'user-updated',
  'item-deleted'
])

// 触发事件
emit('user-updated', userData)
emit('item-deleted', itemId)
```

### 4. 组件设计原则

遵循单一职责原则，每个组件只负责一个功能：

```vue
<!-- 好的组件设计 -->
<template>
  <div class="user-profile">
    <UserAvatar :user="user" />
    <UserInfo :user="user" />
    <UserActions :user="user" @edit="handleEdit" />
  </div>
</template>

<!-- 避免在一个组件中做太多事情 -->
<template>
  <div class="user-profile">
    <!-- 头像、信息、操作、设置、统计等都在一个组件中 -->
    <!-- 这样会使组件变得复杂，难以维护 -->
  </div>
</template>
```

## 高级特性

### 1. 动态组件

Vue 3.0支持动态组件，可以在运行时切换不同的组件：

```vue
<template>
  <div>
    <component :is="currentComponent" :data="componentData" />
    <button @click="switchComponent">切换组件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref(ComponentA)
const componentData = ref({})

const switchComponent = () => {
  currentComponent.value = currentComponent.value === ComponentA ? ComponentB : ComponentA
}
</script>
```

### 2. 异步组件

异步组件支持代码分割和懒加载，提升应用性能：

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 异步组件
const AsyncComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
)

// 带加载状态的异步组件
const AsyncComponentWithLoading = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
</script>
```

### 3. 组件缓存

使用keep-alive缓存组件状态，提升用户体验：

```vue
<template>
  <keep-alive :include="['UserProfile', 'ProductDetail']">
    <router-view />
  </keep-alive>
</template>
```

## 总结

Vue 3.0的组件系统提供了：

1. **单文件组件** - 更好的代码组织和开发体验
2. **Props系统** - 类型安全的组件通信
3. **事件系统** - 灵活的子父组件通信
4. **插槽系统** - 强大的内容分发机制
5. **生命周期** - 完整的组件生命周期管理
6. **TypeScript支持** - 更好的类型安全

---

**掌握Vue 3.0的组件系统，你将能够构建出模块化、可维护的前端应用！** 