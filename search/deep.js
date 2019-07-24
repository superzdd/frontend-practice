// 深度优先 dfs
export function deepSearch(node) {

	let nodes = [];
	nodes.push(node.id);
	if (node.children && node.children.length > 0) {
		for (let child of node.children) {
			nodes = nodes.concat(deepSearch(child))
		}
	}

	return nodes;
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