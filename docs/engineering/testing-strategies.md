# 前端测试方案与实践

## 概述

前端测试是保证代码质量和用户体验的重要手段。现代前端开发需要建立完整的测试体系，包括单元测试、集成测试和端到端测试。本文将深入探讨前端测试的策略、工具和实践方法。

## 测试金字塔

### 1. 测试层次结构

```
    E2E Tests (少量)
        ↑
   Integration Tests (中等)
        ↑
   Unit Tests (大量)
```

### 2. 各层测试特点

- **单元测试**：测试单个函数或组件，快速、可靠
- **集成测试**：测试模块间交互，中等速度、中等可靠性
- **端到端测试**：测试完整用户流程，慢速、高可靠性

## 单元测试

### 1. Jest + React Testing Library

```typescript
// Button组件测试
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveCallTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. 测试工具函数

```typescript
// utils.test.ts
import { formatCurrency, validateEmail } from './utils';

describe('Utils Functions', () => {
  describe('formatCurrency', () => {
    test('formats positive numbers correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(100)).toBe('$100.00');
    });

    test('handles zero and negative numbers', () => {
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(-123.45)).toBe('-$123.45');
    });
  });

  describe('validateEmail', () => {
    test('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    test('rejects invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
    });
  });
});
```

### 3. 测试配置

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## 集成测试

### 1. 组件集成测试

```typescript
// UserForm集成测试
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';
import { UserProvider } from './UserContext';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <UserProvider>
      {component}
    </UserProvider>
  );
};

describe('UserForm Integration', () => {
  test('submits form and updates user context', async () => {
    renderWithProvider(<UserForm />);
    
    // 填写表单
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    
    // 提交表单
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    // 验证结果
    await waitFor(() => {
      expect(screen.getByText('User updated successfully!')).toBeInTheDocument();
    });
  });
});
```

### 2. API集成测试

```typescript
// API服务测试
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserService } from './UserService';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' }
      ])
    );
  }),
  
  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({ id: 2, name: 'Jane Smith', email: 'jane@example.com' })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserService Integration', () => {
  test('fetches users successfully', async () => {
    const users = await UserService.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John Doe');
  });

  test('creates user successfully', async () => {
    const newUser = { name: 'Jane Smith', email: 'jane@example.com' };
    const createdUser = await UserService.createUser(newUser);
    
    expect(createdUser.id).toBe(2);
    expect(createdUser.name).toBe('Jane Smith');
  });
});
```

## 端到端测试

### 1. Playwright配置

```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
};

export default config;
```

### 2. E2E测试用例

```typescript
// e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('user can sign up and login', async ({ page }) => {
    // 访问注册页面
    await page.goto('/signup');
    
    // 填写注册表单
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    
    // 提交注册
    await page.click('[data-testid="signup-button"]');
    
    // 验证跳转到登录页面
    await expect(page).toHaveURL('/login');
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Registration successful');
    
    // 登录
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // 验证登录成功
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-name"]')).toContainText('Test User');
  });
});

test.describe('Shopping Cart Flow', () => {
  test('user can add items to cart and checkout', async ({ page }) => {
    // 登录
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // 浏览商品
    await page.goto('/products');
    await page.click('[data-testid="product-1"]');
    
    // 添加到购物车
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
    
    // 查看购物车
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('[data-testid="cart-item"]')).toContainText('Product 1');
    
    // 结账
    await page.click('[data-testid="checkout-button"]');
    await expect(page).toHaveURL('/checkout');
  });
});
```

## 测试策略

### 1. 测试优先级

```typescript
// 高优先级：核心业务逻辑
test('calculates order total with discounts', () => {
  const order = {
    items: [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 }
    ],
    discount: 0.1
  };
  
  const total = calculateOrderTotal(order);
  expect(total).toBe(225); // (200 + 50) * 0.9
});

// 中优先级：用户交互
test('form validation shows errors for invalid input', async () => {
  render(<ContactForm />);
  
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  await waitFor(() => {
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});

// 低优先级：样式和布局
test('button has correct styling classes', () => {
  render(<Button variant="primary">Click me</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn', 'btn-primary');
});
```

### 2. 测试数据管理

```typescript
// 测试数据工厂
export const createUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  ...overrides
});

export const createOrder = (overrides: Partial<Order> = {}): Order => ({
  id: 1,
  userId: 1,
  items: [
    { productId: 1, quantity: 2, price: 100 }
  ],
  status: 'pending',
  total: 200,
  ...overrides
});

// 使用测试数据
test('user can view their orders', async () => {
  const user = createUser({ id: 123 });
  const orders = [
    createOrder({ userId: 123, status: 'completed' }),
    createOrder({ userId: 123, status: 'pending' })
  ];
  
  // 模拟API响应
  server.use(
    rest.get('/api/users/123/orders', (req, res, ctx) => {
      return res(ctx.json(orders));
    })
  );
  
  render(<OrderList userId={123} />);
  
  await waitFor(() => {
    expect(screen.getByText('Order #1')).toBeInTheDocument();
    expect(screen.getByText('Order #2')).toBeInTheDocument();
  });
});
```

## 测试工具集成

### 1. CI/CD集成

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      
      - uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### 2. 测试脚本配置

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e"
  }
}
```

## 最佳实践

### 1. 测试原则

- **AAA模式**：Arrange（准备）、Act（执行）、Assert（断言）
- **单一职责**：每个测试只测试一个功能点
- **可读性**：测试代码应该清晰易懂
- **可维护性**：测试代码应该易于维护和更新

### 2. 测试命名

```typescript
// 好的测试命名
describe('UserService', () => {
  describe('createUser', () => {
    test('should create user with valid data', () => {});
    test('should throw error for invalid email', () => {});
    test('should throw error for duplicate email', () => {});
  });
});

// 避免的测试命名
describe('UserService', () => {
  test('test1', () => {});
  test('works', () => {});
  test('should work', () => {});
});
```

### 3. 测试覆盖率

```typescript
// 合理的覆盖率目标
// 单元测试：80-90%
// 集成测试：70-80%
// 端到端测试：60-70%

// 关注核心业务逻辑的覆盖率
// 避免为了覆盖率而写无意义的测试
```

## 总结

前端测试是保证代码质量的重要手段：

1. **测试金字塔**：建立合理的测试层次结构
2. **工具选择**：根据项目需求选择合适的测试工具
3. **策略制定**：制定清晰的测试策略和优先级
4. **持续集成**：将测试集成到CI/CD流程中

掌握前端测试有助于：
- 提高代码质量和可靠性
- 减少bug和回归问题
- 提升开发效率和信心
- 建立良好的开发习惯

在实际项目中，应该根据项目规模和团队能力选择合适的测试策略，平衡测试覆盖率和开发效率。 