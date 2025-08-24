# JavaScript 事件系统详解

## 概述
事件处理是JavaScript中响应用户交互和系统事件的核心机制，它允许我们创建动态和交互式的网页应用。理解事件系统的工作原理对于构建高质量的Web应用至关重要。

## 学习目标
- 理解事件机制和事件传播模型
- 掌握事件绑定和处理的多种方式
- 学会使用事件委托和自定义事件
- 为理解现代前端框架的事件系统打下基础

## 事件基础概念

### 什么是事件
事件是发生在HTML元素上的动作，可以是用户操作（如点击、输入、滚动）或系统行为（如页面加载、网络请求完成）。

```javascript
// 事件的基本组成
// 1. 事件源（Event Target）- 发生事件的元素
// 2. 事件类型（Event Type）- 事件的种类
// 3. 事件处理函数（Event Handler）- 响应事件的代码
// 4. 事件对象（Event Object）- 包含事件信息的对象
```

### 事件类型分类
- **鼠标事件** - click、dblclick、mouseenter、mouseleave等
- **键盘事件** - keydown、keyup、keypress等
- **表单事件** - submit、change、input、focus、blur等
- **文档事件** - DOMContentLoaded、load、unload等
- **触摸事件** - touchstart、touchmove、touchend等
- **自定义事件** - 开发者定义的事件

## 事件绑定方式

### 内联事件（不推荐）
```html
<!-- 直接在HTML中绑定事件 -->
<button onclick="handleClick()">点击我</button>
<input onchange="handleChange(event)" type="text">

<script>
function handleClick() {
    console.log("按钮被点击了");
}

function handleChange(event) {
    console.log("输入值改变:", event.target.value);
}
</script>
```

**缺点：** 代码与HTML混合，难以维护，无法动态绑定

### 传统DOM事件属性
```javascript
const button = document.querySelector("#myButton");

// 绑定事件
button.onclick = function() {
    console.log("按钮被点击了");
};

// 重新绑定会覆盖之前的事件
button.onclick = function() {
    console.log("新的点击事件");
};

// 移除事件
button.onclick = null;
```

**缺点：** 只能绑定一个事件处理函数，容易覆盖

### 现代事件监听器（推荐）
```javascript
const button = document.querySelector("#myButton");

// 添加事件监听器
button.addEventListener("click", function(event) {
    console.log("按钮被点击了");
});

// 可以添加多个事件监听器
button.addEventListener("click", function() {
    console.log("第二个点击事件");
});

// 移除特定的事件监听器
const clickHandler = function() {
    console.log("可移除的点击事件");
};
button.addEventListener("click", clickHandler);
button.removeEventListener("click", clickHandler);
```

**优点：** 支持多个事件处理函数，可以动态添加和移除

## 事件对象详解

### 事件对象属性
```javascript
function handleEvent(event) {
    // 事件类型
    console.log(event.type);           // "click"
    
    // 目标元素
    console.log(event.target);         // 触发事件的元素
    console.log(event.currentTarget);  // 绑定事件的元素
    
    // 鼠标事件
    console.log(event.clientX, event.clientY); // 视口坐标
    console.log(event.pageX, event.pageY);     // 页面坐标
    console.log(event.screenX, event.screenY); // 屏幕坐标
    
    // 键盘事件
    console.log(event.key);            // 按键字符
    console.log(event.code);           // 按键代码
    console.log(event.altKey);         // Alt键是否按下
    console.log(event.ctrlKey);        // Ctrl键是否按下
    console.log(event.shiftKey);       // Shift键是否按下
    
    // 阻止默认行为
    event.preventDefault();
    
    // 阻止事件冒泡
    event.stopPropagation();
    
    // 阻止事件捕获和冒泡
    event.stopImmediatePropagation();
}
```

### 事件对象方法
```javascript
// 阻止默认行为
event.preventDefault();

// 阻止事件冒泡
event.stopPropagation();

// 阻止事件捕获和冒泡
event.stopImmediatePropagation();

// 检查是否调用了preventDefault
console.log(event.defaultPrevented);
```

