# 性能指标计算

## 性能指标的计算原理

理解性能指标的计算方法对于准确测量和优化网页性能至关重要。本章将详细介绍各种性能指标的计算原理和实现方法。

## 1. 核心Web指标计算

### LCP (Largest Contentful Paint) 计算

**计算原理**: 跟踪页面中最大内容元素的绘制时间

**计算方法**:
```javascript
// 使用Performance Observer API
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
});

observer.observe({ entryTypes: ['largest-contentful-paint'] });
```

**LCP元素类型**:
- `<img>` 元素
- `<video>` 元素
- `<div>` 元素（包含文本内容）
- `<svg>` 元素

**实际案例**:
```
电商网站商品图片：
- 图片尺寸：800x600px
- 加载时间：1.2秒
- LCP值：1.2秒
- 优化后：0.8秒（提升33%）
```

### FID (First Input Delay) 计算

**计算原理**: 测量用户首次交互到浏览器响应的延迟

**计算方法**:
```javascript
// 监听首次输入事件
let firstInput = true;

function onFirstInput(event) {
  if (firstInput) {
    firstInput = false;
    
    // 计算FID
    const fid = event.processingStart - event.startTime;
    console.log('FID:', fid);
    
    // 发送到分析服务
    sendToAnalytics('FID', fid);
  }
}

// 监听各种输入事件
['mousedown', 'keydown', 'pointerdown', 'touchstart'].forEach(eventType => {
  document.addEventListener(eventType, onFirstInput, { once: true });
});
```

**FID计算要点**:
- 只计算首次交互
- 包括所有输入事件类型
- 测量处理开始时间

### CLS (Cumulative Layout Shift) 计算

**计算原理**: 累积计算页面布局偏移量

**计算方法**:
```javascript
let clsValue = 0;
let clsEntries = [];

function onLayoutShift(entries) {
  entries.forEach(entry => {
    if (!entry.hadRecentInput) {
      const firstEntry = clsEntries[0];
      const lastEntry = clsEntries[clsEntries.length - 1];
      
      // 计算布局偏移
      const layoutShift = entry.value;
      
      // 累积CLS值
      clsValue += layoutShift;
      
      // 记录条目
      clsEntries.push(entry);
      
      console.log('CLS:', clsValue);
    }
  });
}

const observer = new PerformanceObserver(onLayoutShift);
observer.observe({ entryTypes: ['layout-shift'] });
```

**CLS计算要素**:
- 元素移动距离
- 元素影响面积
- 时间窗口限制

## 2. 传统性能指标计算

### 页面加载时间计算

**DOMContentLoaded**:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const dcl = performance.now();
  console.log('DOMContentLoaded:', dcl);
});
```

**Load Event**:
```javascript
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log('Load Event:', loadTime);
});
```

**实际测量**:
```
性能测试结果：
- DOMContentLoaded: 1.2秒
- Load Event: 2.8秒
- 优化目标：DCL < 1.5秒，Load < 3秒
```

### 渲染时间计算

**First Paint (FP)**:
```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const fp = entries[0];
  console.log('First Paint:', fp.startTime);
});

observer.observe({ entryTypes: ['paint'] });
```

**First Contentful Paint (FCP)**:
```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const fcp = entries[0];
  console.log('First Contentful Paint:', fcp.startTime);
});

observer.observe({ entryTypes: ['paint'] });
```

## 3. 网络性能指标计算

### TTFB (Time to First Byte) 计算

**计算方法**:
```javascript
// 使用Navigation Timing API
const navigation = performance.getEntriesByType('navigation')[0];
const ttfb = navigation.responseStart - navigation.requestStart;

console.log('TTFB:', ttfb);
```

**TTFB分析**:
```
网络性能分析：
- 优秀：< 200ms
- 良好：200-600ms
- 需要改进：600ms-1.4s
- 较差：> 1.4s
```

### 资源加载时间计算

**资源加载分析**:
```javascript
// 分析所有资源加载时间
const resources = performance.getEntriesByType('resource');

