// audio context 
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;


var audioFile = 'lorn-acid-rain.mp3';

var frequences = new Float32Array(256); // TODO: a mettre dans audio manager
/**
 *
 * Constantes
 *
 */
var EASING = 0.3;
var AVERAGEDROP = 70;
var DELTA_TIME = 0;
var LAST_TIME = Date.now();

/*
 * Time stuff
 */


/*
 * Canvas stuff
 */

var W = innerWidth;
var H = innerHeight;
var frameIndex = 0;
var lineBeginOffset = -40;

// Sound
var easeAverage = 0;
var noise = 0;

 // Sun
var sunGradient;
var sunEasingValue;
var scaleSun = 0;
var scaleSunCurrent = 0;

// Light
var lightEasingValue;
var iterationCount = 0;
var totalIterations = 25 * 60;

function Scene() {
  this.cv;
  this.ctx;
  this.ocv;
  this.octx;
  this.cvS;
  this.audioManager;
  this.audioData;
  this.freqLine;
  this.canyon;
  this.sun;
}

Scene.prototype = {
  init: function() {
    var self = this;
    this.cv = document.querySelector('canvas');
    this.ctx = this.cv.getContext('2d');
    this.ocv = document.createElement('canvas');
    this.octx = this.ocv.getContext('2d');
    this.onResize();

    // init frequency line
    this.freqLine = new FreqLine({
      w: W/2,
      h: H/4,
      lineWidth: 4,
      startOffset:-40,
      easeFactor:0.1
    });

    // init canyon
    this.canyon = new Canyon({
      x: 0,
      y: 0,
      octx: this.octx,
      ocv: this.ocv,
      zoom: 1.04,
      canyonLine: this.freqLine
    });

    // init sun
    this.sun = new Sun({
      x: W/2,
      y: H - H/3 - 60,
      r: W/10,
      nbPoints:60
    });
    this.sun.setPoints();

    // init sound
    this.audioManager = new AudioManager({
      onAudioRender: this.render.bind(this)
    });

    this.audioManager.load();
  },
  render: function() {
    window.addEventListener('resize', this.onResize.bind(this));
    rafId = requestAnimationFrame(this.frame.bind(this));
  },
  frame: function(ms) {
    var self = this;
    rafId = requestAnimationFrame(this.frame.bind(this))
    DELTA_TIME = Date.now() - LAST_TIME;
    LAST_TIME = Date.now();

    frameIndex++;

    this.audioManager.cumul = 0;
    this.audioData = this.audioManager.analyse();

    var freqAverage = this.audioManager.average(this.audioData);

    // Draw shapes
    this.ctx.clearRect(0,0,W,H);
    if(frameIndex > 10) {
      this.sun.draw(this.ctx, freqAverage);
    }
    this.canyon.draw(this.ctx, this.audioData, freqAverage, ms);
    this.ctx.restore();
    

  },
  onResize: function(evt) {
    this.cv.width = W;
    this.cv.height = H;
    this.cv.style.width = W + 'px'
    this.cv.style.height = H + 'px';
    this.ocv.width = W;
    this.ocv.height = H;
    this.ocv.style.width = W; + 'px'
    this.ocv.style.height = H; + 'px'

  }
}

/*
* Canvas visual objects
*/

// Frequency Line
function FreqLine(props) {
  this.w = props.w;
  this.h = props.h;
  this.lineWidth = props.lineWidth;
  this.startOffset = props.startOffset;
  this.easeFactor = props.easeFactor;
}

FreqLine.prototype = {
  draw: function(ctx, audioData) {
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.lineTo(-W / 2, this.startOffset);
    for (var i = 0; i < audioData.length; i += 2) {
      var index = i < audioData.length / 2 ? i : audioData.length - 1 - i; // on parcours le tableau dans l'autre sens quand on atteint la moitié de audioData.length
      // get the frequency according to current i
      frequences[index] += (audioData[index] - frequences[index]) * this.easeFactor;
      var v = 1 - frequences[index] / 256;
      ctx.lineTo((i / audioData.length - .5) * this.w, v * this.h * 0.8);
    }
    ctx.lineTo(W / 2, this.startOffset);
    ctx.stroke();
  }
}

// Canyon 
function Canyon(props) {
  this.x = props.x;
  this.y = props.y;
  this.octx = props.octx;
  this.ocv = props.ocv;
  this.zoom = props.zoom;
  this.canyonLine = props.canyonLine;
}

Canyon.prototype = {
  draw: function(ctx, audioData, audioAverage, ms) {

    // Clip canyon
    ctx.save();
    ctx.fillStyle = '#0e0e0e';
    ctx.translate(W / 2, H / 2);
    this.canyonLine.draw(ctx, audioData);
    ctx.lineTo(W / 2,H /2);
    ctx.lineTo(-W/2,H/2);
    ctx.closePath();
    ctx.fill();
    ctx.clip();
    ctx.translate(-W/2, -H/2);

    // reset canvas
    this.octx.fillStyle = 'rgba(14,14,14,0.03)';
    this.octx.fillRect(0, 0, W, H);

    // begin draw lines
    this.octx.save();
    this.octx.translate(W / 2, H / 2);

    // draw image 
    this.octx.drawImage(
      this.ocv,
      0, 0, W, H, -W / 2 * this.zoom, -H / 2 * this.zoom, W * this.zoom, H * this.zoom
    );

    this.octx.globalCompositeOperation = 'lighter';

    if (iterationCount < totalIterations) {
      lightEasingValue = Math.easeOutQuad(iterationCount, 10, 50 - 10, totalIterations);
    }

    this.octx.strokeStyle = 'hsl(335, ' + (56 + audioAverage * 0.5) + '%, ' + (54 + audioAverage * 0.2) + '%)'; // hsl(335, 56%, 54%)

    if ((frameIndex % 1) === 0) {
      this.canyonLine.draw(this.octx, audioData);
    }

    this.octx.globalCompositeOperation = 'source-over';

    this.octx.restore();

    ctx.drawImage(this.ocv, 0, 0);
  }
};


