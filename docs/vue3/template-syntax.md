# Vue 3.0 模板语法 🎨

Vue使用基于HTML的模板语法，允许你声明式地将DOM绑定到底层组件实例的数据。所有的Vue模板都是有效的HTML，可以被符合规范的浏览器和HTML解析器解析。

## 🎯 模板基础

### 1. 文本插值

最基本的文本插值使用"Mustache"语法（双大括号）。

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>当前时间: {{ currentTime }}</p>
    <p>计算结果: {{ 2 + 2 }}</p>
    <p>字符串拼接: {{ 'Hello ' + name }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const message = ref('Hello Vue 3.0!')
const name = ref('World')
const currentTime = ref('')

onMounted(() => {
  currentTime.value = new Date().toLocaleString()
})
</script>
```

### 2. 原始HTML

使用`v-html`指令输出真正的HTML内容。

```vue
<template>
  <div>
    <p>普通文本: {{ htmlContent }}</p>
    <p v-html="htmlContent"></p>
    <div v-html="dangerousHtml"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const htmlContent = ref('<strong>这是粗体文本</strong>')
const dangerousHtml = ref('<script>alert("XSS攻击")</script>')

// ⚠️ 注意：v-html可能导致XSS攻击，只对可信内容使用
</script>
```

### 3. 属性绑定

使用`v-bind`指令（简写为`:`）动态绑定属性。

```vue
<template>
  <div>
    <!-- 完整语法 -->
    <img v-bind:src="imageSrc" v-bind:alt="imageAlt">
    
    <!-- 简写语法 -->
    <img :src="imageSrc" :alt="imageAlt">
    
    <!-- 动态类名 -->
    <div :class="dynamicClass">动态类名</div>
    
    <!-- 动态样式 -->
    <div :style="dynamicStyle">动态样式</div>
    
    <!-- 布尔属性 -->
    <button :disabled="isDisabled">按钮</button>
    
    <!-- 对象语法 -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
      对象语法类名
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const imageSrc = ref('/images/logo.png')
const imageAlt = ref('Vue Logo')
const isActive = ref(true)
const hasError = ref(false)
const isDisabled = ref(false)

const dynamicClass = computed(() => ({
  'text-primary': isActive.value,
  'text-danger': hasError.value,
  'font-bold': true
}))

const dynamicStyle = computed(() => ({
  color: isActive.value ? 'green' : 'red',
  fontSize: '18px',
  fontWeight: 'bold'
}))
</script>
```

## 🔧 指令系统

### 1. v-if / v-else / v-else-if

条件渲染指令，根据表达式的值来条件性地渲染元素。

```vue
<template>
  <div>
    <h1 v-if="type === 'A'">A类型</h1>
    <h1 v-else-if="type === 'B'">B类型</h1>
    <h1 v-else>C类型</h1>
    
    <!-- 使用template包装多个元素 -->
    <template v-if="showContent">
      <h2>标题</h2>
      <p>内容段落</p>
      <span>标签</span>
    </template>
    
    <!-- 条件渲染组件 -->
    <UserProfile v-if="user" :user="user" />
    <LoginForm v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserProfile from './UserProfile.vue'
import LoginForm from './LoginForm.vue'

const type = ref('A')
const showContent = ref(true)
const user = ref(null)
</script>
```

### 2. v-show

根据表达式的值来显示或隐藏元素（通过CSS的display属性）。

```vue
<template>
  <div>
    <h1 v-show="isVisible">这个标题会显示/隐藏</h1>
    
    <!-- v-show vs v-if -->
    <div v-show="showWithVShow">使用v-show（频繁切换推荐）</div>
    <div v-if="showWithVIf">使用v-if（条件很少改变推荐）</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const showWithVShow = ref(true)
const showWithVIf = ref(true)
</script>
```

**v-if vs v-show的区别：**
- `v-if`：真正的条件渲染，会销毁和重建DOM元素
- `v-show`：只是切换CSS的display属性，DOM元素始终存在
- `v-if`适合条件很少改变的场景，`v-show`适合频繁切换的场景

### 3. v-for

基于数组或对象来渲染列表。

```vue
<template>
  <div>
    <!-- 遍历数组 -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ul>
    
    <!-- 遍历对象 -->
    <ul>
      <li v-for="(value, key, index) in userInfo" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    
    <!-- 使用template包装 -->
    <template v-for="item in items" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <hr>
    </template>
    
    <!-- 遍历数字范围 -->
    <div>
      <span v-for="n in 10" :key="n">{{ n }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Vue 3.0', title: '框架', description: '渐进式JavaScript框架' },
  { id: 2, name: 'React', title: '库', description: '用于构建用户界面的JavaScript库' },
  { id: 3, name: 'Angular', title: '框架', description: 'Google开发的平台' }
])

