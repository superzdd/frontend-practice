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
	getValue: function(degree) {
		// 将角度缩小到360度以内
		// let d = Math.PI * degree / 180;
		// return noise(Math.sin(d) + this.initDeg) * this.scale;
		let total_degree = 20;
		let d = degree % total_degree;
		if (d > total_degree / 2) {
			d = total_degree - d;
		}
		return noise(d + this.initDeg) * this.scale;
	}
};


let nlPoint = function(dia, cx, cy) {
	this.dia = dia;
	this.bornX = -0.5 * cx;
	this.bornY = -0.5 * cy;
	this.x = new noiseLoop(cx * 2);
	this.y = new noiseLoop(cy * 2);
	this.diaNoise = new noiseLoop(dia);
	this.color = {
		r: Math.round(Math.random() * 255),
		g: 0,
		b: Math.round(Math.random() * 255),
		a: 0.5 + Math.round(Math.random() * 5) / 10,
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
		// console.log(str);
		return str;
	},
	getPos: function(degree) {
		return {
			x: this.x.getValue(degree) + this.bornX,
			y: this.y.getValue(degree) + this.bornY,
		}
	},
	getDia: function(degree) {
		return this.diaNoise.getValue(degree) + this.dia;
	}
}

let noiseMap = function(noise, min, max) {
	if (noise > 1) {
		throw `noise map error: noise bigger than 1, is: ${noise}`;
	}
	return min + noise * (max - min);
}
