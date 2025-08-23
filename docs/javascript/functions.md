# JavaScript 函数编程

函数是JavaScript中最重要的概念之一，它允许我们将代码组织成可重用的块，实现代码的模块化和抽象化。

## 函数基础

### 1. 函数声明
```javascript
// 函数声明
function greet(name) {
    return `你好，${name}！`;
}

// 函数表达式
const greet = function(name) {
    return `你好，${name}！`;
};

// 箭头函数（ES6）
const greet = (name) => {
    return `你好，${name}！`;
};

// 箭头函数简写
const greet = name => `你好，${name}！`;

// 调用函数
console.log(greet("张三")); // 你好，张三！
```

### 2. 函数参数
```javascript
// 基本参数
function add(a, b) {
    return a + b;
}

// 默认参数（ES6）
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet()); // 你好，访客！
console.log(greet("李四")); // 你好，李四！
console.log(greet("王五", "欢迎")); // 欢迎，王五！

// 剩余参数（ES6）
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 参数解构（ES6）
function processUser({ name, age, city = "未知" }) {
    return `${name}，${age}岁，来自${city}`;
}

const user = { name: "赵六", age: 25 };
console.log(processUser(user)); // 赵六，25岁，来自未知
```

## 函数类型

### 1. 普通函数
```javascript
function calculateArea(width, height) {
    const area = width * height;
    return area;
}

function isEven(number) {
    return number % 2 === 0;
}

function formatCurrency(amount, currency = "CNY") {
    return `${currency} ${amount.toFixed(2)}`;
}

// 使用函数
const rectangleArea = calculateArea(10, 5);
console.log(rectangleArea); // 50

console.log(isEven(4)); // true
console.log(isEven(7)); // false

console.log(formatCurrency(123.456)); // CNY 123.46
console.log(formatCurrency(99.99, "USD")); // USD 99.99
```

### 2. 箭头函数
```javascript
// 基本箭头函数
const square = x => x * x;
const add = (a, b) => a + b;
const greet = () => "Hello World";

// 多行箭头函数
const processData = (data) => {
    const filtered = data.filter(item => item > 0);
    const doubled = filtered.map(item => item * 2);
    return doubled.reduce((sum, item) => sum + item, 0);
};

// 对象返回
const createUser = (name, age) => ({
    name,
    age,
    greet() {
        return `你好，我是${this.name}`;
    }
});

// 使用箭头函数
console.log(square(5)); // 25
console.log(add(3, 7)); // 10
console.log(greet()); // Hello World

const data = [1, -2, 3, -4, 5];
console.log(processData(data)); // 18

const user = createUser("张三", 25);
console.log(user.greet()); // 你好，我是张三
```

### 3. 立即执行函数（IIFE）
```javascript
// 基本IIFE
(function() {
    console.log("立即执行函数");
})();

// 带参数的IIFE
(function(name) {
    console.log(`你好，${name}！`);
})("李四");

// 返回值的IIFE
const result = (function(a, b) {
    return a + b;
})(5, 3);

console.log(result); // 8

// 模块模式
const calculator = (function() {
    // 私有变量
    let history = [];
    
    // 私有函数
    function addToHistory(operation, result) {
        history.push({ operation, result, timestamp: new Date() });
    }
    
    // 公共接口
    return {
        add: function(a, b) {
            const result = a + b;
            addToHistory(`${a} + ${b}`, result);
            return result;
        },
        
        subtract: function(a, b) {
            const result = a - b;
            addToHistory(`${a} - ${b}`, result);
            return result;
        },
        
        getHistory: function() {
            return [...history];
        }
    };
})();

console.log(calculator.add(10, 5)); // 15
console.log(calculator.subtract(10, 3)); // 7
console.log(calculator.getHistory());
```

## 函数作用域和闭包