// Sun rising at the center
function Sun(props) {
  this.x = props.x;
  this.y = props.y;
  this.r = props.r;
  this.nbPoints = props.nbPoints;
  this.points = [];
}

Sun.prototype = {
  setPoints: function() {
    step = 2 * Math.PI / this.nbPoints;
    for (var i = this.nbPoints - 1; i >= 0; i--) {
      this.points.push(
        [
          this.r * Math.cos(i * step),
          this.r * Math.sin(i * step)
        ]
      );
    }
  },
  draw: function(ctx, audioAverage) {
    ctx.save();

    if (iterationCount < totalIterations) {
      if (frameIndex > 200) {
        sunEasingValue = Math.easeOutQuad(iterationCount, this.y + this.r*2, this.y - (this.y + this.r*2), totalIterations);
        iterationCount++;  
      } else {
        sunEasingValue = this.y + this.r*2;
      }
    }

    ctx.translate(this.x, sunEasingValue);

    // scale sun value
    if (iterationCount > (totalIterations * 0.75) && audioAverage > 50) {
      scaleSun = audioAverage/255;
    } else {
      scaleSun *= 0.9;
    }
    scaleSunCurrent += (scaleSun - scaleSunCurrent) * EASING;

    // Zoom
    ctx.scale(1 + scaleSunCurrent,1 + scaleSunCurrent);

    // Sun gradient
    sunGradient = ctx.createLinearGradient(this.r, -this.r, this.r, this.r*2);    
    sunGradient.addColorStop(0.000, 'rgba(252, 249, 150, 1.000)');
    sunGradient.addColorStop(0.301, 'rgba(229, 125, 63, 1.000)');
    sunGradient.addColorStop(1.000, 'rgba(203, 71, 125, 1.000)');
    
    // Fill with gradient
    ctx.fillStyle = sunGradient;

    ctx.shadowBlur=audioAverage * 0.8;
    ctx.shadowColor="rgba(203, 71, 125, 1.000)";
    ctx.beginPath();

    for (var i = this.points.length - 1; i >= 0; i--) {
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.translate(0, 0);
    ctx.fillStyle = '#000';  
    ctx.beginPath();
    ctx.shadowBlur=audioAverage * 0.05;
    ctx.shadowColor="#00";
    for (var i = 0; i < 15; i++) {
      ctx.fillRect(0, (this.y - this.r) + 40 + i * 20, W, (i + 1) * 2);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
} 

/**
 *
 * Audio
 *
 */
 function AudioManager(props) {
  this.audioCtx;
  this.audioBuffer;
  this.audioSource;
  this.analyser;
  this.frequencyData;
  this.frequences;
  this.onAudioRender = props.onAudioRender;
  this.cumul;
  this.easeAverage = 0;
 }

 AudioManager.prototype = {
   load: function(url) {
     var self = this;
     var request = new XMLHttpRequest();
     request.open('GET', audioFile, true);
     request.responseType = 'arraybuffer';

     // Decode asynchronously
     request.onload = function() {

       console.log('load sound');
       self.process(request.response);

     }
     request.send();
   },
   process: function(response) {
     var self = this;

     this.audioCtx = new AudioContext();
     this.analyser = this.audioCtx.createAnalyser();
     this.analyser.fftSize = 256;
     this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
     this.frequences = new Float32Array(256);

     this.audioCtx.decodeAudioData(response, function(buffer) {

       // success callback
       self.audioBuffer = buffer;

       // Create sound from buffer
       self.audioSource = self.audioCtx.createBufferSource();
       self.audioSource.buffer = self.audioBuffer;

       // connect the audio source to context's output
       self.audioSource.connect(self.analyser)
       self.analyser.connect(self.audioCtx.destination)

       // play sound
       self.audioSource.start();

       self.onAudioRender()

     }, function() {

       // error callback

     });
   },
   average: function(audioData) {
    for (var i = 0; i < audioData.length; i++) {
      this.cumul += audioData[i];
    }
    this.easeAverage += ((this.cumul / (audioData.length - 1)) - this.easeAverage) * EASING;
    return this.easeAverage;
  },
   analyse: function() {
    this.analyser.getByteFrequencyData(this.frequencyData);

    return this.frequencyData
   }
 };

/**
 *
 * Init
 *
 */
scene = new Scene();
scene.init();


/**
 *
 * Tools
 *
 */

// t: current iteration
// b: begin value
// c: change value
// d: total iterations
Math.easeOutQuad = function (t, b, c, d) {
  t /= d;
  return -c * t*(t-2) + b;
};



