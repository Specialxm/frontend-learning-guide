# JavaScript ES6+ 现代特性

## 概述
ES6（ECMAScript 2015）是JavaScript语言的一次重大更新，引入了许多现代化的语法和功能。掌握这些特性对于编写现代、高效的JavaScript代码至关重要。

## 学习目标
- 理解ES6+的核心语法特性
- 掌握模块系统和类的使用
- 学会使用解构赋值和模板字符串
- 为理解现代前端框架打下基础

## 变量声明与作用域

### let 和 const

#### 基本用法
```javascript
// 传统方式
var name = "张三";
var age = 25;

// ES6 方式
let name = "李四";
const age = 30;

// const 用于常量
const PI = 3.14159;
const APP_NAME = "前端学习指南";
```

#### 作用域差异
```javascript
// var 的函数作用域
function testVar() {
    var x = 1;
    if (true) {
        var x = 2; // 覆盖外层的x
    }
    console.log(x); // 2
}

// let 的块级作用域
function testLet() {
    let x = 1;
    if (true) {
        let x = 2; // 新的块级变量
    }
    console.log(x); // 1
}
```

#### 暂时性死区
```javascript
// var 的变量提升
console.log(x); // undefined
var x = 5;

// let 的暂时性死区
// console.log(y); // 错误：Cannot access 'y' before initialization
let y = 5;
```

### 块级作用域
```javascript
// 传统 var 的问题
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 3, 3, 3
    }, 100);
}

// ES6 let 的解决方案
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 0, 1, 2
    }, 100);
}
```

## 箭头函数

### 基本语法
```javascript
// 传统函数
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => {
    return a + b;
};

// 简化形式
const add = (a, b) => a + b;
const square = x => x * x;
const greet = () => "Hello World";
```

### this 绑定
```javascript
// 传统函数的 this 问题
const user = {
    name: "张三",
    greet: function() {
        setTimeout(function() {
            console.log(`你好，我是${this.name}`); // this.name 是 undefined
        }, 100);
    }
};

// 箭头函数解决 this 问题
const user = {
    name: "李四",
    greet: function() {
        setTimeout(() => {
            console.log(`你好，我是${this.name}`); // this.name 是 "李四"
        }, 100);
    }
};
```

### 注意事项
```javascript
// 箭头函数不能作为构造函数
const Person = (name) => {
    this.name = name;
};
// const person = new Person("张三"); // 错误！

// 箭头函数没有 arguments 对象
const func = () => {
    // console.log(arguments); // 错误！
};

// 箭头函数没有 prototype 属性
const func = () => {};
console.log(func.prototype); // undefined
```

## 解构赋值

### 数组解构
```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [first, second, third] = numbers;
console.log(first, second, third); // 1, 2, 3

// 跳过元素
const [a, , c] = numbers;
console.log(a, c); // 1, 3

// 剩余参数
const [x, y, ...rest] = numbers;
console.log(x, y, rest); // 1, 2, [3, 4, 5]

// 默认值
const [first = 0, second = 0] = [1];
console.log(first, second); // 1, 0
```

### 对象解构
```javascript
const user = {
    name: "张三",
    age: 25,
    city: "北京",
    hobbies: ["读书", "游泳"]
};

// 基本解构
const { name, age } = user;
console.log(name, age); // 张三, 25

// 重命名
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // 张三, 25

// 默认值
const { name, age, country = "中国" } = user;
console.log(country); // 中国

// 嵌套解构
const { hobbies: [firstHobby, ...otherHobbies] } = user;
console.log(firstHobby, otherHobbies); // 读书, ["游泳"]
```

### 函数参数解构
```javascript
// 对象参数解构
function processUser({ name, age, city = "未知" }) {
    return `${name}，${age}岁，来自${city}`;
}

const user = { name: "李四", age: 30 };
console.log(processUser(user)); // 李四，30岁，来自未知

// 数组参数解构
function processArray([first, second, ...rest]) {
    return `第一个：${first}，第二个：${second}，其余：${rest}`;
}

console.log(processArray([1, 2, 3, 4, 5])); // 第一个：1，第二个：2，其余：3,4,5
```

## 模板字符串

### 基本用法
```javascript
const name = "王五";
const age = 28;

// 传统字符串拼接
const message1 = "我叫" + name + "，今年" + age + "岁";

// 模板字符串
const message2 = `我叫${name}，今年${age}岁`;

// 多行字符串
const multiLine = `
    这是第一行
    这是第二行
    这是第三行
`;
```

### 表达式和函数调用
```javascript
const price = 99.99;
const quantity = 3;

// 表达式
const total = `总价：${price * quantity}元`;

// 函数调用
const user = { firstName: "张", lastName: "三" };
const fullName = `全名：${user.firstName}${user.lastName}`;

// 条件表达式
const status = `状态：${age >= 18 ? '成年' : '未成年'}`;
```

### 标签模板
```javascript
function highlight(strings, ...values) {
    let result = '';
    strings.forEach((string, i) => {
        result += string;
        if (values[i]) {
            result += `<span class="highlight">${values[i]}</span>`;
        }
    });
    return result;
}

const name = "赵六";
const age = 25;
const html = highlight`我叫${name}，今年${age}岁`;
// 结果：我叫<span class="highlight">赵六</span>，今年<span class="highlight">25</span>岁
```

## 扩展运算符

### 数组扩展
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 合并数组
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 复制数组
const copy = [...arr1]; // [1, 2, 3]

