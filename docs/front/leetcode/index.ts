const { fs, path } = require('@vuepress/utils');
const basePath = '/front/leetcode/';
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
const children = getCurrentFileName(basePath);
export const leetCodeConfig = {
  [basePath]: [
    {
      title: 'leetcode',
      collapsable: true,
    //   children: [`${basePath}`, '2022-04-17', '2022-05-03', '2022-05-17', '2022-05-27', '2022-05-29']
      children
    }
  ]
};
