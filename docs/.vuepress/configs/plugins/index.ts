const { path } = require('@vuepress/utils');
// 搜索
const { docsearchPlugin } = require('@vuepress/plugin-docsearch');
// 自动注册全局组件
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components');
// pwa
const { pwaPlugin } = require('@vuepress/plugin-pwa');
export const plugins: any = [
  docsearchPlugin({}),
  registerComponentsPlugin({
    componentsDir: path.resolve(__dirname, '../../', 'components')
  }),
  pwaPlugin({
    skipWaiting: true
  })
  // [
  //   '@vuepress/active-header-links',
  //   {
  //     sidebarLinkSelector: '.sidebar-link',
  //     headerAnchorSelector: '.header-anchor'
  //   }
  // ],
];
