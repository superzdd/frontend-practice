# 安卓android手机H5动画使用scale导致图片模糊的解决方案
## 故事背景
有个H5项目，需要页面上元素实现一个简化版放烟花的效果，实际上就是把一张烟花散开的图片从小放大循环播放，也就是scale(0)->scale(1)。

在实际开发过程中，IOS系统的手机表现正常，但是android系统的手机出现了问题：*烟花散开的图片非常糊*。原本以为是图片清晰度导致的，结果换了高清一倍的图片后，android上依然很糊。

随即在网上查找了相关问题，发现有用`translateZ`来解决的，实际尝试下来确实有效，虽然还不知道translateZ能解决问题的原因是什么。以下为关键代码：


```html
<div>
	<img src="fireworks1.png"/>
</div>
```

```css
div {
	perspective: 100px;
}

img {
    transform: translateZ(1px) scale(0);
    animation: fire1 2s ease infinite;
}

@keyframes fire1 {
    0% {
        transform: translateZ(1px) scale(0);
    }

    100% {
        transform: translateZ(1px) scale(1);
    }
}
```

### 注意
上述代码中`perspective: 100px`和`transform: translateZ(1px)`这两个值（100和1）是经过简单试验得到的经验值，这两个值基本能保证和原始效果一致。但凡需要修改这两个值，一定要检查是否和原始动画效果一致。
> 100和1应该是满足100:1的关系，简单测试了200:2,1000:10的情况，与100:1的结果一致。