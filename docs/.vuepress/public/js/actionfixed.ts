
interface rightBarItem {
  title: string;
  desc: string;
  imgUrl: string;
}
export type RIGHT_BAR = {
  pcslides: Array<rightBarItem>;
};

export const globalActionConfig:RIGHT_BAR  = {
  pcslides: [
    {
      title: '扫二维码，关注公众号',
      desc: '专注前端技术，分享web技术',
      imgUrl: '/images/code3.png'
    },

    {
      title: '加作者微信',
      desc: '扫二维码 备注 【加群】',
      imgUrl: '/images/WechatIMG4.jpeg'
    },
    {
        title: '教你聊天恋爱，助力脱单',
        desc: '微信扫小程序二维码，助你寻他/她',
        imgUrl: '/images/xcode.jpg'
        },
    {
        title: "专注前端技术，分享Web技术",
        desc: "微信扫小程序二维码，一起学习，一起进步",
        imgUrl: '/images/code4.jpg'
   },
    {
        title: "前端面试大全",
        desc: "海量前端面试经典题，助力前端面试",
        imgUrl: '/images/code5.png'
    }
  ]
};
