# JavaScript 对象与面向对象

## 概述
对象是JavaScript中最重要的数据类型之一，它不仅是数据的容器，更是面向对象编程的基础。理解对象、原型链和继承机制是掌握JavaScript高级特性的关键。

## 学习目标
- 理解对象的创建方式和属性管理
- 掌握原型链和继承机制
- 学会使用设计模式解决实际问题
- 为理解现代JavaScript框架打下基础

## 对象基础

### 对象创建方式

#### 1. 对象字面量（推荐）
```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    
    greet() {
        return `你好，我是${this.name}`;
    }
};
```
**特点：** 语法简洁，适合创建简单对象

#### 2. 构造函数
```javascript
const car = new Object();
car.brand = "丰田";
car.model = "凯美瑞";
car.year = 2020;
```
**特点：** 适合动态添加属性，但代码冗长

#### 3. Object.create() 方法
```javascript
const animal = Object.create(null); // 创建无原型对象
animal.type = "猫";
animal.color = "白色";
```
**特点：** 可以指定原型对象，适合继承场景

#### 4. 工厂函数
```javascript
function createPerson(name, age, city) {
    return {
        name,
        age,
        city,
        greet() {
            return `你好，我是${this.name}`;
        }
    };
}

const person1 = createPerson("李四", 30, "上海");
```
**特点：** 可复用，但每个对象都有独立的方法副本

### 属性访问与管理

#### 属性访问
```javascript
const user = {
    name: "王五",
    age: 28,
    email: "wangwu@example.com"
};

// 点语法
console.log(user.name);        // 王五

// 方括号语法
console.log(user["age"]);      // 28

// 动态属性名
const propertyName = "email";
console.log(user[propertyName]); // wangwu@example.com
```

#### 属性描述符
```javascript
const obj = {};

Object.defineProperty(obj, 'readOnly', {
    value: 42,
    writable: false,      // 不可写
    enumerable: true,     // 可枚举
    configurable: false   // 不可配置
});

// 批量定义属性
Object.defineProperties(obj, {
    prop1: {
        value: 'value1',
        writable: true
    },
    prop2: {
        value: 'value2',
        writable: false
    }
});
```

#### 属性检测
```javascript
const user = { name: "赵六", age: 25 };

console.log('name' in user);           // true
console.log(user.hasOwnProperty('age')); // true
console.log(Object.hasOwn(user, 'city')); // false (ES2022)
```

## 对象方法

### 方法定义
```javascript
const calculator = {
    // 传统方法定义
    add: function(a, b) {
        return a + b;
    },
    
    // 简写语法 (ES6)
    subtract(a, b) {
        return a - b;
    },
    
    // 箭头函数（注意this指向）
    multiply: (a, b) => a * b,
    
    // 计算属性名
    ['divide' + 'Method'](a, b) {
        return a / b;
    }
};
```

### this 关键字
```javascript
const person = {
    name: "张三",
    age: 25,
    
    greet() {
        console.log(`你好，我是${this.name}`);
    },
    
    birthday() {
        this.age++;
        console.log(`生日快乐！现在${this.age}岁了`);
    }
};

// 正确调用
person.greet();     // 你好，我是张三

// 错误调用 - this指向丢失
const greetFn = person.greet;
greetFn();          // 你好，我是undefined

// 解决方案1：bind
const boundGreet = person.greet.bind(person);
boundGreet();       // 你好，我是张三

// 解决方案2：箭头函数
const person2 = {
    name: "李四",
    greet: () => console.log(`你好，我是${this.name}`) // 注意：this指向全局
};
```

## 原型与继承

### 原型链机制
```javascript
// 每个对象都有原型
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true

// 原型链查找
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    return `你好，我是${this.name}`;
};

const person = new Person("王五");
console.log(person.greet()); // 你好，我是王五

// 原型链
console.log(person.__proto__ === Person.prototype);           // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);             // true
```

### 构造函数与new操作符
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// new操作符做了什么
function myNew(Constructor, ...args) {
    // 1. 创建空对象
    const obj = {};
    
    // 2. 设置原型
    Object.setPrototypeOf(obj, Constructor.prototype);
    
    // 3. 绑定this并执行构造函数
    const result = Constructor.apply(obj, args);
    
    // 4. 返回对象（如果构造函数返回对象则返回该对象，否则返回新创建的对象）
    return result instanceof Object ? result : obj;
}

const person = myNew(Person, "赵六", 30);
```

### 继承实现

#### 1. 原型链继承
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    Animal.call(this, name); // 调用父构造函数
    this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // 修复constructor

Dog.prototype.bark = function() {
    return `${this.name} barks`;
};

const dog = new Dog("旺财", "金毛");
console.log(dog.speak()); // 旺财 makes a sound
console.log(dog.bark());  // 旺财 barks
```

