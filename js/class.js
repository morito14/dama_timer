class Clock {
  constructor(x0, y0){
    this.x0 = x0;
    this.y0 = y0;
    this.time
    /* for clock appearance */
    this.sizeClock = width / 2.2;
    /* for shaking */
    this.screenShakeValue = 200;
    /* for time controlling */
    this.time = 60.;
    this.delayTime = 2.;
  }

  run(){
    push();
    translate(this.x0, this.y0);
    //this.shake();
    this.drawBaseRing();
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

  drawDelayRing(){
    if (this.delayTime >= 0) { //when delay time left

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

class System {
  constructor(){
  }

  drawInfo4Debug(){
    push();
    stroke('white');
    strokeWeight(5);
    textSize(32);
    text('width=' + width, 10, 30);
    text('height=' + height, 10, 60);

    pop();
  }
}