## 事件传播机制

### 三个阶段
事件传播分为三个阶段：捕获阶段、目标阶段、冒泡阶段

```javascript
// 事件传播顺序
// 1. 捕获阶段：从window到目标元素的父元素
// 2. 目标阶段：目标元素本身
// 3. 冒泡阶段：从目标元素的父元素到window

// 添加事件监听器时指定是否在捕获阶段处理
element.addEventListener("click", handler, true);  // 捕获阶段
element.addEventListener("click", handler, false); // 冒泡阶段（默认）
```

### 事件委托原理
```javascript
// 传统方式：为每个元素绑定事件
const listItems = document.querySelectorAll("li");
listItems.forEach(item => {
    item.addEventListener("click", function() {
        console.log("列表项被点击:", this.textContent);
    });
});

// 事件委托：在父元素上监听
const list = document.querySelector("ul");
list.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        console.log("列表项被点击:", event.target.textContent);
        event.target.classList.toggle("selected");
    }
});

// 动态添加的元素也会自动绑定事件
const newItem = document.createElement("li");
newItem.textContent = "新项目";
list.appendChild(newItem);
```

### 事件委托的优势
1. **性能优化** - 减少事件监听器数量
2. **动态元素** - 自动处理新添加的元素
3. **内存管理** - 避免内存泄漏
4. **代码简化** - 统一的事件处理逻辑

## 常用事件类型

### 鼠标事件
```javascript
const element = document.querySelector(".element");

// 点击事件
element.addEventListener("click", function(event) {
    console.log("单击");
});

// 双击事件
element.addEventListener("dblclick", function(event) {
    console.log("双击");
});

// 鼠标进入
element.addEventListener("mouseenter", function(event) {
    console.log("鼠标进入");
});

// 鼠标离开
element.addEventListener("mouseleave", function(event) {
    console.log("鼠标离开");
});

// 鼠标移动
element.addEventListener("mousemove", function(event) {
    console.log("鼠标移动:", event.clientX, event.clientY);
});

// 鼠标按下
element.addEventListener("mousedown", function(event) {
    console.log("鼠标按下");
});

// 鼠标释放
element.addEventListener("mouseup", function(event) {
    console.log("鼠标释放");
});
```

### 键盘事件
```javascript
const input = document.querySelector("input");

// 按键按下
input.addEventListener("keydown", function(event) {
    console.log("按键按下:", event.key, event.code);
    
    // 阻止默认行为（如方向键滚动页面）
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
    }
});

// 按键释放
input.addEventListener("keyup", function(event) {
    console.log("按键释放:", event.key);
});

// 按键输入（只对可输入字符有效）
input.addEventListener("keypress", function(event) {
    console.log("按键输入:", event.key);
});
```

### 表单事件
```javascript
const form = document.querySelector("form");
const input = document.querySelector("input");

// 表单提交
form.addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止表单提交
    
    const formData = new FormData(form);
    console.log("表单数据:", Object.fromEntries(formData));
});

// 输入值改变
input.addEventListener("input", function(event) {
    console.log("输入值:", event.target.value);
});

// 值改变（失去焦点时）
input.addEventListener("change", function(event) {
    console.log("值改变:", event.target.value);
});

// 获得焦点
input.addEventListener("focus", function(event) {
    console.log("获得焦点");
});

// 失去焦点
input.addEventListener("blur", function(event) {
    console.log("失去焦点");
});
```

### 文档和窗口事件
```javascript
// DOM内容加载完成
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM加载完成");
});

// 页面完全加载
window.addEventListener("load", function() {
    console.log("页面加载完成");
});

// 页面卸载
window.addEventListener("beforeunload", function(event) {
    event.preventDefault();
    event.returnValue = "确定要离开页面吗？";
});

// 窗口大小改变
window.addEventListener("resize", function() {
    console.log("窗口大小改变");
});

// 页面滚动
window.addEventListener("scroll", function() {
    console.log("页面滚动");
});
```

