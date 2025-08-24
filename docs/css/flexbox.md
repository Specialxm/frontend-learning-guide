# CSS Flexbox 弹性布局详解

## 概述
Flexbox（Flexible Box Layout）是CSS3引入的一种强大的布局方式，专门用于创建灵活、响应式的布局。它解决了传统布局的许多问题，如垂直居中、等高列、响应式适配等，是现代CSS布局的重要工具。

## 学习目标
- 理解Flexbox的基本概念和核心原理
- 掌握Flexbox容器和项目的所有属性
- 学会使用Flexbox创建各种常见布局
- 理解Flexbox在响应式设计中的应用
- 能够解决实际项目中的布局问题

## Flexbox 核心概念

### 1. 基本术语

- **Flex容器（Flex Container）**：设置了 `display: flex` 的元素
- **Flex项目（Flex Item）**：Flex容器的直接子元素
- **主轴（Main Axis）**：由 `flex-direction` 定义的方向
- **交叉轴（Cross Axis）**：垂直于主轴的方向
- **主轴起点/终点**：主轴的开始和结束位置
- **交叉轴起点/终点**：交叉轴的开始和结束位置

### 2. 布局原理

Flexbox采用一维布局模型，主要沿主轴排列元素：

```
主轴方向 (flex-direction: row)
┌─────────────────────────────────────────┐
│ [项目1] [项目2] [项目3] [项目4]        │
└─────────────────────────────────────────┘
         ↑
    交叉轴方向
```

## Flexbox 容器属性

### 1. display: flex

```css
.flex-container {
    display: flex;              /* 块级弹性容器 */
    /* 或者 */
    display: inline-flex;       /* 行内弹性容器 */
}
```

**区别说明：**
- `display: flex`：容器表现为块级元素
- `display: inline-flex`：容器表现为行内元素

### 2. flex-direction（主轴方向）

控制Flex项目在主轴上的排列方向：

```css
.flex-container {
    /* 主轴方向 */
    flex-direction: row;              /* 水平方向（默认） */
    flex-direction: row-reverse;      /* 水平反向 */
    flex-direction: column;           /* 垂直方向 */
    flex-direction: column-reverse;   /* 垂直反向 */
}
```

**视觉效果：**
- `row`：项目从左到右排列
- `row-reverse`：项目从右到左排列
- `column`：项目从上到下排列
- `column-reverse`：项目从下到上排列

### 3. flex-wrap（换行）

控制Flex项目是否换行：

```css
.flex-container {
    /* 换行方式 */
    flex-wrap: nowrap;         /* 不换行（默认） */
    flex-wrap: wrap;           /* 换行 */
    flex-wrap: wrap-reverse;   /* 反向换行 */
}
```

**换行行为：**
- `nowrap`：所有项目强制在一行显示
- `wrap`：项目换行到下一行
- `wrap-reverse`：项目换行到上一行

### 4. justify-content（主轴对齐）

控制Flex项目在主轴上的对齐方式：

```css
.flex-container {
    /* 主轴对齐方式 */
    justify-content: flex-start;      /* 起点对齐（默认） */
    justify-content: flex-end;        /* 终点对齐 */
    justify-content: center;          /* 居中对齐 */
    justify-content: space-between;   /* 两端对齐 */
    justify-content: space-around;    /* 环绕对齐 */
    justify-content: space-evenly;    /* 均匀对齐 */
}
```

**对齐效果：**
- `flex-start`：项目靠起点对齐
- `flex-end`：项目靠终点对齐
- `center`：项目居中对齐
- `space-between`：项目两端对齐，中间等间距
- `space-around`：项目周围等间距
- `space-evenly`：项目之间等间距

### 5. align-items（交叉轴对齐）

控制Flex项目在交叉轴上的对齐方式：

```css
.flex-container {
    /* 交叉轴对齐方式 */
    align-items: stretch;       /* 拉伸对齐（默认） */
    align-items: flex-start;    /* 起点对齐 */
    align-items: flex-end;      /* 终点对齐 */
    align-items: center;        /* 居中对齐 */
    align-items: baseline;      /* 基线对齐 */
}
```

