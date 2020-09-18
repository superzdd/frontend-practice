let screenWidth = 500;
let screenHeight = 500;
const inc = 0.01;
let deg = 0;
let listPoint = [];

function initListPoint() {
	const radScale = screenWidth/20;
	for (let i = 0; i < 20; i++) {
		let initDeg = radScale + Math.floor(Math.random() * 20);
		listPoint.push(new nlPoint(initDeg, screenWidth*1.2, screenHeight*1.2));
	}
}

function setup() {
	// Sets the screen to be 720 pixels wide and 400 pixels high
	createCanvas(screenWidth, screenHeight);
	pixelDensity(1);
	initListPoint();
}

function draw() {
	background(220);

	for (p of listPoint) {
		let {
			x,
			y
		} = p.getPos(deg);
		let color = p.getColor();
		let dia = p.getDia(deg);

		noStroke();
		fill(color);
		ellipse(x, y, dia, dia);
	}

	deg += inc;
}
