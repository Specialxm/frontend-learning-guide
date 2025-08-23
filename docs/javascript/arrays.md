# JavaScript 数组操作

数组是JavaScript中最常用的数据结构之一，它提供了丰富的方法来操作和转换数据。

## 数组基础

### 1. 创建数组
```javascript
// 数组字面量
const fruits = ["苹果", "香蕉", "橙子"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, undefined];

// 构造函数
const colors = new Array("红", "绿", "蓝");
const emptyArray = new Array(5); // 创建长度为5的空数组

// Array.from() 方法
const arrayFromString = Array.from("JavaScript"); // ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']
const arrayFromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]
```

### 2. 访问和修改元素
```javascript
const animals = ["猫", "狗", "兔子", "鸟"];

// 访问元素
console.log(animals[0]);        // 猫
console.log(animals[animals.length - 1]); // 鸟

// 修改元素
animals[1] = "狼";
animals[4] = "鱼"; // 自动扩展数组

// 检查索引
console.log(animals.indexOf("兔子")); // 2
console.log(animals.includes("鸟"));  // true
```

## 数组方法

### 1. 添加和删除元素
```javascript
const fruits = ["苹果", "香蕉"];

// 末尾添加元素
fruits.push("橙子");           // 返回新长度
fruits.push("葡萄", "草莓");   // 可以添加多个元素

// 末尾删除元素
const lastFruit = fruits.pop(); // 返回被删除的元素

// 开头添加元素
fruits.unshift("柠檬");        // 返回新长度

// 开头删除元素
const firstFruit = fruits.shift(); // 返回被删除的元素

console.log(fruits); // ['柠檬', '苹果', '香蕉', '橙子', '葡萄']
```

### 2. 数组切片和拼接
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// slice(start, end) - 不修改原数组
const firstHalf = numbers.slice(0, 5);    // [1, 2, 3, 4, 5]
const lastHalf = numbers.slice(-5);       // [6, 7, 8, 9, 10]
const middle = numbers.slice(3, 7);       // [4, 5, 6, 7]

// splice(start, deleteCount, ...items) - 修改原数组
const removed = numbers.splice(2, 3);     // 从索引2开始删除3个元素
console.log(removed);                     // [3, 4, 5]
console.log(numbers);                     // [1, 2, 6, 7, 8, 9, 10]

numbers.splice(2, 0, "新元素");           // 在索引2处插入新元素
console.log(numbers);                     // [1, 2, '新元素', 6, 7, 8, 9, 10]
```

### 3. 数组连接和展开
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// concat() 方法
const combined = arr1.concat(arr2, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 展开运算符 (ES6)
const spreadCombined = [...arr1, ...arr2, ...arr3];
console.log(spreadCombined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 复制数组
const arrCopy = [...arr1]; // 浅拷贝
```

## 数组查找和过滤

### 1. 查找方法
```javascript
const users = [
    { id: 1, name: "张三", age: 25 },
    { id: 2, name: "李四", age: 30 },
    { id: 3, name: "王五", age: 28 },
    { id: 4, name: "赵六", age: 25 }
];

// find() - 返回第一个满足条件的元素
const user25 = users.find(user => user.age === 25);
console.log(user25); // { id: 1, name: "张三", age: 25 }

// findIndex() - 返回第一个满足条件的元素索引
const index30 = users.findIndex(user => user.age === 30);
console.log(index30); // 1

// indexOf() - 查找简单值
const names = ["张三", "李四", "王五"];
console.log(names.indexOf("李四")); // 1
console.log(names.lastIndexOf("张三")); // 0
```

