# 网络层面优化

## 📚 学习指导

**本章重点**：学习网络层面的性能优化策略，包括DNS、CDN、缓存、压缩等关键技术。

**学习目标**：
- 掌握DNS优化和预解析技术
- 理解CDN工作原理和配置优化
- 学会HTTP缓存策略和资源压缩

**前置知识**：建议先掌握 [问题分析和定位](./performance-analysis.md) 了解如何识别网络性能问题。

**后续学习**：掌握网络优化后，建议学习 [渲染层面优化](./rendering-optimization.md) 了解浏览器渲染优化技巧。

## 网络优化的重要性

网络层面是前端性能优化的第一道防线，直接影响页面的加载速度。据统计，网络传输时间通常占页面总加载时间的60-80%，因此网络优化是性能提升的关键。

## 1. DNS优化 ⚡ **技术重点**

### DNS预解析 (DNS Prefetch)

**原理**: 在用户点击链接前预先解析域名，减少DNS查询时间

**实现方式**:
```html
<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="dns-prefetch" href="//api.example.com">
<link rel="dns-prefetch" href="//static.example.com">

<!-- 预连接，包含DNS、TCP、TLS -->
<link rel="preconnect" href="https://cdn.example.com">
<link rel="preconnect" href="https://api.example.com" crossorigin>
```

**优化效果**:
```
DNS优化前后对比：
- 优化前：每次访问需要DNS查询 (50-200ms)
- 优化后：DNS预解析，减少等待时间
- 预期提升：页面加载速度提升10-15%
```

**使用场景**:
- 电商网站：预解析CDN域名
- 新闻网站：预解析图片服务器域名
- 应用网站：预解析API服务器域名

### DNS缓存策略

**浏览器DNS缓存**:
- Chrome: 默认缓存1分钟
- Firefox: 默认缓存1分钟
- Safari: 默认缓存1分钟

**操作系统DNS缓存**:
- Windows: 默认缓存24小时
- macOS: 默认缓存24小时
- Linux: 默认缓存24小时

**优化建议**:
```
DNS缓存优化策略：
1. 减少域名数量，增加缓存命中率
2. 合理设置TTL值，平衡缓存和更新
3. 使用CDN，利用边缘节点缓存
```

## 2. CDN (内容分发网络) 优化 🚀 **实战技能**

### CDN工作原理

**CDN架构**:
```
用户请求 → 边缘节点 → 源站服务器
    ↑           ↓
    ← 缓存内容 ←
```

**CDN优势**:
- 地理位置就近访问
- 减少网络延迟
- 分散源站压力
- 提供缓存加速

### CDN配置优化

**缓存策略设置**:
```nginx
# Nginx CDN配置示例
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary Accept-Encoding;
}

location ~* \.(html|htm)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

**实际案例**:
```
电商网站CDN优化：
- 优化前：图片加载时间 2.5秒
- 启用CDN后：图片加载时间 0.8秒
- 优化效果：加载速度提升68%
- 用户体验：页面加载更快，转化率提升12%
```

### CDN选择策略

**国内CDN服务商**:
- 阿里云CDN
- 腾讯云CDN
- 百度云CDN
- 七牛云CDN

**选择考虑因素**:
- 节点覆盖范围
- 价格成本
- 技术支持
- 功能特性

## 3. 浏览器缓存优化

### HTTP缓存头设置

**强缓存 (Cache-Control)**:
```http
# 静态资源强缓存
Cache-Control: public, max-age=31536000, immutable

# HTML页面协商缓存
Cache-Control: public, max-age=3600, must-revalidate

# API接口不缓存
Cache-Control: no-cache, no-store, must-revalidate
```

**协商缓存 (ETag/Last-Modified)**:
```http
# 使用ETag
ETag: "33a64df551"

# 使用Last-Modified
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
```

**缓存策略示例**:
```
不同类型资源的缓存策略：
1. HTML页面：协商缓存，1小时过期
2. CSS/JS文件：强缓存，1年过期
3. 图片文件：强缓存，1年过期
4. API接口：不缓存或短时间缓存
```

### Service Worker 缓存

**离线缓存策略**:
```javascript
// Service Worker 缓存配置
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**缓存更新策略**:
```javascript
// 缓存优先，网络更新策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, networkResponse.clone()));
            return networkResponse;
          });
        return cachedResponse || fetchPromise;
      })
  );
});
```

## 4. HTTP/2 优化

### HTTP/2 特性

**多路复用**:
- 单个连接处理多个请求
- 减少连接建立时间
- 提高并发性能

**服务器推送**:
```http
# 服务器推送关键资源
Link: </styles/main.css>; rel=preload; as=style
Link: </scripts/main.js>; rel=preload; as=script
```

**头部压缩**:
- HPACK压缩算法
- 减少重复头部信息
- 降低传输开销

### HTTP/2 配置

