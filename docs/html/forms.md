# HTML 表单处理 📝

表单是网页中用户输入信息的重要方式，HTML提供了丰富的表单元素来收集用户数据。

## 🏗️ 表单基础结构

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

## 📝 输入元素

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

## 📋 表单布局元素

### 字段组
```html
<fieldset>
    <legend>个人信息</legend>
    
    <div>
        <label for="name">姓名：</label>
        <input type="text" id="name" name="name" required>
    </div>
    
    <div>
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email" required>
    </div>
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

## 🔧 表单验证

### HTML5验证属性
```html
<!-- 必填字段 -->
<input type="text" name="username" required>

<!-- 最小/最大长度 -->
<input type="text" name="title" minlength="5" maxlength="100">

<!-- 正则表达式验证 -->
<input type="text" name="phone" pattern="[0-9]{11}" title="请输入11位手机号">

<!-- 自定义验证消息 -->
<input type="email" name="email" 
       oninvalid="this.setCustomValidity('请输入有效的邮箱地址')"
       oninput="this.setCustomValidity('')">
```

### 验证状态样式
```html
<style>
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

input:required {
    border-width: 2px;
}
</style>
```

## 📱 响应式表单

### 移动端优化
```html
<!-- 移动端友好的输入类型 -->
<input type="email" name="email" inputmode="email">
<input type="tel" name="phone" inputmode="tel">
<input type="number" name="age" inputmode="numeric">

<!-- 自动完成 -->
<input type="text" name="fullname" autocomplete="name">
<input type="email" name="email" autocomplete="email">
```

## 🎯 实践示例

### 完整注册表单
```html
<form action="/register" method="post" novalidate>
    <fieldset>
        <legend>用户注册</legend>
        
        <div>
            <label for="username">用户名：</label>
            <input type="text" id="username" name="username" 
                   required minlength="3" maxlength="20"
                   placeholder="3-20个字符">
        </div>
        
        <div>
            <label for="email">邮箱：</label>
            <input type="email" id="email" name="email" 
                   required placeholder="请输入有效邮箱">
        </div>
        
        <div>
            <label for="password">密码：</label>
            <input type="password" id="password" name="password" 
                   required minlength="6" placeholder="至少6位">
        </div>
        
        <div>
            <label for="confirm-password">确认密码：</label>
            <input type="password" id="confirm-password" name="confirm-password" 
                   required placeholder="再次输入密码">
        </div>
        
        <div>
            <label for="birthday">生日：</label>
            <input type="date" id="birthday" name="birthday">
        </div>
        
        <div>
            <label>性别：</label>
            <input type="radio" name="gender" value="male" id="male">
            <label for="male">男</label>
            <input type="radio" name="gender" value="female" id="female">
            <label for="female">女</label>
        </div>
        
        <div>
            <label for="interests">兴趣爱好：</label>
            <select id="interests" name="interests" multiple>
                <option value="reading">阅读</option>
                <option value="sports">运动</option>
                <option value="music">音乐</option>
                <option value="travel">旅行</option>
            </select>
        </div>
        
        <div>
            <label for="bio">个人简介：</label>
            <textarea id="bio" name="bio" rows="4" 
                      placeholder="请简单介绍一下自己..."></textarea>
        </div>
        
        <div>
            <label for="avatar">头像：</label>
            <input type="file" id="avatar" name="avatar" accept="image/*">
        </div>
        
        <div>
            <input type="checkbox" id="agree" name="agree" required>
            <label for="agree">我同意服务条款和隐私政策</label>
        </div>
        
        <div>
            <button type="submit">注册</button>
            <button type="reset">重置</button>
        </div>
    </fieldset>
</form>
```

## 📚 重要概念

1. **语义化** - 使用正确的表单元素和标签
2. **可访问性** - 确保表单对所有用户友好
3. **验证** - 客户端和服务器端都要验证
4. **用户体验** - 提供清晰的反馈和指导

## ⚠️ 常见错误

- 忘记设置name属性
- 标签和输入框没有正确关联
- 缺少必填字段验证
- 表单提交后没有反馈

---

**下一步：学习 [语义化标签](./semantic.md)** ➡️ 