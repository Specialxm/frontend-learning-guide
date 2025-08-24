# 脚手架工具原理

## 概述

脚手架工具是现代前端开发中不可或缺的工具，它能够快速生成项目结构、配置文件和基础代码，大幅提升开发效率。本文将深入分析脚手架工具的设计原理、实现方法和最佳实践，帮助开发者构建企业级的脚手架工具。

## 脚手架工具架构

### 1. 整体架构

```
用户输入 → 参数解析 → 模板引擎 → 文件生成 → 项目初始化
   ↓         ↓         ↓         ↓         ↓
CLI Input → Parser → Template → Generator → Project
```

### 2. 核心模块

#### CLI模块
```typescript
// CLI入口类
class ScaffoldCLI {
  private program: Command;
  private generator: ProjectGenerator;
  
  constructor() {
    this.program = new Command();
    this.generator = new ProjectGenerator();
    this.setupCommands();
  }
  
  private setupCommands(): void {
    this.program
      .name('scaffold')
      .description('Project scaffolding tool')
      .version('1.0.0');
    
    this.program
      .command('create <project-name>')
      .description('Create a new project')
      .option('-t, --template <template>', 'Project template')
      .option('-f, --force', 'Force overwrite existing directory')
      .action(this.handleCreate.bind(this));
  }
  
  private async handleCreate(projectName: string, options: any): Promise<void> {
    try {
      await this.generator.createProject(projectName, options);
      console.log(`✅ Project ${projectName} created successfully!`);
    } catch (error) {
      console.error(`❌ Failed to create project: ${error.message}`);
      process.exit(1);
    }
  }
  
  run(): void {
    this.program.parse();
  }
}
```

#### 模板引擎
```typescript
// 模板引擎接口
interface TemplateEngine {
  render(template: string, data: Record<string, any>): string;
  renderFile(templatePath: string, data: Record<string, any>): string;
}

// Handlebars模板引擎实现
class HandlebarsEngine implements TemplateEngine {
  private handlebars: typeof Handlebars;
  
  constructor() {
    this.handlebars = Handlebars.create();
    this.setupHelpers();
  }
  
  private setupHelpers(): void {
    this.handlebars.registerHelper('camelCase', (str: string) => {
      return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    });
    
    this.handlebars.registerHelper('pascalCase', (str: string) => {
      const camelCase = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    });
    
    this.handlebars.registerHelper('kebabCase', (str: string) => {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    });
  }
  
  render(template: string, data: Record<string, any>): string {
    const compiledTemplate = this.handlebars.compile(template);
    return compiledTemplate(data);
  }
  
  renderFile(templatePath: string, data: Record<string, any>): string {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return this.render(template, data);
  }
}
```

## 项目生成器

### 1. 核心生成器

```typescript
// 项目生成器
class ProjectGenerator {
  private templateEngine: TemplateEngine;
  private fileGenerator: FileGenerator;
  private validator: ProjectValidator;
  
  constructor() {
    this.templateEngine = new HandlebarsEngine();
    this.fileGenerator = new FileGenerator();
    this.validator = new ProjectValidator();
  }
  
  async createProject(projectName: string, options: CreateProjectOptions): Promise<void> {
    // 1. 验证项目名称
    this.validator.validateProjectName(projectName);
    
    // 2. 检查目录是否存在
    const projectPath = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(projectPath) && !options.force) {
      throw new Error(`Directory ${projectName} already exists. Use --force to overwrite.`);
    }
    
    // 3. 获取模板配置
    const template = await this.getTemplate(options.template);
    
    // 4. 收集用户输入
    const answers = await this.collectUserInput(template);
    
    // 5. 生成项目文件
    await this.generateProjectFiles(projectPath, template, answers);
    
    // 6. 安装依赖
    if (answers.installDependencies) {
      await this.installDependencies(projectPath);
    }
    
    // 7. 初始化Git仓库
    if (answers.initGit) {
      await this.initGitRepository(projectPath);
    }
  }
  
  private async getTemplate(templateName?: string): Promise<Template> {
    if (templateName) {
      return await this.loadTemplate(templateName);
    }
    
    // 显示模板选择
    const templates = await this.getAvailableTemplates();
    const { selectedTemplate } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTemplate',
        message: 'Choose a project template:',
        choices: templates.map(t => ({ name: t.name, value: t.id }))
      }
    ]);
    
    return await this.loadTemplate(selectedTemplate);
  }
  
  private async collectUserInput(template: Template): Promise<ProjectAnswers> {
    const questions = template.questions || [];
    return await inquirer.prompt(questions);
  }
  
  private async generateProjectFiles(
    projectPath: string,
    template: Template,
    answers: ProjectAnswers
  ): Promise<void> {
    // 创建项目目录
    fs.mkdirSync(projectPath, { recursive: true });
    
    // 生成文件
    for (const file of template.files) {
      await this.generateFile(projectPath, file, answers);
    }
    
    // 执行后处理脚本
    if (template.postProcess) {
      await this.executePostProcess(projectPath, template.postProcess, answers);
    }
  }
}
```

