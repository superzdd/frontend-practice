var arr = ['b1', 'b3', 'a1', 'a4', 'c4', 'c', 'a', 'b', 'b2', 'c1', 'c2'];
var arr1 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

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

console.log(bubbleSort(arr));
console.log(bubbleSort(arr1));
