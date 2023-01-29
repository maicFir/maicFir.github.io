
import { ResolvedSidebarItem } from '@vuepress/theme-default';
import { cssConfig, jsConfig, vueConfig, reactConfig, leetCodeConfig, nodeConfig, tsConfig, webpackConfig, gitConfig, uniConfig } from '../../../front';

// 这样配置会导致首页也有左侧菜单栏
// export const sidebar: Array<SidebarItem4Group> = [
//   {
//     title: 'js',
//     collapsable: false,
//     sidebarDepth: 3,
//     children: [
//       {
//         title: '基础',
//         children: [
//           {
//             title: '你不知道的循环中断',
//             sidebarDepth: 3,
//             path: '/front/js/2022-02-18'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     title: '框架',
//     collapsable: false,
//     sidebarDepth: 3,
//     children: [
//       {
//         title: 'vue',
//         children: [
//           {
//             title: '组合式API最佳实践',
//             sidebarDepth: 3,
//             path: '/front/frame/vue/2022-01-15'
//           }
//         ]
//       },
//       {
//         title: 'react',
//         children: [
//           {
//             title: '重学react',
//             path: '/react/'
//           }
//         ]
//       }
//     ]
//   }
// ];

interface slideBarType {
  [name: string]: ResolvedSidebarItem;
}
export const sidebar: any = {
  ...jsConfig,
  ...vueConfig,
  ...leetCodeConfig,
  ...nodeConfig,
  ...reactConfig,
  ...tsConfig,
  ...webpackConfig,
  ...cssConfig,
  ...gitConfig,
  ...uniConfig
};
