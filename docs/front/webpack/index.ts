const basePath = '/front/webpack/';
const children = [
  '',
  '2022-06-03',
  '2022-06-05',
  '2022-06-07',
  '2022-06-10',
  '2022-06-14',
  '2022-06-15',
  '2022-06-21',
  '2022-06-24',
  '2022-06-29',
  '2022-07-03',
  '2022-07-05',
  '2022-07-06',
  '2022-07-10'
];
export const webpackConfig = {
  [basePath]: [
    {
      title: 'webpack',
      collapsable: true,
      children
    }
  ]
};
