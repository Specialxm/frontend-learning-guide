# Vue 3.0 模板语法

## 模板语法概述

Vue 3.0 的模板语法是 Vue 框架的核心特性之一，它提供了一种声明式的方式来描述应用的 UI 结构。通过模板语法，你可以将数据绑定到 DOM，实现数据驱动的用户界面。

### 模板语法的优势

- **声明式渲染** - 直接描述"想要什么"，而不是"如何实现"
- **数据绑定** - 自动同步数据和视图，无需手动操作 DOM
- **组件化** - 将复杂的 UI 拆分为可复用的组件
- **性能优化** - Vue 编译器自动优化模板，提升渲染性能

## 基础语法

### 文本插值

#### 1. 双大括号插值 `{{ }}`

最基本的文本插值方式，用于在模板中显示响应式数据。Vue 会自动追踪数据的变化并更新视图：

```vue
<template>
  <div class="text-interpolation">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <span>当前时间: {{ currentTime }}</span>
    
    <!-- 支持表达式 -->
    <p>计算结果: {{ 2 + 3 }}</p>
    <p>字符串长度: {{ message.length }}</p>
    <p>是否为空: {{ message ? '有内容' : '无内容' }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const title = ref('Vue 3.0 模板语法')
const message = ref('欢迎学习 Vue 3.0!')

// 计算属性
const currentTime = computed(() => {
  return new Date().toLocaleString()
})
</script>
```

#### 2. v-text 指令

`v-text` 指令是双大括号插值的替代方案，功能完全相同。需要注意的是，v-text 会覆盖元素的所有内容：

```vue
<template>
  <div class="v-text-demo">
    <!-- 等价于 {{ title }} -->
    <h1 v-text="title"></h1>
    
    <!-- 支持表达式 -->
    <p v-text="`用户: ${username}`"></p>
    
    <!-- 注意：v-text 会覆盖元素的所有内容 -->
    <div v-text="message">
      这个内容会被 message 的值覆盖
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Vue 3.0 学习指南')
const username = ref('张三')
const message = ref('这是新的消息内容')
</script>
```

### 属性绑定

#### 1. v-bind 指令

`v-bind` 指令用于动态绑定 HTML 属性，使属性值能够响应式地变化：

```vue
<template>
  <div class="attribute-binding">
    <!-- 基础属性绑定 -->
    <img v-bind:src="imageSrc" v-bind:alt="imageAlt" />
    
    <!-- 简写形式 -->
    <img :src="imageSrc" :alt="imageAlt" />
    
    <!-- 动态类名 -->
    <div :class="dynamicClass">动态类名</div>
    
    <!-- 动态样式 -->
    <div :style="dynamicStyle">动态样式</div>
    
    <!-- 对象语法 -->
    <button :class="{ active: isActive, disabled: isDisabled }">
      按钮状态
    </button>
    
    <!-- 数组语法 -->
    <div :class="['base-class', conditionalClass]">
      数组类名
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const imageSrc = ref('/images/logo.png')
const imageAlt = ref('Vue Logo')
const isActive = ref(true)
const isDisabled = ref(false)

// 动态类名
const dynamicClass = computed(() => {
  return isActive.value ? 'active' : 'inactive'
})

// 动态样式
const dynamicStyle = computed(() => {
  return {
    color: isActive.value ? '#42b883' : '#666',
    fontSize: '16px',
    fontWeight: isActive.value ? 'bold' : 'normal'
  }
})

// 条件类名
const conditionalClass = computed(() => {
  return isActive.value ? 'highlight' : ''
})
</script>
```

#### 2. 特殊属性绑定

Vue 3.0 支持绑定一些特殊的属性，如 DOM 属性、布尔属性等：

```vue
<template>
  <div class="special-attributes">
    <!-- 绑定 DOM 属性 -->
    <input :value="inputValue" @input="updateValue" />
    
    <!-- 绑定布尔属性 -->
    <input :disabled="isDisabled" :readonly="isReadonly" />
    
    <!-- 绑定多个属性 -->
    <div v-bind="multipleAttributes">
      多个属性绑定
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const isDisabled = ref(false)
const isReadonly = ref(false)

// 多个属性对象
const multipleAttributes = ref({
  id: 'dynamic-id',
  'data-test': 'test-value',
  title: '动态标题'
})

const updateValue = (event) => {
  inputValue.value = event.target.value
}
</script>
```

### 条件渲染

#### 1. v-if 指令

`v-if` 指令用于条件性地渲染元素。当条件为假时，元素不会被渲染到 DOM 中：

