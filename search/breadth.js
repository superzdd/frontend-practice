// 广度优先算法 bfs
export function breadthSearch(node) {

	let cache = [];
	let nodes = [];

	cache.push(node);

	while (cache.length > 0) {
		let n = cache[0];
		cache = cache.slice(1);
		nodes.push(n.id);

		if (n.children && n.children.length > 0) {
			for (let child of n.children) {
				cache.push(child);
			}
		}
	}

	return nodes;
}

// console.log(JSON.stringify(breadthSearch()));
