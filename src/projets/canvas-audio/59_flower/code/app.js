function app() {
  this.DELTA_TIME = 0;
  this.LAST_TIME = Date.now();

  this.currentTime = 0;
  this.kickTimeStamp = 0;
  this.snareTimeStamp = 0;

  this.hasKicked = false;
  this.hasSnared = false;

  this.alphaAnim = false;

  this.triangles = [];
  this.trianglesAlphas = [];

  this.randomRadius;
  this.alpha = 0;
  this.audioCrtTime = 0;
  this.colors = colorPicker();
  document.querySelector('body').style.backgroundColor = '#'+this.colors[0];
  this.audioAnalyser = new audioManager('./sound3.mp3');
  this.canvasWidth = window.innerWidth;
  this.canvasHeight = window.innerHeight;
  this.petalsRotation = 0;
  this.time = 0;

  this.initCanvas();
  this.onResize();
  window.addEventListener('resize', this.onResize.bind(this))
  this.update();
}

app.prototype = {
  initCanvas: function() {
      this.canvas = document.querySelector('canvas')
      this.ctx = this.canvas.getContext('2d')
  },

  onResize: function(e) {

      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;

      this.canvas.width = this.canvasWidth
      this.canvas.height = this.canvasHeight
      this.canvas.style.width = this.canvasWith + 'px'
      this.canvas.style.height = this.canvasHeight + 'px'

  },

  createTriangle: function() {
    var direction = Math.floor(Math.random()*2-1);
    if (direction == 0) {
      direction = 1;
    }

    var minRadius = Math.random()*100+20;
    var maxRadius = Math.random()*180+150;

    var startAngle = 0;
    stepAngle = Math.PI/3;

    this.alpha = Math.random()*0.65+0.15;
    var angleRandom = Math.random()*(stepAngle)
    var offsetAngle = (Math.random()*0.2+0.03)

    var beatAngleDiviser = Math.random()*3+4
    var rotationMultiplier = (Math.random()*15)*Math.PI/180

    if (offsetAngle > 0.2) {
      randomRadius = Math.random()*60+50;
    } else {
      randomRadius = Math.random()*60+200;
    }

    var colorIdx = Math.ceil(Math.random()*4)
    for (var i = Math.PI/3; i < Math.PI*2; i+=stepAngle) {
      var bigTriangle = new Shape({
        p1x: Math.cos(i+angleRandom)*minRadius,
        p1y: Math.sin(i+angleRandom)*minRadius,
        globalAlpha: this.alpha,
        color: this.colors[colorIdx],
        ctx: this.ctx,
        canvas: this.canvas,
        baseAngle: i,
        angleRandom: angleRandom,
        offsetAngle: offsetAngle,
        randomRadius: randomRadius,
        beatAngleDiviser: beatAngleDiviser,
        rotationMultiplier: rotationMultiplier,
        direction: direction,
        maxRadius: maxRadius,
      })

    bigTriangle.drawBigTriangle();
    this.triangles.push(bigTriangle);
    this.trianglesAlphas.push(this.alpha)
    }
    if (this.triangles.length > 186) {
    	this.triangles.splice(0,6);
      this.trianglesAlphas.splice(0,6);
    }
  },

  update: function() {    
    var rafId = requestAnimationFrame(this.update.bind(this))

		if(this.audioAnalyser.loaded) {
			this.audioCrtTime = this.audioAnalyser.audioCtx.currentTime;
		}

    if (this.audioCrtTime >= 14.5 && this.audioCrtTime < 58) {
      this.averageSnareLimit = 130;
      this.averageKickLimit = 0.99;
    } else if (this.audioCrtTime >= 58) {
      this.averageSnareLimit = 143.5;
      this.averageKickLimit = 0.99;
    } else if (this.audioCrtTime >= 0 && this.audioCrtTime < 14.5) {
      this.averageKickLimit = 0.8;
      this.averageSnareLimit = 99;
    }

    if (this.audioCrtTime > 65 && this.audioCrtTime < 65.1) {
      this.alphaAnim = true;
      this.currentTime = 0;
    } 

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    this.currentTime += this.DELTA_TIME;

    this.time += 0.0001;

    averageKick = this.audioAnalyser.kickFrequency;
    averageSnare = this.audioAnalyser.snareFrequency;
    average = this.audioAnalyser.averageFrequency*0.007;
    averageAll = this.audioAnalyser.averageAllFrequency*0.15;

    if (this.hasKicked == true) {
      this.kickTimeStamp += this.DELTA_TIME;

      if (this.kickTimeStamp >= 400) {
        this.hasKicked = false;
        this.kickTimeStamp = 0;
      }
    }

    if (averageKick > this.averageKickLimit && this.hasKicked == false) {
      this.hasKicked = true;
      this.petalsRotation = (Math.random()*25+10)*Math.PI/180;
    }
    

    if (this.hasSnared == true) {
      this.snareTimeStamp += this.DELTA_TIME;
      if (this.snareTimeStamp >= 1000) {
          this.hasSnared = false;
          this.snareTimeStamp = 0;
      }
    }

    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    if (this.triangles.length) {
    	for (var i = 0; i < this.triangles.length; i++) {
      	this.triangles[i].drawBigTriangle(average*this.triangles[i].direction/this.triangles[i].beatAngleDiviser, this.petalsRotation+this.triangles[i].rotationMultiplier, averageAll);
        
        if (this.currentTime < 1700 && this.alphaAnim == true) {
            // console.log(this.currentTime )
            this.triangles[i].globalAlpha = Easing.easeInOutQuad(this.currentTime, this.trianglesAlphas[i], 1-this.trianglesAlphas[i], 1700)
        } else {
            this.currentTime = 0;
            this.alphaAnim = false;
            this.triangles[i].globalAlpha =  this.trianglesAlphas[i];
        }
      }
    }


    //144
    if (averageSnare > this.averageSnareLimit && this.hasSnared == false) {
        this.hasSnared = true;
        this.createTriangle();

    }
  }
}

var app = new app();