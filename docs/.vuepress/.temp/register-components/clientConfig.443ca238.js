import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("ActionFied", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/ActionFied.vue")))
  },
}
