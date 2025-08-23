# JavaScript 事件处理

事件处理是JavaScript中响应用户交互和系统事件的核心机制，它允许我们创建动态和交互式的网页应用。

## 事件基础概念

### 1. 什么是事件
事件是发生在HTML元素上的动作，可以是用户操作（如点击、输入、滚动）或系统行为（如页面加载、网络请求完成）。

```javascript
// 事件的基本组成
// 1. 事件源（Event Target）- 发生事件的元素
// 2. 事件类型（Event Type）- 事件的种类
// 3. 事件处理函数（Event Handler）- 响应事件的代码
// 4. 事件对象（Event Object）- 包含事件信息的对象
```

### 2. 事件类型分类
- **鼠标事件** - click、dblclick、mouseenter、mouseleave等
- **键盘事件** - keydown、keyup、keypress等
- **表单事件** - submit、change、input、focus、blur等
- **文档事件** - DOMContentLoaded、load、unload等
- **触摸事件** - touchstart、touchmove、touchend等
- **自定义事件** - 开发者定义的事件

## 事件绑定方式

### 1. 内联事件（不推荐）
```html
<!-- 直接在HTML中绑定事件 -->
<button onclick="handleClick()">点击我</button>
<input onchange="handleChange(event)" type="text">
<div onmouseenter="handleMouseEnter()">鼠标进入</div>

<script>
function handleClick() {
    console.log("按钮被点击了");
}

function handleChange(event) {
    console.log("输入值改变:", event.target.value);
}

function handleMouseEnter() {
    console.log("鼠标进入元素");
}
</script>
```

### 2. 传统DOM事件属性
```javascript
const button = document.getElementById("myButton");
const input = document.getElementById("myInput");

// 绑定事件
button.onclick = function() {
    console.log("按钮被点击了");
};

input.onchange = function(event) {
    console.log("输入值改变:", event.target.value);
};

// 重新绑定会覆盖之前的事件
button.onclick = function() {
    console.log("新的点击事件");
};

// 移除事件
button.onclick = null;
```

### 3. 现代事件监听器（推荐）
```javascript
const button = document.getElementById("myButton");
const input = document.getElementById("myInput");

// 添加事件监听器
button.addEventListener("click", function(event) {
    console.log("按钮被点击了");
    console.log("事件对象:", event);
});

input.addEventListener("change", function(event) {
    console.log("输入值改变:", event.target.value);
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

// 稍后移除
button.removeEventListener("click", clickHandler);
```

## 事件对象

### 1. 事件对象属性
```javascript
function handleEvent(event) {
    // 事件类型
    console.log("事件类型:", event.type);
    
    // 事件目标
    console.log("事件目标:", event.target);
    console.log("当前目标:", event.currentTarget);
    
    // 鼠标位置
    console.log("鼠标X坐标:", event.clientX);
    console.log("鼠标Y坐标:", event.clientY);
    console.log("页面X坐标:", event.pageX);
    console.log("页面Y坐标:", event.pageY);
    
    // 键盘信息
    if (event.key) {
        console.log("按键:", event.key);
        console.log("按键代码:", event.keyCode);
        console.log("Ctrl键:", event.ctrlKey);
        console.log("Shift键:", event.shiftKey);
        console.log("Alt键:", event.altKey);
    }
    
    // 阻止默认行为
    event.preventDefault();
    
    // 阻止事件冒泡
    event.stopPropagation();
}
```

### 2. 事件目标
```javascript
const container = document.getElementById("container");
const button = document.getElementById("button");

container.addEventListener("click", function(event) {
    console.log("容器被点击");
    console.log("实际点击的元素:", event.target);
    console.log("事件绑定的元素:", event.currentTarget);
    
    // 检查点击的是否是按钮
    if (event.target === button) {
        console.log("按钮被点击了");
    }
});
```

## 事件传播机制

### 1. 事件三个阶段
```javascript
// 事件传播的三个阶段
// 1. 捕获阶段（Capture Phase）- 从根元素向下传播到目标元素
// 2. 目标阶段（Target Phase）- 到达目标元素
// 3. 冒泡阶段（Bubble Phase）- 从目标元素向上传播到根元素

const outer = document.getElementById("outer");
const middle = document.getElementById("middle");
const inner = document.getElementById("inner");

// 捕获阶段监听
outer.addEventListener("click", function() {
    console.log("外层捕获");
}, true);

middle.addEventListener("click", function() {
    console.log("中层捕获");
}, true);

inner.addEventListener("click", function() {
    console.log("内层捕获");
}, true);

// 冒泡阶段监听（默认）
outer.addEventListener("click", function() {
    console.log("外层冒泡");
});

middle.addEventListener("click", function() {
    console.log("中层冒泡");
});

inner.addEventListener("click", function() {
    console.log("内层冒泡");
});

// 点击内层元素时的输出顺序：
// 外层捕获 -> 中层捕获 -> 内层捕获 -> 内层冒泡 -> 中层冒泡 -> 外层冒泡
```

