# 工程化配置

## 工程化概述

Vue3.0 项目的工程化配置是确保项目质量、开发效率和团队协作的重要基础。良好的工程化配置能够提供一致的开发环境、自动化的工作流程和高质量的代码输出。

**工程化的核心目标：**
- **开发效率**：快速启动、热更新、自动化构建
- **代码质量**：代码规范、类型检查、自动化测试
- **团队协作**：统一的开发环境、代码风格、提交规范
- **部署运维**：自动化部署、环境管理、性能监控

## 构建工具配置

### 1. Vite 配置

**基础 Vite 配置：**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash-es', 'axios']
        }
      }
    }
  }
})
```

**高级 Vite 配置：**
```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts'
      })
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true
        }
      }
    },
    
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    }
  }
})
```

### 2. Vue CLI 配置

**vue.config.js 配置：**
```javascript
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views')
      }
    }
  },
  
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  
  chainWebpack: config => {
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 5,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    }
  }
})
```

## TypeScript 配置

### 1. tsconfig.json 配置

**基础 TypeScript 配置：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@views/*": ["src/views/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

**严格模式 TypeScript 配置：**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2. Vue 类型声明

**Vue 组件类型声明：**
```typescript
// src/types/components.d.ts
declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

export {}

// src/types/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

## 代码规范配置

### 1. ESLint 配置

**基础 ESLint 配置：**
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
```

**严格 ESLint 配置：**
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
```

### 2. Prettier 配置

**Prettier 配置文件：**
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": true
}
```

**Prettier 忽略文件：**
```text
# .prettierignore
node_modules
dist
*.min.js
*.min.css
public
```

### 3. Stylelint 配置

**Stylelint 配置：**
```javascript
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null
  }
}
```

## 测试配置

### 1. Jest 配置

**Jest 配置文件：**
```javascript
// jest.config.js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/main.ts',
    '!src/router/index.ts',
    '!src/store/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.(js|ts)',
    '<rootDir>/tests/unit/**/*.test.(js|ts)'
  ]
}
```

**Vue Test Utils 配置：**
```typescript
// tests/setup.ts
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// 全局配置
config.global.mocks = {
  $t: (key: string) => key,
  $route: {
    path: '/',
    params: {},
    query: {}
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn()
  }
}

// 全局组件
config.global.components = {
  'router-link': {
    template: '<a><slot /></a>'
  },
  'router-view': {
    template: '<div><slot /></div>'
  }
}
```

### 2. Cypress 配置

**Cypress 配置文件：**
```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000
  },
  
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}'
  }
})
```

## 环境配置

### 1. 环境变量配置

**环境变量文件：**
```bash
# .env
VITE_APP_TITLE=Vue3.0 应用
VITE_APP_VERSION=1.0.0

# .env.development
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_ENV=dev

# .env.production
VITE_NODE_ENV=production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=prod

# .env.staging
VITE_NODE_ENV=staging
VITE_API_BASE_URL=https://staging-api.example.com
VITE_APP_ENV=staging
```

**环境变量类型定义：**
```typescript
// src/types/env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_NODE_ENV: 'development' | 'production' | 'staging'
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 2. 环境配置管理

**环境配置工具：**
```typescript
// src/utils/env.ts
export const getEnvConfig = () => {
  const env = import.meta.env
  
  return {
    appTitle: env.VITE_APP_TITLE,
    appVersion: env.VITE_APP_VERSION,
    nodeEnv: env.VITE_NODE_ENV,
    apiBaseUrl: env.VITE_API_BASE_URL,
    appEnv: env.VITE_APP_ENV,
    isDev: env.VITE_NODE_ENV === 'development',
    isProd: env.VITE_NODE_ENV === 'production',
    isStaging: env.VITE_NODE_ENV === 'staging'
  }
}

export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD
export const mode = import.meta.env.MODE
```

## 自动化脚本配置

### 1. Package.json 脚本

**基础脚本配置：**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:staging": "vue-tsc && vite build --mode staging",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "type-check": "vue-tsc --noEmit",
    "test:unit": "vitest",
    "test:unit:coverage": "vitest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "prepare": "husky install"
  }
}
```

**高级脚本配置：**
```json
{
  "scripts": {
    "dev": "vite",
    "dev:https": "vite --https",
    "build": "npm run type-check && vite build",
    "build:analyze": "npm run type-check && vite build --mode analyze",
    "build:staging": "npm run type-check && vite build --mode staging",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --ignore-path .gitignore",
    "format": "prettier --write \"src/**/*.{vue,js,jsx,ts,tsx,json,css,scss,md}\"",
    "format:check": "prettier --check \"src/**/*.{vue,js,jsx,ts,tsx,json,css,scss,md}\"",
    "type-check": "vue-tsc --noEmit",
    "test:unit": "vitest",
    "test:unit:coverage": "vitest --coverage",
    "test:unit:ui": "vitest --ui",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:e2e:headless": "cypress run --headless",
    "prepare": "husky install",
    "commit": "git-cz",
    "release": "standard-version"
  }
}
```

### 2. Git Hooks 配置

**Husky 配置：**
```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:check
npm run format:check
npm run type-check
npm run test:unit
```

```json
// .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

