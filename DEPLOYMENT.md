# 部署说明 🚀

## 📋 项目概述

这是一个使用VuePress 1.x构建的前端学习指南项目，包含HTML、CSS、JavaScript的完整教程。

## 🌐 在线预览

项目已配置GitHub Pages自动部署，访问地址：
`https://yourusername.github.io/frontend-learning-guide`

## 🔧 本地开发

### 环境要求
- Node.js >= 14
- npm >= 6

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:8080 查看文档

### 构建生产版本
```bash
npm run build
```

## 📚 项目结构

```
frontend-learning-guide/
├── docs/                    # 文档目录
│   ├── .vuepress/          # VuePress配置
│   │   └── config.ts       # 配置文件
│   ├── html/               # HTML教程
│   ├── css/                # CSS教程
│   ├── javascript/         # JavaScript教程
│   └── README.md           # 首页
├── .github/                 # GitHub Actions配置
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 🚀 部署到GitHub Pages

### 1. 创建GitHub仓库

1. 在GitHub上创建新仓库：`frontend-learning-guide`
2. 仓库设置为Public（GitHub Pages需要）
3. 不要初始化README、.gitignore或license

### 2. 推送代码

```bash
# 添加远程仓库
git remote add origin https://github.com/yourusername/frontend-learning-guide.git

# 推送代码
git push -u origin master
```

### 3. 配置GitHub Pages

1. 进入仓库设置 (Settings)
2. 找到Pages选项
3. Source选择"GitHub Actions"
4. 保存设置

### 4. 自动部署

项目已配置GitHub Actions，每次推送到master分支时会自动：
1. 构建项目
2. 部署到GitHub Pages

## 📝 内容管理

### 添加新页面
1. 在相应目录创建`.md`文件
2. 在`config.ts`中添加导航配置
3. 提交并推送代码

### 更新现有内容
1. 修改相应的`.md`文件
2. 提交并推送代码
3. 自动部署生效

## 🔍 常见问题

### 构建失败
- 检查Node.js版本
- 清理缓存：`npm run clean`
- 重新安装依赖：`rm -rf node_modules && npm install`

### 页面不显示
- 检查文件路径是否正确
- 确认配置文件语法
- 查看构建日志

### 样式问题
- 检查CSS语法
- 确认选择器正确性
- 查看浏览器控制台错误

## 📞 技术支持

如有问题，请：
1. 查看GitHub Issues
2. 提交新的Issue
3. 联系项目维护者

---

**祝您使用愉快！** 🎉 