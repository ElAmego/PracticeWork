"use strict"

const submitButton = document.getElementById('subm');
submitButton.addEventListener('click', checkDiameter, false)

function checkDiameter() {
  const clockDiameter = document.getElementById('size');
  const error = document.getElementById('error');
  const canvas = document.getElementById('clock');
  let clockDiameterValue = clockDiameter.value;

  if (clockDiameterValue >= 200 && clockDiameterValue <= 800) {
    canvasClock(clockDiameterValue);
    document.body.removeChild(block);
  } else{
    error.innerHTML = ('Введите значение от 200 до 800')
  }
}

function canvasClock(diameter) {
  const canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d')
  canvas.setAttribute('width', diameter);
  canvas.setAttribute('height', diameter);

  function buildClock() {
    let radius = diameter/2;

    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#E8C768';
    ctx.fill();
    
    document.body.appendChild(canvas)

    for (let th = 1; th <= 12; th++) {
      let angle = th*360/12/180*Math.PI;

      let smallCircleRadius = radius/7;

      let x = radius + (radius - diameter/10) * Math.sin(angle)
      let y = radius - (radius - diameter/10) * Math.cos(angle)

      ctx.beginPath();
      ctx.arc(x, y, smallCircleRadius, 0, 2*Math.PI, false);
      ctx.fillStyle = '#48B382';
      ctx.fill();

      ctx.font = `${diameter/20}px Arial`
      ctx.fillStyle = "black";
      ctx.textAlign = 'center';
      ctx.fillText(th, x, y);
    }

    const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      let time = hours + ':' + minutes + ':' + seconds;

      let hoursAngle = 360/12*(hours%12 + minutes/60);
      let minutesAngle = 360/60*(minutes + seconds/60);
      let secondsAngle = 360/60*seconds;

      let lengthSeconds = radius - 20;
      let lengthMinutes = radius/1.5;
      let lengthHours = lengthMinutes / 1.5;
      
      ctx.beginPath();
      ctx.lineWidth = radius/100;
      ctx.lineCap = "round";
      ctx.moveTo(radius, radius);
      ctx.lineTo(radius+lengthSeconds*Math.cos(Math.PI/2 - secondsAngle*(Math.PI/180)), radius-lengthSeconds*Math.sin(Math.PI/2 - secondsAngle*(Math.PI/180)));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.lineWidth = radius/50;
      ctx.lineCap = "round";
      ctx.moveTo(radius, radius);
      ctx.lineTo(radius+lengthMinutes*Math.cos(Math.PI/2 - minutesAngle*(Math.PI/180)), radius-lengthMinutes*Math.sin(Math.PI/2 - minutesAngle*(Math.PI/180)));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.lineWidth = radius/25;
      ctx.lineCap = "round";
      ctx.moveTo(radius, radius);
      ctx.lineTo(radius+lengthHours*Math.cos(Math.PI/2 - hoursAngle*(Math.PI/180)), radius-lengthHours*Math.sin(Math.PI/2 - hoursAngle*(Math.PI/180)));
      ctx.stroke();
      ctx.closePath();

      ctx.font = `${diameter/15}px Arial`
      ctx.fillStyle = "black";
      ctx.fillText(time, radius, radius/1.75);

      console.log(time)
  }
  buildClock()
  setInterval(buildClock, 1000)
}