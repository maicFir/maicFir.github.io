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
      content: 'no-referrer'
    }
  ],
  [
    'meta',
    {
      'data-draft-node': 'block',
      'data-draft-type': 'table',
      'data-size': 'normal',
      'data-row-style': 'normal'
    }
  ]
];

export default head;
