# JavaScript 异步编程模式

## 概述
异步编程是JavaScript中处理非阻塞操作的核心概念，它允许程序在等待某些操作完成时继续执行其他任务。掌握异步编程模式对于构建高性能、响应式的Web应用至关重要。

## 学习目标
- 理解异步编程的基本概念和原理
- 掌握Promise、async/await的使用方法
- 学会处理异步操作的错误和并发
- 为理解现代前端框架的异步机制打下基础

## 异步编程基础

### 什么是异步编程
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

### 为什么需要异步编程
- **用户体验**：避免界面冻结
- **性能优化**：充分利用系统资源
- **并发处理**：同时处理多个任务
- **响应性**：保持程序响应能力

## 回调函数模式

### 基本回调模式
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
```

### 回调地狱问题
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
```

**问题：** 代码嵌套过深，难以维护和阅读

## Promise 模式

### 基本用法
```javascript
// 创建Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
            resolve(`成功：${random}`);
        } else {
            reject(new Error(`失败：${random}`));
        }
    }, 1000);
});

// 使用Promise
promise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("失败:", error.message);
    });
```

### Promise 链式调用
```javascript
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: "张三", age: 25 });
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "第一篇文章" },
                { id: 2, title: "第二篇文章" }
            ]);
        }, 1000);
    });
}

function fetchUserProfile(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ bio: "热爱编程", skills: ["JavaScript", "Python"] });
        }, 1000);
    });
}

// 链式调用
fetchUser(1)
    .then(user => {
        console.log("用户信息:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("用户文章:", posts);
        return fetchUserProfile(1);
    })
    .then(profile => {
        console.log("用户资料:", profile);
    })
    .catch(error => {
        console.error("错误:", error);
    });
```

### Promise 静态方法

#### Promise.all
```javascript
// 并行执行多个Promise，等待所有完成
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
```

#### Promise.race
```javascript
// 竞态：返回最先完成的Promise
const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("超时")), 5000);
});

Promise.race([fetchUser(1), timeout])
    .then(user => {
        console.log("用户信息:", user);
    })
    .catch(error => {
        console.error("错误:", error.message);
    });
```

#### Promise.allSettled
```javascript
// 等待所有Promise完成（无论成功或失败）
const promises = [
    Promise.resolve(1),
    Promise.reject(new Error("失败")),
    Promise.resolve(3)
];

Promise.allSettled(promises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} 成功:`, result.value);
            } else {
                console.log(`Promise ${index} 失败:`, result.reason);
            }
        });
    });
```

## async/await 模式

### 基本用法
```javascript
// 使用async/await重写Promise链式调用
async function getUserInfo(userId) {
    try {
        const user = await fetchUser(userId);
        console.log("用户信息:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("用户文章:", posts);
        
        const profile = await fetchUserProfile(user.id);
        console.log("用户资料:", profile);
        
        return { user, posts, profile };
    } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
    }
}

// 调用异步函数
getUserInfo(1)
    .then(result => {
        console.log("完整结果:", result);
    })
    .catch(error => {
        console.error("最终错误:", error);
    });
```

### 并行执行
```javascript
// 串行执行（慢）
async function getUsersSequential(userIds) {
    const users = [];
    for (const id of userIds) {
        const user = await fetchUser(id);
        users.push(user);
    }
    return users;
}

// 并行执行（快）
async function getUsersParallel(userIds) {
    const userPromises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(userPromises);
    return users;
}

// 使用示例
const userIds = [1, 2, 3, 4, 5];

console.time("串行执行");
await getUsersSequential(userIds);
console.timeEnd("串行执行");

console.time("并行执行");
await getUsersParallel(userIds);
console.timeEnd("并行执行");
```

### 错误处理
```javascript
async function handleErrors() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        if (error.name === 'NetworkError') {
            console.log('网络错误，重试中...');
            return retryOperation();
        } else if (error.name === 'ValidationError') {
            console.log('验证错误:', error.message);
            throw error;
        } else {
            console.log('未知错误:', error.message);
            throw error;
        }
    }
}