### 2. 过滤和排序
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// filter() - 过滤元素
const evenNumbers = numbers.filter(num => num % 2 === 0);
const oddNumbers = numbers.filter(num => num % 2 !== 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
console.log(oddNumbers);  // [1, 3, 5, 7, 9]

// sort() - 排序（修改原数组）
const fruits = ["香蕉", "苹果", "橙子", "葡萄"];
fruits.sort(); // 按Unicode排序
console.log(fruits); // ['橙子', '葡萄', '苹果', '香蕉']

// 数字排序
const scores = [85, 92, 78, 96, 88];
scores.sort((a, b) => a - b); // 升序
console.log(scores); // [78, 85, 88, 92, 96]

scores.sort((a, b) => b - a); // 降序
console.log(scores); // [96, 92, 88, 85, 78]
```

## 数组转换

### 1. map() 方法
```javascript
const numbers = [1, 2, 3, 4, 5];

// 将每个元素乘以2
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 转换对象数组
const users = [
    { firstName: "张", lastName: "三" },
    { firstName: "李", lastName: "四" },
    { firstName: "王", lastName: "五" }
];

const fullNames = users.map(user => `${user.firstName}${user.lastName}`);
console.log(fullNames); // ['张三', '李四', '王五']

// 带索引的map
const indexed = numbers.map((num, index) => `${index}: ${num}`);
console.log(indexed); // ['0: 1', '1: 2', '2: 3', '3: 4', '4: 5']
```

### 2. reduce() 方法
```javascript
const numbers = [1, 2, 3, 4, 5];

// 求和
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// 求最大值
const max = numbers.reduce((max, num) => Math.max(max, num));
console.log(max); // 5

// 统计元素出现次数
const fruits = ["苹果", "香蕉", "苹果", "橙子", "香蕉", "苹果"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { 苹果: 3, 香蕉: 2, 橙子: 1 }

// 数组扁平化
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((flat, arr) => flat.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

### 3. flatMap() 方法 (ES2019)
```javascript
const sentences = ["Hello World", "JavaScript is fun", "Learn coding"];

// 分割单词并扁平化
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words); // ['Hello', 'World', 'JavaScript', 'is', 'fun', 'Learn', 'coding']

// 过滤并转换
const numbers = [1, 2, 3, 4, 5];
const result = numbers.flatMap(num => 
    num % 2 === 0 ? [num * 2] : []
);
console.log(result); // [4, 8]
```

## 数组测试

### 1. 测试方法
```javascript
const numbers = [2, 4, 6, 8, 10];

// every() - 所有元素都满足条件
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true

// some() - 至少有一个元素满足条件
const hasLarge = numbers.some(num => num > 8);
console.log(hasLarge); // true

// includes() - 检查是否包含某个值
console.log(numbers.includes(6)); // true
console.log(numbers.includes(5)); // false
```

## 高级数组操作

### 1. 数组去重
```javascript
const numbers = [1, 2, 2, 3, 3, 4, 5, 5];

// 使用Set
const unique1 = [...new Set(numbers)];
console.log(unique1); // [1, 2, 3, 4, 5]

// 使用filter
const unique2 = numbers.filter((num, index) => numbers.indexOf(num) === index);
console.log(unique2); // [1, 2, 3, 4, 5]

// 使用reduce
const unique3 = numbers.reduce((acc, num) => {
    if (!acc.includes(num)) {
        acc.push(num);
    }
    return acc;
}, []);
console.log(unique3); // [1, 2, 3, 4, 5]
```

### 2. 数组分组
```javascript
const users = [
    { name: "张三", age: 25, city: "北京" },
    { name: "李四", age: 30, city: "上海" },
    { name: "王五", age: 25, city: "北京" },
    { name: "赵六", age: 30, city: "广州" }
];

// 按年龄分组
const groupedByAge = users.reduce((acc, user) => {
    const age = user.age;
    if (!acc[age]) {
        acc[age] = [];
    }
    acc[age].push(user);
    return acc;
}, {});

console.log(groupedByAge);
// {
//   25: [
//     { name: "张三", age: 25, city: "北京" },
//     { name: "王五", age: 25, city: "北京" }
//   ],
//   30: [
//     { name: "李四", age: 30, city: "上海" },
//     { name: "赵六", age: 30, city: "广州" }
//   ]
// }
```

### 3. 数组分块
```javascript
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = chunkArray(numbers, 3);
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

## 性能优化技巧

### 1. 避免在循环中修改数组
```javascript
// 不好的做法
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        numbers.splice(i, 1); // 会改变数组长度和索引
        i--; // 需要调整索引
    }
}

// 好的做法
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter(num => num % 2 !== 0);
```

### 2. 使用适当的方法
```javascript
const numbers = [1, 2, 3, 4, 5];

// 查找元素 - 使用find而不是filter
const found = numbers.find(num => num > 3); // 找到第一个就停止

// 检查存在性 - 使用some而不是find
const exists = numbers.some(num => num > 3); // 找到第一个就返回true
```

## 总结

数组是JavaScript中最强大的数据结构之一，掌握好数组方法对于数据处理至关重要：

1. **基础操作** - 创建、访问、修改数组
2. **常用方法** - push、pop、shift、unshift、slice、splice
3. **查找过滤** - find、filter、indexOf、includes
4. **转换方法** - map、reduce、flatMap
5. **测试方法** - every、some、includes
6. **高级技巧** - 去重、分组、分块
7. **性能优化** - 避免在循环中修改数组

## 延伸阅读

- **[MDN - 数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)** - 数组方法和属性详解
- **[MDN - 数组方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#数组方法)** - 数组操作指南
- **[MDN - 迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)** - 迭代器和生成器

通过熟练运用这些方法，你将能够高效地处理各种数据操作任务！ 