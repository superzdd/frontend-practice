// 深度优先 dfs
export function deepSearch(obj) {
	let _obj = {};

	if (typeof obj != "object") {
		_obj = obj;
		return _obj
	}

	if (Array.isArray(obj)) {
		_obj = [];
	}
	
	for (let p in obj) {
		_obj[p] = deepSearch(obj[p])
	}
	return _obj;
}

export function deepSearchLoop(node) {
	let cache = [];
	let nodes = [];
	cache.push(node);
	while (cache.length > 0) {
		let n = cache.pop();
		nodes.push(n.id);
		if (n.children && n.children.length > 0) {
			for (let i = n.children.length - 1; i >= 0; i--) {
				cache.push(n.children[i]);
			}
		}
	}

	return nodes;
}

// console.log(JSON.stringify(deepSearch(node)));
// console.log(JSON.stringify(deepSearchLoop(node)));
