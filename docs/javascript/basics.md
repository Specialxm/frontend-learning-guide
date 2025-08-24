# JavaScript 核心基础

## 概述
JavaScript是一门动态类型、解释型的编程语言。掌握基础语法是学习JavaScript的第一步，这些概念将贯穿整个学习过程。

## 学习目标
- 理解变量声明和数据类型系统
- 掌握运算符和控制结构
- 了解类型转换和内存管理
- 为后续学习打下坚实基础

## 变量声明与作用域

### 变量声明方式

#### 1. var（传统方式，不推荐）
```javascript
var name = "张三";
var age = 25;
```
**特点：** 存在变量提升，函数作用域，可重复声明

#### 2. let（推荐使用）
```javascript
let name = "李四";
let age = 30;
```
**特点：** 块级作用域，不存在变量提升，不可重复声明

#### 3. const（常量）
```javascript
const PI = 3.14159;
const APP_NAME = "前端学习指南";
```
**特点：** 块级作用域，声明后不可重新赋值，引用类型内部属性可变

### 作用域规则
- **全局作用域：** 在函数外部声明的变量
- **函数作用域：** 在函数内部声明的变量
- **块级作用域：** 在`{}`内用`let`或`const`声明的变量

## 数据类型系统

### 基本数据类型（Primitive Types）

#### 1. 字符串 (String)
```javascript
let firstName = "王";
let lastName = '五';
let fullName = `${firstName}${lastName}`; // 模板字符串
```
**特点：** 不可变，支持转义字符，有丰富的字符串方法

#### 2. 数字 (Number)
```javascript
let integer = 42;
let float = 3.14;
let infinity = Infinity;
let notANumber = NaN;
```
**特点：** 统一为64位浮点数，支持科学计数法

#### 3. 布尔值 (Boolean)
```javascript
let isTrue = true;
let isFalse = false;
let result = 5 > 3; // true
```
**特点：** 只有两个值，常用于条件判断

#### 4. 空值 (Null)
```javascript
let empty = null;
```
**特点：** 表示"空"或"不存在"，是对象类型

#### 5. 未定义 (Undefined)
```javascript
let notDefined;
let alsoUndefined = undefined;
```
**特点：** 变量声明但未赋值时的默认值

#### 6. Symbol (ES6)
```javascript
const uniqueKey = Symbol('description');
```
**特点：** 唯一标识符，常用于对象属性名

#### 7. BigInt (ES2020)
```javascript
const bigNumber = 9007199254740991n;
```
**特点：** 表示任意精度的整数

### 引用数据类型 (Reference Types)

#### 对象 (Object)
```javascript
let person = {
    name: "赵六",
    age: 28,
    city: "北京"
};

// 访问属性
console.log(person.name);        // 点语法
console.log(person["age"]);      // 方括号语法
```
**特点：** 键值对集合，属性名可以是字符串或Symbol

#### 数组 (Array)
```javascript
let colors = ["红", "绿", "蓝"];
let mixed = [1, "hello", true, null];

// 访问元素
console.log(colors[0]);         // 红
console.log(colors.length);     // 3
```
**特点：** 有序集合，支持多种数据类型混合

#### 函数 (Function)
```javascript
function greet(name) {
    return `你好，${name}！`;
}
```
**特点：** 一等公民，可以赋值给变量，作为参数传递

## 类型检测与转换

### 类型检测
```javascript
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (历史遗留问题)
typeof {}           // "object"
typeof []           // "object"
typeof function(){} // "function"

// 更准确的类型检测
Array.isArray([])   // true
Object.prototype.toString.call(null) // "[object Null]"
```

### 类型转换
```javascript
// 显式转换
String(123)         // "123"
Number("123")       // 123
Boolean(1)          // true

// 隐式转换
"5" + 3             // "53" (字符串拼接)
"5" - 3             // 2 (数字运算)
!0                  // true (布尔转换)
```

## 运算符

### 算术运算符
```javascript
let a = 10, b = 3;
console.log(a + b);   // 13 (加法)
console.log(a - b);   // 7  (减法)
console.log(a * b);   // 30 (乘法)
console.log(a / b);   // 3.333... (除法)
console.log(a % b);   // 1 (取余)
console.log(a ** b);  // 1000 (幂运算)
```

### 比较运算符
```javascript
console.log(5 == "5");   // true (值相等)
console.log(5 === "5");  // false (严格相等)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true
```

### 逻辑运算符
```javascript
console.log(true && false);  // false (与)
console.log(true || false);  // true (或)
console.log(!true);          // false (非)
```

### 赋值运算符
```javascript
let x = 10;
x += 5;    // x = x + 5
x -= 3;    // x = x - 3
x *= 2;    // x = x * 2
```

## 控制结构

### 条件语句
```javascript
// if-else
if (age >= 18) {
    console.log("成年人");
} else if (age >= 12) {
    console.log("青少年");
} else {
    console.log("儿童");
}

// 三元运算符
let status = age >= 18 ? "成年" : "未成年";
```

### 循环语句
```javascript
// for循环
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while循环
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// for...of (ES6)
for (let color of colors) {
    console.log(color);
}
```

## 内存管理

### 垃圾回收机制
- **引用计数：** 记录对象被引用的次数
- **标记清除：** 标记可达对象，清除不可达对象
- **分代回收：** 根据对象存活时间分代处理

### 内存泄漏防范
```javascript
// 避免全局变量
let globalData = []; // 可能导致内存泄漏

// 及时清理事件监听器
element.removeEventListener('click', handler);

// 避免闭包陷阱
function createLeak() {
    const data = new Array(1000000);
    return function() {
        console.log(data.length); // 闭包持有data引用
    };
}
```

## 面试重点

### 核心概念
1. **变量提升：** `var`声明的变量会被提升到作用域顶部
2. **暂时性死区：** `let`和`const`声明的变量在声明前不可访问
3. **类型转换：** 了解隐式转换的规则和陷阱
4. **作用域链：** 变量查找的机制和规则

### 常见陷阱
1. **`typeof null`返回`"object"`** - 历史遗留问题
2. **浮点数精度问题** - 0.1 + 0.2 !== 0.3
3. **隐式类型转换** - 可能导致意外结果
4. **变量提升** - 可能造成代码执行顺序混乱

## 实践练习

### 基础练习
1. 声明不同类型的变量并测试类型
2. 练习各种运算符的使用
3. 编写简单的条件判断和循环程序
4. 测试类型转换的各种情况

### 进阶练习
1. 理解作用域和变量提升
2. 分析内存使用情况
3. 编写类型安全的代码
4. 优化代码性能

## 下一步

掌握基础语法后，建议学习：
- **[函数编程基础](./functions.md)** - 函数定义、参数、作用域、闭包
- **[对象与面向对象](./objects.md)** - 对象创建、原型链、继承模式

继续学习，加油！🚀

 