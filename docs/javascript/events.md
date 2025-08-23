# JavaScript 事件处理 🎭

事件处理是JavaScript中最重要的概念之一，它允许网页响应用户的交互操作。

## 🎯 事件基础概念

### 1. 什么是事件
事件是发生在HTML元素上的"事情"，比如：
- 用户点击按钮
- 鼠标移动到元素上
- 键盘按键被按下
- 页面加载完成
- 表单提交

### 2. 事件流
事件在DOM中的传播遵循三个阶段：

```javascript
// 事件捕获阶段 (Capturing Phase)
// 从document到目标元素
document → html → body → div → button

// 目标阶段 (Target Phase)
// 到达目标元素
button

// 事件冒泡阶段 (Bubbling Phase)
// 从目标元素回到document
button → div → body → html → document
```

## 🔧 事件监听器

### 1. 基本语法
```javascript
// 添加事件监听器
element.addEventListener(eventType, handler, options);

// 移除事件监听器
element.removeEventListener(eventType, handler);

// 示例
const button = document.getElementById('myButton');

function handleClick(event) {
    console.log('按钮被点击了！');
    console.log('事件对象:', event);
}

button.addEventListener('click', handleClick);

// 移除事件
button.removeEventListener('click', handleClick);
```

### 2. 事件监听器选项
```javascript
const button = document.getElementById('myButton');

// 基本选项
button.addEventListener('click', handleClick, {
    capture: false,        // 是否在捕获阶段触发
    once: true,           // 是否只触发一次
    passive: false,       // 是否阻止默认行为
    signal: abortSignal   // 用于取消监听器
});

// 简写形式
button.addEventListener('click', handleClick, false);  // 冒泡阶段
button.addEventListener('click', handleClick, true);   // 捕获阶段
```

### 3. 内联事件处理
```html
<!-- HTML中的内联事件 -->
<button onclick="handleClick()">点击我</button>
<button onmouseover="handleMouseOver()">鼠标悬停</button>

<script>
function handleClick() {
    console.log('按钮被点击');
}

function handleMouseOver() {
    console.log('鼠标悬停');
}
</script>
```

## 🖱️ 鼠标事件

### 1. 基本鼠标事件
```javascript
const element = document.getElementById('myElement');

// 点击事件
element.addEventListener('click', function(event) {
    console.log('单击事件');
});

element.addEventListener('dblclick', function(event) {
    console.log('双击事件');
});

// 鼠标按下和释放
element.addEventListener('mousedown', function(event) {
    console.log('鼠标按下');
});

element.addEventListener('mouseup', function(event) {
    console.log('鼠标释放');
});

// 鼠标进入和离开
element.addEventListener('mouseenter', function(event) {
    console.log('鼠标进入元素');
});

element.addEventListener('mouseleave', function(event) {
    console.log('鼠标离开元素');
});

// 鼠标悬停
element.addEventListener('mouseover', function(event) {
    console.log('鼠标悬停在元素上');
});

// 鼠标移动
element.addEventListener('mousemove', function(event) {
    console.log('鼠标在元素内移动');
});
```

### 2. 鼠标事件对象
```javascript
function handleMouseEvent(event) {
    // 鼠标位置
    const clientX = event.clientX;  // 相对于视口的X坐标
    const clientY = event.clientY;  // 相对于视口的Y坐标
    const pageX = event.pageX;      // 相对于文档的X坐标
    const pageY = event.pageY;      // 相对于文档的Y坐标
    const screenX = event.screenX;  // 相对于屏幕的X坐标
    const screenY = event.screenY;  // 相对于屏幕的Y坐标
    
    // 鼠标按钮
    const button = event.button;    // 0=左键, 1=中键, 2=右键
    
    // 修饰键
    const ctrlKey = event.ctrlKey;  // Ctrl键是否按下
    const shiftKey = event.shiftKey; // Shift键是否按下
    const altKey = event.altKey;    // Alt键是否按下
    const metaKey = event.metaKey;  // Meta键是否按下
    
    console.log(`鼠标位置: (${clientX}, ${clientY})`);
    console.log(`鼠标按钮: ${button}`);
    console.log(`修饰键: Ctrl=${ctrlKey}, Shift=${shiftKey}`);
}
```

## ⌨️ 键盘事件

