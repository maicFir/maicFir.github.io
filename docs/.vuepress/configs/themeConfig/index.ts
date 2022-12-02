import { defaultTheme } from 'vuepress';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import nav from './navConfig';
import { sidebar } from './slidebar';
const themeConfig: DefaultThemeOptions = {
  contributors: false,
  contributorsText: '作者',
  repo: 'https://github.com/maicFir/maicFir.github.io',
  docsBranch: 'dev2.0',
  colorMode: 'light', // 默认主题颜色
  editLink: true,
  navbar: nav, // 顶部导航栏配置
  sidebar, // 左侧菜单栏配置
  editLinkText: 'Edit this page on GitHub'
};
export default themeConfig;