## 自定义事件

### 创建和触发自定义事件
```javascript
// 创建自定义事件
const customEvent = new CustomEvent("myCustomEvent", {
    detail: {
        message: "这是自定义事件",
        timestamp: Date.now()
    },
    bubbles: true,      // 是否冒泡
    cancelable: true    // 是否可取消
});

// 监听自定义事件
document.addEventListener("myCustomEvent", function(event) {
    console.log("自定义事件触发:", event.detail);
});

// 触发自定义事件
document.dispatchEvent(customEvent);

// 在元素上触发
const element = document.querySelector(".element");
element.dispatchEvent(customEvent);
```

### 事件总线模式
```javascript
class EventBus {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    once(event, callback) {
        const onceCallback = (data) => {
            callback(data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback);
    }
}

// 使用事件总线
const eventBus = new EventBus();

eventBus.on("userLogin", function(user) {
    console.log("用户登录:", user);
});

eventBus.once("userLogout", function(user) {
    console.log("用户登出:", user);
});

eventBus.emit("userLogin", { name: "张三", id: 1 });
eventBus.emit("userLogout", { name: "张三", id: 1 });
```

## 事件性能优化

### 防抖和节流
```javascript
// 防抖：延迟执行，重复调用会重置计时器
function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// 节流：限制执行频率
function throttle(func, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用示例
const handleScroll = throttle(function() {
    console.log("滚动事件");
}, 100);

const handleResize = debounce(function() {
    console.log("窗口大小改变");
}, 300);

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
```

### 事件委托优化
```javascript
// 优化前：为每个元素绑定事件
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});

// 优化后：使用事件委托
const container = document.querySelector(".button-container");
container.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        handleClick(event);
    }
});

// 更精确的事件委托
container.addEventListener("click", function(event) {
    const button = event.target.closest("button");
    if (button) {
        handleClick(event);
    }
});
```

### 内存泄漏防范
```javascript
// 及时移除事件监听器
class Component {
    constructor() {
        this.handleClick = this.handleClick.bind(this);
        this.element = document.querySelector(".component");
        this.element.addEventListener("click", this.handleClick);
    }
    
    handleClick(event) {
        console.log("组件被点击");
    }
    
    destroy() {
        // 清理事件监听器
        this.element.removeEventListener("click", this.handleClick);
        this.element = null;
    }
}

// 使用组件
const component = new Component();

// 组件销毁时清理
component.destroy();
```

## 面试重点

### 核心概念
1. **事件传播机制：** 捕获、目标、冒泡三个阶段
2. **事件委托：** 利用事件冒泡在父元素上处理子元素事件
3. **事件对象：** target、currentTarget、preventDefault、stopPropagation等
4. **性能优化：** 防抖、节流、事件委托等技巧

### 常见问题
1. **事件冒泡和捕获：** 理解事件传播顺序和阻止方法
2. **this指向问题：** 事件处理函数中this的指向
3. **内存泄漏：** 及时移除事件监听器
4. **性能优化：** 合理使用事件委托和防抖节流

### 实际应用
1. **用户交互：** 处理各种用户操作事件
2. **表单处理：** 实时验证和数据处理
3. **动态内容：** 处理动态添加元素的事件
4. **性能监控：** 监控用户行为和应用性能

## 实践练习

### 基础练习
1. 使用不同方式绑定事件
2. 理解事件传播机制
3. 实现简单的事件委托
4. 练习自定义事件的创建和触发

### 进阶练习
1. 实现完整的事件总线系统
2. 优化事件处理的性能
3. 构建可复用的事件组件
4. 分析框架源码中的事件系统

## 下一步

掌握事件系统后，建议学习：
- **[ES6+现代特性](./es6.md)** - 模块系统、解构赋值、Promise基础
- **[异步编程模式](./async.md)** - Promise、async/await、异步最佳实践

继续学习，加油！🚀 