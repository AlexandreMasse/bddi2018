/////////////////////////////////////////
//  
//          INITIALISATION
//
/////////////////////////////////////////

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.onresize = function() {
    canvas.height = window.innerHeight
	canvas.width = window.innerWidth

	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
}


/////////////////////////////////////////
//              VARIABLES   
/////////////////////////////////////////

var start = false
var end = false 
var canvasClasses = document.querySelector("canvas").classList;
var opacity = 0.5

// Sounds
var hasKicked = false
var drop = false
var silence = false
var average = 0
var averageKick = 0
//Silence
var firstSilenceB = 74
var firstSilenceE = 76
var secondSilenceB = 154.5
var secondSilenceE = 156.5
//Drop 
var firstDropB = 76
var firstDropE = 94
var secondDropB = 156.5
var secondDropE = 183
var endTime = 193

//Blob
var time = 0;
var pointsArr = [];
var nbPoints = 70;
var baseRayon = canvasWidth / 10;
var step = Math.PI*2/nbPoints;

//Particles 
var nbParticles = canvasWidth / 60
var linkDist = canvasWidth / 12

// Lines
var nbSuperLines = 9;
var nbLines = 100;
var linesfrequences = new Float32Array(1024);
var linelength = 30;

// SimplexNoise
var simplex = new SimplexNoise();


/////////////////////////////////////////
//         TWEEN VARIABLES   
/////////////////////////////////////////

var content = document.querySelector(".content")
var container = document.getElementById("container")
var title = document.querySelector("h1")
var tl = new TimelineMax({delay:0, repeat:0});



/////////////////////////////////////////
//              AUDIO   
/////////////////////////////////////////

window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

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
/**
 Time stuff
 */
var DELTA_TIME = 0;
var LAST_TIME = Date.now();
var timeStamp = 0





/////////////////////////////////////////
//              BLOB   
/////////////////////////////////////////



function Point (opts) {
    this.position = [];
    this.ctx = opts.ctx;
    this.rank = opts.rank;
    this.angle = opts.angle;
    this.radius = baseRayon;
    this.trigo = [];
    this.calcPosition();
}

Point.prototype = {
    update: function(time){
        this.radius = simplex.noise3D(this.trigo[0], this.trigo[1], time)*average*2.3 + canvasWidth/8 ;
        if(hasKicked) {
            this.radius = simplex.noise3D(this.trigo[0], this.trigo[1], time)*average*2.5 + canvasWidth/5;
            setTimeout(function(){
                hasKicked = false
            },100)
        }
        this.calcPosition();
    },
    render: function() {
        this.ctx.save()
        this.ctx.globalAlpha = 0
        this.ctx.beginPath()
        this.ctx.translate(this.position[0], this.position[1])
        this.ctx.arc(0, 0, 0, 0, Math.PI * 2)
        this.ctx.closePath()
        this.ctx.restore()
    },

    calcPosition: function() {
        this.trigo = [
            Math.cos(this.angle),
            Math.sin(this.angle)
        ]
        this.position[0] = this.radius * this.trigo[0] + canvas.width/2 ;
        this.position[1] = this.radius * this.trigo[1] + canvas.height/2;
    },

    drawLines: function() {
        this.ctx.save()
        if(start == false) {
        	this.ctx.globalAlpha = 0
        }
        this.ctx.beginPath()
        this.ctx.moveTo(pointsArr[0].position[0], pointsArr[0].position[1])

        for(var i = 0; i<pointsArr.length; i++){
            this.ctx.lineTo(pointsArr[i].position[0], pointsArr[i].position[1])
        }
        this.ctx.lineWidth = (average/4) * Math.random()
        if(drop == false) {
            this.ctx.strokeStyle = getKnownColors()
        } else if (drop == true){
            this.ctx.strokeStyle = "rgb("+[
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255)
                    ].join(',')+")"
        }
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.restore()
    }
}



//Generate the blob
for ( var i = 0; i < nbPoints ; i++) {

    var point = new Point({
        ctx: ctx,
        rank: i,
        angle: step*i
    })

    pointsArr.push(point)
}


/////////////////////////////////////////
//              PARTICLES   
/////////////////////////////////////////


var particles = []
var Particle = function (opts) {
    this.position = vec2.fromValues(opts.x, opts.y)
    this.radius = 0.5

    var vx = Math.random() * 2 - 1
    var vy = Math.random() * 2 - 1
    this.velocity = vec2.fromValues(vx, vy)
}

