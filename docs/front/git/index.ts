const { fs, path } = require('@vuepress/utils');
const basePath = '/front/git/';
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
export const gitConfig = {
  [basePath]: [
    {
      title: 'git',
      collapsable: true,
    //   children: [`${basePath}`, '2022-07-25', '2022-07-28']
    children
    }
  ]
};
