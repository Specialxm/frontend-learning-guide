# JavaScript 函数编程

## 概述
函数是JavaScript中最重要的概念之一，它是一等公民，可以赋值给变量、作为参数传递、作为返回值。掌握函数编程是理解JavaScript高级特性的基础。

## 学习目标
- 理解函数的各种定义方式和调用方式
- 掌握参数处理、作用域和闭包概念
- 学会使用高阶函数和函数式编程技巧
- 为理解异步编程和模块化打下基础

## 函数基础

### 函数声明方式

#### 1. 函数声明（Function Declaration）
```javascript
function greet(name) {
    return `你好，${name}！`;
}
```
**特点：** 存在函数提升，可以在声明前调用

#### 2. 函数表达式（Function Expression）
```javascript
const greet = function(name) {
    return `你好，${name}！`;
};
```
**特点：** 不存在提升，必须先声明后调用

#### 3. 箭头函数（Arrow Function，ES6）
```javascript
const greet = (name) => {
    return `你好，${name}！`;
};

// 简写形式
const greet = name => `你好，${name}！`;
```
**特点：** 没有自己的`this`，不能作为构造函数，语法简洁

#### 4. 立即执行函数（IIFE）
```javascript
(function(name) {
    console.log(`你好，${name}！`);
})("张三");

// 箭头函数版本
((name) => {
    console.log(`你好，${name}！`);
})("李四");
```
**特点：** 创建独立作用域，避免全局污染

## 参数处理

### 基本参数
```javascript
function add(a, b) {
    return a + b;
}

console.log(add(1, 2)); // 3
```

### 默认参数（ES6）
```javascript
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet());           // 你好，访客！
console.log(greet("李四"));     // 你好，李四！
console.log(greet("王五", "欢迎")); // 欢迎，王五！
```

### 剩余参数（Rest Parameters，ES6）
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

function processUser(name, age, ...hobbies) {
    return `${name}，${age}岁，爱好：${hobbies.join('、')}`;
}

console.log(processUser("赵六", 25, "读书", "游泳", "编程"));
// 赵六，25岁，爱好：读书、游泳、编程
```

### 参数解构（ES6）
```javascript
function processUser({ name, age, city = "未知" }) {
    return `${name}，${age}岁，来自${city}`;
}

const user = { name: "赵六", age: 25 };
console.log(processUser(user)); // 赵六，25岁，来自未知

// 数组解构
function processArray([first, second, ...rest]) {
    return `第一个：${first}，第二个：${second}，其余：${rest}`;
}

console.log(processArray([1, 2, 3, 4, 5])); // 第一个：1，第二个：2，其余：3,4,5
```

## 函数作用域与闭包

### 作用域规则
```javascript
let globalVar = "全局变量";

function outer() {
    let outerVar = "外部变量";
    
    function inner() {
        let innerVar = "内部变量";
        console.log(globalVar);   // 可以访问全局变量
        console.log(outerVar);    // 可以访问外部变量
        console.log(innerVar);    // 可以访问内部变量
    }
    
    inner();
    // console.log(innerVar);    // 错误：无法访问内部变量
}

outer();
```

### 闭包（Closure）
```javascript
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**闭包的应用场景：**
- 数据私有化
- 函数工厂
- 模块模式
- 事件处理

### 闭包陷阱与解决方案
```javascript
// 常见陷阱：循环中的闭包
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 输出：3, 3, 3
    }, 1000);
}

// 解决方案1：使用let（推荐）
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 输出：0, 1, 2
    }, 1000);
}

// 解决方案2：使用IIFE
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index); // 输出：0, 1, 2
        }, 1000);
    })(i);
}
```

## 高阶函数

### 函数作为参数
```javascript
function processArray(arr, processor) {
    return arr.map(processor);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, x => x * 2);
const squared = processArray(numbers, x => x ** 2);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]
```

### 函数作为返回值
```javascript
function multiply(x) {
    return function(y) {
        return x * y;
    };
}

const multiplyBy2 = multiply(2);
const multiplyBy3 = multiply(3);

console.log(multiplyBy2(5)); // 10
console.log(multiplyBy3(5)); // 15
```

### 函数组合
```javascript
function compose(...fns) {
    return function(x) {
        return fns.reduceRight((result, fn) => fn(result), x);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x ** 2;

const composed = compose(square, double, addOne);
console.log(composed(3)); // ((3 + 1) * 2)² = 64
```

## 函数式编程技巧

### 纯函数
```javascript
// 纯函数：相同输入总是产生相同输出，无副作用
function add(a, b) {
    return a + b;
}

// 非纯函数：有副作用
let total = 0;
function addToTotal(x) {
    total += x; // 修改外部状态
    return total;
}
```

### 不可变性
```javascript
// 避免直接修改原数组
const numbers = [1, 2, 3, 4, 5];

// 错误方式：直接修改
// numbers.push(6);

// 正确方式：创建新数组
const newNumbers = [...numbers, 6];
const doubledNumbers = numbers.map(x => x * 2);
```

### 柯里化（Currying）
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));     // 6
console.log(add(1, 2)(3));     // 6
console.log(add(1, 2, 3));     // 6
```

## 性能优化

### 函数缓存
```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalculation = memoize(function(n) {
    console.log('计算中...');
    return n * n;
});

console.log(expensiveCalculation(5)); // 计算中... 25
console.log(expensiveCalculation(5)); // 25 (从缓存获取)
```

### 防抖和节流
```javascript
// 防抖：延迟执行，重复调用会重置计时器
function debounce(fn, delay) {
    let timer = null;
    
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 节流：限制执行频率
function throttle(fn, limit) {
    let inThrottle = false;
    
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## 面试重点

### 核心概念
1. **函数提升：** 函数声明会被提升，函数表达式不会
2. **闭包：** 函数能够访问其词法作用域外的变量
3. **this指向：** 箭头函数没有自己的this，普通函数的this取决于调用方式
4. **作用域链：** 变量查找的机制和规则

### 常见问题
1. **闭包内存泄漏：** 及时清理不需要的引用
2. **this指向问题：** 使用箭头函数或bind方法解决
3. **函数性能：** 合理使用缓存、防抖、节流等技术
4. **函数式编程：** 理解纯函数、不可变性等概念

### 实际应用
1. **模块化开发：** 使用闭包创建私有作用域
2. **事件处理：** 合理使用防抖和节流
3. **数据处理：** 使用高阶函数处理数组和对象
4. **代码复用：** 通过函数组合提高代码复用性

## 实践练习

### 基础练习
1. 使用不同方式定义函数
2. 练习参数解构和剩余参数
3. 理解闭包的概念和应用
4. 编写高阶函数

### 进阶练习
1. 实现函数组合和柯里化
2. 使用函数式编程技巧优化代码
3. 实现防抖和节流函数
4. 分析函数性能并优化

## 下一步

掌握函数编程后，建议学习：
- **[对象与面向对象](./objects.md)** - 对象创建、原型链、继承模式
- **[数组与集合操作](./arrays.md)** - 数组方法、迭代器、数据结构

继续学习，加油！🚀

 