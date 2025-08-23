# HTML 多媒体元素 🎬

HTML5提供了丰富的多媒体元素，让网页能够展示图片、音频、视频等多媒体内容，提升用户体验。

## 🖼️ 图片元素

### 基本图片标签
```html
<!-- 基本图片 -->
<img src="image.jpg" alt="图片描述">

<!-- 带尺寸的图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">

<!-- 响应式图片 -->
<img src="image.jpg" alt="响应式图片" style="max-width: 100%; height: auto;">
```

### 图片属性详解

#### src 属性
```html
<!-- 相对路径 -->
<img src="./images/photo.jpg" alt="照片">

<!-- 绝对路径 -->
<img src="https://example.com/images/photo.jpg" alt="照片">

<!-- 根路径 -->
<img src="/images/photo.jpg" alt="照片">
```

#### alt 属性（重要）
```html
<!-- 描述性alt文本 -->
<img src="cat.jpg" alt="一只橘色的小猫坐在窗台上">

<!-- 装饰性图片 -->
<img src="decoration.jpg" alt="" role="presentation">

<!-- 信息性图片 -->
<img src="chart.png" alt="销售数据图表：第一季度增长15%">
```

#### 尺寸属性
```html
<!-- 固定尺寸 -->
<img src="photo.jpg" alt="照片" width="400" height="300">

<!-- 保持比例 -->
<img src="photo.jpg" alt="照片" width="400">

<!-- 响应式尺寸 -->
<img src="photo.jpg" alt="照片" style="width: 100%; max-width: 500px;">
```

### 响应式图片

#### srcset 和 sizes 属性
```html
<!-- 不同分辨率的图片 -->
<img src="small.jpg" 
     alt="响应式图片"
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w"
     sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px">

<!-- 不同像素密度的图片 -->
<img src="photo.jpg" 
     alt="高分辨率图片"
     srcset="photo.jpg 1x, photo@2x.jpg 2x, photo@3x.jpg 3x">
```

#### picture 元素
```html
<picture>
    <!-- 支持WebP格式的浏览器 -->
    <source srcset="image.webp" type="image/webp">
    
    <!-- 支持AVIF格式的浏览器 -->
    <source srcset="image.avif" type="image/avif">
    
    <!-- 默认图片 -->
    <img src="image.jpg" alt="图片描述">
</picture>

<!-- 响应式图片 -->
<picture>
    <source media="(max-width: 600px)" srcset="small.jpg">
    <source media="(max-width: 900px)" srcset="medium.jpg">
    <img src="large.jpg" alt="响应式图片">
</picture>
```

### 图片优化技巧
```html
<!-- 懒加载 -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     alt="图片" 
     loading="lazy">

<!-- 预加载重要图片 -->
<link rel="preload" as="image" href="hero-image.jpg">

<!-- 图片压缩和格式选择 -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="图片">
</picture>
```

## 🎵 音频元素

### 基本音频标签
```html
<!-- 基本音频播放器 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>

<!-- 带属性的音频 -->
<audio controls preload="metadata" loop>
    <source src="music.mp3" type="audio/mpeg">
    您的浏览器不支持音频播放。
</audio>
```

### 音频属性详解
```html
<!-- 自动播放（注意：现代浏览器通常阻止自动播放） -->
<audio autoplay muted>
    <source src="background-music.mp3" type="audio/mpeg">
</audio>

<!-- 预加载设置 -->
<audio controls preload="auto">
    <source src="audio.mp3" type="audio/mpeg">
</audio>

<!-- 循环播放 -->
<audio controls loop>
    <source src="music.mp3" type="audio/mpeg">
</audio>
```

### 音频格式支持
```html
<audio controls>
    <!-- MP3格式（广泛支持） -->
    <source src="audio.mp3" type="audio/mpeg">
    
    <!-- OGG格式（开源，体积小） -->
    <source src="audio.ogg" type="audio/ogg">
    
    <!-- WAV格式（无损，体积大） -->
    <source src="audio.wav" type="audio/wav">
    
    <!-- 后备文本 -->
    <p>您的浏览器不支持HTML5音频播放。</p>
    <p><a href="audio.mp3">下载音频文件</a></p>
</audio>
```

