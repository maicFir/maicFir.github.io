const { fs, path } = require('@vuepress/utils');
const basePath = '/front/webpack/';
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

// const children = [
//   `${basePath}`,
//   '2022-06-03',
//   '2022-06-05',
//   '2022-06-07',
//   '2022-06-10',
//   '2022-06-14',
//   '2022-06-15',
//   '2022-06-21',
//   '2022-06-24',
//   '2022-06-29',
//   '2022-07-03',
//   '2022-07-05',
//   '2022-07-06',
//   '2022-07-10',
//   '2022-08-06'
// ];
export const webpackConfig = {
  [basePath]: [
    {
      title: 'webpack',
      collapsable: true,
      children
    }
  ]
};
