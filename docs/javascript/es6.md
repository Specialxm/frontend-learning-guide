# JavaScript ES6+ 现代特性

ES6（ECMAScript 2015）是JavaScript语言的一次重大更新，引入了许多现代化的语法和功能。

## 变量声明

### 1. let 和 const
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

// let 的特点
let count = 0;
if (true) {
    let count = 1; // 块级作用域
    console.log(count); // 1
}
console.log(count); // 0

// const 的特点
const user = { name: "王五", age: 28 };
user.age = 29; // 可以修改对象属性
// user = {}; // 错误！不能重新赋值
```

### 2. 块级作用域
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

// 块级作用域示例
{
    let blockVar = "块级变量";
    const blockConst = "块级常量";
}
// console.log(blockVar); // 错误！超出作用域
```

## 箭头函数

### 1. 基本语法
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

// 多行箭头函数
const processData = (data) => {
    const result = data.map(item => item * 2);
    return result.filter(item => item > 10);
};
```

### 2. this 绑定
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

// 事件处理中的 this
const button = document.getElementById('myButton');

// 传统方式
button.addEventListener('click', function() {
    console.log(this); // button 元素
});

// 箭头函数
button.addEventListener('click', () => {
    console.log(this); // window 对象
});
```

## 模板字符串

### 1. 基本用法
```javascript
const name = "张三";
const age = 25;
const city = "北京";

// 传统字符串拼接
const message = "我叫" + name + "，今年" + age + "岁，来自" + city;

// 模板字符串
const message = `我叫${name}，今年${age}岁，来自${city}`;

// 多行字符串
const html = `
    <div class="user-card">
        <h3>${name}</h3>
        <p>年龄：${age}</p>
        <p>城市：${city}</p>
    </div>
`;

// 表达式计算
const price = 100;
const discount = 0.8;
const finalPrice = `原价：${price}，折扣：${discount * 100}%，最终价格：${price * discount}`;
```

### 2. 标签模板
```javascript
// 标签模板函数
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

const name = "张三";
const age = 25;

const highlighted = highlight`我叫${name}，今年${age}岁`;
// 结果：我叫<span class="highlight">张三</span>，今年<span class="highlight">25</span>岁

// 国际化示例
function i18n(strings, ...values) {
    const locale = navigator.language;
    const translations = {
        'zh-CN': { 'Hello': '你好', 'Welcome': '欢迎' },
        'en-US': { 'Hello': 'Hello', 'Welcome': 'Welcome' }
    };
    
    let result = '';
    strings.forEach((string, i) => {
        result += string;
        if (values[i]) {
            result += translations[locale]?.[values[i]] || values[i];
        }
    });
    return result;
}

const greeting = i18n`${'Hello'}, ${'Welcome'} to our site!`;
```

## 解构赋值

### 1. 数组解构
```javascript
// 基本解构
const numbers = [1, 2, 3, 4, 5];
const [first, second, third] = numbers;
console.log(first, second, third); // 1, 2, 3

// 跳过元素
const [a, , c, , e] = numbers;
console.log(a, c, e); // 1, 3, 5

// 剩余元素
const [head, ...tail] = numbers;
console.log(head, tail); // 1, [2, 3, 4, 5]

// 默认值
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // 1, 2, 0

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

### 2. 对象解构
```javascript
const user = {
    name: "张三",
    age: 25,
    city: "北京",
    email: "zhangsan@example.com"
};

// 基本解构
const { name, age, city } = user;
console.log(name, age, city); // 张三, 25, 北京

// 重命名
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // 张三, 25

// 默认值
const { name, age, hobby = "编程" } = user;
console.log(hobby); // 编程

// 嵌套解构
const person = {
    name: "李四",
    address: {
        city: "上海",
        street: "南京路"
    }
};

const { name, address: { city, street } } = person;
console.log(city, street); // 上海, 南京路

// 函数参数解构
function printUserInfo({ name, age, city = "未知" }) {
    console.log(`${name}，${age}岁，来自${city}`);
}

printUserInfo(user);
```

## 扩展运算符

### 1. 数组扩展
```javascript
// 复制数组
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// 合并数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

// 添加元素
const numbers = [1, 2, 3];
const newNumbers = [0, ...numbers, 4];
console.log(newNumbers); // [0, 1, 2, 3, 4]

