

const { path } = require('@vuepress/utils');
// 搜索
import { searchPlugin } from './customize/docsearch'
// 自动注册全局组件
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components');
// pwa
const { pwaPlugin } = require('@vuepress/plugin-pwa');

// const ribbonPlugin = require('./customize/ribbon/index');

export const plugins: any = [
  searchPlugin(),
  registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, '../../', 'components'), // 自动注册全局组件,
  }),
  pwaPlugin({
    skipWaiting: true
  }),
//   ribbonPlugin({})
];