### 1. 基本键盘事件
```javascript
const input = document.getElementById('myInput');

// 按键按下
input.addEventListener('keydown', function(event) {
    console.log('按键按下:', event.key);
});

// 按键释放
input.addEventListener('keyup', function(event) {
    console.log('按键释放:', event.key);
});

// 按键按下（字符键）
input.addEventListener('keypress', function(event) {
    console.log('字符按键:', event.key);
});

// 输入事件
input.addEventListener('input', function(event) {
    console.log('输入内容:', event.target.value);
});

// 内容变化
input.addEventListener('change', function(event) {
    console.log('内容变化:', event.target.value);
});
```

### 2. 键盘事件对象
```javascript
function handleKeyboardEvent(event) {
    // 按键信息
    const key = event.key;           // 按键字符
    const keyCode = event.keyCode;   // 按键代码（已废弃）
    const code = event.code;         // 按键代码（推荐）
    
    // 修饰键状态
    const ctrlKey = event.ctrlKey;
    const shiftKey = event.shiftKey;
    const altKey = event.altKey;
    const metaKey = event.metaKey;
    
    // 重复状态
    const repeat = event.repeat;
    
    console.log(`按键: ${key}, 代码: ${code}`);
    console.log(`重复: ${repeat}`);
    
    // 阻止默认行为
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // 阻止保存快捷键
        console.log('保存操作被阻止');
    }
}
```

## 📝 表单事件

### 1. 表单相关事件
```javascript
const form = document.getElementById('myForm');
const input = document.getElementById('myInput');

// 表单提交
form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单提交
    
    const formData = new FormData(form);
    console.log('表单数据:', Object.fromEntries(formData));
    
    // 验证表单
    if (validateForm()) {
        submitForm();
    }
});

// 输入事件
input.addEventListener('input', function(event) {
    const value = event.target.value;
    console.log('输入内容:', value);
    
    // 实时验证
    validateInput(value);
});

// 焦点事件
input.addEventListener('focus', function(event) {
    console.log('输入框获得焦点');
    event.target.classList.add('focused');
});

input.addEventListener('blur', function(event) {
    console.log('输入框失去焦点');
    event.target.classList.remove('focused');
    
    // 失焦验证
    validateOnBlur(event.target.value);
});

// 内容变化
input.addEventListener('change', function(event) {
    console.log('内容最终变化:', event.target.value);
});
```

### 2. 表单验证示例
```javascript
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('请输入有效的邮箱地址');
        return false;
    }
    
    // 密码验证
    if (password.length < 6) {
        showError('密码长度至少6位');
        return false;
    }
    
    return true;
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
```

## 📄 文档和窗口事件

### 1. 页面生命周期事件
```javascript
// DOM内容加载完成
document.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM加载完成');
    // 可以安全地操作DOM元素
});

// 页面完全加载
window.addEventListener('load', function(event) {
    console.log('页面完全加载');
    // 包括图片、样式表等资源
});

// 页面即将卸载
window.addEventListener('beforeunload', function(event) {
    const message = '确定要离开页面吗？';
    event.returnValue = message;
    return message;
});

// 页面卸载
window.addEventListener('unload', function(event) {
    console.log('页面卸载');
    // 清理工作
});
```

### 2. 窗口和滚动事件
```javascript
// 窗口大小改变
window.addEventListener('resize', function(event) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`窗口大小: ${width}x${height}`);
});

// 页面滚动
window.addEventListener('scroll', function(event) {
    const scrollTop = window.pageYOffset;
    const scrollLeft = window.pageXOffset;
    console.log(`滚动位置: (${scrollLeft}, ${scrollTop})`);
});

// 元素滚动
const scrollableElement = document.getElementById('scrollable');
scrollableElement.addEventListener('scroll', function(event) {
    const scrollTop = event.target.scrollTop;
    console.log('元素滚动位置:', scrollTop);
});
```

## 🎭 自定义事件

### 1. 创建和触发自定义事件
```javascript
// 创建自定义事件
const customEvent = new CustomEvent('myCustomEvent', {
    detail: {
        message: '这是一个自定义事件',
        timestamp: Date.now()
    },
    bubbles: true,
    cancelable: true
});

// 监听自定义事件
document.addEventListener('myCustomEvent', function(event) {
    console.log('自定义事件被触发:', event.detail);
});

// 触发自定义事件
document.dispatchEvent(customEvent);

// 在元素上触发
const button = document.getElementById('myButton');
button.dispatchEvent(customEvent);
```