// 字符串转数组
const str = "Hello";
const chars = [...str];
console.log(chars); // ['H', 'e', 'l', 'l', 'o']

// 展开可迭代对象
const set = new Set([1, 2, 3]);
const arrayFromSet = [...set];
console.log(arrayFromSet); // [1, 2, 3]
```

### 2. 对象扩展
```javascript
// 复制对象
const original = { name: "张三", age: 25 };
const copy = { ...original };
console.log(copy); // { name: "张三", age: 25 }

// 合并对象
const obj1 = { name: "张三" };
const obj2 = { age: 25 };
const obj3 = { city: "北京" };
const merged = { ...obj1, ...obj2, ...obj3 };
console.log(merged); // { name: "张三", age: 25, city: "北京" }

// 添加/覆盖属性
const user = { name: "张三", age: 25 };
const updatedUser = { ...user, age: 26, city: "上海" };
console.log(updatedUser); // { name: "张三", age: 26, city: "上海" }

// 条件属性
const isAdmin = true;
const user = {
    name: "张三",
    ...(isAdmin && { role: "admin" })
};
console.log(user); // { name: "张三", role: "admin" }
```

## 类和继承

### 1. 类定义
```javascript
// 传统构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `你好，我是${this.name}`;
};

// ES6 类语法
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
        const [name, age] = value.split(',');
        this.name = name;
        this.age = parseInt(age);
    }
    
    static create(name, age) {
        return new Person(name, age);
    }
}

const person = new Person("张三", 25);
console.log(person.greet()); // 你好，我是张三
console.log(person.info); // 张三，25岁

person.info = "李四,30";
console.log(person.name, person.age); // 李四, 30

const newPerson = Person.create("王五", 28);
```

### 2. 继承
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name}发出声音`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父类构造函数
        this.breed = breed;
    }
    
    speak() {
        return `${this.name}汪汪叫`;
    }
    
    getInfo() {
        return `${this.name}是一只${this.breed}`;
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    
    speak() {
        return `${this.name}喵喵叫`;
    }
}

const dog = new Dog("小白", "金毛");
const cat = new Cat("咪咪", "橘色");

console.log(dog.speak()); // 小白汪汪叫
console.log(cat.speak()); // 咪咪喵喵叫
console.log(dog.getInfo()); // 小白是一只金毛
```

## 模块系统

### 1. 导出和导入
```javascript
// math.js - 导出模块
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export default class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}

// 命名导出
export { add as addFunction, multiply as multiplyFunction };

// utils.js - 工具函数
export const formatDate = (date) => {
    return date.toLocaleDateString();
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};
```

### 2. 导入使用
```javascript
// main.js - 导入模块
import Calculator, { add, multiply, PI } from './math.js';
import { formatDate, generateId } from './utils.js';

// 使用导入的函数
console.log(add(5, 3)); // 8
console.log(multiply(4, 6)); // 24
console.log(PI); // 3.14159

// 使用默认导出的类
const calc = new Calculator();
calc.add(10).add(20);
console.log(calc.getResult()); // 30

// 使用工具函数
console.log(formatDate(new Date())); // 当前日期
console.log(generateId()); // 随机ID

// 动态导入
async function loadModule() {
    try {
        const module = await import('./dynamic-module.js');
        module.default();
    } catch (error) {
        console.error('模块加载失败:', error);
    }
}
```

## 异步编程

### 1. Promise
```javascript
// 创建 Promise
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "张三", age: 25 });
            } else {
                reject(new Error("用户ID无效"));
            }
        }, 1000);
    });
};

// 使用 Promise
fetchUserData(123)
    .then(user => {
        console.log('用户数据:', user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log('用户文章:', posts);
    })
    .catch(error => {
        console.error('错误:', error.message);
    });

// Promise.all - 并行执行
const promises = [
    fetchUserData(1),
    fetchUserData(2),
    fetchUserData(3)
];

Promise.all(promises)
    .then(users => {
        console.log('所有用户:', users);
    })
    .catch(error => {
        console.error('获取用户失败:', error);
    });

// Promise.race - 竞态
Promise.race([
    fetchUserData(1),
    new Promise((_, reject) => setTimeout(() => reject(new Error('超时')), 5000))
])
.then(user => console.log('用户数据:', user))
.catch(error => console.error('错误:', error.message));
```

### 2. async/await
```javascript
// 使用 async/await
async function getUserInfo(userId) {
    try {
        const user = await fetchUserData(userId);
        const posts = await fetchUserPosts(user.id);
        const profile = await fetchUserProfile(user.id);
        
        return {
            ...user,
            posts,
            profile
        };
    } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
    }
}

