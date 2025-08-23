# Vue 3.0 快速开始 🚀

## 环境要求

在开始Vue 3.0开发之前，请确保你的开发环境满足以下要求：

- **Node.js**: 版本 16.0 或更高
- **包管理器**: npm、yarn 或 pnpm
- **编辑器**: 推荐 VS Code + Volar 插件

## 🛠️ 安装Node.js

### Windows
1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载LTS版本安装包
3. 运行安装程序，按提示完成安装

### macOS
```bash
# 使用Homebrew安装
brew install node

# 或使用nvm管理Node.js版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

## 📦 创建Vue 3.0项目

### 方法1: 使用create-vue (推荐)

`create-vue`是Vue官方推荐的项目创建工具，基于Vite构建。

```bash
# 创建项目
npm create vue@latest my-vue-app

# 按提示选择配置
✔ Project name: … my-vue-app
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

# 进入项目目录
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方法2: 使用Vue CLI

```bash
# 全局安装Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-vue-app

# 选择Vue 3预设
# 选择 "Manually select features" 进行自定义配置

# 进入项目目录
cd my-vue-app

# 启动开发服务器
npm run serve
```

### 方法3: 手动搭建

如果你想完全控制项目配置，可以手动搭建：

```bash
# 创建项目目录
mkdir my-vue-app
cd my-vue-app

# 初始化package.json
npm init -y

# 安装Vue 3
npm install vue@next

# 安装Vite作为构建工具
npm install -D vite @vitejs/plugin-vue

# 创建vite.config.js
echo 'import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()]
})' > vite.config.js

# 创建index.html
echo '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue 3 App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>' > index.html

# 创建src目录和文件
mkdir src
echo 'import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")' > src/main.js

echo '<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Hello Vue 3.0!"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>' > src/App.vue

# 添加启动脚本到package.json
npm pkg set scripts.dev="vite"
npm pkg set scripts.build="vite build"
npm pkg set scripts.preview="vite preview"

# 启动开发服务器
npm run dev
```

## 🎯 第一个Vue 3.0应用

让我们创建一个简单的计数器应用来体验Vue 3.0：

### 1. 创建App.vue

```vue
<template>
  <div id="app">
    <h1>Vue 3.0 计数器</h1>
    <div class="counter">
      <p>当前计数: {{ count }}</p>
      <p>双倍计数: {{ doubleCount }}</p>
      <div class="buttons">
        <button @click="increment">增加</button>
        <button @click="decrement">减少</button>
        <button @click="reset">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.counter {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:nth-child(1) {
  background-color: #42b983;
  color: white;
}

button:nth-child(2) {
  background-color: #e74c3c;
  color: white;
}

button:nth-child(3) {
  background-color: #95a5a6;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
```

### 2. 创建main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 创建Vue应用实例
const app = createApp(App)

// 挂载应用
app.mount('#app')
```

### 3. 运行应用

```bash
npm run dev
```

在浏览器中打开 `http://localhost:5173` 就能看到你的第一个Vue 3.0应用了！

## 🔧 项目结构

一个典型的Vue 3.0项目结构如下：

```
my-vue-app/
├── public/                 # 静态资源
│   ├── favicon.ico
│   └── index.html
├── src/                    # 源代码
│   ├── assets/            # 资源文件
│   │   ├── images/
│   │   └── styles/
│   ├── components/        # 组件
│   │   └── HelloWorld.vue
│   ├── views/             # 页面
│   │   └── Home.vue
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── stores/            # 状态管理
│   │   └── counter.js
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .gitignore             # Git忽略文件
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
└── README.md              # 项目说明
```

## 📚 下一步学习

现在你已经成功创建了第一个Vue 3.0应用！接下来建议学习：

1. **模板语法** - 了解Vue的声明式渲染
2. **响应式基础** - 理解ref和reactive
3. **计算属性和侦听器** - 数据派生和副作用
4. **组件基础** - 创建和复用组件
5. **Composition API** - Vue 3.0的核心特性

## 🚨 常见问题

### Q: 启动时提示端口被占用
A: 可以修改端口号或杀死占用端口的进程
```bash
# 修改端口
npm run dev -- --port 3000

# 或杀死进程
npx kill-port 5173
```

### Q: 安装依赖失败
A: 尝试清除缓存或使用其他包管理器
```bash
npm cache clean --force
# 或
yarn cache clean
# 或
pnpm store prune
```

### Q: 热更新不工作
A: 检查文件路径和配置是否正确

---

**恭喜你成功创建了第一个Vue 3.0应用！继续探索Vue的强大功能吧！** 🎉 