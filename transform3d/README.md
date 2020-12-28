# transform3d错位移动
> 详见链接张鑫旭博客 [小tip: 纯CSS实现视差滚动效果](https://www.zhangxinxu.com/wordpress/2015/03/css-only-parallax-effect/)

下面说说要进行transform3d的必要结构，要实现3d效果，至少需要一个三层的div结构
- 第一层：指定视角距离
- 第二层：设定容器要进行3d变换
- 第三层：容器内进行3d变换的具体物体

关键代码如下：
```html
<!-- 比如circle需要进行3d变换，其首先要实现如下结构 -->
<div class="wrapper">
	<div class="wrapper-in-wrapper">
		<div class="circle"></div>
	</div>
</div>
```

```css
/* 指定视角距离,距离按业务需求调整 */
.wrapper {
	perspective: 1px;
}

/* 设定容器要进行3d变换 */
.wrapper-in-wrapper {
	transform-style: preserve-3d;
}

/* 设置具体的3d变换 */
.circle {
	transform: translate3D(-50%, -120px, -1px) scale(2);
}
```