### 2. 文件生成器

```typescript
// 文件生成器
class FileGenerator {
  private templateEngine: TemplateEngine;
  
  constructor() {
    this.templateEngine = new HandlebarsEngine();
  }
  
  async generateFile(
    projectPath: string,
    fileConfig: FileConfig,
    answers: ProjectAnswers
  ): Promise<void> {
    const targetPath = path.join(projectPath, fileConfig.path);
    const targetDir = path.dirname(targetPath);
    
    // 创建目录
    fs.mkdirSync(targetDir, { recursive: true });
    
    if (fileConfig.type === 'template') {
      await this.generateFromTemplate(targetPath, fileConfig, answers);
    } else if (fileConfig.type === 'copy') {
      await this.copyFile(targetPath, fileConfig);
    } else if (fileConfig.type === 'generate') {
      await this.generateContent(targetPath, fileConfig, answers);
    }
  }
  
  private async generateFromTemplate(
    targetPath: string,
    fileConfig: FileConfig,
    answers: ProjectAnswers
  ): Promise<void> {
    const templatePath = path.resolve(__dirname, '../templates', fileConfig.template);
    const content = this.templateEngine.renderFile(templatePath, answers);
    
    fs.writeFileSync(targetPath, content);
    
    // 设置文件权限
    if (fileConfig.executable) {
      fs.chmodSync(targetPath, 0o755);
    }
  }
  
  private async copyFile(targetPath: string, fileConfig: FileConfig): Promise<void> {
    const sourcePath = path.resolve(__dirname, '../templates', fileConfig.source);
    fs.copyFileSync(sourcePath, targetPath);
  }
  
  private async generateContent(
    targetPath: string,
    fileConfig: FileConfig,
    answers: ProjectAnswers
  ): Promise<void> {
    let content = '';
    
    if (fileConfig.generator) {
      content = await this.executeGenerator(fileConfig.generator, answers);
    } else if (fileConfig.content) {
      content = this.templateEngine.render(fileConfig.content, answers);
    }
    
    fs.writeFileSync(targetPath, content);
  }
  
  private async executeGenerator(
    generatorName: string,
    answers: ProjectAnswers
  ): Promise<string> {
    const generator = this.getGenerator(generatorName);
    return await generator.generate(answers);
  }
}
```

## 模板系统

### 1. 模板配置

