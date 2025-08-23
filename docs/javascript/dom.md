# JavaScript DOM 操作

DOM（文档对象模型）是JavaScript操作网页元素的核心API，它允许我们动态地修改网页内容、样式和结构。

## DOM 基础概念

### 1. 什么是DOM
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

### 2. DOM节点类型
- **元素节点** - HTML标签（如div、p、h1）
- **文本节点** - 文本内容
- **属性节点** - HTML属性（如id、class）
- **注释节点** - HTML注释
- **文档节点** - 整个文档

## 元素选择

### 1. 基本选择器
```javascript
// 通过ID选择
const element = document.getElementById("myId");

// 通过类名选择
const elements = document.getElementsByClassName("myClass");

// 通过标签名选择
const paragraphs = document.getElementsByTagName("p");

// 通过CSS选择器选择
const element = document.querySelector(".myClass");
const elements = document.querySelectorAll(".myClass");

// 通过属性选择
const elements = document.querySelectorAll("[data-type='button']");
```

### 2. 选择器示例
```javascript
// 选择所有按钮
const buttons = document.querySelectorAll("button");

// 选择特定类名的div
const containers = document.querySelectorAll("div.container");

// 选择第一个匹配的元素
const firstButton = document.querySelector("button");

// 选择特定属性的元素
const requiredInputs = document.querySelectorAll("input[required]");

// 选择子元素
const listItems = document.querySelectorAll("ul > li");
```

## 元素操作

### 1. 创建和添加元素
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

// 替换元素
const oldElement = document.getElementById("old");
const newElement = document.createElement("span");
newElement.textContent = "新元素";
oldElement.parentNode.replaceChild(newElement, oldElement);
```

### 2. 删除元素
```javascript
// 删除子元素
const parent = document.getElementById("parent");
const child = document.getElementById("child");
parent.removeChild(child);

// 删除自身
const element = document.getElementById("toRemove");
element.remove();

// 清空容器
const container = document.getElementById("container");
container.innerHTML = "";
```

## 属性操作

### 1. 基本属性操作
```javascript
const element = document.getElementById("myElement");

// 获取属性
const id = element.getAttribute("id");
const className = element.className;

// 设置属性
element.setAttribute("data-value", "123");
element.className = "new-class";

// 检查属性
const hasClass = element.hasAttribute("class");

// 删除属性
element.removeAttribute("data-value");

// 直接访问标准属性
element.id = "newId";
element.title = "新标题";
```

### 2. 类名操作
```javascript
const element = document.getElementById("myElement");

// 添加类
element.classList.add("active", "highlighted");

// 删除类
element.classList.remove("inactive");

// 切换类
element.classList.toggle("selected");

// 检查类
if (element.classList.contains("active")) {
    console.log("元素处于激活状态");
}

// 替换类
element.classList.replace("old-class", "new-class");
```

## 内容操作

### 1. 文本内容
```javascript
const element = document.getElementById("content");

// 获取文本内容
const text = element.textContent;
const innerText = element.innerText;

// 设置文本内容
element.textContent = "新的文本内容";

// 获取HTML内容
const html = element.innerHTML;

// 设置HTML内容
element.innerHTML = "<span>HTML内容</span>";
```

### 2. 表单元素
```javascript
const input = document.getElementById("username");
const textarea = document.getElementById("description");
const select = document.getElementById("country");

// 获取值
const username = input.value;
const description = textarea.value;
const country = select.value;

// 设置值
input.value = "新用户名";
textarea.value = "新的描述";
select.value = "中国";

// 检查状态
if (input.checked) {
    console.log("复选框已选中");
}

if (input.disabled) {
    console.log("输入框已禁用");
}
```

## 样式操作

### 1. 内联样式
```javascript
const element = document.getElementById("myElement");

// 设置样式
element.style.backgroundColor = "red";
element.style.fontSize = "16px";
element.style.marginTop = "10px";

// 获取样式
const bgColor = element.style.backgroundColor;
const fontSize = element.style.fontSize;

// 批量设置样式
Object.assign(element.style, {
    color: "white",
    padding: "20px",
    borderRadius: "5px"
});
```

### 2. 计算样式
```javascript
const element = document.getElementById("myElement");

// 获取计算后的样式
const computedStyle = window.getComputedStyle(element);
const bgColor = computedStyle.backgroundColor;
const fontSize = computedStyle.fontSize;

// 获取特定样式
const width = computedStyle.width;
const height = computedStyle.height;
const margin = computedStyle.margin;
```

## 事件处理

### 1. 基本事件绑定
```javascript
const button = document.getElementById("myButton");

// 添加事件监听器
button.addEventListener("click", function(event) {
    console.log("按钮被点击了");
    console.log("事件对象:", event);
});

// 移除事件监听器
const clickHandler = function(event) {
    console.log("点击事件");
};
button.addEventListener("click", clickHandler);
button.removeEventListener("click", clickHandler);

// 内联事件（不推荐）
button.onclick = function() {
    console.log("内联事件");
};
```

### 2. 常用事件类型
```javascript
const element = document.getElementById("myElement");

// 鼠标事件
element.addEventListener("click", handleClick);
element.addEventListener("dblclick", handleDoubleClick);
element.addEventListener("mouseenter", handleMouseEnter);
element.addEventListener("mouseleave", handleMouseLeave);
element.addEventListener("mousemove", handleMouseMove);

// 键盘事件
element.addEventListener("keydown", handleKeyDown);
element.addEventListener("keyup", handleKeyUp);
element.addEventListener("keypress", handleKeyPress);