resources.forEach(resource => {
  const loadTime = resource.responseEnd - resource.startTime;
  const size = resource.transferSize;
  
  console.log(`${resource.name}: ${loadTime}ms, ${size}bytes`);
});
```

## 4. 交互性能指标计算

### TTI (Time to Interactive) 计算

**计算原理**: 页面完全可交互的时间点

**计算方法**:
```javascript
// 使用Lighthouse CI或WebPageTest
// 手动计算需要复杂的启发式算法
function calculateTTI() {
  // 1. 找到最后一个长任务
  // 2. 确认主线程空闲
  // 3. 验证网络请求完成
  // 4. 返回时间点
}
```

### TBT (Total Blocking Time) 计算

**计算原理**: 主线程被阻塞的总时间

**计算方法**:
```javascript
const observer = new PerformanceObserver((list) => {
  let totalBlockingTime = 0;
  
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) {
      totalBlockingTime += entry.duration - 50;
    }
  });
  
  console.log('Total Blocking Time:', totalBlockingTime);
});

observer.observe({ entryTypes: ['longtask'] });
```

## 5. 自定义性能指标

### 业务相关指标

**页面可用性指标**:
```javascript
// 计算页面功能可用时间
function calculatePageUsability() {
  const startTime = performance.now();
  
  // 检查关键功能是否可用
  const isUsable = checkCriticalFeatures();
  
  if (isUsable) {
    const usabilityTime = performance.now() - startTime;
    console.log('Page Usability Time:', usabilityTime);
  }
}
```

**用户交互响应指标**:
```javascript
// 测量用户操作响应时间
let interactionCount = 0;
let totalResponseTime = 0;

function measureInteraction(event) {
  const startTime = performance.now();
  
  // 模拟操作处理
  setTimeout(() => {
    const responseTime = performance.now() - startTime;
    totalResponseTime += responseTime;
    interactionCount++;
    
    const avgResponseTime = totalResponseTime / interactionCount;
    console.log('Average Response Time:', avgResponseTime);
  }, 0);
}
```

## 6. 性能数据收集和分析

### 数据收集策略

**实时数据收集**:
```javascript
// 创建性能监控器
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.initObservers();
  }
  
  initObservers() {
    // 初始化各种性能观察器
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
  }
  
  sendMetrics() {
    // 发送性能数据到分析服务
    fetch('/api/performance', {
      method: 'POST',
      body: JSON.stringify(this.metrics)
    });
  }
}
```

**数据聚合分析**:
```javascript
// 分析性能数据趋势
function analyzePerformanceTrends(data) {
  const trends = {
    lcp: calculateTrend(data.lcp),
    fid: calculateTrend(data.fid),
    cls: calculateTrend(data.cls)
  };
  
  return trends;
}
```

## 7. 性能预算设置

### 设置性能目标

**性能预算示例**:
```javascript
const performanceBudget = {
  lcp: 2500,      // 2.5秒
  fid: 100,       // 100毫秒
  cls: 0.1,       // 0.1
  ttfb: 600,      // 600毫秒
  fcp: 1800       // 1.8秒
};

// 检查性能是否达标
function checkPerformanceBudget(metrics) {
  const violations = [];
  
  Object.keys(performanceBudget).forEach(metric => {
    if (metrics[metric] > performanceBudget[metric]) {
      violations.push({
        metric,
        current: metrics[metric],
        budget: performanceBudget[metric]
      });
    }
  });
  
  return violations;
}
```

## 总结

性能指标计算是性能优化的基础。通过准确测量各种性能指标，我们可以：

1. **量化性能问题**：用数据说话，避免主观判断
2. **指导优化方向**：明确哪些方面需要改进
3. **验证优化效果**：用数据证明优化的价值
4. **建立性能基准**：为持续优化提供参考

在下一章节中，我们将学习如何使用各种工具来分析和定位性能问题。 