```typescript
// 模板配置接口
interface Template {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  questions: Question[];
  files: FileConfig[];
  postProcess?: PostProcessConfig;
  dependencies?: DependencyConfig;
}

interface FileConfig {
  path: string;
  type: 'template' | 'copy' | 'generate';
  template?: string;
  source?: string;
  generator?: string;
  content?: string;
  executable?: boolean;
  condition?: string;
}

interface Question {
  type: 'input' | 'confirm' | 'list' | 'checkbox' | 'password';
  name: string;
  message: string;
  default?: any;
  choices?: any[];
  validate?: (input: any) => boolean | string;
  when?: (answers: any) => boolean;
}

// 模板配置示例
const reactTemplate: Template = {
  id: 'react-app',
  name: 'React Application',
  description: 'A modern React application with TypeScript',
  version: '1.0.0',
  author: 'Your Company',
  
  questions: [
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-react-app',
      validate: (input: string) => {
        if (!input.match(/^[a-z0-9-]+$/)) {
          return 'Project name must contain only lowercase letters, numbers, and hyphens';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Would you like to use TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useTailwindCSS',
      message: 'Would you like to use Tailwind CSS?',
      default: false
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'npm'
    }
  ],
  
  files: [
    {
      path: 'package.json',
      type: 'template',
      template: 'package.json.hbs'
    },
    {
      path: 'tsconfig.json',
      type: 'template',
      template: 'tsconfig.json.hbs',
      condition: 'useTypeScript'
    },
    {
      path: 'tailwind.config.js',
      type: 'template',
      template: 'tailwind.config.js.hbs',
      condition: 'useTailwindCSS'
    },
    {
      path: 'src/App.tsx',
      type: 'template',
      template: 'App.tsx.hbs',
      condition: 'useTypeScript'
    },
    {
      path: 'src/App.jsx',
      type: 'template',
      template: 'App.jsx.hbs',
      condition: '!useTypeScript'
    }
  ],
  
  dependencies: {
    dependencies: [
      'react',
      'react-dom'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      'vite',
      '@vitejs/plugin-react'
    ]
  }
};
```

### 2. 条件渲染

```typescript
// 条件渲染引擎
class ConditionalRenderer {
  evaluateCondition(condition: string, answers: Record<string, any>): boolean {
    try {
      // 简单的条件表达式解析
      const expression = condition.replace(/(\w+)/g, (match) => {
        if (answers.hasOwnProperty(match)) {
          return JSON.stringify(answers[match]);
        }
        return match;
      });
      
      // 替换逻辑操作符
      const logicalExpression = expression
        .replace(/&&/g, '&&')
        .replace(/\|\|/g, '||')
        .replace(/!/g, '!');
      
      return eval(logicalExpression);
    } catch (error) {
      console.warn(`Failed to evaluate condition: ${condition}`, error);
      return false;
    }
  }
  
  filterFiles(files: FileConfig[], answers: Record<string, any>): FileConfig[] {
    return files.filter(file => {
      if (!file.condition) return true;
      return this.evaluateCondition(file.condition, answers);
    });
  }
}
```

## 交互式命令行

### 1. 用户输入收集

```typescript
// 交互式输入收集器
class InteractiveInputCollector {
  async collectInput(questions: Question[]): Promise<Record<string, any>> {
    const answers: Record<string, any> = {};
    
    for (const question of questions) {
      if (question.when && !question.when(answers)) {
        continue;
      }
      
      const answer = await this.askQuestion(question);
      answers[question.name] = answer;
    }
    
    return answers;
  }
  
  private async askQuestion(question: Question): Promise<any> {
    switch (question.type) {
      case 'input':
        return await this.askInput(question);
      case 'confirm':
        return await this.askConfirm(question);
      case 'list':
        return await this.askList(question);
      case 'checkbox':
        return await this.askCheckbox(question);
      case 'password':
        return await this.askPassword(question);
      default:
        throw new Error(`Unsupported question type: ${question.type}`);
    }
  }
  
  private async askInput(question: Question): Promise<string> {
    const { answer } = await inquirer.prompt([
      {
        type: 'input',
        name: 'answer',
        message: question.message,
        default: question.default,
        validate: question.validate
      }
    ]);
    return answer;
  }
  
  private async askConfirm(question: Question): Promise<boolean> {
    const { answer } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'answer',
        message: question.message,
        default: question.default
      }
    ]);
    return answer;
  }
  
  private async askList(question: Question): Promise<any> {
    const { answer } = await inquirer.prompt([
      {
        type: 'list',
        name: 'answer',
        message: question.message,
        choices: question.choices,
        default: question.default
      }
    ]);
    return answer;
  }
}
```

