# CSS 盒模型 📦

CSS盒模型是理解元素布局的基础，每个HTML元素都被视为一个盒子。

## 🎯 盒模型概念

CSS盒模型描述了HTML元素在页面中如何占据空间，包括：

- **内容区域 (Content)** - 文本、图片等实际内容
- **内边距 (Padding)** - 内容与边框之间的空白
- **边框 (Border)** - 围绕内容和内边距的线条
- **外边距 (Margin)** - 元素与其他元素之间的空白

## 📐 盒模型类型

### 1. 标准盒模型 (content-box)
```css
.box {
    box-sizing: content-box; /* 默认值 */
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    margin: 10px;
}
```

**实际宽度计算：**
- 内容宽度：200px
- 总宽度：200px + 20px×2 + 5px×2 + 10px×2 = 270px

### 2. 怪异盒模型 (border-box)
```css
.box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 5px solid #333;
    margin: 10px;
}
```

**实际宽度计算：**
- 内容宽度：200px - 20px×2 - 5px×2 = 150px
- 总宽度：200px + 10px×2 = 220px

## 🎨 盒模型属性详解

### 1. 内容区域 (Content)
```css
.content-box {
    width: 300px;           /* 宽度 */
    height: 200px;          /* 高度 */
    min-width: 200px;       /* 最小宽度 */
    max-width: 500px;       /* 最大宽度 */
    min-height: 100px;      /* 最小高度 */
    max-height: 300px;      /* 最大高度 */
}
```

### 2. 内边距 (Padding)
```css
.padding-box {
    /* 四个方向分别设置 */
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 15px;
    
    /* 简写方式 */
    padding: 20px 15px;           /* 上下20px，左右15px */
    padding: 20px 15px 20px 15px; /* 上右下左 */
    padding: 20px;                /* 四个方向都是20px */
}
```

### 3. 边框 (Border)
```css
.border-box {
    /* 边框宽度 */
    border-width: 2px;
    
    /* 边框样式 */
    border-style: solid;      /* 实线 */
    border-style: dashed;     /* 虚线 */
    border-style: dotted;     /* 点线 */
    border-style: double;     /* 双线 */
    border-style: groove;     /* 3D凹槽 */
    border-style: ridge;      /* 3D凸槽 */
    border-style: inset;      /* 3D内嵌 */
    border-style: outset;     /* 3D外凸 */
    
    /* 边框颜色 */
    border-color: #333;
    
    /* 简写方式 */
    border: 2px solid #333;
    
    /* 单独设置某一边 */
    border-top: 3px solid red;
    border-right: 1px dashed blue;
    border-bottom: 2px dotted green;
    border-left: 4px double orange;
}
```

### 4. 外边距 (Margin)
```css
.margin-box {
    /* 四个方向分别设置 */
    margin-top: 20px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-left: 15px;
    
    /* 简写方式 */
    margin: 20px 15px;           /* 上下20px，左右15px */
    margin: 20px 15px 20px 15px; /* 上右下左 */
    margin: 20px;                /* 四个方向都是20px */
    
    /* 水平居中 */
    margin: 0 auto;
}
```

## 🔧 盒模型应用示例

### 1. 卡片组件
```css
.card {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-title {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 18px;
}

.card-content {
    margin: 0;
    color: #666;
    line-height: 1.6;
}
```

### 2. 按钮组件
```css
.btn {
    box-sizing: border-box;
    display: inline-block;
    padding: 12px 24px;
    border: 2px solid #007bff;
    border-radius: 6px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-outline {
    background-color: transparent;
    color: #007bff;
}

.btn-outline:hover {
    background-color: #007bff;
    color: white;
}
```

### 3. 导航菜单
```css
.nav {
    box-sizing: border-box;
    background-color: #333;
    padding: 0;
    margin: 0;
    list-style: none;
}

.nav-item {
    display: inline-block;
    padding: 15px 20px;
    margin: 0;
    border-right: 1px solid #555;
}

.nav-item:last-child {
    border-right: none;
}

.nav-link {
    color: white;
    text-decoration: none;
    display: block;
}

.nav-item:hover {
    background-color: #555;
}
```

## 📱 响应式盒模型

### 1. 弹性盒模型
```css
.flex-container {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.flex-item {
    flex: 1;
    box-sizing: border-box;
    padding: 15px;
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
```

### 2. 媒体查询适配
```css
/* 移动设备 */
@media (max-width: 768px) {
    .card {
        width: 100%;
        margin: 10px 0;
        padding: 15px;
    }
    
    .flex-container {
        flex-direction: column;
        padding: 10px;
    }
    
    .flex-item {
        margin: 5px 0;
    }
}
```

## 🔍 调试盒模型

### 1. 浏览器开发者工具
- 使用Chrome DevTools的Elements面板
- 查看Computed标签页了解实际尺寸
- 使用Box Model可视化工具

### 2. CSS调试技巧
```css
.debug-box {
    /* 添加边框查看元素边界 */
    border: 1px solid red;
    
    /* 添加背景色查看内容区域 */
    background-color: rgba(255, 0, 0, 0.1);
    
    /* 使用outline查看元素轮廓 */
    outline: 2px dashed blue;
}
```

## 📚 重要概念

1. **盒模型类型** - content-box vs border-box
2. **尺寸计算** - 理解实际占用空间
3. **外边距合并** - 垂直方向的外边距会合并
4. **盒模型重置** - 使用CSS重置样式

## 💡 最佳实践

1. **使用border-box** - 更直观的尺寸控制
2. **合理使用padding和margin** - 避免过度嵌套
3. **响应式设计** - 考虑不同设备的显示效果
4. **性能优化** - 避免频繁改变盒模型属性

---

**下一步：学习 [布局技术](./layout.md)** ➡️ 