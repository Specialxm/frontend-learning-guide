import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { viteBundler } from "@vuepress/bundler-vite";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "zh-CN",
  title: "前端学习指南",
  description: "HTML、CSS、JavaScript 完整学习教程",
  base: "/frontend-learning-guide/",
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    // 添加Mermaid主题切换支持
    ['script', {}, `
      // Mermaid主题跟随配置
      if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
          theme: 'default',
          themeVariables: {
            darkMode: false,
            primaryColor: '#0366d6',
            primaryTextColor: '#333333',
            primaryBorderColor: '#e1e4e8',
            lineColor: '#e1e4e8',
            secondaryColor: '#586069',
            tertiaryColor: '#f6f8fa'
          }
        });
        
        // 监听主题切换
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
              const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
              mermaid.initialize({
                theme: isDark ? 'dark' : 'default',
                themeVariables: {
                  darkMode: isDark,
                  primaryColor: isDark ? '#58a6ff' : '#0366d6',
                  primaryTextColor: isDark ? '#c9d1d9' : '#333333',
                  primaryBorderColor: isDark ? '#30363d' : '#e1e4e8',
                  lineColor: isDark ? '#30363d' : '#e1e4e8',
                  secondaryColor: isDark ? '#8b949e' : '#586069',
                  tertiaryColor: isDark ? '#161b22' : '#f6f8fa'
                }
              });
              
              // 重新渲染所有图表
              document.querySelectorAll('.mermaid').forEach((element) => {
                const id = element.getAttribute('data-processed');
                if (id) {
                  element.removeAttribute('data-processed');
                  mermaid.init(undefined, element);
                }
              });
            }
          });
        });
        
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme']
        });
      }
    `]
  ],

  bundler: viteBundler(),

  plugins: [
    searchPlugin({
      // 搜索配置
      locales: {
        '/': {
          placeholder: '搜索文档...',
        },
      },
      // 最大搜索建议数
      maxSuggestions: 10,
      // 热键
      hotKeys: ['s', '/'],
    }),
  ],

  theme: hopeTheme({
    // 主题配置
    navbar: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Vue3.0', link: '/vue3/' },
      { text: '性能优化', link: '/performance/' },
      { text: '前端工程化', link: '/engineering/' }
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
      '/vue3/': [
        {
          text: 'Vue3.0 学习指南',
          children: [
            '/vue3/',
            '/vue3/basics',
            '/vue3/composition-api',
            '/vue3/reactivity',
            '/vue3/components',
            '/vue3/performance',
            '/vue3/typescript',
            '/vue3/engineering'
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
            '/performance/rendering-optimization'
          ]
        }
      ],
      '/engineering/': [
        {
          text: '前端工程化',
          children: [
            '/engineering/',
            {
              text: '基础篇',
              children: [
                '/engineering/architecture',
                '/engineering/compilation'
              ]
            },
            {
              text: '构建工具篇',
              children: [
                '/engineering/vite-deep-dive',
                '/engineering/build-tools',
                '/engineering/webpack-principles'
              ]
            },
            {
              text: '开发规范篇',
              children: [
                '/engineering/typescript-advanced',
                '/engineering/eslint-principles'
              ]
            },
            {
              text: '部署运维篇',
              children: [
                '/engineering/docker-cicd',
                '/engineering/scaffold-tools'
              ]
            },
            {
              text: '测试与质量篇',
              children: [
                '/engineering/testing-strategies',
                '/engineering/component-library'
              ]
            },
            {
              text: '架构设计篇',
              children: [
                '/engineering/micro-frontend'
              ]
            }
          ]
        }
      ]
    },

    // 其他主题配置
    repo: 'Specialxm/frontend-learning-guide',
    editLink: true,
    lastUpdated: true,
    
    // 页面信息
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    
    // 页脚
    footer: "MIT Licensed | Copyright © 2024-present",
    
    // 显示页面标题
    displayFooter: true,
    
    // 深色模式配置
    darkmode: "toggle",
    
    // Mermaid图表配置 - 支持主题切换
    markdown: {
      mermaid: true,
    },
    

  }),
}); 