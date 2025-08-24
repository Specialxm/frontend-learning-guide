# TypeScript 集成

## TypeScript 在 Vue3.0 中的重要性

Vue3.0 是用 TypeScript 重写的，这意味着它天然支持 TypeScript，提供了更好的类型推导和开发体验。TypeScript 的集成让 Vue3.0 应用更加健壮、可维护，并且能够提供更好的 IDE 支持和开发体验。

**TypeScript 集成的优势：**
- **类型安全**：编译时检查类型错误，减少运行时错误
- **更好的 IDE 支持**：自动补全、类型提示、重构支持
- **代码可维护性**：类型定义作为文档，便于理解和维护
- **团队协作**：明确的接口定义，减少沟通成本

## 基础类型定义

### 1. 组件 Props 类型定义

**基础 Props 类型：**
```typescript
interface Props {
  title: string
  count?: number
  isVisible?: boolean
  user: {
    id: number
    name: string
    email: string
  }
  items: string[]
  onUpdate?: (value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isVisible: false
})
```

**复杂 Props 类型：**
```typescript
// 联合类型
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

// 泛型类型
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface User {
  id: number
  name: string
  email: string
}

interface Props {
  variant: ButtonVariant
  size: 'small' | 'medium' | 'large'
  user: User
  apiResponse: ApiResponse<User[]>
  onAction: (action: 'edit' | 'delete', userId: number) => void
}

const props = defineProps<Props>()
```

### 2. 事件类型定义

**基础事件类型：**
```typescript
interface Emits {
  update: [value: string]
  delete: [id: number]
  save: [data: UserData]
  'form-submit': [formData: FormData, isValid: boolean]
}

const emit = defineEmits<Emits>()

// 使用事件
const handleUpdate = (newValue: string) => {
  emit('update', newValue)
}

const handleDelete = (userId: number) => {
  emit('delete', userId)
}

const handleSave = (userData: UserData) => {
  emit('save', userData)
}
```

**带验证的事件类型：**
```typescript
interface Emits {
  update: [value: string]
  delete: [id: number]
}

const emit = defineEmits<Emits>({
  update: (value: string) => {
    if (typeof value === 'string' && value.length > 0) {
      return true
    }
    console.warn('update 事件需要非空字符串')
    return false
  },
  delete: (id: number) => {
    if (typeof id === 'number' && id > 0) {
      return true
    }
    console.warn('delete 事件需要有效的 ID')
    return false
  }
})
```

### 3. 响应式数据类型定义

**基础响应式类型：**
```typescript
import { ref, reactive, computed } from 'vue'

// ref 类型定义
const count = ref<number>(0)
const message = ref<string>('Hello')
const isVisible = ref<boolean>(false)

// reactive 类型定义
interface UserState {
  id: number | null
  name: string
  email: string
  isLoggedIn: boolean
  preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

const userState = reactive<UserState>({
  id: null,
  name: '',
  email: '',
  isLoggedIn: false,
  preferences: {
    theme: 'light',
    language: 'zh-CN'
  }
})

// computed 类型定义
const displayName = computed<string>(() => {
  return userState.name || 'Anonymous'
})

const isAdmin = computed<boolean>(() => {
  return userState.id === 1 // 假设 ID 为 1 的是管理员
})
```

**复杂响应式类型：**
```typescript
// 泛型响应式类型
interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const userApiState = reactive<ApiState<User[]>>({
  data: null,
  loading: false,
  error: null
})

const postApiState = reactive<ApiState<Post[]>>({
  data: null,
  loading: false,
  error: null
})

// 联合类型的响应式数据
type Theme = 'light' | 'dark' | 'auto'
type Language = 'zh-CN' | 'en-US' | 'ja-JP'

interface AppSettings {
  theme: Theme
  language: Language
  notifications: boolean
}

const appSettings = reactive<AppSettings>({
  theme: 'light',
  language: 'zh-CN',
  notifications: true
})
```

## 组件类型定义

### 1. 组件实例类型

**获取组件实例类型：**
```typescript
import { getCurrentInstance, ComponentPublicInstance } from 'vue'

// 获取当前组件实例
const instance = getCurrentInstance()

// 组件实例类型
interface ComponentInstance extends ComponentPublicInstance {
  // 自定义方法
  validate: () => boolean
  reset: () => void
}

// 使用类型断言
const typedInstance = instance as ComponentInstance
```

