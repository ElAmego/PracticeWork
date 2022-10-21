"use strict"

const leftRacket = document.getElementById('left_racket');
const rightRacket = document.getElementById('right_racket');
const ball = document.getElementById('ball');
const counter = document.getElementById('counter');

const buttonStart = document.getElementById('start');
buttonStart.addEventListener('click', play, false);

let count1 = 0;
let count2 = 0;

class counterDefault{
  constructor(leftPlayer, rightPlayer) {
    this.leftPlayer = leftPlayer;
    this.rightPlayer = rightPlayer;
  }

  update() {
    counter.innerHTML = this.leftPlayer + ':' + this.rightPlayer;
  }
}

class leftRacketDefault{
  constructor(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
  }

  update() {
    leftRacket.style.top = this.posX + 'px';
    leftRacket.style.left = this.posY + 'px';
  }
  
  default() {
    this.posX = 150;
    this.posY = 0;
  }
}

class rightRacketDefault{
  constructor(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
  }

  update() {
    rightRacket.style.top = this.posX + 'px';
    rightRacket.style.left = this.posY + 'px';
  }
  
  default() {
    this.posX = 150;
    this.posY = 590;
  }
}

class ballDefault{
  constructor(posX, posY, speedX, speedY) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    ball.style.top = this.posX + 'px';
    ball.style.left = this.posY + 'px';
  }
  
  default() {
    this.posX = 175;
    this.posY = 260;
  }
}

let leftRacketH = new leftRacketDefault(150, 0, 0)
let rightRacketH = new rightRacketDefault(150, 590, 0)
let ballH = new ballDefault(175, 260, 0, 0)
let counterH = new counterDefault(0, 0)

document.addEventListener('keydown', changeSpeed, false);
document.addEventListener('keyup', nullSpeed, false);
function changeSpeed(e) {
  switch(e.keyCode){
    case 17: leftRacketH.speed = 5; break;
    case 16: leftRacketH.speed = -5; break;
    case 40: rightRacketH.speed = 5; break;
    case 38: rightRacketH.speed = -5; break;
  }

  if (ballH.posY == 0.1 || ballH.posY == 549.9) {
    leftRacketH.speed = 0;
    rightRacketH.speed = 0;
  }
}
  
function nullSpeed (e) {
  switch(e.keyCode){
    case 17: leftRacketH.speed = 0; break;
    case 16: leftRacketH.speed = 0; break;
    case 40: rightRacketH.speed = 0; break;
    case 38: rightRacketH.speed = 0; break;
  }
}

function play() {
  leftRacketH.default();
  rightRacketH.default();
  ballH.default();
  leftRacketH.update();
  rightRacketH.update();
  ballH.update();
  let ballSpeedX = Math.round(Math.random())*2
  if (ballSpeedX == 0) {
    ballSpeedX = -2;
  }  

  let ballSpeedY = Math.round(Math.random())*2
  if (ballSpeedY == 0) {
    ballSpeedY = -2;
  }

  ballH.speedX = ballSpeedX;
  ballH.speedY = ballSpeedY;

  buttonStart.disabled = true;
}

function count (player) {  // 1 - left player, other - right player
  if (player == 1) { 
    counterH.rightPlayer++;  
  } else {
    counterH.leftPlayer++;  
  }

  ballH.update();
  counterH.update();
}

function move() {
  leftRacketH.posX += leftRacketH.speed;
  if(leftRacketH.posX <= 0) {
    leftRacketH.posX = 0;
  } else if (leftRacketH.posX >= 300) {
    leftRacketH.posX = 300;
  }

  rightRacketH.posX += rightRacketH.speed;
  if(rightRacketH.posX <= 0) {
    rightRacketH.posX = 0;
  } else if (rightRacketH.posX >= 300) {
    rightRacketH.posX = 300;
  }

  ballH.posX += ballH.speedX;
    ballH.posY += ballH.speedY;

    if (ballH.posY < 10 && ((ballH.posX > leftRacketH.posX && ballH.posX < leftRacketH.posX + 100) || (ballH.posX + 50 > leftRacketH.posX && ballH.posX + 50 < leftRacketH.posX + 100))) {
      ballH.speedY *= -1;
      ballH.posY = 10;
    }

    if (ballH.posY > 540 && ((ballH.posX > rightRacketH.posX && ballH.posX < rightRacketH.posX + 100) || (ballH.posX + 50 > rightRacketH.posX && ballH.posX + 50 < rightRacketH.posX + 100))) {
      ballH.speedY *= -1;
      ballH.posY = 540;
    }

    if(ballH.posX < 0 || ballH.posX > 350) {
      ballH.speedX *= -1;
    }

    if(ballH.posY < 0) {
      ballH.posY = 0.1;
      ballH.speedX = 0;
      ballH.speedY = 0;
      count(1);
      buttonStart.disabled = false;
    } else if (ballH.posY > 550) {
      ballH.posY = 549.9;
      ballH.speedX = 0;
      ballH.speedY = 0;
      count(2);
      buttonStart.disabled = false;
    }

  leftRacketH.update();
  rightRacketH.update();
  ballH.update()
  window.requestAnimationFrame(move)
}

move()