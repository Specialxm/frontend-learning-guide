# CSS 动画效果

CSS动画和过渡可以为网页添加生动的交互效果，提升用户体验。

## 动画概述

CSS动画的优势：

- **性能优秀** - 使用GPU加速，性能更好
- **易于控制** - 精确控制动画时间和效果
- **响应式友好** - 可以配合媒体查询使用
- **浏览器支持** - 现代浏览器都支持

## CSS 过渡 (Transitions)

### 1. 基本过渡
```css
.transition-element {
    /* 过渡属性 */
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    
    /* 简写方式 */
    transition: all 0.3s ease 0s;
}
```

### 2. 过渡属性详解
```css
.transition-demo {
    background-color: #007bff;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    
    /* 只对特定属性应用过渡 */
    transition-property: background-color, transform;
    transition-duration: 0.3s, 0.2s;
    transition-timing-function: ease, ease-in-out;
}

.transition-demo:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
```

### 3. 缓动函数
```css
.easing-demo {
    /* 线性 */
    transition-timing-function: linear;
    
    /* 缓入 */
    transition-timing-function: ease-in;
    
    /* 缓出 */
    transition-timing-function: ease-out;
    
    /* 缓入缓出 */
    transition-timing-function: ease-in-out;
    
    /* 贝塞尔曲线 */
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

## CSS 动画 (Animations)

### 1. 关键帧动画
```css
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animated-element {
    animation-name: slideIn;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    
    /* 简写方式 */
    animation: slideIn 1s ease-out 0s 1 normal forwards;
}
```

### 2. 动画属性详解
```css
.animation-demo {
    /* 动画名称 */
    animation-name: bounce;
    
    /* 动画持续时间 */
    animation-duration: 2s;
    
    /* 动画延迟 */
    animation-delay: 0.5s;
    
    /* 动画重复次数 */
    animation-iteration-count: infinite;
    
    /* 动画方向 */
    animation-direction: alternate;
    
    /* 动画填充模式 */
    animation-fill-mode: both;
    
    /* 动画播放状态 */
    animation-play-state: running;
}
```

### 3. 常用动画效果
```css
/* 淡入动画 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* 滑入动画 */
@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 缩放动画 */
@keyframes scaleIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* 旋转动画 */
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

## 动画应用示例

### 1. 按钮悬停效果
```css
.btn {
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

### 2. 卡片悬停效果
```css
.card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    transition: transform 0.3s ease;
}

.card:hover img {
    transform: scale(1.05);
}
```

### 3. 导航菜单动画
```css
.nav-item {
    position: relative;
    padding: 15px 20px;
    transition: color 0.3s ease;
}

.nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #007bff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-item:hover::after {
    width: 100%;
}

.nav-item:hover {
    color: #007bff;
}
```

## 高级动画技巧

### 1. 动画组合
```css
@keyframes complexAnimation {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    
    25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 0.8;
    }
    
    50% {
        transform: translateY(0) rotate(180deg);
        opacity: 0.6;
    }
    
    75% {
        transform: translateY(20px) rotate(270deg);
        opacity: 0.8;
    }
    
    100% {
        transform: translateY(0) rotate(360deg);
        opacity: 1;
    }
}

.complex-animation {
    animation: complexAnimation 3s ease-in-out infinite;
}
```

### 2. 动画暂停和恢复
```css
.pausable-animation {
    animation: bounce 2s ease-in-out infinite;
    animation-play-state: running;
}

.pausable-animation:hover {
    animation-play-state: paused;
}
```

### 3. 动画性能优化
```css
.optimized-animation {
    /* 只对transform和opacity应用动画 */
    transition: transform 0.3s ease, opacity 0.3s ease;
    
    /* 启用硬件加速 */
    will-change: transform, opacity;
    
    /* 或者使用transform3d */
    transform: translate3d(0, 0, 0);
}
```

## 响应式动画

### 1. 媒体查询控制动画
```css
/* 移动端减少动画 */
@media (max-width: 768px) {
    .animated-element {
        animation-duration: 0.5s;
        transition-duration: 0.2s;
    }
}

/* 高刷新率屏幕优化 */
@media (min-resolution: 2dppx) {
    .animated-element {
        animation-duration: 0.3s;
    }
}
```

### 2. 减少动画偏好
```css
@media (prefers-reduced-motion: reduce) {
    .animated-element {
        animation: none;
        transition: none;
    }
}
```

## 动画调试

### 1. 浏览器开发者工具
- 使用Chrome DevTools的Animations面板
- 查看动画时间线
- 调整动画参数

### 2. 调试技巧
```css
.debug-animation {
    /* 添加边框查看元素边界 */
    border: 1px solid red;
    
    /* 减慢动画速度 */
    animation-duration: 5s;
    transition-duration: 2s;
}
```

## 最佳实践

1. **适度使用** - 动画应该增强体验，不是干扰
2. **性能考虑** - 优先使用transform和opacity
3. **可访问性** - 尊重用户的减少动画偏好
4. **一致性** - 保持动画风格的一致性
5. **测试验证** - 在不同设备上测试动画效果

---

**CSS学习完成！** ✨ 