**子组件引用类型：**
```typescript
import { ref, onMounted } from 'vue'

// 子组件引用类型
interface ChildComponentInstance {
  validate: () => boolean
  reset: () => void
  getData: () => any
}

const childRef = ref<ChildComponentInstance>()

onMounted(() => {
  if (childRef.value) {
    // 调用子组件方法
    const isValid = childRef.value.validate()
    const data = childRef.value.getData()
  }
})
```

### 2. 泛型组件

**基础泛型组件：**
```typescript
// 泛型列表组件
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => any
  keyExtractor: (item: T) => string | number
}

const GenericList = defineComponent({
  props: ['items', 'renderItem', 'keyExtractor'],
  setup<T>(props: ListProps<T>) {
    return () => h('div', 
      props.items.map((item, index) => 
        h('div', { key: props.keyExtractor(item) }, 
          props.renderItem(item, index)
        )
      )
    )
  }
})
```

**高级泛型组件：**
```typescript
// 泛型表格组件
interface Column<T> {
  key: keyof T
  title: string
  render?: (value: T[keyof T], row: T) => any
  sortable?: boolean
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  sortBy?: keyof T
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: keyof T, order: 'asc' | 'desc') => void
}

const GenericTable = defineComponent({
  props: ['data', 'columns', 'sortBy', 'sortOrder', 'onSort'],
  setup<T>(props: TableProps<T>) {
    const handleSort = (key: keyof T) => {
      if (props.onSort) {
        const newOrder = props.sortBy === key && props.sortOrder === 'asc' ? 'desc' : 'asc'
        props.onSort(key, newOrder)
      }
    }

    return () => h('table', [
      h('thead', [
        h('tr', props.columns.map(col => 
          h('th', {
            onClick: () => col.sortable && handleSort(col.key),
            class: { sortable: col.sortable }
          }, col.title)
        ))
      ]),
      h('tbody', props.data.map(row => 
        h('tr', props.columns.map(col => 
          h('td', col.render ? col.render(row[col.key], row) : row[col.key])
        ))
      ))
    ])
  }
})
```

## 组合式函数类型定义

### 1. 基础组合式函数类型

**简单组合式函数：**
```typescript
// 计数器 Hook
interface UseCounterOptions {
  initialValue?: number
  min?: number
  max?: number
  step?: number
}

interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
  setValue: (value: number) => void
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const {
    initialValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1
  } = options

  const count = ref(initialValue)

  const increment = () => {
    if (count.value + step <= max) {
      count.value += step
    }
  }

  const decrement = () => {
    if (count.value - step >= min) {
      count.value -= step
    }
  }

  const reset = () => {
    count.value = initialValue
  }

  const setValue = (value: number) => {
    if (value >= min && value <= max) {
      count.value = value
    }
  }

  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    setValue
  }
}
```

**复杂组合式函数：**
```typescript
// API 请求 Hook
interface ApiOptions<T> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  transform?: (data: any) => T
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> {
  state: Readonly<ApiState<T>>
  execute: (params?: any) => Promise<T>
  reset: () => void
}

export function useApi<T>(options: ApiOptions<T>): UseApiReturn<T> {
  const state = reactive<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = async (params?: any): Promise<T> => {
    state.loading = true
    state.error = null

    try {
      const response = await fetch(options.url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: params ? JSON.stringify(params) : undefined
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const rawData = await response.json()
      const transformedData = options.transform ? options.transform(rawData) : rawData

      state.data = transformedData
      options.onSuccess?.(transformedData)

      return transformedData
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      state.error = errorMessage
      options.onError?.(error as Error)
      throw error
    } finally {
      state.loading = false
    }
  }

  const reset = () => {
    state.data = null
    state.error = null
  }

  return {
    state: readonly(state),
    execute,
    reset
  }
}
```

### 2. 泛型组合式函数

**通用状态管理 Hook：**
```typescript
// 通用状态管理
interface StateOptions<T> {
  initialValue: T
  validator?: (value: T) => boolean
  transformer?: (value: T) => T
}

interface StateReturn<T> {
  value: Ref<T>
  setValue: (newValue: T) => void
  reset: () => void
  isValid: ComputedRef<boolean>
}

export function useState<T>(
  options: StateOptions<T>
): StateReturn<T> {
  const { initialValue, validator, transformer } = options

  const value = ref<T>(initialValue)

  const setValue = (newValue: T) => {
    const transformedValue = transformer ? transformer(newValue) : newValue
    value.value = transformedValue
  }

  const reset = () => {
    value.value = initialValue
  }

  const isValid = computed(() => {
    if (!validator) return true
    return validator(value.value)
  })

  return {
    value: readonly(value),
    setValue,
    reset,
    isValid
  }
}

// 使用示例
const nameState = useState<string>({
  initialValue: '',
  validator: (value) => value.length >= 2,
  transformer: (value) => value.trim()
})

const ageState = useState<number>({
  initialValue: 0,
  validator: (value) => value >= 0 && value <= 150
})
```

