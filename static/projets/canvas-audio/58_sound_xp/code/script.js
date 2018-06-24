/////////////////////////////////////////
//	
//			INITIALISATION
//
/////////////////////////////////////////

// Canvas
var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function() {
	canvas.width = this.innerWidth
	canvas.height = this.innerHeight
	draw();
}

// Raf polyfill
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var anim = 0; // Global count
var lastTime = Date.now(), timeleft = 0, now;

var spreadTarget, spreadAnim = {x: 0, y: 0};
var rotateAnim = 0;
var opacityAnim = 0;
var triangles = [], stepScaleFactor, stepAngle;

var control, analyser, average;

var hasKicked = false, kickTime = 0;

var spreadTarget;

var eases = [0.1, 0.05];

var drawCountTime = 0, drawAnim = 0;  

/////////////////////////////////////////
//
//			FUNCTIONS
//
/////////////////////////////////////////

// Multiple sound interface
function manageBuffers(){
	var select = document.querySelector("#change-music-select");
	var options = []; 
	for(i=0; i < buffers.length; i++) {
		options.push(document.createElement('option'));
		options[i].value = i;
		options[i].innerHTML = buffers[i].name;
		select.appendChild(options[i])
	}
	select.addEventListener("change", function(){
		analyser.select(parseInt(this.value));
	}, false)

}

// Manage fullScreen toggle
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

// Draw triangles
function draw(nbTriangles){
	context.clearRect(0,0,canvas.width, canvas.height);

	for (var i = 0; i < nbTriangles; i++){
		triangles.push(new Polygon({
			// Number of points per polygon
			nbPoints: store.side.val,

			// Each coord are shift more and more of the center thanks to spread
			x: canvas.width/2 + Math.cos(stepAngle*i)*spreadAnim.x, 
			y: canvas.height/2 + Math.cos(stepAngle*i)*spreadAnim.y, 

			// Each polygon is rotate & scale more and more in function of his rank.   
			rotate: rotateAnim/store.polygons.val*i + anim*3, // anim*3 create a global rotation of the scene
			scale: store.scale.max-(stepScaleFactor*i),		
			size:  store.polygons.val + average*2,
			alpha: opacityAnim/nbTriangles*(i+1)
		}))

		// Display the polygon
		triangles[i].render(context);
	}
} 

// Manage drawType switch (Point or Triangles)
function drawTypeUpdate(delta){
	drawCountTime += delta; 

	if( drawCountTime > store.drawType.duration ) {
		drawCountTime = 0; 

		// Toggle the drawing type with transitions
		switch ( store.drawType.val ) {
			case LINE_DRAW : 
			store.drawType.val = LINE_POINT_DRAW; break;
			case LINE_POINT_DRAW : 
			store.drawType.val = POINT_DRAW; break;
			case POINT_DRAW : 
			store.drawType.val = POINT_LINE_DRAW; break;
			case POINT_LINE_DRAW : 
			store.drawType.val = LINE_DRAW; break;
		}

		store.drawType.duration = DRAW_ANIM_DURATIONS[store.drawType.val] 
	}
}

// Manage button fullscreen
function manageFullScreen() {
	var btn = document.querySelector("#button-fullscreen");
	btn.addEventListener("click", function(){
		toggleFullScreen()
	}, false)
}

// Generate the next number of side of the polygon
function genRandomSide(){
	valueGen = Math.random() > 0.7 ? 1 : -1; 
	if(valueGen == -1 && store.side.val == 3) valueGen *= -1;
	store.side.val += valueGen;
	return store.side.val
}

// Generate random position of spread target origin
function genSpreadTarget(){
	spreadTarget = {
		x: Math.random()*400 - 200,
		y: Math.random()*400 - 200
	}
}

// each raf, approach the spread target with ease
function approachSpreadCoord(){
	spreadAnim = {
		x: spreadAnim.x + (spreadTarget.x - spreadAnim.x) * 0.01,
		y: spreadAnim.y + (spreadTarget.y - spreadAnim.y) * 0.01
	}
}

