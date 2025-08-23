# CSS 布局技术 🏗️

CSS布局技术是构建网页结构的基础，掌握这些技术可以创建各种复杂的页面布局。

## 🎯 布局概述

CSS布局技术经历了从传统到现代的演进：

- **传统布局** - 基于文档流、浮动、定位
- **现代布局** - Flexbox、Grid、CSS变量
- **响应式布局** - 媒体查询、弹性单位

## 📐 文档流 (Document Flow)

### 1. 块级元素 (Block Elements)
```css
/* 块级元素默认行为 */
.block-element {
    display: block;
    width: 100%;           /* 占满父容器宽度 */
    height: auto;          /* 高度由内容决定 */
    margin: 0;             /* 外边距 */
    padding: 0;            /* 内边距 */
}
```

**常见块级元素：**
- `<div>`, `<p>`, `<h1>` - `<h6>`
- `<section>`, `<article>`, `<header>`
- `<footer>`, `<nav>`, `<main>`

### 2. 行内元素 (Inline Elements)
```css
/* 行内元素默认行为 */
.inline-element {
    display: inline;
    width: auto;           /* 宽度由内容决定 */
    height: auto;          /* 高度由内容决定 */
    margin: 0;             /* 只支持左右外边距 */
    padding: 0;            /* 支持所有方向内边距 */
}
```

**常见行内元素：**
- `<span>`, `<a>`, `<strong>`
- `<em>`, `<img>`, `<input>`

### 3. 行内块元素 (Inline-Block)
```css
/* 行内块元素 */
.inline-block-element {
    display: inline-block;
    width: 200px;          /* 可以设置宽度 */
    height: 100px;         /* 可以设置高度 */
    margin: 10px;          /* 支持所有方向外边距 */
    padding: 15px;         /* 支持所有方向内边距 */
    vertical-align: top;   /* 垂直对齐方式 */
}
```

## 🚢 浮动布局 (Float Layout)

### 1. 基本浮动
```css
.float-left {
    float: left;
    width: 200px;
    margin-right: 20px;
}

.float-right {
    float: right;
    width: 200px;
    margin-left: 20px;
}
```

### 2. 清除浮动
```css
/* 方法1：使用clear属性 */
.clear-float {
    clear: both;
}

/* 方法2：使用伪元素清除浮动 */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* 方法3：使用overflow清除浮动 */
.container {
    overflow: hidden;
}
```

### 3. 浮动布局示例
```css
/* 两列布局 */
.two-column {
    width: 100%;
    overflow: hidden;
}

.sidebar {
    float: left;
    width: 250px;
    background-color: #f5f5f5;
    padding: 20px;
}

.main-content {
    margin-left: 270px;
    padding: 20px;
}

/* 响应式两列布局 */
@media (max-width: 768px) {
    .sidebar {
        float: none;
        width: 100%;
        margin-bottom: 20px;
    }
    
    .main-content {
        margin-left: 0;
    }
}
```

## 📍 定位布局 (Position Layout)

### 1. 相对定位 (Relative)
```css
.relative-position {
    position: relative;
    top: 10px;             /* 向下偏移10px */
    left: 20px;            /* 向右偏移20px */
    z-index: 1;            /* 层级 */
}
```

### 2. 绝对定位 (Absolute)
```css
.absolute-position {
    position: absolute;
    top: 0;                /* 相对于最近的定位父元素 */
    right: 0;              /* 右上角对齐 */
    width: 100px;
    height: 50px;
    z-index: 10;
}
```

### 3. 固定定位 (Fixed)
```css
.fixed-position {
    position: fixed;
    top: 20px;             /* 相对于视口 */
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #007bff;
    border-radius: 50%;
    z-index: 1000;
}
```

### 4. 粘性定位 (Sticky)
```css
.sticky-position {
    position: sticky;
    top: 0;                /* 滚动到顶部时固定 */
    background-color: white;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    z-index: 100;
}
```

## 🎨 传统布局示例

