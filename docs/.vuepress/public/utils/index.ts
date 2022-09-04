// const { fs, path } = require('@vuepress/utils');
export const isMobile = () => {
    let isMobile = false;
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile)/i)) {
        isMobile = true;
    }
    return isMobile
}
// 便利当前文件，获取当前文件名
// export function getCurrentFileName({basePath, dirname, current}) {
//     return fs
//         .readdirSync(path.resolve(dirname, current))
//         .filter(filename => filename.indexOf('.md') >= 0)
//         .map(filename => {
//             filename = filename.slice(0, -3)
//             if (filename.indexOf('README') >= 0) {
//                 filename = basePath
//             }
//             return filename
//         })
//         .sort()
// }