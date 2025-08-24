# CSS 选择器详解

## 概述
CSS选择器是CSS的核心机制，它决定了哪些HTML元素会应用特定的样式。掌握选择器的使用方法和优先级规则，是CSS学习的基础。

## 学习目标
- 理解各种CSS选择器的语法和用法
- 掌握选择器优先级计算规则
- 学会选择器的最佳实践和性能优化
- 能够解决实际项目中的样式选择问题

## 选择器分类

### 1. 基础选择器

#### 元素选择器
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

#### 类选择器
选择具有特定class属性的元素：

```css
/* 选择class为"highlight"的元素 */
.highlight {
    background-color: yellow;
}

/* 选择同时具有多个class的元素 */
.btn.primary {
    background-color: blue;
    color: white;
}

/* 选择包含特定class的元素（部分匹配） */
[class*="btn"] {
    border-radius: 4px;
}
```

#### ID选择器
选择具有特定id属性的元素（页面中唯一）：

```css
/* 选择id为"header"的元素 */
#header {
    background-color: #333;
    color: white;
}

/* 注意：ID选择器优先级最高，应谨慎使用 */
```

#### 通配符选择器
选择所有元素：

```css
/* 选择所有元素 */
* {
    margin: 0;
    padding: 0;
}

/* 选择所有子元素 */
.container * {
    box-sizing: border-box;
}
```

### 2. 组合选择器

#### 后代选择器
选择指定元素内的所有后代元素：

```css
/* 选择div内的所有p元素 */
div p {
    margin-bottom: 10px;
}

/* 多层嵌套 */
.container .wrapper .content p {
    line-height: 1.6;
}
```

#### 子元素选择器
选择指定元素的直接子元素：

```css
/* 选择ul的直接子元素li */
ul > li {
    list-style: none;
}

/* 选择nav的直接子元素a */
nav > a {
    text-decoration: none;
}
```

#### 相邻兄弟选择器
选择紧跟在指定元素后的兄弟元素：

```css
/* 选择紧跟在h1后的p元素 */
h1 + p {
    font-size: 18px;
    color: #666;
}

/* 选择紧跟在input后的span */
input + span {
    color: red;
    font-size: 12px;
}
```

#### 通用兄弟选择器
选择指定元素后的所有兄弟元素：

```css
/* 选择h1后的所有p元素 */
h1 ~ p {
    text-indent: 2em;
}

/* 选择input后的所有label */
input ~ label {
    margin-left: 8px;
}
```

### 3. 属性选择器

#### 基础属性选择器
```css
/* 选择有title属性的元素 */
[title] {
    cursor: help;
}

/* 选择title属性值为"help"的元素 */
[title="help"] {
    border-bottom: 1px dotted #999;
}

/* 选择title属性值包含"help"的元素 */
[title*="help"] {
    background-color: #f0f0f0;
}

/* 选择title属性值以"help"开头的元素 */
[title^="help"] {
    color: blue;
}

/* 选择title属性值以"help"结尾的元素 */
[title$="help"] {
    color: green;
}
```

#### 属性值匹配选择器
```css
/* 选择class属性值包含"btn"的元素 */
[class~="btn"] {
    display: inline-block;
    padding: 8px 16px;
}

/* 选择lang属性值以"zh"开头的元素 */
[lang|="zh"] {
    font-family: "Microsoft YaHei", sans-serif;
}
```

### 4. 伪类选择器

#### 状态伪类
```css
/* 链接状态 */
a:link { color: blue; }      /* 未访问 */
a:visited { color: purple; } /* 已访问 */
a:hover { color: red; }      /* 鼠标悬停 */
a:active { color: orange; }  /* 激活状态 */

/* 表单状态 */
input:focus { outline: 2px solid blue; }
input:disabled { opacity: 0.5; }
input:checked { background-color: green; }
```