### 2. 输入验证

```typescript
// 输入验证器
class InputValidator {
  validateProjectName(name: string): boolean | string {
    if (!name) {
      return 'Project name is required';
    }
    
    if (name.length < 1 || name.length > 50) {
      return 'Project name must be between 1 and 50 characters';
    }
    
    if (!/^[a-z0-9-]+$/.test(name)) {
      return 'Project name must contain only lowercase letters, numbers, and hyphens';
    }
    
    if (name.startsWith('-') || name.endsWith('-')) {
      return 'Project name cannot start or end with a hyphen';
    }
    
    if (name.includes('--')) {
      return 'Project name cannot contain consecutive hyphens';
    }
    
    return true;
  }
  
  validatePackageName(name: string): boolean | string {
    if (!name) {
      return 'Package name is required';
    }
    
    if (!/^@?[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(name)) {
      return 'Package name must be a valid npm package name';
    }
    
    return true;
  }
  
  validateVersion(version: string): boolean | string {
    if (!version) {
      return 'Version is required';
    }
    
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      return 'Version must be in semantic versioning format (e.g., 1.0.0)';
    }
    
    return true;
  }
}
```

## 后处理系统

### 1. 依赖安装

```typescript
// 依赖安装器
class DependencyInstaller {
  async installDependencies(
    projectPath: string,
    dependencies: DependencyConfig,
    packageManager: string
  ): Promise<void> {
    console.log('📦 Installing dependencies...');
    
    try {
      if (packageManager === 'npm') {
        await this.installWithNpm(projectPath, dependencies);
      } else if (packageManager === 'yarn') {
        await this.installWithYarn(projectPath, dependencies);
      } else if (packageManager === 'pnpm') {
        await this.installWithPnpm(projectPath, dependencies);
      }
      
      console.log('✅ Dependencies installed successfully!');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      throw error;
    }
  }
  
  private async installWithNpm(
    projectPath: string,
    dependencies: DependencyConfig
  ): Promise<void> {
    const { execSync } = require('child_process');
    
    // 安装生产依赖
    if (dependencies.dependencies && dependencies.dependencies.length > 0) {
      execSync(
        `npm install ${dependencies.dependencies.join(' ')}`,
        { cwd: projectPath, stdio: 'inherit' }
      );
    }
    
    // 安装开发依赖
    if (dependencies.devDependencies && dependencies.devDependencies.length > 0) {
      execSync(
        `npm install --save-dev ${dependencies.devDependencies.join(' ')}`,
        { cwd: projectPath, stdio: 'inherit' }
      );
    }
  }
  
  private async installWithYarn(
    projectPath: string,
    dependencies: DependencyConfig
  ): Promise<void> {
    const { execSync } = require('child_process');
    
    // 安装生产依赖
    if (dependencies.dependencies && dependencies.dependencies.length > 0) {
      execSync(
        `yarn add ${dependencies.dependencies.join(' ')}`,
        { cwd: projectPath, stdio: 'inherit' }
      );
    }
    
    // 安装开发依赖
    if (dependencies.devDependencies && dependencies.devDependencies.length > 0) {
      execSync(
        `yarn add --dev ${dependencies.devDependencies.join(' ')}`,
        { cwd: projectPath, stdio: 'inherit' }
      );
    }
  }
}
```

### 2. Git初始化

```typescript
// Git仓库初始化器
class GitInitializer {
  async initRepository(projectPath: string): Promise<void> {
    console.log('🔧 Initializing Git repository...');
    
    try {
      const { execSync } = require('child_process');
      
      // 初始化Git仓库
      execSync('git init', { cwd: projectPath, stdio: 'inherit' });
      
      // 创建.gitignore文件
      this.createGitignore(projectPath);
      
      // 添加所有文件
      execSync('git add .', { cwd: projectPath, stdio: 'inherit' });
      
      // 初始提交
      execSync('git commit -m "Initial commit"', { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
      
      console.log('✅ Git repository initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize Git repository:', error.message);
      throw error;
    }
  }
  
  private createGitignore(projectPath: string): void {
    const gitignoreContent = `
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/
`.trim();
    
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent);
  }
}
```

