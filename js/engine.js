class Engine {
  constructor(){
    this.iconSize = width / 15;
    this.iconX = width / 2.2;
    this.iconY = - height / 2.5;
  }

  runSetting(){
    image(img_back, -this.iconX, this.iconY, this.iconSize, this.iconSize);

  }

  runTimer(){
    imageMode(CENTER);
    image(img_refresh, this.iconX, this.iconY, this.iconSize, this.iconSize);
    image(img_setting, -this.iconX, this.iconY, this.iconSize, this.iconSize);
  }

  drawArrow(){

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
