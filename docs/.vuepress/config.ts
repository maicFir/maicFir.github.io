import { defineConfig } from 'vuepress/config';
import themeConfig from './configs/themeConfig';
import webpackConfig from './configs/webpack/webpack.config';
import markdownConfig from './configs/markdown';
import headConfig from './configs/head';
import { plugins } from './configs/plugins';
const { configureWebpack, chainWebpack } = webpackConfig;
export default defineConfig({
  title: 'Web技术学苑',
  extraWatchFiles: ['.vuepress/**/*.(js|ts)'],
  description: '专注前端技术，分享web技术',
  theme: 'reco', // vuepress-theme-reco 主题 reco主题
  markdown: markdownConfig, // markdown 相关配置
  head: headConfig, // head meta 相关配置
  themeConfig, // 主题相关配置
  configureWebpack,
  chainWebpack,
  plugins
});
