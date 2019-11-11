# 本例实际演示了一下`ctx.save`(以下简称`save`)和`ctx.restore`(以下简称`restore`)的两个函数的用法和作用

1. `save`和`restore`的使用场景
典型的使用场景是这样的，比如一张canvas画布里，我们放了两张图片，其中第一张要旋转，另一张不旋转，这时应该怎么办？
> 以下将矩形代替图片举例：

找遍canvas的api,也没有找到可以旋转单张图片的方法。但是，canvas画布本身是可以旋转的，通过`rotate`方法：
```js
var ctx = document.getElementById('canvas').getContext('2d');
ctx.rotate(45 * Math.PI / 180); // 顺时针旋转45度
```
这样就造成一个问题，因为现在画布整个已经旋转45度了，如果现在再放一张图片上去，那第二张图片也会被旋转45度。为了让第二张图片不旋转，我们需要让图片反向旋转45度：
```js
var ctx = document.getElementById('canvas').getContext('2d');
// 第一张图片
ctx.rotate(45 * Math.PI / 180);
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);

// 第二张图片
ctx.rotate(-45 * Math.PI / 180);
ctx.fillRect(150, 75, 100, 100);
```
这样，上面的`-45`就造成了代码的耦合，不仅旋转需要复位，还有很多其他状态都会影响下一个图片的制作:[mdn参考链接](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save)
所以canvas现在提供了一对`save`,`restore`方法，用来记录和加载canvas的状态。比如，上面的代码可以修改成这样：
```js
ctx.fillStyle = "green";
ctx.save(); // 记录当前状态，比如上面的涂色为绿色
// 第一张图片
ctx.rotate(45 * Math.PI / 180);
ctx.fillRect(10, 10, 100, 100);

// 加载上一个save的状态，旋转恢复，涂色仍然为绿色
// 第二张图片
ctx.restore();
ctx.fillRect(150, 75, 100, 100);
```