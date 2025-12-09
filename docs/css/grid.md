# CSS Grid 网格布局详解

## 概述
CSS Grid Layout 是一个强大的二维布局系统，可以同时控制行和列，创建复杂的网格布局。Grid提供了比Flexbox更强大的布局能力，特别适合创建复杂的页面布局和组件设计。

## 学习目标
- 理解CSS Grid的基本概念和二维布局模型
- 掌握Grid容器和项目的所有属性
- 学会使用Grid创建各种复杂布局
- 理解Grid在响应式设计中的应用
- 能够解决实际项目中的布局问题

## Grid 核心概念

### 1. 基本术语

- **Grid容器（Grid Container）**：设置了 `display: grid` 的元素
- **Grid项目（Grid Item）**：Grid容器的直接子元素
- **Grid线（Grid Line）**：构成网格结构的水平线和垂直线
- **Grid轨道（Grid Track）**：两条相邻Grid线之间的空间
- **Grid单元格（Grid Cell）**：Grid行和Grid列交叉形成的空间
- **Grid区域（Grid Area）**：任意数量的Grid单元格组成的区域

### 2. 二维布局模型

Grid采用二维布局模型，可以同时控制行和列：

```
列线 (Column Lines)
1    2    3    4
┌────┼────┼────┼────┐
│    │    │    │    │ ← 行线 (Row Lines)
├────┼────┼────┼────┤ 1
│    │    │    │    │
├────┼────┼────┼────┤ 2
│    │    │    │    │
├────┼────┼────┼────┤ 3
│    │    │    │    │
└────┴────┴────┴────┘ 4
```

## Grid 容器属性

### 1. display: grid

```css
.grid-container {
    display: grid;              /* 块级网格容器 */
    /* 或者 */
    display: inline-grid;       /* 行内网格容器 */
}
```

**区别说明：**
- `display: grid`：容器表现为块级元素
- `display: inline-grid`：容器表现为行内元素

### 2. grid-template-columns（列定义）

定义网格的列结构和尺寸：

