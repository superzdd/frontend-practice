# visibilitychange
`visibilitychange`用于处理页面失去焦点的场景。

最实用的场景就是微信小程序通过webview加载H5，然后点击右上角关闭小程序时，小程序里的H5没法自动关闭音乐。这种场景下可以用visibilitychange来解决.

其他使用到的场景，目前为止大多是淘系APP中的页面跳转（比如淘宝和速卖通），淘系APP的页面跳转(`window.location.href`)在某种程度上，更像是浏览器里新增了一个页面标签，然后把这个新增的页面盖在了原来的页面上，所以也需要通过`visibilitychange`来监听事件进行一些业务处理。

示意代码如下：
```js
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
	console.log('=== visibilitychange visible');
	// do sth: 比如播放音乐
  } else {
	console.log('=== visibilitychange hidden');
	// do sth: 比如暂停音乐
  }
});
```