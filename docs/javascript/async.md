# JavaScript 异步编程

异步编程是JavaScript中处理非阻塞操作的核心概念，它允许程序在等待某些操作完成时继续执行其他任务。

## 异步编程基础

### 1. 什么是异步编程
异步编程是一种编程模式，允许程序在等待某些操作（如网络请求、文件读取、定时器）完成时继续执行其他代码。

```javascript
// 同步操作 - 阻塞执行
console.log("开始");
const result = heavyCalculation(); // 阻塞程序执行
console.log("结果:", result);
console.log("结束");

// 异步操作 - 非阻塞执行
console.log("开始");
setTimeout(() => {
    console.log("异步操作完成");
}, 1000);
console.log("结束");

// 输出顺序：
// 开始
// 结束
// 异步操作完成（1秒后）
```

### 2. 为什么需要异步编程
- **用户体验**：避免界面冻结
- **性能优化**：充分利用系统资源
- **并发处理**：同时处理多个任务
- **响应性**：保持程序响应能力

## 回调函数

### 1. 基本回调模式
```javascript
// 简单的回调函数
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "张三", age: 25 };
        callback(null, data);
    }, 1000);
}

// 使用回调
fetchData((error, data) => {
    if (error) {
        console.error("错误:", error);
        return;
    }
    console.log("数据:", data);
});

// 错误处理回调
function fetchDataWithError(callback) {
    setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
            callback(new Error("随机错误"), null);
        } else {
            const data = { id: 1, name: "李四", age: 30 };
            callback(null, data);
        }
    }, 1000);
}

fetchDataWithError((error, data) => {
    if (error) {
        console.error("获取数据失败:", error.message);
        return;
    }
    console.log("获取数据成功:", data);
});
```

### 2. 回调地狱问题
```javascript
// 回调地狱示例
fetchUser(123, (error, user) => {
    if (error) {
        console.error("获取用户失败:", error);
        return;
    }
    
    fetchUserPosts(user.id, (error, posts) => {
        if (error) {
            console.error("获取文章失败:", error);
            return;
        }
        
        fetchUserProfile(user.id, (error, profile) => {
            if (error) {
                console.error("获取资料失败:", error);
                return;
            }
            
            console.log("用户信息:", { user, posts, profile });
        });
    });
});

// 解决方案：命名函数
function handleUserData(userId) {
    fetchUser(userId, handleUser);
}

function handleUser(error, user) {
    if (error) {
        console.error("获取用户失败:", error);
        return;
    }
    fetchUserPosts(user.id, handlePosts);
}

function handlePosts(error, posts) {
    if (error) {
        console.error("获取文章失败:", error);
        return;
    }
    fetchUserProfile(user.id, handleProfile);
}

function handleProfile(error, profile) {
    if (error) {
        console.error("获取资料失败:", error);
        return;
    }
    console.log("用户信息:", { user, posts, profile });
}
```

## 🔄 Promise

### 1. 基本概念
Promise是一个代表异步操作最终完成或失败的对象，它有三种状态：
- **Pending（待定）**：初始状态
- **Fulfilled（已兑现）**：操作成功完成
- **Rejected（已拒绝）**：操作失败

```javascript
// 创建Promise
const myPromise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
            resolve(`成功！随机数: ${random}`);
        } else {
            reject(new Error(`失败！随机数: ${random}`));
        }
    }, 1000);
});

// 使用Promise
myPromise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.error("失败:", error.message);
    });
```

### 2. Promise链式调用
```javascript
// 链式调用示例
fetchUser(123)
    .then(user => {
        console.log("用户:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("文章:", posts);
        return fetchUserProfile(user.id);
    })
    .then(profile => {
        console.log("资料:", profile);
        return { user, posts, profile };
    })
    .catch(error => {
        console.error("任何步骤失败:", error);
    });

// 实际实现
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "张三", age: 25 });
            } else {
                reject(new Error("用户ID无效"));
            }
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "第一篇文章", content: "内容..." },
                { id: 2, title: "第二篇文章", content: "内容..." }
            ]);
        }, 500);
    });
}

function fetchUserProfile(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                bio: "热爱编程的前端开发者",
                location: "北京",
                skills: ["JavaScript", "React", "Node.js"]
            });
        }, 800);
    });
}
```

### 3. Promise静态方法
```javascript
// Promise.all - 并行执行多个Promise
const promises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
];

Promise.all(promises)
    .then(users => {
        console.log("所有用户:", users);
    })
    .catch(error => {
        console.error("获取用户失败:", error);
    });

// Promise.race - 竞态，返回最先完成的Promise
const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("超时")), 5000);
});

Promise.race([fetchUser(1), timeoutPromise])
    .then(user => {
        console.log("用户数据:", user);
    })
    .catch(error => {
        console.error("错误:", error.message);
    });

// Promise.allSettled - 等待所有Promise完成（无论成功失败）
const promises2 = [
    Promise.resolve("成功1"),
    Promise.reject(new Error("失败1")),
    Promise.resolve("成功2")
];

Promise.allSettled(promises2)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} 成功:`, result.value);
            } else {
                console.log(`Promise ${index} 失败:`, result.reason);
            }
        });
    });

