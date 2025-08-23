# JavaScript DOM 操作 🌳

DOM（文档对象模型）是JavaScript与HTML文档交互的核心，它允许我们动态地操作网页内容。

## 🎯 DOM 基础概念

### 1. 什么是DOM
DOM（Document Object Model）是一个树形结构，表示HTML文档的层次关系：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>页面标题</title>
  </head>
  <body>
    <div id="container">
      <h1>主标题</h1>
      <p>段落内容</p>
    </div>
  </body>
</html>
```

对应的DOM树结构：
```
document
├── html
    ├── head
    │   └── title
    └── body
        └── div#container
            ├── h1
            └── p
```

### 2. DOM节点类型
```javascript
// 元素节点 (Node.ELEMENT_NODE = 1)
const element = document.createElement('div');

// 文本节点 (Node.TEXT_NODE = 3)
const text = document.createTextNode('Hello World');

// 属性节点 (Node.ATTRIBUTE_NODE = 2)
const attr = document.createAttribute('class');

// 注释节点 (Node.COMMENT_NODE = 8)
const comment = document.createComment('这是一个注释');
```

## 🔍 元素选择

### 1. 基本选择方法
```javascript
// 通过ID选择（返回单个元素）
const element = document.getElementById('myId');

// 通过类名选择（返回HTMLCollection）
const elements = document.getElementsByClassName('myClass');

// 通过标签名选择（返回HTMLCollection）
const paragraphs = document.getElementsByTagName('p');

// 通过name属性选择（返回NodeList）
const inputs = document.getElementsByName('username');
```

### 2. 现代选择方法 (querySelector)
```javascript
// 选择第一个匹配的元素
const firstElement = document.querySelector('.myClass');
const firstDiv = document.querySelector('div');
const firstId = document.querySelector('#myId');

// 选择所有匹配的元素（返回NodeList）
const allElements = document.querySelectorAll('.myClass');
const allDivs = document.querySelectorAll('div');

// 复杂选择器
const complex = document.querySelector('div.container > p:first-child');
const attribute = document.querySelector('input[type="text"]');
const pseudo = document.querySelector('p:nth-child(2)');
```

### 3. 相对选择
```javascript
const container = document.getElementById('container');

// 从特定元素开始选择
const child = container.querySelector('.child');
const children = container.querySelectorAll('.child');

// 父元素
const parent = container.parentElement;
const parentNode = container.parentNode;

// 子元素
const firstChild = container.firstElementChild;
const lastChild = container.lastElementChild;
const children = container.children;

// 兄弟元素
const nextSibling = container.nextElementSibling;
const previousSibling = container.previousElementSibling;
```

## 🔧 元素操作

### 1. 创建和添加元素
```javascript
// 创建新元素
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');
const newText = document.createTextNode('这是新文本');

// 设置属性
newDiv.id = 'newDiv';
newDiv.className = 'new-class';
newDiv.setAttribute('data-id', '123');

// 设置内容
newDiv.textContent = '纯文本内容';
newDiv.innerHTML = '<span>HTML内容</span>';

// 添加到DOM
document.body.appendChild(newDiv);
container.insertBefore(newParagraph, container.firstChild);
container.replaceChild(newDiv, oldElement);
```

### 2. 修改元素内容
```javascript
const element = document.getElementById('content');

// 文本内容
element.textContent = '新的文本内容';
element.innerText = '新的文本内容';

// HTML内容
element.innerHTML = '<strong>加粗文本</strong>';

// 属性操作
element.setAttribute('class', 'new-class');
element.removeAttribute('old-attribute');
element.getAttribute('data-id');

// 类操作
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active');
element.classList.contains('active');
```

### 3. 删除元素
```javascript
const element = document.getElementById('toRemove');

// 从父元素中删除
element.remove(); // 现代方法

// 传统方法
element.parentNode.removeChild(element);

// 清空内容但保留元素
element.innerHTML = '';
element.textContent = '';
```

## 🎨 样式操作

### 1. 内联样式
```javascript
const element = document.getElementById('styled');

// 设置样式
element.style.backgroundColor = 'red';
element.style.fontSize = '16px';
element.style.marginTop = '20px';

// 获取样式
const bgColor = element.style.backgroundColor;
const fontSize = element.style.fontSize;

// 批量设置样式
Object.assign(element.style, {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    borderRadius: '5px'
});
```

### 2. 类样式
```javascript
const element = document.getElementById('styled');

// 添加/删除类
element.classList.add('active', 'highlighted');
element.classList.remove('inactive');
element.classList.toggle('visible');

// 检查类
if (element.classList.contains('active')) {
    console.log('元素处于激活状态');
}

// 替换类
element.classList.replace('old-class', 'new-class');
```

### 3. 计算样式
```javascript
const element = document.getElementById('styled');

// 获取计算后的样式
const computedStyle = window.getComputedStyle(element);
const bgColor = computedStyle.backgroundColor;
const fontSize = computedStyle.fontSize;
const margin = computedStyle.margin;

// 获取特定样式
const width = computedStyle.getPropertyValue('width');
const height = computedStyle.getPropertyValue('height');
```

## 📏 尺寸和位置

### 1. 元素尺寸
```javascript
const element = document.getElementById('sized');

// 内容尺寸
const contentWidth = element.clientWidth;
const contentHeight = element.clientHeight;

// 包含边框和滚动条的尺寸
const fullWidth = element.offsetWidth;
const fullHeight = element.offsetHeight;

// 滚动内容尺寸
const scrollWidth = element.scrollWidth;
const scrollHeight = element.scrollHeight;

