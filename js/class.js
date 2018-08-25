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
    this.delayTimeLeft = 0.1;
    this.timeLeft = 30.4;
  }

  run(){
    push();
    translate(this.x0, this.y0);
    //this.shake();
    this.drawBaseRing();
    this.drawDelayRing();
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

  drawTensionCircle(){
    let percent = this.timeLeft / this.Time;
    let circlePercent = map(percent, 0, 1, 1, 0);
    let pulse = this.timeLeft % 1;

    draw

  }

  drawDelayRing(){
    if (this.delayTimeLeft >= 0) { //when delay time left
      let percent = this.delayTimeLeft / this.delayTime
      let angle = map(percent, 0, 1, 0, 2*PI);

      for (let i = 0; i <= angle; i+=.02){
        push();
        fill(33, 175, 255);//blue
        noStroke();
        let x = cos(-(i + (PI / 2))) * this.sizeClock / 2.;
        let y = sin(-(i + (PI / 2))) * this.sizeClock / 2.;
        ellipse(x, y, 12);

        //Edge of Ring
        if (abs(i - angle) < 0.02){
          ellipse(x, y, 21);
        }
        pop();
      }

      this.delayTimeLeft -= 0.01;//for debug
    } else{
      this.delayTimeLeft = 2.0;//for debug
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
