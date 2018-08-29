class Clock {
  constructor(x0, y0, time, delayTime){
    this.x0 = x0;
    this.y0 = y0;
    /* for clock appearance */
    this.sizeClock = width / 2.2;
    /* for shaking */
    this.screenShakeValue = -1;
    /* for time controlling */
    //this.timeStart =
    this.tmpTime = time;
    this.time = time;
    this.timeLeft = time;
    this.delayTime = delayTime;
    this.delayTimeLeft = delayTime;
    /* flags */
    this.flgStop = true;
    this.flgTimeOver = false;
    if (delayTime == 0) {
      this.flgNoDelay = true;
    }
  }

  timerStop(){
    this.flgStop = true;
    this.delayTimeLeft = this.delayTime;
  }

  timerStart(){
    this.flgStop = false;
    this.delayTimeLeft = this.delayTime;
  }

  timeUpdate() {
    if (!this.flgStop && !this.flgTimeOver) {
      if (this.delayTimeLeft > 0.01) {
        this.delayTimeLeft -= 1 / FRAME_RATE;
      } else {
        this.delayTimeLeft = 0.;
        if (this.timeLeft > 0.01) {
          this.timeLeft -= 1 / FRAME_RATE;
        } else {
          print('timeout');
          this.timeLeft = 0.;
          this.delayTimeLeft = 0.;
          this.flgTimeOver = true;
          //this.flgStop = true;
        }
      }
    }
  }

  playTickTock(){
    if (ceil(this.tmpTime) != ceil(this.timeLeft) && this.delayTimeLeft == 0) {
      if (ceil(this.tmpTime) > 31) {
        tickNormal.play();
      } else if (ceil(this.tmpTime) > 11) {//20 ~ 10 sec
        if (ceil(this.timeLeft) % 2 == 0) {
          tick1.play();
        } else {
          tick2.play();
        }
      } else if (ceil(this.timeLeft) >= 1) {
        countSound[ceil(this.timeLeft) - 1].play();
      } else {
        explosion.play();
      }
    }
    this.tmpTime = this.timeLeft
  }

  run(){
    push();
    translate(this.x0, this.y0);
    this.shake();
    this.timeUpdate();
    this.drawBaseRing();
    this.drawDelayRing();
    this.drawTensionCircle();
    this.drawTime();
    this.drawCover();
    this.playTickTock();
    pop();
  }

  drawBaseRing(){
    push();
    noFill();
    stroke(122, 125, 120);//gray
    //stroke(33, 175, 255);//blue
    strokeWeight(10.);
    ellipse(0, 0, this.sizeClock);
    pop();
  }

  drawCover(){
    if (this.flgStop){
      push();
      fill(0, 0, 0, 150);
      noStroke();
      ellipse(0, 0, this.sizeClock * 1.1);
      pop();
    }
  }

  drawTensionCircle(){
    let percent = this.timeLeft / this.time;
    let circlePercent = map(percent, 0, 1, 1, 0);
    let pulse = (this.timeLeft % 1) * this.sizeClock * 0.01;

    push();
    fill(175, 29, 41);
    noStroke();
    ellipse(0, 0, circlePercent * (this.sizeClock - 12) + pulse);
    pop();

    //for debug
    //this.timeLeft -= 1/FRAME_RATE;
    //if (this.timeLeft < 0){
    //  this.timeLeft = this.time;
    //}

  }

  resetVars(){
    //this.timeStart =
    this.tmpTime = timerTime;
    this.time = timerTime;
    this.delayTime = timerDelayTime;
    this.timeLeft = this.time;
    print('timerDelayTIme =' + timerDelayTime);
    this.delayTimeLeft = this.delayTime;
    this.screenShakeValue = -1;
    /* flags */
    this.flgStop = true;
    this.flgTimeOver = false;
    if (timerDelayTime == 0) {
      this.flgNoDelay = true;
    } else {
      this.flgNoDelay = false;
    }
  }

  drawTime(){

    push();
    //stroke('black');//blue
    //strokeWeight(3.);
    textSize(230);
    if (this.timeLeft >= 99){
      textSize(150);
    }
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill('white');
    text(str(ceil(this.timeLeft)), 0, 0);

    pop();
  }

  drawDelayRing(){
    if (this.delayTimeLeft > 0 && !this.flgNoDelay) { //when delay time left
      let percent = this.delayTimeLeft / this.delayTime
      let angle = map(percent, 0, 1, 0, 2. * PI);
      push();
      noFill()
      stroke(33, 175, 255);//blue
      strokeWeight(10.);

      //draw ring
      if (percent == 1) {
        ellipse(0, 0, this.sizeClock);
      }
      arc(0, 0, this.sizeClock, this.sizeClock,
        -(angle + PI / 2), -PI / 2.);

      //drwa edge of Ring
      noStroke();
      fill(33, 175, 255);//blue
      let x = cos(-(angle + (PI / 2))) * this.sizeClock / 2.;
      let y = sin(-(angle + (PI / 2))) * this.sizeClock / 2.;
      ellipse(x, y, 21);


      pop();
      //this.delayTimeLeft -= 1/FRAME_RATE;//for debug
    } else{
      //this.delayTimeLeft = 1.0;//for debug
    }
  }

  shake(){
    if (this.flgTimeOver && this.screenShakeValue == -1) {
      this.screenShakeValue = 200;
    }
    if (this.screenShakeValue > 0.0) {
      translate(random(-this.screenShakeValue, this.screenShakeValue),
          random(-this.screenShakeValue, this.screenShakeValue));
      this.screenShakeValue -= 70.0 / FRAME_RATE;
    }
  }

}