**对齐效果：**
- `stretch`：项目拉伸填满容器高度
- `flex-start`：项目靠起点对齐
- `flex-end`：项目靠终点对齐
- `center`：项目居中对齐
- `baseline`：项目基线对齐

### 6. align-content（多行对齐）

当有多行Flex项目时，控制行与行之间的对齐方式：

```css
.flex-container {
    /* 多行对齐方式 */
    align-content: stretch;         /* 拉伸对齐（默认） */
    align-content: flex-start;      /* 起点对齐 */
    align-content: flex-end;        /* 终点对齐 */
    align-content: center;          /* 居中对齐 */
    align-content: space-between;   /* 两端对齐 */
    align-content: space-around;    /* 环绕对齐 */
}
```

**注意：** 只有当 `flex-wrap: wrap` 且有多行项目时才生效。

### 7. gap（间距）

控制Flex项目之间的间距：

```css
.flex-container {
    /* 元素间距 */
    gap: 20px;                    /* 行列间距都是20px */
    gap: 20px 10px;              /* 行间距20px，列间距10px */
    row-gap: 20px;               /* 行间距 */
    column-gap: 10px;            /* 列间距 */
}
```

**gap的优势：**
- 比margin更简洁
- 不会产生外边距合并问题
- 响应式设计更友好

## Flexbox 项目属性

### 1. order（排序）

控制Flex项目的显示顺序：

```css
.flex-item {
    order: 0;              /* 默认顺序 */
    order: 1;              /* 排在后面 */
    order: -1;             /* 排在前面 */
}
```

**排序规则：**
- 数值越小，排列越靠前
- 相同order值的项目按DOM顺序排列
- 负值可以排在正值前面

### 2. flex-grow（扩展）

控制Flex项目的扩展比例：

```css
.flex-item {
    flex-grow: 0;          /* 不扩展（默认） */
    flex-grow: 1;          /* 扩展比例1 */
    flex-grow: 2;          /* 扩展比例2 */
}
```

**扩展原理：**
- 当容器有剩余空间时，项目按比例扩展
- `flex-grow: 0` 的项目不扩展
- 扩展空间按比例分配给有扩展的项目

### 3. flex-shrink（收缩）

控制Flex项目的收缩比例：

```css
.flex-item {
    flex-shrink: 1;        /* 收缩（默认） */
    flex-shrink: 0;        /* 不收缩 */
    flex-shrink: 2;        /* 收缩比例2 */
}
```

**收缩原理：**
- 当容器空间不足时，项目按比例收缩
- `flex-shrink: 0` 的项目不收缩
- 收缩空间按比例从有收缩的项目中减去

### 4. flex-basis（基础尺寸）

设置Flex项目的基础尺寸：

```css
.flex-item {
    flex-basis: auto;      /* 自动（默认） */
    flex-basis: 200px;     /* 固定宽度 */
    flex-basis: 50%;       /* 百分比宽度 */
    flex-basis: 0;         /* 内容宽度 */
}
```

**基础尺寸作用：**
- 在分配空间前，项目的基础尺寸
- 影响flex-grow和flex-shrink的计算
- 当flex-basis为0时，项目尺寸完全由flex-grow决定

### 5. flex（简写属性）

`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写：

```css
.flex-item {
    /* flex: grow shrink basis */
    flex: 0 1 auto;        /* 默认值 */
    flex: 1;               /* flex: 1 1 0% */
    flex: 2 0 auto;        /* flex: 2 0 auto */
    flex: 0 0 200px;       /* flex: 0 0 200px */
}
```

**常用简写值：**
- `flex: 1`：项目会扩展填满剩余空间
- `flex: 0 0 auto`：项目不扩展不收缩，保持原始尺寸
- `flex: 0 0 200px`：项目固定宽度200px

### 6. align-self（自身对齐）

覆盖容器的 `align-items` 设置：

```css
.flex-item {
    /* 覆盖容器的align-items */
    align-self: auto;       /* 继承容器（默认） */
    align-self: flex-start; /* 起点对齐 */
    align-self: flex-end;   /* 终点对齐 */
    align-self: center;     /* 居中对齐 */
    align-self: stretch;    /* 拉伸对齐 */
}
```

## 实际应用场景

### 1. 导航栏布局

#### 基础导航栏
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: #555;
    border-radius: 4px;
}
```

