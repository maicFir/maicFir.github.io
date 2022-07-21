import type { Theme } from '@vuepress/core';
import { defaultTheme } from '@vuepress/theme-default';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

export const localTheme = (options: DefaultThemeOptions): Theme => {
  return {
    name: 'vuepress-theme-default', // 这里是不是考虑换其他主题，但是换了貌似也没有用，比如vuepress-theme-reco
    extends: defaultTheme(options)
  };
};
