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
			if (ret[j] > unit) {
				findIndex = j;
				break;
			}
		}
		ret.splice(findIndex, 0, unit);
	}

	return ret;
}

var shellSort = function(arr) {
	const step = 2;
	let ret = [].concat(arr);
	let gap = Math.floor(ret.length / step); // 子数组取值两个数之间的间隔，前后两个数间隔为1，比如数组[a,b],a和b的间隔为1
	const len = ret.length;
	while (gap >= 1) {
		console.log(`gap is ${gap}`);
		for (let i = 0; i < Math.ceil(len / gap); i++) {
			let childArr = [];
			let childIndexArr = [];
			for (let j = i; j < Math.min(len, gap); j + gap) {
				childIndexArr.push(j);
				childArr.push(ret[j]);
			}
			childArr = insertionSort(childArr);

			for (let j = 0; j < childArr.length; j++) {
				ret[childIndexArr[j]] = childArr[j];
			}

			console.log(`shell: gap is ${gap}, array is ${JSON.stringify(ret)}`);
		}

		gap = Math.floor(gap / step);
	}

	return ret;
}
