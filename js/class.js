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
    this.delayTime = 1.;
    this.delayTimeLeft = 0.1;
    this.timeLeft = 9.4;
    /* flags */
    this.flgSTOP
  }

  run(){
    push();
    translate(this.x0, this.y0);
    //this.shake();
    this.drawBaseRing();
    this.drawDelayRing();
    this.drawTensionCircle();
    this.drawTime();
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
    let percent = this.timeLeft / this.time;
    let circlePercent = map(percent, 0, 1, 1, 0);
    let pulse = (this.timeLeft % 1) * this.sizeClock * 0.01;

    push();
    fill(175, 29, 41);
    noStroke();
    ellipse(0, 0, circlePercent * this.sizeClock + pulse);
    pop();

    //for debug
    this.timeLeft -= 1/FRAME_RATE;
    if (this.timeLeft < 0){
      this.timeLeft = this.time;
    }

  }

  drawTime(){

    push();
    strokeWeight(0);
    textSize(150);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    let textHeight = textAscent();
    fill('white');
    text(ceil(this.timeLeft), 0, -(textHeight / 2.));

    pop();
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

      this.delayTimeLeft -= 1/FRAME_RATE;//for debug
    } else{
      this.delayTimeLeft = 1.0;//for debug
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
