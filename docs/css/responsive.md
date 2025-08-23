# CSS 响应式设计 📱

响应式设计是一种网页设计方法，使网站能够在各种设备和屏幕尺寸上提供最佳的用户体验。

## 🎯 响应式设计概述

响应式设计的核心原则：

- **移动优先** - 从移动设备开始设计，逐步增强
- **弹性布局** - 使用相对单位和弹性布局
- **媒体查询** - 根据设备特性调整样式
- **渐进增强** - 基础功能在所有设备上可用

## 📱 断点设计

### 1. 标准断点
```css
/* 移动设备 */
@media (max-width: 767px) {
    /* 移动端样式 */
}

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1023px) {
    /* 平板样式 */
}

/* 桌面设备 */
@media (min-width: 1024px) {
    /* 桌面样式 */
}

/* 大屏幕设备 */
@media (min-width: 1440px) {
    /* 大屏幕样式 */
}
```

### 2. 移动优先断点
```css
/* 基础样式（移动端） */
.container {
    padding: 1rem;
    font-size: 16px;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        font-size: 18px;
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        font-size: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### 3. 自定义断点
```css
/* 使用CSS变量定义断点 */
:root {
    --mobile: 480px;
    --tablet: 768px;
    --desktop: 1024px;
    --large: 1440px;
}

@media (min-width: var(--tablet)) {
    /* 平板及以上样式 */
}

@media (min-width: var(--desktop)) {
    /* 桌面及以上样式 */
}
```

## 📐 响应式单位

### 1. 相对单位
```css
.responsive-text {
    /* 字体大小 */
    font-size: 1rem;              /* 相对于根元素 */
    font-size: 1.2em;             /* 相对于父元素 */
    font-size: 1.5vw;             /* 相对于视口宽度 */
    font-size: 1.5vh;             /* 相对于视口高度 */
    
    /* 尺寸 */
    width: 90%;                    /* 相对于父元素 */
    max-width: 1200px;            /* 最大宽度 */
    min-width: 320px;             /* 最小宽度 */
    
    /* 间距 */
    padding: 2vw;                  /* 视口宽度单位 */
    margin: 1rem;                  /* 根元素字体大小 */
}
```

### 2. 视口单位
```css
.viewport-units {
    /* 视口宽度 */
    width: 100vw;                  /* 100%视口宽度 */
    width: 50vw;                   /* 50%视口宽度 */
    
    /* 视口高度 */
    height: 100vh;                 /* 100%视口高度 */
    height: 50vh;                  /* 50%视口高度 */
    
    /* 视口最小值 */
    width: 100vmin;                /* 视口宽高中的较小值 */
    height: 100vmax;               /* 视口宽高中的较大值 */
}
```

### 3. 容器查询单位
```css
.container-query {
    /* 容器宽度 */
    width: 100cqw;                 /* 100%容器宽度 */
    
    /* 容器高度 */
    height: 100cqh;                /* 100%容器高度 */
    
    /* 容器最小值 */
    width: 100cqmin;               /* 容器宽高中的较小值 */
    height: 100cqmax;              /* 容器宽高中的较大值 */
}
```

## 🎨 响应式布局技术

### 1. Flexbox响应式
```css
.responsive-flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

