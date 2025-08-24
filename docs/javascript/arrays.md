# JavaScript 数组与集合操作

## 概述
数组是JavaScript中最常用的数据结构之一，它提供了丰富的方法来操作和转换数据。掌握数组操作是进行数据处理和算法实现的基础。

## 学习目标
- 理解数组的创建方式和基本操作
- 掌握数组的迭代和转换方法
- 学会使用Map、Set等集合类型
- 为理解函数式编程和数据处理打下基础

## 数组基础

### 数组创建方式

#### 1. 数组字面量（推荐）
```javascript
const fruits = ["苹果", "香蕉", "橙子"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, undefined];
```
**特点：** 语法简洁，适合创建已知内容的数组

#### 2. 构造函数
```javascript
const colors = new Array("红", "绿", "蓝");
const emptyArray = new Array(5); // 创建长度为5的空数组
```
**特点：** 适合动态创建数组，但语法冗长

#### 3. Array.from() 方法
```javascript
const arrayFromString = Array.from("JavaScript");
// ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']

const arrayFromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// 带映射函数
const doubled = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
```
**特点：** 可以从类数组对象或可迭代对象创建数组

#### 4. 展开运算符
```javascript
const baseArray = [1, 2, 3];
const newArray = [...baseArray, 4, 5]; // [1, 2, 3, 4, 5]
```
**特点：** 语法简洁，适合数组复制和合并

### 数组访问与修改

#### 基本操作
```javascript
const animals = ["猫", "狗", "兔子", "鸟"];

// 访问元素
console.log(animals[0]);        // 猫
console.log(animals.at(-1));    // 鸟 (ES2022，支持负索引)

// 修改元素
animals[1] = "狼";
animals[4] = "鱼"; // 自动扩展数组

// 检查元素
console.log(animals.indexOf("兔子")); // 2
console.log(animals.includes("鸟"));  // true
```

#### 数组长度管理
```javascript
const arr = [1, 2, 3, 4, 5];

// 截断数组
arr.length = 3; // [1, 2, 3]

// 扩展数组
arr.length = 7; // [1, 2, 3, empty × 4]

// 清空数组
arr.length = 0; // []
```

## 数组方法

### 添加和删除元素

#### 末尾操作
```javascript
const fruits = ["苹果", "香蕉"];

// 末尾添加
fruits.push("橙子");           // 返回新长度
fruits.push("葡萄", "草莓");   // 可添加多个元素

// 末尾删除
const lastFruit = fruits.pop(); // 返回被删除的元素
```

#### 开头操作
```javascript
// 开头添加
fruits.unshift("柠檬");        // 返回新长度

// 开头删除
const firstFruit = fruits.shift(); // 返回被删除的元素
```

#### 中间操作
```javascript
const numbers = [1, 2, 3, 4, 5];

// splice(start, deleteCount, ...items) - 修改原数组
const removed = numbers.splice(2, 2, "新元素1", "新元素2");
console.log(removed);  // [3, 4]
console.log(numbers);  // [1, 2, '新元素1', '新元素2', 5]
```

### 数组切片和连接

#### slice() 方法
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 不修改原数组
const firstHalf = numbers.slice(0, 5);    // [1, 2, 3, 4, 5]
const lastHalf = numbers.slice(-5);       // [6, 7, 8, 9, 10]
const middle = numbers.slice(3, 7);       // [4, 5, 6, 7]
```

#### 数组连接
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat() 方法
const combined = arr1.concat(arr2); // [1, 2, 3, 4, 5, 6]

// 展开运算符
const spreadCombined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

## 数组迭代与转换

### 传统循环
```javascript
const numbers = [1, 2, 3, 4, 5];

// for循环
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// for...of循环 (ES6)
for (let num of numbers) {
    console.log(num);
}

// for...in循环（不推荐用于数组）
for (let index in numbers) {
    console.log(index, numbers[index]);
}
```

### 函数式方法

#### forEach() - 遍历
```javascript
const fruits = ["苹果", "香蕉", "橙子"];

fruits.forEach((fruit, index, array) => {
    console.log(`${index}: ${fruit}`);
});
```

#### map() - 映射
```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2);
const withIndex = numbers.map((x, i) => `${i}: ${x}`);

console.log(doubled);     // [2, 4, 6, 8, 10]
console.log(withIndex);   // ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']
```

#### filter() - 过滤
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter(x => x % 2 === 0);
const largeNumbers = numbers.filter(x => x > 5);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
console.log(largeNumbers); // [6, 7, 8, 9, 10]
```

#### reduce() - 归约
```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((total, current) => total + current, 0);
const max = numbers.reduce((max, current) => Math.max(max, current));

console.log(sum); // 15
console.log(max); // 5

// 复杂归约
const users = [
    { name: "张三", age: 25 },
    { name: "李四", age: 30 },
    { name: "王五", age: 28 }
];

const ageStats = users.reduce((stats, user) => {
    stats.total += user.age;
    stats.count++;
    stats.average = stats.total / stats.count;
    return stats;
}, { total: 0, count: 0, average: 0 });
```

### 查找方法

#### 基本查找
```javascript
const fruits = ["苹果", "香蕉", "橙子", "葡萄"];

// 查找元素
console.log(fruits.indexOf("香蕉"));     // 1
console.log(fruits.lastIndexOf("葡萄")); // 3
console.log(fruits.includes("苹果"));    // true

// 查找索引
const bananaIndex = fruits.findIndex(fruit => fruit === "香蕉"); // 1
```

