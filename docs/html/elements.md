# HTML 元素

HTML元素是构建网页的基础，每个元素都有特定的语义和功能。

## 文本元素

### 标题元素
```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 段落和文本
```html
<p>这是一个段落，包含文本内容。</p>
<strong>粗体文本</strong>
<em>斜体文本</em>
<mark>高亮文本</mark>
<small>小号文本</small>
<del>删除线文本</del>
<ins>下划线文本</ins>
```

### 列表元素
```html
<!-- 无序列表 -->
<ul>
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 定义列表 -->
<dl>
    <dt>术语</dt>
    <dd>术语的定义</dd>
</dl>
```

## 链接和导航

### 链接元素
```html
<!-- 外部链接 -->
<a href="https://www.example.com">访问示例网站</a>

<!-- 内部链接 -->
<a href="#section1">跳转到第一节</a>

<!-- 邮件链接 -->
<a href="mailto:contact@example.com">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:+86-138-0000-0000">拨打电话</a>

<!-- 下载链接 -->
<a href="document.pdf" download>下载文档</a>
```

### 导航元素
```html
<nav>
    <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系</a></li>
    </ul>
</nav>
```

## 媒体元素

### 图片元素
```html
<!-- 基本图片 -->
<img src="image.jpg" alt="图片描述">

<!-- 响应式图片 -->
<img src="image.jpg" alt="响应式图片" 
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w"
     sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px">

<!-- 图片链接 -->
<a href="large-image.jpg">
    <img src="thumbnail.jpg" alt="缩略图">
</a>
```

### 音频和视频
```html
<!-- 音频 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频元素。
</audio>

<!-- 视频 -->
<video controls width="400">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频元素。
</video>
```

## 表格元素

### 基本表格
```html
<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>职业</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>25</td>
            <td>工程师</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>30</td>
            <td>设计师</td>
        </tr>
    </tbody>
</table>
```

## 表单元素

### 输入字段
```html
<!-- 文本输入 -->
<input type="text" name="username" placeholder="用户名">

<!-- 密码输入 -->
<input type="password" name="password" placeholder="密码">

<!-- 邮箱输入 -->
<input type="email" name="email" placeholder="邮箱地址">

<!-- 数字输入 -->
<input type="number" name="age" min="1" max="120">

<!-- 日期选择 -->
<input type="date" name="birthday">
```

### 选择元素
```html
<!-- 单选按钮 -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">男</label>

<!-- 复选框 -->
<input type="checkbox" name="hobbies" value="reading" id="reading">
<label for="reading">阅读</label>

<!-- 下拉选择 -->
<select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
</select>
```

## 布局元素

### 容器元素
```html
<!-- 通用容器 -->
<div>块级容器</div>

<!-- 行内容器 -->
<span>行内容器</span>

<!-- 语义化容器 -->
<header>页面头部</header>
<nav>导航区域</nav>
<main>主要内容</main>
<aside>侧边栏</aside>
<footer>页面底部</footer>
<article>文章内容</article>
<section>内容区块</section>
```

## 使用建议

1. **选择合适的元素** - 根据内容语义选择正确的标签
2. **保持结构清晰** - 使用适当的嵌套和缩进
3. **添加必要属性** - 如alt、title、aria-label等
4. **遵循语义化原则** - 让HTML代码更有意义
5. **考虑可访问性** - 为屏幕阅读器提供支持 