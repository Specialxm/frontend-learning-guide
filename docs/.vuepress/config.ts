module.exports = {
  title: '前端学习指南',
  description: 'HTML、CSS、JavaScript 完整学习教程',
  
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
          children: [
            '/html/README.md',
            '/html/basic-structure.md',
            '/html/elements.md',
            '/html/forms.md',
            '/html/semantic.md',
            '/html/multimedia.md'
          ]
        }
      ],
      '/css/': [
        {
          title: 'CSS 样式',
          children: [
            '/css/README.md',
            '/css/selectors.md',
            '/css/box-model.md',
            '/css/layout.md',
            '/css/flexbox.md',
            '/css/grid.md',
            '/css/responsive.md',
            '/css/animations.md'
          ]
        }
      ],
      '/javascript/': [
        {
          title: 'JavaScript 编程',
          children: [
            '/javascript/README.md',
            '/javascript/basics.md',
            '/javascript/functions.md',
            '/javascript/objects.md',
            '/javascript/arrays.md',
            '/javascript/dom.md',
            '/javascript/events.md',
            '/javascript/es6.md',
            '/javascript/async.md'
          ]
        }
      ]
    },
    
    repo: 'yourusername/frontend-learning-guide',
    repoLabel: 'GitHub',
    editLinks: true,
    editLinkText: '编辑此页',
    lastUpdated: '最后更新',
    
    // VuePress 1.x 的配置方式
    smoothScroll: true,
    search: true,
    searchMaxSuggestions: 10
  },
  
  plugins: [
    // 可以添加更多插件
  ]
} 