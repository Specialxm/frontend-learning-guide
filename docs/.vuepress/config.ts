import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "zh-CN",
  title: "前端学习指南",
  description: "HTML、CSS、JavaScript 完整学习教程",
  base: "/frontend-learning-guide/",
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  bundler: viteBundler(),

  theme: hopeTheme({
    // 主题配置
    navbar: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: '性能优化', link: '/performance/' }
    ],

    sidebar: {
      '/': [
        {
          text: '指南',
          children: [
            '/'
          ]
        }
      ],
      '/html/': [
        {
          text: 'HTML 基础',
          children: [
            '/html/',
            '/html/basic-structure',
            '/html/elements',
            '/html/forms',
            '/html/semantic',
            '/html/multimedia'
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS 样式',
          children: [
            '/css/',
            '/css/selectors',
            '/css/box-model',
            '/css/layout',
            '/css/flexbox',
            '/css/grid',
            '/css/responsive',
            '/css/animations',
          ]
        }
      ],
      '/javascript/': [
        {
          text: 'JavaScript 编程',
          children: [
            '/javascript/',
            '/javascript/basics',
            '/javascript/functions',
            '/javascript/objects',
            '/javascript/arrays',
            '/javascript/dom',
            '/javascript/events',
            '/javascript/es6',
            '/javascript/async'
          ]
        }
      ],
      '/performance/': [
        {
          text: '前端性能优化指南',
          children: [
            '/performance/',
            '/performance/overview',
            '/performance/page-loading-process',
            '/performance/user-metrics',
            '/performance/metrics-calculation',
            '/performance/performance-analysis',
            '/performance/network-optimization',
            '/performance/rendering-optimization',
            '/performance/vue3-optimization'
          ]
        }
      ]
    },

    // 其他主题配置
    repo: 'Specialxm/frontend-learning-guide',
    editLink: true,
    lastUpdated: true,
    // 导航栏和侧边栏的设置
    
    // 页面信息
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    
    // 页脚
    footer: "MIT Licensed | Copyright © 2024-present",
    
    // 显示页面标题
    displayFooter: true,
    
    // 深色模式
    darkmode: "toggle",
    markdown: {
      mermaid: true,
    },
  }),
}); 