webpackJsonp([0],[,function(i,t,e){"use strict";function n(i){return i&&i.__esModule?i:{default:i}}function s(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function i(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),r=e(6),a=n(r),h=e(5),c=n(h),l=e(7),u=e(4),d=n(u),f=e(0),y=function(i){if(i&&i.__esModule)return i;var t={};if(null!=i)for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t.default=i,t}(f),p=function(){function i(){s(this,i),this.nbCylindre=6,this.nbGroup=15,this.nbLine=5,this.groupWidth=4,this.spiralePositionRadius=20,this.circlePositionRadius=19,this.colorSpeed=.3,this.isCirclePosition=!0,this.isLinePosition=!1,this.isSpiralePosition=!1,this.isSpiralePositionFinish=!1,this.groupArray=[],this.lineArray=[],this.averageData=[],this.spiralePositionRadiusOnKick=0,this.time=Date.now()/1e3,this.incrementColor=0,this.nbCylindreSlider=document.getElementById("nb-cylindre"),this.nbGroupSlider=document.getElementById("nb-group"),this.nbLineSlider=document.getElementById("nb-line"),this.groupWidthSlider=document.getElementById("group-width"),this.spiralePositionRadiusSlider=document.getElementById("spirale-radius"),this.circlePositionRadiusSlider=document.getElementById("circle-radius"),this.colorSpeedSlider=document.getElementById("color-speed"),this.circlePositionRadio=document.getElementById("circle-position"),this.spiralePositionRadio=document.getElementById("spirale-position"),this.linePositionRadio=document.getElementById("line-position"),this.introContainer=document.getElementById("intro-container"),this.introBegin=document.getElementById("intro-begin"),this.introCircles=document.querySelectorAll(".circle"),this.introProgress=document.getElementById("intro-progress"),this.creditLink=document.querySelectorAll("#credits-container a"),this.creditSpan=document.querySelectorAll("#credits-container span"),console.log(this.creditSpan),this.initOption(),this.initContainer(),this.initCamera(),this.initScene(),window.scene=this.scene,window.THREE=y,this.initLight(),this.initRenderer(),this.initControl(),this.initEvent(),this.onWindowResize(),this.createCylinder(),this.initAudio()}return o(i,[{key:"render",value:function(){if(this.time=Date.now()/1e3,this.incrementColor+=1,!1===this.audio.isPlaying){this.introProgress.innerText=Math.floor(100*this.audio.progress)+"%";for(var i=0;i<this.introCircles.length;i++){var t=this.introCircles[i],e=Math.floor(360/this.introCircles.length*i+2*this.incrementColor);t.style.borderColor="hsl( "+e+", 70%, 50%)",Math.floor(10*this.audio.progress)>=-i+(this.introCircles.length-1)&&(t.style.opacity="1")}}for(var n=0;n<this.creditLink.length;n++){var s=this.creditLink[n],o=Math.floor(360/this.creditLink.length*n+-.2*this.incrementColor);s.style.color="hsl( "+o+", 70%, 50%)"}var r=this.audio.getSpectrum();this.averageData=this.getAverageData(r),this.updateCylinder(this.time,this.averageData),this.isSpiralePositionFinish&&this.updateSpiralePosition(this.time),this.renderer.render(this.scene,this.camera)}},{key:"initOption",value:function(){this.nbCylindreSlider.value=this.nbLineSlider,this.nbGroupSlider.value=this.nbGroup,this.nbLineSlider.value=this.nbLine,this.groupWidthSlider.value=this.groupWidth,this.spiralePositionRadiusSlider.value=this.spiralePositionRadius,this.circlePositionRadiusSlider.value=this.circlePositionRadius,this.colorSpeedSlider.value=this.colorSpeed,this.circlePositionRadio.checked=this.isCirclePosition,this.linePositionRadio.checked=this.isLinePosition,this.spiralePositionRadio.checked=this.isSpiralePosition}},{key:"initContainer",value:function(){this.container=document.querySelector("#main"),document.body.appendChild(this.container)}},{key:"initCamera",value:function(){this.camera=new y.PerspectiveCamera(85,window.innerWidth/window.innerHeight,.1,1e4),this.camera.position.x=0,this.camera.position.y=70,this.camera.rotation.z=0}},{key:"initScene",value:function(){this.scene=new y.Scene,this.scene.background=new y.Color("black")}},{key:"initLight",value:function(){this.directionalLight=new y.DirectionalLight(16777215,1),this.scene.add(this.directionalLight)}},{key:"initHelper",value:function(){var i=new y.AxisHelper(50),t=new y.GridHelper(100,10);this.scene.add(i,t)}},{key:"initEvent",value:function(){var i=this;window.addEventListener("resize",this.onWindowResize.bind(this),!1),window.addEventListener("keydown",this.onKeyDown.bind(this)),this.introBegin.addEventListener("click",function(){i.audio.play(),i.introContainer.style.display="none"}),this.nbCylindreSlider.addEventListener("change",function(){i.nbCylindre=Number(i.nbCylindreSlider.value),i.createCylinder()}),this.nbGroupSlider.addEventListener("change",function(){i.nbGroup=Number(i.nbGroupSlider.value),i.createCylinder()}),this.nbLineSlider.addEventListener("change",function(){i.nbLine=Number(i.nbLineSlider.value),i.createCylinder()}),this.groupWidthSlider.addEventListener("change",function(){i.groupWidth=Number(i.groupWidthSlider.value),i.createCylinder()}),this.spiralePositionRadiusSlider.addEventListener("change",function(){i.spiralePositionRadius=Number(i.spiralePositionRadiusSlider.value),i.isSpiralePosition&&i.setSpiralePosition()}),this.circlePositionRadiusSlider.addEventListener("change",function(){i.circlePositionRadius=Number(i.circlePositionRadiusSlider.value),i.isCirclePosition&&i.setCirclePosition()}),this.colorSpeedSlider.addEventListener("change",function(){i.colorSpeed=Number(i.colorSpeedSlider.value)}),this.circlePositionRadio.addEventListener("change",function(){i.circlePositionRadio.checked?(i.isCirclePosition=!0,i.setCirclePosition()):i.isCirclePosition=!1}),this.linePositionRadio.addEventListener("change",function(){i.linePositionRadio.checked?(i.isLinePosition=!0,i.setLinePosition()):i.isLinePosition=!1}),this.spiralePositionRadio.addEventListener("change",function(){i.spiralePositionRadio.checked?(i.isSpiralePosition=!0,i.setSpiralePosition()):i.isSpiralePosition=!1})}},{key:"initRenderer",value:function(){this.renderer=new y.WebGLRenderer({antialias:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.container.appendChild(this.renderer.domElement),this.renderer.animate(this.render.bind(this))}},{key:"initControl",value:function(){var i=e(8)(y);this.controls=new i(this.camera,this.renderer.domElement),this.controls.enableKeys=!1}},{key:"createCylinder",value:function(){for(;this.scene.children.length>0;)this.scene.remove(this.scene.children[0]);this.lineArray=[];for(var i=0;i<this.nbLine;i++){this.groupArray=[];for(var t=0;t<this.nbGroup;t++){var e=new d.default(this.nbCylindre,this.groupWidth),n=e.getCylinderGroup();this.scene.add(n),this.groupArray.push(n)}this.lineArray.push(this.groupArray)}console.log(this.groupArray),console.log(this.lineArray),this.isLinePosition&&this.setLinePosition(),this.isCirclePosition&&this.setCirclePosition(),this.isSpiralePosition&&this.setSpiralePosition()}},{key:"initAudio",value:function(){var i=this;this.audio=new c.default(a.default,94,5,function(){i.introBegin.style.display="block",i.introProgress.style.display="none"},!1),this.kick=this.audio.createKick({frequency:2,treshold:250,decay:0,onKick:function(){i.scene.background=new y.Color(1,1,1);for(var t=0;t<i.creditSpan.length;t++){i.creditSpan[t].style.color="black"}if(i.spiralePositionRadiusOnKick=30,i.isCirclePosition)for(var e=0;e<i.nbLine;e++)for(var n=i.lineArray[e],s=0;s<i.groupArray.length;s++)!function(t){var s=n[t];l.TweenMax.to(s.position,.5+e/i.nbLine*.3,{ease:l.Quad.easeIn,y:6.5*(-e+i.nbLine),onComplete:function(){l.TweenMax.to(s.position,.25,{ease:l.Power1.easeOut,y:0})}})}(s);if(i.isLinePosition)for(var o=0;o<i.nbLine;o++)for(var r=i.lineArray[o],s=0;s<i.groupArray.length;s++)!function(t){var e=r[t];l.TweenMax.to(e.position,.5+t/i.nbGroup*.3,{ease:l.Quad.easeIn,y:5*(-t+i.nbGroup),onComplete:function(){l.TweenMax.to(e.position,.25,{ease:l.Power1.easeOut,y:0})}})}(s)},offKick:function(){i.scene.background=new y.Color(0,0,0);for(var t=0;t<i.creditSpan.length;t++){i.creditSpan[t].style.color="white"}i.spiralePositionRadiusOnKick=0}}),this.audio.onceAt("kick begin",30.6,function(){i.kick.on()})}},{key:"setLinePosition",value:function(){this.isLinePosition=!0,this.isCirclePosition=!1,this.isSpiralePosition=!1,this.isSpiralePositionFinish=!1;for(var i=0;i<this.nbLine;i++)for(var t=this.lineArray[i],e=0;e<this.groupArray.length;e++){var n=t[e];l.TweenMax.to(n.position,.7,{ease:l.Power1.easeOut,x:3*(-(this.nbGroup-1)*this.groupWidth/2+e*this.groupWidth),z:3*(-(this.nbLine-1)*this.groupWidth/2+i*this.groupWidth),y:0})}}},{key:"setCirclePosition",value:function(){this.isCirclePosition=!0,this.isLinePosition=!1,this.isSpiralePosition=!1,this.isSpiralePositionFinish=!1;for(var i=0;i<this.nbLine;i++)for(var t=this.lineArray[i],e=0;e<this.groupArray.length;e++){var n=t[e],s=2*Math.PI/this.nbGroup*e,o=this.circlePositionRadius;l.TweenMax.to(n.position,.7,{ease:l.Power1.easeOut,x:Math.sin(s)*o*(i+1)/2,z:Math.cos(s)*o*(i+1)/2,y:0})}}},{key:"setSpiralePosition",value:function(){var i=this;this.isSpiralePosition=!0,this.isCirclePosition=!1,this.isLinePosition=!1,this.isSpiralePositionFinish=!1;for(var t=0;t<this.nbLine;t++)for(var e=this.lineArray[t],n=0;n<this.groupArray.length;n++){var s=e[n],o=2*Math.PI/this.nbGroup*n,r=this.spiralePositionRadius;l.TweenMax.to(s.position,.7,{ease:l.Power1.easeOut,x:Math.sin(o+2*Math.PI/this.nbLine*t)*r,y:Math.cos(o+2*Math.PI/this.nbLine*t)*r,z:2*(-this.nbGroup*this.groupWidth/2+n*this.groupWidth),onComplete:function(){i.isSpiralePositionFinish=!0}})}}},{key:"updateSpiralePosition",value:function(i){for(var t=0;t<this.nbLine;t++)for(var e=this.lineArray[t],n=0;n<this.groupArray.length;n++){var s=e[n],o=2*Math.PI/this.nbGroup*n,r=this.spiralePositionRadius+this.spiralePositionRadiusOnKick;l.TweenMax.to(s.position,.7,{ease:l.Power1.easeOut,x:Math.sin(o+i+2*Math.PI/this.nbLine*t)*r,y:Math.cos(o+i+2*Math.PI/this.nbLine*t)*r,z:2*(-this.nbGroup*this.groupWidth/2+n*this.groupWidth)})}}},{key:"updateCylinder",value:function(i,t){for(var e=0;e<this.nbLine;e++)for(var n=this.lineArray[e],s=0;s<this.groupArray.length;s++)for(var o=n[s],r=0;r<this.nbCylindre;r++)o.children[r].scale.y=.001+3*t[r],o.children[r].material.color.setHSL(1/360*(360/this.nbGroup*s)+i*this.colorSpeed,.7,.3+t[r]/255)}},{key:"onWindowResize",value:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}},{key:"onKeyDown",value:function(i){"l"===i.key&&this.setLinePosition(),"c"===i.key&&this.setCirclePosition(),"s"===i.key&&this.setSpiralePosition()}},{key:"getAverageData",value:function(i){var t=[];i.slice(.05*Math.floor(i.length-1),Math.floor(.9*(i.length-1)));for(var e=0;e<this.nbCylindre;e++){for(var n=0,s=0,o=Math.floor((i.length-1)/this.nbCylindre*e),r=Math.floor((i.length-1)/this.nbCylindre*(e+1)),a=o;a<r;a++)s+=i[a];n=s/(r-o),t.push(n)}return t}}]),i}();t.default=p},function(i,t){},function(i,t,e){"use strict";e(2);var n=e(1),s=function(i){return i&&i.__esModule?i:{default:i}}(n);window.app=new s.default},function(i,t,e){"use strict";function n(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function i(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),o=e(0),r=function(i){if(i&&i.__esModule)return i;var t={};if(null!=i)for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t.default=i,t}(o),a=function(){function i(t,e){n(this,i),this.nbCylinder=t,this.groupWidth=e,this.cylinderGroup=new r.Group;for(var s=this.groupWidth/this.nbCylinder,o=1;o<=this.nbCylinder;o++){var a=new r.Color("hsl(320, 100%, 50%)"),h=new r.CylinderGeometry(s,s,.01,32,1,!0,0,2*Math.PI),c=new r.MeshBasicMaterial({color:a,side:r.DoubleSide}),l=new r.Mesh(h,c);this.cylinderGroup.add(l),s+=this.groupWidth/this.nbCylinder}}return s(i,[{key:"getCylinderGroup",value:function(){return this.cylinderGroup}}]),i}();t.default=a},function(i,t,e){"use strict";function n(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function i(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),o=function(){function i(t,e,s,o){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];n(this,i),this.ctx;try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext}catch(i){throw new Error("Web Audio API is not supported in this browser")}this._bpm=e,this._beatDuration=60/this._bpm,this._offsetTime=s,this._sections=[],this._kicks=[],this._beats=[],this._startTime=0,this._pauseTime=0,this._isPlaying=!1,this._isLoaded=!1,this._progress=0,this._onUpdate=this.onUpdate.bind(this),this._onEnded=this.onEnded.bind(this),this.gainNode=this.ctx.createGain(),this.gainNode.connect(this.ctx.destination),this.analyserNode=this.ctx.createAnalyser(),this.analyserNode.connect(this.gainNode),this.analyserNode.smoothingTimeConstant=.8,this.analyserNode.fftSize=1024;var a=this.analyserNode.frequencyBinCount;this.frequencyDataArray=new Uint8Array(a),this.timeDomainDataArray=new Uint8Array(a),r&&(this.debug=new h(this)),this._load(t,o),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame}return s(i,[{key:"_load",value:function(i,t){var e=this;if(i){this._isLoaded=!1,this._progress=0;var n=new XMLHttpRequest;n.open("GET",i,!0),n.responseType="arraybuffer",n.onprogress=function(i){e._progress=i.loaded/i.total},n.onload=function(){e.ctx.decodeAudioData(n.response,function(i){e._buffer=i,e._isLoaded=!0,t&&t()},function(i){console.log(i)})},n.send()}}},{key:"play",value:function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.req&&cancelAnimationFrame(this.req),this._onUpdate(),this._isPlaying=!0;var t=this._pauseTime-this._startTime+i;this._startTime=this.ctx.currentTime-t,this.sourceNode=this.ctx.createBufferSource(),this.sourceNode.connect(this.analyserNode),this.sourceNode.buffer=this._buffer,this.sourceNode.start(0,t),this.sourceNode.addEventListener("ended",this._onEnded,!1)}},{key:"pause",value:function(){this.req&&cancelAnimationFrame(this.req),this.sourceNode&&(this.sourceNode.removeEventListener("ended",this._onEnded,!1),this.sourceNode.stop(0),this.sourceNode.disconnect(),this.sourceNode=null),this._pauseTime=this.ctx.currentTime,this._isPlaying=!1}},{key:"before",value:function(i,t,e){var n=this;return this._sections.push({label:i,condition:function(){return n.time<t},callback:e}),this}},{key:"after",value:function(i,t,e){var n=this;return this._sections.push({label:i,condition:function(){return n.time>t},callback:e}),this}},{key:"between",value:function(i,t,e,n){var s=this;return this._sections.push({label:i,condition:function(){return s.time>t&&s.time<e},callback:n}),this}},{key:"onceAt",value:function(i,t,e){var n=this,s=null;return this._sections.push({label:i,condition:function(){return n.time>t&&!this.called},callback:function(){console.log("once :",s.label),e.call(this),s.called=!0},called:!1}),s=this._sections[this._sections.length-1],this}},{key:"getSpectrum",value:function(){return this.analyserNode.getByteFrequencyData(this.frequencyDataArray),this.frequencyDataArray}},{key:"getWaveform",value:function(){return this.analyserNode.getByteTimeDomainData(this.timeDomainDataArray),this.timeDomainDataArray}},{key:"getFrequency",value:function(i){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=0,n=this.getSpectrum();if(void 0!==t){for(var s=i;s<=t;s++)e+=n[s];return e/(t-i+1)}return n[i]}},{key:"createKick",value:function(i){var t=i.frequency,e=i.threshold,n=i.decay,s=i.onKick,o=i.offKick,a=new r({frequency:t,threshold:e,decay:n,onKick:s,offKick:o});return this._kicks.push(a),a}},{key:"createBeat",value:function(i){var t=i.factor,e=i.onBeat,n=new a({factor:t,onBeat:e});return this._beats.push(n),n}},{key:"onUpdate",value:function(){this.req=requestAnimationFrame(this._onUpdate);for(var i in this._sections)this._sections[i].condition()&&this._sections[i].callback.call(this);var t=this.getSpectrum();for(var e in this._kicks)this._kicks[e].calc(t);var n=Math.max(0,this.time-this._offsetTime);for(var s in this._beats)this._beats[s].calc(n,this._beatDuration);this.debug&&this.debug.draw()}},{key:"onEnded",value:function(){this.stop()}},{key:"progress",get:function(){return this._progress}},{key:"isLoaded",get:function(){return this._isLoaded}},{key:"duration",get:function(){return this._isLoaded?this._buffer.duration:0}},{key:"time",get:function(){return this.isPlaying?this.ctx.currentTime-this._startTime:this._pauseTime-this._startTime}},{key:"volume",set:function(i){this.gainNode.gain.value=i},get:function(){return this.gainNode.gain.value}},{key:"isPlaying",get:function(){return this._isPlaying}},{key:"beatDuration",get:function(){return this._beatDuration}}]),i}();t.default=o;var r=function(){function i(t){var e=t.frequency,s=t.threshold,o=t.decay,r=t.onKick,a=t.offKick;n(this,i),this.frequency=void 0!==e?e:[0,10],this.threshold=void 0!==s?s:.3,this.decay=void 0!==o?o:.02,this.onKick=r,this.offKick=a,this.isOn=!1,this.isKick=!1,this.currentThreshold=this.threshold}return s(i,[{key:"on",value:function(){this.isOn=!0}},{key:"off",value:function(){this.isOn=!1}},{key:"set",value:function(i){var t=i.frequency,e=i.threshold,n=i.decay,s=i.onKick,o=i.offKick;this.frequency=void 0!==t?t:this.frequency,this.threshold=void 0!==e?e:this.threshold,this.decay=void 0!==n?n:this.decay,this.onKick=s||this.onKick,this.offKick=o||this.offKick}},{key:"calc",value:function(i){if(this.isOn){var t=this.maxAmplitude(i,this.frequency);t>=this.currentThreshold&&t>=this.threshold?(this.currentThreshold=t,this.onKick&&this.onKick(t),this.isKick=!0):(this.offKick&&this.offKick(t),this.currentThreshold-=this.decay,this.isKick=!1)}}},{key:"maxAmplitude",value:function(i,t){var e=0;if(!t.length)return t<i.length?i[~~t]:null;for(var n=t[0],s=t[1];n<=s;n++)i[n]>e&&(e=i[n]);return e}}]),i}(),a=function(){function i(t){var e=t.factor,s=t.onBeat;n(this,i),this.factor=void 0!==e?e:1,this.onBeat=s,this.isOn=!1,this.currentTime=0}return s(i,[{key:"on",value:function(){this.isOn=!0}},{key:"off",value:function(){this.isOn=!1}},{key:"set",value:function(i){var t=i.factor,e=i.onBeat;this.factor=void 0!==t?t:this.factor,this.onBeat=e||this.onBeat}},{key:"calc",value:function(i,t){if(0!=i){var e=t*this.factor;i>=this.currentTime+e&&(this.isOn&&this.onBeat&&this.onBeat(),this.currentTime+=e)}}}]),i}(),h=function(){function i(t){n(this,i),this.sound=t,this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=300,this.canvas.style.position="absolute",this.canvas.style.bottom=0,this.canvas.style.left=0,this.canvas.style.zIndex=3,document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.resize.bind(this),!1),this.resize()}return s(i,[{key:"resize",value:function(){this.canvas.width=window.innerWidth}},{key:"draw",value:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.beginPath(),this.ctx.rect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="#000000",this.ctx.fill(),this.ctx.strokeStyle="#a1a1a1",this.ctx.stroke(),this.ctx.beginPath();for(var i=this.sound.getSpectrum(),t=null,e=i.length,n=this.canvas.width/e,s=this.canvas.height-10,o=0;o<e;o++)t=i[o]/256,this.ctx.rect(o*n,s-s*t,n/2,s*t);this.ctx.fillStyle="#ffffff",this.ctx.fill(),this.ctx.beginPath(),this.ctx.font="10px Arial",this.ctx.textBaseline="middle",this.ctx.textAlign="left";for(var r=0,a=e;r<a;r++)r%10==0&&(this.ctx.rect(r*n,s,n/2,10),this.ctx.fillText(r,r*n+4,s+5));this.ctx.fillStyle="#ffffff",this.ctx.fill();for(var h=this.sound._kicks,c=null,l=h.length,u=null,d=null,f=0,y=l;f<y;f++)c=h[f],c.isOn&&(u=c.frequency.length?c.frequency[0]:c.frequency,d=c.frequency.length?c.frequency[1]-c.frequency[0]+1:1,this.ctx.beginPath(),this.ctx.rect(u*n,s-s*(c.threshold/256),d*n-.5*n,2),this.ctx.rect(u*n,s-s*(c.currentThreshold/256),d*n-.5*n,5),this.ctx.fillStyle=c.isKick?"#00ff00":"#ff0000",this.ctx.fill());this.ctx.beginPath();for(var p=this.sound.getWaveform(),v=null,g=p.length,m=this.canvas.width/g,b=this.canvas.height-10,k=0;k<g;k++)v=p[k]/256,0==k?this.ctx.moveTo(k*m,b*v):this.ctx.lineTo(k*m,b*v);this.ctx.strokeStyle="#0000ff",this.ctx.stroke(),this.ctx.beginPath(),this.ctx.textAlign="right",this.ctx.textBaseline="top",this.ctx.font="15px Arial",this.ctx.fillStyle="#ffffff",this.ctx.fillText(Math.round(10*this.sound.time)/10+" / "+Math.round(10*this.sound.duration)/10,this.canvas.width-5,5),this.ctx.beginPath();for(var w=this.sound._sections,P=null,S=w.length,x="",C=0,_=S;C<_;C++)P=w[C],P.condition()&&(x+=P.label+" - ");x.length>0&&(x=x.substr(0,x.length-3)),this.ctx.fillText(x,this.canvas.width-5,25),this.ctx.fill()}}]),i}()},function(i,t,e){i.exports=e.p+"audio/audio.3e7f73704354afd2744c408a900f0671.mp3"}],[3]);