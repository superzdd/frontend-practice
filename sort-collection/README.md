## 排序算法整理
[参考笔记](https://www.cnblogs.com/guoyaohua/p/8600214.html)
笔记提示：
1. a(n) => 数组的第n项
2. a(1)或者a(0) => 数组的第1项
3. a(end) => 数组的末项

### ex es6的原生排序sort
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
关键代码如下
```js
return ret.sort((u1, u2) =>
		u1 < u2 ? -1 : 1
	);
```
**特别注意**
1. sort可以不带任何参数执行，比如`sort()`，会默认从小到大排序。但这其实是将数组内的每一个元素当成字符串去比较，也就是会出现`2>11`这样的情况，所以切记当数组内元素是数字时，不能这么比较。
2. sort方法的处理机制是：返回值<0则不互相交换，返回值>0互相交换。所以官方文档里会出现类似`(u1,u2) => u1 - u2`这样的简写，但是将其替换成`(u1,u2) => u1 < u2`就失效了。至于代码里为何用-1和1，那是为了统一规范

### 冒泡排序
- n从1开始逐渐增加，如果a(n)>a(n+1)，则a(n)和a(n+1)互换，所以当一次完整循环后，会将数组的最大值放在数组末尾
- 第2次循环开始时，轮询的数组长度-1，循环a(2)到a(end-1)， 因为最大值会在上一次循环时放在最后，这次就不必再比较了
- 重复循环，直到第n-1次，或者到某次已经不需要进行任何排序的时候终止
> 时间复杂度 O(n²)
关键代码
```js
var bubbleSort = function(arr) {
	let arr1 = [].concat(arr);
	// 外层循环，比较次数为n-1次
	for (let x = 0; x < arr1.length - 1; x++) {
		let switchFlag = false;
		// 内层循环，比较次数为n-1-x次，因为之前的x次已经把最大的x个数放在了数组最后边，不需要再排序了
		for (let i = 0; i < arr1.length - 1 - x; i++) {
			let i1 = arr1[i];
			let i2 = arr1[i + 1];

			if (i1 > i2) {
				[arr1[i], arr1[i + 1]] = [i2, i1];
				switchFlag = true;
			}
		}

		if (!switchFlag) {
			break;
		}
	}

	return arr1;
}
```

## 选择排序
- n从1开始逐渐增加，找到从a(n)到a(end)中最小的那个数，将其替换到a(n)上来，会将数组的最小值逐渐放在数组开头
- 当第2次循环开始时，轮询的数组长度-1，循环a(2)~a(end)，因为最小值会在上一次循环时放在最前，这次就不必再比较了
- 重复循环，直到第n-1次，或者到某次已经不需要进行任何排序的时候终止
> 时间复杂度 O(n²)
关键代码
```js
var selectionSort = function(arr) {
	let ret = [].concat(arr);
	for (let i = 0; i < ret.length - 1; i++) {
		let min = ret[i];
		let minIndex = i;
		for (let j = i; j < ret.length; j++) {
			let item = ret[j];
			if (item < min) {
				min = item;
				minIndex = j;
			}
		}

		[ret[i], ret[minIndex]] = [ret[minIndex], ret[i]];
	}

	return ret;
}
```