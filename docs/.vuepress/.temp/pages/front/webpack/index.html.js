export const data = JSON.parse("{\"key\":\"v-7d7436c1\",\"path\":\"/front/webpack/\",\"title\":\"webpack\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"webpack\",\"subSidebar\":false},\"excerpt\":\"\",\"headers\":[{\"level\":3,\"title\":\"目录\",\"slug\":\"目录\",\"children\":[]}],\"git\":{\"updatedTime\":1658390518000,\"contributors\":[{\"name\":\"maicFir\",\"email\":\"anne.duan@aax.com\",\"commits\":2}]},\"filePathRelative\":\"front/webpack/README.md\"}")

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