Particle.prototype = {
    update: function() {
        vec2.add(this.position, this.position, this.velocity, this.color)

    },
    render: function(ctx, particles) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1])
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, Math.PI*2)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.closePath()
        ctx.restore()

        if(hasKicked) {
            for (var i = 0; i < particles.length; i++) {
                var distance = Math.sqrt(Math.pow(this.position[0] - particles[i].position[0], 2) + Math.pow(this.position[1] - particles[i].position[1], 2))
                let opacity = 1 - (distance / linkDist);
                if (opacity > 0) {
                    ctx.lineWidth = 0.25;
                    ctx.beginPath();
                    ctx.moveTo(this.position[0], this.position[1]);
                    ctx.lineTo(particles[i].position[0], particles[i].position[1]);
                    ctx.closePath();
                    if(drop == false) {
                        ctx.strokeStyle = 'rgba(134, 221, 178, 1)'
                    } else {
                        ctx.strokeStyle = "rgb("+[
                                    Math.floor(Math.random() * 255),
                                    Math.floor(Math.random() * 255),
                                    Math.floor(Math.random() * 255)
                                ].join(',')+")"
                    }
                    ctx.stroke();
                }
            }
        }
    }

}



// Generate all particles

for ( var i = 0; i < nbParticles; i++) {
    var particle= new Particle({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
    })
    particles.push(particle)
}





/////////////////////////////////////////
//              PULSE   
/////////////////////////////////////////

var Pulse = function (opts) {
    this.position = []
    this.radius = canvasWidth/14
    this.calcPosition();
}

Pulse.prototype = {
    update: function() {
        this.calcPosition();
    },
    render: function(ctx) {
        ctx.save()
        if(start == false) {
        	ctx.globalAlpha = 0
        }
        ctx.translate(this.position[0], this.position[1])
        ctx.beginPath()
        if(drop==false) {
            ctx.arc(0, 0, average * 3, 0, Math.PI * 2)
        } else {
            ctx.arc(0, 0, average * 4, 0, Math.PI * 2)
        }
        if(drop == false) {
            ctx.strokeStyle = getKnownColors()
        } else {
            ctx.strokeStyle = "rgb("+[
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255),
                        Math.floor(Math.random() * 255)
                    ].join(',')+")"
        }
        ctx.lineWidth = average/4
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    },
    calcPosition: function() {
        if(hasKicked){
            this.position[0] = canvasWidth/2 + (Math.random()*10-9)
            this.position[1] = canvasHeight/2+ (Math.random()*10-9)
        } else {
            this.position[0] = canvasWidth/2;
            this.position[1] = canvasHeight/2;
        }
    }

}

var pulse = new Pulse({
    x: canvasWidth/2,
    y: canvasHeight/2,
})



/////////////////////////////////////////
//              CIRCLE   
/////////////////////////////////////////

var Circle = function (opts) {
    this.position = []
    this.radius = canvasWidth
    this.calcPosition();
}

Circle.prototype = {
    update: function() {
        this.calcPosition();
    	{
    		if(this.radius> 3){
    			this.radius -= 4
    		}
    		else{
    			this.radius = 0
    			start = true
    		}
    	}
    },
    render: function(ctx) {
        ctx.save()
        ctx.translate(this.position[0], this.position[1])
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2) 
        ctx.strokeStyle = getKnownColors()
        ctx.lineWidth = 4
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    },
    calcPosition: function() {
        this.position[0] = canvas.width/2;
        this.position[1] = canvas.height/2;
    }

}

var circle = new Circle({
    x: canvasWidth/2,
    y: canvasHeight/2,
})



/////////////////////////////////////////
//        RENDERING FUNCTION   
/////////////////////////////////////////


function frame() {

    ctx.fillStyle = 'rgba(0,0,0, .1)'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    ctx.fill()

    //For points - blob
    time += 0.01;




    /////////////////////////////////////////
    //            AUDIO CHECK  
    /////////////////////////////////////////
    DELTA_TIME = Date.now() - LAST_TIME;
    LAST_TIME = Date.now();

    analyser.getByteFrequencyData(frequencyData);

    var cumul = 0;

    for ( var i = 0; i < pointsArr.length; i++ ) {

        // get the frequency according to current i
        let percentIdx = i / pointsArr.length;
        let frequencyIdx = Math.floor(1024 * percentIdx)

        cumul += frequencyData[frequencyIdx];

    }

    average = cumul / 255;


    checkKick()

    checkSilence()

    checkDrop()

    renderElements()

    if(audioCtx.currentTime >= endTime) {
    	end = true
    }


    //////////////////////////////////////////////////////
    // TWEEN ANIMATIONS 
    /////////////////////////////////////////////////////
    if(end == true) {
    	if (!canvasClasses.contains("disappear")) 
    	{
    		container.style.display = "block"
            content.style.display = "block"
 			canvasClasses.add("disappear");
 			tl.from(container, 1, {opacity:0, yPercent:100, ease:Power4.easeOut})
 			tl.from(title, 1, {opacity:0, y:-40, ease:Power4.easeOut})
            tl.staggerFrom(".social", 1.5, {scale:0.5, opacity:0, ease:Elastic.easeOut, force3D:true}, 0.2)

		}
    }

    /*button.addEventListener("click", function(){
	if (!canvasClasses.contains("disappear")) 
	    {
			canvasClasses.remove("disappear");
			tl.to(container, 1, {opacity:0, x:4000, ease:Power4.easeOut})
		}
		
		
	})*/

	/*
	var btn = document.querySelector('.button')
	btn.addEventListener('click', function() {
		launchApp()
	})*/



    requestAnimationFrame(frame)
}


