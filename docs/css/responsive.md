# CSS 响应式设计

响应式设计是一种网页设计方法，使网站能够在各种设备上提供最佳的用户体验。

## 响应式设计概述

响应式设计的核心原则：

- **移动优先** - 从移动设备开始设计
- **弹性布局** - 使用相对单位和弹性布局
- **媒体查询** - 根据设备特性调整样式
- **渐进增强** - 基础功能在所有设备上可用

## 媒体查询基础

### 1. 基本语法
```css
/* 基本媒体查询 */
@media screen and (max-width: 768px) {
    /* 在屏幕宽度小于等于768px时应用 */
    .container {
        width: 100%;
        padding: 10px;
    }
}
```

### 2. 常用断点
```css
/* 移动设备 */
@media (max-width: 767px) {
    /* 手机样式 */
}

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1023px) {
    /* 平板样式 */
}

/* 桌面设备 */
@media (min-width: 1024px) {
    /* 桌面样式 */
}
```

### 3. 设备特性查询
```css
/* 屏幕方向 */
@media (orientation: landscape) {
    /* 横屏样式 */
}

@media (orientation: portrait) {
    /* 竖屏样式 */
}

/* 分辨率 */
@media (-webkit-min-device-pixel-ratio: 2) {
    /* 高分辨率屏幕 */
}

/* 触摸设备 */
@media (hover: none) and (pointer: coarse) {
    /* 触摸设备样式 */
}
```

## 弹性单位

### 1. 相对单位
```css
.responsive-text {
    font-size: 1rem;        /* 相对于根元素字体大小 */
    font-size: 1.5em;       /* 相对于父元素字体大小 */
    font-size: 5vw;         /* 相对于视口宽度的5% */
    font-size: 5vh;         /* 相对于视口高度的5% */
}
```

### 2. 弹性布局单位
```css
.flexible-layout {
    width: 100%;            /* 占满父容器 */
    max-width: 1200px;      /* 最大宽度限制 */
    min-width: 320px;       /* 最小宽度限制 */
    
    /* 使用calc()函数 */
    width: calc(100% - 40px);
    width: calc(50% - 20px);
}
```

## 响应式图片

### 1. 基础响应式图片
```css
.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}
```

### 2. 图片容器
```css
.image-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
}

.image-container:hover img {
    transform: scale(1.05);
}
```

### 3. 背景图片响应式
```css
.hero-section {
    background-image: url('hero-mobile.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 300px;
}

@media (min-width: 768px) {
    .hero-section {
        background-image: url('hero-desktop.jpg');
        min-height: 500px;
    }
}
```

## 响应式布局技术

### 1. Flexbox响应式
```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.flex-item {
    flex: 1 1 300px; /* 基础300px，可伸缩 */
}

@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
        gap: 10px;
    }
    
    .flex-item {
        flex: 1 1 100%;
    }
}
```

### 2. Grid响应式
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
        gap: 15px;
    }
}
```

### 3. 传统布局响应式
```css
/* 三列布局 */
.three-column {
    float: left;
    width: 33.33%;
    padding: 0 15px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .three-column {
        float: none;
        width: 100%;
        margin-bottom: 20px;
    }
}
```

## 响应式导航

### 1. 汉堡菜单
```css
.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 10px;
}

.nav-toggle span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 3px 0;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .nav-toggle {
        display: flex;
    }
    
    .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .nav-menu.active {
        display: block;
    }
    
    .nav-menu li {
        display: block;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
    }
}
```

### 2. 响应式表格
```css
.responsive-table {
    width: 100%;
    border-collapse: collapse;
}

.responsive-table th,
.responsive-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

@media (max-width: 768px) {
    .responsive-table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
    
    /* 或者使用卡片式布局 */
    .responsive-table thead {
        display: none;
    }
    
    .responsive-table tbody tr {
        display: block;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
    }
    
    .responsive-table td {
        display: block;
        text-align: right;
        padding: 8px 0;
        border: none;
    }
    
    .responsive-table td::before {
        content: attr(data-label) ": ";
        font-weight: bold;
        float: left;
    }
}
```

## 性能优化

### 1. CSS优化
```css
/* 避免不必要的媒体查询 */
.common-styles {
    /* 所有设备通用的样式 */
}

/* 使用min-width而不是max-width */
@media (min-width: 768px) {
    .desktop-only {
        /* 桌面端样式 */
    }
}
```

### 2. 图片优化
```html
<!-- 使用srcset提供不同尺寸图片 -->
<img src="image-small.jpg" 
     srcset="image-small.jpg 300w,
             image-medium.jpg 600w,
             image-large.jpg 900w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     alt="响应式图片">
```

## 测试和调试

### 1. 浏览器开发者工具
- 使用Chrome DevTools的设备模拟器
- 测试不同屏幕尺寸
- 检查媒体查询是否生效

### 2. 在线测试工具
- Responsive Design Checker
- BrowserStack
- LambdaTest

## 最佳实践

1. **移动优先设计** - 从最小屏幕开始设计
2. **渐进增强** - 确保基础功能在所有设备上可用
3. **性能考虑** - 避免在小屏幕设备上加载大图片
4. **触摸友好** - 确保触摸设备上的交互体验
5. **内容优先** - 内容比设计更重要

---

**下一步：学习 [CSS动画](./animations.md)** ➡️ 