### 音频事件和API
```html
<audio id="myAudio" controls>
    <source src="audio.mp3" type="audio/mpeg">
</audio>

<script>
const audio = document.getElementById('myAudio');

// 播放事件
audio.addEventListener('play', () => {
    console.log('音频开始播放');
});

// 暂停事件
audio.addEventListener('pause', () => {
    console.log('音频已暂停');
});

// 结束事件
audio.addEventListener('ended', () => {
    console.log('音频播放结束');
});

// 音量变化
audio.addEventListener('volumechange', () => {
    console.log('音量已改变');
});
</script>
```

## 🎬 视频元素

### 基本视频标签
```html
<!-- 基本视频播放器 -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频播放。
</video>

<!-- 带海报的视频 -->
<video controls poster="poster.jpg">
    <source src="video.mp4" type="video/mp4">
</video>
```

### 视频属性详解
```html
<!-- 自动播放（静音状态） -->
<video autoplay muted loop>
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 预加载设置 -->
<video controls preload="metadata">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 控制条和尺寸 -->
<video controls width="100%" height="auto" style="max-width: 800px;">
    <source src="video.mp4" type="video/mp4">
</video>
```

### 视频格式支持
```html
<video controls>
    <!-- MP4格式（H.264编码，广泛支持） -->
    <source src="video.mp4" type="video/mp4">
    
    <!-- WebM格式（开源，体积小） -->
    <source src="video.webm" type="video/webm">
    
    <!-- OGV格式（开源） -->
    <source src="video.ogv" type="video/ogg">
    
    <!-- 后备内容 -->
    <p>您的浏览器不支持HTML5视频播放。</p>
    <p><a href="video.mp4">下载视频文件</a></p>
</video>
```

### 视频控制API
```html
<video id="myVideo" controls>
    <source src="video.mp4" type="video/mp4">
</video>

<div class="custom-controls">
    <button onclick="playVideo()">播放</button>
    <button onclick="pauseVideo()">暂停</button>
    <button onclick="stopVideo()">停止</button>
    <input type="range" min="0" max="100" value="0" onchange="setVolume(this.value)">
</div>

<script>
const video = document.getElementById('myVideo');

function playVideo() {
    video.play();
}

function pauseVideo() {
    video.pause();
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

function setVolume(value) {
    video.volume = value / 100;
}

// 视频事件监听
video.addEventListener('loadedmetadata', () => {
    console.log('视频元数据已加载');
});

video.addEventListener('canplay', () => {
    console.log('视频可以开始播放');
});
</script>
```

## 🎨 画布元素

### 基本画布
```html
<!-- 基本画布 -->
<canvas id="myCanvas" width="400" height="300"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
</script>
```

### 画布绘图示例
```html
<canvas id="drawingCanvas" width="600" height="400"></canvas>

<script>
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// 绘制渐变背景
const gradient = ctx.createLinearGradient(0, 0, 600, 400);
gradient.addColorStop(0, '#ff6b6b');
gradient.addColorStop(1, '#4ecdc4');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 600, 400);

// 绘制文本
ctx.font = '48px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.fillText('Hello Canvas!', 300, 200);

// 绘制路径
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 150);
ctx.lineTo(150, 250);
ctx.closePath();
ctx.strokeStyle = 'white';
ctx.lineWidth = 3;
ctx.stroke();
</script>
```

## 📱 响应式多媒体

### 响应式图片
```html
<!-- 使用CSS的响应式图片 -->
<style>
.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}

.image-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}
</style>

<div class="image-container">
    <img src="large-image.jpg" alt="响应式图片" class="responsive-image">
</div>
```

### 响应式视频
```html
<!-- 响应式视频容器 -->
<style>
.video-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.video-container video {
    width: 100%;
    height: auto;
}

/* 16:9 宽高比 */
.video-container::before {
    content: '';
    display: block;
    padding-top: 56.25%; /* 9/16 = 0.5625 */
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<div class="video-container">
    <video controls>
        <source src="video.mp4" type="video/mp4">
    </video>
</div>
```

## 🔧 多媒体最佳实践

