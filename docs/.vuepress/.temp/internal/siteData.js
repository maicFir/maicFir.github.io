export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"Web技术学苑\",\"description\":\"专注前端技术，分享web技术\",\"head\":[[\"script\",{\"src\":\"\"}],[\"script\",{\"src\":\"https://hm.baidu.com/hm.js?c7002d193ba43df9317b7fc847709213\"}],[\"link\",{\"rel\":\"stylesheet\",\"href\":\"https://cdn.jsdelivr.net/npm/@docsearch/css@3\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/images/n_logo.png\"}],[\"link\",{\"rel\":\"manifest\",\"href\":\"/manifest.webmanifest.json\"}],[\"script\",{\"src\":\"https://cdn.jsdelivr.net/npm/@docsearch/js@3\"}],[\"meta\",{\"name\":\"viewport\",\"content\":\"width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"}],[\"meta\",{\"name\":\"referrer\",\"content\":\"no-referrer\"}],[\"meta\",{\"data-draft-node\":\"block\",\"data-draft-type\":\"table\",\"data-size\":\"normal\",\"data-row-style\":\"normal\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"title\":\"Web技术学苑\",\"description\":\"专注前端技术，分享web技术\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
