# JavaScript 对象编程

对象是JavaScript中最重要的数据类型之一，它允许我们将相关的数据和功能组织在一起。

## 对象基础

### 1. 创建对象
```javascript
// 对象字面量
const person = {
    name: "张三",
    age: 25,
    city: "北京"
};

// 构造函数
const car = new Object();
car.brand = "丰田";
car.model = "凯美瑞";
car.year = 2020;

// Object.create() 方法
const animal = Object.create(null);
animal.type = "猫";
animal.color = "白色";
```

### 2. 访问和修改属性
```javascript
const user = {
    name: "李四",
    age: 30,
    email: "lisi@example.com"
};

// 点语法访问
console.log(user.name);        // 李四
console.log(user.age);         // 30

// 方括号语法访问
console.log(user["name"]);     // 李四
console.log(user["age"]);      // 30

// 动态属性名
const propertyName = "email";
console.log(user[propertyName]); // lisi@example.com

// 修改属性
user.age = 31;
user["city"] = "上海";

// 添加新属性
user.phone = "13800138000";
```

## 对象方法

### 1. 定义方法
```javascript
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    
    subtract: function(a, b) {
        return a - b;
    },
    
    // 简写语法 (ES6)
    multiply(a, b) {
        return a * b;
    },
    
    divide(a, b) {
        return a / b;
    }
};

// 使用方法
console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(6, 7));  // 42
```

### 2. this 关键字
```javascript
const person = {
    name: "王五",
    age: 28,
    
    greet() {
        console.log(`你好，我是${this.name}，今年${this.age}岁`);
    },
    
    birthday() {
        this.age++;
        console.log(`生日快乐！现在${this.age}岁了`);
    }
};

person.greet();     // 你好，我是王五，今年28岁
person.birthday();  // 生日快乐！现在29岁了
person.greet();     // 你好，我是王五，今年29岁
```

## 对象高级特性

### 1. 属性描述符
```javascript
const config = {};

Object.defineProperty(config, 'apiKey', {
    value: 'abc123',
    writable: false,        // 不可写
    enumerable: false,      // 不可枚举
    configurable: false     // 不可配置
});

// 尝试修改
config.apiKey = 'newKey';   // 无效
console.log(config.apiKey); // abc123

// 检查属性描述符
const descriptor = Object.getOwnPropertyDescriptor(config, 'apiKey');
console.log(descriptor);
```

### 2. 原型和继承
```javascript
// 构造函数
function Animal(name, species) {
    this.name = name;
    this.species = species;
}

// 原型方法
Animal.prototype.speak = function() {
    console.log(`${this.name}是一只${this.species}`);
};

// 创建实例
const dog = new Animal("旺财", "狗");
const cat = new Animal("咪咪", "猫");

dog.speak(); // 旺财是一只狗
cat.speak(); // 咪咪是一只猫

// 检查原型
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.isPrototypeOf(dog)); // true
```

## 现代对象语法

### 1. 计算属性名
```javascript
const prefix = "user_";
const id = 123;

const user = {
    [prefix + id]: "张三",
    [`${prefix}${id}_name`]: "李四",
    [prefix + "status"]: "active"
};

console.log(user); // { user_123: "张三", user_123_name: "李四", user_status: "active" }
```

### 2. 对象解构
```javascript
const person = {
    name: "赵六",
    age: 35,
    city: "广州",
    job: "工程师"
};

// 基本解构
const { name, age } = person;
console.log(name, age); // 赵六 35

// 重命名变量
const { name: personName, job: profession } = person;
console.log(personName, profession); // 赵六 工程师

// 默认值
const { country = "中国" } = person;
console.log(country); // 中国

// 嵌套解构
const company = {
    name: "科技公司",
    address: {
        city: "深圳",
        street: "科技路123号"
    }
};

const { address: { city, street } } = company;
console.log(city, street); // 深圳 科技路123号
```

### 3. 对象展开运算符
```javascript
const baseConfig = {
    host: "localhost",
    port: 3000,
    timeout: 5000
};

const devConfig = {
    ...baseConfig,
    port: 3001,
    debug: true
};

const prodConfig = {
    ...baseConfig,
    host: "production.com",
    timeout: 10000
};

console.log(devConfig);
console.log(prodConfig);

// 合并对象
const user = { name: "张三", age: 25 };
const details = { city: "北京", job: "工程师" };
const completeUser = { ...user, ...details };
console.log(completeUser); // { name: "张三", age: 25, city: "北京", job: "工程师" }
```

## 对象实用方法

### 1. 对象遍历
```javascript
const person = {
    name: "王五",
    age: 28,
    city: "上海"
};

// for...in 循环
for (let key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`${key}: ${person[key]}`);
    }
}

// Object.keys()
const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']

// Object.values()
const values = Object.values(person);
console.log(values); // ['王五', 28, '上海']

// Object.entries()
const entries = Object.entries(person);
console.log(entries); // [['name', '王五'], ['age', 28], ['city', '上海']]

// 使用 entries 进行遍历
entries.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

### 2. 对象比较和复制
```javascript
// 浅拷贝
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

// 深拷贝
const deepCopy = JSON.parse(JSON.stringify(original));

// 对象合并
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 3, c: 4 }

// 对象冻结
const frozen = Object.freeze({ name: "张三", age: 25 });
// frozen.age = 26; // 错误！不能修改冻结对象
```

## 最佳实践

### 1. 对象设计原则
- **单一职责** - 每个对象只负责一个功能
- **封装性** - 隐藏内部实现细节
- **一致性** - 保持命名和结构的一致性
- **可扩展性** - 设计时考虑未来扩展

### 2. 性能优化
```javascript
// 避免在循环中创建对象
const users = [];
for (let i = 0; i < 1000; i++) {
    users.push({
        id: i,
        name: `用户${i}`,
        email: `user${i}@example.com`
    });
}

// 使用对象池模式
const objectPool = [];
function getObject() {
    return objectPool.pop() || { name: "", age: 0 };
}

function returnObject(obj) {
    objectPool.push(obj);
}
```

## 总结

对象是JavaScript编程的核心概念，掌握好对象的使用对于编写高质量的代码至关重要：

1. **基础语法** - 对象字面量、属性访问、方法定义
2. **高级特性** - 属性描述符、原型继承、this绑定
3. **现代语法** - 计算属性、解构赋值、展开运算符
4. **实用方法** - 对象遍历、比较、复制
5. **最佳实践** - 设计原则、性能优化

## 延伸阅读

- **[MDN - 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)** - 对象方法和属性详解
- **[JavaScript.info - 对象](https://javascript.info/object)** - 现代JavaScript对象教程
- **[ES6 对象扩展](https://es6.ruanyifeng.com/#docs/object)** - ES6对象新特性 