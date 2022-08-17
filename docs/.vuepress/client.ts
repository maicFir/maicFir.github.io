import { defineClientConfig } from '@vuepress/client';
import { onMounted } from 'vue'
import "sakura-js/dist/sakura.min.css";
// 这种方式打包会导致vuepress打包，document报错,由于vuepress打包通过nodejs服务端渲染，找不到document对象，所以报错了
// import { installSakura } from "./components/Sakura/index";
const installSakura = import('./components/Sakura/index');
import { installComponent, rootComponentsGlobal } from './components';
export default defineClientConfig({
    enhance({ app, router, siteData }) {
        // 注册自定义全局组件
        installComponent(app);
        // 背景飘花效果
        installSakura.then((n) => {
            const sakuraStart = n.installSakura();
            sakuraStart(app)
        });
  },
    setup() {
        onMounted(() => {
         
      })
  },
  rootComponents: rootComponentsGlobal, // 注册全局组件，放在根节点
})