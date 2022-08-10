import { NavbarConfig } from '@vuepress/theme-default';

const nav: NavbarConfig = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: 'Web技术',
    children: [
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
        children: [
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
    children: [
      {
        text: 'webpack',
        link: '/front/webpack/'
        },
        {
            text: 'git',
            link: '/front/git/'
        }
    ]
  },
  {
    text: '社交',
    children: [
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