```css
.grid-container {
    /* 固定宽度列 */
    grid-template-columns: 200px 200px 200px;
    
    /* 百分比列 */
    grid-template-columns: 33.33% 33.33% 33.33%;
    
    /* 弹性列 */
    grid-template-columns: 1fr 2fr 1fr;
    
    /* 混合单位 */
    grid-template-columns: 200px 1fr 2fr;
    
    /* 重复列 */
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

**单位说明：**
- `fr`：弹性单位，按比例分配剩余空间
- `auto`：自动尺寸，由内容决定
- `minmax(min, max)`：最小值和最大值范围

### 3. grid-template-rows（行定义）

定义网格的行结构和尺寸：

```css
.grid-container {
    /* 固定高度行 */
    grid-template-rows: 100px 200px 100px;
    
    /* 弹性行 */
    grid-template-rows: 1fr 2fr 1fr;
    
    /* 自动行 */
    grid-template-rows: auto 1fr auto;
    
    /* 重复行 */
    grid-template-rows: repeat(3, 1fr);
}
```

**行高策略：**
- `auto`：行高由内容决定
- `1fr`：行高按比例分配剩余空间
- 固定值：行高固定不变

### 4. grid-template-areas（区域定义）

使用语义化名称定义网格区域：

```css
.grid-container {
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

**区域命名规则：**
- 每个区域名称对应一个网格项目
- 使用 `grid-area` 属性将项目分配到区域
- 点号 `.` 表示空单元格

### 5. gap（间距）

控制网格项目之间的间距：

```css
.grid-container {
    /* 行列间距 */
    gap: 20px;                    /* 行列间距都是20px */
    gap: 20px 10px;              /* 行间距20px，列间距10px */
    
    /* 分别设置 */
    row-gap: 20px;               /* 行间距 */
    column-gap: 10px;            /* 列间距 */
}
```

**gap的优势：**
- 比margin更简洁
- 不会产生外边距合并问题
- 响应式设计更友好

### 6. justify-items（水平对齐）

控制所有网格项目在列方向上的对齐方式：

```css
.grid-container {
    justify-items: start;         /* 起点对齐（默认） */
    justify-items: end;           /* 终点对齐 */
    justify-items: center;        /* 居中对齐 */
    justify-items: stretch;       /* 拉伸对齐 */
}
```

**对齐效果：**
- `start`：项目靠起点对齐
- `end`：项目靠终点对齐
- `center`：项目居中对齐
- `stretch`：项目拉伸填满单元格

### 7. align-items（垂直对齐）

控制所有网格项目在行方向上的对齐方式：

```css
.grid-container {
    align-items: start;           /* 起点对齐 */
    align-items: end;             /* 终点对齐 */
    align-items: center;          /* 居中对齐（默认） */
    align-items: stretch;         /* 拉伸对齐 */
}
```

**对齐效果：**
- `start`：项目靠起点对齐
- `end`：项目靠终点对齐
- `center`：项目居中对齐
- `stretch`：项目拉伸填满单元格

### 8. justify-content（容器水平对齐）

当网格总宽度小于容器宽度时，控制整个网格在容器中的水平对齐：

```css
.grid-container {
    justify-content: start;       /* 起点对齐（默认） */
    justify-content: end;         /* 终点对齐 */
    justify-content: center;      /* 居中对齐 */
    justify-content: space-between; /* 两端对齐 */
    justify-content: space-around;  /* 环绕对齐 */
    justify-content: space-evenly;  /* 均匀对齐 */
}
```

**对齐效果：**
- `start`：网格靠起点对齐
- `end`：网格靠终点对齐
- `center`：网格居中对齐
- `space-between`：网格两端对齐，中间等间距
- `space-around`：网格周围等间距
- `space-evenly`：网格之间等间距

### 9. align-content（容器垂直对齐）

当网格总高度小于容器高度时，控制整个网格在容器中的垂直对齐：

```css
.grid-container {
    align-content: start;         /* 起点对齐 */
    align-content: end;           /* 终点对齐 */
    align-content: center;        /* 居中对齐 */
    align-content: space-between; /* 两端对齐 */
    align-content: space-around;  /* 环绕对齐 */
    align-content: space-evenly;  /* 均匀对齐 */
    align-content: stretch;       /* 拉伸对齐（默认） */
}
```

## Grid 项目属性

### 1. grid-column（列位置）

控制网格项目在列方向上的位置和跨度：

```css
.grid-item {
    /* 指定列范围 */
    grid-column: 1 / 3;          /* 从第1列到第3列 */
    grid-column: 2 / span 2;     /* 从第2列开始，跨越2列 */
    
    /* 单独设置 */
    grid-column-start: 1;
    grid-column-end: 3;
}
```

**位置说明：**
- 使用Grid线编号指定位置
- `span n` 表示跨越n个轨道
- 负数表示从末尾开始计数

### 2. grid-row（行位置）

控制网格项目在行方向上的位置和跨度：

```css
.grid-item {
    /* 指定行范围 */
    grid-row: 1 / 3;             /* 从第1行到第3行 */
    grid-row: 2 / span 2;        /* 从第2行开始，跨越2行 */
    
    /* 单独设置 */
    grid-row-start: 1;
    grid-row-end: 3;
}
```

### 3. grid-area（区域位置）

使用区域名称或行列位置控制网格项目的位置：

```css
.grid-item {
    /* 使用区域名称 */
    grid-area: header;
    
    /* 使用行列位置 */
    grid-area: 1 / 1 / 3 / 3;   /* row-start / column-start / row-end / column-end */
}
```

**区域定位：**
- 使用预定义的区域名称
- 使用具体的行列坐标
- 可以同时跨越多个单元格

### 4. justify-self（自身水平对齐）

覆盖容器的 `justify-items` 设置：

```css
.grid-item {
    justify-self: start;          /* 起点对齐 */
    justify-self: end;            /* 终点对齐 */
    justify-self: center;         /* 居中对齐 */
    justify-self: stretch;        /* 拉伸对齐（默认） */
}
```

### 5. align-self（自身垂直对齐）

覆盖容器的 `align-items` 设置：

```css
.grid-item {
    align-self: start;            /* 起点对齐 */
    align-self: end;              /* 终点对齐 */
    align-self: center;           /* 居中对齐 */
    align-self: stretch;          /* 拉伸对齐（默认） */
}
```

## 实际应用场景

### 1. 页面布局

#### 经典页面布局
```css
.page-layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 250px 1fr 250px;
    min-height: 100vh;
    gap: 20px;
}

.header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f5f5f5;
    padding: 20px;
}

.main {
    grid-area: main;
    background-color: white;
    padding: 20px;
}

.aside {
    grid-area: aside;
    background-color: #f5f5f5;
    padding: 20px;
}

.footer {
    grid-area: footer;
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .page-layout {
        grid-template-areas: 
            "header"
            "sidebar"
            "main"
            "aside"
            "footer";
        grid-template-columns: 1fr;
    }
}
```

### 2. 卡片网格

#### 响应式卡片网格
```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card {
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

/* 自定义断点 */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### 3. 表单布局

#### 复杂表单布局
```css
.form-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
        "name email"
        "phone company"
        "message message"
        "submit submit";
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.name { grid-area: name; }
.form-group.email { grid-area: email; }
.form-group.phone { grid-area: phone; }
.form-group.company { grid-area: company; }
.form-group.message { grid-area: message; }
.form-group.submit { grid-area: submit; }

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

.form-group.message .form-input {
    min-height: 100px;
    resize: vertical;
}

.form-button {
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.form-button:hover {
    background-color: #0056b3;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .form-layout {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "name"
            "email"
            "phone"
            "company"
            "message"
            "submit";
    }
}
```

### 4. 图片画廊

#### 瀑布流图片画廊
```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: translateY(-5px);
}

.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    padding: 20px 15px 15px;
    font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 15px;
    }
}
```

## 常见问题和解决方案

### 1. 尺寸问题

#### 问题：项目尺寸超出预期
```css
/* 问题：项目可能超出容器 */
.grid-item {
    grid-column: 1 / 3;
    width: 400px; /* 可能导致超出 */
}

