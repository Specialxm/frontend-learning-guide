# GitHub Pages 设置指南 🚀

## 📋 前置要求

- ✅ 项目已推送到GitHub
- ✅ GitHub Actions工作流文件已配置
- ✅ 本地构建测试通过

## 🔧 设置步骤

### 1. 访问仓库设置

1. 打开您的仓库：[https://github.com/Specialxm/frontend-learning-guide](https://github.com/Specialxm/frontend-learning-guide)
2. 点击仓库页面顶部的 **"Settings"** 标签

### 2. 配置GitHub Pages

1. 在左侧菜单中找到 **"Pages"**
2. 在 **"Source"** 部分选择 **"GitHub Actions"**
3. 点击 **"Save"** 保存设置

### 3. 检查GitHub Actions

1. 点击仓库页面顶部的 **"Actions"** 标签
2. 查看是否有名为 **"Deploy to GitHub Pages"** 的工作流
3. 如果没有自动触发，可以手动触发：
   - 点击工作流名称
   - 点击 **"Run workflow"** 按钮
   - 选择分支（master）并运行

### 4. 等待部署完成

1. 工作流运行完成后，您会看到绿色的勾号 ✅
2. 部署成功后，您的文档将在以下地址可用：
   - **在线地址**: https://specialxm.github.io/frontend-learning-guide

## 🚨 常见问题

### 问题1: 页面显示404
- 检查 `docs/.vuepress/config.js` 中的 `base` 配置是否正确
- 确保GitHub Actions部署成功

### 问题2: 样式或图片不显示
- 检查相对路径是否正确
- 确保所有资源文件都已提交到GitHub

### 问题3: 搜索功能不工作
- 等待GitHub Actions完成索引构建
- 检查VuePress搜索插件配置

## 📱 测试部署

部署完成后，您可以：

1. 访问在线地址测试功能
2. 检查导航栏和侧边栏是否正常
3. 测试搜索功能
4. 验证响应式设计

## 🔄 更新部署

每次推送代码到master分支时，GitHub Actions会自动：
1. 构建项目
2. 部署到GitHub Pages
3. 更新在线文档

## 📞 需要帮助？

如果遇到问题，请：
1. 检查GitHub Actions日志
2. 查看仓库的Issues
3. 提交新的Issue描述问题

---

**祝您部署顺利！** 🎉 