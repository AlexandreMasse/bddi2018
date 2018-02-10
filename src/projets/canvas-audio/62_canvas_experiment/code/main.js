window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

var canvasWith = window.innerWidth;
var canvasHeight = window.innerHeight;

/**
  Time stuff
*/
var DELTA_TIME = 0;
var LAST_TIME = Date.now();

/**
  Canvas stuff
*/
var canvas;
canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = 'WhiteSmoke';

var canvasWidth = canvas.width,
    canvasHeight = canvas.height;

var ctx;
ctx = canvas.getContext('2d');

var bars = [],
    triangles = [];

var color = [
  ['MidnightBlue', 'Teal', 'LightBlue'],
  ['SlateBlue', 'MediumAquamarine', 'DarkSlateBlue', 'LightSeaGreen']
];

var opts = {
  barWidth: 10
}

onResize();

/**
  addListeners
 */
function addListeners() {

  window.addEventListener( 'resize', onResize.bind(this) );
  rafId = requestAnimationFrame( frame )

}

/**
  Class Visualisation
 */
function Visualisation(radius, direction, barWidth, barHeight, nbBar, barColor, isTheBiggest) {

  this.radius = radius;
  this.direction = direction;
  this.barWidth = barWidth;
  this.barHeight = barHeight;
  this.nbBar = nbBar;
  this.barColor = barColor;
  this.bars = [];
  this.isTheBiggest = isTheBiggest;

  initFrequencyBar(this.nbBar, this.radius, this.direction, this.barWidth, this.barHeight, this.bars, this.barColor);

}

Visualisation.prototype.draw = function(analyser, frequencyRange, addTriangle) {

  for (var i = 0, c = this.bars.length; i < c; i++) {
    var bar = this.bars[i];
    var frequencyMax1 = 150,
        frequencyMax2 = 290;

    var percentIdx = i / this.bars.length;
    var frequencyIdx = Math.floor(frequencyRange * percentIdx); // Frequency range of a sound (max = 1024)
    var currentFrequency = analyser.frequencyData[frequencyIdx];
    // console.log(currentFrequency);

    if (currentFrequency >= frequencyMax1) {
      currentFrequency *= 1.4;
    }

    if (currentFrequency >= frequencyMax2) {
      if (addTriangle) {
        renderTriangle();
      }
    }

    if (currentFrequency >= frequencyMax2 && this.isTheBiggest) {
      this.barColor = this.change(); // Change the color of the last circle
      bar.isRainbow = true;
      // console.log(this.barColor);
    }
    else if (this.isTheBiggest) {
      bar.isRainbow = false;
    }

    bar.draw(currentFrequency); // bar = new FrequencyBar()
  }

}

Visualisation.prototype.change = function() {
 return this.barColor = color[1][getRandom(0, color.length)];
}

/**
  Class FrequencyBar that is called by the Class Visualization
  */
function FrequencyBar(radius, direction, barWidth, barHeight, barColor, angle) {

  this.angle = angle + Math.PI * 2 / direction;
  this.x = Math.cos(angle) * radius;
  this.y = Math.sin(angle) * radius;
  this.barWidth = barWidth;
  this.barHeight = barHeight;
  this.barColor = barColor;
  this.isRainbow = false;

  // Random alternating colors for each FrequencyBar
  if(this.barColor === 'RandomSet1') {
    this.barColor = color[0][getRandom(0, color[0].length)];
  }
  // console.log(this);

}

FrequencyBar.prototype.draw = function(amplitude) {

  var frequencyMaxColor = (this.isRainbow) ? color[1][getRandom(0, color[1].length)] : this.barColor;
  ctx.save();
  ctx.translate(this.x + canvasWidth / 2, this.y + canvasHeight / 2);
  ctx.rotate(this.angle);
  ctx.fillStyle = frequencyMaxColor;
  ctx.beginPath();
  ctx.rect(0, 0, this.barWidth, this.barHeight + amplitude);
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvasWith, canvasHeight);
  ctx.restore();

}

function initFrequencyBar(nbBar, radius, direction, barWidth, barHeight, bars, barColor) {

  var step = Math.PI * 2 / nbBar;
  for (var i = 0; i < Math.PI * 2; i+=step) {
    // Random color for the circle
    if (barColor === 'RandomSet2') {
      barColor = color[1][getRandom(0, color[1].length)];
    }
    var bar = new FrequencyBar(radius, direction, barWidth, barHeight, barColor, i);
    // console.log(bar);
    bars.push(bar);
    // console.log(bars);
  }

}

/**
  Draw Triangle
  */

function Triangle() {

  this.x = getRandom(0, canvasWidth);
  this.y = getRandom(0, canvasHeight);
  this.angle = 0;
  this.scaleX = 0;
  this.scaleY = 0;

  Triangle.prototype.draw = function() {
    var size = 10;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, .14)';
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    // Centre triangle
    ctx.moveTo( -size/2, size/2);
    ctx.lineTo( 0, -size/2);
    ctx.lineTo( size/2, size/2);
    ctx.lineTo( -size/2, size/2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

}

function initTriangle() {

  for (var i = 0, c = 30; i < c; i++) {
    var triangle = new Triangle();
    triangles.push(triangle);
    // console.log(triangles);
  }

}

function renderTriangle() {

  for( var i = 0, c = triangles.length; i < c; i++) {
    var triangle = triangles[i];
    var scaleX = getRandom(1, 3);
    var scaleY = getRandom(1, 3);
    var angle = getRandom(0, Math.PI * 2);

    triangle.angle += ( angle - triangle.angle ) * .4;
    triangle.scaleX += ( scaleX - triangle.scaleX ) * .4;
    triangle.scaleY += ( scaleY - triangle.scaleY ) * .4;
    triangle.draw();
  }

}

initTriangle();

var visualisation1 = new Visualisation(20, 1.1, 10, 10, 15, 'Black', false);
var visualisation2 = new Visualisation(80, 1.2, 20, 5, 25, 'RandomSet1', false);
var visualisation3 = new Visualisation(150, 1.3, 30, 3, 30, 'RandomSet2', true);


/**
 * update
 * - Triggered on every TweenMax tick
 */
function frame() {

  rafId = requestAnimationFrame( frame )

  DELTA_TIME = Date.now() - LAST_TIME;
  LAST_TIME = Date.now();

  audioAnalyser.updateFrequencyData();

  ctx.clearRect( 0, 0, canvasWith, canvasHeight );

  visualisation3.draw(audioAnalyser, 180, false);
  visualisation2.draw(audioAnalyser, 250, false);
  visualisation1.draw(audioAnalyser, 300, true);
}

/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize( evt ) {

  canvasWith = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWith;
  canvas.height = canvasHeight;
  canvas.style.width = canvasWith + 'px'
  canvas.style.height = canvasHeight + 'px'

}

/**
  Load sound
  */

var audioAnalyser = new AudioAnalyser();
audioAnalyser.onloaded = function() {
  frame();
}

audioAnalyser.loadSound( './sounds/Mattia Vlad Morleo - Respiro.mp3' );

function getRandom(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;

}
