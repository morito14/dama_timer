class Clock {
  constructor(x0, y0){
    this.x0 = x0;
    this.y0 = y0;
    /* for clock appearance */
    this.sizeClock = width / 2.2;
    /* for shaking */
    this.screenShakeValue = 200;
    /* for time controlling */
    //this.timeStart =
    this.time = 60.;
    this.timeLeft = 9.4;
    this.delayTime = 1.;
    this.delayTimeLeft = 1.;
    /* flags */
    this.flgStop = false;
    this.flgTimeOver = false;
  }

  timeUpdate() {
    if (!this.flgStop && !this.flgTimeOver) {
      if (this.delayTimeLeft > 0.01) {
        this.delayTimeLeft -= 1 / FRAME_RATE;
      } else {
        if (this.timeLeft > 0.01) {
          this.timeLeft -= 1 / FRAME_RATE;
        } else {
          print('timeout');
          this.timeLeft = 0.;
          this.delayTimeLeft = 0.;
          this.flgTimeOver = true;
          this.flgStop = true;
        }
      }
    }
  }

  run(){
    push();
    translate(this.x0, this.y0);
    //this.shake();
    this.timeUpdate();
    this.drawBaseRing();
    this.drawDelayRing();
    this.drawTensionCircle();
    this.drawTime();
    this.drawCover();
    pop();
  }

  drawBaseRing(){
    push();
    noFill();
    stroke(122, 125, 120);//gray
    //stroke(33, 175, 255);//blue
    strokeWeight(12.);
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
    ellipse(0, 0, circlePercent * this.sizeClock + pulse);
    pop();

    //for debug
    //this.timeLeft -= 1/FRAME_RATE;
    //if (this.timeLeft < 0){
    //  this.timeLeft = this.time;
    //}

  }

  resetVars(){
    //this.timeStart =
    this.timeLeft = this.time;
    this.delayTimeLeft = this.delayTime;
    /* flags */
    this.flgStop = true;
    this.flgTimeOver = false;
  }

  drawTime(){

    push();
    //stroke('black');//blue
    //strokeWeight(3.);
    textSize(230);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill('white');
    text(str(ceil(this.timeLeft)), 0, 0);

    pop();
  }

  drawDelayRing(){
    if (this.delayTimeLeft >= 0) { //when delay time left
      let percent = this.delayTimeLeft / this.delayTime
      let angle = map(percent, 0, 1, 0, 2. * PI);
      push();
      noFill()
      stroke(33, 175, 255);//blue
      strokeWeight(12.);

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
    if (this.screenShakeValue > 0.0) {
      translate(random(-this.screenShakeValue, this.screenShakeValue),
          random(-this.screenShakeValue, this.screenShakeValue));
      this.screenShakeValue -= 200.0 / FRAME_RATE;
    }
  }

}