// 表单事件
element.addEventListener("submit", handleSubmit);
element.addEventListener("change", handleChange);
element.addEventListener("input", handleInput);
element.addEventListener("focus", handleFocus);
element.addEventListener("blur", handleBlur);

// 文档事件
document.addEventListener("DOMContentLoaded", handleDOMReady);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);
```

## 事件委托

### 1. 事件委托原理
事件委托利用事件冒泡机制，将事件监听器添加到父元素上，统一处理子元素的事件。

```javascript
// 传统方式 - 为每个按钮添加事件
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", handleClick);
});

// 事件委托 - 在父元素上监听
const container = document.getElementById("buttonContainer");
container.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        handleClick(event);
    }
});
```

### 2. 事件委托示例
```javascript
// 动态列表的事件委托
const list = document.getElementById("todoList");

list.addEventListener("click", function(event) {
    const target = event.target;
    
    if (target.classList.contains("delete-btn")) {
        // 删除按钮被点击
        deleteTodoItem(target.closest("li"));
    } else if (target.classList.contains("complete-btn")) {
        // 完成按钮被点击
        completeTodoItem(target.closest("li"));
    } else if (target.tagName === "LI") {
        // 列表项被点击
        selectTodoItem(target);
    }
});

// 表单提交的事件委托
const form = document.getElementById("todoForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const input = form.querySelector("input[type='text']");
    const text = input.value.trim();
    
    if (text) {
        addTodoItem(text);
        input.value = "";
    }
});
```

## 性能优化

### 1. 减少DOM查询
```javascript
// 不好的做法 - 重复查询DOM
function updateElements() {
    document.getElementById("title").textContent = "新标题";
    document.getElementById("title").style.color = "red";
    document.getElementById("title").classList.add("highlight");
}

// 好的做法 - 缓存DOM引用
function updateElements() {
    const title = document.getElementById("title");
    title.textContent = "新标题";
    title.style.color = "red";
    title.classList.add("highlight");
}
```

### 2. 批量DOM操作
```javascript
// 不好的做法 - 逐个操作DOM
function addItems(items) {
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        document.getElementById("list").appendChild(li);
    });
}

// 好的做法 - 批量操作DOM
function addItems(items) {
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        fragment.appendChild(li);
    });
    
    document.getElementById("list").appendChild(fragment);
}
```

## 实际应用示例

### 1. 动态表单验证
```javascript
const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input[required]");

// 实时验证
inputs.forEach(input => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearError);
});

function validateField(event) {
    const input = event.target;
    const value = input.value.trim();
    const fieldName = input.getAttribute("data-field");
    
    if (!value) {
        showError(input, `${fieldName}不能为空`);
        return false;
    }
    
    // 特定字段验证
    if (fieldName === "email" && !isValidEmail(value)) {
        showError(input, "请输入有效的邮箱地址");
        return false;
    }
    
    if (fieldName === "phone" && !isValidPhone(value)) {
        showError(input, "请输入有效的手机号码");
        return false;
    }
    
    clearError(input);
    return true;
}

function showError(input, message) {
    clearError(input);
    
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    error.style.color = "red";
    error.style.fontSize = "12px";
    
    input.parentNode.appendChild(error);
}

function clearError(input) {
    const existingError = input.parentNode.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }
}
```

### 2. 动态内容加载
```javascript
class ContentLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.loading = false;
    }
    
    async loadContent(url) {
        if (this.loading) return;
        
        this.loading = true;
        this.showLoading();
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            this.renderContent(data);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.loading = false;
            this.hideLoading();
        }
    }
    
    showLoading() {
        this.container.innerHTML = '<div class="loading">加载中...</div>';
    }
    
    hideLoading() {
        const loading = this.container.querySelector(".loading");
        if (loading) {
            loading.remove();
        }
    }
    
    showError(message) {
        this.container.innerHTML = `<div class="error">加载失败: ${message}</div>`;
    }
    
    renderContent(data) {
        if (Array.isArray(data)) {
            this.renderList(data);
        } else {
            this.renderDetail(data);
        }
    }
    
    renderList(items) {
        const html = items.map(item => `
            <div class="item" data-id="${item.id}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join("");
        
        this.container.innerHTML = html;
        
        // 添加点击事件
        this.container.addEventListener("click", this.handleItemClick.bind(this));
    }
    
    renderDetail(item) {
        this.container.innerHTML = `
            <div class="detail">
                <h2>${item.title}</h2>
                <p>${item.content}</p>
                <button onclick="history.back()">返回</button>
            </div>
        `;
    }
    
    handleItemClick(event) {
        const item = event.target.closest(".item");
        if (item) {
            const id = item.dataset.id;
            this.loadContent(`/api/items/${id}`);
        }
    }
}

// 使用示例
const loader = new ContentLoader("content");
loader.loadContent("/api/items");
```

## 总结

DOM操作是前端开发的核心技能，掌握好DOM操作对于构建交互式网页应用至关重要：

1. **基础概念** - DOM树结构、节点类型
2. **元素操作** - 选择、创建、修改、删除元素
3. **属性操作** - 获取、设置、删除属性
4. **内容操作** - 文本内容、HTML内容、表单值
5. **样式操作** - 内联样式、计算样式
6. **事件处理** - 事件绑定、事件委托
7. **性能优化** - 减少DOM查询、批量操作
8. **实际应用** - 表单验证、动态内容加载

## 延伸阅读

- **[MDN - DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)** - DOM API 详解
- **[MDN - 事件](https://developer.mozilla.org/zh-CN/docs/Web/Events)** - 事件处理指南
- **[JavaScript.info - DOM](https://javascript.info/dom)** - 现代DOM教程 