```vue
<template>
  <div class="conditional-rendering">
    <!-- 基础条件渲染 -->
    <div v-if="isVisible">这个元素只在 isVisible 为 true 时显示</div>
    
    <!-- v-else-if 和 v-else -->
    <div v-if="status === 'loading'">加载中...</div>
    <div v-else-if="status === 'success'">加载成功！</div>
    <div v-else-if="status === 'error'">加载失败！</div>
    <div v-else>未知状态</div>
    
    <!-- 在 template 上使用 -->
    <template v-if="showUserInfo">
      <h3>用户信息</h3>
      <p>姓名: {{ user.name }}</p>
      <p>邮箱: {{ user.email }}</p>
    </template>
    
    <!-- 条件渲染组件 -->
    <UserProfile v-if="showProfile" :user="user" />
    <UserCard v-else :user="user" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserProfile from './UserProfile.vue'
import UserCard from './UserCard.vue'

const isVisible = ref(true)
const status = ref('loading')
const showUserInfo = ref(true)
const showProfile = ref(false)

const user = ref({
  name: '张三',
  email: 'zhangsan@example.com'
})

// 模拟状态变化
setTimeout(() => {
  status.value = 'success'
}, 2000)
</script>
```

#### 2. v-show 指令

`v-show` 指令通过切换 CSS 的 `display` 属性来显示/隐藏元素。元素总是会被渲染，只是切换显示状态：

```vue
<template>
  <div class="v-show-demo">
    <!-- v-show 总是渲染元素，只是切换显示状态 -->
    <div v-show="isVisible">使用 v-show 控制显示</div>
    
    <!-- 性能对比 -->
    <div v-if="expensiveCondition">昂贵的条件渲染</div>
    <div v-show="expensiveCondition">便宜的显示切换</div>
    
    <!-- 结合动画 -->
    <transition name="fade">
      <div v-show="showWithAnimation" class="animated-element">
        带动画的显示/隐藏
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isVisible = ref(true)
const showWithAnimation = ref(true)

// 模拟昂贵的计算
const expensiveCondition = computed(() => {
  // 这里可能包含复杂的计算逻辑
  return Math.random() > 0.5
})

// 切换显示状态
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  showWithAnimation.value = !showWithAnimation.value
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.animated-element {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>
```

#### 3. v-if vs v-show 选择指南

| 特性 | v-if | v-show |
|------|------|--------|
| **渲染方式** | 条件为假时不渲染 | 总是渲染，切换 display |
| **性能开销** | 切换时开销大 | 初始渲染开销大 |
| **适用场景** | 条件很少改变 | 条件频繁切换 |
| **SEO 友好** | 更好 | 较差 |

### 列表渲染

#### 1. v-for 指令

`v-for` 指令用于渲染列表数据，支持遍历数组、对象和数字范围：

```vue
<template>
  <div class="list-rendering">
    <!-- 基础列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.description }}
      </li>
    </ul>
    
    <!-- 带索引的列表 -->
    <ol>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ol>
    
    <!-- 遍历对象 -->
    <div class="object-iteration">
      <div v-for="(value, key) in userProfile" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
    </div>
    
    <!-- 遍历数字范围 -->
    <div class="number-iteration">
      <span v-for="n in 5" :key="n" class="number-item">
        {{ n }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Vue 3.0', description: '渐进式 JavaScript 框架' },
  { id: 2, name: 'Composition API', description: '组合式 API' },
  { id: 3, name: 'Teleport', description: '传送门组件' },
  { id: 4, name: 'Suspense', description: '异步组件处理' }
])

const userProfile = ref({
  name: '张三',
  age: 25,
  city: '北京',
  occupation: '前端工程师'
})
</script>
```

#### 2. 列表渲染的最佳实践

```vue
<template>
  <div class="list-best-practices">
    <!-- 1. 始终使用 key -->
    <div v-for="user in users" :key="user.id" class="user-item">
      {{ user.name }}
    </div>
    
    <!-- 2. 避免在 v-for 中使用 v-if -->
    <!-- 错误做法 -->
    <div v-for="user in users" v-if="user.isActive" :key="user.id">
      {{ user.name }}
    </div>
    
    <!-- 正确做法：使用计算属性过滤 -->
    <div v-for="user in activeUsers" :key="user.id" class="user-item">
      {{ user.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', isActive: true },
  { id: 2, name: '李四', email: 'lisi@example.com', isActive: false },
  { id: 3, name: '王五', email: 'wangwu@example.com', isActive: true }
])

// 使用计算属性过滤，而不是在模板中使用 v-if
const activeUsers = computed(() => {
  return users.value.filter(user => user.isActive)
})
</script>
```

### 事件处理

#### 1. v-on 指令

`v-on` 指令用于绑定事件处理器，支持多种事件类型和修饰符：

