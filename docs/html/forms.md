# HTML 表单处理

表单是网页中用户输入信息的重要方式，HTML提供了丰富的表单元素来收集用户数据。

## 表单基础结构

### 基本表单
```html
<form action="/submit" method="post">
    <!-- 表单元素 -->
    <input type="text" name="username" placeholder="用户名">
    <button type="submit">提交</button>
</form>
```

### 表单属性说明
- `action` - 表单提交的URL
- `method` - 提交方法（GET或POST）
- `enctype` - 编码类型（默认application/x-www-form-urlencoded）

## 输入元素

### 文本输入
```html
<!-- 单行文本 -->
<input type="text" name="username" placeholder="请输入用户名" required>

<!-- 密码输入 -->
<input type="password" name="password" placeholder="请输入密码" required>

<!-- 邮箱输入 -->
<input type="email" name="email" placeholder="请输入邮箱地址">

<!-- 数字输入 -->
<input type="number" name="age" min="1" max="120" step="1">

<!-- 电话输入 -->
<input type="tel" name="phone" pattern="[0-9]{11}" placeholder="请输入手机号">

<!-- URL输入 -->
<input type="url" name="website" placeholder="请输入网址">
```

### 选择元素
```html
<!-- 单选按钮 -->
<input type="radio" name="gender" value="male" id="male">
<label for="male">男</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">女</label>

<!-- 复选框 -->
<input type="checkbox" name="hobbies" value="reading" id="reading">
<label for="reading">阅读</label>
<input type="checkbox" name="hobbies" value="sports" id="sports">
<label for="sports">运动</label>

<!-- 下拉选择 -->
<select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>

<!-- 多选下拉 -->
<select name="skills" multiple>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
</select>
```

### 特殊输入类型
```html
<!-- 日期选择 -->
<input type="date" name="birthday">

<!-- 时间选择 -->
<input type="time" name="meeting-time">

<!-- 颜色选择 -->
<input type="color" name="theme-color">

<!-- 文件上传 -->
<input type="file" name="avatar" accept="image/*">

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" value="50">

<!-- 搜索框 -->
<input type="search" name="query" placeholder="搜索...">
```

## 表单布局元素

### 字段组
```html
<fieldset>
    <legend>个人信息</legend>
    
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>
</fieldset>
```

### 标签关联
```html
<!-- 使用for属性关联label和input -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username">

<!-- 嵌套方式 -->
<label>
    密码：
    <input type="password" name="password">
</label>
```

### 文本区域
```html
<label for="message">留言：</label>
<textarea id="message" name="message" rows="4" cols="50" 
          placeholder="请输入您的留言..."></textarea>
```

## 按钮元素

### 按钮类型
```html
<!-- 提交按钮 -->
<button type="submit">提交表单</button>

<!-- 重置按钮 -->
<button type="reset">重置表单</button>

<!-- 普通按钮 -->
<button type="button" onclick="customFunction()">自定义操作</button>

<!-- 图片按钮 -->
<button type="submit">
    <img src="submit-icon.png" alt="提交">
</button>
```

## 表单验证

### HTML5验证属性
```html
<!-- 必填字段 -->
<input type="text" name="username" required>

<!-- 最小/最大长度 -->
<input type="text" name="username" minlength="3" maxlength="20">

<!-- 模式匹配 -->
<input type="tel" name="phone" pattern="[0-9]{11}" 
       title="请输入11位手机号码">

<!-- 数值范围 -->
<input type="number" name="age" min="18" max="65">

<!-- 自定义验证消息 -->
<input type="email" name="email" 
       oninvalid="this.setCustomValidity('请输入有效的邮箱地址')"
       oninput="this.setCustomValidity('')">
```

### 验证状态样式
```html
<style>
/* 有效状态 */
input:valid {
    border-color: green;
}

/* 无效状态 */
input:invalid {
    border-color: red;
}

/* 焦点状态 */
input:focus {
    outline: 2px solid blue;
}
</style>
```

## 响应式表单

### 移动端优化
```html
<!-- 移动端友好的输入类型 -->
<input type="tel" name="phone" inputmode="numeric">
<input type="email" name="email" inputmode="email">

<!-- 自动完成 -->
<input type="text" name="username" autocomplete="username">
<input type="password" name="password" autocomplete="current-password">

<!-- 自动大写 -->
<input type="text" name="name" autocapitalize="words">
```

## 安全性考虑

### 防止XSS攻击
```html
<!-- 使用适当的输入类型 -->
<input type="email" name="email">
<input type="url" name="website">

<!-- 限制文件类型 -->
<input type="file" name="document" accept=".pdf,.doc,.docx">

<!-- 设置最大文件大小 -->
<input type="file" name="avatar" accept="image/*" max="5242880">
```

## 表单样式示例

### 基础样式
```html
<style>
.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}
</style>
```

## 最佳实践

1. **使用语义化标签** - 选择合适的input类型
2. **添加适当的标签** - 每个表单控件都应有对应的label
3. **实现客户端验证** - 使用HTML5验证属性
4. **考虑可访问性** - 添加aria属性支持屏幕阅读器
5. **移动端友好** - 使用合适的inputmode和autocomplete
6. **安全性优先** - 实施适当的输入验证和清理 