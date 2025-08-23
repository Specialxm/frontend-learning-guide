# Vue 3.0 高级特性 🚀

Vue 3.0引入了许多革命性的新特性，这些特性让Vue变得更加强大和灵活。本章将深入探讨这些高级特性，帮助你构建更复杂的应用。

## 🎯 Teleport

Teleport允许我们将组件渲染到DOM树的其他位置，常用于模态框、通知、工具提示等需要突破父组件CSS限制的场景。

### 1. 基础用法

```vue
<!-- Modal.vue -->
<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-body">
          <slot />
        </div>
        
        <div class="modal-footer">
          <slot name="footer">
            <button @click="closeModal">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '模态框'
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}
</style>
```

### 2. 使用模态框

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>Teleport 示例</h1>
    
    <button @click="showModal = true">打开模态框</button>
    
    <Modal :is-visible="showModal" title="用户信息" @close="showModal = false">
      <template #default>
        <p>这是一个使用Teleport渲染的模态框</p>
        <p>它被渲染到了body元素下，不受父组件CSS限制</p>
      </template>
      
      <template #footer>
        <button @click="showModal = false">取消</button>
        <button @click="confirmAction" class="primary">确认</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)

const confirmAction = () => {
  alert('操作已确认！')
  showModal.value = false
}
</script>

<style scoped
.primary {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 8px;
}
</style>
```

### 3. 多个Teleport目标

```vue
<!-- MultipleTeleport.vue -->
<template>
  <div>
    <!-- 渲染到body -->
    <Teleport to="body">
      <div v-if="showNotification" class="notification">
        这是body中的通知
      </div>
    </Teleport>
    
    <!-- 渲染到自定义容器 -->
    <Teleport to="#custom-container">
      <div v-if="showCustomContent" class="custom-content">
        这是自定义容器中的内容
      </div>
    </Teleport>
    
    <!-- 条件渲染 -->
    <Teleport :to="teleportTarget">
      <div v-if="showConditional" class="conditional-content">
        条件渲染的内容
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showNotification = ref(false)
const showCustomContent = ref(false)
const showConditional = ref(false)
const targetType = ref('body')

const teleportTarget = computed(() => {
  return targetType.value === 'body' ? 'body' : '#custom-container'
})

// 模拟显示
setTimeout(() => {
  showNotification.value = true
  showCustomContent.value = true
  showConditional.value = true
}, 1000)
</script>
```

## 🔧 Fragments

Fragments允许组件返回多个根节点，无需包装元素。

### 1. 基础用法

```vue
<!-- UserProfile.vue -->
<template>
  <!-- 无需包装div -->
  <header class="user-header">
    <h2>{{ user.name }}</h2>
    <p>{{ user.title }}</p>
  </header>
  
  <main class="user-content">
    <section class="user-info">
      <h3>基本信息</h3>
      <p>邮箱: {{ user.email }}</p>
      <p>电话: {{ user.phone }}</p>
    </section>
    
    <section class="user-skills">
      <h3>技能</h3>
      <ul>
        <li v-for="skill in user.skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
  </main>
  
  <footer class="user-footer">
    <p>最后更新: {{ user.lastUpdated }}</p>
  </footer>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.user-header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.user-content {
  padding: 20px;
}

.user-info, .user-skills {
  margin-bottom: 20px;
}

.user-footer {
  background-color: #f8f9fa;
  padding: 16px;
  border-top: 1px solid #ddd;
  text-align: center;
  color: #666;
}
</style>
```

### 2. 动态Fragments

```vue
<!-- DynamicLayout.vue -->
<template>
  <!-- 根据条件动态渲染不同的布局 -->
  <template v-if="layout === 'horizontal'">
    <header class="header-horizontal">
      <h1>{{ title }}</h1>
    </header>
    <main class="main-horizontal">
      <slot />
    </main>
  </template>
  
  <template v-else-if="layout === 'vertical'">
    <aside class="sidebar-vertical">
      <h2>侧边栏</h2>
    </aside>
    <main class="main-vertical">
      <slot />
    </main>
  </template>
  
  <template v-else>
    <div class="default-layout">
      <slot />
    </div>
  </template>
</template>

<script setup>
defineProps({
  layout: {
    type: String,
    default: 'default'
  },
  title: {
    type: String,
    default: '页面标题'
  }
})
</script>
```

## ⏳ Suspense

Suspense用于处理异步组件的加载状态，提供更好的用户体验。

### 1. 基础用法

```vue
<!-- AsyncComponent.vue -->
<template>
  <div class="async-component">
    <h2>{{ data.title }}</h2>
    <p>{{ data.description }}</p>
    <ul>
      <li v-for="item in data.items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref({
  title: '',
  description: '',
  items: []
})

onMounted(async () => {
  // 模拟异步数据获取
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  data.value = {
    title: '异步加载的数据',
    description: '这是通过Suspense异步加载的组件',
    items: [
      { id: 1, name: '项目1' },
      { id: 2, name: '项目2' },
      { id: 3, name: '项目3' }
    ]
  }
})
</script>
```

### 2. 使用Suspense

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>Suspense 示例</h1>
    
    <Suspense>
      <template #default>
        <AsyncComponent />
      </template>
      
      <template #fallback>
        <div class="loading">
          <div class="spinner"></div>
          <p>正在加载...</p>
        </div>
      </template>
    </Suspense>
    
    <!-- 多个异步组件 -->
    <div class="multiple-suspense">
      <Suspense>
        <template #default>
          <AsyncComponent />
        </template>
        <template #fallback>
          <div class="loading">加载中...</div>
        </template>
      </Suspense>
      
      <Suspense>
        <template #default>
          <AnotherAsyncComponent />
        </template>
        <template #fallback>
          <div class="loading">另一个组件加载中...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import AsyncComponent from './AsyncComponent.vue'

// 定义异步组件
const AnotherAsyncComponent = defineAsyncComponent(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        template: `
          <div class="another-async">
            <h3>另一个异步组件</h3>
            <p>延迟3秒加载</p>
          </div>
        `
      })
    }, 3000)
  })
)
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.multiple-suspense {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}
</style>
```

