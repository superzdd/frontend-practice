# 调用函数，自动累加
> 来源 [第 38 题：（京东）下面代码中 a 在什么情况下会打印 1？](https://juejin.im/post/5d23e750f265da1b855c7bbe)
1. 关键在于`==`运算会将等号两边转换成相同的对象之后再进行比较，所以我想到了`==`发生时，会不会先调用了一下`toString`方法，没想到成功了
2. 参考[比较操作符
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)中的例子
```js
1   ==  1     // true
"1"  ==  1     // true
 1   == '1'    // true
 0   == false  // true
```

最终实现如下
```js
var a = {
	value: 0,
	toString:function(){
		return ++this.value;
	}
}
if(a == 1 && a == 2 && a == 3){
	console.log(1);
}
```
PS: a中的`value`叫其他的名字也可以，没有强行的规定。比如改成`v`,那同时在`toString`中改成`this.v`即可