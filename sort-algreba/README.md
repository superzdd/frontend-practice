## 排序算法整理

### 冒泡排序
> 时间复杂度 O(n²)
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