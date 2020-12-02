import axios from 'axios';
import wx from 'jweixin-npm';
const URL =
    'http://diorpstlc.herdsric.com/dior-pst-lacreme/getJsSignatureJson.do';

const WX_SHARE_DATA = {
    title: '分享标题',
    content: '分享内容',
    img: 'http://alicdn.herdsric.com/univadis/univadis-question/imgs/share.png',
    link: window.location.href,
};

export default {
    wxShare: function() {
        axios
            .get(URL, { params: { url: window.location.href } })
            .then(function(res) {
                const data = res.data.data;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                });
                wx.ready(function() {
                    // wx.checkJsApi({
                    //     jsApiList: ['showMenuItems'],
                    //     success: function(res) {
                    //         wx.showMenuItems({
                    //             menuList: [
                    //                 'menuItem:share:appMessage', //发送给朋友
                    //                 'menuItem:share:timeline', //分享到朋友圈
                    //             ],
                    //         });
                    //     },
                    // });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: WX_SHARE_DATA.title, // 分享标题
                        desc: WX_SHARE_DATA.content, //分享描述
                        link: WX_SHARE_DATA.link, // 分享链接
                        imgUrl: WX_SHARE_DATA.img, // 分享图标
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: WX_SHARE_DATA.title, // 分享标题
                        desc: WX_SHARE_DATA.content, //分享描述
                        link: WX_SHARE_DATA.link, // 分享链接
                        imgUrl: WX_SHARE_DATA.img, // 分享图标
                    });
                });
            });
    },
};
