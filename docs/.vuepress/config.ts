/*
 * @Author: maicFir 
 * @Date: 2022-07-21 17:53:48
 * @LastEditors: maicFir
 * @LastEditTime: 2022-07-22 10:07:53
 * @FilePath: /maicFir.github.io/docs/.vuepress/config.ts
 * @Description: 配置入口文件
 */

import { defineUserConfig } from 'vuepress';
import { localTheme } from './theme';
import themeConfig from './configs/themeConfig';
import markdownConfig from './configs/markdown';
import headConfig from './configs/head';
import { plugins } from './configs/plugins';
export default defineUserConfig({
  title: 'Web技术学苑',
  description: '专注前端技术，分享web技术',
  markdown: markdownConfig, // markdown 相关配置
  head: headConfig, // head meta 相关配置
  theme: localTheme(themeConfig), // 主题相关配置
  plugins,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Web技术学院',
      description: '专注前端技术，分享web技术'
    }
  }
});