## 路由类型定义

### 1. 路由参数类型

**路由参数类型定义：**
```typescript
import { RouteParams } from 'vue-router'

// 定义路由参数类型
interface UserRouteParams extends RouteParams {
  id: string
}

interface PostRouteParams extends RouteParams {
  id: string
  commentId?: string
}

// 在组件中使用
const route = useRoute<UserRouteParams>()
const userId = route.params.id

// 或者使用泛型
const route = useRoute<{ id: string }>()
const userId = route.params.id
```

**路由查询参数类型：**
```typescript
interface UserListQuery {
  page: string
  limit: string
  search?: string
  sortBy?: 'name' | 'email' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

const route = useRoute()
const query = route.query as UserListQuery

// 使用查询参数
const page = parseInt(query.page) || 1
const limit = parseInt(query.limit) || 10
const search = query.search || ''
const sortBy = query.sortBy || 'createdAt'
const sortOrder = query.sortOrder || 'desc'
```

### 2. 路由元信息类型

**路由元信息类型定义：**
```typescript
import 'vue-router'

// 扩展 RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    roles?: string[]
    title?: string
    keepAlive?: boolean
    layout?: string
  }
}

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin', 'user'],
      title: '仪表板',
      keepAlive: true,
      layout: 'default'
    }
  },
  {
    path: '/admin',
    component: () => import('./views/Admin.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: '管理面板',
      layout: 'admin'
    }
  }
]
```

## 状态管理类型定义

### 1. Pinia Store 类型

**基础 Store 类型：**
```typescript
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

interface UserState {
  currentUser: User | null
  users: User[]
  loading: boolean
  error: string | null
}

interface UserActions {
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  fetchUsers: () => Promise<void>
  updateUser: (id: number, updates: Partial<User>) => Promise<void>
  deleteUser: (id: number) => Promise<void>
}

interface UserGetters {
  isLoggedIn: boolean
  isAdmin: boolean
  userCount: number
  getUserById: (id: number) => User | undefined
}

export const useUserStore = defineStore<'user', UserState, UserGetters, UserActions>('user', {
  state: (): UserState => ({
    currentUser: null,
    users: [],
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    isAdmin: (state) => state.currentUser?.role === 'admin',
    userCount: (state) => state.users.length,
    getUserById: (state) => (id: number) => state.users.find(user => user.id === id)
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await authApi.login(credentials)
        this.currentUser = response.user
      } catch (error) {
        this.error = error instanceof Error ? error.message : '登录失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.currentUser = null
      this.users = []
    },

    async fetchUsers() {
      this.loading = true
      try {
        const response = await userApi.getUsers()
        this.users = response.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取用户列表失败'
      } finally {
        this.loading = false
      }
    },

    async updateUser(id: number, updates: Partial<User>) {
      try {
        const response = await userApi.updateUser(id, updates)
        const index = this.users.findIndex(user => user.id === id)
        if (index > -1) {
          this.users[index] = { ...this.users[index], ...response.data }
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '更新用户失败'
        throw error
      }
    },

    async deleteUser(id: number) {
      try {
        await userApi.deleteUser(id)
        this.users = this.users.filter(user => user.id !== id)
      } catch (error) {
        this.error = error instanceof Error ? error.message : '删除用户失败'
        throw error
      }
    }
  }
})
```

### 2. 组合式 Store

**组合式 Store 类型：**
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  // 方法
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
})
```

## 第三方库类型定义

### 1. 扩展第三方库类型

**扩展 Axios 类型：**
```typescript
import { AxiosResponse } from 'axios'

// 自定义响应类型
interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
  code: number
}

// 扩展 Axios 响应类型
interface CustomAxiosResponse<T = any> extends AxiosResponse<ApiResponse<T>> {}

