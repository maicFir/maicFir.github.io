import { HeadTags } from '@vuepress/types';
const head: HeadTags = [
  ['link', { rel: 'icon', href: `/images/logo.png` }],
  ['link', { rel: 'manifest', href: '/manifest.json' }],
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
  ]
];

export default head;
