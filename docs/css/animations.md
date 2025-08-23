# CSS 动画效果 ✨

CSS动画和过渡可以为网页添加生动的交互效果，提升用户体验和视觉吸引力。

## 🎯 动画概述

CSS动画的优势：

- **性能优秀** - 使用GPU加速，性能更好
- **易于控制** - 精确控制动画时间和效果
- **响应式** - 自动适应不同设备
- **可访问性** - 支持减少动画偏好设置

## 🎭 CSS 过渡 (Transitions)

### 1. 基础过渡
```css
.transition-basic {
    /* 过渡属性 */
    transition-property: all;           /* 所有属性 */
    transition-property: background-color, transform; /* 指定属性 */
    
    /* 过渡时间 */
    transition-duration: 0.3s;          /* 0.3秒 */
    transition-duration: 300ms;         /* 300毫秒 */
    
    /* 过渡延迟 */
    transition-delay: 0s;               /* 无延迟 */
    transition-delay: 0.1s;             /* 延迟0.1秒 */
    
    /* 过渡函数 */
    transition-timing-function: ease;   /* 缓动函数 */
}

/* 简写方式 */
.transition-shorthand {
    transition: all 0.3s ease 0s;
    /* property duration timing-function delay */
}
```

### 2. 过渡函数
```css
.transition-timing {
    /* 线性过渡 */
    transition-timing-function: linear;
    
    /* 缓入 */
    transition-timing-function: ease-in;
    
    /* 缓出 */
    transition-timing-function: ease-out;
    
    /* 缓入缓出 */
    transition-timing-function: ease-in-out;
    
    /* 贝塞尔曲线 */
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* 步进函数 */
    transition-timing-function: steps(5);
    transition-timing-function: steps(5, start);
    transition-timing-function: steps(5, end);
}
```

### 3. 过渡示例
```css
/* 按钮悬停效果 */
.btn {
    background-color: #007bff;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* 卡片悬停效果 */
.card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

/* 链接下划线效果 */
.link {
    color: #007bff;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;
}

.link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #007bff;
    transition: width 0.3s ease;
}

.link:hover {
    color: #0056b3;
}

.link:hover::after {
    width: 100%;
}
```

## 🎬 CSS 动画 (Animations)

### 1. 关键帧动画
```css
/* 定义动画 */
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

@keyframes fadeInUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }
    
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
    }
    
    40%, 43% {
        transform: translate3d(0, -30px, 0);
    }
    
    70% {
        transform: translate3d(0, -15px, 0);
    }
    
    90% {
        transform: translate3d(0, -4px, 0);
    }
}
```

### 2. 动画属性
```css
.animated-element {
    /* 动画名称 */
    animation-name: slideIn;
    
    /* 动画持续时间 */
    animation-duration: 1s;
    
    /* 动画延迟 */
    animation-delay: 0s;
    
    /* 动画迭代次数 */
    animation-iteration-count: 1;      /* 播放1次 */
    animation-iteration-count: infinite; /* 无限循环 */
    animation-iteration-count: 3;      /* 播放3次 */
    
    /* 动画方向 */
    animation-direction: normal;        /* 正向播放 */
    animation-direction: reverse;       /* 反向播放 */
    animation-direction: alternate;     /* 交替播放 */
    animation-direction: alternate-reverse; /* 反向交替 */
    
    /* 动画填充模式 */
    animation-fill-mode: none;          /* 不填充 */
    animation-fill-mode: forwards;      /* 保持最后一帧 */
    animation-fill-mode: backwards;     /* 应用第一帧 */
    animation-fill-mode: both;          /* 应用首尾帧 */
    
    /* 动画播放状态 */
    animation-play-state: running;      /* 播放中 */
    animation-play-state: paused;       /* 暂停 */
    
    /* 动画函数 */
    animation-timing-function: ease;
}

/* 简写方式 */
.animated-shorthand {
    animation: slideIn 1s ease 0s 1 normal forwards;
    /* name duration timing-function delay iteration-count direction fill-mode */
}
```

### 3. 动画示例
```css
/* 淡入动画 */
.fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 滑入动画 */
.slide-in-left {
    animation: slideInLeft 0.6s ease-out;
}

@keyframes slideInLeft {
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
.scale-in {
    animation: scaleIn 0.5s ease-out;
}

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
.rotate-in {
    animation: rotateIn 0.8s ease-out;
}

@keyframes rotateIn {
    from {
        transform: rotate(-200deg);
        opacity: 0;
    }
    to {
        transform: rotate(0);
        opacity: 1;
    }
}
```

## 🎨 高级动画技巧

### 1. 动画组合
```css
.combined-animation {
    animation: 
        fadeIn 0.6s ease-out,
        slideInUp 0.8s ease-out 0.3s both,
        scaleIn 1s ease-out 0.6s both;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
```

