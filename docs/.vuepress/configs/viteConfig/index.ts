import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
const { path } = require('@vuepress/utils');

export default defineUserConfig({
  bundler: viteBundler({
      viteOptions: {
          resolve: {
              alias: {
                '@component': path.resolve(__dirname, '../../components'),
                '@public': path.resolve(__dirname, '../../public'),
                '@configs': path.resolve(__dirname, '../../configs')
            }
        }
    },
    vuePluginOptions: {},
  }),
})