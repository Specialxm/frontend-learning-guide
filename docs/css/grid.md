# CSS Grid 布局

CSS Grid Layout 是一个强大的二维布局系统，可以同时控制行和列，创建复杂的网格布局。

## Grid 概述

CSS Grid 的优势：

- **二维布局** - 同时控制行和列
- **精确控制** - 精确定位网格项目
- **响应式** - 自动适应不同屏幕尺寸
- **命名区域** - 使用语义化名称定义布局

## Grid 容器属性

### 1. display: grid
```css
.grid-container {
    display: grid;              /* 块级网格容器 */
    /* 或者 */
    display: inline-grid;       /* 行内网格容器 */
}
```

### 2. grid-template-columns（列定义）
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

### 3. grid-template-rows（行定义）
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

### 4. grid-template-areas（区域定义）
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

### 5. gap（间距）
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

### 6. justify-items（水平对齐）
```css
.grid-container {
    justify-items: start;         /* 起点对齐（默认） */
    justify-items: end;           /* 终点对齐 */
    justify-items: center;        /* 居中对齐 */
    justify-items: stretch;       /* 拉伸对齐 */
}
```

### 7. align-items（垂直对齐）
```css
.grid-container {
    align-items: start;           /* 起点对齐 */
    align-items: end;             /* 终点对齐 */
    align-items: center;          /* 居中对齐（默认） */
    align-items: stretch;         /* 拉伸对齐 */
}
```

### 8. justify-content（容器水平对齐）
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

### 9. align-content（容器垂直对齐）
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

### 2. grid-row（行位置）
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
```css
.grid-item {
    /* 使用区域名称 */
    grid-area: header;
    
    /* 使用行列位置 */
    grid-area: 1 / 1 / 3 / 3;   /* row-start / column-start / row-end / column-end */
}
```

### 4. justify-self（自身水平对齐）
```css
.grid-item {
    justify-self: start;          /* 起点对齐 */
    justify-self: end;            /* 终点对齐 */
    justify-self: center;         /* 居中对齐 */
    justify-self: stretch;        /* 拉伸对齐（默认） */
}
```

### 5. align-self（自身垂直对齐）
```css
.grid-item {
    align-self: start;            /* 起点对齐 */
    align-self: end;              /* 终点对齐 */
    align-self: center;           /* 居中对齐 */
    align-self: stretch;          /* 拉伸对齐（默认） */
}
```

## Grid 布局示例

### 1. 基础网格
```css
.basic-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
}
```

### 2. 响应式卡片网格
```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    font-size: 1.2rem;
    font-weight: bold;
}

.card-content {
    line-height: 1.6;
    color: #666;
}
```

### 3. 经典页面布局
```css
.page-layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 250px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 1rem 2rem;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #f8f9fa;
    padding: 2rem;
    border-right: 1px solid #ddd;
}

.main {
    grid-area: main;
    padding: 2rem;
    background-color: white;
}

.aside {
    grid-area: aside;
    background-color: #f8f9fa;
    padding: 2rem;
    border-left: 1px solid #ddd;
}

.footer {
    grid-area: footer;
    background-color: #333;
    color: white;
    padding: 1rem 2rem;
    text-align: center;
}
```

### 4. 图片画廊
```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    aspect-ratio: 1;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.gallery-item:hover img {
    transform: scale(1.05);
}
```

### 5. 表单布局
```css
.form-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.form-label {
    text-align: right;
    padding: 0.5rem;
    font-weight: bold;
}

.form-input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-button {
    grid-column: 2;
    padding: 0.75rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    justify-self: start;
}
```

### 6. 仪表板布局
```css
.dashboard {
    display: grid;
    grid-template-areas: 
        "header header header header"
        "sidebar chart chart stats"
        "sidebar chart chart stats"
        "sidebar table table stats";
    grid-template-columns: 250px 1fr 1fr 300px;
    grid-template-rows: auto 1fr 1fr auto;
    gap: 1rem;
    padding: 1rem;
    min-height: 100vh;
}

.dashboard-header {
    grid-area: header;
    background-color: #333;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
}

.dashboard-sidebar {
    grid-area: sidebar;
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}

.dashboard-chart {
    grid-area: chart;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-stats {
    grid-area: stats;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-table {
    grid-area: table;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## 高级技巧

### 1. 子网格 (Subgrid)
```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.child-grid {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    gap: 0.5rem;
}
```

### 2. 自动布局
```css
.auto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    gap: 1rem;
}

.auto-grid-item {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
}
```

### 3. 命名线
```css
.named-grid {
    display: grid;
    grid-template-columns: [sidebar-start] 250px [sidebar-end main-start] 1fr [main-end];
    grid-template-rows: [header-start] auto [header-end content-start] 1fr [content-end];
}

.sidebar {
    grid-column: sidebar-start / sidebar-end;
}

.main {
    grid-column: main-start / main-end;
}

.header {
    grid-row: header-start / header-end;
}

.content {
    grid-row: content-start / content-end;
}
```

## 响应式Grid

### 1. 移动优先设计
```css
/* 移动端单列 */
.responsive-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
}

/* 平板双列 */
@media (min-width: 768px) {
    .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        padding: 2rem;
    }
}

/* 桌面多列 */
@media (min-width: 1024px) {
    .responsive-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
        padding: 3rem;
    }
}
```

### 2. 自适应列数
```css
.adaptive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* 确保最小列数 */
@media (min-width: 768px) {
    .adaptive-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
```

### 3. 断点切换布局
```css
.layout-switcher {
    display: grid;
    grid-template-areas: 
        "header"
        "main"
        "sidebar"
        "footer";
    gap: 1rem;
}

@media (min-width: 768px) {
    .layout-switcher {
        grid-template-areas: 
            "header header"
            "sidebar main"
            "footer footer";
        grid-template-columns: 250px 1fr;
    }
}

@media (min-width: 1024px) {
    .layout-switcher {
        grid-template-areas: 
            "header header header"
            "sidebar main aside"
            "footer footer footer";
        grid-template-columns: 250px 1fr 200px;
    }
}
```

## 最佳实践

1. **语义化命名** - 使用有意义的区域名称
2. **渐进增强** - 从基础布局开始，逐步添加功能
3. **响应式设计** - 考虑不同设备的显示效果
4. **性能优化** - 避免过度复杂的网格定义
5. **浏览器兼容** - 考虑旧版浏览器的支持

## 下一步

掌握Grid布局后，建议学习：

- **[响应式设计](./responsive.md)** - 完整的响应式解决方案
- **[动画效果](./animations.md)** - CSS动画和过渡
- **CSS变量** - 使用CSS自定义属性

---

**下一步：学习 [响应式设计](./responsive.md)** ➡️ 