# JavaScript 对象编程 🏗️

对象是JavaScript中最重要的数据类型，它允许我们将相关的数据和功能组织在一起。

## 🎯 对象基础

### 1. 对象字面量
```javascript
// 创建对象
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    greet: function() {
        return `你好，我是${this.name}`;
    }
};

// 访问属性
console.log(person.name);        // 张三
console.log(person["age"]);      // 25
console.log(person.greet());     // 你好，我是张三
```

### 2. 构造函数
```javascript
// 构造函数（首字母大写）
function Person(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
    this.greet = function() {
        return `你好，我是${this.name}`;
    };
}

// 创建实例
const person1 = new Person("李四", 30, "上海");
const person2 = new Person("王五", 28, "广州");

console.log(person1.greet()); // 你好，我是李四
console.log(person2.greet()); // 你好，我是王五
```

### 3. 类语法 (ES6)
```javascript
class Person {
    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    
    greet() {
        return `你好，我是${this.name}`;
    }
    
    getInfo() {
        return `${this.name}，${this.age}岁，来自${this.city}`;
    }
}

const person = new Person("赵六", 32, "深圳");
console.log(person.greet());   // 你好，我是赵六
console.log(person.getInfo()); // 赵六，32岁，来自深圳
```

## 🔧 对象操作

### 1. 属性操作
```javascript
const user = { name: "张三", age: 25 };

// 添加属性
user.email = "zhangsan@example.com";
user["phone"] = "13800138000";

// 修改属性
user.age = 26;

// 删除属性
delete user.phone;

// 检查属性是否存在
console.log("name" in user);           // true
console.log(user.hasOwnProperty("age")); // true
```

### 2. 对象方法
```javascript
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    
    subtract(a, b) {  // 简写语法
        return a - b;
    },
    
    multiply: (a, b) => a * b,  // 箭头函数
    
    divide(a, b) {
        if (b === 0) {
            throw new Error("除数不能为零");
        }
        return a / b;
    }
};

console.log(calculator.add(5, 3));      // 8
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(2, 6));  // 12
console.log(calculator.divide(15, 3));   // 5
```

### 3. 对象遍历
```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    hobby: "编程"
};

// 遍历键
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 获取所有键
console.log(Object.keys(person));     // ['name', 'age', 'city', 'hobby']

// 获取所有值
console.log(Object.values(person));   // ['张三', 25, '北京', '编程']

// 获取所有键值对
console.log(Object.entries(person));  // [['name', '张三'], ['age', 25], ...]
```

## 🏗️ 继承和原型

### 1. 原型链
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return `${this.name}发出声音`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    return `${this.name}汪汪叫`;
};

const dog = new Dog("小白", "金毛");
console.log(dog.speak()); // 小白发出声音
console.log(dog.bark());  // 小白汪汪叫
```

### 2. 类继承 (ES6)
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
        super(name);  // 调用父类构造函数
        this.breed = breed;
    }
    
    bark() {
        return `${this.name}汪汪叫`;
    }
    
    getInfo() {
        return `${this.name}是一只${this.breed}`;
    }
}

const dog = new Dog("小黑", "拉布拉多");
console.log(dog.speak());  // 小黑发出声音
console.log(dog.bark());   // 小黑汪汪叫
console.log(dog.getInfo()); // 小黑是一只拉布拉多
```

## 🔧 高级特性

### 1. 静态方法
```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static PI = 3.14159;
}

console.log(MathUtils.add(5, 3));      // 8
console.log(MathUtils.multiply(4, 6)); // 24
console.log(MathUtils.PI);             // 3.14159
```

### 2. 私有字段 (ES2022)
```javascript
class BankAccount {
    #balance = 0;  // 私有字段
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return true;
        }
        return false;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // 错误！私有字段无法访问
```

### 3. 对象解构和展开
```javascript
const person = {
    name: "张三",
    age: 25,
    city: "北京",
    hobby: "编程"
};

// 对象解构
const { name, age, ...rest } = person;
console.log(name); // 张三
console.log(age);  // 25
console.log(rest); // { city: "北京", hobby: "编程" }

// 对象展开
const personCopy = { ...person };
const personWithJob = { ...person, job: "前端工程师" };

console.log(personCopy);      // 复制原对象
console.log(personWithJob);   // 添加新属性
```

## 💡 最佳实践

### 1. 对象设计原则
```javascript
// 单一职责原则
class UserManager {
    constructor() {
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    removeUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }
    
    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }
}

// 组合优于继承
class Logger {
    log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}

class UserService {
    constructor() {
        this.logger = new Logger();
    }
    
    createUser(userData) {
        this.logger.log(`创建用户: ${userData.name}`);
        // 用户创建逻辑
    }
}
```

### 2. 性能优化
```javascript
// 避免在循环中创建函数
const users = [
    { name: "张三", age: 25 },
    { name: "李四", age: 30 },
    { name: "王五", age: 28 }
];

// 好的做法
const greet = function(user) {
    return `你好，${user.name}`;
};

users.forEach(user => {
    console.log(greet(user));
});

// 避免的做法
users.forEach(user => {
    const greet = function(user) {  // 每次循环都创建新函数
        return `你好，${user.name}`;
    };
    console.log(greet(user));
});
```

## 🎯 总结

对象编程是JavaScript的核心概念，掌握好对象的使用方法对于编写高质量的代码至关重要：

1. **基础语法** - 对象字面量、构造函数、类
2. **操作技巧** - 属性操作、方法定义、对象遍历
3. **继承机制** - 原型链、类继承
4. **现代特性** - 静态方法、私有字段、解构展开
5. **最佳实践** - 设计原则、性能优化

通过不断练习和实践，你将能够熟练运用对象编程来构建复杂的应用程序！ 