#### 结构伪类
```css
/* 选择第一个子元素 */
li:first-child {
    font-weight: bold;
}

/* 选择最后一个子元素 */
li:last-child {
    border-bottom: none;
}

/* 选择第n个子元素 */
li:nth-child(2n) {
    background-color: #f5f5f5;
}

/* 选择第n个子元素（从后往前） */
li:nth-last-child(1) {
    background-color: #e0e0e0;
}

/* 选择唯一子元素 */
p:only-child {
    text-align: center;
}
```

#### 其他伪类
```css
/* 选择空元素 */
div:empty {
    display: none;
}

/* 选择根元素 */
:root {
    font-size: 16px;
}

/* 选择否定条件 */
:not(.hidden) {
    display: block;
}
```

### 5. 伪元素选择器

```css
/* 在元素内容前插入内容 */
p::before {
    content: "→ ";
    color: blue;
}

/* 在元素内容后插入内容 */
p::after {
    content: " ←";
    color: red;
}

/* 选择第一行文本 */
p::first-line {
    font-weight: bold;
    color: #333;
}

/* 选择第一个字母 */
p::first-letter {
    font-size: 2em;
    float: left;
    margin-right: 4px;
}

/* 选择用户选中的文本 */
::selection {
    background-color: yellow;
    color: black;
}
```

## 选择器优先级

### 优先级计算规则
CSS选择器的优先级由四个级别组成，从左到右依次比较：

1. **内联样式** (1000分)
2. **ID选择器** (100分)
3. **类选择器、属性选择器、伪类** (10分)
4. **元素选择器、伪元素** (1分)

### 优先级计算示例

```css
/* 优先级：0,0,1,1 = 11分 */
div.container {
    color: blue;
}

/* 优先级：0,0,2,0 = 20分 */
.container.highlight {
    color: red; /* 这个会生效 */
}

/* 优先级：0,1,0,0 = 100分 */
#main {
    color: green; /* 这个会生效 */
}

/* 优先级：1,0,0,0 = 1000分 */
<div style="color: orange;">内联样式优先级最高</div>
```

### 优先级相同的情况
当优先级相同时，**后定义的样式会覆盖先定义的样式**：

```css
/* 两个选择器优先级都是 0,0,1,0 = 10分 */
.highlight {
    color: blue;
}

.highlight {
    color: red; /* 这个会生效 */
}
```

### !important 声明
`!important` 声明具有最高优先级，会覆盖所有其他样式：

```css
.highlight {
    color: blue !important; /* 最高优先级 */
}

#main {
    color: red; /* 这个不会生效 */
}
```

**注意：** 过度使用 `!important` 会导致样式难以维护，应谨慎使用。

## 最佳实践

### 1. 选择器性能优化

#### 避免过度嵌套
```css
/* ❌ 避免过度嵌套 */
.container .wrapper .content .section .article .paragraph {
    color: #333;
}

/* ✅ 使用更具体的选择器 */
.article-paragraph {
    color: #333;
}
```

#### 避免使用通配符
```css
/* ❌ 避免使用通配符 */
* {
    margin: 0;
    padding: 0;
}

/* ✅ 只重置需要的元素 */
body, h1, h2, h3, p, ul, ol {
    margin: 0;
    padding: 0;
}
```

#### 使用类选择器替代元素选择器
```css
/* ❌ 元素选择器可能影响太多元素 */
div {
    margin-bottom: 20px;
}

/* ✅ 使用类选择器更精确 */
.content-section {
    margin-bottom: 20px;
}
```

### 2. 命名规范

#### BEM命名法
```css
/* Block: 块 */
.card { }

/* Element: 元素 */
.card__title { }
.card__content { }
.card__footer { }

/* Modifier: 修饰符 */
.card--featured { }
.card--small { }
```

#### 语义化命名
```css
/* ✅ 语义化命名 */
.primary-button { }
.navigation-menu { }
.article-header { }

/* ❌ 避免非语义化命名 */
.red-button { }
.big-box { }
.top-thing { }
```

### 3. 选择器组织

#### 按功能分组
```css
/* 布局相关 */
.container { }
.wrapper { }
.grid { }

/* 组件相关 */
.button { }
.card { }
.modal { }

/* 工具类 */
.text-center { }
.hidden { }
.clearfix { }
```