**Commitlint 配置：**
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72]
  }
}
```

## 部署配置

### 1. Docker 配置

**Dockerfile：**
```dockerfile
# Dockerfile
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Nginx 配置：**
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    server {
        listen       80;
        server_name  localhost;
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 2. CI/CD 配置

**GitHub Actions 配置：**
```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint:check
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:unit:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      run: echo "Deploy to production"
```

## 性能监控配置

### 1. 性能监控工具

**Web Vitals 监控：**
```typescript
// src/utils/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // 发送到分析服务
  console.log(metric)
}

export function initPerformanceMonitoring() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

**错误监控配置：**
```typescript
// src/utils/error.ts
export function initErrorMonitoring() {
  window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error)
    // 发送到错误监控服务
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason)
    // 发送到错误监控服务
  })
}
```

## 最佳实践总结

### 1. 配置管理原则

**分层配置：**
- 基础配置：所有环境通用
- 环境配置：开发、测试、生产环境特定配置
- 本地配置：开发者个人配置（不提交到版本控制）

**配置验证：**
- 启动时验证必要配置
- 类型安全的配置访问
- 配置缺失时的友好提示

### 2. 开发流程优化

**自动化流程：**
- 代码提交前自动检查
- 构建过程自动化
- 测试和部署自动化

**质量保证：**
- 代码规范检查
- 类型检查
- 测试覆盖率要求

### 3. 团队协作

**统一标准：**
- 一致的代码风格
- 统一的提交规范
- 标准化的开发环境

**文档维护：**
- 配置说明文档
- 开发规范文档
- 部署流程文档

## 总结

Vue3.0 项目的工程化配置是一个系统工程，需要从构建工具、代码规范、测试配置、环境管理、自动化脚本、部署配置等多个维度进行考虑。良好的工程化配置能够：

1. **提升开发效率**：自动化工具链，减少重复工作
2. **保证代码质量**：规范检查、类型检查、测试覆盖
3. **改善团队协作**：统一的开发环境和规范
4. **简化部署运维**：自动化部署和监控

在实际项目中，应该根据项目规模和团队需求选择合适的工程化配置，平衡配置复杂度和实际收益。

## 下一步学习

恭喜您完成了 Vue3.0 的完整学习！现在您已经掌握了从基础概念到高级应用的全面知识。

### 🎯 实践应用
建议您：
1. **创建个人项目**：应用所学知识构建一个完整的 Vue3.0 应用
2. **参与开源项目**：贡献代码，学习最佳实践
3. **技术分享**：与团队分享学习心得，帮助他人成长

### 📚 持续学习
- 关注 Vue3.0 的最新特性和最佳实践
- 学习相关的前端技术（如 Vite、Pinia、Vue Router 4）
- 参与技术社区讨论，保持技术敏感度

## 学习建议

1. **项目实践**：将所学知识应用到实际项目中
2. **团队协作**：与团队成员分享工程化配置经验
3. **持续优化**：根据项目发展不断调整和优化配置
4. **知识分享**：撰写技术博客，分享学习心得

## 常见问题

### Q: 如何选择合适的构建工具？
A: 新项目推荐使用 Vite，现有项目可以继续使用 Vue CLI，需要特殊配置时考虑 Webpack。

### Q: 工程化配置会增加项目复杂度吗？
A: 合理的工程化配置会提升开发效率，但需要根据项目规模选择合适的配置级别。

### Q: 如何平衡代码规范和开发效率？
A: 从基础规范开始，逐步增加规则，使用自动化工具减少手动检查的工作量。

### Q: 团队协作中如何保持配置的一致性？
A: 使用配置文件模板，建立代码审查流程，定期同步配置更新。

---

**🎉 恭喜您完成了 Vue3.0 的完整学习！** 

现在您已经具备了构建高质量 Vue3.0 应用的全面能力。建议您：
- 回顾学习内容，巩固重点知识
- 在实际项目中应用所学技能
- 持续关注 Vue3.0 生态的发展
- 与社区分享您的学习成果

祝您在 Vue3.0 开发中取得更大的成功！ 🚀 