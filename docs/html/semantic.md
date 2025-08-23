# HTML 语义化标签

语义化标签让HTML代码更有意义，提高可读性和可访问性，对SEO和屏幕阅读器友好。

## 什么是语义化

语义化是指使用有意义的HTML标签来描述内容的结构和含义，而不是仅仅为了样式效果。

### 语义化的好处
- **可读性** - 代码更容易理解
- **可访问性** - 屏幕阅读器能更好地理解内容
- **SEO友好** - 搜索引擎更容易理解页面结构
- **维护性** - 代码结构更清晰，便于维护

## 页面结构语义化

### 传统布局 vs 语义化布局

**传统方式（不推荐）：**
```html
<div class="header">网站头部</div>
<div class="nav">导航菜单</div>
<div class="main">主要内容</div>
<div class="sidebar">侧边栏</div>
<div class="footer">网站底部</div>
```

**语义化方式（推荐）：**
```html
<header>网站头部</header>
<nav>导航菜单</nav>
<main>主要内容</main>
<aside>侧边栏</aside>
<footer>网站底部</footer>
```

## 主要语义化标签

### 1. 页面结构标签

#### `<header>` - 页面头部
```html
<header>
    <h1>网站标题</h1>
    <p>网站副标题或描述</p>
</header>

<!-- 文章头部 -->
<article>
    <header>
        <h2>文章标题</h2>
        <time datetime="2024-01-15">2024年1月15日</time>
        <address>作者：张三</address>
    </header>
    <!-- 文章内容 -->
</article>
```

#### `<nav>` - 导航区域
```html
<nav>
    <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#services">服务</a></li>
        <li><a href="#contact">联系</a></li>
    </ul>
</nav>

<!-- 面包屑导航 -->
<nav aria-label="面包屑导航">
    <ol>
        <li><a href="/">首页</a></li>
        <li><a href="/products">产品</a></li>
        <li><span aria-current="page">当前页面</span></li>
    </ol>
</nav>
```

#### `<main>` - 主要内容
```html
<main>
    <h1>页面主标题</h1>
    <p>这是页面的主要内容...</p>
    
    <!-- 每个页面只能有一个main标签 -->
    <!-- 不能嵌套在article、aside、footer、header、nav中 -->
</main>
```

#### `<aside>` - 侧边栏内容
```html
<aside>
    <h3>相关文章</h3>
    <ul>
        <li><a href="#">相关文章1</a></li>
        <li><a href="#">相关文章2</a></li>
    </ul>
    
    <h3>广告</h3>
    <div class="advertisement">
        <!-- 广告内容 -->
    </div>
</aside>
```

#### `<footer>` - 页面底部
```html
<footer>
    <p>&copy; 2024 网站名称. 保留所有权利.</p>
    <nav>
        <a href="/privacy">隐私政策</a>
        <a href="/terms">使用条款</a>
    </nav>
</footer>
```

### 2. 内容语义化标签

#### `<article>` - 文章内容
```html
<article>
    <header>
        <h2>文章标题</h2>
        <time datetime="2024-01-15">2024年1月15日</time>
    </header>
    
    <p>文章内容...</p>
    
    <footer>
        <p>作者：张三</p>
        <p>阅读量：1000</p>
    </footer>
</article>
```

#### `<section>` - 内容区块
```html
<section>
    <h2>产品介绍</h2>
    <p>产品详细描述...</p>
</section>

<section>
    <h2>用户评价</h2>
    <div class="reviews">
        <!-- 评价内容 -->
    </div>
</section>
```

#### `<figure>` 和 `<figcaption>` - 图片和说明
```html
<figure>
    <img src="chart.png" alt="销售数据图表">
    <figcaption>图1：2024年第一季度销售数据</figcaption>
</figure>
```

### 3. 文本语义化标签

#### `<time>` - 时间信息
```html
<time datetime="2024-01-15">2024年1月15日</time>
<time datetime="2024-01-15T10:30:00">上午10:30</time>
```

#### `<mark>` - 高亮文本
```html
<p>这是一段包含<mark>重要信息</mark>的文本。</p>
```

#### `<cite>` - 引用来源
```html
<blockquote>
    <p>这是一段引用文字。</p>
    <cite>— 作者姓名，《书名》</cite>
</blockquote>
```

## 语义化检查清单

### 页面结构
- [ ] 使用`<header>`标签包裹页面头部
- [ ] 使用`<nav>`标签包裹导航菜单
- [ ] 使用`<main>`标签包裹主要内容
- [ ] 使用`<aside>`标签包裹侧边栏
- [ ] 使用`<footer>`标签包裹页面底部

### 内容组织
- [ ] 使用`<article>`标签包裹独立文章
- [ ] 使用`<section>`标签组织相关内容
- [ ] 使用`<h1>`到`<h6>`标签创建标题层级
- [ ] 使用`<figure>`和`<figcaption>`包裹图片和说明

### 文本语义
- [ ] 使用`<strong>`表示重要文本
- [ ] 使用`<em>`表示强调文本
- [ ] 使用`<mark>`表示高亮文本
- [ ] 使用`<time>`标记时间信息
- [ ] 使用`<cite>`标记引用来源

## 最佳实践

1. **优先使用语义化标签** - 避免过度使用`<div>`和`<span>`
2. **保持标签层级清晰** - 合理使用标题标签
3. **添加适当的ARIA属性** - 提高可访问性
4. **考虑SEO优化** - 使用有意义的标签结构
5. **测试屏幕阅读器** - 确保内容能被正确理解

## 注意事项

- 不要为了语义化而过度使用标签
- 保持标签的嵌套结构合理
- 考虑向后兼容性
- 定期检查可访问性 