const userInfo = ref({
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
})
</script>
```

**重要提示：**
- 始终为`v-for`提供`:key`属性，帮助Vue识别节点
- 避免使用索引作为key（除非列表是静态的且不会重新排序）
- 使用对象或数字的唯一标识符作为key

### 4. v-on

绑定事件监听器（简写为`@`）。

```vue
<template>
  <div>
    <!-- 完整语法 -->
    <button v-on:click="handleClick">点击我</button>
    
    <!-- 简写语法 -->
    <button @click="handleClick">点击我</button>
    
    <!-- 内联语句 -->
    <button @click="count++">计数: {{ count }}</button>
    
    <!-- 事件修饰符 -->
    <form @submit.prevent="onSubmit">
      <input @keyup.enter="onEnter" @keyup.esc="onEscape">
      <button type="submit">提交</button>
    </form>
    
    <!-- 多个修饰符 -->
    <button @click.stop.prevent="doSomething">阻止默认行为和冒泡</button>
    
    <!-- 按键修饰符 -->
    <input @keyup.enter="onEnter" @keyup.esc="onEscape">
    
    <!-- 系统修饰符 -->
    <button @click.ctrl="onCtrlClick">Ctrl + 点击</button>
    <button @click.shift="onShiftClick">Shift + 点击</button>
    
    <!-- 鼠标修饰符 -->
    <div @click.right="onRightClick">右键点击</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  alert('按钮被点击了！')
}

const onSubmit = () => {
  console.log('表单提交')
}

const onEnter = () => {
  console.log('按下了Enter键')
}

const onEscape = () => {
  console.log('按下了Escape键')
}

const doSomething = () => {
  console.log('执行操作')
}

const onCtrlClick = () => {
  console.log('Ctrl + 点击')
}

const onShiftClick = () => {
  console.log('Shift + 点击')
}

const onRightClick = () => {
  console.log('右键点击')
}
</script>
```

**常用事件修饰符：**
- `.stop` - 阻止事件冒泡
- `.prevent` - 阻止默认行为
- `.capture` - 使用捕获模式
- `.self` - 只在事件目标上触发
- `.once` - 只触发一次
- `.passive` - 不阻止默认行为

### 5. v-model

双向数据绑定，用于表单输入元素。

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <input v-model="message" placeholder="输入消息">
    <p>消息: {{ message }}</p>
    
    <!-- 文本域 -->
    <textarea v-model="description" placeholder="输入描述"></textarea>
    <p>描述: {{ description }}</p>
    
    <!-- 复选框 -->
    <input type="checkbox" v-model="isChecked" id="checkbox">
    <label for="checkbox">同意条款</label>
    <p>状态: {{ isChecked }}</p>
    
    <!-- 多个复选框 -->
    <div>
      <input type="checkbox" v-model="checkedNames" value="Vue" id="vue">
      <label for="vue">Vue</label>
      
      <input type="checkbox" v-model="checkedNames" value="React" id="react">
      <label for="react">React</label>
      
      <input type="checkbox" v-model="checkedNames" value="Angular" id="angular">
      <label for="angular">Angular</label>
    </div>
    <p>选中的框架: {{ checkedNames }}</p>
    
    <!-- 单选框 -->
    <div>
      <input type="radio" v-model="picked" value="One" id="one">
      <label for="one">One</label>
      
      <input type="radio" v-model="picked" value="Two" id="two">
      <label for="two">Two</label>
    </div>
    <p>选中的值: {{ picked }}</p>
    
    <!-- 选择框 -->
    <select v-model="selected">
      <option value="">请选择</option>
      <option value="A">选项A</option>
      <option value="B">选项B</option>
      <option value="C">选项C</option>
    </select>
    <p>选中的选项: {{ selected }}</p>
    
    <!-- 多选选择框 -->
    <select v-model="multipleSelected" multiple>
      <option value="A">选项A</option>
      <option value="B">选项B</option>
      <option value="C">选项C</option>
    </select>
    <p>选中的选项: {{ multipleSelected }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const description = ref('')
const isChecked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multipleSelected = ref([])
</script>
```

