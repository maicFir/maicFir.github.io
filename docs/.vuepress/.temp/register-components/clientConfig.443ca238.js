import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("ActionFied-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/ActionFied/view/Index.vue")))
  },
}
