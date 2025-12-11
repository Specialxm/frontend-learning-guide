import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "zh-CN",
  title: "前端学习指南 - 完整的前端开发教程",
  description: "零基础到高级前端工程师的完整学习路径，涵盖HTML、CSS、JavaScript、Vue3、性能优化、工程化等核心技术，实战项目驱动，面试重点突出",
  base: "/frontend-learning-guide/",
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#0366d6' }],
    
    // SEO优化 - 关键词
    ['meta', { name: 'keywords', content: '前端开发,HTML,CSS,JavaScript,Vue3,性能优化,前端工程化,前端教程,前端学习,前端面试,前端技术,Web开发,响应式设计,TypeScript,微前端,组件库' }],
    
    // SEO优化 - 作者信息
    ['meta', { name: 'author', content: 'Specialxm' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    
    // Open Graph - 社交媒体分享优化
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '前端学习指南' }],
    ['meta', { property: 'og:title', content: '前端学习指南 - 完整的前端开发教程' }],
    ['meta', { property: 'og:description', content: '零基础到高级前端工程师的完整学习路径，涵盖HTML、CSS、JavaScript、Vue3、性能优化、工程化等核心技术' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://specialxm.github.io/frontend-learning-guide/' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '前端学习指南 - 完整的前端开发教程' }],
    ['meta', { name: 'twitter:description', content: '零基础到高级前端工程师的完整学习路径，涵盖HTML、CSS、JavaScript、Vue3、性能优化、工程化等核心技术' }],
    ['meta', { name: 'twitter:image', content: '/og-image.png' }],
    
    // 结构化数据 - JSON-LD (网站级别)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "前端学习指南",
      "alternateName": "Frontend Learning Guide",
      "description": "零基础到高级前端工程师的完整学习路径，涵盖HTML、CSS、JavaScript、Vue3、性能优化、工程化等核心技术，实战项目驱动，面试重点突出",
      "url": "https://specialxm.github.io/frontend-learning-guide/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://specialxm.github.io/frontend-learning-guide/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Specialxm",
        "url": "https://github.com/Specialxm",
        "logo": {
          "@type": "ImageObject",
          "url": "https://specialxm.github.io/frontend-learning-guide/logo.png"
        }
      },
      "inLanguage": "zh-CN",
      "isAccessibleForFree": true,
      "license": "https://opensource.org/licenses/MIT",
      "keywords": "前端开发,HTML,CSS,JavaScript,Vue3,性能优化,前端工程化,前端教程,前端学习,前端面试",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
      }
    })],
    
    // 结构化数据 - EducationalCourse (课程类型)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "前端学习指南",
      "description": "完整的前端开发课程，从HTML、CSS、JavaScript基础到Vue3、性能优化、工程化等高级技术",
      "provider": {
        "@type": "Organization",
        "name": "Specialxm",
        "url": "https://github.com/Specialxm"
      },
      "inLanguage": "zh-CN",
      "isAccessibleForFree": true,
      "courseCode": "frontend-learning-guide",
      "educationalLevel": "Beginner to Advanced",
      "teaches": [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Vue3",
        "前端性能优化",
        "前端工程化",
        "TypeScript",
        "响应式设计"
      ]
    })],
    
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

  bundler: viteBundler({
    viteOptions: {
      build: {
        chunkSizeWarningLimit: 2048, // 将警告限制提高到 2MB，让 Rollup 自动处理代码分割
      },
    },
  }),

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
          text: '快速开始',
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
    repoLabel: '查看源码',
    editLink: true,
    lastUpdated: true,
    
    // 页面信息
    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    
    // 页脚
    footer: "MIT Licensed | Copyright © 2024-present | 前端学习指南",
    
    // 博客功能
    blog: {
      name: "前端学习指南",
      avatar: "/avatar.png",
      description: "零基础到高级前端工程师的完整学习路径",
      intro: "/intro/",
      medias: {
        GitHub: "https://github.com/Specialxm",
        Gitee: "https://gitee.com/Specialxm",
        Email: "mailto:specialxm@example.com"
      }
    },
    
    // 加密功能
    encrypt: {
      config: {
        "/guide/encrypt.html": ["1234"],
      },
    },
    
    // Mermaid图表配置 - 支持主题切换
    markdown: {
      mermaid: true,
      // 脚注
      footnote: true,
      // 数学公式
      math: true,
    },
    
    // 插件配置
    plugins: {
      // 搜索插件配置
      search: {
        locales: {
          '/': {
            placeholder: '搜索前端学习内容...',
          },
        },
        // 最大搜索建议数
        maxSuggestions: 15,
        // 热键
        hotKeys: ['s', '/', 'ctrl+k'],
      },
      
      // SEO插件配置 - 主题会自动处理，只需启用即可
      seo: true,
      
      // Sitemap插件配置 - 主题会自动处理，只需启用即可
      sitemap: true,
      
      // 博客功能插件
      blog: true,
      
      // 复制代码
      copyCode: {
        showInMobile: true,
        duration: 2000,
      },
      // 图片预览
      photoSwipe: {
        selector: ".theme-hope-content :not(a) > img",
      },
    },
  }),
  
  // 额外的构建配置
  markdown: {
    // 自动生成目录
    toc: {
      level: [1, 2, 3, 4],
    },
  },
  
  // 构建输出配置
  dest: 'docs/.vuepress/dist',
  temp: 'docs/.vuepress/.temp',
  cache: 'docs/.vuepress/.cache',
  
  // 开发服务器配置
  port: 8080,
  open: true,
  
  // 调试配置
  debug: false,
}); 