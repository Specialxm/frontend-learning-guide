# Vue 3.0 Composition API 源码深度解析

## 概述

本文档深入解析Vue 3.0 Composition API的源码实现，帮助开发者理解其内部工作原理和设计思想。Composition API是Vue 3.0最重要的创新之一，它重新定义了Vue组件的编写方式，提供了更好的逻辑复用和组织能力。

## Composition API 架构设计

### 1. 核心设计理念

Composition API的设计目标是解决Vue 2.x中Options API的逻辑复用和组织问题。Options API虽然简单易用，但在复杂应用中存在以下局限性：

**逻辑分散问题**：相关的逻辑被分散到不同的选项中（data、methods、computed、watch等），当组件变得复杂时，很难追踪和理解逻辑的关联性。

**逻辑复用困难**：在Options API中，逻辑复用主要通过mixins实现，但mixins存在命名冲突、来源不清晰、难以调试等问题。

**类型推导限制**：TypeScript在Options API中的类型推导能力有限，特别是在处理复杂的数据结构和函数签名时。

**逻辑组织混乱**：随着组件复杂度增加，不同功能的逻辑混合在一起，降低了代码的可读性和可维护性。

Composition API通过函数式编程的方式，将相关的逻辑组织在一起，提供了更好的逻辑复用、组织和类型支持。

```typescript
// Options API：逻辑分散到不同选项中
export default {
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } },
  mounted() { console.log('mounted') }
}

// Composition API：逻辑集中组织
export default {
  setup() {
    const count = ref(0)
    const increment = () => count.value++
    onMounted(() => console.log('mounted'))
    return { count, increment }
  }
}
```

### 2. 模块化架构

```typescript
// @vue/runtime-core/src/composition.ts
export {
  // 响应式API
  ref, reactive, computed, watch, watchEffect,
  // 生命周期钩子
  onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted,
  // 依赖注入
  provide, inject,
  // 工具函数
  getCurrentInstance, nextTick
} from '@vue/reactivity'
```

## Setup函数源码解析

### 1. Setup函数执行流程

```typescript
// 组件实例创建时的setup处理
function setupComponent(instance: ComponentInternalInstance) {
  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)
  
  if (isStateful) {
    // 初始化props
    initProps(instance, props, isStateful)
    
    // 初始化slots
    initSlots(instance, children)
    
    // 执行setup函数
    setupStatefulComponent(instance)
  }
}

// 有状态组件的setup处理
function setupStatefulComponent(instance: ComponentInternalInstance) {
  const Component = instance.type as ComponentOptions
  
  // 创建组件上下文
  const { setup } = Component
  
  if (setup) {
    // 创建setup上下文
    const setupContext = createSetupContext(instance)
    
    // 设置当前实例
    setCurrentInstance(instance)
    
    // 执行setup函数
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      ErrorCodes.SETUP_FUNCTION,
      [instance.props, setupContext]
    )
    
    // 清除当前实例
    unsetCurrentInstance()
    
    // 处理setup返回值
    handleSetupResult(instance, setupResult)
  }
}
```

### 2. Setup上下文创建

```typescript
// 创建setup上下文
function createSetupContext(instance: ComponentInternalInstance): SetupContext {
  const context: SetupContext = {
    attrs: instance.attrs,
    slots: instance.slots,
    emit: instance.emit,
    expose: (exposed: Record<string, any>) => {
      instance.exposed = exposed
    }
  }
  
  // 冻结上下文，防止意外修改
  return Object.freeze(context)
}

// Setup上下文类型定义
interface SetupContext {
  attrs: Data
  slots: Slots
  emit: EmitFn
  expose: (exposed: Record<string, any>) => void
}
```

### 3. Setup返回值处理

```typescript
// 处理setup函数返回值
function handleSetupResult(
  instance: ComponentInternalInstance,
  setupResult: unknown
) {
  if (isFunction(setupResult)) {
    // 如果返回函数，作为渲染函数
    instance.render = setupResult
  } else if (isObject(setupResult)) {
    // 如果返回对象，合并到组件实例
    instance.setupState = proxyRefs(setupResult)
  }
  
  // 完成组件设置
  finishComponentSetup(instance)
}
```

## 响应式API源码解析

### 1. Ref实现原理

Ref是Vue 3.0响应式系统的基础，它提供了一个简单而强大的方式来创建响应式引用。Ref的设计理念是"包装一切"，无论是基本类型还是对象类型，都可以通过ref包装成响应式引用。

