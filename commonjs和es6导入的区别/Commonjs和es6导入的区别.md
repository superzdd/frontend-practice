# Commonjs和es6导入导出的区别
> 在写代码时，经常需要写一个类封装。但每当写到最后需要`exports`的时候，都会去看一下其他的类之前是怎么写的。什么一会`export`,一会`exports.default`，有一会`export default`，总之就是很混乱。引入的时候也比较乱，一会用`import`，一会又用`require`，总是没时间好好整理。
> 其实整理清楚了并不难，其实就是两种规范导致的，一种是CommonJS规范，另一种是es6的规范


### CommonJS(Common2js)
#### 关键字

module exports require

#### 相关链接
[CommonJS规范-阮一峰](https://javascript.ruanyifeng.com/nodejs/module.html)
[CommonJS官网](http://www.commonjs.org/specs/modules/1.0/)

#### 心得
1. 我们用的CommonJS实际上是Common2JS，其区别是：只有Common2JS才有`module.exports`，CommonJS只有`exports`
2. 只用`module.exports`,不要用`exports`,以避免因为`exports = () => {}`,导致`module.exports`对象仍然为空的情况发生

#### 代码
```js
//example.js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

// main.js
var b = require('example').x; // 单独调用example.x
var exp = require('example'); // 完整调用example
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

// module.exports.env = _default;

// es6
// 关键字 import export
// export default _default; // 
/**
 * 这句话在babel编译后，会变成=> exports.default = _default
 * 关键代码如下：
 * "use strict";
 * 
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = _default; 
 */