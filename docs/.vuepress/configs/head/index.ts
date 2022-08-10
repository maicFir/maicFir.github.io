/*
 * @Author: maicFir mcodes@163.com
 * @Date: 2022-07-21 17:53:48
 * @LastEditors: maicFir mcodes@163.com
 * @LastEditTime: 2022-08-04 10:28:06
 * @FilePath: /maicFir.github.io/docs/.vuepress/configs/head/index.ts
 * @Description: 
 */
import type { HeadConfig } from '@vuepress/core';
const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: `/images/n_logo.png` }],
  ['link', { rel: 'manifest', href: '/manifest.webmanifest.json' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }
  ],
  [
    'meta',
    {
      name: 'referrer',
      content: 'no-referrer' // 解决外链cdn图片403问题
    }
  ],
  [
    'meta',
    {
      'data-draft-node': 'block', // 微信图片未经允许使用问题
      'data-draft-type': 'table',
      'data-size': 'normal',
      'data-row-style': 'normal'
    }
  ]
];

export default head;