#### 响应式导航栏
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: #555;
    border-radius: 4px;
}

/* 移动端响应式 */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
    }
}
```

### 2. 卡片网格布局

#### 基础卡片网格
```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
    flex: 1 1 300px;        /* 基础宽度300px，可扩展可收缩 */
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.card-content {
    color: #666;
    line-height: 1.6;
}
```

#### 响应式卡片网格
```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.card {
    flex: 1 1 300px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 响应式断点 */
@media (max-width: 768px) {
    .card {
        flex: 1 1 100%;     /* 移动端单列显示 */
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .card {
        flex: 1 1 calc(50% - 10px); /* 平板端两列显示 */
    }
}
```

### 3. 表单布局

#### 水平表单
```css
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.form-label {
    flex: 0 0 120px;        /* 固定宽度，不扩展不收缩 */
    font-weight: 500;
}

.form-input {
    flex: 1;                 /* 扩展填满剩余空间 */
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
}

.form-input:focus {
    outline: none;
    border-color: #007bff;
}
```

#### 垂直表单
```css
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.form-label {
    margin-bottom: 8px;
    font-weight: 500;
}

.form-input {
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
}

.form-input:focus {
    outline: none;
    border-color: #007bff;
}
```

### 4. 页面布局

#### 经典页面布局
```css
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

.main-content {
    flex: 1;                 /* 扩展填满剩余空间 */
    display: flex;
    gap: 20px;
    padding: 20px;
}

.sidebar {
    flex: 0 0 250px;        /* 固定宽度 */
    background-color: #f5f5f5;
    padding: 20px;
}

.content {
    flex: 1;                 /* 扩展填满剩余空间 */
    background-color: white;
    padding: 20px;
}

.footer {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}
```

## 常见问题和解决方案

### 1. 高度问题

#### 问题：容器高度塌陷
```css
/* 问题：容器高度可能塌陷 */
.flex-container {
    display: flex;
    border: 2px solid #333;
}

.flex-item {
    flex: 1;
    background-color: #f0f0f0;
}

/* 解决方案：设置容器高度 */
.flex-container {
    display: flex;
    min-height: 400px;      /* 设置最小高度 */
    border: 2px solid #333;
}
```

#### 问题：项目高度不一致
```css
/* 问题：项目高度可能不一致 */
.flex-item {
    flex: 1;
    background-color: #f0f0f0;
}

/* 解决方案：使用align-items: stretch */
.flex-container {
    display: flex;
    align-items: stretch;   /* 默认值，项目拉伸填满容器 */
}
```

### 2. 宽度问题

#### 问题：项目宽度超出预期
```css
/* 问题：项目可能超出容器宽度 */
.flex-item {
    flex: 1;
    min-width: 300px;       /* 可能导致超出 */
}

/* 解决方案：使用flex-wrap和合适的flex-basis */
.flex-container {
    display: flex;
    flex-wrap: wrap;
}

.flex-item {
    flex: 1 1 300px;        /* 基础宽度300px，可换行 */
    min-width: 0;            /* 允许收缩到0 */
}
```

### 3. 响应式问题

#### 问题：移动端显示异常
```css
/* 问题：移动端可能显示异常 */
.flex-container {
    display: flex;
    gap: 20px;
}

.flex-item {
    flex: 1;
}

/* 解决方案：使用媒体查询调整 */
@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
        gap: 10px;
    }
    
    .flex-item {
        flex: none;          /* 移动端不扩展 */
    }
}
```

## 最佳实践

### 1. 属性选择原则

#### 选择合适的flex值
```css
/* ✅ 推荐：根据需求选择合适的flex值 */
/* 等宽列 */
.equal-width {
    flex: 1;                 /* 等比例扩展 */
}

/* 固定宽度列 */
.fixed-width {
    flex: 0 0 200px;        /* 固定宽度，不扩展不收缩 */
}

