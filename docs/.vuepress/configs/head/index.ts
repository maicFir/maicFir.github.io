
import type { HeadConfig } from "@vuepress/core";
import { seoJS } from './seo';
import { AdJS } from './Ad';
import { baseJS } from './base';
type metaType = "script" | "link" | "meta";

export const mapData = (type: metaType, arr: any[] = []) => {
    if (arr.length === 0) {
        return arr;
    }
    return arr.map(v => [type, v])
}

const head: HeadConfig[] | any[] = [
  [
    "script",
    {
      src: "https://hm.baidu.com/hm.js?c7002d193ba43df9317b7fc847709213", // 百度统计
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
        async: true,
        defer: true
    },
    ],
  
].concat(baseJS(), seoJS(), AdJS());
export default head;
