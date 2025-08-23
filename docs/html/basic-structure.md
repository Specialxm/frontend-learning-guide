# HTML 基本结构 📄

HTML文档有固定的结构，理解这个结构是学习HTML的第一步。

## 🏗️ HTML文档结构

每个HTML文档都包含以下基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

## 📝 结构说明

### 1. DOCTYPE声明
```html
<!DOCTYPE html>
```
- 告诉浏览器这是一个HTML5文档
- 必须放在文档的最开始

### 2. HTML根元素
```html
<html lang="zh-CN">
```
- `<html>` 是文档的根元素
- `lang="zh-CN"` 指定文档语言为中文

### 3. 头部信息 (head)
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
```

**meta标签说明：**
- `charset="UTF-8"` - 设置字符编码
- `viewport` - 设置视口，用于响应式设计
- `title` - 设置页面标题，显示在浏览器标签页

### 4. 主体内容 (body)
```html
<body>
    <!-- 这里放置页面的可见内容 -->
    <h1>主标题</h1>
    <p>段落内容</p>
</body>
```

## 🔧 实践练习

创建一个简单的HTML页面：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个HTML页面</title>
</head>
<body>
    <h1>欢迎学习HTML！</h1>
    <p>这是一个段落。</p>
    <ul>
        <li>列表项1</li>
        <li>列表项2</li>
        <li>列表项3</li>
    </ul>
</body>
</html>
```

## 📚 重要概念

1. **语义化** - HTML标签应该有意义
2. **嵌套规则** - 标签必须正确嵌套
3. **属性值** - 属性值用引号包围
4. **注释** - 使用 `<!-- -->` 添加注释

## ⚠️ 常见错误

- 忘记DOCTYPE声明
- 标签没有正确闭合
- 属性值缺少引号
- 嵌套顺序错误

## 🔗 相关资源

- **[MDN - HTML文档结构](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)** - 详细的HTML文档结构说明
- **[W3C - HTML5 DOCTYPE](https://www.w3.org/TR/html52/syntax.html#the-doctype)** - DOCTYPE声明规范
- **[HTML语义化指南](https://developer.mozilla.org/zh-CN/docs/Glossary/Semantics)** - 语义化HTML的最佳实践

--- 