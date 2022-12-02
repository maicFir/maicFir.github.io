import { mapData } from './index';
export const baseJS = () => {
    const metaBase = [
        {
            name: 'viewport',
            content: 'width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
            name: "baidu-site-verification",
            content: "code-7MXIa3E0cz"
        },
        {
            name: "referrer",
            content: "no-referrer" // 解决外链cdn图片403问题
        },
        {
            "data-draft-node": "block", // 微信图片未经允许使用问题
            "data-draft-type": "table",
            "data-size": "normal",
            "data-row-style": "normal",
        }
    ];
    return mapData("meta", metaBase);
}