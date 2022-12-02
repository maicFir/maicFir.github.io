// 引入自定义注册全局组件
import ActionFied from "./ActionFied";
import Sparkler from "./Sparkler";
import Footer from "./Footer";
import FormSearch from './FormSearch'
import FormWeather from "./FormWeather";
import LastNewActile from "./LastNewActile";
const Custcomponents = {
    Footer,
    FormSearch,
    FormWeather,
    LastNewActile
}
export const installComponent = (app) => {
    if (Object.keys(Custcomponents).length > 0) {
        Object.keys(Custcomponents).forEach(key => {
            app.component(key, Custcomponents[key])
        })
    }
}
// 注册到根节点上的全局组件
export const rootComponentsGlobal = [
    ActionFied,
    Sparkler
]