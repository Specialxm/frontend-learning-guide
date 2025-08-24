<template>
  <div class="header-search">
    <div class="search-trigger" @click="toggleSearch" title="搜索 (Ctrl+S)">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
    </div>

    <!-- 搜索下拉框 -->
    <div v-if="showSearch" class="search-dropdown">
      <div class="search-input-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="搜索文档..."
          class="search-input"
          @input="onSearchInput"
          @keydown="onKeydown"
          @blur="onBlur"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn" title="清除">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>

      <!-- 搜索结果 -->
      <div v-if="searchQuery && searchResults.length > 0" class="search-results">
        <div
          v-for="(result, index) in searchResults"
          :key="index"
          class="result-item"
          :class="{ active: index === activeIndex }"
          @click="goToResult(result)"
          @mouseenter="activeIndex = index"
        >
          <div class="result-title">{{ result.title }}</div>
          <div class="result-path">{{ result.path }}</div>
        </div>
      </div>

      <!-- 无结果提示 -->
      <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
        <div class="no-results-text">未找到相关结果</div>
      </div>

      <!-- 搜索提示 -->
      <div v-else class="search-tips">
        <div class="tips-title">搜索提示</div>
        <div class="tips-list">
          <div class="tip-item">
            <span class="tip-key">Ctrl + S</span>
            <span class="tip-desc">快速搜索</span>
          </div>
          <div class="tip-item">
            <span class="tip-key">↑↓</span>
            <span class="tip-desc">选择结果</span>
          </div>
          <div class="tip-item">
            <span class="tip-key">Enter</span>
            <span class="tip-desc">跳转页面</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
  title: string
  path: string
}

const router = useRouter()
const showSearch = ref(false)
const searchQuery = ref('')
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

// 模拟搜索结果
const searchResults = computed<SearchResult[]>(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  const allPages = [
    { title: 'HTML 基础结构', path: '/html/basic-structure' },
    { title: 'CSS 选择器', path: '/css/selectors' },
    { title: 'JavaScript 基础', path: '/javascript/basics' },
    { title: 'DOM 操作', path: '/javascript/dom' },
    { title: 'CSS 布局', path: '/css/layout' },
    { title: '性能优化概述', path: '/performance/overview' },
    { title: 'ES6 新特性', path: '/javascript/es6' },
    { title: '异步编程', path: '/javascript/async' },
  ]
  
  return allPages.filter(page => 
    page.title.toLowerCase().includes(query) ||
    page.path.toLowerCase().includes(query)
  )
})

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const onSearchInput = () => {
  activeIndex.value = 0
}

const onBlur = () => {
  // 延迟隐藏，让点击事件能够触发
  setTimeout(() => {
    showSearch.value = false
  }, 200)
}

const onKeydown = (event: KeyboardEvent) => {
  if (searchResults.value.length === 0) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % searchResults.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = activeIndex.value === 0 
        ? searchResults.value.length - 1 
        : activeIndex.value - 1
      break
    case 'Enter':
      event.preventDefault()
      if (searchResults.value[activeIndex.value]) {
        goToResult(searchResults.value[activeIndex.value])
      }
      break
    case 'Escape':
      showSearch.value = false
      searchInput.value?.blur()
      break
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  activeIndex.value = 0
}

const goToResult = (result: SearchResult) => {
  router.push(result.path)
  showSearch.value = false
  searchQuery.value = ''
}

// 全局键盘快捷键
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    if (!showSearch.value) {
      toggleSearch()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.header-search {
  position: relative;
  display: inline-block;
}

.search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--c-text);
}

.search-trigger:hover {
  background-color: var(--c-bg-light);
  transform: scale(1.05);
}

.search-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-height: 400px;
  overflow: hidden;
  z-index: 1000;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--c-border-light);
}

.search-icon {
  position: absolute;
  left: 20px;
  color: var(--c-text-lighter);
}

.search-input {
  flex: 1;
  height: 36px;
  padding: 8px 32px 8px 32px;
  border: 1px solid var(--c-border);
  border-radius: 18px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  background: var(--c-bg);
  color: var(--c-text);
}

.search-input:focus {
  border-color: var(--c-brand);
}

.clear-btn {
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  color: var(--c-text-lighter);
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background-color: var(--c-bg-light);
  color: var(--c-text);
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--c-border-light);
  transition: background-color 0.2s ease;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item:hover,
.result-item.active {
  background-color: var(--c-bg-light);
}

.result-title {
  font-weight: 500;
  color: var(--c-text);
  margin-bottom: 4px;
  font-size: 14px;
}

.result-path {
  color: var(--c-text-lighter);
  font-size: 12px;
  font-family: monospace;
}

.no-results {
  padding: 20px;
  text-align: center;
}

.no-results-text {
  color: var(--c-text-light);
  font-size: 14px;
}

.search-tips {
  padding: 16px;
}

.tips-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 12px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tip-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--c-bg-light);
  border-radius: 6px;
}

.tip-key {
  background: var(--c-brand);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  font-family: monospace;
}

.tip-desc {
  color: var(--c-text-light);
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-dropdown {
    width: 280px;
    right: -20px;
  }
}
</style> 