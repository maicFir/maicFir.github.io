
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
// 解决require is undefined
import requireTransform from 'vite-plugin-require-transform';
const { path } = require('@vuepress/utils');



export default defineUserConfig({
  bundler: viteBundler({
      viteOptions: {
          resolve: {
              alias: {
                '@component': path.resolve(__dirname, '../../components'),
                '@public': path.resolve(__dirname, '../../public'),
                '@configs': path.resolve(__dirname, '../../configs')
              },
          },
          // 解决Must use import to load ES Module 打包问题
          ssr: {
            noExternal: ['@moefy-canvas/theme-popper']
          }
    },
      vuePluginOptions: {},
      plugins: [
        requireTransform({
            fileRegex:/.ts$|.tsx$|.vue$/
          }),
      ],
  }),
   
})