### 2. 阻止事件传播
```javascript
const button = document.getElementById("button");
const container = document.getElementById("container");

button.addEventListener("click", function(event) {
    console.log("按钮被点击");
    event.stopPropagation(); // 阻止事件冒泡
});

container.addEventListener("click", function() {
    console.log("容器被点击"); // 不会执行
});
```

## 常用事件类型

### 1. 鼠标事件
```javascript
const element = document.getElementById("myElement");

// 点击事件
element.addEventListener("click", function(event) {
    console.log("单击事件");
});

// 双击事件
element.addEventListener("dblclick", function(event) {
    console.log("双击事件");
});

// 鼠标按下
element.addEventListener("mousedown", function(event) {
    console.log("鼠标按下");
    console.log("按下的按钮:", event.button); // 0:左键, 1:中键, 2:右键
});

// 鼠标释放
element.addEventListener("mouseup", function(event) {
    console.log("鼠标释放");
});

// 鼠标进入
element.addEventListener("mouseenter", function(event) {
    console.log("鼠标进入元素");
});

// 鼠标离开
element.addEventListener("mouseleave", function(event) {
    console.log("鼠标离开元素");
});

// 鼠标移动
element.addEventListener("mousemove", function(event) {
    console.log("鼠标移动:", event.clientX, event.clientY);
});

// 鼠标悬停
element.addEventListener("mouseover", function(event) {
    console.log("鼠标悬停");
});

// 鼠标移出
element.addEventListener("mouseout", function(event) {
    console.log("鼠标移出");
});
```

### 2. 键盘事件
```javascript
const input = document.getElementById("myInput");

// 按键按下
input.addEventListener("keydown", function(event) {
    console.log("按键按下:", event.key);
    console.log("按键代码:", event.keyCode);
    
    // 检查组合键
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // 阻止保存对话框
        console.log("Ctrl+S 被按下");
    }
});

// 按键释放
input.addEventListener("keyup", function(event) {
    console.log("按键释放:", event.key);
});

// 按键输入（只对产生字符的按键有效）
input.addEventListener("keypress", function(event) {
    console.log("按键输入:", event.key);
});
```

### 3. 表单事件
```javascript
const form = document.getElementById("myForm");
const input = document.getElementById("myInput");
const select = document.getElementById("mySelect");

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
    console.log("输入框获得焦点");
    event.target.style.borderColor = "blue";
});

// 失去焦点
input.addEventListener("blur", function(event) {
    console.log("输入框失去焦点");
    event.target.style.borderColor = "";
});

// 选择框改变
select.addEventListener("change", function(event) {
    console.log("选择的值:", event.target.value);
});
```

### 4. 文档和窗口事件
```javascript
// DOM内容加载完成
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM加载完成");
});

// 页面完全加载
window.addEventListener("load", function() {
    console.log("页面完全加载");
});

// 页面卸载
window.addEventListener("beforeunload", function(event) {
    event.preventDefault();
    event.returnValue = "确定要离开页面吗？";
});

// 窗口大小改变
window.addEventListener("resize", function() {
    console.log("窗口大小改变:", window.innerWidth, window.innerHeight);
});

// 页面滚动
window.addEventListener("scroll", function() {
    console.log("页面滚动位置:", window.pageYOffset);
});

// 页面可见性改变
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        console.log("页面隐藏");
    } else {
        console.log("页面显示");
    }
});
```

## 事件委托

### 1. 事件委托原理
事件委托利用事件冒泡机制，将事件监听器添加到父元素上，统一处理子元素的事件。

```javascript
// 传统方式 - 为每个列表项添加事件
const listItems = document.querySelectorAll("#todoList li");
listItems.forEach(item => {
    item.addEventListener("click", function() {
        console.log("列表项被点击:", this.textContent);
    });
});

// 事件委托 - 在父元素上监听
const todoList = document.getElementById("todoList");
todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        console.log("列表项被点击:", event.target.textContent);
    }
});
```

### 2. 事件委托的优势
```javascript
// 1. 减少内存使用
// 2. 动态元素自动支持
// 3. 代码更简洁

// 动态添加列表项
function addTodoItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    todoList.appendChild(li);
    // 不需要为新元素单独添加事件监听器
}

// 事件委托自动处理新元素
todoList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        // 即使是动态添加的元素也能响应事件
        event.target.classList.toggle("completed");
    }
    
    // 处理删除按钮
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentNode.remove();
    }
});
```

## 自定义事件

### 1. 创建和触发自定义事件
```javascript
// 创建自定义事件
const customEvent = new CustomEvent("userLogin", {
    detail: {
        username: "张三",
        timestamp: new Date()
    },
    bubbles: true,
    cancelable: true
});

// 监听自定义事件
document.addEventListener("userLogin", function(event) {
    console.log("用户登录:", event.detail);
});

// 触发自定义事件
document.dispatchEvent(customEvent);

// 在元素上触发
const button = document.getElementById("myButton");
button.dispatchEvent(customEvent);
```

