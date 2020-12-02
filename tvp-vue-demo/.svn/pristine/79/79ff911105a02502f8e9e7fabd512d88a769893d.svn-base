/**
 * 统一的统计方法，同时调用谷歌统计，百度统计
 * @param {string} action 事件名称
 * @param {string} label 事件的一些详细信息，通常可以是按钮，页面ID
 * @param {object=} opt 选项配置
 * @param {string=} opt.category：分类，默认值位'general'，一般不用传。如果项目需要区分渠道信息，可以将渠道名给这个字段
 * @param {number=} opt.value：事件价值，非负整数
 * @param {boolean=} opt.g: 是否要提交谷歌统计，默认为true
 * @param {boolean=} opt.b: 是否要提交百度统计，默认为true
 */
let statisticsAll = function(action, label, opt = null) {
    let option = {
        category: 'general',
        value: null,
        g: true,
        b: true,
    };

    /**
     * 百度统计，用于封装百度统计的参数
     * _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
     * category：要监控的目标的类型名称，通常是同一组目标的名字，比如”视频”、”音乐”、”软件”、”游戏”等等。该项必选。
     * action：用户跟目标交互的行为，如”播放”、”暂停”、”下载”等等。该项必选。
     * opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
     * opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
     */
    let hmtPush = function(category, action, label, value) {
        window._hmt.push(['_trackEvent', category, action, label, value]);
    };

    /**
     * 谷歌统计，用于封装谷歌统计的参数
     */
    let gaStatistics = function(category, action, label, value) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    };

    Object.assign(option, opt);

    if (option.b) {
        hmtPush(option.category, action, label, option.value);
    }

    if (option.g) {
        gaStatistics(option.category, action, label, option.value);
    }
};

export default statisticsAll;
