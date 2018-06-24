$(document).ready(function(){
    $("#div").fadeOut(4000);
});

window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

// SOUND STUFF 

var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

/**
  Time stuff
*/
var TIME = 0
var DELTA_TIME = 0;
var LAST_TIME = Date.now();
var timeStamp = 0 // valeur
var starsInterval = 1000 // déclenche toutes les 10s

var x = 0
var y = 0

var simplex = new SimplexNoise(),
    value2d = simplex.noise2D(x, y)

/**
  Canvas stuff
*/
var canvas
var ctx

var opts = {
  barWidth: 10
}

function initCanvas() {
  canvas = document.querySelector('canvas')
  ctx = canvas.getContext('2d')
  onResize()
}


function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', './sounds/sound.mp3', true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {

    audioCtx.decodeAudioData(request.response, function(buffer) {

      // success callback
      audioBuffer = buffer;

      // Create sound from buffer
      audioSource = audioCtx.createBufferSource();
      audioSource.buffer = audioBuffer;

      // connect the audio source to context's output
      audioSource.connect( analyser )
      analyser.connect( audioCtx.destination )

      // play sound
      audioSource.start();

      addListeners()
      frame()

    }, function(){

      // error callback
      //
    });
  }
  request.send();
}

/**
* Stars
*/

var starsArray=[]
var shootingStarsArray = []
var starSize = 10
var nbStars = 150

var moon

function shootingStar(x, y, radius, targetx, targety, speed, opacity) {
  this.x = x
  this.y = y
  this.radius = radius
  this.targetx = targetx
  this.targety = targety
  this.speed = speed
  this.opacity = 1
}

shootingStar.prototype = {
  drawShootingStar: function(resetValues) {
      ctx.save()
      ctx.translate(this.targetx, this.targety)
      ctx.beginPath()
      this.x = resetValues
      this.y = resetValues
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.globalAlpha = this.opacity
      ctx.fillStyle= "rgba(255, 255, 255,"+this.opacity+")"
      ctx.fill();   
      ctx.closePath()
      ctx.restore()
  },
  fallShootingStar: function(resetValues) {
    this.targetx -=  2
    this.targety += 2
    if(this.opacity > 0) {
      this.opacity -= 0.003
    } else {
      this.opacity = 0
    }
  }
}

function Star(cx,cy, nbSpikes, outerRadius,innerRadius, displacement, color) {
    this.cx = cx
    this.cy = cy
    this.nbSpikes = nbSpikes
    this.outerRadius = outerRadius
    this.innerRadius = innerRadius
    this.displacement = displacement
    this.color = "white"
}

Star.prototype = {
    drawStar: function() {
        var rotation=Math.PI/2*3;
        var x=this.cx;
        var y=this.cy;
        var step=Math.PI/this.nbSpikes;

        ctx.save()
        ctx.beginPath();
        ctx.moveTo(this.cx,this.cy-this.outerRadius)

        for(i=0;i<this.nbSpikes;i++){
          x=this.cx+Math.cos(rotation)*this.outerRadius;
          y=this.cy+Math.sin(rotation)*this.outerRadius;
          ctx.lineTo(x,y)
          rotation+=step
          x=this.cx+Math.cos(rotation)*this.innerRadius;
          y=this.cy+Math.sin(rotation)*this.innerRadius;
          ctx.lineTo(x,y)
          rotation+=step
        }

        ctx.lineTo(this.cx,this.cy-this.outerRadius);
        ctx.closePath();
        ctx.lineWidth=2;
        ctx.strokeStyle=this.color;
        ctx.stroke();
        ctx.restore()
    },

    update: function(i, frqc) {
        this.displacement = simplex.noise2D(i + TIME, i + TIME) * 50
        this.outerRadius = (frqc/4) 
        this.innerRadius = (frqc/4)/2 
        this.cx += -0.1
    }
}


function Moon(x, y, radius, color, angle) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = "#ffffff"
  this.angle = angle
}

Moon.prototype = {
  drawMoon: function() {
      ctx.save()
      ctx.lineWidth = 2
      ctx.translate(0, 0)
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.fillStyle=this.color
      ctx.fill();   
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(this.x+(this.radius/2), this.y, this.radius, 0, Math.PI * 2, true)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
  },

  shake: function() {
      this.color = "#745EFF"
  }
}

// addListeners

function addListeners() {
  window.addEventListener( 'resize', onResize.bind(this) );
  rafId = requestAnimationFrame( frame )
}


// update

function frame() {
  rafId = requestAnimationFrame( frame )
  DELTA_TIME = Date.now() - LAST_TIME;
  LAST_TIME = Date.now();
  analyser.getByteFrequencyData(frequencyData);
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight )
  var cumul = 0;
  var average = 0;
  timeStamp += DELTA_TIME

  TIME += 0.005

  moon.drawMoon()

  for ( var i = 0; i < starsArray.length; i++ ) {
    let percentIdx = i / nbStars;  // between 0 and 1
    let frequencyIdx = Math.floor(1024 * percentIdx)    // nb between 0 and 1024
    starsArray[i].drawStar()
    starsArray[i].update(i, frequencyData[frequencyIdx])
    //starsArray[i].drawStar((canvasWidth/3)+i*20,(canvasHeight/3)+i*20,frequencyData[frequencyIdx]/3,(frequencyData[frequencyIdx]/3)/2)

    cumul += frequencyData[frequencyIdx];
  }

  average = cumul / 255;    // environ entre 0 et 100

  if(average > 50) {
      moon.color = "#EB92FE"
    for ( var i = 0; i < starsArray.length; i++ ) {
      starsArray[i].cx += 0    
      starsArray[i].outerRadius = 0    
      starsArray[i].innerRadius = 0 
    }
  } else {
    for ( var i = 0; i < starsArray.length; i++ ) {
      moon.color = "white"
    }
  }

  var canPlay = (timeStamp > starsInterval)

  firstStars()

  // if (average > 30 && canPlay) {
  //   timeStamp = 0
  //   secondStars()
  // }
}

function firstStars() {
  for (var i = 0; i < 10; i++) {
    resetValues = 1
    shootingStarsArray[i].drawShootingStar(resetValues)
    shootingStarsArray[i].fallShootingStar(resetValues)
  }
}

function init() {
    for (var i = 0; i < nbStars; i++) {
        randx = Math.floor(Math.random() * canvasWidth * 5)
        randy = Math.floor(Math.random() * canvasHeight/3)
        var starNew = new Star(randx, randy, 5, starSize, starSize/2)
        starsArray.push(starNew)
        //starsArray[i].drawStar()
    }
    moon = new Moon(canvasWidth-(canvasWidth/10), canvasHeight/10, 50)

    for (var i = 0; i < 100; i++) {
      randx = Math.floor(Math.random() * canvasWidth)
      shootingStarNew = new shootingStar(randx, 0, 3, randx+15, 15)
      shootingStarsArray.push(shootingStarNew)
    }
}

/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize( evt ) {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'
}
initCanvas()
loadSound()
init()

    //ctx.rect(i * barWidth + ( i * margin ), canvasHeight - frequencyData[frequencyIdx] , barWidth, frequencyData[frequencyIdx] );
    //ctx.arc((canvasWidth/2)+(Math.cos(i) * (canvasHeight/3)), (canvasHeight/2)+(Math.sin(i) * (canvasHeight/3)), frequencyData[frequencyIdx]/3, 0, 2*Math.PI)

