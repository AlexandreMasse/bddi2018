/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 Canvas stuff
 */
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var canvasWith = window.innerWidth;
var canvasHeight = window.innerHeight;

/*
 Functions
 */
function fullScreen() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    } else {
        canvas.mozRequestFullScreen();
    }
}
document.getElementById('fullScreen').addEventListener('click', fullScreen);

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 Audio Stuff
 */
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var bassValue = 115;
var kickValue = 8;
var melodyValue = 6;

var bassTimestamp = 0;
var kickTimestamp = 0;
var melodyTimestamp = 0;

var bassInterval = 1150;
var kickInterval = 1200;
var melodyInterval = 400;

// Time stuff
var timeToBegin = 2000;
var DELTA_TIME = 0;
var LAST_TIME = Date.now();

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', './sounds/sound.mp3', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {

        audioCtx.decodeAudioData(request.response, function (buffer) {

            // success callback
            audioBuffer = buffer;

            // Create sound from buffer
            audioSource = audioCtx.createBufferSource();
            audioSource.buffer = audioBuffer;

            // connect the audio source to context's output
            audioSource.connect(analyser);
            analyser.connect(audioCtx.destination);
            frame();
        }, function () {

            // error callback
            //
        });
    };
    request.send();
}

/*
 Ball Stuff
 */
var ballNumber = 100;
var ballsTypes = 3;
var ballsArray = [];
var ballsBassArray = [];
var ballsKickArray = [];
var ballsMelodyArray = [];

var ball;
var radius = 45;
var opacity = 0.85;
var friction = 0.6;
var gravity = 2.5;

var beginningX = canvas.width / 2;
var beginningY = canvas.height / 2;
var beginningVx = 0;
var beginningVy = 3;

var ballsBass = Math.floor(ballNumber / 3);
var ballsKick = Math.floor((ballNumber - ballsBass) / 2);
var ballsMelody = ballNumber - (ballsBass + ballsKick);

var colors = ['rgb(138, 230, 176)', 'rgba(124, 186, 191,' + opacity + '', 'rgba(107, 126, 153,' + opacity + ''];

// Object
function Ball(x, y, vx, vy, radius, color, lineWidth, strokeColor) {
    var _this = this;

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;

    this.update = function () {
        // Gravity of the ball
        if (_this.y + _this.radius + _this.vy > canvas.height) {
            _this.vy = -_this.vy * friction;
            _this.vx = _this.vx * friction;
        } else {
            _this.vy += gravity;
        }

        if (_this.x + _this.radius + _this.vx > canvas.width || _this.x - _this.radius <= 0) {
            _this.vx = -_this.vx * friction;
        }

        _this.x += _this.vx;
        _this.y += _this.vy;
        _this.draw();
    };

    this.draw = function () {
        c.beginPath();
        c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        c.fillStyle = _this.color;
        c.fill();
        c.closePath();
    };
}

function init() {
    // Draw background rectangle
    c.beginPath();
    c.rect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgb(75, 61, 77)';
    c.fill();
    c.closePath();

    // Clear tab while resizing the canvas
    ballsArray = [];

    for (var i = 0; i < ballsBass; i++) {
        ballsArray.push(new Ball(beginningX, beginningY + 8, beginningVx, beginningVy, radius - 8, colors[0], 3, colors[1]));
    }

    for (var i = 0; i < ballsKick; i++) {
        ballsArray.push(new Ball(beginningX, beginningY + 4, beginningVx, beginningVy, radius - 4, colors[1], 3, colors[2]));
    }

    for (var i = 0; i < ballsMelody; i++) {
        ballsArray.push(new Ball(beginningX, beginningY, beginningVx, beginningVy, radius, colors[2], 3, colors[0]));
    }

    // Slice ballsArray for 3 independent tabs
    ballsBassArray = ballsArray.slice(1, ballsBass);
    ballsKickArray = ballsArray.slice(ballsBass, ballsBass + ballsKick);
    ballsMelodyArray = ballsArray.slice(ballsBass + ballsKick, ballsArray.length);

    // First explosion
    setTimeout(function () {
        ballsArray.forEach(function (ball) {
            ball.vx = randomIntFromRange(-30, 30);
            ball.vy = randomIntFromRange(10, 100);
        });
        audioSource.start();
    }, timeToBegin);
}

function frame() {
    requestAnimationFrame(frame);

    DELTA_TIME = Date.now() - LAST_TIME;
    LAST_TIME = Date.now();

    // analyser.getByteFrequencyData(frequencyData);
    analyser.getByteFrequencyData(frequencyData);

    c.fillStyle = 'rgba(75, 61, 77, 0.7';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Average frequencies
    var averageData = [];
    for (var i = 0; i <= ballsTypes - 1; i++) {
        var currentAverage = 0;
        var cumul = 0;

        var begin = Math.floor((frequencyData.length - 1) / ballsTypes * i);
        var end = Math.floor((frequencyData.length - 1) / ballsTypes * (i + 1));

        for (var j = begin; j < end; j++) {
            cumul += frequencyData[j];
        }

        currentAverage = cumul / (end - begin);
        averageData.push(currentAverage);
    }

    /**
     * Balls animations
     */
    var bassAverage = averageData[0];
    var kickAverage = averageData[2];
    var melodyAverage = averageData[2];

    bassTimestamp += DELTA_TIME;
    var canBass = bassTimestamp > bassInterval;
    if (bassAverage > bassValue && canBass) {
        bassTimestamp = 0;

        ballsBassArray.forEach(function (ball) {
            ball.vx = randomIntFromRange(-30, 30);
            ball.vy = randomIntFromRange(10, 92);
        });
    }

    kickTimestamp += DELTA_TIME;
    var canKick = kickTimestamp > kickInterval;
    if (kickAverage > kickValue && canKick) {
        kickTimestamp = 0;

        c.beginPath();
        c.rect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'rgb(93, 86, 115)';
        c.fill();
        c.closePath();

        ballsKickArray.forEach(function (ball) {
            ball.vx = randomIntFromRange(-25, 25);
            ball.vy = randomIntFromRange(10, 75);
        });
    }

    melodyTimestamp += DELTA_TIME;
    var canMelody = melodyTimestamp > melodyInterval;
    if (melodyAverage > melodyValue && canMelody) {
        melodyTimestamp = 0;

        ballsMelodyArray.forEach(function (ball) {
            ball.vx = randomIntFromRange(-20, 20);
            ball.vy = randomIntFromRange(10, 45);
        });
    }

    ballsArray.forEach(function (ball) {
        ball.update();
    });
}

init();
loadSound();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map