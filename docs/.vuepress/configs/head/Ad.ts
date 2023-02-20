/*
 * @LineStart: -------------------------------------------
 * @Copyright: © 2022, Web技术学苑. All rights reserved
 * @LineEnd: -------------------------------------------
 * @Author: maicFir
 * @Date: 2022-12-01 19:17:00
 * @LastEditors: maicFir
 * @LastEditTime: 2023-02-10 18:54:49
 * @Description: 
 */


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
        // {
        //     src: "//pc.stgowan.com/pc/rich-tf.js",
        //     id: "richdata",
        //     data: "s=7737",
        // },
        {
            src: "https://www.slutcmail.com:31267/slot?8836717831084845850-10135" // 胜利联盟
        },
        {
            src: "https://smtlm967.com/slot?2074847283501657340-10766" // 水蜜桃
        }
    ];
    const smt = [
       
    ]

    const result = [ ...ytj, ...hmad, ...smt]
    return mapData("script", result);
}

