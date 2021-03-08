/**
 * es6 的 sort方法进行排序
 * @param {Array} arr 待排序数组
 */
var standardSort = function(arr) {
	let ret = [].concat(arr);

	// 注意：用原始的sort()是不行的，这个sort()会把数组当中的数字当做字符串比较，也就是2会大于11

	return ret.sort((u1, u2) =>
		u1 < u2 ? -1 : 1
	);
}

var bubbleSort = function(arr) {
	let arr1 = [].concat(arr);
	for (let x = 0; x < arr1.length - 1; x++) {
		let switchFlag = false;
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

var insertionSort = function(arr) {
	let ret = [];

	for (let i = 0; i < arr.length; i++) {
		let unit = arr[i];
		let findIndex = ret.length;
		for (let j = 0; j < ret.length; j++) {
			if (unit < ret[j]) {
				findIndex = j;
				break;
			}
		}
		ret.splice(findIndex, 0, unit);
	}

	return ret;
}

var insertionSortV2 = function(arr) {
	let ret = [].concat(arr);

	for (let i = 1; i < ret.length; i++) {
		let unit = ret[i];
		for (let j = 0; j < i; j++) {
			// 找到unit插入的位置
			if (unit < ret[j]) {
				ret.splice(j, 0, unit);
				ret.splice(i + 1, 1);
				break;
			}
		}

		// console.log(`insertion: i = ${i}, array: ${JSON.stringify(ret)}`);
	}

	return ret;
}

var shellSort = function(arr) {
	const step = 2;
	let ret = [].concat(arr);
	let gap = Math.floor(ret.length / step); // 子数组取值两个数之间的间隔，前后两个数间隔为1，比如数组[a,b],a和b的间隔为1
	const len = ret.length;
	while (gap >= 1) {
		console.log(`shell: gap 为 ${gap} 排序开始`);
		for (let i = 0; i < Math.min(len, gap); i++) {
			let childArr = [];
			let childIndexArr = [];
			for (let j = i; j < len; j += gap) {
				childIndexArr.push(j);
				childArr.push(ret[j]);
			}

			console.log(`shell: gap is ${gap}, array${i+1} 准备排序：${JSON.stringify(childArr)}`);
			childArr = insertionSort(childArr);
			console.log(`shell: gap is ${gap}, array${i+1} 排序完成：${JSON.stringify(childArr)}`);

			for (let j = 0; j < childArr.length; j++) {
				ret[childIndexArr[j]] = childArr[j];
			}
		}

		console.log(`shell: gap 为 ${gap} 排序完成, 当前数组：${JSON.stringify(ret)}`);

		gap = Math.floor(gap / step);
	}

	return ret;
}

var shellSortV2 = function(arr) {
	const step = 2; // 希尔排序的固定步长，用于缩小gap
	let ret = [].concat(arr);
	const len = ret.length; // 获取数组的长度

	// 初始化gap，子数组取值两个数之间的间隔。前后两个数间隔为1，比如数组[a,b]中,a和b的间隔为1。
	// 在希尔排序中，每次循环之后，gap都会缩小一级，即gap = gap/step
	let gap = Math.floor(ret.length / step);

	while (gap >= 1) {
		console.log(`shell: gap 为 ${gap} 排序开始`);

		for (let i = gap; i < len; i++) {
			let unit = ret[i];
			console.log(`=== shell: gap = ${gap}, i = ${i}`);
			// 每个unit都和它之前的所有gap间隔的数组进行比对，如果小于那个值，就要互换位置
			let j = i;
			while (j >= gap) {
				if (ret[j - gap] > ret[j]) {
					console.log(`=== shell: gap = ${gap}, i = ${i},交换 ${ret[j - gap]}, ${ret[j]}`);
					[ret[j - gap], ret[j]] = [ret[j], ret[j - gap]];
				}
				j -= gap;
			}
			console.log(`=== shell: gap = ${gap}, i = ${i}, 交换结果：${JSON.stringify(ret)}`);
		}

		console.log(`shell: gap 为 ${gap} 排序完成, 当前数组：${JSON.stringify(ret)}`);

		gap = Math.floor(gap / step);
	}

	return ret;
}


var mergeSort = function(arr) {
	if (arr.length > 2) {
		const cutLength = Math.ceil(arr.length / 2);
		let arr1 = arr.slice(0, cutLength);
		let arr2 = arr.slice(cutLength);

		arr1 = mergeSort(arr1);
		arr2 = mergeSort(arr2);
	}

	mergeSort()
}