// 在特定位置插入
const inserted = [...arr1, 10, ...arr2]; // [1, 2, 3, 10, 4, 5, 6]

// 展开字符串
const chars = [..."Hello"]; // ['H', 'e', 'l', 'l', 'o']
```

### 对象扩展
```javascript
const baseUser = {
    name: "张三",
    age: 25
};

// 创建新对象
const userWithCity = { ...baseUser, city: "北京" };

// 合并对象
const userDetails = { ...baseUser, ...{ email: "zhangsan@example.com" } };

// 浅拷贝
const userCopy = { ...baseUser };

// 覆盖属性
const updatedUser = { ...baseUser, age: 26 };
```

### 函数参数
```javascript
// 收集参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 展开参数
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3
```

## 类语法

### 基本类定义
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `你好，我是${this.name}`;
    }
    
    get info() {
        return `${this.name}，${this.age}岁`;
    }
    
    set info(value) {
        [this.name, this.age] = value.split(',');
    }
}

const person = new Person("李四", 30);
console.log(person.greet()); // 你好，我是李四
console.log(person.info); // 李四，30岁
```

### 继承
```javascript
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 调用父类构造函数
        this.grade = grade;
    }
    
    study() {
        return `${this.name}正在学习`;
    }
    
    greet() {
        return `${super.greet()}，是一名学生`;
    }
}

const student = new Student("王五", 20, "大一");
console.log(student.study()); // 王五正在学习
console.log(student.greet()); // 你好，我是王五，是一名学生
```

### 静态方法和私有字段
```javascript
class MathUtils {
    // 静态方法
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    // 私有字段（ES2022）
    #privateValue = 42;
    
    getPrivateValue() {
        return this.#privateValue;
    }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 6)); // 24

const math = new MathUtils();
console.log(math.getPrivateValue()); // 42
// console.log(math.#privateValue); // 错误：私有字段不可访问
```

## 模块系统

### 基本导出
```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// 默认导出
export default class Calculator {
    add(a, b) {
        return a + b;
    }
}
```

### 基本导入
```javascript
// main.js
import { PI, add, multiply } from './math.js';
import Calculator from './math.js';

console.log(PI); // 3.14159
console.log(add(5, 3)); // 8
console.log(multiply(4, 6)); // 24

const calc = new Calculator();
console.log(calc.add(10, 5)); // 15
```

### 命名空间导入
```javascript
// 导入所有导出
import * as Math from './math.js';

console.log(Math.PI);
console.log(Math.add(5, 3));

// 重命名导入
import { add as addFunction, multiply as multiplyFunction } from './math.js';
```

## Promise 基础

### 基本用法
```javascript
// 创建Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const random = Math.random();
        if (random > 0.5) {
            resolve(`成功：${random}`);
        } else {
            reject(`失败：${random}`);
        }
    }, 1000);
});

// 使用Promise
promise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("失败:", error);
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

fetchUser(1)
    .then(user => {
        console.log("用户信息:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("用户文章:", posts);
    })
    .catch(error => {
        console.error("错误:", error);
    });
```

## 其他重要特性

### Symbol
```javascript
// 创建唯一的标识符
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false

// 作为对象属性
const obj = {
    [sym1]: "值1",
    [sym2]: "值2"
};

console.log(obj[sym1]); // 值1
console.log(obj[sym2]); // 值2
```

### Map 和 Set
```javascript
// Map - 键值对集合
const userMap = new Map();
userMap.set("name", "张三");
userMap.set("age", 25);
userMap.set("city", "北京");

console.log(userMap.get("name")); // 张三
console.log(userMap.has("age")); // true
console.log(userMap.size); // 3

// Set - 唯一值集合
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log([...uniqueNumbers]); // [1, 2, 3, 4]
```

### 迭代器和生成器
```javascript
// 迭代器
const iterable = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                return {
                    value: i++,
                    done: i > 3
                };
            }
        };
    }
};

for (let value of iterable) {
    console.log(value); // 0, 1, 2
}

// 生成器
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = numberGenerator();
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3
```

## 面试重点

### 核心概念
1. **块级作用域：** let和const的作用域规则，暂时性死区
2. **箭头函数：** 语法特点、this绑定、使用限制
3. **解构赋值：** 数组和对象的解构语法，默认值设置
4. **模块系统：** ES6模块的导入导出语法

### 常见问题
1. **this指向：** 箭头函数和普通函数的this差异
2. **变量提升：** var、let、const的提升行为差异
3. **模块加载：** ES6模块和CommonJS的区别
4. **Promise使用：** 链式调用和错误处理

### 实际应用
1. **现代语法：** 使用ES6+特性简化代码
2. **模块化开发：** 组织和管理代码结构
3. **异步处理：** Promise的基础使用
4. **类设计：** 面向对象编程的实现

## 实践练习

### 基础练习
1. 使用let和const声明变量
2. 练习箭头函数的各种语法
3. 实现数组和对象的解构赋值
4. 使用模板字符串和扩展运算符

### 进阶练习
1. 设计和使用ES6类
2. 实现模块化的代码结构
3. 使用Promise处理异步操作
4. 分析框架源码中的ES6+特性使用

## 下一步

掌握ES6+现代特性后，建议学习：
- **[异步编程模式](./async.md)** - Promise、async/await、异步最佳实践
- **[性能优化技巧](../performance/)** - 代码优化和性能提升

继续学习，加油！🚀 