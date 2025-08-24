# JavaScript DOM操作与事件

## 概述
DOM（文档对象模型）是JavaScript操作网页元素的核心API，它允许我们动态地修改网页内容、样式和结构。掌握DOM操作是构建交互式Web应用的基础。

## 学习目标
- 理解DOM树结构和节点类型
- 掌握元素选择和操作方法
- 学会事件绑定和处理
- 为理解现代前端框架打下基础

## DOM基础概念

### 什么是DOM
DOM是HTML文档的编程接口，它将HTML文档表示为树形结构，每个HTML元素都是树中的一个节点。

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM示例</title>
</head>
<body>
    <div id="container">
        <h1>标题</h1>
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

### DOM节点类型
- **元素节点** - HTML标签（如div、p、h1）
- **文本节点** - 文本内容
- **属性节点** - HTML属性（如id、class）
- **注释节点** - HTML注释
- **文档节点** - 整个文档

## 元素选择

### 基本选择器

#### 1. 传统方法
```javascript
// 通过ID选择（返回单个元素）
const element = document.getElementById("myId");

// 通过类名选择（返回HTMLCollection）
const elements = document.getElementsByClassName("myClass");

// 通过标签名选择（返回HTMLCollection）
const paragraphs = document.getElementsByTagName("p");
```

#### 2. 现代选择器（推荐）
```javascript
// 选择第一个匹配的元素
const element = document.querySelector(".myClass");

// 选择所有匹配的元素（返回NodeList）
const elements = document.querySelectorAll(".myClass");

// 复杂选择器
const buttons = document.querySelectorAll("button.primary");
const requiredInputs = document.querySelectorAll("input[required]");
const listItems = document.querySelectorAll("ul > li");
```

### 选择器性能对比
```javascript
// 性能从高到低排序
document.getElementById("id");           // 最快
document.getElementsByClassName("class"); // 快
document.getElementsByTagName("tag");    // 快
document.querySelector(".class");        // 中等
document.querySelectorAll(".class");     // 较慢

// 缓存选择结果
const container = document.querySelector(".container");
const buttons = container.querySelectorAll("button");
```

## 元素操作

### 创建和添加元素

#### 基本操作
```javascript
// 创建新元素
const newDiv = document.createElement("div");
const newParagraph = document.createElement("p");

// 设置内容
newDiv.textContent = "新的div元素";
newParagraph.innerHTML = "这是<strong>粗体</strong>文本";

// 添加到页面
document.body.appendChild(newDiv);

// 插入到指定位置
const container = document.getElementById("container");
container.insertBefore(newParagraph, container.firstChild);
```

#### 现代方法
```javascript
// 使用insertAdjacentHTML
container.insertAdjacentHTML('beforeend', '<p>新段落</p>');

// 使用insertAdjacentElement
const newElement = document.createElement('span');
newElement.textContent = '新元素';
container.insertAdjacentElement('afterbegin', newElement);
```

### 元素属性操作

#### 基本属性
```javascript
const element = document.querySelector("#myElement");

// 获取和设置属性
console.log(element.id);                    // 获取ID
element.id = "newId";                       // 设置ID
element.setAttribute("data-value", "123");  // 设置自定义属性
console.log(element.getAttribute("data-value")); // 获取自定义属性

// 检查属性
console.log(element.hasAttribute("class")); // 检查是否有class属性

// 删除属性
element.removeAttribute("data-value");
```

#### 类名操作
```javascript
const element = document.querySelector(".myClass");

// 添加类
element.classList.add("newClass", "anotherClass");

// 删除类
element.classList.remove("oldClass");

// 切换类
element.classList.toggle("active");

// 检查类
if (element.classList.contains("active")) {
    console.log("元素有active类");
}

// 替换类
element.classList.replace("oldClass", "newClass");
```

### 元素内容操作

#### 文本内容
```javascript
const element = document.querySelector("#content");

// 获取文本内容
console.log(element.textContent);  // 纯文本，不包含HTML标签

// 设置文本内容
element.textContent = "新的文本内容";

// 获取HTML内容
console.log(element.innerHTML);    // 包含HTML标签

// 设置HTML内容
element.innerHTML = "<strong>粗体</strong>文本";
```

#### 表单元素
```javascript
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const select = document.querySelector("select");

// 获取和设置值
console.log(input.value);
input.value = "新值";

// 检查表单状态
console.log(input.checked);        // 复选框/单选框
console.log(input.disabled);       // 是否禁用
console.log(input.readOnly);       // 是否只读
```

## DOM遍历

### 节点关系

#### 父子关系
```javascript
const element = document.querySelector(".child");

// 父节点
console.log(element.parentNode);
console.log(element.parentElement);

// 子节点
console.log(element.childNodes);      // 包含文本节点
console.log(element.children);        // 只包含元素节点
console.log(element.firstChild);      // 第一个子节点
console.log(element.lastChild);       // 最后一个子节点
console.log(element.firstElementChild); // 第一个子元素
console.log(element.lastElementChild);  // 最后一个子元素
```

#### 兄弟关系
```javascript
const element = document.querySelector(".middle");

// 兄弟节点
console.log(element.previousSibling);     // 前一个兄弟节点
console.log(element.nextSibling);         // 后一个兄弟节点
console.log(element.previousElementSibling); // 前一个兄弟元素
console.log(element.nextElementSibling);     // 后一个兄弟元素
```

