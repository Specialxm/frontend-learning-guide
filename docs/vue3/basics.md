# Vue3.0 核心基础

## Vue3.0 的设计思想

### 1. 渐进式框架的演进

Vue3.0 保持了 Vue2 的渐进式特性，同时引入了现代化的架构设计。它不是一个完全重写的框架，而是在保持向后兼容的基础上，提供了更好的性能和开发体验。

**核心设计原则：**
- **渐进式增强**：可以逐步采用新特性，不需要一次性重写
- **Tree-shaking 支持**：只打包使用到的功能，减少包体积
- **模块化设计**：核心功能模块化，便于按需引入

### 2. 性能优先的设计理念

Vue3.0 在性能方面进行了全面优化，主要体现在以下几个方面：

**编译时优化**
- 静态提升：将静态内容提升到渲染函数外部
- Patch Flag：标记动态节点，优化 Diff 算法
- Block Tree：减少虚拟 DOM 的遍历次数

**运行时优化**
- Proxy 响应式系统：比 Object.defineProperty 性能更好
- 组件更新优化：精确的依赖追踪和更新
- 内存管理：更好的垃圾回收和内存泄漏防护

## Vue3.0 vs Vue2 对比

### 1. 响应式系统对比

| 特性 | Vue2 | Vue3.0 |
|------|------|--------|
| 响应式实现 | Object.defineProperty | Proxy |
| 数组监听 | 需要特殊处理 | 原生支持 |
| 新增属性 | 需要 Vue.set | 自动响应 |
| 性能表现 | 中等 | 优秀 |

**实际使用场景对比：**

**Vue2 中的问题：**
```javascript
// Vue2 需要特殊处理数组变化
this.$set(this.items, index, newValue)
this.items.splice(index, 1, newValue)

// Vue2 新增属性不响应
this.newProperty = 'value' // 不会触发更新
```

**Vue3.0 的改进：**
```javascript
// Vue3.0 原生支持所有变化
items[index] = newValue // 自动响应
items.push(newItem) // 自动响应

// 新增属性自动响应
newProperty.value = 'value' // 自动触发更新
```

### 2. API 风格对比

**Options API vs Composition API**

**Options API（Vue2 风格）：**
- 逻辑按功能分组（data、methods、computed）
- 代码组织清晰，适合小型组件
- 学习曲线平缓，易于上手

**Composition API（Vue3.0 推荐）：**
- 逻辑按功能组合，更好的代码复用
- 更好的 TypeScript 支持
- 适合大型组件和复杂逻辑

## 项目初始化与配置

### 1. 构建工具选择

**Vite vs Vue CLI**

**Vite 优势：**
- 开发服务器启动速度极快（冷启动 < 100ms）
- 热更新性能优秀
- 原生 ES 模块支持
- 配置简单，开箱即用

**Vue CLI 优势：**
- 生态成熟，插件丰富
- 配置灵活，适合复杂项目
- 向后兼容性好

**选择建议：**
- 新项目推荐使用 Vite
- 现有 Vue CLI 项目可以继续使用
- 需要特殊配置时考虑 Vue CLI

### 2. TypeScript 集成

Vue3.0 对 TypeScript 的支持得到了显著提升：

**类型推导改进：**
- Props 类型自动推导
- 事件类型安全
- 响应式数据类型推导
- 组件实例类型推导

**实际应用场景：**
```typescript
// 组件 Props 类型定义
interface Props {
  title: string
  count?: number
  items: string[]
}

// 事件类型定义
interface Emits {
  update: [value: string]
  delete: [id: number]
}

// 响应式数据类型
const count = ref<number>(0)
const items = reactive<string[]>([])
```

### 3. 单文件组件新特性

**`<script setup>` 语法糖：**
- 更简洁的组件编写方式
- 自动暴露顶层的变量和函数
- 更好的 TypeScript 支持

**`<style vars>` CSS 变量：**
- 在样式中使用 JavaScript 变量
- 动态主题切换
- 组件样式隔离

## 核心概念理解

### 1. 应用实例

Vue3.0 引入了应用实例的概念，替代了 Vue2 的全局 Vue 对象：

**应用实例创建：**
```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

**全局配置：**
```javascript
// 全局组件注册
app.component('MyComponent', MyComponent)

// 全局指令
app.directive('focus', {
  mounted: (el) => el.focus()
})

// 全局属性
app.config.globalProperties.$http = axios
```

### 2. 响应式基础

**ref 和 reactive 的区别：**

**ref：**
- 用于基本类型数据
- 需要通过 .value 访问
- 在模板中自动解包

**reactive：**
- 用于对象类型数据
- 直接访问属性
- 不能用于基本类型

**使用场景选择：**
- 基本类型数据使用 ref
- 对象数据使用 reactive
- 需要保持引用时使用 ref

## 总结

Vue3.0 在保持易用性的同时，大幅提升了性能和开发体验。通过 Proxy 响应式系统、Composition API 和编译时优化，为开发者提供了更强大的工具。在接下来的章节中，我们将深入探讨这些特性的具体使用方法。

## 下一步学习

现在您已经了解了 Vue3.0 的核心基础，建议按以下顺序继续学习：

### 🎯 立即学习
**[Composition API 详解](./composition-api.md)** - 深入学习 Vue3.0 的核心特性，掌握响应式 API、生命周期钩子和组合式函数的使用方法。

### 🔍 深入理解
**[响应式系统原理](./reactivity.md)** - 了解 Vue3.0 响应式系统的工作原理，理解 Proxy 的优势和依赖收集机制。

### 🚀 实践应用
**[组件化开发](./components.md)** - 学习 Vue3.0 的组件化开发模式，掌握 Props、Events、Slots 等核心概念。

## 学习建议

1. **动手实践**：创建测试项目，尝试使用不同的 API
2. **对比学习**：对比 Vue2 和 Vue3 的差异，理解改进点
3. **关注性能**：注意观察编译时优化的实际效果
4. **准备面试**：重点掌握 Vue3.0 的设计思想和优势

## 常见问题

### Q: Vue3.0 是否完全兼容 Vue2？
A: Vue3.0 提供了兼容性构建，但建议逐步迁移到新的 API。

### Q: 什么时候使用 ref，什么时候使用 reactive？
A: 基本类型使用 ref，对象类型使用 reactive。需要保持引用时使用 ref。

### Q: Vue3.0 的性能提升主要体现在哪些方面？
A: 编译时优化（静态提升、Patch Flag）、运行时优化（Proxy 响应式系统）、Tree-shaking 支持等。

---

**准备好深入学习了吗？** 点击 [Composition API 详解](./composition-api.md) 继续您的 Vue3.0 学习之旅！ 🚀 