## 模板管理

### 1. 模板仓库

```typescript
// 模板仓库管理器
class TemplateRepository {
  private templatesPath: string;
  private templates: Map<string, Template>;
  
  constructor() {
    this.templatesPath = path.resolve(__dirname, '../templates');
    this.templates = new Map();
    this.loadTemplates();
  }
  
  private loadTemplates(): void {
    const templateDirs = fs.readdirSync(this.templatesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const templateDir of templateDirs) {
      const configPath = path.join(this.templatesPath, templateDir, 'template.json');
      if (fs.existsSync(configPath)) {
        try {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
          this.templates.set(config.id, config);
        } catch (error) {
          console.warn(`Failed to load template ${templateDir}:`, error.message);
        }
      }
    }
  }
  
  getTemplate(id: string): Template | undefined {
    return this.templates.get(id);
  }
  
  getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }
  
  async addTemplate(templatePath: string): Promise<void> {
    // 添加远程模板
    const templateName = path.basename(templatePath);
    const targetPath = path.join(this.templatesPath, templateName);
    
    if (fs.existsSync(targetPath)) {
      throw new Error(`Template ${templateName} already exists`);
    }
    
    // 克隆模板仓库
    const { execSync } = require('child_process');
    execSync(`git clone ${templatePath} ${targetPath}`, { stdio: 'inherit' });
    
    // 重新加载模板
    this.loadTemplates();
  }
  
  async updateTemplate(id: string): Promise<void> {
    const template = this.templates.get(id);
    if (!template) {
      throw new Error(`Template ${id} not found`);
    }
    
    const templatePath = path.join(this.templatesPath, id);
    
    // 更新模板
    const { execSync } = require('child_process');
    execSync('git pull origin main', { cwd: templatePath, stdio: 'inherit' });
    
    // 重新加载模板
    this.loadTemplates();
  }
}
```

### 2. 远程模板

```typescript
// 远程模板管理器
class RemoteTemplateManager {
  async installFromGit(url: string, branch?: string): Promise<void> {
    const tempDir = path.join(os.tmpdir(), `scaffold-${Date.now()}`);
    
    try {
      // 克隆模板仓库
      const { execSync } = require('child_process');
      const cloneCommand = branch 
        ? `git clone -b ${branch} ${url} ${tempDir}`
        : `git clone ${url} ${tempDir}`;
      
      execSync(cloneCommand, { stdio: 'inherit' });
      
      // 验证模板
      const configPath = path.join(tempDir, 'template.json');
      if (!fs.existsSync(configPath)) {
        throw new Error('Invalid template: missing template.json');
      }
      
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      this.validateTemplate(config);
      
      // 安装模板
      const targetPath = path.join(this.getTemplatesPath(), config.id);
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      
      fs.cpSync(tempDir, targetPath, { recursive: true });
      
      console.log(`✅ Template ${config.name} installed successfully!`);
    } finally {
      // 清理临时目录
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  }
  
  private validateTemplate(config: any): void {
    const requiredFields = ['id', 'name', 'description', 'version', 'files'];
    
    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Invalid template: missing required field '${field}'`);
      }
    }
    
    if (!Array.isArray(config.files)) {
      throw new Error('Invalid template: files must be an array');
    }
  }
}
```

## 最佳实践

### 1. 错误处理

```typescript
// 错误处理类
class ScaffoldError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ScaffoldError';
  }
}