### 1. 性能优化
```html
<!-- 懒加载 -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     alt="图片" 
     loading="lazy"
     class="lazy-image">

<script>
// 懒加载实现
const lazyImages = document.querySelectorAll('.lazy-image');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

### 2. 可访问性
```html
<!-- 为视频添加字幕 -->
<video controls>
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文">
    <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
</video>

<!-- 为音频添加描述 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <p>这是一段关于自然风光的音频描述，包含鸟叫声、流水声等自然音效。</p>
</audio>
```

### 3. 错误处理
```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    
    <!-- 优雅降级 -->
    <div class="video-fallback">
        <p>您的浏览器不支持HTML5视频播放。</p>
        <p>请尝试以下方式：</p>
        <ul>
            <li><a href="video.mp4">下载MP4格式</a></li>
            <li><a href="video.webm">下载WebM格式</a></li>
            <li>升级到支持HTML5的现代浏览器</li>
        </ul>
    </div>
</video>
```

## 🎯 实践示例

### 多媒体画廊
```html
<div class="media-gallery">
    <h2>多媒体画廊</h2>
    
    <!-- 图片展示 -->
    <section class="image-section">
        <h3>图片展示</h3>
        <div class="image-grid">
            <figure>
                <img src="image1.jpg" alt="风景照片1" loading="lazy">
                <figcaption>美丽的风景</figcaption>
            </figure>
            <figure>
                <img src="image2.jpg" alt="风景照片2" loading="lazy">
                <figcaption>壮丽的山脉</figcaption>
            </figure>
        </div>
    </section>
    
    <!-- 音频播放器 -->
    <section class="audio-section">
        <h3>音频播放</h3>
        <audio controls preload="metadata">
            <source src="music.mp3" type="audio/mpeg">
            <source src="music.ogg" type="audio/ogg">
        </audio>
    </section>
    
    <!-- 视频播放器 -->
    <section class="video-section">
        <h3>视频播放</h3>
        <video controls poster="video-poster.jpg">
            <source src="video.mp4" type="video/mp4">
            <source src="video.webm" type="video/webm">
        </video>
    </section>
    
    <!-- 交互式画布 -->
    <section class="canvas-section">
        <h3>交互式画布</h3>
        <canvas id="interactiveCanvas" width="400" height="300"></canvas>
        <div class="canvas-controls">
            <button onclick="clearCanvas()">清空</button>
            <button onclick="drawRandom()">随机绘制</button>
        </div>
    </section>
</div>

<style>
.media-gallery {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

figure {
    margin: 0;
    text-align: center;
}

figure img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

figcaption {
    margin-top: 10px;
    font-style: italic;
    color: #666;
}

.audio-section, .video-section, .canvas-section {
    margin: 30px 0;
}

video, audio {
    max-width: 100%;
}

.canvas-controls {
    margin-top: 10px;
    text-align: center;
}

.canvas-controls button {
    margin: 0 10px;
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.canvas-controls button:hover {
    background: #0056b3;
}
</style>

<script>
// 交互式画布功能
const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRandom() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 50 + 10;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

// 鼠标绘制功能
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}
</script>
```

## 📚 重要概念

1. **性能优化** - 使用懒加载、压缩格式、响应式图片
2. **可访问性** - 提供alt文本、字幕、描述等
3. **格式兼容** - 提供多种格式的后备方案
4. **用户体验** - 控制自动播放、预加载等行为

## ⚠️ 常见错误

- 忘记添加alt属性
- 不提供后备内容
- 使用过大的媒体文件
- 忽略移动端优化

## 🔗 相关资源

- **[MDN - HTML多媒体](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding)** - HTML多媒体元素完整指南
- **[W3C - HTML5多媒体](https://www.w3.org/TR/html52/semantics-embedded-content.html)** - HTML5多媒体规范
- **[响应式图片指南](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)** - 创建响应式图片的最佳实践
- **[HTML5音频和视频](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)** - 音频和视频元素使用指南
- **[Canvas绘图教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)** - Canvas 2D绘图API教程
- **[WebP和AVIF格式](https://developers.google.com/speed/webp)** - 现代图片格式介绍

---

**恭喜！你已经完成了HTML部分的学习！** 🎉

**下一步：开始学习 [CSS样式](../css/)** ➡️ 