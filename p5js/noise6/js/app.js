let screenWidth = 500;
let screenHeight = 500;
let xOffset = Math.ceil(screenWidth / 2 + 1);
let yOffset = Math.ceil(screenHeight / 2 + 1);
const inc = 0.01;
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

let scale = 0.01;
const numFrames = 150;
const radius = 1.5;

function draw() {
	background(0);
	beginShape();
	t = frameCount / numFrames;

	if (frameCount == numFrames) {
		frameCount = 0;
	}

	for (let x = 0; x < screenWidth; x++) {
		let n = noise(scale * x, radius * Math.cos(Math.PI * t), radius * Math.sin(Math.PI * t));
		// let n = noise(scale * x, radius * Math.cos(Math.PI * t));
		let y = map(n, 0, 1, 0, screenHeight);
		vertex(x, y);
	}

	endShape();

	frameCount += 1;
}
