/*
 * @LineStart: -------------------------------------------
 * @Copyright: © 2022, Web技术学苑. All rights reserved
 * @LineEnd: -------------------------------------------
 * @Author: maicFir 
 * @Date: 2022-08-15 23:03:42
 * @LastEditors: maicFir 
 * @LastEditTime: 2023-01-29 14:38:59
 * @Description: 
 */
// 引入自定义注册全局组件
import ActionFied from "./ActionFied";
// import Sparkler from "./Sparkler";
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
    // Sparkler
]