### 1. 经典三列布局
```css
/* 容器 */
.layout-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

/* 头部 */
.header {
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

/* 主体内容 */
.main-body {
    overflow: hidden;
    margin: 20px 0;
}

/* 左侧边栏 */
.left-sidebar {
    float: left;
    width: 200px;
    background-color: #f8f9fa;
    padding: 20px;
    min-height: 400px;
}

/* 主内容区 */
.main-content {
    margin: 0 220px;
    padding: 20px;
    background-color: white;
    min-height: 400px;
}

/* 右侧边栏 */
.right-sidebar {
    float: right;
    width: 200px;
    background-color: #f8f9fa;
    padding: 20px;
    min-height: 400px;
}

/* 底部 */
.footer {
    clear: both;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}
```

### 2. 卡片网格布局
```css
/* 卡片容器 */
.card-grid {
    width: 100%;
    overflow: hidden;
}

/* 卡片 */
.card {
    float: left;
    width: calc(33.333% - 20px);
    margin: 10px;
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 响应式卡片 */
@media (max-width: 768px) {
    .card {
        width: calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .card {
        width: calc(100% - 20px);
    }
}
```

### 3. 导航菜单布局
```css
/* 导航容器 */
.nav-container {
    background-color: #333;
    overflow: hidden;
}

/* 导航菜单 */
.nav-menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    float: left;
}

.nav-link {
    display: block;
    color: white;
    text-decoration: none;
    padding: 15px 20px;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: #555;
}

/* 响应式导航 */
@media (max-width: 768px) {
    .nav-item {
        float: none;
        border-bottom: 1px solid #555;
    }
    
    .nav-link {
        text-align: center;
    }
}
```

## 🔧 布局技巧

### 1. 居中布局
```css
/* 水平居中 */
.center-horizontal {
    margin: 0 auto;
    width: 300px;
}

/* 垂直居中（已知高度） */
.center-vertical {
    position: absolute;
    top: 50%;
    height: 100px;
    margin-top: -50px;
}

/* 完全居中 */
.center-both {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### 2. 等高列布局
```css
/* 使用负边距实现等高 */
.equal-height {
    overflow: hidden;
}

.equal-height .column {
    float: left;
    width: 33.333%;
    padding: 20px;
    margin-bottom: -9999px;
    padding-bottom: 9999px;
    background-color: #f8f9fa;
}
```

### 3. 圣杯布局
```css
/* 圣杯布局容器 */
.holy-grail {
    padding: 0 200px;
    overflow: hidden;
}

.holy-grail .main {
    float: left;
    width: 100%;
    background-color: #fff;
    padding: 20px;
}

.holy-grail .left {
    float: left;
    width: 200px;
    margin-left: -100%;
    position: relative;
    left: -200px;
    background-color: #f8f9fa;
    padding: 20px;
}

.holy-grail .right {
    float: left;
    width: 200px;
    margin-left: -200px;
    position: relative;
    right: -200px;
    background-color: #f8f9fa;
    padding: 20px;
}
```

## 📱 响应式布局

### 1. 媒体查询
```css
/* 移动设备 */
@media (max-width: 768px) {
    .layout-container {
        padding: 0 15px;
    }
    
    .left-sidebar,
    .right-sidebar {
        float: none;
        width: 100%;
        margin: 10px 0;
    }
    
    .main-content {
        margin: 0;
    }
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
    .left-sidebar {
        width: 180px;
    }
    
    .right-sidebar {
        width: 180px;
    }
    
    .main-content {
        margin: 0 200px;
    }
}
```

### 2. 弹性单位
```css
.responsive-layout {
    width: 90%;            /* 相对宽度 */
    max-width: 1200px;     /* 最大宽度 */
    min-width: 320px;      /* 最小宽度 */
    margin: 0 auto;
    padding: 2vw;          /* 视口宽度单位 */
    font-size: 1rem;       /* 相对字体大小 */
    line-height: 1.6;      /* 相对行高 */
}
```

## 💡 最佳实践

1. **语义化HTML** - 使用正确的HTML标签
2. **渐进增强** - 从基础布局开始，逐步添加功能
3. **性能考虑** - 避免过度使用浮动和定位
4. **浏览器兼容** - 考虑不同浏览器的支持情况
5. **维护性** - 编写清晰、可维护的CSS代码

## 🚀 下一步

传统布局技术是CSS的基础，掌握这些技术后，建议学习：

- **[Flexbox布局](./flexbox.md)** - 现代弹性布局
- **[Grid布局](./grid.md)** - CSS网格布局
- **[响应式设计](./responsive.md)** - 适配不同设备

---

**下一步：学习 [Flexbox布局](./flexbox.md)** ➡️ 