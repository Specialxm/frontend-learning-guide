# CSS Flexbox 布局 🎯

Flexbox（Flexible Box Layout）是CSS3引入的一种强大的布局方式，专门用于创建灵活、响应式的布局。

## 🎯 Flexbox 概述

Flexbox 解决了传统布局的许多问题：

- **垂直居中** - 轻松实现元素垂直居中
- **等高列** - 自动创建等高列布局
- **响应式** - 自动适应不同屏幕尺寸
- **方向控制** - 灵活控制元素排列方向

## 📐 Flexbox 容器属性

### 1. display: flex
```css
.flex-container {
    display: flex;              /* 块级弹性容器 */
    /* 或者 */
    display: inline-flex;       /* 行内弹性容器 */
}
```

### 2. flex-direction（主轴方向）
```css
.flex-container {
    /* 主轴方向 */
    flex-direction: row;              /* 水平方向（默认） */
    flex-direction: row-reverse;      /* 水平反向 */
    flex-direction: column;           /* 垂直方向 */
    flex-direction: column-reverse;   /* 垂直反向 */
}
```

### 3. flex-wrap（换行）
```css
.flex-container {
    /* 换行方式 */
    flex-wrap: nowrap;         /* 不换行（默认） */
    flex-wrap: wrap;           /* 换行 */
    flex-wrap: wrap-reverse;   /* 反向换行 */
}
```

### 4. justify-content（主轴对齐）
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

### 5. align-items（交叉轴对齐）
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

### 6. align-content（多行对齐）
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

### 7. gap（间距）
```css
.flex-container {
    /* 元素间距 */
    gap: 20px;                    /* 行列间距都是20px */
    gap: 20px 10px;              /* 行间距20px，列间距10px */
    row-gap: 20px;               /* 行间距 */
    column-gap: 10px;            /* 列间距 */
}
```

## 🎨 Flexbox 项目属性

### 1. order（排序）
```css
.flex-item {
    order: 0;              /* 默认顺序 */
    order: 1;              /* 排在后面 */
    order: -1;             /* 排在前面 */
}
```

### 2. flex-grow（扩展）
```css
.flex-item {
    flex-grow: 0;          /* 不扩展（默认） */
    flex-grow: 1;          /* 扩展比例1 */
    flex-grow: 2;          /* 扩展比例2 */
}
```

### 3. flex-shrink（收缩）
```css
.flex-item {
    flex-shrink: 1;        /* 收缩（默认） */
    flex-shrink: 0;        /* 不收缩 */
    flex-shrink: 2;        /* 收缩比例2 */
}
```

### 4. flex-basis（基础尺寸）
```css
.flex-item {
    flex-basis: auto;      /* 自动（默认） */
    flex-basis: 200px;     /* 固定宽度 */
    flex-basis: 50%;       /* 百分比宽度 */
    flex-basis: 0;         /* 内容宽度 */
}
```

### 5. flex（简写属性）
```css
.flex-item {
    /* flex: grow shrink basis */
    flex: 0 1 auto;        /* 默认值 */
    flex: 1;               /* flex: 1 1 0% */
    flex: 2 0 auto;        /* flex: 2 0 auto */
    flex: 0 0 200px;       /* flex: 0 0 200px */
}
```

### 6. align-self（自身对齐）
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

## 🔧 Flexbox 布局示例

### 1. 基础导航栏
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

### 2. 卡片网格
```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
}

.card {
    flex: 1 1 300px;       /* 最小300px，可扩展和收缩 */
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background-color: white;
}

.card-header {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.card-content {
    line-height: 1.6;
    color: #666;
}
```

### 3. 侧边栏布局
```css
.layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 250px;       /* 固定宽度，不扩展不收缩 */
    background-color: #f8f9fa;
    padding: 2rem;
    border-right: 1px solid #ddd;
}

.main-content {
    flex: 1;                /* 占据剩余空间 */
    padding: 2rem;
    background-color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .layout {
        flex-direction: column;
    }
    
    .sidebar {
        flex: 0 0 auto;
        border-right: none;
        border-bottom: 1px solid #ddd;
    }
}
```

### 4. 居中布局
```css
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.center-box {
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
}
```

### 5. 等高列布局
```css
.equal-height {
    display: flex;
    gap: 2rem;
}

.column {
    flex: 1;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
}

/* 自动等高，无需额外技巧 */
```

### 6. 响应式表单
```css
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.form-label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-button {
    align-self: flex-end;
    padding: 0.75rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
    }
    
    .form-button {
        align-self: stretch;
    }
}
```

## 🎭 高级技巧

### 1. 嵌套Flexbox
```css
.page-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    flex: 0 0 auto;
    background-color: #333;
    color: white;
    padding: 1rem;
}

.main-area {
    flex: 1;
    display: flex;
}

.sidebar {
    flex: 0 0 200px;
    background-color: #f8f9fa;
}

.content {
    flex: 1;
    padding: 2rem;
}

.footer {
    flex: 0 0 auto;
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
}
```

### 2. 动态高度
```css
.dynamic-height {
    display: flex;
    flex-direction: column;
}

.content-area {
    flex: 1;
    min-height: 0;         /* 重要：允许内容收缩 */
}

.scrollable-content {
    overflow-y: auto;
    height: 100%;
}
```

### 3. 图片画廊
```css
.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

.gallery-item {
    flex: 1 1 200px;
    max-width: 300px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s;
}

.gallery-item:hover img {
    transform: scale(1.05);
}
```

## 📱 响应式Flexbox

### 1. 断点设计
```css
/* 移动优先设计 */
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        flex-direction: row;
        gap: 2rem;
        padding: 2rem;
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
        gap: 3rem;
    }
}
```

### 2. 自适应列数
```css
.responsive-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.grid-item {
    flex: 1 1 100%;        /* 移动端单列 */
}

@media (min-width: 768px) {
    .grid-item {
        flex: 1 1 calc(50% - 0.5rem); /* 平板双列 */
    }
}

@media (min-width: 1024px) {
    .grid-item {
        flex: 1 1 calc(33.333% - 0.67rem); /* 桌面三列 */
    }
}
```

## 💡 最佳实践

1. **移动优先** - 从移动端开始设计，逐步增强
2. **语义化** - 使用有意义的类名和结构
3. **性能** - 避免过度嵌套和复杂选择器
4. **兼容性** - 考虑旧版浏览器的支持
5. **可维护性** - 保持代码简洁和可读性

## 🚀 下一步

掌握Flexbox后，建议学习：

- **[Grid布局](./grid.md)** - CSS网格布局系统
- **[响应式设计](./responsive.md)** - 完整的响应式解决方案
- **[动画效果](./animations.md)** - CSS动画和过渡

---

**下一步：学习 [Grid布局](./grid.md)** ➡️ 