#### 2. 组合继承（推荐）
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `你好，我是${this.name}`;
};

function Student(name, age, grade) {
    // 继承属性
    Person.call(this, name, age);
    this.grade = grade;
}

// 继承方法
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
    return `${this.name}正在学习`;
};
```

#### 3. ES6 Class继承
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父构造函数
        this.breed = breed;
    }
    
    bark() {
        return `${this.name} barks`;
    }
}

const dog = new Dog("旺财", "金毛");
```

## 设计模式

### 单例模式
```javascript
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.data = [];
    }
    
    add(item) {
        this.data.push(item);
    }
    
    getData() {
        return [...this.data];
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### 工厂模式
```javascript
class UserFactory {
    static createUser(type, userData) {
        switch (type) {
            case 'admin':
                return new AdminUser(userData);
            case 'regular':
                return new RegularUser(userData);
            default:
                throw new Error('Invalid user type');
        }
    }
}

class AdminUser {
    constructor(data) {
        this.name = data.name;
        this.role = 'admin';
        this.permissions = ['read', 'write', 'delete'];
    }
}

class RegularUser {
    constructor(data) {
        this.name = data.name;
        this.role = 'user';
        this.permissions = ['read'];
    }
}
```

### 观察者模式
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

const emitter = new EventEmitter();
emitter.on('userLogin', (user) => console.log(`${user.name} 登录了`));
emitter.emit('userLogin', { name: '张三' });
```

## 现代JavaScript特性

### 对象解构
```javascript
const user = {
    name: "李四",
    age: 30,
    city: "北京",
    hobbies: ["读书", "游泳"]
};

// 基本解构
const { name, age } = user;

// 重命名
const { name: userName, age: userAge } = user;

// 默认值
const { name, age, country = "中国" } = user;

// 嵌套解构
const { hobbies: [firstHobby, ...otherHobbies] } = user;
```

### 对象展开
```javascript
const baseUser = {
    name: "王五",
    age: 25
};

// 创建新对象
const userWithCity = { ...baseUser, city: "上海" };

// 合并对象
const userDetails = { ...baseUser, ...{ email: "wangwu@example.com" } };

// 浅拷贝
const userCopy = { ...baseUser };
```

### 属性简写
```javascript
const name = "赵六";
const age = 28;

// 传统写法
const person = {
    name: name,
    age: age,
    greet: function() {
        return `你好，我是${this.name}`;
    }
};

// 简写写法
const person = {
    name,
    age,
    greet() {
        return `你好，我是${this.name}`;
    }
};
```

## 性能优化

### 属性访问优化
```javascript
// 缓存频繁访问的属性
const user = { name: "张三", age: 25 };
const name = user.name; // 缓存到局部变量

// 避免动态属性名（如果可能）
const propertyName = "name";
console.log(user[propertyName]); // 比 user.name 慢
```

### 对象创建优化
```javascript
// 使用对象池
class ObjectPool {
    constructor(createFn, resetFn) {
        this.pool = [];
        this.createFn = createFn;
        this.resetFn = resetFn;
    }
    
    get() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}
```

## 面试重点

### 核心概念
1. **原型链：** 对象查找属性的机制，形成继承关系
2. **this指向：** 函数执行时的上下文对象
3. **继承方式：** 原型链继承、组合继承、ES6 Class继承
4. **对象创建：** 字面量、构造函数、Object.create等

### 常见问题
1. **原型污染：** 修改Object.prototype可能影响所有对象
2. **this丢失：** 方法作为回调时this指向改变
3. **继承陷阱：** 原型链过长影响性能
4. **内存泄漏：** 循环引用导致对象无法回收

### 实际应用
1. **模块化开发：** 使用对象组织相关功能
2. **设计模式：** 单例、工厂、观察者等模式的应用
3. **性能优化：** 合理使用原型链和属性缓存
4. **代码复用：** 通过继承和组合提高代码复用性

## 实践练习

### 基础练习
1. 使用不同方式创建对象
2. 理解原型链和继承机制
3. 实现简单的设计模式
4. 练习对象解构和展开语法

### 进阶练习
1. 实现完整的继承系统
2. 设计可复用的组件架构
3. 优化对象性能
4. 分析框架源码中的对象使用

## 下一步

掌握对象与面向对象后，建议学习：
- **[数组与集合操作](./arrays.md)** - 数组方法、迭代器、数据结构
- **[DOM操作与事件](./dom.md)** - 元素选择、事件处理、DOM操作

继续学习，加油！🚀 