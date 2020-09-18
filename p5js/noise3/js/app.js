let screenWidth = 720;
let screenHeight = 720;
let xOffset = Math.ceil(screenWidth / 2 + 1);
let yOffset = Math.ceil(screenHeight / 2 + 1);
let inc = 0.005;
let frameCount = 0;

function setup() {
	// Sets the screen to be 720 pixels wide and 400 pixels high
	createCanvas(screenWidth, screenHeight);
	pixelDensity(1);
}

function draw() {
	loadPixels();
	let scale = 0.01;

	for (let x = 0; x < screenWidth; x++) {
		for (let y = 0; y < screenHeight; y++) {
			let col = 255 * noise(scale * x, scale * y,
				10 * scale * frameCount);
			let i = (x * screenWidth + y) * 4;
			pixels[i] = col;
			pixels[i + 1] = col;
			pixels[i + 2] = col;
			pixels[i + 3] = 255;
		}
	}

	updatePixels();
	if (frameCount == 0) {
		saveFrames(`out`, 'png', 0, 100);
	}

	frameCount++;
}
