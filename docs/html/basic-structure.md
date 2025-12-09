---
title: HTML基础结构 - 文档结构、语义化标签详解
description: 深入学习HTML文档的基本结构，包括DOCTYPE声明、head元素、body元素等核心概念，掌握HTML5语义化标签的使用方法，提升网页SEO和可访问性。
keywords: HTML基础,HTML结构,DOCTYPE,head元素,body元素,HTML5语义化,SEO优化,网页结构
date: 2024-01-01
---

# HTML 基础结构

HTML文档由基本的结构元素组成，这些元素定义了网页的框架和内容组织方式。

## 文档类型声明

每个HTML文档都应该以文档类型声明开始：

```html
<!DOCTYPE html>
```

这告诉浏览器这是一个HTML5文档。

## 基本HTML结构

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

## 结构元素详解

### `<html>` 元素
- 根元素，包含整个HTML文档
- `lang` 属性指定文档语言

### `<head>` 元素
包含文档的元信息：
- 字符编码
- 视口设置
- 页面标题
- CSS样式表链接
- JavaScript脚本链接
- 其他元数据

### `<body>` 元素
包含页面的可见内容：
- 文本内容
- 图片
- 链接
- 表单
- 其他HTML元素

## 响应式视口设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

这个meta标签确保页面在移动设备上正确显示。

## 字符编码

```html
<meta charset="UTF-8">
```

UTF-8编码支持中文等多语言字符。

## 注释

HTML注释用于添加说明，不会在浏览器中显示：

```html
<!-- 这是HTML注释 -->
<!-- 
    多行注释
    可以跨越多行
-->
```

## 最佳实践

1. **始终包含DOCTYPE声明**
2. **指定正确的语言属性**
3. **使用UTF-8字符编码**
4. **添加响应式视口设置**
5. **保持代码结构清晰**
6. **使用有意义的页面标题** 