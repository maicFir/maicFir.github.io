
// const path = require('path');
// console.log(path.resolve(__dirname), 'dirname')
const webpackConfig = {
  configureWebpack: (config, isServer) => {

  },
  chainWebpack: (config, isServer) => {
    // config.resolve.alias
    //   .set('@vuepress', '../../../.vuepress')
    //   .set('@front', '../../../front')
  }
}
export default webpackConfig