// 错误处理器
class ErrorHandler {
  handleError(error: Error): void {
    if (error instanceof ScaffoldError) {
      console.error(`❌ ${error.message}`);
      
      if (error.details) {
        console.error('Details:', error.details);
      }
      
      if (error.code === 'VALIDATION_ERROR') {
        console.log('💡 Please check your input and try again.');
      } else if (error.code === 'TEMPLATE_ERROR') {
        console.log('💡 Please check your template configuration.');
      } else if (error.code === 'PERMISSION_ERROR') {
        console.log('💡 Please check your file permissions.');
      }
    } else {
      console.error('❌ An unexpected error occurred:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    process.exit(1);
  }
}
```

### 2. 日志系统

```typescript
// 日志记录器
class Logger {
  private logLevel: 'debug' | 'info' | 'warn' | 'error';
  
  constructor(logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    this.logLevel = logLevel;
  }
  
  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(`🔍 ${message}`, ...args);
    }
  }
  
  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`ℹ️  ${message}`, ...args);
    }
  }
  
  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`⚠️  ${message}`, ...args);
    }
  }
  
  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`❌ ${message}`, ...args);
    }
  }
  
  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }
}
```

## 实际应用场景

### 1. React项目模板

```typescript
// React项目模板配置
const reactTemplate: Template = {
  id: 'react-app',
  name: 'React Application',
  description: 'A modern React application with TypeScript and Vite',
  
  questions: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-react-app',
      validate: (input: string) => {
        if (!input.match(/^[a-z0-9-]+$/)) {
          return 'Project name must contain only lowercase letters, numbers, and hyphens';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Use TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useTailwindCSS',
      message: 'Use Tailwind CSS?',
      default: false
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Package manager:',
      choices: ['npm', 'yarn', 'pnpm'],
      default: 'npm'
    }
  ],
  
  files: [
    {
      path: 'package.json',
      type: 'template',
      template: 'package.json.hbs'
    },
    {
      path: 'vite.config.ts',
      type: 'template',
      template: 'vite.config.ts.hbs',
      condition: 'useTypeScript'
    },
    {
      path: 'vite.config.js',
      type: 'template',
      template: 'vite.config.js.hbs',
      condition: '!useTypeScript'
    },
    {
      path: 'src/main.tsx',
      type: 'template',
      template: 'main.tsx.hbs',
      condition: 'useTypeScript'
    },
    {
      path: 'src/main.jsx',
      type: 'template',
      template: 'main.jsx.hbs',
      condition: '!useTypeScript'
    }
  ],
  
  dependencies: {
    dependencies: ['react', 'react-dom'],
    devDependencies: [
      '@vitejs/plugin-react',
      'vite'
    ]
  }
};
```

### 2. Node.js API模板

```typescript
// Node.js API模板配置
const nodeApiTemplate: Template = {
  id: 'node-api',
  name: 'Node.js API',
  description: 'A Node.js REST API with Express and TypeScript',
  
  questions: [
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-api'
    },
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Use TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useDatabase',
      message: 'Include database integration?',
      default: true
    },
    {
      type: 'list',
      name: 'databaseType',
      message: 'Database type:',
      choices: ['postgresql', 'mysql', 'mongodb'],
      when: (answers) => answers.useDatabase
    }
  ],
  
  files: [
    {
      path: 'package.json',
      type: 'template',
      template: 'package.json.hbs'
    },
    {
      path: 'src/app.ts',
      type: 'template',
      template: 'app.ts.hbs',
      condition: 'useTypeScript'
    },
    {
      path: 'src/app.js',
      type: 'template',
      template: 'app.js.hbs',
      condition: '!useTypeScript'
    },
    {
      path: 'src/database.ts',
      type: 'template',
      template: 'database.ts.hbs',
      condition: 'useDatabase && useTypeScript'
    }
  ],
  
  dependencies: {
    dependencies: ['express', 'cors', 'helmet'],
    devDependencies: ['@types/node', '@types/express', 'nodemon']
  }
};
```

## 总结

脚手架工具是现代前端开发中提升效率的重要工具：

1. **架构设计**：清晰的模块分离和职责划分
2. **模板系统**：灵活的模板配置和条件渲染
3. **交互体验**：友好的命令行交互和输入验证
4. **扩展性**：支持自定义模板和插件系统

掌握脚手架工具开发有助于：
- 提升团队开发效率
- 标准化项目结构
- 减少重复工作
- 建立最佳实践

在实际项目中，应该根据团队需求和项目特点设计合适的脚手架工具，注重用户体验和可维护性。 