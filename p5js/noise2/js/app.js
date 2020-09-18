let screenWidth = 720;
let screenHeight = 720;
let xOffset = Math.ceil(screenWidth / 2 + 1);
let yOffset = Math.ceil(screenHeight / 2 + 1);
let inc = 0.005;

function setup() {
  // Sets the screen to be 720 pixels wide and 400 pixels high
  createCanvas(screenWidth, screenHeight);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  let rx = xOffset;
  let ry = yOffset;

  for (let j = 0; j < screenHeight; j++) {
    xOffset = Math.ceil(screenWidth / 2 + 1);
    for (let i = 0; i < screenWidth; i++) {
      let index = (i + 0 + j * screenWidth) * 4;
      let r = noise(noise(yOffset, xOffset) * 255 + random(2)) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;
      xOffset += inc;
    }
    yOffset += inc;
  }

  updatePixels();

  xOffset = rx + inc * 5;
  yOffset = ry + inc * 5;

  // noLoop();
}
