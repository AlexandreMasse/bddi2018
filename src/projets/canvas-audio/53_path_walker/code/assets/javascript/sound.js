
/**
*
* Screenshot function
*
*/

document.querySelector('.takeScreenShot').addEventListener('click', takeScreenShot)
var takeScreenShot = function() {
    html2canvas(document.getElementById("defaultCanvas0"), {
        onrendered: function (canvas) {
            var tempcanvas=document.createElement('canvas');
            tempcanvas.width=windowWidth;
            tempcanvas.height=windowHeight;
            var context=tempcanvas.getContext('2d');
            context.drawImage(canvas,0,0,windowWidth,windowHeight,0,0,windowWidth,windowHeight);
            var link=document.createElement("a");
            link.href=tempcanvas.toDataURL('image/jpg');
            link.download = 'screenshot.jpg';
            link.click();
        }
    });
}

/**
*
* Intro
*
*/
TweenMax.to('.start-exp', 0.8,
{
  opacity: 0,
  ease:Power1.easeIn,
})

TweenMax.set('.start-exp',
{
  css:{
      zIndex:-1
  },
  delay:0.8
})

  TweenMax.to('.title', 1,
  {
    opacity: 1,
    ease:Power0.easeNone,
    delay: 1.5
  })

  TweenMax.to('.tags', 1,
  {
    opacity: 1,
    ease:Power0.easeNone,
    delay: 3.3
  })

  TweenMax.to('.gobelins', 1,
  {
    opacity: 1,
    ease:Power0.easeNone,
    delay: 5.5
  })

  TweenMax.to('.title', 1,
  {
    opacity: 0,
    ease:Power0.easeNone,
    delay: 9.5
  })

  TweenMax.to('.tags', 1,
  {
    opacity: 0,
    ease:Power0.easeNone,
    delay:9.5
  })

  TweenMax.to('.gobelins', 1,
  {
    opacity: 0,
    ease:Power0.easeNone,
    delay:9.5
  })

  TweenMax.to('.advert-screenshot', 1,
  {
    opacity: 1,
    ease:Power0.easeNone,
    delay: 12
  })

  TweenMax.to('.advert-screenshot', 1,
  {
    opacity: 0,
    ease:Power0.easeNone,
    delay: 17
  })



window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

var canvasWith = window.innerWidth;
var canvasHeight = window.innerHeight;

/**
*
* Sound stuff
*
*/
var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST= 7;

var stepSize = 1;
var diameter = 1;

var direction;
var posX, posY;
var animationTimer = 0;

var bassTempo = 0
var clapTempo = 0
var kickTempo = 0
var pianoTempo = 0
var canvas;

/**
Time stuff
*/
var DELTA_TIME = 0;
var LAST_TIME = Date.now();

/**
Canvas stuff
*/
var canvas
var ctx


var opts = {
  sampleWidth: 10
}

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', '../assets/sounds/vision.mp3', true);
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
* addListeners
*/
function addListeners() {

  // window.addEventListener( 'resize', onResize.bind(this) );
  rafId = requestAnimationFrame( frame )

}

/**
* update
* - Triggered on every TweenMax tick
*/
function frame() {

  rafId = requestAnimationFrame( frame )

  DELTA_TIME = Date.now() - LAST_TIME;
  LAST_TIME = Date.now();

  analyser.getByteFrequencyData(frequencyData);

  var sampleWidth = opts.sampleWidth;
  var margin = 2;
  var nbSample = canvasWith / ( sampleWidth - margin );

  var cumul = 0;
  var average = 0;

  for ( var i = 0; i < nbSample; i++ ) {
    // get the frequency according to current i
    let percentIdx = i / nbSample;
    let frequencyIdx = Math.floor(1024 * percentIdx)

    cumul += frequencyData[frequencyIdx];

  }
  average = cumul / 255;

  draw(average)

  /**
  *
  * Anti overtriggering function
  *
  */

  bassTempo = bassTempo + DELTA_TIME
  clapTempo = clapTempo + DELTA_TIME
  kickTempo = kickTempo + DELTA_TIME
  pianoTempo = pianoTempo + DELTA_TIME
  animationTimer = animationTimer + DELTA_TIME

  if(animationTimer>103000){
      animationTimer = 0

      end()
  }

}

/**
* onResize
* - Triggered when window is resized
* @param  {obj} evt
*/
function onResize( evt ) {

  canvasWith = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWith
  canvas.height = canvasHeight
  canvas.style.width = canvasWith + 'px'
  canvas.style.height = canvasHeight + 'px'

}


/**
*
* P5 stuff
*
*/
loadSound()

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(244, 244, 244);
  smooth();
  noStroke();
  posX = width/2;
  posY = height/2;
}

function draw(average) {
    canvas.parent('container');
  for (var i=0; i<=average*2; i++) {
    direction = int(random(0,8));

    if (direction == NORTH) {
      posY -= stepSize;
    }
    else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    }
    else if (direction == EAST) {
      posX += stepSize;
    }
    else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    }
    else if (direction == SOUTH) {
      posY += stepSize;
    }
    else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    }
    else if (direction == WEST) {
      posX -= stepSize;
    }
    else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if(bassTempo > 150){
      if(frequencyData[8]>=250 || frequencyData[11] > 230){
        bassTempo = 0

        TweenMax.fromTo('#defaultCanvas0', 0.1,
        {
          scale:1,
        },
        {
          scale: 1.03,
          yoyo: true,
          repeat: 1,
          ease:Power4.ease
        })
        c = color('rgba(4, 4, 112, 0.2)')
        fill(c);
        ellipse((posX+stepSize), posY+stepSize, average, average);
      }
    }

    if(clapTempo > 75){
      if(frequencyData[56] > 200){
        clapTempo = 0
        fill(89, 80, 35);
        ellipse((posX+stepSize), posY+stepSize, 3 + average/5, 3 + average/5);
      }
    }

    if(kickTempo > 200){
      if(frequencyData[506] > 50 && frequencyData[506] < 130){
        kickTempo = 0
        fill(7, 6, 176);
        ellipse((posX+stepSize), posY+stepSize, 3 + average/10, 3 + average/10);
      }
    }

    if(frequencyData[8]< 250 || frequencyData[11] < 230 && frequencyData[56] < 200 && frequencyData[506] < 130){
        d = color('rgba(217, 193, 85, 0.2)')
        fill(d);
        ellipse(posX+stepSize, posY+stepSize, 1, 1);
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;
  }
}

function end(){
    TweenMax.to('#defaultCanvas0', 0.5,
    {
      opacity: 0.3,
      ease:Power0.easeNone,
    })

    TweenMax.set('.endMessage', {
        css:{
            zIndex: 9999
        }
    })

    TweenMax.to('.endMessage', 1,
    {
      opacity: 1,
      ease:Power0.easeNone,
      delay: 0.5
    })

}
