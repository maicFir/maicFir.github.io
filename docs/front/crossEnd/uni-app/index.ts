
const { fs, path } = require('@vuepress/utils');
const basePath = '/front/crossEnd/uni-app';
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
export const uniConfig = {
  [basePath]: [
    {
      title: 'uni-app',
      collapsable: true,
      children
    }
  ]
};