/* 解决方案：使用Grid的尺寸控制 */
.grid-item {
    grid-column: 1 / 3;
    /* 移除固定宽度，让Grid控制尺寸 */
}
```

#### 问题：内容溢出
```css
/* 问题：内容可能溢出网格单元格 */
.grid-item {
    overflow: visible; /* 默认值，内容可能溢出 */
}

/* 解决方案：控制溢出 */
.grid-item {
    overflow: hidden; /* 隐藏溢出内容 */
    /* 或者 */
    overflow: auto;   /* 显示滚动条 */
}
```

### 2. 响应式问题

#### 问题：移动端显示异常
```css
/* 问题：移动端可能显示异常 */
.grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

/* 解决方案：使用媒体查询调整 */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        gap: 15px;
    }
}
```

### 3. 性能问题

#### 问题：复杂的网格计算
```css
/* 问题：复杂的网格定义可能影响性能 */
.grid-container {
    grid-template-columns: repeat(100, 1fr); /* 100列可能影响性能 */
}

/* 解决方案：使用合理的网格数量 */
.grid-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    max-width: 1200px;
}
```

## 最佳实践

### 1. 网格设计原则

#### 选择合适的网格结构
```css
/* ✅ 推荐：根据内容选择合适的网格 */
/* 简单列表 */
.simple-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

/* 卡片网格 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* 复杂布局 */
.complex-layout {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
}
```

### 2. 响应式设计

#### 移动优先的Grid
```css
/* ✅ 推荐：移动优先的响应式设计 */
.grid-container {
    display: grid;
    grid-template-columns: 1fr; /* 移动端单列 */
    gap: 15px;
}

@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr); /* 平板端双列 */
        gap: 20px;
    }
}

@media (min-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr); /* 桌面端三列 */
        gap: 25px;
    }
}
```

### 3. 性能优化

#### 避免过度复杂的网格
```css
/* ❌ 避免：过度复杂的网格定义 */
.over-complex {
    grid-template-columns: repeat(50, 1fr);
    grid-template-rows: repeat(50, 1fr);
}

/* ✅ 推荐：合理的网格数量 */
.optimized {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    max-width: 1200px;
}
```

## 面试重点

### 核心概念
- **Grid模型**：二维布局模型，行和列的概念
- **容器属性**：grid-template-columns、grid-template-rows、grid-template-areas等
- **项目属性**：grid-column、grid-row、grid-area等

### 技术原理
- **网格线系统**：如何使用网格线定位项目
- **区域命名**：grid-template-areas的使用方法
- **响应式网格**：auto-fit、auto-fill、minmax等函数

### 实际应用
- **布局选择**：何时使用Grid，何时使用Flexbox
- **复杂布局**：如何使用Grid创建复杂的页面布局
- **性能考虑**：Grid的性能优化策略

### 常见面试题
1. CSS Grid和Flexbox的区别是什么？
2. 如何使用Grid实现响应式布局？
3. grid-template-areas的作用是什么？
4. 如何控制Grid项目的位置和大小？
5. Grid的性能优化有哪些方法？

## 实践练习

### 练习1：响应式页面布局
```html
<div class="page-layout">
    <header class="header">页面头部</header>
    <aside class="sidebar">侧边栏</aside>
    <main class="main">主内容区</main>
    <aside class="aside">右侧边栏</aside>
    <footer class="footer">页面底部</footer>
</div>
```

```css
/* 请实现一个响应式的页面布局，要求： */
/* 1. 桌面端显示为三列布局（侧边栏-主内容-右侧边栏） */
/* 2. 平板端显示为两列布局（侧边栏-主内容） */
/* 3. 移动端显示为单列布局 */
/* 4. 使用grid-template-areas定义布局 */
/* 5. 主内容区高度自适应 */
```

### 练习2：响应式卡片网格
```html
<div class="card-grid">
    <div class="card">卡片1</div>
    <div class="card">卡片2</div>
    <div class="card">卡片3</div>
    <div class="card">卡片4</div>
    <div class="card">卡片5</div>
    <div class="card">卡片6</div>
</div>
```

```css
/* 请实现一个响应式的卡片网格，要求： */
/* 1. 桌面端显示为4列 */
/* 2. 平板端显示为3列 */
/* 3. 移动端显示为2列 */
/* 4. 使用auto-fit和minmax实现自适应 */
/* 5. 卡片高度自适应内容 */
```

## 总结

CSS Grid是现代CSS布局的强大工具，掌握Grid能够帮助我们：
- 创建复杂的二维布局
- 实现精确的页面结构
- 构建响应式的网格系统
- 提升布局的灵活性和可维护性

建议在学习过程中：
1. 理解Grid的核心概念和二维模型
2. 掌握容器和项目的所有属性
3. 多动手实践，创建各种复杂布局
4. 关注响应式设计和性能优化

## 下一步

掌握了CSS Grid后，建议继续学习：
- [响应式设计](./responsive.md) - 学会适配不同设备和屏幕
- [CSS动画](./animations.md) - 创建流畅的用户交互体验
- [CSS性能优化](/performance/) - 提升页面性能 