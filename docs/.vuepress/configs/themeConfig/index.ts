import { DefaultThemeConfig } from 'vuepress/config';
import nav from './navConfig';
import { sidebar } from './slidebar';
interface themeConfigExtends {
  subSidebar: string;
  author: string;
  mode: string;
  displayAllHeaders: boolean;
}

const themeConfig: DefaultThemeConfig & themeConfigExtends = {
  nav, // 顶部导航栏配置
  sidebar, // 左侧菜单栏配置
  smoothScroll: true, // 启动页面滚动效果
  subSidebar: 'auto', // 打开子侧边栏
  sidebarDepth: 4,
  author: 'Maic', // markdown 文章的作者名设置
  mode: 'light', // 设置默认主题颜色
  displayAllHeaders: true, //显示所有标签
  search: true, // 搜索设置,开启头部搜索框模糊搜索本站内容
  searchMaxSuggestions: 10,
  lastUpdated: 'Last Updated', // 最近更新时间
  docsBranch: 'dev', // 默认仓库的分支
  repo: 'https://github.com/maicFir/maicFir.github.io',
  editLinks: true,
  editLinkText: 'edit this page'
};
export default themeConfig;
