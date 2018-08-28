let r = 1;
let angle = 0;
let phase = 0;
let nowPlayer = 0;
const FRAME_RATE = 10;
//let fontRegular, fontBold;
let countSound = new Array();
let tick1, tick2;
let explosion;
let click;

function preload() {
  /* laod sound effects */
  tick1 = loadSound('./assets/tick1.wav');
  tick2 = loadSound('./assets/tick2.wav');
  explosion = loadSound('./assets/explosion.wav');
  click = loadSound('./assets/click.wav');
  /* load icons */
  img_setting = loadImage('./assets/setting.png');
  img_refresh = loadImage('./assets/refresh.png');
  img_back = loadImage('./assets/back.png');



  for(let i = 0; i < 10; i++) {
    countSound[i] = loadSound('./assets/count' + str(i + 1) + '.wav');
  }

}

function setup(){
  fullscreen();
  //createCanvas(windowWidth, windowHeight);//描画領域を指定
  createCanvas(800, 800 * 0.5625);//描画領域を指定
  frameRate(FRAME_RATE);
  clock_left = new Clock(-(width / 3.95), height / 15, 60., 0.5);
  clock_right = new Clock(+(width / 3.95), height / 15, 60., 0.5);
  engine = new Engine();
  counter = new Counter();
}

function draw(){
  background('black');
  smooth();
  //engine.drawInfo4Debug();

  translate(width / 2., height / 2.);
  switch(phase) {
    case 0:
    phaseReady();
    break;

    case 1:
    phaseTimer();
    break;

    case 2:
    phaseSetting();
    break;
  }

}

function phaseReady(){
  engine.drawArrow();
  engine.runTimer();
  counter.run();
  clock_left.run();
  clock_right.run();
}

function phaseTimer(){
  engine.runTimer();
  counter.run();
  clock_left.run();
  clock_right.run();
}

function phaseSetting(){
  engine.runSetting();
}

function keyPressed(){
  if (key === 'u'){
    clock_left.resetVars();
    clock_right.resetVars();
    counter.resetVars();
  }

  if (key == ' '){
    counter.increCount();
    click.play();
    if (nowPlayer == 0) {
      clock_left.timerStart();
      clock_right.timerStop();
      nowPlayer = 1;
    } else {
      clock_left.timerStop();
      clock_right.timerStart();
      nowPlayer = 0;
    }

  }

  return false;
}