### 2. 动画暂停和恢复
```css
.pausable-animation {
    animation: bounce 2s infinite;
}

.pausable-animation:hover {
    animation-play-state: paused;
}

/* 使用JavaScript控制 */
.pausable-animation.paused {
    animation-play-state: paused;
}
```

### 3. 动画性能优化
```css
.optimized-animation {
    /* 启用硬件加速 */
    transform: translateZ(0);
    will-change: transform, opacity;
    
    /* 使用transform而不是改变位置属性 */
    animation: slideIn 0.5s ease-out;
}

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
```

## 🎭 交互动画

### 1. 悬停动画
```css
.hover-animation {
    transition: all 0.3s ease;
}

.hover-animation:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* 3D悬停效果 */
.card-3d {
    transition: transform 0.3s ease;
    transform-style: preserve-3d;
}

.card-3d:hover {
    transform: rotateY(10deg) rotateX(5deg);
}
```

### 2. 点击动画
```css
.click-animation {
    transition: transform 0.1s ease;
}

.click-animation:active {
    transform: scale(0.95);
}

/* 波纹效果 */
.ripple {
    position: relative;
    overflow: hidden;
}

.ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.ripple:active::after {
    width: 300px;
    height: 300px;
}
```

### 3. 滚动动画
```css
.scroll-animation {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.scroll-animation.animate {
    opacity: 1;
    transform: translateY(0);
}

/* 使用Intersection Observer API触发 */
```

## 📱 响应式动画

### 1. 减少动画偏好
```css
.responsive-animation {
    transition: all 0.3s ease;
}

/* 用户偏好减少动画 */
@media (prefers-reduced-motion: reduce) {
    .responsive-animation {
        transition: none;
        animation: none;
    }
}
```

### 2. 触摸设备优化
```css
.touch-animation {
    transition: all 0.3s ease;
}

/* 触摸设备减少动画时间 */
@media (hover: none) and (pointer: coarse) {
    .touch-animation {
        transition-duration: 0.2s;
    }
}
```

### 3. 性能优化
```css
.performance-animation {
    /* 只对需要的属性进行动画 */
    transition: transform 0.3s ease, opacity 0.3s ease;
    
    /* 避免动画布局属性 */
    /* 不要动画: width, height, margin, padding */
}
```

## 🎨 实用动画组件

### 1. 加载动画
```css
.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 脉冲加载 */
.loading-pulse {
    width: 40px;
    height: 40px;
    background-color: #007bff;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.7;
    }
}
```

### 2. 通知动画
```css
.notification {
    padding: 15px 20px;
    background-color: #28a745;
    color: white;
    border-radius: 6px;
    margin: 10px;
    animation: slideInRight 0.5s ease-out;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 退出动画 */
.notification.removing {
    animation: slideOutRight 0.5s ease-in forwards;
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
```

### 3. 模态框动画
```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    transform: scale(0.7);
    opacity: 0;
    transition: all 0.3s ease;
}

.modal.active .modal-content {
    transform: scale(1);
    opacity: 1;
}
```

## 🔧 动画调试和优化

### 1. 动画调试
```css
.debug-animation {
    /* 添加边框查看元素边界 */
    border: 1px solid red;
    
    /* 减慢动画速度 */
    animation-duration: 3s;
    
    /* 暂停动画 */
    animation-play-state: paused;
}
```

### 2. 性能监控
```css
.performance-animation {
    /* 启用硬件加速 */
    transform: translateZ(0);
    
    /* 提示浏览器哪些属性会变化 */
    will-change: transform, opacity;
    
    /* 使用transform3d强制硬件加速 */
    transform: translate3d(0, 0, 0);
}
```

## 💡 最佳实践

1. **适度使用** - 动画应该增强体验，不是干扰
2. **性能优先** - 使用transform和opacity进行动画
3. **可访问性** - 支持减少动画偏好设置
4. **一致性** - 保持动画风格的一致性
5. **测试验证** - 在各种设备上测试动画效果

## 🚀 下一步

掌握CSS动画后，建议学习：

- **JavaScript动画** - 更复杂的动画控制
- **Web Animations API** - 现代动画标准
- **CSS变量** - 动态控制动画参数
- **现代CSS特性** - 最新的CSS技术

---

**恭喜！你已经完成了CSS学习之旅** 🎉

**回顾学习内容：**
- [CSS选择器](./selectors.md) - 精确选择元素
- [盒模型](./box-model.md) - 理解布局基础
- [布局技术](./layout.md) - 传统布局方法
- [Flexbox](./flexbox.md) - 现代弹性布局
- [Grid](./grid.md) - CSS网格布局
- [响应式设计](./responsive.md) - 适配不同设备
- [动画效果](./animations.md) - CSS动画和过渡


**下一步：开始学习 [JavaScript 编程](../javascript/)** ➡️ 