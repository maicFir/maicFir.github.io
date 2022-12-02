import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("ActionFied-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/ActionFied/view/Index.vue"))),
      app.component("Footer-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/Footer/view/Index.vue"))),
      app.component("FormWeather-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/FormWeather/view/Index.vue"))),
      app.component("FormWeather-view-flipClock", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/FormWeather/view/flipClock.vue"))),
      app.component("FormWeather-view-flipper", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/FormWeather/view/flipper.vue"))),
      app.component("FormSearch-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/FormSearch/view/Index.vue"))),
      app.component("Sparkler-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/Sparkler/view/Index.vue"))),
      app.component("LastNewActile-view-Index", defineAsyncComponent(() => import("/Users/atom/mc/vuepress-blog/maicFir.github.io/docs/.vuepress/components/LastNewActile/view/Index.vue")))
  },
}
