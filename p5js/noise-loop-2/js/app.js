let screenWidth = 500;
let screenHeight = 500;
const cx = screenWidth / 2;
const cy = screenHeight / 2;
const r = 200;
const inc = 0.01;
let deg = 0;
let listPoint = [];
let noiseLoopX = new noiseLoop(screenWidth / 50);
let noiseLoopY = new noiseLoop(screenWidth / 50);

function initListPoint() {
	// 以屏幕中心为原点，画一个半径为r的圆，在这个圆上画点


	const p_rad = 5;

	// 逐行，从左到右加入点
	// for (let i = 0; i <= 180; i += 10) {
	// 	if (i == 0) {
	// 		listPoint.push(new nlPoint(p_rad, cx, cy - r));
	// 	} else if (i == 90) {
	// 		listPoint.push(new nlPoint(p_rad, cx - r, cy));
	// 		listPoint.push(new nlPoint(p_rad, cx + r, cy));
	// 	} else if (i == 180) {
	// 		listPoint.push(new nlPoint(p_rad, cx, cy + r));
	// 	} else {
	// 		let a_d_x = (i > 90 ? (180 - i) : i) * Math.PI / 180; // 换算成角度制
	// 		let a_d_y = i * Math.PI / 180; // 换算成角度制
	// 		x = Math.sin(a_d_x) * r;
	// 		y = Math.cos(a_d_y) * r;
	// 		listPoint.push(new nlPoint(p_rad, cx - x, cy - y)); // 左边点
	// 		listPoint.push(new nlPoint(p_rad, cx + x, cy - y)); // 右边点
	// 	}
	// }

	let dr = r;
	for (let i = 0; i <= 180; i += 10) {
		let a_d_x = (i > 90 ? (180 - i) : i) * Math.PI / 180; // 换算成角度制
		let a_d_y = i * Math.PI / 180; // 换算成角度制
		x = Math.sin(a_d_x) * dr;
		y = Math.cos(a_d_y) * dr;
		// 从左向右加点
		let start_x = cx - x;
		let end_x = cx + x;
		const point_step = 20;
		while (start_x < end_x) {
			listPoint.push(new nlPoint(p_rad, start_x, cy - y)); // 左边点
			start_x += point_step;
		}
		listPoint.push(new nlPoint(p_rad, end_x, cy - y)); // 右边点

	}

}

function setup() {
	// Sets the screen to be 720 pixels wide and 400 pixels high
	createCanvas(screenWidth, screenHeight);
	pixelDensity(1);
	initListPoint();
}

let last_point_index = 30;


function draw() {
	background(0);

	const step = 0.1;
	/**
	 * 给其中一些点加一个sin波动
	 */
	let theta = 0;
	const offset = screenHeight / 10;
	let point_index = last_point_index;
	for (let i = 0; i < listPoint.length; i++) {
		let p = listPoint[i];
		let {
			x,
			y
		} = p.getPos(deg);

		// sin 波动
		// if (point_index == i && theta <= Math.PI) {
		// 	x += noiseLoopX.getValue(deg + i * step);
		// 	y += (noiseLoopY.getValue(deg + i * step) + Math.sin(theta) * offset);
		// 	theta += 0.3;
		// 	point_index++;

		// } else {
		// 	x += noiseLoopX.getValue(deg + i * step);
		// 	y += noiseLoopY.getValue(deg + i * step);
		// }

		// 正常抖动
		// x += noiseLoopX.getValue(deg + i * step);
		// y += noiseLoopY.getValue(deg + i * step);


		// // 固定区域大幅抖动
		// if (Math.abs(x - cx) < 100 && Math.abs(y - cy) < 100) {
		// 	x += noiseLoopX.getValue(deg + i * step);
		// 	y += noiseLoopY.getValue(deg + i * step, 5);
		// } else {
		// 	x += noiseLoopX.getValue(deg + i * step);
		// 	y += noiseLoopY.getValue(deg + i * step);
		// }


		// 抖动渐进增大
		let scaleMore =  r / (Math.abs(x - cx) + Math.abs(y - cy));
		if(scaleMore > 2){
			scaleMore = 2;
		}
		x += noiseLoopX.getValue(deg + i * step, scaleMore);
		// x = x;
		y += noiseLoopY.getValue(deg + i * step, scaleMore);
	
		let dia = p.getDia(deg);

		noStroke();
		fill(p.getColor());
		ellipse(x, y, dia, dia);
	}

	deg += inc;
	last_point_index += 1;
	if (last_point_index > listPoint.length - 30) {
		last_point_index = 10;
	}
}