#### 使用注释分隔
```css
/* ==========================================================================
   布局样式
   ========================================================================== */

.container { }
.wrapper { }

/* ==========================================================================
   组件样式
   ========================================================================== */

.button { }
.card { }
```

## 常见问题和解决方案

### 1. 样式不生效

#### 检查选择器优先级
```css
/* 问题：样式不生效 */
.button {
    background-color: blue;
}

/* 解决方案：提高优先级 */
.button.button--primary {
    background-color: blue;
}
```

#### 检查选择器语法
```css
/* 问题：语法错误 */
.button {
    background-color: blue;
    /* 缺少分号 */
    color red
}

/* 解决方案：修正语法 */
.button {
    background-color: blue;
    color: red;
}
```

### 2. 样式冲突

#### 使用更具体的选择器
```css
/* 问题：样式冲突 */
.button {
    background-color: blue;
}

/* 解决方案：使用更具体的选择器 */
.header .button {
    background-color: blue;
}
```

#### 使用命名空间
```css
/* 解决方案：使用命名空间 */
.header-button {
    background-color: blue;
}

.footer-button {
    background-color: green;
}
```

## 面试重点

### 核心概念
- **选择器类型**：基础选择器、组合选择器、属性选择器、伪类选择器、伪元素选择器
- **优先级计算**：内联样式(1000) > ID(100) > 类/属性/伪类(10) > 元素/伪元素(1)
- **继承规则**：某些CSS属性会从父元素继承到子元素

### 技术原理
- **CSS解析顺序**：从右到左解析选择器，提高性能
- **特异性计算**：相同优先级时，后定义的样式生效
- **!important作用**：提高样式优先级，但应谨慎使用

### 实际应用
- **性能优化**：避免过度嵌套，减少通配符使用
- **命名规范**：使用BEM等命名方法，提高代码可维护性
- **调试技巧**：使用浏览器开发者工具检查选择器优先级

### 常见面试题
1. CSS选择器的优先级是如何计算的？
2. 如何提高选择器的优先级？
3. 什么是CSS选择器的继承？
4. 如何避免CSS选择器冲突？
5. CSS选择器的性能优化有哪些方法？

## 实践练习

### 练习1：选择器优先级
```html
<div id="container" class="wrapper">
    <p class="text highlight">这是一段文本</p>
</div>
```

```css
/* 请计算以下选择器的优先级，并说明哪个样式会生效 */
#container p { color: red; }      /* 优先级：101 */
.wrapper .highlight { color: blue; } /* 优先级：20 */
p.highlight { color: green; }     /* 优先级：11 */
```

### 练习2：复杂选择器
```html
<nav class="main-nav">
    <ul>
        <li><a href="#" class="nav-link">首页</a></li>
        <li><a href="#" class="nav-link active">关于</a></li>
        <li><a href="#" class="nav-link">联系</a></li>
    </ul>
</nav>
```

```css
/* 请编写CSS选择器实现以下效果 */
/* 1. 所有导航链接的默认样式 */
/* 2. 激活状态的导航链接样式 */
/* 3. 鼠标悬停时的导航链接样式 */
/* 4. 第一个导航链接的特殊样式 */
```

## 总结

CSS选择器是CSS的基础，掌握各种选择器的使用方法和优先级规则，能够帮助我们：
- 精确控制页面元素的样式
- 避免样式冲突和覆盖问题
- 提高CSS代码的性能和可维护性
- 解决实际项目中的样式问题

建议在学习过程中：
1. 多动手实践，编写各种选择器
2. 理解优先级计算规则，避免样式冲突
3. 遵循最佳实践，提高代码质量
4. 关注性能优化，提升用户体验

## 下一步

掌握了CSS选择器后，建议继续学习：
- [盒模型](./box-model.md) - 理解元素布局的基础原理
- [布局技术](./layout.md) - 学习传统布局方法
- [Flexbox弹性布局](./flexbox.md) - 掌握现代布局解决方案 