### 1. 作用域
```javascript
// 全局作用域
const globalVar = "全局变量";

function outerFunction() {
    // 函数作用域
    const outerVar = "外部变量";
    
    function innerFunction() {
        // 内部函数作用域
        const innerVar = "内部变量";
        
        console.log(globalVar); // 可以访问全局变量
        console.log(outerVar);  // 可以访问外部变量
        console.log(innerVar);  // 可以访问内部变量
    }
    
    innerFunction();
    
    // console.log(innerVar); // 错误！无法访问内部变量
}

outerFunction();
// console.log(outerVar); // 错误！无法访问外部变量
```

### 2. 闭包
```javascript
// 基本闭包
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1
console.log(counter1()); // 3

// 数据私有化
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `存款成功，余额: ${balance}`;
            }
            return "存款金额必须大于0";
        },
        
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `取款成功，余额: ${balance}`;
            }
            return "余额不足或取款金额无效";
        },
        
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 存款成功，余额: 1500
console.log(account.withdraw(200)); // 取款成功，余额: 1300
// console.log(balance); // 错误！无法直接访问私有变量
```

## 高阶函数

### 1. 函数作为参数
```javascript
// 回调函数
function processArray(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

// 使用回调函数
const numbers = [1, 2, 3, 4, 5];

const doubled = processArray(numbers, function(num) {
    return num * 2;
});

const squared = processArray(numbers, function(num) {
    return num * num;
});

const withIndex = processArray(numbers, function(num, index) {
    return `${index}: ${num}`;
});

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]
console.log(withIndex); // ["0: 1", "1: 2", "2: 3", "3: 4", "5: 5"]

// 条件函数
function filterArray(array, condition) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (condition(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

const evenNumbers = filterArray(numbers, function(num) {
    return num % 2 === 0;
});

const largeNumbers = filterArray(numbers, function(num) {
    return num > 3;
});

console.log(evenNumbers); // [2, 4]
console.log(largeNumbers); // [4, 5]
```

### 2. 函数作为返回值
```javascript
// 函数工厂
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(quadruple(5)); // 20

// 条件函数创建器
function createCondition(operator, value) {
    switch (operator) {
        case "greaterThan":
            return function(item) {
                return item > value;
            };
        case "lessThan":
            return function(item) {
                return item < value;
            };
        case "equals":
            return function(item) {
                return item === value;
            };
        default:
            return function() {
                return true;
            };
    }
}

const isGreaterThan3 = createCondition("greaterThan", 3);
const isLessThan10 = createCondition("lessThan", 10);
const equals5 = createCondition("equals", 5);

console.log(isGreaterThan3(5)); // true
console.log(isLessThan10(15));  // false
console.log(equals5(5));        // true
```

## 函数式编程

### 1. 纯函数
```javascript
// 纯函数 - 相同输入总是产生相同输出，无副作用
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function square(x) {
    return x * x;
}

// 非纯函数 - 有副作用
let total = 0;
function addToTotal(amount) {
    total += amount; // 修改外部状态
    return total;
}

// 纯函数示例
const numbers = [1, 2, 3, 4, 5];

// 计算平方和
const sumOfSquares = numbers
    .map(square)
    .reduce((sum, num) => sum + num, 0);

console.log(sumOfSquares); // 55

// 函数组合
function compose(...functions) {
    return function(input) {
        return functions.reduceRight((result, fn) => fn(result), input);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, addOne);
console.log(composed(3)); // 64 ((3 + 1) * 2)^2
```

### 2. 柯里化
```javascript
// 基本柯里化
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

// 使用柯里化
function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));    // 6
console.log(curriedAdd(1)(2, 3));    // 6
console.log(curriedAdd(1, 2, 3));    // 6

// 实用柯里化示例
const addTax = curry(function(taxRate, amount) {
    return amount * (1 + taxRate);
});

const addVAT = addTax(0.2); // 20% VAT
const addSalesTax = addTax(0.08); // 8% Sales Tax

console.log(addVAT(100));      // 120
console.log(addSalesTax(100)); // 108

// 部分应用
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn.apply(this, presetArgs.concat(laterArgs));
    };
}

const addTen = partial(add, 10);
console.log(addTen(5, 3)); // 18 (10 + 5 + 3)
```

## 异步函数

