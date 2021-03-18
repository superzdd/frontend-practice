# 网页链接直接跳转微信小程序的方法
目前微信官方已经支持从HTML5里跳转微信小程序了，官方文档[传送门](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#21)，
但上面这个流程仅限于在微信H5环境里跳转过去的场景，如果换成其他环境里，体验会有所区别，比如：如果是在PC端打开页面，无论如何都不可能进到手机APP里，更别提小程序了；又或者在手机浏览器里打开，需要先唤起微信，再打开小程序。

以下主要说明在几个场景中，分别是通过什么方式去跳转微信小程序的。

## 一. 手机微信H5环境
在手机微信H5环境里，靠的就是官方提供的`wx-open-launch-weapp`进行跳转
```html
<wx-open-launch-weapp id="launch-btn" username="gh_4ca7e2df31eb" path="/pages/index/index">
    <template>
        <img style="width: 77.96vw; height: 13.07vw; display: block; margin: 0 auto;" src="base64" >
    </template>
</wx-open-launch-weapp>
```

### 总结：
1. 跳转的小程序需要知道其*原始ID*和*PATH路径*。重要的事情说三遍
- 是**原始ID**，不是APPID；
- 是**原始ID**，不是APPID；
- 是**原始ID**，不是APPID；



2. PATH是不是需要以'/'开头，目前还不确定。我们在实际项目中是带'/'的，但是官方demo是不带的
3. 必须调用微信分享接口后才可使用，如果接口未执行或执行失败，连按钮都不会出现
```js
$.ajax({
	url: URL,
	data: {
		url: codeUrl
	},
	success: function(res) {
		var data = res;
		wx.config({
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: appid, // 必填，公众号的唯一标识
			timestamp: data.timeStamp, // 必填，生成签名的时间戳
			nonceStr: data.noncestr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: ['chooseImage'], // 安卓上必填一个，随机即可
			openTagList: ['wx-open-launch-weapp'], // 关键代码，填入打开小程序的开放标签名
		});
	}
})
```

## 二. 手机浏览器环境，非微信
在微信之外的手机浏览器中，将直接发起跳转提醒，用户点击后可以直接跳转
```js
var appLink = "weixin://dl/business/?t=aHWwisXtSYs"; // 小程序跳转链接，用于移动端浏览器（非微信环境）
location.href = appLink;
```
### 总结
1. 手机的原生浏览器是一定可以跳转的，但是第三方浏览器没有测试过
2. 发生跳转后，会先从浏览器跳转到微信，再通过微信打开小程序
3. 跳转链接是后台调用微信官方接口后获得的，具体获得方式不祥。但是只要小程序所属公众号通过第三方开放平台授权，即使是第三方开放平台也是能获取到跳转链接的


## 三. PC浏览器环境
在pc浏览器环境里是没法跳转微信小程序的，这是弹出提示就可以
```html
<div id="desktop-web-container" class="hidden">
	<p class="">请在手机打开网页链接</p>
</div>
```

## 四. 判断当前环境是微信？手机浏览器？PC浏览器？
通过`userAgent`来判断
```js
var ua = navigator.userAgent.toLowerCase()
var isWXWork = ua.match(/wxwork/i) == 'wxwork'
var isWeixin = !isWXWork && ua.match(/MicroMessenger/i) == 'micromessenger'
var isMobile = false
var isDesktop = false
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i)) {
	isMobile = true
} else {
	isDesktop = true
}
```
环境判断还推荐去看之前写过的env.js[传送门](https://superzdd.github.io/frontend-practice/env/env.js)，那里虽然没有微信，但是其他方面比较详细。