let r = 1;
let angle = 0;
const FRAME_RATE = 60;

function setup(){
  createCanvas(windowWidth, windowWidth * 0.5625);//描画領域を指定
  background('black');//毎フレームごとに黒色描画
  clock_left = new Clock(-(width / 3.95), height / 15);
  clock_right = new Clock(+(width / 3.95), height / 15);
  system = new System();
}

function draw(){
  background('black');
  smooth();
  system.drawInfo4Debug();

  translate(width / 2., height / 2.);
  clock_left.run();
  clock_right.run();

}

function keyPressed(){
  if (key === 'u'){
    r += 10;
  }

  return false;
}
