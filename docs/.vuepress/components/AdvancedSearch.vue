<template>
  <div class="advanced-search">
    <div class="search-trigger" @click="toggleSearch">
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
      <span class="search-text">搜索</span>
    </div>

    <!-- 搜索模态框 -->
    <div v-if="showSearchModal" class="search-modal" @click="closeSearch">
      <div class="search-modal-content" @click.stop>
        <div class="search-header">
          <div class="search-input-container">
            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
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
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>
          <button @click="closeSearch" class="close-btn">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>

        <!-- 搜索结果 -->
        <div v-if="searchQuery && searchResults.length > 0" class="search-results">
          <div class="results-header">
            <span>找到 {{ searchResults.length }} 个结果</span>
          </div>
          <div class="results-list">
            <div
              v-for="(result, index) in searchResults"
              :key="index"
              class="result-item"
              :class="{ active: index === activeIndex }"
              @click="goToResult(result)"
              @mouseenter="activeIndex = index"
            >
              <div class="result-title">{{ result.title }}</div>
              <div class="result-excerpt">{{ result.excerpt }}</div>
              <div class="result-path">{{ result.path }}</div>
            </div>
          </div>
        </div>

        <!-- 无结果提示 -->
        <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">未找到相关结果</div>
          <div class="no-results-suggestions">
            尝试使用不同的关键词或检查拼写
          </div>
        </div>

        <!-- 搜索提示 -->
        <div v-else class="search-tips">
          <div class="tips-title">搜索提示</div>
          <div class="tips-list">
            <div class="tip-item">
              <span class="tip-key">Ctrl + S</span>
              <span class="tip-desc">快速打开搜索</span>
            </div>
            <div class="tip-item">
              <span class="tip-key">↑↓</span>
              <span class="tip-desc">选择搜索结果</span>
            </div>
            <div class="tip-item">
              <span class="tip-key">Enter</span>
              <span class="tip-desc">跳转到选中结果</span>
            </div>
            <div class="tip-item">
              <span class="tip-key">Esc</span>
              <span class="tip-desc">关闭搜索</span>
            </div>
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
  excerpt: string
}

const router = useRouter()
const showSearchModal = ref(false)
const searchQuery = ref('')
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

// 模拟搜索结果
const searchResults = computed<SearchResult[]>(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  const allPages = [
    { title: 'HTML 基础结构', path: '/html/basic-structure', excerpt: '学习 HTML 文档的基本结构和标签使用...' },
    { title: 'CSS 选择器', path: '/css/selectors', excerpt: '掌握 CSS 选择器的各种用法和优先级...' },
    { title: 'JavaScript 基础', path: '/javascript/basics', excerpt: 'JavaScript 语言基础知识和语法...' },
    { title: 'DOM 操作', path: '/javascript/dom', excerpt: '使用 JavaScript 操作 DOM 元素...' },
    { title: 'CSS 布局', path: '/css/layout', excerpt: 'CSS 布局技术和响应式设计...' },
    { title: '性能优化概述', path: '/performance/overview', excerpt: '前端性能优化的基本原则和方法...' },
    { title: 'ES6 新特性', path: '/javascript/es6', excerpt: 'ECMAScript 6 的新增语法和功能...' },
    { title: '异步编程', path: '/javascript/async', excerpt: 'JavaScript 异步编程模式和最佳实践...' },
  ]
  
  return allPages.filter(page => 
    page.title.toLowerCase().includes(query) ||
    page.excerpt.toLowerCase().includes(query) ||
    page.path.toLowerCase().includes(query)
  )
})

const toggleSearch = () => {
  showSearchModal.value = !showSearchModal.value
  if (showSearchModal.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const closeSearch = () => {
  showSearchModal.value = false
  searchQuery.value = ''
  activeIndex.value = 0
}

const clearSearch = () => {
  searchQuery.value = ''
  activeIndex.value = 0
}

const onSearchInput = () => {
  activeIndex.value = 0
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
      closeSearch()
      break
  }
}

const goToResult = (result: SearchResult) => {
  router.push(result.path)
  closeSearch()
}

// 全局键盘快捷键
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    if (!showSearchModal.value) {
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
.advanced-search {
  position: relative;
}

.search-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--c-text);
}

.search-trigger:hover {
  background-color: var(--c-bg-light);
}

.search-text {
  font-size: 14px;
}

.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.search-modal-content {
  background: var(--c-bg);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 70vh;
  overflow: hidden;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--c-border);
}

.search-input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--c-text-lighter);
}

.search-input {
  flex: 1;
  height: 48px;
  padding: 12px 40px 12px 40px;
  border: 2px solid var(--c-border);
  border-radius: 24px;
  font-size: 16px;
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
  right: 12px;
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

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--c-text-lighter);
  margin-left: 12px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--c-bg-light);
  color: var(--c-text);
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
}

.results-header {
  padding: 16px 20px;
  background: var(--c-bg-light);
  border-bottom: 1px solid var(--c-border);
  font-size: 14px;
  color: var(--c-text-lighter);
}

.results-list {
  padding: 0;
}

.result-item {
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid var(--c-border-light);
  transition: background-color 0.2s ease;
}

.result-item:hover,
.result-item.active {
  background-color: var(--c-bg-light);
}

.result-title {
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 6px;
  font-size: 16px;
}

.result-excerpt {
  color: var(--c-text-light);
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.4;
}

.result-path {
  color: var(--c-text-lighter);
  font-size: 12px;
  font-family: monospace;
}

.no-results {
  padding: 40px 20px;
  text-align: center;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-results-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 8px;
}

.no-results-suggestions {
  color: var(--c-text-light);
  font-size: 14px;
}

.search-tips {
  padding: 40px 20px;
}

.tips-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 20px;
  text-align: center;
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.tip-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--c-bg-light);
  border-radius: 8px;
}

.tip-key {
  background: var(--c-brand);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-family: monospace;
}

.tip-desc {
  color: var(--c-text-light);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .search-header {
    padding: 16px;
  }
  
  .search-input {
    height: 44px;
    font-size: 16px;
  }
  
  .tips-list {
    grid-template-columns: 1fr;
  }
}
</style> 