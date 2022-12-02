import { mapData } from './index';
export const seoJS = () => {
    const metaArr = [
        {
            name: "keywords",
            content: "Web技术学苑,Maic,前端开发,webpack,rollup,工程化,javaScript,es6,typeScript,vue2,vue3,react,git"
        },
        {
            name: "description",
            content: "公众号:Web技术学苑,专注前端技术,分享web技术,工程化,webpack,前端"
        },
        {
            name: "Author",
            content: "Maic"
        }
    ]
    return mapData('meta', metaArr)
}