```vue
<template>
  <div class="event-handling">
    <!-- 基础事件绑定 -->
    <button v-on:click="handleClick">点击我</button>
    
    <!-- 简写形式 -->
    <button @click="handleClick">点击我（简写）</button>
    
    <!-- 内联事件处理器 -->
    <button @click="count++">计数: {{ count }}</button>
    
    <!-- 传递参数 -->
    <button @click="handleClickWithParam('hello', $event)">
      传递参数
    </button>
    
    <!-- 多个事件处理器 -->
    <button @click="handleClick1(); handleClick2()">
      多个处理器
    </button>
    
    <!-- 事件修饰符 -->
    <form @submit.prevent="handleSubmit">
      <input @keyup.enter="handleEnter" placeholder="按回车提交" />
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  console.log('按钮被点击了！')
  alert('Hello Vue 3.0!')
}

const handleClickWithParam = (message, event) => {
  console.log('消息:', message)
  console.log('事件对象:', event)
  console.log('目标元素:', event.target)
}

const handleClick1 = () => {
  console.log('处理器 1')
}

const handleClick2 = () => {
  console.log('处理器 2')
}

const handleSubmit = () => {
  console.log('表单提交被阻止')
}

const handleEnter = () => {
  console.log('按下了回车键')
}
</script>
```

#### 2. 事件修饰符详解

Vue 3.0 提供了丰富的事件修饰符，用于简化常见的事件处理逻辑：

```vue
<template>
  <div class="event-modifiers">
    <!-- 阻止默认行为 -->
    <a @click.prevent="handleLinkClick" href="https://vuejs.org">
      阻止默认跳转
    </a>
    
    <!-- 阻止事件冒泡 -->
    <div @click="handleOuterClick" class="outer">
      外层
      <div @click.stop="handleInnerClick" class="inner">
        内层（阻止冒泡）
      </div>
    </div>
    
    <!-- 只触发一次 -->
    <button @click.once="handleOnceClick">
      只触发一次
    </button>
    
    <!-- 被动事件监听器 -->
    <div @scroll.passive="handleScroll" class="scroll-area">
      滚动区域（被动监听）
    </div>
  </div>
</template>

<script setup>
const handleLinkClick = () => {
  console.log('链接被点击，但不会跳转')
}

const handleOuterClick = () => {
  console.log('外层被点击')
}

const handleInnerClick = () => {
  console.log('内层被点击')
}

const handleOnceClick = () => {
  console.log('这个事件只会触发一次')
}

const handleScroll = () => {
  console.log('滚动事件')
}
</script>
```

## 高级特性

### 双向数据绑定

#### 1. v-model 指令

`v-model` 指令实现表单输入和数据的双向绑定，是 Vue 中最重要的指令之一：

```vue
<template>
  <div class="two-way-binding">
    <!-- 基础双向绑定 -->
    <input v-model="message" placeholder="输入消息" />
    <p>消息: {{ message }}</p>
    
    <!-- 文本域 -->
    <textarea v-model="description" placeholder="输入描述"></textarea>
    <p>描述: {{ description }}</p>
    
    <!-- 复选框 -->
    <div class="checkbox-group">
      <label>
        <input type="checkbox" v-model="checkedNames" value="张三" />
        张三
      </label>
      <label>
        <input type="checkbox" v-model="checkedNames" value="李四" />
        李四
      </label>
      <label>
        <input type="checkbox" v-model="checkedNames" value="王五" />
        王五
      </label>
    </div>
    <p>选中的名字: {{ checkedNames }}</p>
    
    <!-- 单选框 -->
    <div class="radio-group">
      <label>
        <input type="radio" v-model="gender" value="male" />
        男
      </label>
      <label>
        <input type="radio" v-model="gender" value="female" />
        女
      </label>
    </div>
    <p>性别: {{ gender }}</p>
    
    <!-- 选择框 -->
    <select v-model="selectedCity">
      <option value="">请选择城市</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="guangzhou">广州</option>
      <option value="shenzhen">深圳</option>
    </select>
    <p>选择的城市: {{ selectedCity }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const description = ref('')
const checkedNames = ref([])
const gender = ref('')
const selectedCity = ref('')
</script>
```

#### 2. 自定义组件的 v-model

Vue 3.0 支持在自定义组件上使用 v-model，使组件通信更加灵活：

```vue
<!-- CustomInput.vue -->
<template>
  <div class="custom-input">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '输入'
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  }
})

defineEmits(['update:modelValue'])
</script>

<!-- 使用自定义组件 -->
<template>
  <div class="custom-component-demo">
    <CustomInput
      v-model="customValue"
      label="自定义输入框"
      placeholder="这是一个自定义组件"
    />
    <p>输入的值: {{ customValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

const customValue = ref('')
</script>
```

### 插槽系统

#### 1. 基础插槽

插槽允许父组件向子组件传递内容，实现灵活的内容分发：

