# 搞懂aspect-ratio

> aspect-ratio实在不好理解，光`min`和`max`到底和大于小于是什么对应关系，每次都要整理半天，所以这次记一下笔记
- aspect-ratio是宽高比：width/height
- min-aspect-ratio是下限，如`min-aspect-ratio: 0.5`,指宽高比大于0.5的手机，偏向于小屏手机，宽屏手机
- max-aspect-ratio是上限，如`max-aspect-ratio: 0.5`,指宽高比小于0.5的手机，偏向于2020年之后出的全面屏手机，往往高度更长。
- 小屏手机(iphone8，iphone SE2，小米6之类)一般使用的9:16(0.56)的屏幕，一般aspect-ratio在0.65左右(浏览器会有标题和底部菜单，使页面高度变低)

### 上代码
```css
/* 宽高比从0.5~0.7的区间的手机 */
@media screen and (min-aspect-ratio: 0.5) and (max-aspect-ratio: 0.7){}

/* 小屏手机 */
@media screen and (min-aspect-ratio: 0.65){}
```