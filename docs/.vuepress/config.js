module.exports = {
  title: '前端学习指南',
  description: 'HTML、CSS、JavaScript 完整学习教程',
  base: '/frontend-learning-guide/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Vue 3.0', link: '/vue3/' }
    ],
    
    sidebar: {
      '/html/': [
        {
          title: 'HTML 基础',
          collapsable: false,
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
          title: 'CSS 样式',
          collapsable: false,
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
          title: 'JavaScript 编程',
          collapsable: false,
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
          title: 'Vue 3.0 基础学习',
          collapsable: false,
          children: [
            '/vue3/',
            '/vue3/introduction',
            '/vue3/quick-start',
            '/vue3/template-syntax',
            '/vue3/composition-api',
            '/vue3/reactive-fundamentals',
            '/vue3/components',
            '/vue3/advanced-features',
            '/vue3/summary'
          ]
        },
        {
          title: 'Vue 3.0 源码深度解析',
          collapsable: false,
          children: [
            '/vue3/source-code-analysis',
            '/vue3/composition-api-source',
            '/vue3/compiler-runtime-optimization',
            '/vue3/advanced-features-source'
          ]
        }
      ]
    },
    
    repo: 'Specialxm/frontend-learning-guide',
    repoLabel: '给作者的 Github 点个 star 吧！',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '最后更新',
    
    // 导航栏和侧边栏的设置
    smoothScroll: false,
    search: true,
    searchMaxSuggestions: 10,
    
    // 下一页和上一页的链接
    nextLinks: true,
    prevLinks: true
  },
  
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/plugin-last-updated',
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ],
  
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4']
  }
} 