**响应式包装机制**：Ref通过创建一个包装对象，将原始值存储在`_value`属性中，并通过getter和setter实现响应式。当值被访问时，会触发依赖收集；当值被修改时，会触发更新通知。

**类型安全设计**：Ref提供了完整的TypeScript类型支持，包括泛型类型参数、只读引用、浅层引用等。这使得在TypeScript项目中使用Ref更加安全和便捷。

**性能优化策略**：Ref通过Proxy和依赖收集机制，实现了精确的更新通知。只有当值真正发生变化时，才会触发相关的副作用函数，避免了不必要的更新。

```typescript
// Ref类的核心实现
class RefImpl<T> {
  private _value: T
  private _rawValue: T
  public readonly __v_isRef = true
  
  constructor(value: T, public readonly _shallow: boolean) {
    this._rawValue = _shallow ? value : toRaw(value)
    this._value = _shallow ? value : toReactive(value)
  }
  
  get value() {
    // 依赖收集
    trackRefValue(this)
    return this._value
  }
  
  set value(newVal: T) {
    newVal = this._shallow ? newVal : toRaw(newVal)
    
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : toReactive(newVal)
      // 触发更新
      triggerRefValue(this, newVal)
    }
  }
}

// 创建ref
function ref<T>(value: T): Ref<T> {
  return createRef(value, false)
}

// 创建ref的工厂函数
function createRef<T>(value: T, shallow: boolean): Ref<T> {
  if (isRef(value)) {
    return value
  }
  return new RefImpl(value, shallow)
}
```

### 2. Reactive实现原理

```typescript
// 响应式对象创建
function reactive<T extends object>(target: T): T {
  // 如果已经是响应式对象，直接返回
  if (isReactive(target)) {
    return target
  }
  
  // 如果对象不可扩展，返回原对象
  if (!canObserve(target)) {
    return target
  }
  
  // 创建响应式代理
  const observed = new Proxy(
    target,
    collectionTypes.has(target.constructor as any)
      ? collectionHandlers
      : baseHandlers
  )
  
  // 标记为响应式对象
  markRaw(observed, ReactiveFlags.IS_REACTIVE)
  
  return observed
}

// 基础代理处理器
const baseHandlers: ProxyHandler<object> = {
  get(target, key, receiver) {
    // 处理特殊属性
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    
    if (key === ReactiveFlags.IS_READONLY) {
      return false
    }
    
    if (key === ReactiveFlags.RAW && receiver === reactiveMap.get(target)) {
      return target
    }
    
    // 依赖收集
    track(target, TrackOpTypes.GET, key)
    
    const result = Reflect.get(target, key, receiver)
    
    // 深度响应式处理
    if (isObject(result)) {
      return reactive(result)
    }
    
    return result
  },
  
  set(target, key, value, receiver) {
    const oldValue = target[key]
    
    // 设置新值
    const result = Reflect.set(target, key, value, receiver)
    
    // 如果值发生变化，触发更新
    if (hasChanged(value, oldValue)) {
      trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    }
    
    return result
  },
  
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key)
    const oldValue = target[key]
    const result = Reflect.deleteProperty(target, key)
    
    if (result && hadKey) {
      trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
    }
    
    return result
  }
}
```

### 3. Computed实现原理

```typescript
// ComputedRef实现
class ComputedRefImpl<T> {
  private _dirty = true
  private _value!: T
  private _effect: ReactiveEffect<T>
  
  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>
  ) {
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
  }
  
  get value() {
    // 依赖收集
    trackRefValue(this)
    
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    
    return this._value
  }
  
  set value(newValue: T) {
    this._setter(newValue)
  }
}

// 创建computed
function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
): ComputedRef<T> | WritableComputedRef<T> {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  
  return new ComputedRefImpl(getter, setter) as any
}
```

## 生命周期钩子源码解析

### 1. 生命周期钩子注册

