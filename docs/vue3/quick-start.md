# Vue 3.0 快速开始

## 快速上手 Vue 3.0

欢迎来到 Vue 3.0 的快速开始指南！在这个指南中，我们将从零开始搭建一个完整的 Vue 3.0 开发环境，并创建你的第一个应用。无论你是 Vue 新手还是从 Vue 2.x 升级的开发者，这个指南都能帮助你快速掌握 Vue 3.0 的核心概念。

## 环境准备

### 必需工具

在开始之前，请确保你的开发环境满足以下要求：

#### Node.js 环境
- **Node.js 版本**：建议使用 16.0 或更高版本
- **npm 版本**：建议使用 8.0 或更高版本
- **yarn 版本**：建议使用 1.22 或更高版本（可选）

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 yarn 版本（如果已安装）
yarn --version
```

#### 浏览器支持
Vue 3.0 支持以下现代浏览器：
- **Chrome**：51+
- **Firefox**：54+
- **Safari**：10+
- **Edge**：79+

#### 开发工具
推荐使用以下开发工具：
- **VS Code** - 官方推荐的代码编辑器
- **Vue DevTools** - Vue 开发调试工具
- **浏览器开发者工具** - 用于调试和性能分析

## 创建 Vue 3.0 项目

### 方法一：使用 Vite（推荐）

Vite 是 Vue 官方推荐的构建工具，提供极快的开发体验。它利用现代浏览器的 ES 模块特性，在开发模式下提供即时的模块热重载，构建时使用 Rollup 进行打包优化：

```bash
# 使用 npm
npm create vue@latest my-vue-app

# 使用 yarn
yarn create vue my-vue-app

# 使用 pnpm
pnpm create vue my-vue-app
```

#### 项目配置选项

创建项目时，你会看到以下配置选项：

```bash
✔ Project name: … my-vue-app
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./my-vue-app...
Done.
```

#### 推荐配置

对于初学者，建议选择：
- **TypeScript** - 提供类型安全，提升开发体验
- **Vue Router** - 单页应用路由，构建多页面应用
- **Pinia** - 状态管理，管理应用全局状态
- **ESLint** - 代码质量检查，保持代码规范
- **Prettier** - 代码格式化，统一代码风格

### 方法二：使用 Vue CLI

如果你更喜欢传统的 Vue CLI：

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue-app

# 选择 Vue 3.0 预设
# 选择 "Manually select features" 进行自定义配置
```

### 方法三：手动搭建

如果你想完全控制项目结构，可以手动搭建：

```bash
# 创建项目目录
mkdir my-vue-app
cd my-vue-app

# 初始化 package.json
npm init -y

# 安装 Vue 3.0 核心依赖
npm install vue@next

# 安装开发依赖
npm install -D @vitejs/plugin-vue vite
```

## 项目结构解析

### 标准项目结构

创建完成后，你的项目结构应该如下：

```
my-vue-app/
├── public/                 # 静态资源目录
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML 模板
├── src/                   # 源代码目录
│   ├── assets/            # 资源文件（图片、样式等）
│   ├── components/        # 组件目录
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口文件
├── .gitignore             # Git 忽略文件
├── package.json           # 项目配置和依赖
├── README.md              # 项目说明
├── vite.config.js         # Vite 配置文件
└── tsconfig.json          # TypeScript 配置（如果启用）
```

### 关键文件说明

#### `public/index.html`
这是应用的 HTML 模板，Vite 会基于这个文件进行开发服务器配置和构建：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

#### `src/main.js`
应用的入口文件，负责创建 Vue 应用实例并挂载到 DOM：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
```

#### `src/App.vue`
根组件，所有其他组件的父组件：

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// 使用 Composition API
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## 第一个 Vue 3.0 组件

### 创建 HelloWorld 组件

让我们创建一个简单的 HelloWorld 组件来熟悉 Vue 3.0 的语法。这个组件将展示 Vue 3.0 的核心特性，包括响应式数据、计算属性、事件处理和生命周期钩子：

```vue
<template>
  <div class="hello-world">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="incrementCount">
      点击次数: {{ count }}
    </button>
    <div class="features">
      <h3>Vue 3.0 特性展示：</h3>
      <ul>
        <li v-for="feature in features" :key="feature.id">
          {{ feature.name }}: {{ feature.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const message = ref('欢迎使用 Vue 3.0!')

// 计算属性
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好！'
  if (hour < 18) return '下午好！'
  return '晚上好！'
})

// 响应式数组
const features = ref([
  { id: 1, name: 'Composition API', description: '组合式 API，更好的逻辑复用' },
  { id: 2, name: '响应式系统', description: '基于 Proxy 的响应式系统' },
  { id: 3, name: 'TypeScript', description: '原生 TypeScript 支持' },
  { id: 4, name: '性能提升', description: '更快的渲染速度和更小的包体积' }
])

// 方法
const incrementCount = () => {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log('HelloWorld 组件已挂载！')
  console.log('当前时间:', new Date().toLocaleString())
})
</script>

<style scoped>
.hello-world {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #42b883;
  margin-bottom: 20px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #369870;
}

.features {
  margin-top: 30px;
  text-align: left;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #42b883;
}
</style>
```

### 在 App.vue 中使用组件

```vue
<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
```

## 启动开发服务器

### 使用 Vite 启动

```bash
# 进入项目目录
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动成功后，你会看到类似输出：

```bash
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 访问应用

在浏览器中打开 `http://localhost:5173/`，你就能看到你的第一个 Vue 3.0 应用了！

## 开发工具配置

### VS Code 扩展推荐

为了获得最佳的 Vue 3.0 开发体验，建议安装以下扩展：

- **Volar** - Vue 3.0 官方推荐的 TypeScript 支持
- **Vue VSCode Snippets** - Vue 代码片段
- **Auto Rename Tag** - 自动重命名标签
- **Bracket Pair Colorizer** - 括号配对着色
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

### Vue DevTools 安装

Vue DevTools 是调试 Vue 应用的必备工具：

1. **Chrome 扩展**：在 Chrome 网上应用店搜索 "Vue.js devtools"
2. **Firefox 扩展**：在 Firefox 附加组件中搜索 "Vue.js devtools"
3. **独立应用**：下载 Vue DevTools 独立应用

## 下一步学习

### 基础概念

现在你已经成功创建了第一个 Vue 3.0 应用，接下来建议学习：

1. **模板语法** - 学习 Vue 的声明式渲染语法
2. **响应式基础** - 理解 Vue 的响应式系统原理
3. **Composition API** - 掌握组合式 API 的使用
4. **组件基础** - 学习组件的创建和使用

### 进阶特性

掌握基础后，可以探索：

1. **路由管理** - 使用 Vue Router 构建单页应用
2. **状态管理** - 使用 Pinia 管理应用状态
3. **测试策略** - 编写单元测试和集成测试
4. **性能优化** - 学习应用性能调优技巧

## 恭喜！

你已经成功完成了 Vue 3.0 的快速开始！现在你拥有了：

- 完整的 Vue 3.0 开发环境
- 第一个 Vue 3.0 应用
- 对项目结构的理解
- 开发工具的配置

**继续你的 Vue 3.0 学习之旅，探索更多强大的特性！**

---

*Vue 3.0 快速开始指南 - 让开发更简单，让代码更优雅* 