### 1. 回调函数
```javascript
// 传统回调模式
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "张三", age: 25 };
        callback(null, data);
    }, 1000);
}

// 使用回调
fetchData(function(error, data) {
    if (error) {
        console.error("错误:", error);
        return;
    }
    console.log("数据:", data);
});

// 回调地狱示例
function processUserData(userId, callback) {
    fetchUser(userId, function(error, user) {
        if (error) {
            callback(error);
            return;
        }
        
        fetchUserPosts(user.id, function(error, posts) {
            if (error) {
                callback(error);
                return;
            }
            
            fetchUserProfile(user.id, function(error, profile) {
                if (error) {
                    callback(error);
                    return;
                }
                
                callback(null, { user, posts, profile });
            });
        });
    });
}
```

### 2. Promise和async/await
```javascript
// Promise版本
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "李四", age: 30 };
            resolve(data);
        }, 1000);
    });
}

// 使用Promise
fetchData()
    .then(data => {
        console.log("数据:", data);
        return fetchData(); // 链式调用
    })
    .then(data => {
        console.log("第二次数据:", data);
    })
    .catch(error => {
        console.error("错误:", error);
    });

// async/await版本
async function processData() {
    try {
        const data1 = await fetchData();
        console.log("第一次数据:", data1);
        
        const data2 = await fetchData();
        console.log("第二次数据:", data2);
        
        return { data1, data2 };
    } catch (error) {
        console.error("处理数据时出错:", error);
        throw error;
    }
}

// 并行执行
async function processDataParallel() {
    try {
        const [data1, data2] = await Promise.all([
            fetchData(),
            fetchData()
        ]);
        
        console.log("并行数据:", { data1, data2 });
        return { data1, data2 };
    } catch (error) {
        console.error("并行处理出错:", error);
        throw error;
    }
}
```

## 函数最佳实践

### 1. 命名和结构
```javascript
// 好的函数命名
function calculateTotalPrice(items, taxRate) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * taxRate;
    return subtotal + tax;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function formatDate(date, format = "YYYY-MM-DD") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    
    return format
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", day);
}

// 函数职责单一
function validateUser(user) {
    const errors = [];
    
    if (!user.name || user.name.trim().length === 0) {
        errors.push("用户名不能为空");
    }
    
    if (!user.email || !isValidEmail(user.email)) {
        errors.push("邮箱格式无效");
    }
    
    if (!user.age || user.age < 0 || user.age > 150) {
        errors.push("年龄必须在0-150之间");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}
```

### 2. 错误处理
```javascript
// 函数式错误处理
function safeDivide(a, b) {
    if (b === 0) {
        throw new Error("除数不能为零");
    }
    return a / b;
}

function safeExecute(fn, ...args) {
    try {
        return {
            success: true,
            result: fn(...args),
            error: null
        };
    } catch (error) {
        return {
            success: false,
            result: null,
            error: error.message
        };
    }
}

// 使用安全执行
const result1 = safeExecute(safeDivide, 10, 2);
console.log(result1); // { success: true, result: 5, error: null }

const result2 = safeExecute(safeDivide, 10, 0);
console.log(result2); // { success: false, result: null, error: "除数不能为零" }

// 函数重试机制
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            
            console.log(`尝试 ${attempt} 失败，${delay}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// 使用重试机制
async function fetchWithRetry() {
    return await retry(async () => {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }, 3, 1000);
}
```

## 总结

函数是JavaScript编程的核心概念，掌握好函数的使用对于编写高质量的代码至关重要：

1. **基础语法** - 函数声明、表达式、箭头函数
2. **参数处理** - 默认参数、剩余参数、参数解构
3. **作用域闭包** - 变量作用域、闭包原理、数据私有化
4. **高阶函数** - 函数作为参数、函数作为返回值
5. **函数式编程** - 纯函数、函数组合、柯里化
6. **异步处理** - 回调函数、Promise、async/await
7. **最佳实践** - 命名规范、错误处理、性能优化

## 延伸阅读

- **[MDN - 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)** - 函数完整指南
- **[MDN - 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)** - 箭头函数详解
- **[JavaScript.info - 函数](https://javascript.info/function-basics)** - 现代函数教程

 