// Promise.any - 返回第一个成功的Promise
Promise.any([
    Promise.reject(new Error("失败1")),
    Promise.reject(new Error("失败2")),
    Promise.resolve("成功")
])
.then(result => {
    console.log("至少有一个成功:", result);
})
.catch(error => {
    console.error("全部失败:", error);
});
```

## ⚡ async/await

### 1. 基本语法
async/await是Promise的语法糖，让异步代码看起来像同步代码。

```javascript
// 基本用法
async function fetchUserData(userId) {
    try {
        const user = await fetchUser(userId);
        console.log("用户:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("文章:", posts);
        
        const profile = await fetchUserProfile(user.id);
        console.log("资料:", profile);
        
        return { user, posts, profile };
    } catch (error) {
        console.error("获取数据失败:", error);
        throw error;
    }
}

// 调用异步函数
fetchUserData(123)
    .then(data => {
        console.log("完整数据:", data);
    })
    .catch(error => {
        console.error("最终错误:", error);
    });

// 立即执行的异步函数
(async () => {
    try {
        const data = await fetchUserData(123);
        console.log("数据获取成功:", data);
    } catch (error) {
        console.error("数据获取失败:", error);
    }
})();
```

### 2. 并行执行
```javascript
// 串行执行（慢）
async function fetchDataSequential() {
    const start = Date.now();
    
    const user = await fetchUser(1);
    const posts = await fetchUserPosts(1);
    const profile = await fetchUserProfile(1);
    
    const end = Date.now();
    console.log(`串行执行时间: ${end - start}ms`);
    
    return { user, posts, profile };
}

// 并行执行（快）
async function fetchDataParallel() {
    const start = Date.now();
    
    const [user, posts, profile] = await Promise.all([
        fetchUser(1),
        fetchUserPosts(1),
        fetchUserProfile(1)
    ]);
    
    const end = Date.now();
    console.log(`并行执行时间: ${end - start}ms`);
    
    return { user, posts, profile };
}

// 混合执行
async function fetchDataMixed() {
    const user = await fetchUser(1);
    
    // 并行获取相关数据
    const [posts, profile] = await Promise.all([
        fetchUserPosts(user.id),
        fetchUserProfile(user.id)
    ]);
    
    return { user, posts, profile };
}
```

### 3. 错误处理
```javascript
// 基本错误处理
async function handleErrors() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        console.error("操作失败:", error);
        throw error;
    }
}

// 分类错误处理
async function handleSpecificErrors() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        if (error.name === 'NetworkError') {
            console.log("网络错误，重试中...");
            return retryOperation();
        } else if (error.name === 'ValidationError') {
            console.log("验证错误:", error.message);
            throw error;
        } else if (error.name === 'TimeoutError') {
            console.log("超时错误，使用默认值");
            return getDefaultValue();
        }
        throw error;
    }
}

// 错误边界
async function withErrorBoundary(operation) {
    try {
        return await operation();
    } catch (error) {
        console.error("操作失败:", error);
        // 记录错误日志
        logError(error);
        // 返回默认值或重新抛出
        return null;
    }
}
```

## 🔄 实际应用场景

### 1. API调用
```javascript
// 封装API调用
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API调用失败 ${endpoint}:`, error);
            throw error;
        }
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// 使用API服务
const api = new ApiService('https://api.example.com');

async function createUser(userData) {
    try {
        const user = await api.post('/users', userData);
        console.log("用户创建成功:", user);
        return user;
    } catch (error) {
        console.error("创建用户失败:", error);
        throw error;
    }
}

async function getUserWithPosts(userId) {
    try {
        const [user, posts] = await Promise.all([
            api.get(`/users/${userId}`),
            api.get(`/users/${userId}/posts`)
        ]);
        
        return { user, posts };
    } catch (error) {
        console.error("获取用户数据失败:", error);
        throw error;
    }
}
```

