let phase = 0;
let nowPlayer = 0;
const FRAME_RATE = 5;
let timerTime = 60.;
let timerDelayTime = 1.;
let countSound = new Array();
let spacePressedTime = 0;
let passedTime = 0;

function preload() {
  /* laod sound effects */
  tick1 = loadSound('./assets/tick1.wav');
  tick2 = loadSound('./assets/tick2.wav');
  tickNormal = loadSound('./assets/left30sec.wav');
  explosion = loadSound('./assets/explosion.wav');
  click = loadSound('./assets/click.wav');
  /* load icons */
  img_setting = loadImage('./assets/setting.png');
  img_refresh = loadImage('./assets/refresh.png');
  img_back = loadImage('./assets/back.png');
  img_downArrow = loadImage('./assets/down_arrow.png');
  for(let i = 0; i < 10; i++) {
    countSound[i] = loadSound('./assets/count' + str(i + 1) + '.wav');
  }

}

function setup(){
  fullscreen();
  //createCanvas(windowWidth, windowHeight);//描画領域を指定
  createCanvas(800, 800 * 0.5625);//描画領域を指定
  frameRate(FRAME_RATE);
  clock_left = new Clock(-(width / 3.95), height / 15, timerTime, timerDelayTime);
  clock_right = new Clock(+(width / 3.95), height / 15, timerTime, timerDelayTime);
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

  passedTime += 1;

}

function phaseReady(){
  engine.runTimer();
  counter.run();
  clock_left.run();
  clock_right.run();
  engine.drawDownArrow();
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

function refreshPressed(){
  clock_left.resetVars();
  clock_right.resetVars();
  counter.resetVars();
  phase = 0;
  nowPlayer = (nowPlayer +1) % 2;
}

function settingPressed(){
  clock_left.resetVars();
  clock_right.resetVars();
  counter.resetVars();

  if (phase == 2) {
    phase = 0;
  } else {
    phase = 2;
  }
}

function buttonPressed(){
  counter.increCount();
  if (phase == 0) {
    phase = 1;
  }
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
  spacePressedTime = passedTime;
}

function keyPressed(){
  if (key === 'r'){
    refreshPressed();
  }

  if (key == 's'){
    settingPressed();
  }

  //for debug
  if (key == 'j'){
    engine.decreTimerTimeIndex();
  }
  if (key == 'k'){
    engine.increTimerTimeIndex();
  }
  if (key == 'n'){
    engine.decreTimerDelayTimeIndex();
  }
  if (key == 'm'){
    engine.increTimerDelayTimeIndex();
  }

  //chattering
  if (key == ' ' && abs(passedTime - spacePressedTime) > 0.5 * FRAME_RATE){
    buttonPressed();
  }

  return false;
}

function mousePressed(){
  somewhereClicked(mouseX, mouseY);
  print('clicked X=' + str(mouseX) + ' Y=' + str(mouseY));
  print(map(mouseX, 0, width, 0, 1));
}

function somewhereClicked(x, y){
  if (phase != 2) { //not in setting page
    if (y > height * 0.17 && abs(passedTime - spacePressedTime) > 0.5 * FRAME_RATE){ //when timer is clicked
      buttonPressed();
    } else if (y < height * 0.17 && x > width * 0.91) {
      refreshPressed();
    } else if (y < height * 0.17 && x < width * 0.08) {
      settingPressed();
    }
  } else {// in seting page
    if (y < height * 0.17 && x < width * 0.08) {
      settingPressed();
    } else {
      engine.numberClicked(x, y);
    }
  }
}