```vue
<!-- BaseSlot.vue -->
<template>
  <div class="base-slot">
    <h3>{{ title }}</h3>
    <!-- 默认插槽 -->
    <slot>
      <p>这是默认内容</p>
    </slot>
    <footer>插槽底部</footer>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '基础插槽'
  }
})
</script>

<!-- 使用基础插槽 -->
<template>
  <div class="slot-usage">
    <BaseSlot title="自定义标题">
      <p>这是从父组件传递的内容</p>
      <button @click="handleClick">父组件的按钮</button>
    </BaseSlot>
    
    <!-- 使用默认内容 -->
    <BaseSlot title="使用默认内容" />
  </div>
</template>

<script setup>
import BaseSlot from './BaseSlot.vue'

const handleClick = () => {
  console.log('父组件的按钮被点击了！')
}
</script>
```

#### 2. 具名插槽

具名插槽允许父组件向子组件的特定位置传递内容，实现更精确的内容分发：

```vue
<!-- NamedSlots.vue -->
<template>
  <div class="named-slots">
    <header>
      <slot name="header">
        <h2>默认标题</h2>
      </slot>
    </header>
    
    <main>
      <slot name="main">
        <p>默认主要内容</p>
      </slot>
    </main>
    
    <aside>
      <slot name="sidebar">
        <p>默认侧边栏</p>
      </slot>
    </aside>
    
    <footer>
      <slot name="footer">
        <p>默认底部</p>
      </slot>
    </footer>
  </div>
</template>

<!-- 使用具名插槽 -->
<template>
  <div class="named-slots-usage">
    <NamedSlots>
      <template #header>
        <h2>自定义标题</h2>
        <nav>
          <a href="#home">首页</a> |
          <a href="#about">关于</a> |
          <a href="#contact">联系</a>
        </nav>
      </template>
      
      <template #main>
        <article>
          <h3>主要内容</h3>
          <p>这是主要内容区域，可以包含任何内容。</p>
        </article>
      </template>
      
      <template #sidebar>
        <div class="sidebar-content">
          <h4>侧边栏</h4>
          <p>这里可以放置导航、标签云等内容。</p>
        </div>
      </template>
      
      <template #footer>
        <div class="footer-content">
          <p>&copy; 2024 Vue 3.0 学习指南</p>
        </div>
      </template>
    </NamedSlots>
  </div>
</template>

<script setup>
import NamedSlots from './NamedSlots.vue'
</script>
```

## 性能优化技巧

### 编译时优化

Vue 3.0 的编译器会自动进行多项优化，提升运行时性能：

```vue
<template>
  <div class="optimization-demo">
    <!-- 1. 静态内容提升 -->
    <h1>这是静态标题</h1>
    <p>这是静态段落</p>
    
    <!-- 2. 静态属性提升 -->
    <div class="static-class" id="static-id">
      静态属性会被提升
    </div>
    
    <!-- 3. 事件缓存 -->
    <button @click="handleClick">点击事件会被缓存</button>
    
    <!-- 4. 动态子节点优化 -->
    <div v-if="showDynamic">
      <span>动态内容 1</span>
      <span>动态内容 2</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDynamic = ref(true)

const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### 运行时优化建议

```vue
<template>
  <div class="runtime-optimization">
    <!-- 1. 使用 key 优化列表渲染 -->
    <div v-for="item in optimizedList" :key="item.id" class="list-item">
      {{ item.name }}
    </div>
    
    <!-- 2. 避免在模板中使用复杂表达式 -->
    <p>用户数量: {{ userCount }}</p>
    
    <!-- 3. 使用 v-show 替代频繁切换的 v-if -->
    <div v-show="frequentlyToggled" class="toggle-content">
      频繁切换的内容
    </div>
    
    <!-- 4. 合理使用计算属性 -->
    <p>过滤后的用户: {{ filteredUsers.length }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const optimizedList = ref([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' }
])

const users = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
])

const frequentlyToggled = ref(true)

// 使用计算属性避免在模板中重复计算
const userCount = computed(() => users.value.length)
const filteredUsers = computed(() => {
  return users.value.filter(user => user.age > 25)
})
</script>
```

## 总结

Vue 3.0 的模板语法提供了强大而灵活的声明式渲染能力。通过掌握这些语法特性，你可以：

- **构建响应式界面** - 数据变化自动更新视图
- **创建可复用组件** - 通过插槽和属性绑定实现组件通信
- **优化应用性能** - 利用编译器和运行时优化提升渲染效率
- **简化开发流程** - 声明式语法让代码更清晰、更易维护

**继续深入学习 Vue 3.0 的其他特性，掌握现代前端开发的精髓！**

---

*Vue 3.0 模板语法 - 让界面开发更简单，让代码更优雅* 