# 获取整个页面的滚动条高度
一般情况下，用`scrollTop`即可获取获取滚动条高度，但是IOS部分机型会有获取不到的情况(主要是iphone6及以下，`scrollTop`永远为0)，这时就需要`window.pageYOffset`辅助配合，实测有效

```js
// 获取整个页面的滚动条高度，兼容IOS6及以下
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;

// window.pageYOffset 和 window.scrollY 相同
window.pageYOffset == window.scrollY; // 总是 true
```