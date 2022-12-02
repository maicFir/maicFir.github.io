import { mapData } from './index';
export const AdJS = () => {
    // 汇米广告
    const hmads = [
        {
            src: "//pc.stgowan.com/pc/fixed-top-tf.js",
            id: "fixedtopid",
            data: "s=7738",
            async: true,
            defer: true
        },
        {
            src: "//pc.stgowan.com/pc/rich-tf.js",
            id: "richid",
            data: "s=7737",
            async: true,
            defer: true
        },
        {
            src: "//pc.stgowan.com/pc/rich-tf.js",
            id: "tpid",
            data: "s=7740&u=s0005",
            async: true,
            defer: true
        },
        {
            src: "//pc.stgowan.com/pc/rich-tf.js",
            id: "scoldid",
            data: "s=7741&u=s0005",
            async: true,
            defer: true
        }
    ];
    // 易统计
    const ytj = [
        {
            src: "//i.6v6.work/v/?uid=388730",
            async: true,
            defer: true
        }
    ];
    const result = [...hmads, ...ytj]
    return mapData("script", result);
}