// 调用异步函数
getUserInfo(123)
    .then(userInfo => {
        console.log('完整用户信息:', userInfo);
    })
    .catch(error => {
        console.error('错误:', error);
    });

// 并行执行多个异步操作
async function getMultipleUsers(userIds) {
    try {
        const userPromises = userIds.map(id => fetchUserData(id));
        const users = await Promise.all(userPromises);
        return users;
    } catch (error) {
        console.error('获取多个用户失败:', error);
        throw error;
    }
}

// 错误处理
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
        }
    }
}
```

## 其他新特性

### 1. 默认参数和剩余参数
```javascript
// 默认参数
function greet(name = "访客", greeting = "你好") {
    return `${greeting}，${name}！`;
}

console.log(greet());           // 你好，访客！
console.log(greet("张三"));     // 你好，张三！
console.log(greet("李四", "欢迎")); // 欢迎，李四！

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20));         // 30

// 解构和默认参数结合
function processUser({ name, age, city = "未知", ...otherProps } = {}) {
    console.log(`姓名：${name || '未知'}`);
    console.log(`年龄：${age || '未知'}`);
    console.log(`城市：${city}`);
    console.log('其他属性：', otherProps);
}

processUser({ name: "张三", age: 25, hobby: "编程" });
```

### 2. 新的数组方法
```javascript
// Array.from
const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
const array = Array.from(arrayLike);
console.log(array); // ['a', 'b', 'c']

// Array.of
const numbers = Array.of(1, 2, 3, 4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

// find 和 findIndex
const users = [
    { id: 1, name: "张三", age: 25 },
    { id: 2, name: "李四", age: 30 },
    { id: 3, name: "王五", age: 28 }
];

const user = users.find(user => user.age > 28);
console.log(user); // { id: 2, name: "李四", age: 30 }

const index = users.findIndex(user => user.name === "王五");
console.log(index); // 2

// includes
const colors = ["红", "绿", "蓝"];
console.log(colors.includes("绿")); // true
console.log(colors.includes("黄")); // false
```

## 最佳实践

### 1. 现代JavaScript编码风格
```javascript
// 使用 const 和 let，避免 var
const PI = 3.14159;
let count = 0;

// 使用箭头函数简化回调
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

// 使用解构简化代码
const { name, age, ...rest } = user;
const [first, second, ...others] = array;

// 使用模板字符串
const message = `用户 ${name} 今年 ${age} 岁`;

// 使用类语法
class UserService {
    constructor() {
        this.users = [];
    }
    
    async getUser(id) {
        try {
            const response = await fetch(`/api/users/${id}`);
            return await response.json();
        } catch (error) {
            console.error('获取用户失败:', error);
            throw error;
        }
    }
}
```

### 2. 兼容性考虑
```javascript
// 检查特性支持
if (typeof Promise !== 'undefined') {
    // 使用 Promise
} else {
    // 降级处理
}

// 使用 Babel 转译
// 现代语法会被转换为兼容的代码

// 使用 polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

## 总结

ES6+ 为JavaScript带来了现代化的语法和强大的功能：

1. **变量声明** - let、const、块级作用域
2. **箭头函数** - 简洁语法、this绑定
3. **模板字符串** - 字符串插值、标签模板
4. **解构赋值** - 数组解构、对象解构
5. **扩展运算符** - 数组扩展、对象扩展
6. **类和继承** - 类语法、继承机制
7. **模块系统** - 导入导出、动态导入
8. **异步编程** - Promise、async/await
9. **其他特性** - 默认参数、剩余参数、新数组方法

## 延伸阅读

- **[MDN - ES6 指南](https://es6.ruanyifeng.com/)** - ES6 新特性详解
- **[ECMAScript 规范](https://tc39.es/ecma262/)** - JavaScript 语言标准
- **[Babel 官网](https://babeljs.io/)** - JavaScript 编译器
- **[ES6 兼容性表](https://compat-table.github.io/compat-table/es6/)** - 浏览器支持情况
- **[现代 JavaScript 教程](https://javascript.info/)** - 深入浅出的现代 JS 教程

掌握这些现代特性，将使你的JavaScript代码更加简洁、可读和强大！ 