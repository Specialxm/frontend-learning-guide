# JavaScript 函数 🔧

函数是JavaScript中的核心概念，它允许我们将代码组织成可重用的块。

## 🎯 函数基础

### 1. 函数声明
```javascript
// 基本函数声明
function greet(name) {
    return `你好，${name}！`;
}

// 调用函数
console.log(greet("张三")); // 你好，张三！
```

### 2. 函数表达式
```javascript
// 匿名函数表达式
const greet = function(name) {
    return `你好，${name}！`;
};

// 命名函数表达式
const greetFunc = function greet(name) {
    return `你好，${name}！`;
};
```

### 3. 箭头函数 (ES6)
```javascript
// 基本箭头函数
const greet = (name) => {
    return `你好，${name}！`;
};

// 简化箭头函数
const greet = name => `你好，${name}！`;

// 多参数箭头函数
const add = (a, b) => a + b;

// 无参数箭头函数
const sayHello = () => "你好！";
```

## 🔧 函数参数

### 1. 基本参数
```javascript
function calculateArea(width, height) {
    return width * height;
}

console.log(calculateArea(5, 3)); // 15
```

### 2. 默认参数
```javascript
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet());           // 你好，访客！
console.log(greet("张三"));     // 你好，张三！
console.log(greet("李四", "欢迎")); // 欢迎，李四！
```

### 3. 剩余参数
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20));         // 30
```

### 4. 参数解构
```javascript
function printUserInfo({ name, age, city = "未知" }) {
    console.log(`姓名：${name}，年龄：${age}，城市：${city}`);
}

const user = { name: "张三", age: 25 };
printUserInfo(user); // 姓名：张三，年龄：25，城市：未知
```

## 🔄 函数返回值

### 1. 基本返回值
```javascript
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

const fullName = getFullName("张", "三");
console.log(fullName); // 张 三
```

### 2. 多值返回
```javascript
function getCoordinates() {
    return {
        x: 10,
        y: 20
    };
}

const coords = getCoordinates();
console.log(`X: ${coords.x}, Y: ${coords.y}`); // X: 10, Y: 20
```

### 3. 提前返回
```javascript
function validateAge(age) {
    if (age < 0) {
        return "年龄不能为负数";
    }
    
    if (age > 150) {
        return "年龄不能超过150岁";
    }
    
    return "年龄有效";
}

console.log(validateAge(25));  // 年龄有效
console.log(validateAge(-5));  // 年龄不能为负数
```

## 🎭 函数类型

### 1. 纯函数
```javascript
// 纯函数：相同输入总是产生相同输出，无副作用
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

// 组合纯函数
function calculate(a, b) {
    const sum = add(a, b);
    const product = multiply(a, b);
    return { sum, product };
}
```

### 2. 高阶函数
```javascript
// 接受函数作为参数的函数
function processArray(arr, processor) {
    return arr.map(processor);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, x => x * 2);
const squared = processArray(numbers, x => x ** 2);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]
```

### 3. 闭包函数
```javascript
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
console.log(counter2()); // 2
```

## 🔧 函数应用示例

### 1. 计算器函数
```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : "除数不能为0",
    
    // 链式调用
    calculate: function(operation, ...numbers) {
        switch(operation) {
            case 'add':
                return numbers.reduce(this.add, 0);
            case 'multiply':
                return numbers.reduce(this.multiply, 1);
            default:
                return "不支持的操作";
        }
    }
};

console.log(calculator.add(5, 3));           // 8
console.log(calculator.multiply(4, 2, 3));   // 24
console.log(calculator.calculate('add', 1, 2, 3, 4)); // 10
```

### 2. 表单验证函数
```javascript
const validators = {
    required: value => value.trim() !== "" || "此字段为必填项",
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "请输入有效的邮箱地址",
    minLength: (value, min) => value.length >= min || `最少需要${min}个字符`,
    maxLength: (value, max) => value.length <= max || `最多允许${max}个字符`
};

function validateForm(formData, rules) {
    const errors = {};
    
    for (const field in rules) {
        const value = formData[field] || "";
        const fieldRules = rules[field];
        
        for (const rule of fieldRules) {
            let validationResult;
            
            if (typeof rule === 'string') {
                validationResult = validators[rule](value);
            } else if (typeof rule === 'function') {
                validationResult = rule(value);
            } else if (rule.type && validators[rule.type]) {
                validationResult = validators[rule.type](value, rule.value);
            }
            
            if (validationResult !== true) {
                errors[field] = validationResult;
                break;
            }
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// 使用示例
const formData = {
    username: "张三",
    email: "zhangsan@example.com",
    password: "123"
};

const rules = {
    username: ['required', { type: 'minLength', value: 2 }],
    email: ['required', 'email'],
    password: ['required', { type: 'minLength', value: 6 }]
};

const result = validateForm(formData, rules);
console.log(result);
```

### 3. 异步函数处理
```javascript
// 模拟异步操作
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "张三",
                    email: "zhangsan@example.com"
                });
            } else {
                reject(new Error("用户ID无效"));
            }
        }, 1000);
    });
}

// 使用async/await
async function getUserInfo(userId) {
    try {
        const user = await fetchUserData(userId);
        console.log("用户信息：", user);
        return user;
    } catch (error) {
        console.error("获取用户信息失败：", error.message);
        return null;
    }
}

// 调用异步函数
getUserInfo(1);
getUserInfo(-1);
```

## 📚 重要概念

1. **函数提升** - 函数声明会被提升到作用域顶部
2. **this关键字** - 函数执行时的上下文对象
3. **arguments对象** - 函数参数的类数组对象
4. **函数作用域** - 函数创建的作用域

## 💡 最佳实践

1. **使用描述性的函数名**
2. **保持函数单一职责**
3. **避免过长的函数**
4. **使用默认参数和剩余参数**
5. **优先使用箭头函数**

## 📖 延伸阅读

- **[MDN - 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)** - 函数详解和最佳实践
- **[MDN - 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)** - 箭头函数语法和用法
- **[MDN - this关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)** - this关键字的详细说明

 