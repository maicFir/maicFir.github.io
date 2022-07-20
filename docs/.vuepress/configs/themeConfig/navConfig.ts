import { NavItem } from '@vuepress/types';

const nav: Array<NavItem> = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: 'Web技术',
    items: [
      {
        text: 'JS',
        link: '/front/js/'
      },
      {
        text: 'CSS',
        link: '/front/css/'
      },
      {
        text: '框架',
        items: [
          {
            text: 'vue',
            link: '/front/frame/vue/'
          },
          {
            text: 'react',
            link: '/front/frame/react/'
          }
        ]
      },
      {
        text: '算法',
        link: '/front/leetcode/'
      },
      {
        text: 'TS',
        link: '/front/ts/'
      },
      {
        text: 'node',
        link: '/front/node/'
      }
    ]
  },
  {
    text: '工程化',
    items: [
      {
        text: 'webpack',
        link: '/front/webpack/'
      }
    ]
  },
  {
    text: '社交',
    items: [
      {
        text: '掘金',
        link: 'https://juejin.cn/user/4142615542920680'
      },
      {
        text: 'segmentfault',
        link: 'https://segmentfault.com/u/maicfir'
      },
      {
        text: 'github',
        link: 'https://github.com/maicFir/lessonNote'
      }
    ]
  }
];

export default nav;
