var $ = require('jquery');
var niceModule = require('./modules/niceModule');
var animation = require('./modules/animation');
var canvasBackground = require('./modules/canvasBackground');
var projectHandler = require('./modules/projects');

var test = document.querySelector(".test");
// var T = require('gsap/TweenLite');

window.onload = () => {
  const loader = document.querySelector('.loader');
    loader.classList.add('hidden-loader');
}


//Init Background
canvasBackground.init();