// 多个异步操作的错误处理
async function multipleOperations() {
    try {
        const [user, posts] = await Promise.all([
            fetchUser(1),
            fetchUserPosts(1)
        ]);
        
        return { user, posts };
    } catch (error) {
        console.error("操作失败:", error);
        // 返回默认值或重新抛出错误
        throw error;
    }
}
```

## 异步操作的最佳实践

### 超时处理
```javascript
// 为Promise添加超时功能
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`操作超时（${timeoutMs}ms）`));
        }, timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
}

// 使用超时
const userPromise = fetchUser(1);
const userWithTimeout = withTimeout(userPromise, 5000);

userWithTimeout
    .then(user => console.log("用户:", user))
    .catch(error => console.error("错误:", error.message));
```

### 重试机制
```javascript
// 实现重试功能
async function retry(operation, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            
            console.log(`尝试 ${attempt} 失败，${delay}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// 使用重试
const result = await retry(
    () => fetchUser(1),
    3,
    1000
);
```

### 并发控制
```javascript
// 限制并发数量
async function limitConcurrency(tasks, maxConcurrency = 3) {
    const results = [];
    const executing = new Set();
    
    for (const task of tasks) {
        const promise = task();
        results.push(promise);
        
        executing.add(promise);
        promise.then(() => executing.delete(promise));
        
        if (executing.size >= maxConcurrency) {
            await Promise.race(executing);
        }
    }
    
    return Promise.all(results);
}

// 使用并发控制
const tasks = [
    () => fetchUser(1),
    () => fetchUser(2),
    () => fetchUser(3),
    () => fetchUser(4),
    () => fetchUser(5)
];

const results = await limitConcurrency(tasks, 2);
console.log("结果:", results);
```

## 异步迭代器

### 基本用法
```javascript
// 异步迭代器
async function* asyncGenerator() {
    yield await fetchUser(1);
    yield await fetchUser(2);
    yield await fetchUser(3);
}

// 使用for await...of
async function processUsers() {
    for await (const user of asyncGenerator()) {
        console.log("处理用户:", user);
    }
}

// 异步数组迭代
async function* asyncArrayGenerator(array) {
    for (const item of array) {
        yield await processItem(item);
    }
}
```

### 实际应用
```javascript
// 分页获取数据
async function* paginatedData(pageSize = 10) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const data = await fetchPage(page, pageSize);
        yield data;
        
        hasMore = data.length === pageSize;
        page++;
    }
}

// 使用分页生成器
async function processAllData() {
    for await (const pageData of paginatedData(20)) {
        console.log("处理页面数据:", pageData);
        // 处理每一页的数据
    }
}
```

## 面试重点

### 核心概念
1. **事件循环：** 理解JavaScript的单线程异步执行模型
2. **Promise状态：** pending、fulfilled、rejected三种状态
3. **微任务和宏任务：** 任务队列的执行优先级
4. **async/await：** 基于Promise的语法糖

### 常见问题
1. **回调地狱：** 使用Promise或async/await解决
2. **错误处理：** try-catch、Promise.catch、错误边界
3. **并发控制：** Promise.all、Promise.race、自定义并发限制
4. **性能优化：** 并行执行、超时处理、重试机制

### 实际应用
1. **API调用：** 处理网络请求的异步操作
2. **文件操作：** 异步读写文件
3. **定时器：** setTimeout、setInterval的异步处理
4. **事件处理：** 用户交互的异步响应

## 实践练习

### 基础练习
1. 使用回调函数处理异步操作
2. 将回调函数转换为Promise
3. 使用async/await重写Promise代码
4. 实现基本的错误处理机制

### 进阶练习
1. 实现Promise的并发控制
2. 设计异步操作的重试机制
3. 使用异步迭代器处理大量数据
4. 构建完整的异步错误处理系统

## 下一步

掌握异步编程模式后，建议学习：
- **[性能优化技巧](../performance/)** - 代码优化和性能提升
- **[工程化配置](../vue3/engineering.md)** - 项目构建和部署

继续学习，加油！🚀 