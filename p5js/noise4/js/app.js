let screenWidth = 720;
let screenHeight = 720;
let xOffset = Math.ceil(screenWidth / 2 + 1);
let yOffset = Math.ceil(screenHeight / 2 + 1);
const inc = 0.005;
let count = 0;
let frameCount = 0;

function setup() {
	// Sets the screen to be 720 pixels wide and 400 pixels high
	createCanvas(screenWidth, screenHeight);
	pixelDensity(1);
	background(0);
	stroke(255);
	noFill();
}

function draw() {
	background(0);
	let scale = 0.03;

	beginShape();
	for (let x = 0; x < screenWidth; x++) {
		let y = map(noise(scale * x + count, 0), 0, 1, 0, screenHeight);
		vertex(x, y);
	}
	endShape();

	count += inc;
}
