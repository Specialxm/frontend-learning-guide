# HTML 元素 📝

HTML元素是构建网页的基础，每个元素都有特定的语义和功能。

## 🏷️ 文本元素

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

## 🔗 链接和导航

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

## 🖼️ 媒体元素

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

## 📋 表单元素

### 基本表单
```html
<form action="/submit" method="post">
    <!-- 文本输入 -->
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required>
    
    <!-- 密码输入 -->
    <label for="password">密码：</label>
    <input type="password" id="password" name="password" required>
    
    <!-- 邮箱输入 -->
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>
    
    <!-- 数字输入 -->
    <label for="age">年龄：</label>
    <input type="number" id="age" name="age" min="0" max="120">
    
    <!-- 日期输入 -->
    <label for="birthday">生日：</label>
    <input type="date" id="birthday" name="birthday">
    
    <!-- 单选按钮 -->
    <fieldset>
        <legend>性别：</legend>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女</label>
    </fieldset>
    
    <!-- 复选框 -->
    <fieldset>
        <legend>兴趣爱好：</legend>
        <input type="checkbox" id="reading" name="hobbies" value="reading">
        <label for="reading">阅读</label>
        <input type="checkbox" id="sports" name="hobbies" value="sports">
        <label for="sports">运动</label>
        <input type="checkbox" id="music" name="hobbies" value="music">
        <label for="music">音乐</label>
    </fieldset>
    
    <!-- 下拉选择 -->
    <label for="city">城市：</label>
    <select id="city" name="city">
        <option value="">请选择城市</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
        <option value="shenzhen">深圳</option>
    </select>
    
    <!-- 文本区域 -->
    <label for="message">留言：</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <!-- 提交按钮 -->
    <button type="submit">提交</button>
    <button type="reset">重置</button>
</form>
```

## 🏗️ 布局元素

### 容器元素
```html
<!-- 通用容器 -->
<div class="container">
    <p>这是一个div容器</p>
</div>

<!-- 语义化容器 -->
<header>
    <h1>网站标题</h1>
    <nav>导航菜单</nav>
</header>

<main>
    <article>
        <h2>文章标题</h2>
        <p>文章内容...</p>
    </article>
    
    <aside>
        <h3>侧边栏</h3>
        <p>相关链接...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2024 前端学习指南</p>
</footer>
```

### 表格元素
```html
<table border="1">
    <caption>学生成绩表</caption>
    <thead>
        <tr>
            <th>姓名</th>
            <th>数学</th>
            <th>语文</th>
            <th>英语</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>85</td>
            <td>90</td>
            <td>88</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>92</td>
            <td>85</td>
            <td>90</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>平均分</td>
            <td>88.5</td>
            <td>87.5</td>
            <td>89</td>
        </tr>
    </tfoot>
</table>
```

## 🔧 实践练习

创建一个完整的个人介绍页面：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人介绍页面</title>
</head>
<body>
    <header>
        <h1>张三的个人介绍</h1>
        <nav>
            <ul>
                <li><a href="#about">关于我</a></li>
                <li><a href="#skills">技能</a></li>
                <li><a href="#contact">联系方式</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>关于我</h2>
            <img src="avatar.jpg" alt="个人头像" width="200">
            <p>我是一名前端开发者，热爱编程和新技术。</p>
        </section>
        
        <section id="skills">
            <h2>技能列表</h2>
            <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>Vue.js</li>
            </ul>
        </section>
        
        <section id="contact">
            <h2>联系方式</h2>
            <form>
                <label for="name">姓名：</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">邮箱：</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">留言：</label>
                <textarea id="message" name="message" rows="4"></textarea>
                
                <button type="submit">发送消息</button>
            </form>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 张三的个人网站</p>
    </footer>
</body>
</html>
```

## 📚 重要概念

1. **语义化** - 使用有意义的标签
2. **可访问性** - 为屏幕阅读器提供支持
3. **表单验证** - 客户端和服务器端验证
4. **响应式图片** - 适配不同设备

## 💡 最佳实践

1. **使用语义化标签**
2. **为图片添加alt属性**
3. **合理使用表单验证**
4. **保持代码结构清晰**

## 🔗 相关资源

- **[MDN - HTML元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)** - 完整的HTML元素列表和说明
- **[W3C - HTML5元素](https://www.w3.org/TR/html52/semantics.html)** - HTML5语义化元素规范
- **[HTML可访问性指南](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility/HTML)** - 创建可访问的HTML内容

--- 