#### 条件查找
```javascript
const users = [
    { name: "张三", age: 25, city: "北京" },
    { name: "李四", age: 30, city: "上海" },
    { name: "王五", age: 28, city: "广州" }
];

// 查找第一个符合条件的元素
const beijingUser = users.find(user => user.city === "北京");

// 查找所有符合条件的元素
const youngUsers = users.filter(user => user.age < 30);

// 检查是否所有元素都符合条件
const allAdults = users.every(user => user.age >= 18);

// 检查是否有元素符合条件
const hasShanghaiUser = users.some(user => user.city === "上海");
```

## 数组排序和反转

### 排序
```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 数字排序
numbers.sort((a, b) => a - b); // [1, 1, 2, 3, 4, 5, 6, 9]
numbers.sort((a, b) => b - a); // [9, 6, 5, 4, 3, 2, 1, 1]

// 字符串排序
const fruits = ["香蕉", "苹果", "橙子"];
fruits.sort(); // ['苹果', '香蕉', '橙子']

// 对象排序
const users = [
    { name: "张三", age: 25 },
    { name: "李四", age: 30 },
    { name: "王五", age: 28 }
];

users.sort((a, b) => a.age - b.age); // 按年龄排序
users.sort((a, b) => a.name.localeCompare(b.name)); // 按姓名排序
```

### 反转
```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.reverse(); // [5, 4, 3, 2, 1]
```

## 集合类型

### Set - 集合
```javascript
// 创建Set
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log([...uniqueNumbers]); // [1, 2, 3, 4]

// 基本操作
const set = new Set();
set.add(1);
set.add(2);
set.add(2); // 重复值会被忽略
console.log(set.size); // 2

// 检查元素
console.log(set.has(1)); // true
console.log(set.has(3)); // false

// 删除元素
set.delete(1);
set.clear(); // 清空所有元素
```

### Map - 映射
```javascript
// 创建Map
const userMap = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

// 基本操作
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

// 获取值
console.log(map.get('key1')); // 'value1'

// 检查键
console.log(map.has('key1')); // true

// 删除键值对
map.delete('key1');
map.clear(); // 清空所有键值对
```

### WeakSet 和 WeakMap
```javascript
// WeakSet - 弱引用集合
const weakSet = new WeakSet();
let obj1 = { name: "张三" };
weakSet.add(obj1);

// WeakMap - 弱引用映射
const weakMap = new WeakMap();
let obj2 = { id: 1 };
weakMap.set(obj2, "数据");

// 当对象没有其他引用时，会被垃圾回收
obj1 = null;
obj2 = null;
```

## 数组性能优化

### 避免常见陷阱
```javascript
// 1. 避免在循环中修改数组长度
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        arr.splice(i, 1); // 危险：会改变数组长度
        i--; // 需要调整索引
    }
}

// 2. 使用反向循环删除元素
for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] % 2 === 0) {
        arr.splice(i, 1); // 安全：不会影响未处理的索引
    }
}

// 3. 使用filter创建新数组（推荐）
const filteredArr = arr.filter(x => x % 2 !== 0);
```

### 性能优化技巧
```javascript
// 1. 缓存数组长度
const numbers = [1, 2, 3, 4, 5];
const len = numbers.length;
for (let i = 0; i < len; i++) {
    // 处理逻辑
}

// 2. 使用Set进行快速查找
const fruits = ["苹果", "香蕉", "橙子"];
const fruitSet = new Set(fruits);
console.log(fruitSet.has("苹果")); // 比 indexOf 快

// 3. 避免频繁的数组操作
const result = [];
for (let i = 0; i < 1000; i++) {
    result.push(i); // 频繁的push操作
}

// 优化：预分配数组大小
const optimizedResult = new Array(1000);
for (let i = 0; i < 1000; i++) {
    optimizedResult[i] = i;
}
```

## 面试重点

### 核心概念
1. **数组方法分类：** 修改原数组的方法（push、pop、splice等）和不修改原数组的方法（slice、map、filter等）
2. **迭代器协议：** 理解for...of循环和迭代器的关系
3. **函数式编程：** map、filter、reduce等方法的链式调用
4. **集合类型：** Set、Map的特点和适用场景

### 常见问题
1. **数组去重：** 使用Set、filter、reduce等方法实现
2. **数组扁平化：** 处理嵌套数组的多种方法
3. **性能优化：** 避免在循环中修改数组，合理使用集合类型
4. **内存管理：** WeakSet和WeakMap的垃圾回收机制

### 实际应用
1. **数据处理：** 使用数组方法处理API返回的数据
2. **算法实现：** 数组作为基础数据结构实现各种算法
3. **状态管理：** 在React等框架中管理组件状态
4. **缓存优化：** 使用Set和Map实现高效的查找和缓存

## 实践练习

### 基础练习
1. 使用不同方式创建和操作数组
2. 练习数组的迭代和转换方法
3. 理解Set和Map的使用场景
4. 实现数组的常见操作（去重、扁平化等）

### 进阶练习
1. 实现自定义的数组方法
2. 优化数组操作的性能
3. 使用数组方法解决实际问题
4. 分析框架源码中的数组使用

## 下一步

掌握数组与集合操作后，建议学习：
- **[DOM操作与事件](./dom.md)** - 元素选择、事件处理、DOM操作
- **[事件系统详解](./events.md)** - 事件机制、事件委托、自定义事件

继续学习，加油！🚀 