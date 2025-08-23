# HTML 多媒体元素

HTML5提供了丰富的多媒体元素，让网页能够展示图片、音频、视频等多媒体内容，提升用户体验。

## 图片元素

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

<!-- 预加载关键图片 -->
<link rel="preload" as="image" href="hero-image.jpg">

<!-- 图片压缩和格式选择 -->
<img src="image.webp" alt="WebP格式图片" 
     onerror="this.src='image.jpg'">
```

## 音频元素

### 基本音频标签
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    您的浏览器不支持音频元素。
</audio>
```

### 音频属性
```html
<!-- 自动播放（需要用户交互） -->
<audio autoplay muted>
    <source src="background-music.mp3" type="audio/mpeg">
</audio>

<!-- 循环播放 -->
<audio loop>
    <source src="loop-music.mp3" type="audio/mpeg">
</audio>

<!-- 预加载 -->
<audio preload="auto">
    <source src="audio.mp3" type="audio/mpeg">
</audio>
```

### 音频控制
```html
<audio id="myAudio" controls>
    <source src="song.mp3" type="audio/mpeg">
</audio>

<script>
const audio = document.getElementById('myAudio');

// 播放
audio.play();

// 暂停
audio.pause();

// 设置音量
audio.volume = 0.5;

// 跳转到指定时间
audio.currentTime = 30;
</script>
```

## 视频元素

### 基本视频标签
```html
<video controls width="400" height="300">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogg" type="video/ogg">
    您的浏览器不支持视频元素。
</video>
```

### 视频属性
```html
<!-- 自动播放（静音状态） -->
<video autoplay muted loop>
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 预加载和海报 -->
<video preload="metadata" poster="video-poster.jpg">
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 响应式视频 -->
<video style="width: 100%; height: auto;">
    <source src="video.mp4" type="video/mp4">
</video>
```

### 视频控制
```html
<video id="myVideo" controls>
    <source src="movie.mp4" type="video/mp4">
</video>

<script>
const video = document.getElementById('myVideo');

// 播放
video.play();

// 暂停
video.pause();

// 设置播放速度
video.playbackRate = 1.5;

// 全屏播放
video.requestFullscreen();
</script>
```

## 嵌入媒体

### iframe 嵌入
```html
<!-- 嵌入YouTube视频 -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID"
        frameborder="0" 
        allowfullscreen>
</iframe>

<!-- 嵌入地图 -->
<iframe width="600" height="450" 
        src="https://maps.google.com/maps?q=beijing&output=embed">
</iframe>

<!-- 嵌入PDF -->
<iframe src="document.pdf" width="100%" height="600px">
</iframe>
```

### object 和 embed 标签
```html
<!-- 嵌入Flash内容（已过时） -->
<object data="animation.swf" type="application/x-shockwave-flash">
    <param name="movie" value="animation.swf">
    <param name="quality" value="high">
</object>

<!-- 嵌入Java小程序 -->
<object classid="java:MyApp.class" 
        width="300" height="200">
    <param name="code" value="MyApp.class">
</object>
```

## 画布元素

### Canvas 基础
```html
<canvas id="myCanvas" width="400" height="300">
    您的浏览器不支持Canvas元素。
</canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 150, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();
</script>
```

### SVG 图形
```html
<svg width="200" height="200">
    <!-- 矩形 -->
    <rect x="10" y="10" width="80" height="80" fill="red"/>
    
    <!-- 圆形 -->
    <circle cx="150" cy="50" r="40" fill="blue"/>
    
    <!-- 线条 -->
    <line x1="10" y1="150" x2="190" y2="150" 
          stroke="green" stroke-width="3"/>
</svg>
```

## 移动端优化

### 触摸友好的媒体
```html
<!-- 触摸友好的视频控制 -->
<video controls playsinline>
    <source src="video.mp4" type="video/mp4">
</video>

<!-- 移动端优化的图片 -->
<img src="mobile-image.jpg" alt="移动端图片"
     style="max-width: 100%; height: auto;">

<!-- 响应式iframe -->
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
    <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/VIDEO_ID">
    </iframe>
</div>
```

## 性能优化

### 媒体加载优化
```html
<!-- 延迟加载非关键媒体 -->
<img src="placeholder.jpg" 
     data-src="actual-image.jpg" 
     loading="lazy">

<!-- 预加载关键媒体 -->
<link rel="preload" as="video" href="hero-video.mp4">

<!-- 使用WebP等现代格式 -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="图片">
</picture>
```

### 媒体压缩
```html
<!-- 使用压缩后的媒体文件 -->
<img src="image-compressed.jpg" alt="压缩图片">

<!-- 提供多种质量选择 -->
<video>
    <source src="video-hd.mp4" type="video/mp4" media="(min-width: 800px)">
    <source src="video-sd.mp4" type="video/mp4">
</video>
```

## 最佳实践

1. **选择合适的格式** - 根据用途选择最佳媒体格式
2. **优化文件大小** - 压缩媒体文件以提高加载速度
3. **提供替代方案** - 为不支持的元素提供后备内容
4. **考虑可访问性** - 添加alt、title等描述性属性
5. **移动端友好** - 确保在各种设备上都能正常显示
6. **性能优先** - 使用懒加载和预加载技术 