### 2. 事件总线模式
```javascript
class EventBus {
    constructor() {
        this.events = {};
    }
    
    // 订阅事件
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    
    // 发布事件
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
    
    // 取消订阅
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }
}

// 使用事件总线
const eventBus = new EventBus();

// 订阅事件
eventBus.on("userLogin", function(userData) {
    console.log("用户登录:", userData);
});

eventBus.on("userLogout", function(userData) {
    console.log("用户登出:", userData);
});

// 发布事件
eventBus.emit("userLogin", { username: "张三", time: new Date() });
eventBus.emit("userLogout", { username: "张三", time: new Date() });
```

## 性能优化

### 1. 事件节流和防抖
```javascript
// 节流函数 - 限制函数执行频率
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 防抖函数 - 延迟执行，等待操作完成
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

// 使用示例
const throttledScroll = throttle(function() {
    console.log("滚动事件（节流）");
}, 100);

const debouncedResize = debounce(function() {
    console.log("窗口调整（防抖）");
}, 250);

window.addEventListener("scroll", throttledScroll);
window.addEventListener("resize", debouncedResize);
```

### 2. 事件委托优化
```javascript
// 使用事件委托减少事件监听器数量
const table = document.getElementById("dataTable");

table.addEventListener("click", function(event) {
    const target = event.target;
    
    // 处理编辑按钮
    if (target.classList.contains("edit-btn")) {
        const row = target.closest("tr");
        const rowId = row.dataset.id;
        editRow(rowId);
    }
    
    // 处理删除按钮
    if (target.classList.contains("delete-btn")) {
        const row = target.closest("tr");
        const rowId = row.dataset.id;
        deleteRow(rowId);
    }
    
    // 处理行选择
    if (target.tagName === "TD") {
        const row = target.closest("tr");
        selectRow(row);
    }
});
```

## 实际应用示例

### 1. 拖拽功能实现
```javascript
class Draggable {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.startLeft = 0;
        this.startTop = 0;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener("mousedown", this.handleMouseDown.bind(this));
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
    
    handleMouseDown(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        
        const rect = this.element.getBoundingClientRect();
        this.startLeft = rect.left;
        this.startTop = rect.top;
        
        this.element.style.cursor = "grabbing";
        event.preventDefault();
    }
    
    handleMouseMove(event) {
        if (!this.isDragging) return;
        
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;
        
        this.element.style.left = (this.startLeft + deltaX) + "px";
        this.element.style.top = (this.startTop + deltaY) + "px";
    }
    
    handleMouseUp() {
        this.isDragging = false;
        this.element.style.cursor = "grab";
    }
}

// 使用拖拽功能
const draggableElement = document.getElementById("draggable");
new Draggable(draggableElement);
```

### 2. 无限滚动
```javascript
class InfiniteScroll {
    constructor(container, loadMoreCallback) {
        this.container = container;
        this.loadMoreCallback = loadMoreCallback;
        this.isLoading = false;
        this.page = 1;
        
        this.init();
    }
    
    init() {
        // 使用节流优化滚动事件
        const throttledScroll = throttle(this.handleScroll.bind(this), 100);
        window.addEventListener("scroll", throttledScroll);
    }
    
    handleScroll() {
        if (this.isLoading) return;
        
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 当滚动到距离底部100px时加载更多
        if (scrollTop + windowHeight >= documentHeight - 100) {
            this.loadMore();
        }
    }
    
    async loadMore() {
        this.isLoading = true;
        this.showLoading();
        
        try {
            await this.loadMoreCallback(this.page);
            this.page++;
        } catch (error) {
            console.error("加载失败:", error);
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    showLoading() {
        const loading = document.createElement("div");
        loading.className = "loading";
        loading.textContent = "加载中...";
        this.container.appendChild(loading);
    }
    
    hideLoading() {
        const loading = this.container.querySelector(".loading");
        if (loading) {
            loading.remove();
        }
    }
}

// 使用无限滚动
const container = document.getElementById("content");
const infiniteScroll = new InfiniteScroll(container, async (page) => {
    const response = await fetch(`/api/items?page=${page}`);
    const items = await response.json();
    
    items.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item.title;
        container.appendChild(div);
    });
});
```

## 总结

事件处理是JavaScript前端开发的核心技能，掌握好事件处理对于创建交互式网页应用至关重要：

1. **基础概念** - 事件类型、事件对象、事件传播
2. **绑定方式** - 内联事件、DOM属性、事件监听器
3. **事件类型** - 鼠标、键盘、表单事件
4. **事件委托** - 原理、优势、实现方式
5. **自定义事件** - 创建、触发、事件总线
6. **性能优化** - 节流、防抖、事件委托优化
7. **实际应用** - 拖拽功能、无限滚动

## 延伸阅读

- **[MDN - 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events)** - 事件处理完整指南
- **[MDN - 事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)** - Event API 详解
- **[JavaScript.info - 事件](https://javascript.info/events)** - 现代事件处理教程 