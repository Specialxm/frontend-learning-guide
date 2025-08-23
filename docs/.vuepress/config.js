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
      { text: 'GitHub', link: 'https://github.com/yourusername/frontend-learning-guide' }
    ],
    
    sidebar: {
      '/html/': [
        {
          title: 'HTML 基础',
          collapsable: false,
          children: [
            '/html/',
            '/html/basic-structure',
            '/html/elements'
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
            '/css/box-model'
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
            '/javascript/functions'
          ]
        }
      ]
    },
    
    repo: 'yourusername/frontend-learning-guide',
    repoLabel: 'GitHub',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '最后更新',
    
    // 导航栏和侧边栏的设置
    smoothScroll: true,
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