// 滚动位置
const scrollLeft = element.scrollLeft;
const scrollTop = element.scrollTop;
```

### 2. 元素位置
```javascript
const element = document.getElementById('positioned');

// 相对于视口的位置
const rect = element.getBoundingClientRect();
console.log(rect.left, rect.top, rect.right, rect.bottom);

// 相对于文档的位置
const offsetLeft = element.offsetLeft;
const offsetTop = element.offsetTop;

// 滚动到元素位置
element.scrollIntoView({ behavior: 'smooth' });
element.scrollIntoView({ block: 'center', inline: 'nearest' });
```

## 🎭 事件处理

### 1. 事件监听器
```javascript
const button = document.getElementById('myButton');

// 添加事件监听器
button.addEventListener('click', function(event) {
    console.log('按钮被点击了！');
    console.log('事件对象:', event);
});

// 移除事件监听器
const clickHandler = function(event) {
    console.log('点击处理');
};
button.addEventListener('click', clickHandler);
button.removeEventListener('click', clickHandler);

// 一次性事件
button.addEventListener('click', function() {
    console.log('只执行一次');
}, { once: true });
```

### 2. 常用事件类型
```javascript
const element = document.getElementById('myElement');

// 鼠标事件
element.addEventListener('click', handleClick);
element.addEventListener('dblclick', handleDoubleClick);
element.addEventListener('mouseenter', handleMouseEnter);
element.addEventListener('mouseleave', handleMouseLeave);
element.addEventListener('mousemove', handleMouseMove);

// 键盘事件
element.addEventListener('keydown', handleKeyDown);
element.addEventListener('keyup', handleKeyUp);
element.addEventListener('keypress', handleKeyPress);

// 表单事件
element.addEventListener('submit', handleSubmit);
element.addEventListener('change', handleChange);
element.addEventListener('input', handleInput);
element.addEventListener('focus', handleFocus);
element.addEventListener('blur', handleBlur);

// 文档事件
document.addEventListener('DOMContentLoaded', handleDOMReady);
window.addEventListener('load', handleLoad);
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', handleScroll);
```

### 3. 事件对象
```javascript
function handleEvent(event) {
    // 阻止默认行为
    event.preventDefault();
    
    // 阻止事件冒泡
    event.stopPropagation();
    
    // 事件目标
    const target = event.target;
    const currentTarget = event.currentTarget;
    
    // 鼠标位置
    const clientX = event.clientX;
    const clientY = event.clientY;
    const pageX = event.pageX;
    const pageY = event.pageY;
    
    // 键盘信息
    const key = event.key;
    const keyCode = event.keyCode;
    const ctrlKey = event.ctrlKey;
    const shiftKey = event.shiftKey;
}
```

## 🔄 动态内容

### 1. 模板字符串
```javascript
function createUserCard(user) {
    const template = `
        <div class="user-card" data-user-id="${user.id}">
            <img src="${user.avatar}" alt="${user.name}" class="avatar">
            <h3 class="name">${user.name}</h3>
            <p class="email">${user.email}</p>
            <button class="edit-btn" onclick="editUser(${user.id})">
                编辑
            </button>
        </div>
    `;
    
    return template;
}

// 使用模板
const user = { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: 'avatar.jpg' };
const userCard = createUserCard(user);
container.innerHTML += userCard;
```

### 2. 数据绑定
```javascript
class DataBinder {
    constructor(element, data) {
        this.element = element;
        this.data = data;
        this.bind();
    }
    
    bind() {
        // 绑定数据到元素
        this.updateDisplay();
        
        // 监听数据变化
        this.observeData();
    }
    
    updateDisplay() {
        const template = `
            <h2>${this.data.title}</h2>
            <p>${this.data.description}</p>
            <span class="count">${this.data.count}</span>
        `;
        this.element.innerHTML = template;
    }
    
    observeData() {
        // 简单的数据观察
        Object.keys(this.data).forEach(key => {
            Object.defineProperty(this.data, key, {
                set: (value) => {
                    this.data[key] = value;
                    this.updateDisplay();
                }
            });
        });
    }
}

// 使用数据绑定
const data = { title: '标题', description: '描述', count: 0 };
const binder = new DataBinder(document.getElementById('content'), data);

// 更新数据会自动更新显示
data.count = 5;
```

## 💡 性能优化

### 1. 批量DOM操作
```javascript
// 不好的做法 - 多次重排
const container = document.getElementById('container');
for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    container.appendChild(div); // 每次都会触发重排
}

// 好的做法 - 使用文档片段
const container = document.getElementById('container');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

container.appendChild(fragment); // 只触发一次重排
```

### 2. 事件委托
```javascript
// 不好的做法 - 为每个元素添加事件
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

### 3. 防抖和节流
```javascript
// 防抖函数
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

// 节流函数
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

// 使用防抖处理窗口调整
const handleResize = debounce(function() {
    console.log('窗口大小改变');
}, 250);

window.addEventListener('resize', handleResize);
```

## 🎯 总结

DOM操作是前端开发的核心技能，掌握好这些技术对于构建交互式网页至关重要：

1. **基础概念** - DOM树结构、节点类型
2. **元素选择** - 各种选择方法和相对选择
3. **元素操作** - 创建、修改、删除元素
4. **样式操作** - 内联样式、类样式、计算样式
5. **尺寸位置** - 元素尺寸、位置、滚动
6. **事件处理** - 事件监听、事件类型、事件对象
7. **动态内容** - 模板字符串、数据绑定
8. **性能优化** - 批量操作、事件委托、防抖节流

通过熟练运用这些DOM操作技术，你将能够创建丰富、动态的网页应用！ 