// Manage sound cut button
function soundMuteManage(){
	var btn = document.getElementById('button-sound-mute');
	btn.addEventListener('click', function(){
		if(analyser.gain.gain.value === -1) {
			btn.className = btn.className.replace("button-sound-cut--mute", "button-sound-cut--sound");
			analyser.sound();
		} else {
			btn.className = btn.className.replace("button-sound-cut--sound", "button-sound-cut--mute");
			analyser.mute();
		}
	})
}


// Manage user activity and hide control after a time
function modeManage(){
	var lastMove = Date.now();
	var duration = 3000, timeout, active = true ;
	var nodes = document.querySelectorAll('.mode--active')
	timeout = setTimeout(function() {
		active = toggleMode(nodes, false);
	}, duration);
	window.addEventListener("mousemove", function(){
		lastMove = Date.now();
		if( !active ) active = toggleMode(nodes, true);
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			active = toggleMode(nodes, false);
		}, duration);
	})
}

function toggleMode(nodes, mode) {
	var toggles = mode === false ? ["mode--active", "mode--lite"] : ["mode--lite", "mode--active"];
	for(i=0; i<nodes.length; i++) {
		nodes[i].className = nodes[i].className.replace(toggles[0], toggles[1]);
	}
	return mode
}

/////////////////////////////////////////
//			RENDER
/////////////////////////////////////////

var render = function() {

	// Time manage
	now = Date.now();
	timeleft = now - lastTime
	lastTime = now
	anim += 0.1


	// Animation
	drawTypeUpdate(timeleft);
	drawAnim = drawCountTime/store.drawType.duration
	opacityAnim = (Math.cos(anim/10) + 1)/4 + 0.5
	rotateAnim = Math.cos(anim/20)*store.rotate.val;


	// ease approach of spread target 
	if(spreadTarget) approachSpreadCoord();

	// Kick match
	kickTime += timeleft
	if(hasKicked) hasKicked = false
	if(analyser.hasKicked(20, average) && kickTime > 1900) {
		hasKicked = true; 
		kickTime = 0;
	}

	// Sound data
	ease = analyser.average > 50 ? eases[1] : eases[0]
	average = analyser.getEaseFrequency(ease );

	// 
	stepScaleFactor = (store.scale.max-store.scale.min)/store.polygons.val; 
	stepAngle = Math.PI*2/store.polygons.val;

	if(hasKicked) {
		genSpreadTarget();
	}

	triangles = [];
	draw(Math.min(200, average * 2));

	requestAnimationFrame(render);
}



/////////////////////////////////////////
//	
//			LOADER 
//
/////////////////////////////////////////

var LoaderManage = {
	anim: 1000,

	// Display start btn
	set canStart(value) {
		if(value == true) this.button.className = this.button.className.replace("loader__button--hidden", "loader__button--visible");
	},

	// Display / Hide loader
	hideLoader: function(){
		var self = this;
		this.loader.className = this.loader.className.replace("loader--visible", "loader--hidding");
		setTimeout(function(){
			self.loader.className = self.loader.className.replace("loader--hidding", "loader--hidden");
		}, this.anim)
		this.raf
	},
	displayLoader: function(){
		var self = this;
		this.loader.className = this.loader.className.replace("loader--hidden", "loader--hidding");
		setTimeout(function(){
			self.loader.className = self.loader.className.replace("loader--hidding", "loader--visible");
		}, this.anim)
	},

	// Init start click 
	initEvents: function(){
		var self = this;
		this.button.addEventListener("click", function() {
			// Start the sound
			setTimeout(function(){
				analyser.playCurrent();
			}, 500);
			self.hideLoader();
		})
	},

	init: function(){
		this.loader = document.getElementById('loader'); 
		this.button = document.getElementById("loader__button");
		this.stopBtn = document.getElementById("stop__button");
		this.initEvents();
	}
}



window.addEventListener("load", function(){
	LoaderManage.init();	
	analyser = new SoundAnalyser(buffers, {
		onload: function(){
			LoaderManage.canStart = true;
		}
	})
	control = new GlobalControl("#global-control", store);
	requestAnimationFrame(render);
	manageFullScreen();
	manageBuffers();
	soundMuteManage()	
	modeManage();
}, false)