// 使用扩展的类型
const response: CustomAxiosResponse<User[]> = await axios.get('/api/users')
const users = response.data.data // 类型安全
```

**扩展 Chart.js 类型：**
```typescript
import { Chart, ChartConfiguration } from 'chart.js'

// 自定义图表配置类型
interface CustomChartConfig extends ChartConfiguration {
  options: {
    responsive: boolean
    maintainAspectRatio: boolean
    plugins: {
      legend: {
        display: boolean
        position: 'top' | 'bottom' | 'left' | 'right'
      }
      tooltip: {
        enabled: boolean
        mode: 'index' | 'dataset' | 'point' | 'nearest' | 'x' | 'y'
      }
    }
  }
}

// 使用自定义类型
const chartConfig: CustomChartConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [10, 20, 30]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true,
        mode: 'index'
      }
    }
  }
}
```

## 类型工具和最佳实践

### 1. 常用类型工具

**实用类型工具：**
```typescript
// 部分属性可选
type PartialUser = Partial<User>

// 部分属性必填
type RequiredUser = Required<Pick<User, 'id' | 'name'>>

// 排除某些属性
type UserWithoutId = Omit<User, 'id'>

// 选择某些属性
type UserBasicInfo = Pick<User, 'name' | 'email'>

// 条件类型
type NonNullableUser = NonNullable<User | null>

// 映射类型
type ReadonlyUser = Readonly<User>

// 递归类型
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}
```

### 2. 类型安全的最佳实践

**类型断言的最佳实践：**
```typescript
// 避免使用 any
// 不推荐
const data: any = response.data

// 推荐：使用类型守卫
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string'
}

if (isUser(response.data)) {
  // 这里 response.data 的类型是 User
  console.log(response.data.name)
}

// 使用类型断言函数
function assertIsUser(obj: any): asserts obj is User {
  if (!isUser(obj)) {
    throw new Error('Invalid user data')
  }
}

assertIsUser(response.data)
// 这里 response.data 的类型是 User
```

**泛型约束：**
```typescript
// 泛型约束
interface HasId {
  id: number
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

// 使用
const users: User[] = [{ id: 1, name: 'John' }]
const user = findById(users, 1) // 类型是 User | undefined

// 多重约束
function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 }
}
```

## 总结

TypeScript 与 Vue3.0 的集成提供了强大的类型安全性和开发体验。通过合理使用类型定义，我们可以：

1. **提高代码质量**：编译时检查类型错误
2. **改善开发体验**：更好的 IDE 支持和自动补全
3. **增强可维护性**：类型定义作为文档，便于理解和维护
4. **减少运行时错误**：类型检查帮助捕获潜在问题

在实际开发中，应该根据项目需求选择合适的类型定义策略，平衡类型安全性和开发效率。对于大型项目，建议使用严格的类型定义；对于小型项目或原型开发，可以使用相对宽松的类型定义。

## 下一步学习

现在您已经掌握了 TypeScript 在 Vue3.0 中的应用，建议按以下顺序继续学习：

### ⚡ 性能优化
**[性能优化](./performance.md)** - 学习如何利用 TypeScript 的类型信息进行性能优化，掌握编译时优化和运行时优化的策略。

### 🏗️ 工程化配置
**[工程化配置](./engineering.md)** - 学习如何配置 TypeScript 项目，掌握代码规范、测试配置和自动化流程的最佳实践。

## 学习建议

1. **类型安全**：逐步提高项目的类型覆盖率，从 any 类型开始重构
2. **泛型应用**：学习使用泛型创建可复用的类型定义和组件
3. **工具类型**：掌握 TypeScript 内置的工具类型，提高开发效率
4. **最佳实践**：遵循类型定义的最佳实践，保持类型定义的清晰和简洁

## 常见问题

### Q: 如何平衡类型安全性和开发效率？
A: 从基础类型开始，逐步增加类型约束，使用类型推断减少手动类型注解。

### Q: 如何处理第三方库的类型定义？
A: 优先使用 @types 包，如果没有则自己扩展类型定义，或使用类型断言。

### Q: 泛型组件什么时候使用？
A: 当组件需要处理不同类型的数据，且希望保持类型安全时使用泛型组件。

### Q: 如何调试复杂的类型错误？
A: 使用 TypeScript 的类型检查工具，逐步简化复杂类型，使用类型别名提高可读性。

---

**准备好学习性能优化了吗？** 点击 [性能优化](./performance.md) 继续提升 Vue3.0 应用的性能！ ⚡ 