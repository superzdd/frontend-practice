let screenWidth = 720;
let screenHeight = 400;
let xOffset = 0;

function setup() {
  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(screenWidth, screenHeight);
}

function draw() {
  background(220);
  let delta = xOffset;
  for (let i = 0; i < screenWidth; i++) {
    point(i, screenHeight / 2 + noise(delta) * screenHeight * 0.4);
    delta = delta + 0.01;
  }

  xOffset += 0.01;
  // noLoop();
}
