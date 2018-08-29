class Counter {
  constructor(){
    this.count = 0;
  }

  run(){
    this.drawCount();
  }

  drawCount(){
    push();
    noStroke();//blue
    textSize(30);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    //fill(33, 175, 255);
    fill(122, 125, 120);//gray
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