```typescript
// 生命周期钩子注册
function onBeforeMount(hook: Function) {
  if (currentInstance) {
    // 将钩子添加到组件实例的生命周期数组中
    addToArray(currentInstance.bm, hook)
  }
}

function onMounted(hook: Function) {
  if (currentInstance) {
    addToArray(currentInstance.m, hook)
  }
}

function onBeforeUpdate(hook: Function) {
  if (currentInstance) {
    addToArray(currentInstance.bu, hook)
  }
}

function onUpdated(hook: Function) {
  if (currentInstance) {
    addToArray(currentInstance.u, hook)
  }
}

function onBeforeUnmount(hook: Function) {
  if (currentInstance) {
    addToArray(currentInstance.bum, hook)
  }
}

function onUnmounted(hook: Function) {
  if (currentInstance) {
    addToArray(currentInstance.um, hook)
  }
}

// 添加钩子到数组的辅助函数
function addToArray(arr: Function[] | null, fn: Function) {
  if (arr) {
    arr.push(fn)
  } else {
    arr = [fn]
  }
}
```

### 2. 生命周期钩子执行

```typescript
// 组件挂载时执行生命周期钩子
function mountComponent(
  vnode: VNode,
  container: Container,
  anchor: ContainerNode | null
) {
  const instance = vnode.component!
  
  // 执行beforeMount钩子
  if (instance.bm) {
    invokeArrayFns(instance.bm)
  }
  
  // 挂载组件
  const subTree = instance.subTree = instance.render()
  patch(null, subTree, container, anchor)
  
  // 执行mounted钩子
  if (instance.m) {
    queuePostFlushCb(() => {
      invokeArrayFns(instance.m)
    })
  }
}

// 组件更新时执行生命周期钩子
function updateComponent(
  n1: VNode,
  n2: VNode
) {
  const instance = n2.component = n1.component!
  
  // 执行beforeUpdate钩子
  if (instance.bu) {
    invokeArrayFns(instance.bu)
  }
  
  // 更新组件
  const next = n2.component.next
  if (next) {
    next.el = n2.el
    updateComponentPreRender(instance, next)
  }
  
  const newTree = instance.render()
  const prevTree = instance.subTree
  instance.subTree = newTree
  
  patch(prevTree, newTree, container, anchor)
  
  // 执行updated钩子
  if (instance.u) {
    queuePostFlushCb(() => {
      invokeArrayFns(instance.u)
    })
  }
}

// 组件卸载时执行生命周期钩子
function unmountComponent(vnode: VNode) {
  const instance = vnode.component!
  
  // 执行beforeUnmount钩子
  if (instance.bum) {
    invokeArrayFns(instance.bum)
  }
  
  // 卸载组件
  unmount(instance.subTree)
  
  // 执行unmounted钩子
  if (instance.um) {
    queuePostFlushCb(() => {
      invokeArrayFns(instance.um)
    })
  }
}
```

## 依赖注入源码解析

### 1. Provide实现

```typescript
// Provide实现
function provide<T>(key: InjectionKey<T> | string | number, value: T) {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`provide() can only be used inside setup().`)
    }
    return
  }
  
  // 获取当前实例的provides
  let provides = currentInstance.provides
  
  // 如果当前实例没有provides，继承父实例的provides
  if (currentInstance.parent && currentInstance.parent.provides === provides) {
    provides = currentInstance.provides = Object.create(provides)
  }
  
  // 设置provide值
  provides[key as string] = value
}
```

### 2. Inject实现

```typescript
// Inject实现
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue?: T,
  treatDefaultAsFactory = false
): T | undefined {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`inject() can only be used inside setup().`)
    }
    return
  }
  
  // 从当前实例开始向上查找provide值
  const provides = currentInstance.provides
  
  if (provides && (key as string | symbol) in provides) {
    return provides[key as string]
  } else if (arguments.length > 1) {
    // 如果找到默认值
    return treatDefaultAsFactory && isFunction(defaultValue)
      ? defaultValue()
      : defaultValue
  } else if (__DEV__) {
    warn(`injection "${String(key)}" not found.`)
  }
}

// 向上查找provide值的辅助函数
function resolveInject(
  key: InjectionKey<any>,
  provides: Record<string | symbol, any>
): any {
  if (provides && (key as string | symbol) in provides) {
    return provides[key as string]
  }
  return undefined
}
```

## 高级特性源码解析

### 1. WatchEffect实现