/* 自适应列 */
.adaptive-width {
    flex: 1 1 300px;        /* 基础宽度300px，可扩展可收缩 */
}
```

### 2. 响应式设计

#### 移动优先的Flexbox
```css
/* ✅ 推荐：移动优先的响应式设计 */
.flex-container {
    display: flex;
    flex-direction: column;  /* 移动端默认垂直排列 */
    gap: 10px;
}

@media (min-width: 768px) {
    .flex-container {
        flex-direction: row; /* 桌面端水平排列 */
        gap: 20px;
    }
}
```

### 3. 性能优化

#### 避免不必要的重排
```css
/* ❌ 避免：频繁改变flex属性 */
.performance-problem {
    flex: 1;
    /* 频繁改变flex值会触发重排 */
}

/* ✅ 推荐：使用CSS变量 */
.performance-solution {
    flex: var(--flex-grow, 1) var(--flex-shrink, 1) var(--flex-basis, auto);
}
```

## 面试重点

### 核心概念
- **Flexbox模型**：一维布局模型，主轴和交叉轴的概念
- **容器属性**：flex-direction、justify-content、align-items等的作用
- **项目属性**：flex-grow、flex-shrink、flex-basis的含义和计算

### 技术原理
- **空间分配**：flex-grow和flex-shrink如何分配剩余空间和收缩空间
- **主轴方向**：flex-direction如何影响布局方向
- **对齐机制**：justify-content和align-items的对齐原理

### 实际应用
- **布局选择**：何时使用Flexbox，何时使用Grid
- **响应式设计**：结合媒体查询实现多设备适配
- **性能优化**：合理使用Flexbox属性，减少重排重绘

### 常见面试题
1. Flexbox的主轴和交叉轴是什么？
2. flex: 1 的含义是什么？
3. justify-content和align-items的区别是什么？
4. 如何实现垂直居中？
5. Flexbox和Grid的区别是什么？

## 实践练习

### 练习1：响应式导航栏
```html
<nav class="navbar">
    <div class="nav-brand">Logo</div>
    <ul class="nav-menu">
        <li><a href="#" class="nav-link">首页</a></li>
        <li><a href="#" class="nav-link">关于</a></li>
        <li><a href="#" class="nav-link">服务</a></li>
        <li><a href="#" class="nav-link">联系</a></li>
    </ul>
</nav>
```

```css
/* 请实现一个响应式导航栏，要求： */
/* 1. 桌面端水平排列，移动端垂直排列 */
/* 2. 桌面端两端对齐，移动端居中对齐 */
/* 3. 移动端菜单项垂直排列 */
/* 4. 添加悬停效果和过渡动画 */
```

### 练习2：卡片网格布局
```html
<div class="card-grid">
    <div class="card">
        <h3 class="card-title">卡片标题1</h3>
        <p class="card-content">卡片内容描述...</p>
    </div>
    <div class="card">
        <h3 class="card-title">卡片标题2</h3>
        <p class="card-content">卡片内容描述...</p>
    </div>
    <div class="card">
        <h3 class="card-title">卡片标题3</h3>
        <p class="card-content">卡片内容描述...</p>
    </div>
</div>
```

```css
/* 请实现一个响应式的卡片网格，要求： */
/* 1. 桌面端显示为3列 */
/* 2. 平板端显示为2列 */
/* 3. 移动端显示为1列 */
/* 4. 卡片高度自适应 */
/* 5. 使用Flexbox实现 */
```

## 总结

CSS Flexbox是现代CSS布局的重要工具，掌握Flexbox能够帮助我们：
- 轻松实现复杂的布局需求
- 创建响应式的页面设计
- 解决传统布局的难题
- 提升开发效率和用户体验

建议在学习过程中：
1. 理解Flexbox的核心概念和原理
2. 掌握容器和项目的所有属性
3. 多动手实践，创建各种布局
4. 关注响应式设计和性能优化

## 下一步

掌握了CSS Flexbox后，建议继续学习：
- [Grid网格布局](./grid.md) - 学习二维布局的强大工具
- [响应式设计](./responsive.md) - 学会适配不同设备和屏幕
- [CSS动画](./animations.md) - 创建流畅的用户交互体验 