### 2. 事件总线模式
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
        if (!this.events[event]) return;
        
        const index = this.events[event].indexOf(callback);
        if (index > -1) {
            this.events[event].splice(index, 1);
        }
    }
    
    emit(event, data) {
        if (!this.events[event]) return;
        
        this.events[event].forEach(callback => {
            callback(data);
        });
    }
}

// 使用事件总线
const eventBus = new EventBus();

eventBus.on('userLogin', function(userData) {
    console.log('用户登录:', userData);
});

eventBus.on('userLogout', function() {
    console.log('用户登出');
});

// 触发事件
eventBus.emit('userLogin', { name: '张三', id: 123 });
eventBus.emit('userLogout');
```

## 🔄 事件委托

### 1. 基本概念
事件委托是一种技术，利用事件冒泡将事件监听器添加到父元素，而不是每个子元素。

```javascript
// 不好的做法 - 为每个按钮添加事件
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

// 好的做法 - 事件委托
document.addEventListener('click', function(event) {
    if (event.target.matches('.btn')) {
        handleClick(event);
    }
});

function handleClick(event) {
    const button = event.target;
    console.log('按钮被点击:', button.textContent);
}
```

### 2. 动态元素处理
```javascript
// 事件委托处理动态添加的元素
document.addEventListener('click', function(event) {
    // 处理按钮点击
    if (event.target.matches('.btn')) {
        handleButtonClick(event);
    }
    
    // 处理删除按钮
    if (event.target.matches('.delete-btn')) {
        handleDeleteClick(event);
    }
    
    // 处理编辑按钮
    if (event.target.matches('.edit-btn')) {
        handleEditClick(event);
    }
});

function handleButtonClick(event) {
    const button = event.target;
    console.log('按钮点击:', button.dataset.action);
}

function handleDeleteClick(event) {
    const button = event.target;
    const itemId = button.dataset.id;
    deleteItem(itemId);
}

function handleEditClick(event) {
    const button = event.target;
    const itemId = button.dataset.id;
    editItem(itemId);
}
```

## 💡 性能优化

### 1. 防抖和节流
```javascript
// 防抖函数 - 延迟执行，适合搜索输入
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数 - 限制执行频率，适合滚动事件
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用示例
const searchInput = document.getElementById('search');
const handleSearch = debounce(function(query) {
    console.log('搜索:', query);
    performSearch(query);
}, 300);

searchInput.addEventListener('input', function(event) {
    handleSearch(event.target.value);
});

// 滚动事件节流
const handleScroll = throttle(function() {
    console.log('页面滚动');
    updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

### 2. 事件清理
```javascript
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    addListener(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        
        if (!this.listeners.has(element)) {
            this.listeners.set(element, []);
        }
        
        this.listeners.get(element).push({
            event,
            handler,
            options
        });
    }
    
    removeAllListeners(element) {
        if (this.listeners.has(element)) {
            const listeners = this.listeners.get(element);
            listeners.forEach(({ event, handler, options }) => {
                element.removeEventListener(event, handler, options);
            });
            this.listeners.delete(element);
        }
    }
    
    cleanup() {
        this.listeners.forEach((listeners, element) => {
            this.removeAllListeners(element);
        });
    }
}

// 使用事件管理器
const eventManager = new EventManager();

eventManager.addListener(button, 'click', handleClick);
eventManager.addListener(input, 'input', handleInput);

// 清理特定元素的事件
eventManager.removeAllListeners(button);

// 清理所有事件
eventManager.cleanup();
```

## 🎯 总结

事件处理是JavaScript交互性的核心，掌握好这些技术对于构建响应式网页至关重要：

1. **基础概念** - 事件流、事件监听器
2. **鼠标事件** - 点击、悬停、移动等
3. **键盘事件** - 按键、输入、变化等
4. **表单事件** - 提交、验证、焦点等
5. **文档事件** - 加载、滚动、调整大小等
6. **自定义事件** - 创建、触发、事件总线
7. **事件委托** - 动态元素处理、性能优化
8. **性能优化** - 防抖节流、事件清理

## 📖 延伸阅读

- **[MDN - 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events)** - 事件类型和处理详解
- **[MDN - 事件监听器](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)** - addEventListener 方法详解
- **[MDN - 事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)** - Event 接口参考
- **[MDN - 自定义事件](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)** - CustomEvent 创建和触发

通过熟练运用这些事件处理技术，你将能够创建流畅、响应式的用户界面！ 