# CSS 选择器

CSS选择器是CSS的核心，它决定了哪些HTML元素会应用特定的样式。

## 基本选择器

### 1. 元素选择器
选择所有指定标签的元素：

```css
/* 选择所有段落 */
p {
    color: blue;
}

/* 选择所有标题 */
h1, h2, h3 {
    font-weight: bold;
}
```

### 2. 类选择器
选择具有特定class属性的元素：

```css
/* 选择class为"highlight"的元素 */
.highlight {
    background-color: yellow;
}

/* 选择class为"btn"和"primary"的元素 */
.btn.primary {
    background-color: blue;
    color: white;
}
```

### 3. ID选择器
选择具有特定id属性的元素（页面中唯一）：

```css
/* 选择id为"header"的元素 */
#header {
    background-color: #333;
    color: white;
}
```

### 4. 通配符选择器
选择所有元素：

```css
/* 选择所有元素 */
* {
    margin: 0;
    padding: 0;
}
```

## 组合选择器

### 1. 后代选择器
选择指定元素内的所有后代元素：

```css
/* 选择div内的所有p元素 */
div p {
    margin-bottom: 10px;
}
```

### 2. 子元素选择器
选择指定元素的直接子元素：

```css
/* 选择ul的直接子元素li */
ul > li {
    list-style: none;
}
```

### 3. 相邻兄弟选择器
选择紧跟在指定元素后的兄弟元素：

```css
/* 选择紧跟在h1后的p元素 */
h1 + p {
    font-size: 18px;
    color: #666;
}
```

### 4. 通用兄弟选择器
选择指定元素后的所有兄弟元素：

```css
/* 选择h1后的所有p元素 */
h1 ~ p {
    text-indent: 2em;
}
```

## 伪类选择器

### 1. 状态伪类
```css
/* 链接状态 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* 表单状态 */
input:focus {
    border-color: blue;
    outline: none;
}

input:disabled {
    background-color: #f5f5f5;
}
```

### 2. 结构伪类
```css
/* 第一个子元素 */
li:first-child {
    font-weight: bold;
}

/* 最后一个子元素 */
li:last-child {
    border-bottom: none;
}

/* 第n个子元素 */
li:nth-child(odd) {
    background-color: #f9f9f9;
}

li:nth-child(even) {
    background-color: #fff;
}
```

## 伪元素选择器

```css
/* 首字母 */
p::first-letter {
    font-size: 2em;
    float: left;
}

/* 首行 */
p::first-line {
    font-weight: bold;
}

/* 内容前后 */
p::before {
    content: "📝 ";
}

p::after {
    content: " ✨";
}
```

## 实践练习

创建一个包含各种选择器的示例：

```html
<div class="container">
    <h1 class="title">CSS选择器示例</h1>
    <p class="intro">这是一个介绍段落。</p>
    <ul class="list">
        <li>列表项1</li>
        <li>列表项2</li>
        <li>列表项3</li>
    </ul>
    <p class="conclusion">这是结论段落。</p>
</div>
```

```css
/* 基础样式 */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

/* 标题样式 */
.title {
    color: #333;
    text-align: center;
}

/* 介绍段落 */
.intro {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
}

/* 列表样式 */
.list > li {
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.list > li:last-child {
    border-bottom: none;
}

.list > li:nth-child(odd) {
    background-color: #f9f9f9;
}

/* 结论段落 */
.conclusion {
    font-weight: bold;
    color: #333;
    margin-top: 20px;
}
```

## 选择器优先级

CSS选择器的优先级从高到低：

1. **!important** - 最高优先级
2. **内联样式** - style属性
3. **ID选择器** - #id
4. **类选择器** - .class
5. **元素选择器** - tag
6. **通配符选择器** - *

## 最佳实践

1. **避免过度使用ID选择器**
2. **合理使用类选择器**
3. **避免过深的选择器嵌套**
4. **使用语义化的类名**

---

**下一步：学习 [盒模型](./box-model.md)** ➡️ 