### 遍历方法
```javascript
// 遍历所有子元素
const container = document.querySelector(".container");
Array.from(container.children).forEach(child => {
    console.log(child.tagName);
});

// 查找特定子元素
const button = container.querySelector("button");
const input = container.querySelector("input");

// 查找祖先元素
function findAncestor(element, selector) {
    let parent = element.parentElement;
    while (parent) {
        if (parent.matches(selector)) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null;
}

const ancestor = findAncestor(button, ".ancestor");
```

## 样式操作

### 内联样式
```javascript
const element = document.querySelector("#styled");

// 获取样式
console.log(element.style.backgroundColor);

// 设置样式
element.style.backgroundColor = "red";
element.style.fontSize = "16px";
element.style.marginTop = "10px";

// 批量设置样式
Object.assign(element.style, {
    color: "white",
    padding: "20px",
    borderRadius: "5px"
});
```

### 计算样式
```javascript
const element = document.querySelector("#element");

// 获取计算后的样式
const computedStyle = window.getComputedStyle(element);
console.log(computedStyle.backgroundColor);
console.log(computedStyle.fontSize);

// 获取特定样式值
const width = computedStyle.getPropertyValue("width");
const height = computedStyle.getPropertyValue("height");
```

### CSS类操作
```javascript
const element = document.querySelector(".element");

// 添加CSS类
element.classList.add("highlight", "animated");

// 删除CSS类
element.classList.remove("old-style");

// 切换CSS类
element.classList.toggle("active");

// 检查CSS类
if (element.classList.contains("primary")) {
    element.classList.add("focused");
}
```

## 事件处理

### 事件绑定

#### 传统方式
```javascript
const button = document.querySelector("button");

// 内联事件（不推荐）
// <button onclick="handleClick()">点击</button>

// 属性绑定
button.onclick = function(event) {
    console.log("按钮被点击了");
    console.log(event);
};

// 移除事件
button.onclick = null;
```

#### 现代方式（推荐）
```javascript
const button = document.querySelector("button");

// addEventListener
function handleClick(event) {
    console.log("按钮被点击了", event);
}

button.addEventListener("click", handleClick);

// 移除事件
button.removeEventListener("click", handleClick);

// 一次性事件
button.addEventListener("click", function() {
    console.log("这个事件只会触发一次");
}, { once: true });
```

### 事件对象
```javascript
function handleEvent(event) {
    // 事件类型
    console.log(event.type);           // "click"
    
    // 目标元素
    console.log(event.target);         // 触发事件的元素
    console.log(event.currentTarget);  // 绑定事件的元素
    
    // 鼠标事件
    console.log(event.clientX, event.clientY); // 鼠标位置
    console.log(event.pageX, event.pageY);     // 页面位置
    
    // 键盘事件
    console.log(event.key);            // 按键
    console.log(event.code);           // 按键代码
    
    // 阻止默认行为
    event.preventDefault();
    
    // 阻止事件冒泡
    event.stopPropagation();
}
```

### 事件委托
```javascript
// 为父元素绑定事件，处理子元素的事件
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

## 性能优化

### 减少DOM查询
```javascript
// 不好的做法
function updateElements() {
    for (let i = 0; i < 100; i++) {
        const element = document.querySelector(`#item-${i}`);
        element.textContent = `项目 ${i}`;
    }
}

// 好的做法
function updateElements() {
    const elements = document.querySelectorAll("[id^='item-']");
    elements.forEach((element, index) => {
        element.textContent = `项目 ${index}`;
    });
}
```

### 批量DOM操作
```javascript
// 不好的做法
const container = document.querySelector(".container");
for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.textContent = `项目 ${i}`;
    container.appendChild(div); // 每次都会触发重排
}

// 好的做法
const container = document.querySelector(".container");
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.textContent = `项目 ${i}`;
    fragment.appendChild(div);
}

container.appendChild(fragment); // 只触发一次重排
```

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

window.addEventListener("scroll", handleScroll);
```

## 面试重点

### 核心概念
1. **DOM树结构：** 理解HTML文档的树形表示
2. **节点类型：** 元素节点、文本节点、属性节点等
3. **事件机制：** 事件捕获、目标、冒泡三个阶段
4. **性能优化：** 减少DOM查询、批量操作、事件委托等

### 常见问题
1. **事件冒泡和捕获：** 理解事件传播机制
2. **内存泄漏：** 及时移除事件监听器
3. **重排和重绘：** 优化DOM操作性能
4. **跨浏览器兼容性：** 处理不同浏览器的差异

### 实际应用
1. **动态内容：** 根据用户操作动态更新页面
2. **表单验证：** 实时验证用户输入
3. **交互效果：** 实现各种用户交互功能
4. **性能监控：** 监控页面性能指标

## 实践练习

### 基础练习
1. 使用不同方法选择和操作DOM元素
2. 实现简单的表单验证
3. 练习事件绑定和处理
4. 理解DOM遍历和节点关系

### 进阶练习
1. 实现事件委托处理动态元素
2. 优化DOM操作的性能
3. 构建可复用的DOM组件
4. 分析框架源码中的DOM操作

## 下一步

掌握DOM操作与事件后，建议学习：
- **[事件系统详解](./events.md)** - 事件机制、事件委托、自定义事件
- **[ES6+现代特性](./es6.md)** - 模块系统、解构赋值、Promise基础

继续学习，加油！🚀 