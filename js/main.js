let r = 1;
let angle = 0;
const FRAME_RATE = 60;
//let fontRegular, fontBold;

function setup(){
  fullscreen();
  //createCanvas(windowWidth, windowHeight);//描画領域を指定
  createCanvas(800, 800 * 0.5625);//描画領域を指定
  frameRate(FRAME_RATE);
  clock_left = new Clock(-(width / 3.95), height / 15, 60., 2.);
  clock_right = new Clock(+(width / 3.95), height / 15, 60., 2.);
  engine = new Engine();
  counter = new Counter();
}

function draw(){
  background('black');
  smooth();
  engine.drawInfo4Debug();

  translate(width / 2., height / 2.);
  clock_left.run();
  clock_right.run();
  counter.run();
}

function keyPressed(){
  if (key === 'u'){
    clock_left.resetVars();
    clock_right.resetVars();
    clock_left.startStop();
  }

  if (key == 's'){
    clock_left.startStop();
    clock_right.startStop();
  }

  return false;
}