loadSound();


/////////////////////////////////////////
//        FUNCTIONS
/////////////////////////////////////////

//Sounds
function checkSilence() {
	if((audioCtx.currentTime > firstSilenceB && audioCtx.currentTime <= firstSilenceE) || (audioCtx.currentTime > secondSilenceB && audioCtx.currentTime <= secondSilenceE)) {
        silence = true;
    }
    else {
        silence = false
    }
}

function checkKick() {
    averageKick = frequencyData[5]/ 255;
    if(averageKick >= 1)

        if(hasKicked == true) {
            timeStamp += DELTA_TIME

            if(timeStamp > 500){
                hasKicked = false
                timeStamp = 0
            }
        }

    if(averageKick == 1 && hasKicked == false){
        hasKicked = true
    }
}

function checkDrop() {

    if((audioCtx.currentTime > firstDropB && audioCtx.currentTime < firstDropE) || (audioCtx.currentTime > secondDropB && audioCtx.currentTime < secondDropE)) {
        drop = true
        linkDist = canvasWidth / 7
    } else if( (audioCtx.currentTime >= firstDropE && audioCtx.currentTime <= secondDropB ) || audioCtx.currentTime >= secondDropE) {
        drop = false
        linkDist = canvasWidth / 11
    }
}


//Colors
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getKnownColors() {
    var colors = ['#7B2A3B', '#E57661', '#F8C58C', '#F8E7A2'];
    return color = colors[Math.floor(Math.random() * colors.length)];
}


function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', 'audio/overthrow.mp3', true);
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
            if(audioCtx.state = 'running'){
                frame()
            }


        }, function(){

            // error callback
            //
        });
    }
    request.send();
}

function generateLines() {
	var easing = 0.01;

    ctx.save();
    ctx.strokeStyle = getRandomColor();
    ctx.lineWidth = 3
    if(silence == true) {
        for (var j = 0; j < nbSuperLines; j++) {
            ctx.beginPath();
            for (var i = 0; i < nbLines; i++) {
                var percentIdx = i / (nbLines*6);
                var frequencyIdx = Math.floor(1024* percentIdx);
                linesfrequences[frequencyIdx] += (this.frequencyData[frequencyIdx] - linesfrequences[frequencyIdx]) * easing;
                //ctx.lineTo(i * linelength, (canvasHeight/2 - linesfrequences[frequencyIdx]) * 1.2);

                ctx.lineTo(i * linelength, (canvasHeight/8 * (j + 1) - linesfrequences[frequencyIdx]));

                //ctx.lineTo(linesfrequences[frequencyIdx] + (canvasWidth / 40) * (j + 1), i * linelength);

            }
            ctx.stroke();
        }
        //ctx.stroke();
        ctx.restore();
    }
}


function renderElements() {
 
    if(silence == false) {
    	/*
        	RENDERING BLOB 
    	*/
        for (var i = 0; i < pointsArr.length; i++) {
            pointsArr[i].update(time)
            pointsArr[i].render()
        }
        point.drawLines()
        if(start == true) {
        	point.ctx.globalAlpha = 1
        }

        /*
            RENDERING CIRCLE
        */
        circle.update()
        circle.render(ctx)

        /*
            RENDERING PULSE
        */
        pulse.update()
        pulse.render(ctx)

        /*
            RENDERING PARTICLES
        */
        for (var i = 0; i < particles.length; i++) {

            if (particles[i].position[0] > canvasWidth || particles[i].position[0] < 0) {
                particles[i].velocity[0] *= -1

            }
            else if (particles[i].position[1] > canvasHeight || particles[i].position[1] < 0) {
                particles[i].velocity[1] *= -1
            }

            particles[i].update()
            particles[i].render(ctx, particles)

        }




    }

    /* 
    	RENDERING LINES ON SILENCE 
    */
    generateLines()

}