### 3. 错误处理

```vue
<!-- ErrorBoundary.vue -->
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    
    <template #fallback>
      <div class="loading">加载中...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { onErrorCaptured } from 'vue'
import AsyncComponent from './AsyncComponent.vue'

onErrorCaptured((error, instance, info) => {
  console.error('捕获到错误:', error)
  console.log('错误信息:', info)
  
  // 可以在这里处理错误，比如显示错误页面
  return false // 阻止错误继续传播
})
</script>
```

## 🎭 动态组件

### 1. 基础动态组件

```vue
<!-- DynamicComponent.vue -->
<template>
  <div class="dynamic-component-demo">
    <h2>动态组件示例</h2>
    
    <!-- 动态组件 -->
    <component :is="currentComponent" :data="componentData" />
    
    <!-- 控制按钮 -->
    <div class="controls">
      <button @click="switchComponent('Home')">首页</button>
      <button @click="switchComponent('About')">关于</button>
      <button @click="switchComponent('Contact')">联系</button>
    </div>
    
    <!-- 保持组件状态 -->
    <div class="keep-alive-demo">
      <h3>保持状态示例</h3>
      <keep-alive>
        <component :is="currentComponent" :key="currentComponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const currentComponent = shallowRef(Home)
const componentData = ref({ title: '动态组件数据' })

const switchComponent = (componentName) => {
  switch (componentName) {
    case 'Home':
      currentComponent.value = Home
      break
    case 'About':
      currentComponent.value = About
      break
    case 'Contact':
      currentComponent.value = Contact
      break
  }
}
</script>
```

### 2. 异步动态组件

```vue
<!-- AsyncDynamicComponent.vue -->
<template>
  <div>
    <h2>异步动态组件</h2>
    
    <Suspense>
      <template #default>
        <component :is="asyncComponent" />
      </template>
      <template #fallback>
        <div class="loading">异步组件加载中...</div>
      </template>
    </Suspense>
    
    <button @click="loadComponent">加载组件</button>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const asyncComponent = ref(null)

const loadComponent = () => {
  asyncComponent.value = defineAsyncComponent(() => 
    import('./HeavyComponent.vue')
  )
}
</script>
```

## 🔄 多个v-model

Vue 3.0支持多个v-model绑定，让组件通信更加灵活。

### 1. 多v-model组件

```vue
<!-- MultiVModel.vue -->
<template>
  <div class="multi-v-model">
    <h3>多v-model示例</h3>
    
    <div class="form-group">
      <label>标题:</label>
      <input 
        :value="title" 
        @input="$emit('update:title', $event.target.value)"
        type="text"
      />
    </div>
    
    <div class="form-group">
      <label>内容:</label>
      <textarea 
        :value="content" 
        @input="$emit('update:content', $event.target.value)"
        rows="4"
      ></textarea>
    </div>
    
    <div class="form-group">
      <label>标签:</label>
      <input 
        :value="tags" 
        @input="$emit('update:tags', $event.target.value)"
        type="text"
        placeholder="用逗号分隔"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  tags: String
})

defineEmits(['update:title', 'update:content', 'update:tags'])
</script>

<style scoped>
.multi-v-model {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
```

### 2. 使用多v-model

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>多v-model示例</h1>
    
    <MultiVModel
      v-model:title="form.title"
      v-model:content="form.content"
      v-model:tags="form.tags"
    />
    
    <div class="preview">
      <h3>预览:</h3>
      <p><strong>标题:</strong> {{ form.title }}</p>
      <p><strong>内容:</strong> {{ form.content }}</p>
      <p><strong>标签:</strong> {{ form.tags }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MultiVModel from './MultiVModel.vue'

const form = reactive({
  title: '',
  content: '',
  tags: ''
})
</script>
```

## 🚀 最佳实践

### 1. Teleport使用建议

```javascript
// 选择合适的渲染目标
// 模态框、通知 -> body
// 工具提示 -> 父容器
// 侧边栏 -> 自定义容器

// 避免过度使用
// 只在必要时使用Teleport
// 考虑SEO和可访问性
```

### 2. Fragments使用建议

```javascript
// 使用场景
// 列表项渲染
// 表单字段组
// 布局组件

// 注意事项
// 确保语义化
// 考虑CSS样式
// 保持可读性
```

### 3. Suspense使用建议

```javascript
// 错误处理
onErrorCaptured((error) => {
  // 记录错误
  // 显示用户友好的错误信息
  // 提供重试机制
})

// 性能优化
// 使用defineAsyncComponent
// 合理设置加载状态
// 避免过度嵌套
```

## 🎯 总结

Vue 3.0的高级特性为开发者提供了：

1. **Teleport** - 突破组件层级限制，灵活渲染
2. **Fragments** - 多根节点支持，更灵活的布局
3. **Suspense** - 优雅处理异步组件加载
4. **动态组件** - 运行时组件切换
5. **多v-model** - 更灵活的组件通信

---

**掌握这些高级特性，你将能够构建出更复杂、更强大的Vue应用！** 🚀 