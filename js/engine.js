class Engine {
  constructor(){
    this.iconSize = width / 15;
    this.iconX = width / 2.2;
    this.iconY = - height / 2.5;
    this.times = [10, 30, 60, 90, 120, 300, 600];
    this.timesDelay = [0, 0.5, 1, 2, 3, 4, 5];
    this.timerTimeIndex = 2;
    this.timerDelayTimeIndex = 2;

    //for red circle
    this.timeRedX = 0;
    this.timeRedY = 0;
    this.timeDelayRedX = 0;
    this.timeDelayRedY = 0;
    this.redSpeed = 0.3;

  }

  increTimerTimeIndex(){
    this.timerTimeIndex += 1;
    if (this.timerTimeIndex > this.times.length - 1){
      this.timerTimeIndex = this.times.length - 1;
    }
  }

  decreTimerTimeIndex(){
    this.timerTimeIndex -= 1;
    if (this.timerTimeIndex < 0){
      this.timerTimeIndex = 0;
    }
  }

  increTimerDelayTimeIndex(){
    this.timerDelayTimeIndex += 1;
    if (this.timerDelayTimeIndex > this.timesDelay.length - 1){
      this.timerDelayTimeIndex = this.timesDelay.length - 1;
    }
  }
  decreTimerDelayTimeIndex(){
    this.timerDelayTimeIndex -= 1;
    if (this.timerDelayTimeIndex < 0){
      this.timerDelayTimeIndex = 0;
    }
  }

  runSetting(){
    // draw frame
    image(img_back, -this.iconX, this.iconY, this.iconSize, this.iconSize);
    push();
    noFill();
    stroke(33, 175, 255);//blue
    strokeWeight(8.);
    rectMode(CENTER);2
    rect(0, 20, width / 1.2, height / 2.5, 40);
    pop();

    // draw info
    push();
    textSize(10);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    fill('white');
    let msg = 'Icon made by Gregor Cresnar[https://www.flaticon.com/authors/gregor-cresnar] from www.flaticon.com'
    text(msg, 0, height / 2.5);

    textSize(50);
    text('Dama Blitz Timer', 0, - height / 2.8);
    pop();

    // draw Tieme, DelayTime
    push();
    textSize(30);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    fill('white');
    let timeX = -width / 3.5;
    let timeY = -20;
    let itemIncre = 60;
    text('Time:', timeX, timeY);
    for (let i = 0, itemX = timeX + 10; i < this.times.length; i++){
      if (this.times[i] < 100){
        itemX += itemIncre;
      } else {
        itemX += itemIncre + 15;
      }
      text(str(this.times[i]), itemX, timeY);

      // draw red circle
      if (this.timerTimeIndex == i){
        //animation
        this.timeRedX = this.timeRedX - (this.timeRedX - itemX) * this.redSpeed;
        this.timeRedY = this.timeRedY - (this.timeRedY - timeY) * this.redSpeed;
        push();
        stroke(175, 29, 41);
        strokeWeight(5);
        noFill();
        ellipse(this.timeRedX, this.timeRedY, 60);
        pop();
      }
    }

    let timeDelayX = -width / 3.5;
    let timeDelayY = 50;
    text('Delay:', timeDelayX, timeDelayY);
    for (let i = 0, itemX = timeDelayX + 10; i < this.timesDelay.length; i++){
      if (this.timesDelay[i] < 100){
        itemX += itemIncre;
      } else {
        itemX += itemIncre + 15;
      }
      text(str(this.timesDelay[i]), itemX, timeDelayY);

      // draw red circle
      if (this.timerDelayTimeIndex == i){
        //animation
        this.timeDelayRedX = this.timeDelayRedX - (this.timeDelayRedX - itemX) * this.redSpeed;
        this.timeDelayRedY = this.timeDelayRedY - (this.timeDelayRedY - timeDelayY) * this.redSpeed;
        push();
        stroke(175, 29, 41);
        strokeWeight(5);
        noFill();
        ellipse(this.timeDelayRedX, this.timeDelayRedY, 60);
        pop();
      }
    }

    //apply TIMEs
    timerTime = this.times[this.timerTimeIndex];
    timerDelayTime = this.timesDelay[this.timerDelayTimeIndex];

  }

  runTimer(){
    imageMode(CENTER);
    image(img_refresh, this.iconX, this.iconY, this.iconSize, this.iconSize);
    image(img_setting, -this.iconX, this.iconY, this.iconSize, this.iconSize);
  }

  drawDownArrow(){
    let arrowX = ((nowPlayer * 2) -1) * width / 4;
    image(img_downArrow, arrowX, this.iconY - 10, this.iconSize, this.iconSize);
  }

  numberClicked(inputX, inputY){
    inputX = inputX - (width / 2.);
    inputY = inputY - (height / 2.);
    print('numberClicked');
    let timeX = -width / 3.5;
    let timeY = -20;
    let itemIncre = 60;
    for (let i = 0, itemX = timeX + 10; i < this.times.length; i++){
      if (this.times[i] < 100){
        itemX += itemIncre;
      } else {
        itemX += itemIncre + 15;
      }
      //print('inputX:' + str(inputX) + ', inputY:' + str(inputY));
      //print('itemX:' + str(itemX) + ', timeY:' + str(timeY));
      //print('dist between' + str(i) + '=' + str(dist(inputX, inputY, itemX, timeY)));
      if(dist(inputX, inputY, itemX, timeY) < 30){
        this.timerTimeIndex = i;
      }
    }

    let timeDelayX = -width / 3.5;
    let timeDelayY = 50;
    text('Delay:', timeDelayX, timeDelayY);
    for (let i = 0, itemX = timeDelayX + 10; i < this.timesDelay.length; i++){
      if (this.timesDelay[i] < 100){
        itemX += itemIncre;
      } else {
        itemX += itemIncre + 15;
      }
      if(dist(inputX, inputY, itemX, timeDelayY) < 30){
        this.timerDelayTimeIndex = i;
      }
    }
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
