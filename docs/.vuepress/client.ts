/*
 * @LineStart: -------------------------------------------
 * @Copyright: © 2022, Web技术学苑. All rights reserved
 * @LineEnd: -------------------------------------------
 * @Author: maicFir
 * @Date: 2022-08-15 23:03:42
 * @LastEditors: maicFir
 * @LastEditTime: 2023-02-10 18:25:12
 * @Description: 
 */
import { defineClientConfig } from '@vuepress/client';
import { onMounted } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { installComponent, rootComponentsGlobal } from './components';
export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 注册elementPlus
        app.use(ElementPlus)
        // 注册自定义全局组件
        installComponent(app);
  },
    setup() {
        onMounted(() => {
           
      })
  },
    rootComponents: rootComponentsGlobal, // 注册全局组件，放在根节点
})