```typescript
// WatchEffect实现
function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}

// 核心watch实现
function doWatch<T = any>(
  source: T | WatchSource<T>,
  cb: WatchCallback<T> | null,
  options: WatchOptions = {}
): WatchStopHandle {
  const instance = currentInstance
  
  // 创建响应式effect
  const effect = new ReactiveEffect(() => {
    if (cb) {
      // 如果有回调函数，执行回调
      cb(...args)
    } else {
      // 如果没有回调函数，直接执行effect
      source()
    }
  })
  
  // 设置调度器
  if (options.scheduler) {
    effect.scheduler = options.scheduler
  }
  
  // 立即执行effect
  if (options.immediate) {
    effect.run()
  } else {
    effect.run()
  }
  
  // 返回停止函数
  return () => {
    effect.stop()
  }
}
```

### 2. GetCurrentInstance实现

```typescript
// 获取当前组件实例
function getCurrentInstance(): ComponentInternalInstance | null {
  return currentInstance
}

// 设置当前实例
function setCurrentInstance(instance: ComponentInternalInstance | null) {
  currentInstance = instance
}

// 清除当前实例
function unsetCurrentInstance() {
  currentInstance = null
}

// 全局当前实例变量
let currentInstance: ComponentInternalInstance | null = null
```

## 性能优化特性

### 1. 响应式系统优化

```typescript
// 响应式对象缓存
const reactiveMap = new WeakMap<Target, any>()

// 避免重复创建响应式对象
function reactive<T extends object>(target: T): T {
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target)
  }
  
  const observed = new Proxy(target, baseHandlers)
  reactiveMap.set(target, observed)
  
  return observed
}

// 浅层响应式，避免深度递归
function shallowReactive<T extends object>(target: T): T {
  return new Proxy(target, {
    ...baseHandlers,
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      // 不进行深度响应式处理
      return result
    }
  })
}
```

### 2. 组件更新优化

```typescript
// 组件更新优化：跳过不必要的更新
function shouldUpdateComponent(
  prevVNode: VNode,
  nextVNode: VNode
): boolean {
  const { props: prevProps, children: prevChildren } = prevVNode
  const { props: nextProps, children: nextChildren } = nextVNode
  
  // 如果children不同，需要更新
  if (prevChildren !== nextChildren) {
    return true
  }
  
  // 如果props不同，需要更新
  if (prevProps !== nextProps) {
    return true
  }
  
  // 如果都没有变化，跳过更新
  return false
}
```

## 最佳实践和注意事项

### 1. Setup函数最佳实践

```typescript
// ✅ 推荐：逻辑分组
export default {
  setup() {
    const { user, login, logout } = useUser()
    const { cart, addToCart, removeFromCart } = useCart()
    const { orders, createOrder } = useOrder()
    
    return { user, login, logout, cart, addToCart, removeFromCart, orders, createOrder }
  }
}

// ❌ 避免：逻辑混乱
export default {
  setup() {
    const user = ref(null)
    const cart = ref([])
    const login = () => { /* ... */ }
    const addToCart = () => { /* ... */ }
    // 逻辑分散，难以维护
  }
}
```

### 2. 响应式API使用技巧

```typescript
// ✅ 推荐：合理使用ref和reactive
export default {
  setup() {
    const count = ref(0)
    const name = ref('')
    const user = reactive({
      id: 1,
      profile: { firstName: 'John', lastName: 'Doe' }
    })
    const fullName = computed(() => `${user.profile.firstName} ${user.profile.lastName}`)
    
    return { count, name, user, fullName }
  }
}
```

## 调试和性能分析

### 1. 响应式追踪

```typescript
// 开发环境下的响应式追踪
if (__DEV__) {
  function trackRefValue(ref: RefBase<any>) {
    if (activeEffect) {
      trackEffects(ref.dep || (ref.dep = createDep()))
    }
  }
  
  function track(target: object, type: TrackOpTypes, key: unknown) {
    if (!activeEffect) return
    
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }
    
    trackEffects(dep)
  }
}
```

### 2. 性能监控

```typescript
// 组件渲染性能监控
function measureComponentRender(
  instance: ComponentInternalInstance,
  fn: () => any
) {
  if (__DEV__ && performance && performance.mark) {
    const name = `vue:render:${instance.type.name || 'anonymous'}`
    performance.mark(`${name}:start`)
    
    const result = fn()
    
    performance.mark(`${name}:end`)
    performance.measure(name, `${name}:start`, `${name}:end`)
    
    return result
  }
  
  return fn()
}
```

---

**通过深入理解Composition API源码，你将能够：**
- 掌握现代Vue组件的设计模式
- 理解响应式系统的核心原理
- 学会性能优化的最佳实践
- 构建可维护的企业级应用 