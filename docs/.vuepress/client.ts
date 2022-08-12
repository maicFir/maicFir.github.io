

import { defineClientConfig } from '@vuepress/client';
import "sakura-js/dist/sakura.min.css";
import { installComponent, rootComponentsGlobal } from './components';
export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 注册自定义全局组件
        installComponent(app);
  },
  setup() {},
  rootComponents: rootComponentsGlobal, // 注册全局组件，放在根节点
})