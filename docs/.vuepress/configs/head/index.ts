import type { HeadConfig } from "@vuepress/core";
// 引入统计
const head: HeadConfig[] = [
  [
    "script",
    {
      // async: 'async',
      src: "//i.6v6.work/v/?uid=388634",
    },
  ],
  [
    "script",
    {
      src: "https://hm.baidu.com/hm.js?c7002d193ba43df9317b7fc847709213",
    },
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@docsearch/css@3",
    },
  ],
  ["link", { rel: "icon", href: `/images/n_logo.png` }],
  ["link", { rel: "manifest", href: "/manifest.webmanifest.json" }],
  [
    "script",
    {
      src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3",
    },
  ],
  [
    "meta",
    {
      name: "viewport",
      content:
        "width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  ],
  [
    "meta",
    {
      name: "referrer",
      content: "no-referrer", // 解决外链cdn图片403问题
    },
  ],
  [
    "meta",
    {
      "data-draft-node": "block", // 微信图片未经允许使用问题
      "data-draft-type": "table",
      "data-size": "normal",
      "data-row-style": "normal",
    },
  ],
];
export default head;
