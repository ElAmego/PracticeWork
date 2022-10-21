"use strict"

const submitButton = document.getElementById('subm');
submitButton.addEventListener('click', checkDiameter, false)

function checkDiameter() {
  const clockDiameter = document.getElementById('size');
  const error = document.getElementById('error')
  let clockDiameterValue = clockDiameter.value;

  if (clockDiameterValue >= 200 && clockDiameterValue <= 800) {
    buildSvg(clockDiameterValue)
    document.body.removeChild(block);
  } else {
    error.innerHTML = ('Введите значение от 200 до 800')
  }
}

function buildSvg(diameter) {
  let radius = diameter/2; // радиус циферблата

  const clock = document.createElement('div');
  clock.style.width = diameter + 'px';
  clock.style.height = diameter + 'px';

  const svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  svg.setAttribute('height', diameter)
  svg.setAttribute('width', diameter)

  const svgCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  svgCircle.setAttribute('cx', radius);
  svgCircle.setAttribute('cy', radius);
  svgCircle.setAttribute('r', radius);
  svgCircle.setAttribute('fill','#FCCA66');

  const testCircle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  testCircle.setAttribute('cx', radius);
  testCircle.setAttribute('cy', radius);
  testCircle.setAttribute('r', radius/7);
  testCircle.setAttribute('fill','black');

  document.body.appendChild(svg);
  svg.appendChild(testCircle)
  svg.appendChild(svgCircle)

  for (let th = 1; th <= 12; th++) {
    let angle = th*360/12/180*Math.PI;

    let x = radius + (radius - diameter/10) * Math.sin(angle)
    let y = radius - (radius - diameter/10) * Math.cos(angle)

    let xNumber = radius/1.02 + (radius - diameter/10) * Math.sin(angle)
    let yNumber = radius/0.98 - (radius - diameter/10) * Math.cos(angle)

    const numberCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    numberCircle.setAttribute('cx', x);
    numberCircle.setAttribute('cy', y);
    numberCircle.setAttribute('r', radius/7);
    numberCircle.setAttribute('fill','#48B382');

    const number = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    number.setAttribute('x', xNumber)
    number.setAttribute('y', yNumber)
    number.setAttribute('fill','black');
    number.setAttribute('font-size',diameter/20);
    number.textContent = th;    

    svg.appendChild(numberCircle)    
    svg.appendChild(number)    
  }

  function initializeClock() {
    const time = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    time.setAttribute('x', radius/1.29);
    time.setAttribute('y', radius/1.75);
    time.setAttribute('font-size', diameter/15);

    const hoursHand = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    hoursHand.setAttribute('x', radius/1.04)
    hoursHand.setAttribute('y', radius/2)
    hoursHand.setAttribute('rx', radius/20)
    hoursHand.setAttribute('fill', 'black')
    hoursHand.setAttribute('height', diameter/4)
    hoursHand.setAttribute('width', diameter/25)
    hoursHand.style.transformOrigin = '50% 50%'

    const minutesHand = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    minutesHand.setAttribute('x', radius/1.026)
    minutesHand.setAttribute('y', radius/2.96)  
    minutesHand.setAttribute('rx', radius/40)
    minutesHand.setAttribute('fill', 'black')
    minutesHand.setAttribute('height', diameter/3)
    minutesHand.setAttribute('width', diameter/40)
    minutesHand.style.transformOrigin = '50% 50%'

    const secondsHand = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    secondsHand.setAttribute('x', radius/1.01)
    secondsHand.setAttribute('y', radius/5)  
    secondsHand.setAttribute('rx', radius/80)
    secondsHand.setAttribute('fill', 'black')
    secondsHand.setAttribute('height', diameter/2.5)
    secondsHand.setAttribute('width', diameter/100)
    secondsHand.style.transformOrigin = '50% 50%'

    svg.appendChild(time)
    svg.appendChild(hoursHand)
    svg.appendChild(minutesHand)
    svg.appendChild(secondsHand)

    function updateClock() {
      let date = new Date()
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      let hoursAngle = 360/12*(hours%12 + minutes/60);
      hoursHand.setAttribute('transform', `rotate(${hoursAngle})`)
      let minutesAngle = 360/60*(minutes + seconds/60);
      minutesHand.setAttribute('transform', `rotate(${minutesAngle})`)
      let secondsAngle = 360/60*seconds;
      secondsHand.setAttribute('transform', `rotate(${secondsAngle})`)

      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      if (seconds < 10) seconds = '0' + seconds;

      time.textContent = hours + ':' + minutes + ':' + seconds;
      console.log(time.textContent)
    }

    updateClock()
    setInterval(updateClock, 1000)
  }
  
  initializeClock()
}