### 6. v-slot

用于定义插槽内容（简写为`#`）。

```vue
<template>
  <div>
    <!-- 基础插槽 -->
    <BaseLayout>
      <template v-slot:header>
        <h1>页面标题</h1>
      </template>
      
      <template v-slot:default>
        <p>主要内容</p>
      </template>
      
      <template v-slot:footer>
        <p>页面底部</p>
      </template>
    </BaseLayout>
    
    <!-- 简写语法 -->
    <BaseLayout>
      <template #header>
        <h1>页面标题</h1>
      </template>
      
      <template #default>
        <p>主要内容</p>
      </template>
      
      <template #footer>
        <p>页面底部</p>
      </template>
    </BaseLayout>
    
    <!-- 作用域插槽 -->
    <UserList :users="users">
      <template #default="{ user, index }">
        <div class="user-item">
          <span>{{ index + 1 }}. {{ user.name }}</span>
          <button @click="editUser(user)">编辑</button>
        </div>
      </template>
    </UserList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from './BaseLayout.vue'
import UserList from './UserList.vue'

const users = ref([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
])

const editUser = (user) => {
  console.log('编辑用户:', user)
}
</script>
```

## 🎨 特殊指令

### 1. v-once

只渲染一次，后续数据变化不会影响渲染。

```vue
<template>
  <div>
    <h1 v-once>这个标题只会渲染一次: {{ message }}</h1>
    <p>这个段落会响应变化: {{ message }}</p>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3.0!')

const updateMessage = () => {
  message.value = '消息已更新!'
}
</script>
```

### 2. v-pre

跳过这个元素及其子元素的编译过程。

```vue
<template>
  <div>
    <p v-pre>{{ 这里的内容不会被编译 }}</p>
    <p>{{ 这里的内容会被编译 }}</p>
  </div>
</template>
```

### 3. v-cloak

隐藏未编译的模板，直到编译完成。

```vue
<template>
  <div>
    <h1 v-cloak>{{ message }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3.0!')
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
```

## 🔧 动态组件

使用`<component>`元素和`is`属性来动态渲染组件。

```vue
<template>
  <div>
    <!-- 动态组件 -->
    <component :is="currentComponent" :data="componentData" />
    
    <!-- 切换组件 -->
    <button @click="switchComponent('Home')">首页</button>
    <button @click="switchComponent('About')">关于</button>
    <button @click="switchComponent('Contact')">联系</button>
    
    <!-- 保持组件状态 -->
    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>
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

## 📱 响应式设计

### 1. 条件渲染优化

```vue
<template>
  <div>
    <!-- 使用v-show优化频繁切换 -->
    <div v-show="isVisible" class="frequently-changing">
      频繁显示/隐藏的内容
    </div>
    
    <!-- 使用v-if优化条件很少改变 -->
    <div v-if="userType === 'admin'" class="admin-only">
      管理员专用内容
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const userType = ref('user')
</script>
```

### 2. 列表渲染优化

```vue
<template>
  <div>
    <!-- 使用key优化列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    
    <!-- 避免使用索引作为key -->
    <ul>
      <li v-for="(item, index) in items" :key="`item-${item.id}-${index}`">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>
```

## 🚀 最佳实践

### 1. 性能优化
- 使用`v-show`进行频繁切换
- 使用`v-if`进行条件很少改变的场景
- 为`v-for`提供唯一的`key`
- 使用`v-once`渲染静态内容

### 2. 代码组织
- 保持模板简洁，复杂逻辑放在计算属性中
- 使用有意义的变量名和函数名
- 合理使用插槽进行组件复用

### 3. 安全性
- 谨慎使用`v-html`，避免XSS攻击
- 验证用户输入数据
- 使用`v-cloak`避免闪烁

---

**掌握Vue 3.0的模板语法，你将能够构建出功能强大、性能优秀的用户界面！** 🎉 