### 2. 文件操作
```javascript
// 读取文件
async function readFile(filePath) {
    try {
        const response = await fetch(filePath);
        const content = await response.text();
        return content;
    } catch (error) {
        console.error("读取文件失败:", error);
        throw error;
    }
}

// 批量读取文件
async function readMultipleFiles(filePaths) {
    try {
        const filePromises = filePaths.map(path => readFile(path));
        const contents = await Promise.all(filePromises);
        
        return filePaths.map((path, index) => ({
            path,
            content: contents[index]
        }));
    } catch (error) {
        console.error("批量读取文件失败:", error);
        throw error;
    }
}

// 文件上传
async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`上传失败: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("文件上传失败:", error);
        throw error;
    }
}
```

### 3. 定时器和动画
```javascript
// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 动画序列
async function animateSequence() {
    const element = document.getElementById('animated');
    
    try {
        // 淡入
        element.style.opacity = '0';
        element.style.display = 'block';
        
        for (let i = 0; i <= 10; i++) {
            element.style.opacity = (i / 10).toString();
            await delay(50);
        }
        
        // 等待
        await delay(1000);
        
        // 移动
        for (let i = 0; i <= 100; i++) {
            element.style.transform = `translateX(${i}px)`;
            await delay(20);
        }
        
        // 淡出
        for (let i = 10; i >= 0; i--) {
            element.style.opacity = (i / 10).toString();
            await delay(50);
        }
        
        element.style.display = 'none';
        console.log("动画完成");
        
    } catch (error) {
        console.error("动画执行失败:", error);
    }
}

// 轮询
async function pollForUpdates(interval = 5000, maxAttempts = 10) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            const updates = await checkForUpdates();
            
            if (updates.length > 0) {
                console.log("发现更新:", updates);
                return updates;
            }
            
            console.log(`第${attempts + 1}次检查，无更新`);
            await delay(interval);
            attempts++;
            
        } catch (error) {
            console.error("检查更新失败:", error);
            attempts++;
            await delay(interval);
        }
    }
    
    console.log("达到最大尝试次数，停止轮询");
    return [];
}
```

## 💡 最佳实践

### 1. 错误处理策略
```javascript
// 统一的错误处理
class AsyncErrorHandler {
    static async withRetry(operation, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                console.log(`尝试 ${attempt} 失败:`, error.message);
                
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay * attempt));
                }
            }
        }
        
        throw new Error(`操作失败，已重试 ${maxRetries} 次: ${lastError.message}`);
    }
    
    static async withTimeout(operation, timeout = 5000) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("操作超时")), timeout);
        });
        
        return Promise.race([operation(), timeoutPromise]);
    }
    
    static async withFallback(operation, fallback) {
        try {
            return await operation();
        } catch (error) {
            console.log("主要操作失败，使用备用方案:", error.message);
            return fallback();
        }
    }
}

// 使用示例
const result = await AsyncErrorHandler.withRetry(
    () => fetchUser(123),
    3,
    1000
);

const data = await AsyncErrorHandler.withTimeout(
    () => fetchUser(123),
    3000
);

const user = await AsyncErrorHandler.withFallback(
    () => fetchUser(123),
    () => getDefaultUser()
);
```

### 2. 性能优化
```javascript
// 缓存异步结果
class AsyncCache {
    constructor() {
        this.cache = new Map();
        this.pending = new Map();
    }
    
    async get(key, operation) {
        // 检查缓存
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        // 检查是否正在执行
        if (this.pending.has(key)) {
            return this.pending.get(key);
        }
        
        // 执行操作并缓存
        const promise = operation().then(result => {
            this.cache.set(key, result);
            this.pending.delete(key);
            return result;
        });
        
        this.pending.set(key, promise);
        return promise;
    }
    
    clear() {
        this.cache.clear();
        this.pending.clear();
    }
}

// 使用缓存
const cache = new AsyncCache();

async function getUserWithCache(userId) {
    return cache.get(`user_${userId}`, () => fetchUser(userId));
}

// 批量处理
async function processBatch(items, processor, batchSize = 5) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchPromises = batch.map(item => processor(item));
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // 添加延迟避免过载
        if (i + batchSize < items.length) {
            await delay(100);
        }
    }
    
    return results;
}
```

## 🎯 总结

异步编程是JavaScript中处理非阻塞操作的核心技术：

1. **基础概念** - 异步编程原理、回调函数
2. **Promise** - 状态管理、链式调用、静态方法
3. **async/await** - 语法糖、并行执行、错误处理
4. **实际应用** - API调用、文件操作、定时器动画
5. **最佳实践** - 错误处理策略、性能优化

## 📖 延伸阅读

- **[MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)** - Promise 对象详解
- **[MDN - async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)** - 异步函数语法
- **[MDN - 事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)** - JavaScript 事件循环机制
- **[Promise A+ 规范](https://tsejx.github.io/javascript-guidebook/standard-built-in-objects/control-abstraction-objects/promise-standard/)** - Promise 标准规范
- **[异步编程最佳实践](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous)** - MDN 异步编程指南

掌握这些异步编程技术，将使你能够构建高效、响应式的JavaScript应用程序！ 