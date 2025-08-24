<template>
  <div class="search-box">
    <div class="search-input-wrapper">
      <input
        ref="searchInput"
        v-model="query"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <div class="search-icon">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </div>
    </div>
    
    <!-- 搜索结果下拉框 -->
    <div v-if="showResults && results.length > 0" class="search-results">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="search-result-item"
        :class="{ active: index === activeIndex }"
        @click="goToPage(result.path)"
        @mouseenter="activeIndex = index"
      >
        <div class="result-title">{{ result.title }}</div>
        <div class="result-path">{{ result.path }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
  title: string
  path: string
  content?: string
}

const props = defineProps<{
  placeholder?: string
}>()

const router = useRouter()
const query = ref('')
const showResults = ref(false)
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement>()

// 模拟搜索结果数据
const results = computed<SearchResult[]>(() => {
  if (!query.value.trim()) return []
  
  // 这里可以根据实际需求实现搜索逻辑
  // 目前使用模拟数据
  const mockResults: SearchResult[] = [
    { title: 'HTML 基础结构', path: '/html/basic-structure' },
    { title: 'CSS 选择器', path: '/css/selectors' },
    { title: 'JavaScript 基础', path: '/javascript/basics' },
    { title: '性能优化概述', path: '/performance/overview' },
  ].filter(result => 
    result.title.toLowerCase().includes(query.value.toLowerCase()) ||
    result.path.toLowerCase().includes(query.value.toLowerCase())
  )
  
  return mockResults
})

const onInput = () => {
  showResults.value = query.value.trim().length > 0
  activeIndex.value = 0
}

const onFocus = () => {
  if (query.value.trim().length > 0) {
    showResults.value = true
  }
}

const onBlur = () => {
  // 延迟隐藏，让点击事件能够触发
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

const onKeydown = (event: KeyboardEvent) => {
  if (!showResults.value || results.value.length === 0) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % results.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = activeIndex.value === 0 
        ? results.value.length - 1 
        : activeIndex.value - 1
      break
    case 'Enter':
      event.preventDefault()
      if (results.value[activeIndex.value]) {
        goToPage(results.value[activeIndex.value].path)
      }
      break
    case 'Escape':
      showResults.value = false
      searchInput.value?.blur()
      break
  }
}

const goToPage = (path: string) => {
  router.push(path)
  showResults.value = false
  query.value = ''
}

// 键盘快捷键
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.search-box {
  position: relative;
  display: inline-block;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
  height: 36px;
  padding: 8px 36px 8px 12px;
  border: 1px solid var(--c-border);
  border-radius: 18px;
  background: var(--c-bg);
  color: var(--c-text);
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--c-brand);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  width: 240px;
}

.search-icon {
  position: absolute;
  right: 12px;
  color: var(--c-text-lighter);
  pointer-events: none;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid var(--c-border-light);
  transition: background-color 0.2s ease;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover,
.search-result-item.active {
  background-color: var(--c-bg-light);
}

.result-title {
  font-weight: 500;
  color: var(--c-text);
  margin-bottom: 4px;
}

.result-path {
  font-size: 12px;
  color: var(--c-text-lighter);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-input {
    width: 160px;
  }
  
  .search-input:focus {
    width: 180px;
  }
}
</style> 