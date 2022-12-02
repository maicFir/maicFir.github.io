export const data = JSON.parse("{\"key\":\"v-3b0ef71d\",\"path\":\"/front/webpack/2022-06-14.html\",\"title\":\"揭秘webpack5模块打包\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"揭秘webpack5模块打包\",\"date\":\"2022-06-14T00:00:00.000Z\",\"sidebarDepth\":3},\"excerpt\":\"\",\"headers\":[{\"level\":3,\"title\":\"初始化基础项目\",\"slug\":\"初始化基础项目\",\"children\":[]},{\"level\":3,\"title\":\"commonjs_index.js\",\"slug\":\"commonjs-index-js\",\"children\":[]},{\"level\":3,\"title\":\"esmodule_index.js\",\"slug\":\"esmodule-index-js\",\"children\":[]},{\"level\":3,\"title\":\"webpack 打包 cjs 最终代码\",\"slug\":\"webpack-打包-cjs-最终代码\",\"children\":[]},{\"level\":3,\"title\":\"1、初始化定义了 webpack 依赖的模块\",\"slug\":\"_1、初始化定义了-webpack-依赖的模块\",\"children\":[]},{\"level\":3,\"title\":\"2、调用模块优先从缓存对象模块取值\",\"slug\":\"_2、调用模块优先从缓存对象模块取值\",\"children\":[]},{\"level\":3,\"title\":\"3、绑定全局对象，引入图片的资源路径，主要是__webpack_require__.p图片地址\",\"slug\":\"_3、绑定全局对象-引入图片的资源路径-主要是-webpack-require-p图片地址\",\"children\":[]},{\"level\":3,\"title\":\"4、将esModule转换，用Object.defineProperty拦截exports(module.exports)对象添加__esModule属性\",\"slug\":\"_4、将esmodule转换-用object-defineproperty拦截exports-module-exports-对象添加-esmodule属性\",\"children\":[]},{\"level\":3,\"title\":\"5、__webpack_require__(moduleId)执行获取对应的内容\",\"slug\":\"_5、-webpack-require-moduleid-执行获取对应的内容\",\"children\":[]},{\"level\":3,\"title\":\"webpack 打包 esModule 最终代码\",\"slug\":\"webpack-打包-esmodule-最终代码\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结\",\"children\":[]}],\"git\":{\"updatedTime\":1658316307000},\"filePathRelative\":\"front/webpack/2022-06-14.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