**Nginx配置示例**:
```nginx
server {
    listen 443 ssl http2;
    
    # 启用HTTP/2
    http2_push_preload on;
    
    # 服务器推送关键资源
    location = / {
        http2_push /styles/main.css;
        http2_push /scripts/main.js;
    }
}
```

**优化效果**:
```
HTTP/2 优化前后对比：
- 优化前：HTTP/1.1，6个并发连接
- 优化后：HTTP/2，单个连接多路复用
- 性能提升：页面加载速度提升20-30%
- 资源利用率：提高40%
```

## 5. 资源压缩优化

### Gzip 压缩

**压缩配置**:
```nginx
# Nginx Gzip配置
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

**压缩效果**:
```
Gzip压缩效果示例：
- CSS文件：原始大小 50KB，压缩后 15KB (压缩率70%)
- JavaScript文件：原始大小 100KB，压缩后 35KB (压缩率65%)
- HTML文件：原始大小 20KB，压缩后 8KB (压缩率60%)
- 总体效果：减少传输大小60-70%
```

### Brotli 压缩

**Brotli优势**:
- 比Gzip压缩率更高
- 现代浏览器支持
- 特别适合文本资源

**配置示例**:
```nginx
# Nginx Brotli配置
brotli on;
brotli_comp_level 6;
brotli_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;
```

## 6. 资源预加载优化

### 预加载策略

**关键资源预加载**:
```html
<!-- 预加载关键CSS -->
<link rel="preload" href="/styles/critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- 预加载关键JavaScript -->
<link rel="preload" href="/scripts/critical.js" as="script">

<!-- 预加载字体 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预加载图片 -->
<link rel="preload" href="/images/hero.jpg" as="image">
```

**预加载时机**:
```
预加载策略选择：
1. 关键资源：立即预加载
2. 重要资源：页面加载完成后预加载
3. 非关键资源：用户交互时预加载
4. 预测性预加载：基于用户行为预测
```

### 预加载效果

**性能提升数据**:
```
预加载优化效果：
- 关键CSS：加载时间减少40%
- 关键JavaScript：执行时间提前30%
- 字体文件：避免FOUT (字体闪烁)
- 总体效果：LCP提升25%，FCP提升20%
```

## 7. 网络请求优化

### 请求合并

**小文件合并**:
```javascript
// 合并多个小请求
const urls = [
  '/api/user/profile',
  '/api/user/settings',
  '/api/user/preferences'
];

// 使用Promise.all并发请求
Promise.all(urls.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => {
    // 处理合并后的数据
    console.log(data);
  });
```

**GraphQL优化**:
```graphql
# 单个请求获取多个数据
query UserData {
  user {
    id
    name
    email
    profile {
      avatar
      bio
    }
    settings {
      theme
      language
    }
  }
}
```

### 请求优先级

**资源优先级设置**:
```html
<!-- 高优先级资源 -->
<link rel="preload" href="/styles/critical.css" as="style">

<!-- 中优先级资源 -->
<link rel="preload" href="/images/hero.jpg" as="image">

<!-- 低优先级资源 -->
<link rel="preload" href="/scripts/analytics.js" as="script">
```

## 8. 移动网络优化

### 移动网络特点

**网络环境复杂**:
- 网络类型多样 (2G/3G/4G/5G/WiFi)
- 网络质量不稳定
- 延迟和丢包率高

**优化策略**:
```
移动网络优化策略：
1. 减少请求数量
2. 压缩传输数据
3. 使用CDN加速
4. 实现离线缓存
5. 优化图片加载
```

### 自适应优化

**网络感知加载**:
```javascript
// 检测网络状态
if ('connection' in navigator) {
  const connection = navigator.connection;
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // 低网速环境：加载低质量图片
    loadLowQualityImages();
  } else {
    // 高网速环境：加载高质量图片
    loadHighQualityImages();
  }
}
```

## 📚 学习总结

### 关键知识点回顾
1. **DNS优化**：预解析、预连接、缓存策略
2. **CDN优化**：架构原理、配置策略、缓存优化
3. **HTTP优化**：缓存策略、压缩技术、协议升级
4. **资源优化**：图片优化、代码分割、懒加载

### 面试重点 🔥
- DNS预解析和预连接的区别
- CDN的工作原理和优势
- HTTP缓存策略和Cache-Control头
- 资源压缩和代码分割技术

### 技术要点 ⚡
- **DNS技术**：预解析、预连接、缓存机制
- **CDN配置**：缓存策略、边缘节点、回源策略
- **HTTP优化**：缓存控制、压缩算法、协议选择

## 🚀 下一步学习

掌握了网络层面的优化策略后，您需要学习浏览器渲染层面的优化技巧：

**[渲染层面优化](./rendering-optimization.md)** - 学习DOM操作优化、CSS优化、JavaScript执行优化等渲染层面的性能提升方法。

这些优化技巧将帮助您：
- 减少页面重排重绘
- 优化JavaScript执行效率
- 提升用户交互响应速度 