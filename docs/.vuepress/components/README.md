# 搜索组件使用说明

本项目提供了三个搜索组件，可以根据需要选择使用：

## 1. HeaderSearch - 右上角搜索组件

这是一个简洁的右上角搜索组件，适合在导航栏中使用。

### 特性
- 紧凑的搜索图标设计
- 下拉式搜索框
- 键盘快捷键支持 (Ctrl+S)
- 响应式设计

### 使用方法

```vue
<template>
  <HeaderSearch />
</template>

<script setup>
import HeaderSearch from '@vuepress/components/HeaderSearch.vue'
</script>
```

## 2. SearchBox - 内联搜索框

这是一个内联的搜索输入框组件，适合在页面内容中使用。

### 特性
- 内联搜索输入框
- 实时搜索结果
- 可自定义占位符文本

### 使用方法

```vue
<template>
  <SearchBox placeholder="搜索文档..." />
</template>

<script setup>
import SearchBox from '@vuepress/components/SearchBox.vue'
</script>
```

## 3. AdvancedSearch - 高级搜索模态框

这是一个全屏搜索模态框组件，提供完整的搜索体验。

### 特性
- 全屏搜索模态框
- 详细的搜索结果展示
- 搜索提示和帮助信息
- 键盘导航支持

### 使用方法

```vue
<template>
  <AdvancedSearch />
</template>

<script setup>
import AdvancedSearch from '@vuepress/components/AdvancedSearch.vue'
</script>
```

## 键盘快捷键

所有搜索组件都支持以下键盘快捷键：

- `Ctrl + S` (Windows) / `Cmd + S` (Mac): 快速打开搜索
- `↑↓`: 在搜索结果中导航
- `Enter`: 跳转到选中的搜索结果
- `Esc`: 关闭搜索

## 自定义样式

所有组件都使用 CSS 变量来适配主题色彩：

- `--c-bg`: 背景色
- `--c-text`: 文本色
- `--c-border`: 边框色
- `--c-brand`: 品牌色
- `--c-bg-light`: 浅色背景
- `--c-text-light`: 浅色文本
- `--c-text-lighter`: 更浅的文本色

## 响应式设计

所有组件都支持响应式设计，在移动设备上会自动调整布局和尺寸。

## 注意事项

1. 目前使用的是模拟搜索数据，实际使用时需要替换为真实的搜索逻辑
2. 组件依赖 Vue Router 进行页面跳转
3. 确保在 VuePress 环境中正确导入和使用组件 