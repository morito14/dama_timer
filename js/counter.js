class Counter {
  constructor(){
    this.count = 0;
  }

  run(){
    this.drawCount();
  }

  drawCount(){
    push();
    stroke(33, 175, 255);//blue
    //stroke('black');//blue
    //strokeWeight(3.);
    textSize(50);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    //fill(33, 175, 255);
    fill('white');
    text(str(ceil(this.count / 2)), 0, -height / 3.5);
    pop();
  }

  increCount(){
    this.count += 1;
  }

  resetVars(){
    this.count = 0;
  }
}
