
import { mapData } from './index';
export const AdJS = () => {
    // 易统计
    const ytj = [
        {
            src: "//i.6v6.work/v/?uid=388730",
            async: true,
            defer: true
        }
    ];
    // 汇米
    const hmad = [
        {
            src: "//pc.stgowan.com/pc/rich-tf.js",
            data: "s=7737",
            id: "richid"
        },
        {
            src: "//pc.stgowan.com/pc_w/m_rich.js",
            data: "s=7737",
            id: "richdata",
            charset: "utf-8"
        }
    ]
    const result = [ ...ytj, ...hmad]
    return mapData("script", result);
}

