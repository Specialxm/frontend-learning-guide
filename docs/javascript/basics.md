# JavaScript 基础语法 📝

JavaScript基础语法是学习这门语言的第一步，包括变量、数据类型、运算符等核心概念。

## 🔤 变量声明

### 1. var（传统方式）
```javascript
var name = "张三";
var age = 25;
var isStudent = true;
```

### 2. let（推荐使用）
```javascript
let name = "李四";
let age = 30;
let isStudent = false;
```

### 3. const（常量）
```javascript
const PI = 3.14159;
const APP_NAME = "前端学习指南";
const MAX_SIZE = 100;
```

## 📊 数据类型

### 1. 基本数据类型

#### 字符串 (String)
```javascript
let firstName = "王";
let lastName = '五';
let fullName = `${firstName}${lastName}`; // 模板字符串
let message = "Hello\nWorld"; // 转义字符
```

#### 数字 (Number)
```javascript
let integer = 42;
let float = 3.14;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;
```

#### 布尔值 (Boolean)
```javascript
let isTrue = true;
let isFalse = false;
let result = 5 > 3; // true
```

#### 空值 (Null)
```javascript
let empty = null;
```

#### 未定义 (Undefined)
```javascript
let notDefined;
let alsoUndefined = undefined;
```

### 2. 引用数据类型

#### 对象 (Object)
```javascript
let person = {
    name: "赵六",
    age: 28,
    city: "北京"
};

// 访问属性
console.log(person.name); // 点语法
console.log(person["age"]); // 方括号语法
```

#### 数组 (Array)
```javascript
let colors = ["红", "绿", "蓝"];
let mixed = [1, "hello", true, null];

// 访问元素
console.log(colors[0]); // 红
console.log(colors.length); // 3
```

## 🔧 运算符

### 1. 算术运算符
```javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13 (加法)
console.log(a - b);   // 7  (减法)
console.log(a * b);   // 30 (乘法)
console.log(a / b);   // 3.333... (除法)
console.log(a % b);   // 1  (取余)
console.log(a ** b);  // 1000 (幂运算)
console.log(a++);     // 10 (后递增)
console.log(++a);     // 12 (前递增)
```

### 2. 比较运算符
```javascript
let x = 5;
let y = "5";

console.log(x == y);   // true (值相等)
console.log(x === y);  // false (值和类型都相等)
console.log(x != y);   // false (值不相等)
console.log(x !== y);  // true (值或类型不相等)
console.log(x > 3);    // true (大于)
console.log(x <= 5);   // true (小于等于)
```

### 3. 逻辑运算符
```javascript
let isAdult = true;
let hasLicense = false;

console.log(isAdult && hasLicense);  // false (与)
console.log(isAdult || hasLicense);  // true  (或)
console.log(!isAdult);               // false (非)
```

### 4. 赋值运算符
```javascript
let num = 10;

num += 5;   // 等同于 num = num + 5
num -= 3;   // 等同于 num = num - 3
num *= 2;   // 等同于 num = num * 2
num /= 4;   // 等同于 num = num / 4
num %= 3;   // 等同于 num = num % 3
```

## 🎯 类型转换

### 1. 显式转换
```javascript
// 转换为字符串
let num = 42;
let str = String(num);        // "42"
let str2 = num.toString();    // "42"

// 转换为数字
let strNum = "123";
let number = Number(strNum);  // 123
let parsed = parseInt("123"); // 123
let parsedFloat = parseFloat("3.14"); // 3.14

// 转换为布尔值
let bool = Boolean(1);        // true
let bool2 = Boolean(0);       // false
let bool3 = Boolean("");      // false
let bool4 = Boolean("hello"); // true
```

### 2. 隐式转换
```javascript
// 字符串连接
console.log("5" + 3);        // "53"
console.log("5" - 3);        // 2

// 比较转换
console.log("5" == 5);       // true
console.log("5" === 5);      // false

// 布尔转换
if ("hello") {
    console.log("字符串非空，转换为true");
}
```

## 🔧 实践练习

创建一个简单的计算器：

```javascript
// 获取用户输入
let num1 = prompt("请输入第一个数字：");
let num2 = prompt("请输入第二个数字：");
let operator = prompt("请输入运算符 (+, -, *, /)：");

// 转换为数字
num1 = Number(num1);
num2 = Number(num2);

let result;

// 执行计算
switch(operator) {
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "*":
        result = num1 * num2;
        break;
    case "/":
        if (num2 !== 0) {
            result = num1 / num2;
        } else {
            result = "错误：除数不能为0";
        }
        break;
    default:
        result = "无效的运算符";
}

// 显示结果
alert(`计算结果：${result}`);
```

## 📚 重要概念

1. **变量提升** - var声明的变量会被提升到作用域顶部
2. **块级作用域** - let和const具有块级作用域
3. **严格模式** - 使用"use strict"启用严格模式
4. **类型检查** - 使用typeof检查数据类型

## 💡 最佳实践

1. **优先使用let和const**
2. **避免使用var**
3. **使用严格比较（===）**
4. **注意类型转换**
5. **使用有意义的变量名**

---

**下一步：学习 [函数](./functions.md)** ➡️ 