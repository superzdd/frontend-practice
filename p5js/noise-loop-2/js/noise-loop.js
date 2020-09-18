/**
 * 循环噪音，基于p5.js的noise方法
 * @param {Object} scale 代表噪音的最大值
 */
let noiseLoop = function(scale) {
	this.scale = scale;
	this.initDeg = Math.floor(Math.random() * 1000);
	// console.log(this.initDeg);
}

noiseLoop.prototype = {
	getValue: function(degree, scaleMore = 1) {
		// 将角度缩小到360度以内
		// let d = Math.PI * degree / 180;
		// return noise(Math.sin(d) + this.initDeg) * this.scale;
		let total_degree = 20;
		let d = degree % total_degree;
		if (d > total_degree / 2) {
			d = total_degree - d;
		}
		// return noise(d + this.initDeg) * this.scale * scaleMore;
		
		let scale = this.scale*scaleMore;
		return noiseMap(noise(d + this.initDeg), - 1 * scale, scale);
	}
};


let nlPoint = function(dia, bx, by) {
	this.dia = dia;
	this.bornX = bx;
	this.bornY = by;
	this.x = new noiseLoop(dia);
	this.y = new noiseLoop(dia);
	this.diaNoise = new noiseLoop(dia);

	this.color = {
		r: 255,
		g: 255,
		b: 255,
		a: 1,
	}
}

nlPoint.prototype = {
	getColor: function() {
		let {
			r,
			g,
			b,
			a
		} = this.color;
		let str = `rgba(${r},${g},${b},${a})`;
		return str;
	},
	getPos: function(degree) {
		// return {
		// 	x: this.x.getValue(degree) + this.bornX,
		// 	y: this.y.getValue(degree) + this.bornY,
		// }
		return {
			x: this.bornX,
			y: this.bornY,
		}
	},
	getDia: function(degree) {
		// return this.diaNoise.getValue(degree) + this.dia;
		return this.dia;
	}
}

let noiseMap = function(noise, min, max) {
	if (noise > 1) {
		throw `noise map error: noise bigger than 1, is: ${noise}`;
	}
	return min + noise * (max - min);
}
