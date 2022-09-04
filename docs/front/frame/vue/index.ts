const { fs, path } = require('@vuepress/utils');
const basePath = '/front/frame/vue/';
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
export const vueConfig = {
  [basePath]: [
    {
      title: 'vue',
      collapsable: true,
     //   children: ['', '2022-01-15', '2022-05-20', '2022-05-23', '2022-08-10']
      children
    }
  ]
};
