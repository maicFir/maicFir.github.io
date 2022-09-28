export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"sidebar\":false,\"home\":true,\"heroImage\":\"/images/n_logo.png\",\"heroText\":\"Web技术学苑\",\"tagline\":\"专注前端技术，分享web技术\",\"actions\":[{\"text\":\"快速学习 →\",\"link\":\"/front/js/\"}],\"features\":[{\"title\":\"读书\",\"details\":\"读书是了解世界，了解自己，让自己变得更好\"},{\"title\":\"写作\",\"details\":\"专注技术知识写作，让技术知识影响更多人\"},{\"title\":\"自省\",\"details\":\"日省其身，天行健，自强不息\"}]},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1660803169000,\"contributors\":[{\"name\":\"maicFir\",\"email\":\"mcodes@163.com\",\"commits\":4},{\"name\":\"maicFir\",\"email\":\"anne.duan@aax.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")

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
