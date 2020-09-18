let screenWidth = 720;
let screenHeight = 720;
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

function draw() {
	background(0);
	loadPixels();
	let scale = 0.01;

	for (let x = 0; x < screenWidth; x++) {
		for (let y = 0; y < screenHeight; y++) {
			let n = noise(scale * x, scale * y, 10 * Math.cos(frameCount * Math.PI / 180));
			// console.log(n);

			let isBlack = n > 0.5;
			let col = isBlack ? 0 : 255;
			let i = (x * screenWidth + y) * 4;
			pixels[i] = col;
			pixels[i + 1] = col;
			pixels[i + 2] = col;
			pixels[i + 3] = 255;
		}
	}

	updatePixels();

	frameCount += 1;
}
