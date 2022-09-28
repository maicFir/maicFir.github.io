const basePath = "/front/js/";

const { fs, path } = require('@vuepress/utils');
function getCurrentFileName(basePath) {
    return fs
        .readdirSync(path.resolve(__dirname, './'))
        .filter(filename => filename.indexOf('.md') >= 0)
        .map(filename => {
            filename = filename.slice(0, -3)
            if (filename.indexOf('README') >= 0) {
                filename = basePath
            }
            return filename
        })
        .sort()
}
// 按照文件名后缀进行分类
const ret = ['base', 'advance'].map(key => {
    const sourceData = getCurrentFileName(basePath)
    let len = sourceData.length;
    let i = 0;
    const baseArr: string[] = [];
    const advanceArr: string[] = [];
    while (i < len) {
        if (sourceData[i].endsWith(key)) {
            key === 'base' ?  baseArr.push(sourceData[i]) : advanceArr.push(sourceData[i])
        }
        i++
    }
    return {baseArr, advanceArr}
})

const [base, advance] = ret
export const jsConfig = {
  [basePath]: [
    {
      title: "JS基础",
      collapsable: true,
      children: [`${basePath}`,...base.baseArr],
    },
    {
      title: "JS进阶",
      collapsable: true,
      children: [`${basePath}Advance`, ...advance.advanceArr],
    },
  ],
};