@media (min-width: 768px) {
    .responsive-flex {
        flex-direction: row;
        gap: 2rem;
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .responsive-flex {
        gap: 3rem;
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### 2. Grid响应式
```css
.responsive-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
}

@media (min-width: 768px) {
    .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .responsive-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
        padding: 3rem;
    }
}
```

### 3. 自适应列数
```css
.adaptive-columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* 确保最小列数 */
@media (min-width: 768px) {
    .adaptive-columns {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}

@media (min-width: 1024px) {
    .adaptive-columns {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}
```

## 🖼️ 响应式图片

### 1. 基础响应式图片
```css
.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}

.responsive-image-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}
```

### 2. 图片画廊响应式
```css
.image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
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

/* 移动端单列 */
@media (max-width: 480px) {
    .image-gallery {
        grid-template-columns: 1fr;
    }
}
```

### 3. 背景图片响应式
```css
.responsive-bg {
    background-image: url('small.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 300px;
}

@media (min-width: 768px) {
    .responsive-bg {
        background-image: url('medium.jpg');
        min-height: 400px;
    }
}

@media (min-width: 1024px) {
    .responsive-bg {
        background-image: url('large.jpg');
        min-height: 500px;
    }
}
```

## 📝 响应式排版

### 1. 流体排版
```css
.fluid-typography {
    /* 基础字体大小 */
    font-size: clamp(16px, 4vw, 32px);
    
    /* 行高 */
    line-height: clamp(1.4, 1.5vw, 1.8);
    
    /* 标题字体大小 */
    h1 { font-size: clamp(24px, 6vw, 48px); }
    h2 { font-size: clamp(20px, 5vw, 36px); }
    h3 { font-size: clamp(18px, 4vw, 28px); }
    h4 { font-size: clamp(16px, 3vw, 24px); }
}
```

### 2. 响应式间距
```css
.responsive-spacing {
    /* 基础间距 */
    padding: clamp(1rem, 3vw, 3rem);
    margin: clamp(0.5rem, 2vw, 2rem);
    
    /* 元素间距 */
    gap: clamp(1rem, 2vw, 2rem);
    
    /* 容器间距 */
    .container {
        padding-left: clamp(1rem, 5vw, 3rem);
        padding-right: clamp(1rem, 5vw, 3rem);
    }
}
```

### 3. 响应式文本对齐
```css
.responsive-text-align {
    text-align: left;
}

@media (min-width: 768px) {
    .responsive-text-align {
        text-align: center;
    }
}

@media (min-width: 1024px) {
    .responsive-text-align {
        text-align: justify;
    }
}
```

## 🧭 响应式导航

### 1. 汉堡菜单
```css
.nav-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-menu.active {
    display: block;
}

.nav-menu li {
    display: block;
    border-bottom: 1px solid #eee;
}

.nav-menu a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: #333;
}

/* 桌面端显示 */
@media (min-width: 768px) {
    .nav-toggle {
        display: none;
    }
    
    .nav-menu {
        display: flex;
        position: static;
        background: none;
        box-shadow: none;
    }
    
    .nav-menu li {
        display: inline-block;
        border-bottom: none;
    }
    
    .nav-menu a {
        padding: 0.5rem 1rem;
    }
}
```

### 2. 响应式侧边栏
```css
.sidebar {
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100vh;
    background-color: white;
    box-shadow: 2px 0 4px rgba(0,0,0,0.1);
    transition: left 0.3s ease;
    z-index: 1000;
}

.sidebar.active {
    left: 0;
}

.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}

.sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
}

/* 桌面端显示 */
@media (min-width: 1024px) {
    .sidebar {
        position: static;
        left: 0;
        width: auto;
        height: auto;
        box-shadow: none;
    }
    
    .sidebar-overlay {
        display: none;
    }
}
```

## 📱 移动端优化

### 1. 触摸友好
```css
.touch-friendly {
    /* 触摸目标大小 */
    min-height: 44px;
    min-width: 44px;
    
    /* 触摸反馈 */
    -webkit-tap-highlight-color: transparent;
    
    /* 触摸滚动 */
    -webkit-overflow-scrolling: touch;
    
    /* 触摸选择 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

/* 触摸设备 */
@media (hover: none) and (pointer: coarse) {
    .touch-friendly {
        /* 触摸设备特定样式 */
        padding: 1rem;
        margin: 0.5rem 0;
    }
}
```

### 2. 移动端表单
```css
.mobile-form {
    /* 输入框大小 */
    input, textarea, select {
        font-size: 16px;          /* 防止iOS缩放 */
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
    }
    
    /* 按钮样式 */
    button {
        width: 100%;
        padding: 1rem;
        font-size: 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    /* 标签样式 */
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
}

/* 桌面端优化 */
@media (min-width: 768px) {
    .mobile-form {
        max-width: 600px;
        margin: 0 auto;
        
        input, textarea, select {
            width: auto;
        }
        
        button {
            width: auto;
            padding: 0.75rem 2rem;
        }
    }
}
```

## 🔧 响应式工具类

### 1. 显示/隐藏工具类
```css
/* 移动端显示 */
.mobile-only {
    display: block;
}

.tablet-up {
    display: none;
}

.desktop-up {
    display: none;
}

/* 平板及以上显示 */
@media (min-width: 768px) {
    .mobile-only {
        display: none;
    }
    
    .tablet-up {
        display: block;
    }
}

/* 桌面及以上显示 */
@media (min-width: 1024px) {
    .desktop-up {
        display: block;
    }
}
```

### 2. 响应式间距工具类
```css
/* 响应式内边距 */
.p-responsive {
    padding: 1rem;
}

@media (min-width: 768px) {
    .p-responsive {
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .p-responsive {
        padding: 3rem;
    }
}

/* 响应式外边距 */
.m-responsive {
    margin: 1rem;
}

@media (min-width: 768px) {
    .m-responsive {
        margin: 2rem;
    }
}

@media (min-width: 1024px) {
    .m-responsive {
        margin: 3rem;
    }
}
```

## 🎭 高级响应式技巧

### 1. 容器查询
```css
.container-query {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .container-query .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
}

@container (min-width: 600px) {
    .container-query .content {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### 2. 响应式CSS变量
```css
:root {
    /* 基础变量 */
    --spacing: 1rem;
    --font-size: 16px;
    --container-width: 100%;
}

@media (min-width: 768px) {
    :root {
        --spacing: 2rem;
        --font-size: 18px;
        --container-width: 90%;
    }
}

@media (min-width: 1024px) {
    :root {
        --spacing: 3rem;
        --font-size: 20px;
        --container-width: 1200px;
    }
}

.using-variables {
    padding: var(--spacing);
    font-size: var(--font-size);
    max-width: var(--container-width);
    margin: 0 auto;
}
```

### 3. 响应式动画
```css
.responsive-animation {
    transition: all 0.3s ease;
}

/* 移动端减少动画 */
@media (prefers-reduced-motion: reduce) {
    .responsive-animation {
        transition: none;
    }
}

/* 触摸设备优化动画 */
@media (hover: none) and (pointer: coarse) {
    .responsive-animation {
        transition-duration: 0.2s;
    }
}
```

## 💡 最佳实践

1. **移动优先** - 从移动端开始设计
2. **渐进增强** - 基础功能在所有设备上可用
3. **性能考虑** - 优化图片和资源加载
4. **用户体验** - 考虑不同设备的使用场景
5. **测试验证** - 在各种设备上测试效果

## 🚀 下一步

掌握响应式设计后，建议学习：

- **[动画效果](./animations.md)** - CSS动画和过渡
- **CSS变量** - 使用CSS自定义属性
- **现代CSS特性** - 最新的CSS技术

---

**下一步：学习 [动画效果](./animations.md)** ➡️ 