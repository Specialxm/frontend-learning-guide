<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="navbar-container">
        <!-- <div class="navbar-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-text">前端学习指南</span>
          </router-link>
        </div> -->
        
        <nav class="navbar-nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/html/" class="nav-link">HTML</router-link>
          <router-link to="/css/" class="nav-link">CSS</router-link>
          <router-link to="/javascript/" class="nav-link">JavaScript</router-link>
          <router-link to="/performance/" class="nav-link">性能优化</router-link>
        </nav>
        
        <!-- 右上角搜索组件 -->
        <div class="navbar-right">
          <HeaderSearch />
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>MIT Licensed | Copyright © 2024-present</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import HeaderSearch from '../components/HeaderSearch.vue'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  text-decoration: none;
  color: var(--c-text);
}

.brand-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-brand);
}

.navbar-nav {
  display: flex;
  gap: 24px;
  margin: 0 40px;
}

.nav-link {
  text-decoration: none;
  color: var(--c-text);
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--c-bg-light);
  color: var(--c-brand);
}

.nav-link.router-link-active {
  color: var(--c-brand);
  background-color: var(--c-bg-light);
}

.navbar-right {
  flex-shrink: 0;
}

.main-content {
  margin-top: 60px;
  min-height: calc(100vh - 120px);
}

.footer {
  background: var(--c-bg-light);
  border-top: 1px solid var(--c-border);
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer p {
  margin: 0;
  color: var(--c-text-light);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 16px;
  }
  
  .navbar-nav {
    display: none;
  }
  
  .brand-text {
    font-size: 18px;
  }
}
</style> 